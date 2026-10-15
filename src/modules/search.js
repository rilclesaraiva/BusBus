// BusBus Experimental Modular (B.E.M.) — módulo "search.js"
// Copyright (C) 2026 rilclesaraiva — licenciado sob GNU GPLv3.
// Texto completo: https://github.com/rilclesaraiva/BusBus/blob/main/LICENSE

import { state } from "./state.js";
import { el, jsStr, statusHTML, normalize, render, mapLoadingHTML } from "./utils.js";
import { pinIcon } from "./icons.js";
import { ensureAllPoints, ensureAllLines, api } from "./api.js";
import { CITY } from "./state.js";
import { pushNav, bumpNavToken, navToken } from "./nav.js";
import { destroyLeafletMap } from "./map.js";
// Importação circular de propósito: selecionar um resultado de busca abre a
// tela de linhas da parada (stops.js) ou a tela de GPS da linha. Só
// funciona porque as chamadas ficam dentro de funções, não no topo do
// módulo.
import { selectStop, followBtnHTML, refreshBusesOnMap, startPolling, skeletonLineRows, skeletonStopCards } from "./stops.js";
import { initLineRouteMap } from "./map.js";
import { showRouteStreetsModal } from "./trip-planner.js";
import { metersBetween } from "./utils.js";
import { updateHeaderAndNav } from "./nav.js";

export function historyKey(type){ return `busbus_search_history_${type}`; }

export function loadSearchHistory(type){
try{
const arr = JSON.parse(localStorage.getItem(historyKey(type)) || "[]");
return Array.isArray(arr) ? arr : [];
}catch(e){ return []; }
}

export function addSearchHistory(type, term){
term = (term || "").trim();
if(!term) return;
let hist = loadSearchHistory(type).filter(h => normalize(h) !== normalize(term));
hist.unshift(term);
hist = hist.slice(0, 8);
try{ localStorage.setItem(historyKey(type), JSON.stringify(hist)); }catch(e){}
}

export function clearSearchHistory(type){
try{ localStorage.removeItem(historyKey(type)); }catch(e){}
renderSearchScreen();
}

export function renderSearchHistoryHTML(type){
const hist = loadSearchHistory(type);
if(!hist.length) return `<div class="empty">Digite para pesquisar ${type === 'ponto' ? 'paradas' : 'linhas'}.</div>`;
return `
<div class="historyRow">
<div class="sectionTitle">Pesquisas recentes</div>
<button class="clearHistoryBtn" onclick="clearSearchHistory('${type}')">apagar hist\u00f3rico</button>
</div>
${hist.map(h => `
<div class="historyItem" onclick="runHistorySearch(${jsStr(h)})">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
<span>${h}</span>
</div>`).join("")}
`;
}

export function runHistorySearch(term){
const input = el("searchInput");
if(input) input.value = term;
state.searchQuery = term;
toggleSearchClearBtn();
handleSearch(term);
}

export function toggleSearchClearBtn(){
const btn = el("searchClearBtn");
if(btn) btn.style.display = state.searchQuery ? "flex" : "none";
}

export function clearSearchInput(){
cancelSearchIdleClear();
state.searchQuery = "";
const input = el("searchInput");
if(input){ input.value = ""; input.focus(); }
toggleSearchClearBtn();
el("searchResults").innerHTML = renderSearchHistoryHTML(state.searchType);
}

export function renderSearchScreen(){
destroyLeafletMap();
state.view = "search";
updateHeaderAndNav("search");
el("subtitle").textContent = "Pesquisar no sistema";
render(`
<section>
<div class="searchBox">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
<input type="text" id="searchInput" placeholder="${state.searchType === 'ponto' ? 'Nome da rua ou da parada…' : 'Número ou nome da linha…'}" oninput="handleSearch(this.value)" onfocus="handleSearchInputFocus()" value="${state.searchQuery}" autofocus>
<button class="searchClearBtn" id="searchClearBtn" onclick="clearSearchInput()" style="display:${state.searchQuery ? 'flex' : 'none'};" title="Limpar">
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M18 6 6 18M6 6l12 12"/></svg>
</button>
</div>
<div class="searchTabs">
<button class="tabBtn ${state.searchType === 'ponto' ? 'active' : ''}" onclick="setSearchType('ponto')">PONTO</button>
<button class="tabBtn ${state.searchType === 'linha' ? 'active' : ''}" onclick="setSearchType('linha')">LINHA</button>
</div>
<div id="searchResults"></div>
</section>
`);
if(state.searchQuery){
handleSearch(state.searchQuery);
} else {
el("searchResults").innerHTML = renderSearchHistoryHTML(state.searchType);
restoreSearchScrollIfPending();
}
}

