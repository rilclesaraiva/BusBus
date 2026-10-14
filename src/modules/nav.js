// BusBus Experimental Modular (B.E.M.) — módulo "nav.js"
// Copyright (C) 2026 rilclesaraiva — licenciado sob GNU GPLv3.
// Texto completo: https://github.com/rilclesaraiva/BusBus/blob/main/LICENSE

import { state } from "./state.js";
import { el, scrollToTopFast } from "./utils.js";
import { destroyLeafletMap } from "./map.js";
import { destroyTripMap, renderRouteScreen, scheduleRouteIdleClear, cancelRouteIdleClear, savedRouteScrollY } from "./trip-planner.js";
import { stopPolling, renderStopsScreenStructure, savedStopsScrollY, savedLinesScrollY, renderLines } from "./stops.js";
import { renderSearchScreen, setPendingSearchScrollRestore, scheduleSearchIdleClear, cancelSearchIdleClear } from "./search.js";
import { renderConfigScreen } from "./settings.js";
import { renderMessagesScreen } from "./messages.js";
import { startGpsTracking } from "./gps.js";

export let isPopping = false; // true enquanto um popstate (botão/gesto voltar) está sendo processado

export let navStack = ["stops"];

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
stopPolling();
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
renderLines();
if(savedLinesScrollY){
requestAnimationFrame(() => window.scrollTo(0, savedLinesScrollY));
}
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
stopPolling();
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
