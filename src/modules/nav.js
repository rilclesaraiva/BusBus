// BusBus Experimental Modular (B.E.M.) — módulo "nav.js"
// Copyright (C) 2026 rilclesaraiva — licenciado sob GNU GPLv3.
// Texto completo: https://github.com/rilclesaraiva/BusBus/blob/main/LICENSE

import { state } from "./state.js";
import { el, scrollToTopFast } from "./utils.js";
import { destroyLeafletMap } from "./map.js";
import { destroyTripMap, renderRouteScreen, scheduleRouteIdleClear, cancelRouteIdleClear, savedRouteScrollY } from "./trip-planner.js";
import { stopPolling, stopLinesPolling, startLinesPolling, fetchLinesForStop, renderStopsScreenStructure, savedStopsScrollY, savedLinesScrollY, renderLines } from "./stops.js";
import { renderSearchScreen, setPendingSearchScrollRestore, scheduleSearchIdleClear, cancelSearchIdleClear } from "./search.js";
import { renderConfigScreen, openModal, closeModal } from "./settings.js";
import { renderMessagesScreen } from "./messages.js";
import { startGpsTracking } from "./gps.js";

export let isPopping = false; // true enquanto um popstate (botão/gesto voltar) está sendo processado

export let navStack = ["stops"];

// Protege contra carregamento "fantasma": selectStop/selectLine/
// searchSelectLine/openLegLive são assíncronas (esperam a API responder)
// e, até a v1.1.1, continuavam escrevendo no DOM mesmo se a pessoa já
// tivesse saído daquela tela (voltando, ou abrindo outra parada/linha
// enquanto a primeira ainda carregava) — o resultado chegava atrasado e
// era desenhado em cima de QUALQUER tela que estivesse aberta na hora,
// inclusive a Home, mesmo com o histórico de navegação já correto. Cada
// uma dessas funções chama bumpNavToken() assim que começa e guarda o
// número devolvido; antes de qualquer render() feito depois de um await,
// ela compara esse número com navToken — se mudou, uma navegação mais
// nova já aconteceu nesse meio tempo, e o resultado atrasado é descartado
// em silêncio, sem tocar no DOM.
export let navToken = 0;
export function bumpNavToken(){ return ++navToken; }

export function pushNav(label){
if(isPopping) return;
const existingIdx = navStack.indexOf(label);
if(existingIdx !== -1 && existingIdx < navStack.length - 1){
const delta = navStack.length - 1 - existingIdx;
navStack = navStack.slice(0, existingIdx + 1);
isPopping = true;
try{ history.go(-delta); }
catch(e){ console.error("[BusBus] history.go bloqueado:", e); isPopping = false; }
return;
}
if(existingIdx === -1){
navStack.push(label);
try{ history.pushState({ label }, "", "#" + label); }
catch(e){ console.error("[BusBus] pushState bloqueado:", e); navStack.pop(); }
}
// se existingIdx === navStack.length-1, a aba já é a atual (ex.: pushNav
// chamado de novo pra mesma tela) — nada a fazer no histórico.
}