export function setSearchType(type){
state.searchType = type;
renderSearchScreen();
}

// Extraído do atributo onfocus do campo de busca pra uma função de verdade:
// num módulo ES, um onfocus="" escrito direto no HTML executa no escopo
// global (window), que não tem acesso a "state", "el" nem
// "renderSearchHistoryHTML" (eles só existem dentro deste módulo) — então
// precisa ser uma função exposta em window, como todas as outras.
export function handleSearchInputFocus(){
if(!state.searchQuery) el('searchResults').innerHTML = renderSearchHistoryHTML(state.searchType);
}

export let searchDebounce = null;

export let savedSearchScrollY = 0;

// Chamada pela navegação (nav.js) sempre que a pessoa está saindo da aba
// de Pesquisa — cobre o caso de só trocar de aba e voltar, que antes só
// era salvo ao abrir um resultado (searchSelectStop/searchSelectLine, mais
// abaixo).
export function saveSearchScroll(){ savedSearchScrollY = window.scrollY; }

export let pendingSearchScrollRestore = false;

export function restoreSearchScrollIfPending(){
if(!pendingSearchScrollRestore) return;
pendingSearchScrollRestore = false;
requestAnimationFrame(() => window.scrollTo(0, savedSearchScrollY));
}

export let searchIdleTimer = null;

export const SEARCH_IDLE_CLEAR_MS = 90000;

// Antes esse temporizador começava a contar a cada tecla digitada e
// descartava a busca depois de 90s parado — mesmo que a pessoa estivesse
// olhando os resultados na tela o tempo todo, o que apagava a busca debaixo
// dela sem aviso. Agora só conta o tempo enquanto a pessoa está em OUTRA
// aba: scheduleSearchIdleClear() é chamado (via updateHeaderAndNav, lá em
// nav.js) toda vez que a tela muda pra algo que não é "search", e
// cancelSearchIdleClear() toda vez que ela volta pra essa aba — então o
// relógio só corre de verdade enquanto a busca ficou "esquecida" fora de
// vista.
export function scheduleSearchIdleClear(){
if(!state.searchQuery || searchIdleTimer) return;
searchIdleTimer = setTimeout(() => {
searchIdleTimer = null;
state.searchQuery = "";
const input = el("searchInput");
if(input) input.value = "";
toggleSearchClearBtn();
const resEl = el("searchResults");
if(resEl) resEl.innerHTML = renderSearchHistoryHTML(state.searchType);
}, SEARCH_IDLE_CLEAR_MS);
}

export function cancelSearchIdleClear(){
clearTimeout(searchIdleTimer);
searchIdleTimer = null;
}

export function handleSearch(q){
state.searchQuery = q;
toggleSearchClearBtn();
clearTimeout(searchDebounce);
const resEl = el("searchResults");
if(!q.trim()){
resEl.innerHTML = renderSearchHistoryHTML(state.searchType);
restoreSearchScrollIfPending();
return;
}
// Mesma lógica de esqueleto (cards/linhas fantasma) usada em todo o resto
// do app — antes essa tela era a única que ainda mostrava só um texto
// "Buscando…" solto com spinner, inconsistente com paradas/linhas/mapa.
resEl.innerHTML = state.searchType === "ponto"
? skeletonStopCards(5)
: `<div class="sectionTitle">Buscando linhas…</div>${skeletonLineRows(5)}`;
searchDebounce = setTimeout(async () => {
try{
if(state.searchType === "ponto") await runStopSearch(q, resEl);
else await runLineSearch(q, resEl);
restoreSearchScrollIfPending();
}catch(e){
resEl.innerHTML = `<div class="status err">Erro na busca: ${e.message}</div>`;
}
}, 250);
}

export async function runStopSearch(q, resEl){
const points = await ensureAllPoints();
const nq = normalize(q);
const matches = points.filter(p => normalize(p.name).includes(nq)).slice(0, 40);
resEl.innerHTML = matches.length ? matches.map(p => `
<div class="stopCard" onclick="searchSelectStop(${p.id}, ${p.lat}, ${p.lng}, '${p.name.replace(/'/g,"\\'")}')">
<div class="stopIcon">${pinIcon}</div>
<div class="stopInfo"><div class="name">${p.name}</div><div class="meta">toque para ver as linhas</div></div>
</div>`).join("") : `<div class="empty">Nenhuma parada com esse nome.</div>`;
}