export function handlePopState(e){
// A Home ("stops") é o fundo da pilha de telas do app — não tem mais
// nenhuma tela "atrás" dela. Sem esse desvio, um voltar aqui sairia do
// histórico de verdade e o app fechava na hora, sem avisar nada. Ver
// handleExitAttempt() mais abaixo pra como isso é resolvido.
// As duas condições importam: "label" é a tela que esse voltar levaria a
// pessoa (precisa ser "stops"), e "state.view" é a tela que ela JÁ estava
// vendo antes desse voltar (também precisa já ser "stops") — só entra
// nesse desvio quando as duas batem, ou seja, quando a pessoa já estava
// na Home e apertou voltar de novo. Um voltar vindo de outra tela (ex.:
// "lines" → "stops") é navegação normal e não deve cair aqui.
const incomingLabel = (e.state && e.state.label) || "stops";
if(incomingLabel === "stops" && state.view === "stops"){
handleExitAttempt();
return;
}
stopPolling();
stopLinesPolling();
bumpNavToken(); // invalida qualquer carregamento em andamento da tela que está sendo deixada
isPopping = true;
// O "finally" aqui é uma rede de segurança: sem ele, se qualquer coisa
// dentro do bloco abaixo lançar uma exceção (um erro de rede ao recarregar
// uma tela, por exemplo), "isPopping" ficaria travado em "true" pra
// sempre — e, como pushNav() checa "if(isPopping) return;" bem no início,
// isso congelaria a navegação do app inteiro (nenhuma aba responderia
// mais a toque, mesmo sem erro visível). Um teste automatizado achou esse
// caminho ao simular um popstate sem o DOM esperado; no app real as telas
// sempre existem, mas o "finally" garante que um erro futuro nesse trecho
// não gera esse tipo de congelamento silencioso.
try{
const label = (e.state && e.state.label) || "stops";
const stackIdx = navStack.indexOf(label);
navStack = stackIdx !== -1 ? navStack.slice(0, stackIdx + 1) : ["stops"];
if(label !== "route") destroyTripMap();
if(label === "lines" && state.stopSel){
destroyLeafletMap();
state.view = "lines";
updateHeaderAndNav("lines");
el("subtitle").textContent = state.stopSel.name;
renderLines(); // redesenha com os dados que já tínhamos (pode estar desatualizado — ver fetch abaixo)
if(savedLinesScrollY){
requestAnimationFrame(() => window.scrollTo(0, savedLinesScrollY));
}
// a pessoa pode ter ficado um tempo fora dessa tela (vendo o mapa do
// ônibus, por exemplo) — busca na hora em vez de esperar os 10s do
// próximo ciclo, e só então liga o auto-update de novo
fetchLinesForStop(state.stopSel.id, navToken, { silent: true }).finally(() => {
if(state.view === "lines") startLinesPolling();
});
} else if(label === "search"){
destroyLeafletMap();
setPendingSearchScrollRestore(true);
renderSearchScreen();
} else if(label === "route"){
destroyLeafletMap(); renderRouteScreen();
if(savedRouteScrollY){
requestAnimationFrame(() => window.scrollTo(0, savedRouteScrollY));
}
} else if(label === "config"){
destroyLeafletMap(); renderConfigScreen();
} else if(label === "messages"){
destroyLeafletMap(); renderMessagesScreen();
} else {
renderStopsScreenStructure(); startGpsTracking();
if(savedStopsScrollY){
requestAnimationFrame(() => window.scrollTo(0, savedStopsScrollY));
}
}
}finally{
isPopping = false;
}
}

// true só durante o "voltar" programático que confirmExitApp() dispara pra
// consumir a trava de saída — handleExitAttempt() usa isso pra saber que
// esse popstate em particular não deve reabrir o aviso.
let exitInProgress = false;

// Chamado sempre que a pessoa aperta voltar (gesto do Android ou botão do
// app) estando na Home. A trava funciona assim: a Home sempre fica
// posicionada numa entrada "extra" do histórico (empilhada aqui mesmo,
// de novo, toda vez) — por isso um voltar nunca sai do histórico de
// verdade sozinho, sempre cai de volta aqui, e a gente decide o que fazer.
function handleExitAttempt(){
if(exitInProgress){
// Esse popstate é o que confirmExitApp() mesmo disparou pra consumir a
// trava (ver lá embaixo) — não é a pessoa pedindo pra voltar de novo.
// Não reempilha nada: a entrada "extra" fica consumida de propósito,
// então o PRÓXIMO voltar de verdade não cai mais aqui, e sim sai do
// histórico — é esse o sinal que faz o WebView entender que não tem
// mais pra onde voltar e fechar o app.
exitInProgress = false;
closeModal();
// window.close() só funciona em janelas abertas por script (não é o
// nosso caso aqui) — mas em vários wrappers de WebView ele ainda
// encerra a activity quando chamado sem erro. Tentativa de graça: se
// não funcionar, nada acontece, e o próximo voltar de verdade resolve.
try{ window.close(); }catch(e){}
return;
}
try{ history.pushState({ label: "stops" }, "", "#stops"); }
catch(e){ console.error("[BusBus] pushState (trava de saída) bloqueado:", e); }
if(el("activeModal")){
// A pessoa já estava vendo o aviso de saída e apertou voltar de novo
// sem escolher nada — conta como "Cancelar": fecha o aviso e segura o
// app aberto, em vez de deixar isso progredir rumo a sair.
closeModal();
} else {
openExitConfirmModal();
}
}

function openExitConfirmModal(){
openModal(`
<div class="modalHead"><h3>Sair do BusBus?</h3></div>
<div class="aboutText" style="margin-bottom:18px;">Quer fechar o app agora?</div>
<div class="modalBtnRow">
<button class="modalBtnCancel" onclick="closeModal()">Cancelar</button>
<button class="modalBtnConfirm" onclick="confirmExitApp()">Sair</button>
</div>
`);
}

export function confirmExitApp(){
closeModal();
exitInProgress = true;
try{ history.back(); }
catch(e){ exitInProgress = false; console.error("[BusBus] history.back (saída confirmada) bloqueado:", e); }
}

window.addEventListener("popstate", handlePopState);

export function updateHeaderAndNav(viewName){
// Ponto único por onde toda troca de tela passa (inclusive as que nem
// usam pushNav/navTo diretamente, como abrir uma parada vinda da busca ou
// um ônibus vindo do planejador de rota) — por isso é o lugar certo pra
// ligar/desligar os temporizadores de "esqueceu essa aba aberta": sai da
// aba de busca ou de rota → agenda a limpeza por inatividade; volta pra
// ela → cancela, porque a pessoa ainda está olhando.
if(viewName === "search") cancelSearchIdleClear(); else scheduleSearchIdleClear();
if(viewName === "route") cancelRouteIdleClear(); else scheduleRouteIdleClear();
const backBtn = el("globalBackBtn");
const bottomNav = el("bottomNav");
const bellBtn = el("bellBtn");
if(viewName === "stops" || viewName === "search" || viewName === "config" || viewName === "route"){
bottomNav.classList.remove("hidden");
backBtn.classList.remove("show");
} else {
backBtn.classList.add("show");
bottomNav.classList.add("hidden");
}
if(bellBtn) bellBtn.classList.toggle("show", viewName === "stops");
document.querySelectorAll(".navBtn").forEach(btn => btn.classList.remove("active"));
if(viewName === 'search') el("btnNavSearch").classList.add("active");
if(viewName === 'stops' || viewName === 'lines' || viewName === 'map') el("btnNavHome").classList.add("active");
if(viewName === 'config') el("btnNavConfig").classList.add("active");
if(viewName === 'route') el("btnNavRoute").classList.add("active");
}

export function goBack(){
// Sem essa trava, um toque duplo (ou um toque seguido bem de perto pelo
// botão físico/gesto de voltar do aparelho) disparava DOIS history.back()
// antes do primeiro popstate ser processado — o navegador pulava direto
// pra entrada anterior à anterior (ex.: do mapa do ônibus direto pra
// home, pulando a tela de linhas no meio). "isPopping" só virava "true"
// DENTRO de handlePopState, tarde demais pra barrar o segundo toque; agora
// ele trava assim que o primeiro goBack() é chamado, e handlePopState
// libera de novo (no "finally") só depois que aquela navegação terminou.
if(isPopping) return;
isPopping = true;
try{ history.back(); }
catch(e){
console.error("[BusBus] history.back bloqueado:", e);
isPopping = false;
renderStopsScreenStructure(); startGpsTracking();
}
}

export function navTo(tab){
if(tab === state.view){
// Já está nessa aba — um segundo toque nela não recarrega nada (isso
// evitava jogar fora o fix de GPS que já tínhamos, por exemplo), mas
// serve de atalho "voltar ao topo": rola suavemente até o início da
// lista, nunca um teletransporte instantâneo. Isso só acontece aqui,
// quando a aba tocada já é a que está na tela — trocar de aba de
// verdade (branch abaixo) nunca mexe na rolagem.
scrollToTopFast();
return;
}
bumpNavToken(); // invalida qualquer carregamento em andamento da aba que está sendo deixada
stopPolling();
stopLinesPolling();
if(tab !== 'route') destroyTripMap();
if(tab === 'stops') {
renderStopsScreenStructure();
startGpsTracking();
} else if(tab === 'search') {
destroyLeafletMap();
renderSearchScreen();
} else if(tab === 'config') {
destroyLeafletMap();
renderConfigScreen();
} else if(tab === 'route') {
destroyLeafletMap();
renderRouteScreen();
} else if(tab === 'messages') {
destroyLeafletMap();
renderMessagesScreen();
}
pushNav(tab);
}