export async function runLineSearch(q, resEl){
const lines = await ensureAllLines();
const nq = normalize(q);
const matches = lines.filter(l => normalize(l.numero).includes(nq) || normalize(l.name).includes(nq)).slice(0, 40);
resEl.innerHTML = matches.length ? matches.map(l => `
<div class="lineRow" onclick="searchSelectLine(${l.id})">
<div class="badge">${l.numero || "—"}</div>
<div class="dest">${l.name}</div>
${l.trajetos[0] ? `<button class="infoBtn" onclick="event.stopPropagation();showRouteStreetsModal(${l.id}, ${l.trajetos[0].id}, null, ${jsStr(l.numero)})" title="Ver ruas desta linha">i</button>` : ""}
</div>`).join("") : `<div class="empty">Nenhuma linha encontrada.</div>`;
}

export async function searchSelectStop(id, lat, lng, name){
savedSearchScrollY = window.scrollY;
addSearchHistory("ponto", state.searchQuery || name);
if(!state.stops.find(s => String(s.id) === String(id))){
state.stops.push({ id, name, lat, lng });
}
await selectStop(id);
}

export async function searchSelectLine(lineId){
const myToken = bumpNavToken(); // ver stops.js selectStop()
savedSearchScrollY = window.scrollY;
addSearchHistory("linha", state.searchQuery);
destroyLeafletMap();
state.view = "map";
updateHeaderAndNav("map");
pushNav("map"); // empilha ANTES do carregamento assíncrono (ver stops.js selectStop)
el("subtitle").textContent = "Carregando a linha…";
// Mesmo esqueleto de carregamento usado em selectLine (stops.js) e
// openLegLive (trip-planner.js): caixa do mapa com spinner + cards
// fantasma da lista de ônibus. Antes essa tela (chegando via busca) usava
// só um texto de status solto, sem bater com as outras duas entradas pro
// mesmo lugar — inconsistente.
render(`<div class="mainMapContainer" style="height:280px;"><div id="mapContainer">${mapLoadingHTML("Carregando rota e posição do ônibus…")}</div><div class="mapBtnStack">${followBtnHTML()}</div></div><section id="busListSection"><div class="sectionTitle">Buscando veículos…</div>${skeletonLineRows(2)}</section>`);
try{
const lines = await ensureAllLines();
const line = lines.find(l => String(l.id) === String(lineId));
if(!line || !line.trajetos.length) throw new Error("linha sem trajeto cadastrado");
const trajeto = line.trajetos[0];
const pat = await api(`/pattern/${line.id}/${CITY}`);
const seg = (Array.isArray(pat) ? pat : []).find(p => String(p.id) === String(trajeto.id)) || pat[0];
const route = seg ? seg.polyLine : [];
if(!route.length) throw new Error("sem geometria de rota");
const points = await ensureAllPoints();
const origin = route[0];
let nearest = null, best = Infinity;
for(const p of points){
const d = metersBetween(origin, p);
if(d < best){ best = d; nearest = p; }
}
if(!nearest) throw new Error("não achei uma parada próxima da rota");
if(myToken !== navToken) return; // a pessoa já saiu dessa tela enquanto isso carregava
if(!state.stops.find(s => String(s.id) === String(nearest.id))) state.stops.push(nearest);
state.stopSel = nearest;
state.lineSel = { busServiceId: line.id, patternId: trajeto.id, name: `${line.numero} - ${line.name}`, dest: trajeto.nome };
state.route = route;
state.followBusEnabled = true;
el("subtitle").textContent = `${line.numero} · perto de ${nearest.name}`;
render(`<div class="mainMapContainer" style="height:280px;"><div id="mapContainer"></div><div class="mapBtnStack">${followBtnHTML()}</div></div><section id="busListSection"><div class="sectionTitle">Buscando veículos…</div>${skeletonLineRows(2)}</section>`);
initLineRouteMap(pat, trajeto.id);
await refreshBusesOnMap();
if(myToken !== navToken) return;
startPolling();
}catch(e){
if(myToken !== navToken) return;
render(`${statusHTML("Não consegui carregar essa linha: "+e.message, false, true)}`);
}
}

// pendingSearchScrollRestore é "dono" deste módulo (só ele pode reatribuir
// seu valor) — mas quem dispara a restauração ao voltar pra essa tela é o
// handlePopState lá em nav.js. Em módulos ES, importar uma variável deixa a
// leitura sempre atualizada, mas NÃO permite reatribuí-la de fora — por
// isso essa função existe, pra nav.js poder pedir a mudança sem precisar
// reatribuir a variável ele mesmo.
export function setPendingSearchScrollRestore(v){ pendingSearchScrollRestore = v; }
