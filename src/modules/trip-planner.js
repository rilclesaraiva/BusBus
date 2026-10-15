// BusBus Experimental Modular (B.E.M.) — módulo "trip-planner.js"
// Copyright (C) 2026 rilclesaraiva — licenciado sob GNU GPLv3.
// Texto completo: https://github.com/rilclesaraiva/BusBus/blob/main/LICENSE

import L from "leaflet";
import { state, CITY } from "./state.js";
import { el, jsStr, pick, statusHTML, errMsg, metersBetween, bearingBetween, mapLoadingHTML, friendlyErrMsg } from "./utils.js";
import { walkIcon, busIcon, locIcon } from "./icons.js";
import { api, getPatternSegments, fetchLinesAtStop, fetchScheduledLinesAtStop, ensureAllPoints, ensureAllLines, nominatimReverse, nominatimSearch, patternCache } from "./api.js";
import { addBaseMapLayers, updateCompassIcon, resetOrientation } from "./map.js";
import { destroyLeafletMap, initLineRouteMap } from "./map.js";
// Importação circular de propósito: abrir uma linha a partir do resultado
// do planejador de rota usa a mesma tela de GPS em tempo real das outras
// partes do app (followBtnHTML, refreshBusesOnMap, startPolling). Só
// funciona porque as chamadas ficam dentro de funções, não no topo do
// módulo.
import { followBtnHTML, refreshBusesOnMap, startPolling, skeletonLineRows } from "./stops.js";
import { updateHeaderAndNav, pushNav, bumpNavToken, navToken } from "./nav.js";
import { render } from "./utils.js";
import { openModal } from "./settings.js";
import { ROUTE_STREETS } from "./itinerarios.js";

export function decimateRouteForGeocoding(route, maxPoints = 22){
if(!route || route.length < 2) return [];
const pts = [route[0]];
let lastSample = route[0], lastBearing = null, distSinceLast = 0;
for(let i = 1; i < route.length; i++){
const d = metersBetween(lastSample, route[i]);
if(d < 3) continue; // ignora ruído de GPS parado
distSinceLast += d;
const bearing = bearingBetween(lastSample, route[i]);
const turned = lastBearing !== null && Math.min(Math.abs(bearing - lastBearing), 360 - Math.abs(bearing - lastBearing)) > 28;
if((turned && distSinceLast > 40) || distSinceLast > 550){
pts.push(route[i]);
lastSample = route[i]; lastBearing = bearing; distSinceLast = 0;
} else {
lastBearing = bearing;
}
}
const last = route[route.length - 1];
if(metersBetween(pts[pts.length-1], last) > 30) pts.push(last);
if(pts.length > maxPoints){
const step = pts.length / maxPoints;
const sampled = [];
for(let i = 0; i < maxPoints; i++) sampled.push(pts[Math.floor(i*step)]);
sampled.push(pts[pts.length-1]);
return sampled;
}
return pts;
}

// Linhas com itinerário oficial cadastrado (ver itinerarios.js) mostram a
// lista de ruas na hora, sem precisar geocodificar nada — é só exibir os
// dados já estruturados, vindos da Prefeitura de Belém / SEGBEL. Só as
// linhas que não estão nesse acervo caem no modo antigo (mais lento: manda
// a geometria da rota, ponto a ponto, pro Nominatim identificar as ruas).
export function renderOfficialStreetsHTML(data){
const terminalHTML = data.terminal
? `<div style="font-size:12.5px;color:var(--ink-soft);margin-bottom:10px;"><strong>Terminal:</strong> ${data.terminal}</div>`
: "";
const sections = data.sentidos.map(s => `
<div class="sectionTitle" style="margin-top:10px;">${s.label}</div>
${renderStreetsList(s.ruas)}
`).join("");
return `
<div style="font-size:11.5px;color:var(--ink-soft);margin-bottom:10px;">Itinerário oficial (Prefeitura de Belém / SEGBEL) — não é a geometria ao vivo da linha.</div>
${terminalHTML}
${sections}
`;
}

export async function showRouteStreetsModal(busServiceId, patternId, preloadedRoute, lineNumero){
const numero = lineNumero != null ? String(lineNumero).trim() : null;
const official = numero ? ROUTE_STREETS[numero] : null;
if(official){
openModal(`
<div class="modalHead"><h3>Ruas da linha ${numero}</h3><button class="modalClose" onclick="closeModal()">✕</button></div>
<div id="streetsModalBody">${renderOfficialStreetsHTML(official)}</div>
`);
return;
}
openModal(`
<div class="modalHead"><h3>Ruas da linha</h3><button class="modalClose" onclick="closeModal()">✕</button></div>
<div id="streetsModalBody">${statusHTML("Carregando a geometria da rota…", true)}</div>
`);
try{
let route = preloadedRoute;
if(!route || !route.length){
const pat = await api(`/pattern/${busServiceId}/${CITY}`);
const seg = (Array.isArray(pat) ? pat : []).find(p => String(p.id) === String(patternId)) || pat[0];
route = seg ? seg.polyLine : [];
}
if(!route || route.length < 2){
el("streetsModalBody").innerHTML = `<div class="empty">Sem geometria de rota pra essa linha.</div>`;
return;
}
const samples = decimateRouteForGeocoding(route);
const names = [];
for(let i = 0; i < samples.length; i++){
const body = el("streetsModalBody");
if(!body) return; // modal foi fechado no meio do processo
body.innerHTML = `${statusHTML(`Identificando ruas… (${i+1} de ${samples.length})`, true)}` +
(names.length ? renderStreetsList(dedupeConsecutive(names)) : "");
const name = await nominatimReverse(samples[i].lat, samples[i].lng);
if(name) names.push(name);
await new Promise(r => setTimeout(r, 1100)); // respeita o limite de 1 req/s do Nominatim
}
const finalBody = el("streetsModalBody");
if(!finalBody) return;
const uniqueNames = dedupeConsecutive(names);
finalBody.innerHTML = uniqueNames.length
? renderStreetsList(uniqueNames)
: `<div class="empty">Não consegui identificar as ruas (tente de novo).</div>`;
}catch(e){
const body = el("streetsModalBody");
if(body) body.innerHTML = `<div class="status err">Erro: ${e.message}</div>`;
}
}

export function dedupeConsecutive(arr){
return arr.filter((name, i) => name !== arr[i-1]);
}

export function renderStreetsList(names){
return names.map((n,i) => `<div class="streetItem"><div class="n">${i+1}</div>${n}</div>`).join("");
}

export let tripOrigin = null, tripDestination = null;

export let tripGeoDebounce = null;

// Posição de rolagem da tela de rota — mesma ideia do savedLinesScrollY em
// stops.js: guardada ao sair pra ver um ônibus em tempo real (openLegLive),
// e restaurada só no caminho de "voltar" (handlePopState, lá em nav.js),
// nunca numa entrada nova na aba (navTo('route') sempre começa do topo).
export let savedRouteScrollY = 0;

export function renderRouteScreen(){
state.view = "route";
updateHeaderAndNav("route");
el("subtitle").textContent = "Pra onde você quer ir?";
render(`
<section>
<div class="routeInputCard">
<div class="routeInputRow">
<div class="dot o"></div>
<input id="tripOriginInput" placeholder="De onde você vai sair?" value="${tripOrigin ? tripOrigin.label.replace(/"/g,'') : ''}" oninput="handleTripGeo('o', this.value)">
<button class="searchClearBtn" id="tripOriginClearBtn" onclick="clearTripField('o')" style="display:${tripOrigin ? 'flex' : 'none'};" title="Limpar">
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M18 6 6 18M6 6l12 12"/></svg>
</button>
<button class="useLoc" onclick="useMyLocationForTrip()" title="Usar minha localização">${locIcon}</button>
<div id="tripOriginSuggest"></div>
</div>
<div class="routeInputRow">
<div class="dot d"></div>
<input id="tripDestInput" placeholder="Pra onde você quer ir?" value="${tripDestination ? tripDestination.label.replace(/"/g,'') : ''}" oninput="handleTripGeo('d', this.value)">
<button class="searchClearBtn" id="tripDestClearBtn" onclick="clearTripField('d')" style="display:${tripDestination ? 'flex' : 'none'};" title="Limpar">
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M18 6 6 18M6 6l12 12"/></svg>
</button>
<div id="tripDestSuggest"></div>
</div>
</div>
<p class="routeSearchHint">Pra achar o lugar certo, digite o nome completo — a busca ainda não funciona bem com o nome pela metade.</p>
<button class="planBtn" id="planBtn" onclick="planTrip()" ${(!tripOrigin || !tripDestination) ? "disabled" : ""}>Traçar rota</button>
<div class="mainMapContainer" id="tripMapWrap" style="height:240px;display:none;margin-bottom:14px;">
<div id="tripMapContainer" style="height:100%;"></div>
${state.rotationEnabled ? `<div class="mapBtnStack">
<button class="mapBtn" id="tripCompassBtn" onclick="resetTripMapOrientation()" title="Reorientar o mapa para o norte">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 L12 6 M9 4 L12 2 L15 4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="13" r="8"/><polygon points="12 9 14 13 12 17 10 13" fill="currentColor" stroke="none"/></svg>
</button>
</div>` : ""}
</div>
<div id="tripResultsArea"></div>
</section>
`);
destroyTripMap();
// Ao voltar pra essa tela (ex.: botão "voltar" depois de abrir um dos
// ônibus do resultado em tempo real), repopula o resultado já calculado
// em vez de deixar a pessoa refazer a busca do zero — a tela só é
// reconstruída do HTML (render() troca o #screens inteiro), então sem
// isso o #tripResultsArea voltava sempre vazio mesmo com lastTripResults
// ainda guardado em memória. "true" aqui é pra PRESERVAR qual resultado
// estava selecionado (em vez de voltar mostrando sempre o primeiro) — é a
// mesma ideia do savedLinesScrollY: só faz sentido lembrar a seleção
// quando é de fato uma volta, não uma busca nova.
if(lastTripResults.length) renderTripResults(lastTripResults, true);
}

export let tripMap = null, tripMapLayer = null;

export function destroyTripMap(){
if(tripMap){ try{ tripMap.remove(); }catch(e){} tripMap = null; tripMapLayer = null; }
}

export function initTripMap(){
if(tripMap) return;
tripMap = L.map('tripMapContainer', {
zoomControl: false, attributionControl: false, rotate: state.rotationEnabled, rotateControl: false, touchRotate: state.rotationEnabled
}).setView([-1.4558, -48.4902], 13);
addBaseMapLayers(tripMap);
// Igual ao botão de bússola da Home/GPS ao vivo (map.js), mas essa visão
// geral da rota usa seu próprio mapa (tripMap) e botão (#tripCompassBtn,
// pra não colidir com o #compassBtn das outras telas) — por isso não
// reaproveita leafletMap/#compassBtn direto, só as mesmas funções
// genéricas de map.js, passando o mapa/id certos.
tripMap.on('rotate', () => updateCompassIcon(tripMap, "tripCompassBtn"));
tripMapLayer = L.layerGroup().addTo(tripMap);
}

export function resetTripMapOrientation(){
resetOrientation(tripMap);
}

export function dotMarker(lat, lng, color, label){
return L.marker([lat, lng], {
icon: L.divIcon({
className: '', iconSize: [16,16], iconAnchor: [8,8],
html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2.5px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.35);"></div>`
}), title: label || ""
});
}

export function showTripOnMap(result){
const wrap = el('tripMapWrap');
if(!wrap) return;
wrap.style.display = 'block';
if(!tripMap) initTripMap();
tripMapLayer.clearLayers();
const bounds = [];
const addPt = (lat,lng) => { bounds.push([lat,lng]); };
dotMarker(tripOrigin.lat, tripOrigin.lng, "#1E6B4E", "Origem").addTo(tripMapLayer);
addPt(tripOrigin.lat, tripOrigin.lng);
// "#D64545" (var(--now)) é a MESMA cor do marcador dos ônibus ao vivo
// (refreshBusesOnMap, em stops.js) — usar a mesma aqui pro ponto de
// destino confundia um pino parado (pra onde você vai) com um ônibus de
// verdade se movendo no mapa. Roxo não é usado em mais nenhum marcador
// deste mapa, então fica inconfundível.
dotMarker(tripDestination.lat, tripDestination.lng, "#7C3AED", "Destino").addTo(tripMapLayer);
addPt(tripDestination.lat, tripDestination.lng);
L.polyline([[tripOrigin.lat, tripOrigin.lng],[result.boardStop.lat, result.boardStop.lng]],
{ color: "#52604F", weight: 3, dashArray: "2,8", opacity: .8 }).addTo(tripMapLayer);
dotMarker(result.boardStop.lat, result.boardStop.lng, "#2B5F8A", result.boardStop.name).addTo(tripMapLayer);
addPt(result.boardStop.lat, result.boardStop.lng);
const segs1 = patternCache[result.line.busServiceId] || [];
const route1 = getRouteForPattern(segs1, result.line.patternId);
if(route1.length > 1){
const dec1 = route1.filter((_,i) => i % Math.max(1, Math.floor(route1.length/300)) === 0);
L.polyline(dec1.map(p=>[p.lat,p.lng]), { color: "#2B5F8A", weight: 4, opacity: .75 }).addTo(tripMapLayer);
dec1.forEach(p => addPt(p.lat,p.lng));
}
let lastPoint = result.alightStop || result.boardStop;
if(result.type === "transfer"){
dotMarker(result.transferStop.lat, result.transferStop.lng, "#E8793A", result.transferStop.name).addTo(tripMapLayer);
addPt(result.transferStop.lat, result.transferStop.lng);
const segs2 = patternCache[result.line2.busServiceId] || [];
const route2 = getRouteForPattern(segs2, result.line2.patternId);
if(route2.length > 1){
const dec2 = route2.filter((_,i) => i % Math.max(1, Math.floor(route2.length/300)) === 0);
L.polyline(dec2.map(p=>[p.lat,p.lng]), { color: "#E8793A", weight: 4, opacity: .75 }).addTo(tripMapLayer);
dec2.forEach(p => addPt(p.lat,p.lng));
}
}
if(result.alightStop){
dotMarker(result.alightStop.lat, result.alightStop.lng, "#1E6B4E", result.alightStop.name).addTo(tripMapLayer);
addPt(result.alightStop.lat, result.alightStop.lng);
}
L.polyline([[lastPoint.lat, lastPoint.lng],[tripDestination.lat, tripDestination.lng]],
{ color: "#52604F", weight: 3, dashArray: "2,8", opacity: .8 }).addTo(tripMapLayer);
if(bounds.length > 1) tripMap.fitBounds(bounds, { padding: [24,24] });
setTimeout(() => { if(tripMap) tripMap.invalidateSize(); }, 150);
}

export function useMyLocationForTrip(){
if(state.coord){
tripOrigin = { lat: state.coord.lat, lng: state.coord.lng, label: "Minha localização atual" };
el("tripOriginInput").value = tripOrigin.label;
el("tripOriginSuggest").innerHTML = "";
refreshPlanBtn();
updateTripClearBtn("o");
}
}

export function refreshPlanBtn(){
const btn = el("planBtn");
if(btn) btn.disabled = !(tripOrigin && tripDestination);
}

export function updateTripClearBtn(field){
const btn = el(field === "o" ? "tripOriginClearBtn" : "tripDestClearBtn");
const input = el(field === "o" ? "tripOriginInput" : "tripDestInput");
if(btn) btn.style.display = (input && input.value) ? "flex" : "none";
}

export function clearTripField(field){
const input = el(field === "o" ? "tripOriginInput" : "tripDestInput");
if(input){ input.value = ""; input.focus(); }
handleTripGeo(field, "");
}

// Apaga a rota traçada/os resultados da tela (mapa, cartões, índice
// selecionado) sem mexer no que a pessoa digitou nos campos de origem e
// destino — quem decide isso é quem chama. Usado em três lugares: ao
// apagar o texto de um dos campos (handleTripGeo), ao esquecer a aba de
// rota aberta por tempo demais (scheduleRouteIdleClear) e, no futuro,
// qualquer outro gatilho de "essa rota não vale mais".
export function resetRouteResults(){
destroyTripMap();
lastTripResults = [];
selectedTripResultIndex = 0;
const wrap = el("tripMapWrap");
if(wrap) wrap.style.display = "none";
const area = el("tripResultsArea");
if(area) area.innerHTML = "";
}

export let routeIdleTimer = null;

export const ROUTE_IDLE_CLEAR_MS = 90000;

// Mesma ideia do scheduleSearchIdleClear() em search.js: se a pessoa já
// tinha uma rota traçada (ou meio preenchida) e sai pra outra aba, depois de
// um tempo esquecida lá ela volta limpa — em vez de ficar presa mostrando
// uma rota antiga de sessões passadas. Só conta o tempo enquanto a aba de
// rota NÃO está selecionada: updateHeaderAndNav() (nav.js) chama
// scheduleRouteIdleClear() ao sair da aba "route" e cancelRouteIdleClear()
// ao entrar nela.
export function scheduleRouteIdleClear(){
if((!tripOrigin && !tripDestination && !lastTripResults.length) || routeIdleTimer) return;
routeIdleTimer = setTimeout(() => {
routeIdleTimer = null;
tripOrigin = null;
tripDestination = null;
resetRouteResults();
// só mexe no resto do DOM se por algum motivo a tela de rota ainda
// estiver montada (ex.: chamado de outro contexto) — o caso normal é
// ela já não existir mais, porque a pessoa está em outra aba.
const oInput = el("tripOriginInput");
if(oInput) oInput.value = "";
const dInput = el("tripDestInput");
if(dInput) dInput.value = "";
updateTripClearBtn("o");
updateTripClearBtn("d");
refreshPlanBtn();
}, ROUTE_IDLE_CLEAR_MS);
}

export function cancelRouteIdleClear(){
clearTimeout(routeIdleTimer);
routeIdleTimer = null;
}

export function handleTripGeo(field, q){
clearTimeout(tripGeoDebounce);
const suggestEl = el(field === "o" ? "tripOriginSuggest" : "tripDestSuggest");
if(field === "o") tripOrigin = null; else tripDestination = null;
refreshPlanBtn();
updateTripClearBtn(field);
if(!q){
// apagou o campo todo (backspace até o fim, ou o botão de limpar) — a
// rota/resultado que estava na tela não vale mais nada sem uma das
// duas pontas, então some com eles em vez de deixar uma rota órfã e
// desatualizada visível enquanto a pessoa monta uma busca nova.
resetRouteResults();
}
if(!q || q.trim().length < 3){ suggestEl.innerHTML = ""; return; }
tripGeoDebounce = setTimeout(async () => {
try{
const results = await nominatimSearch(q);
const freshEl = el(field === "o" ? "tripOriginSuggest" : "tripDestSuggest");
if(!freshEl) return; // usuário já saiu da tela de rota antes da busca terminar
freshEl.innerHTML = results.length ? `<div class="geoSuggest">${results.map((r,i) =>
`<div onclick='selectTripGeo("${field}", ${r.lat}, ${r.lng}, ${JSON.stringify(r.label)})'>${r.label}</div>`
).join("")}</div>` : `<div class="geoSuggest"><div style="color:var(--ink-soft);">Nenhum lugar encontrado.</div></div>`;
}catch(e){
// Sem isso, "sem internet" e "procurei e não achei nada" apareciam com
// o mesmo texto genérico pro usuário — não dava pra saber se era culpa
// da conexão ou se o lugar digitado realmente não existe.
console.error("[BusBus] erro ao buscar endereço:", e);
const freshEl = el(field === "o" ? "tripOriginSuggest" : "tripDestSuggest");
if(!freshEl) return;
freshEl.innerHTML = `<div class="geoSuggest"><div style="color:var(--ink-soft);">${friendlyErrMsg(e)}</div></div>`;
}
}, 450);
}

export function selectTripGeo(field, lat, lng, label){
const val = { lat, lng, label };
if(field === "o"){ tripOrigin = val; el("tripOriginInput").value = label; el("tripOriginSuggest").innerHTML = ""; }
else { tripDestination = val; el("tripDestInput").value = label; el("tripDestSuggest").innerHTML = ""; }
refreshPlanBtn();
updateTripClearBtn(field);
}

export function getRouteForPattern(segs, patternId){
const seg = segs.find(p => String(p.id) === String(patternId)) || segs[0];
return seg ? (seg.polyLine || []) : [];
}

export function closestDistanceToPoint(route, target){
if(!route || !route.length) return { dist: Infinity, point: null };
let minD = Infinity, minP = null;
const step = Math.max(1, Math.floor(route.length / 900));
for(let i = 0; i < route.length; i += step){
const d = metersBetween(route[i], target);
if(d < minD){ minD = d; minP = route[i]; }
}
return { dist: minD, point: minP };
}

export function nearestRealStop(point, points, maxD = 250){
let best = null, bestD = Infinity;
for(const p of points){ const d = metersBetween(point, p); if(d < bestD){ bestD = d; best = p; } }
return best ? { ...best, d: bestD, withinRange: bestD <= maxD } : null;
}

export const WALK_OK = 700; // metros — "perto o bastante pra caminhar" até uma parada ou até o destino final

export let planTrace = []; // log passo a passo da última tentativa, pra diagnóstico

export function trace(msg){ planTrace.push(msg); }

export function renderDiagnosticBlock(){
return `<details class="diagCard">
<summary>Ver diagnóstico técnico (${planTrace.length} passo(s))</summary>
<div class="diagLog">${planTrace.map(l => `<div>${l}</div>`).join("")}</div>
</details>`;
}

// Cards fantasma do MESMO tamanho/formato dos .tripCard de verdade
// (renderTripResults, mais abaixo) — badge+texto do topo, uma perna a pé,
// uma perna de ônibus com selo redondo, outra perna a pé. Mostrados
// enquanto planTrip() ainda está calculando, pra a tela não ficar só com
// um texto de status solto enquanto a busca (que passa por várias etapas
// de rede) roda.
export function skeletonTripCards(n = 2){
return Array.from({length:n}).map(() => `
<div class="tripCard" style="cursor:default;">
<div class="skeletonLine" style="width:60%;height:13px;margin-bottom:14px;"></div>
<div class="skeletonLine" style="width:45%;margin-bottom:10px;"></div>
<div class="legConnector"></div>
<div class="legBus" style="pointer-events:none;">
<div class="skeletonIcon" style="width:40px;height:28px;border-radius:10px;"></div>
<div class="skeletonLine" style="width:55%;"></div>
</div>
<div class="legConnector"></div>
<div class="skeletonLine" style="width:50%;margin-top:10px;"></div>
</div>`).join("");
}

export async function planTrip(){
planTrace = [];
savedRouteScrollY = 0; // busca nova: a tela deve abrir do topo, não restaurar rolagem de uma busca anterior
const area = el("tripResultsArea");
const mapWrap = el("tripMapWrap");
// Mesma caixa de "carregando o mapa" (spinner) usada nas outras telas com
// mapa — antes essa aqui só mostrava alguma coisa no lugar do mapa DEPOIS
// que um resultado já tinha chegado; enquanto a busca ainda rodava (e ela
// passa por várias chamadas de rede em sequência) ficava uma área vazia
// ali embaixo do botão, sem nenhum sinal de carregamento.
if(mapWrap){
mapWrap.style.display = "block";
const mapBox = el("tripMapContainer");
if(mapBox) mapBox.innerHTML = mapLoadingHTML("Carregando a rota…");
}
// Atualiza só o texto de status (dentro de #tripStatusMsg), preservando
// os cards fantasma abaixo dele — se escrevesse em area.innerHTML direto
// a cada etapa, os cards fantasma sumiam e voltavam a cada mensagem nova.
const setStatus = (msg) => {
const statusEl = el("tripStatusMsg");
if(statusEl){ statusEl.innerHTML = statusHTML(msg, true); return; }
area.innerHTML = `<div id="tripStatusMsg">${statusHTML(msg, true)}</div>${skeletonTripCards(2)}`;
};
setStatus("Buscando paradas perto de você…");
try{
const points = await ensureAllPoints();
trace(`allPoints retornou ${points.length} parada(s) com id+lat/lng reconhecidos no total da cidade.`);
const nearOrigin = points.map(p => ({ ...p, d: metersBetween(tripOrigin, p) }))
.sort((a,b) => a.d - b.d).slice(0, 6);
trace(`6 paradas mais próximas da origem: ${nearOrigin.map(s => `${s.name} (${Math.round(s.d)}m)`).join(", ") || "nenhuma"}.`);
setStatus(`Verificando linhas em ${nearOrigin.length} parada(s) próxima(s)…`);
const linesByStop = await Promise.all(nearOrigin.map(s => fetchScheduledLinesAtStop(s.id)));
nearOrigin.forEach((s,i) => {
trace(`Parada "${s.name}": linesFromBusstop devolveu ${linesByStop[i].length} linha(s)${linesByStop[i].length ? " (" + linesByStop[i].map(l=>l.numero).join(", ") + ")" : ""}.`);
});
trace(`Usando linesFromBusstop (grade programada), não o fromPoint em tempo real — então a linha aparece aqui mesmo sem ônibus ativo rastreado agora.`);
const candidates = new Map();
nearOrigin.forEach((stop, i) => {
linesByStop[i].forEach(l => {
const key = l.patternId;
const existing = candidates.get(key);
if(!existing || stop.d < existing.boardStop.d){
candidates.set(key, { boardStop: stop, line: l });
}
});
});
const candList = Array.from(candidates.values()).slice(0, 14);
trace(`${candList.length} linha(s) candidata(s) únicas no total (deduplicadas por patternId).`);
if(!candList.length){
if(mapWrap) mapWrap.style.display = "none";
area.innerHTML = `<div class="empty">Nenhuma linha com ônibus ativo agora passa perto de onde você está (raio: 6 paradas mais próximas). Tente de novo mais tarde, ou ajuste a origem.</div>${renderDiagnosticBlock()}`;
return;
}
setStatus(`Verificando ${candList.length} linha(s) candidata(s)…`);
const directResults = [];
for(const c of candList){
const segs = await getPatternSegments(c.line.busServiceId);
const route = getRouteForPattern(segs, c.line.patternId);
if(route.length < 2){ trace(`Linha ${c.line.numero}: sem geometria de rota retornada pelo /pattern — pulada.`); continue; }
const { dist, point } = closestDistanceToPoint(route, tripDestination);
trace(`Linha ${c.line.numero} (embarque: ${c.boardStop.name}): ponto mais próximo do destino na rota fica a ${Math.round(dist)}m ${dist <= WALK_OK ? "✅ direto" : "— longe demais a pé"}.`);
if(dist <= WALK_OK){
const alightStop = nearestRealStop(point, points, 300);
directResults.push({ type: "direct", boardStop: c.boardStop, line: c.line, walkFrom: dist, alightStop });
}
}
directResults.sort((a,b) => (a.boardStop.d + a.walkFrom) - (b.boardStop.d + b.walkFrom));
if(directResults.length){
renderTripResults(directResults.slice(0, 4));
return;
}
trace(`Nenhuma linha direta chegou perto o bastante do destino. Procurando baldeação…`);
setStatus("Sem linha direta — procurando conexões com baldeação…");
const transferStopsToTry = [];
for(const c of candList.slice(0, 6)){
const segs = await getPatternSegments(c.line.busServiceId);
const route = getRouteForPattern(segs, c.line.patternId);
if(route.length < 2) continue;
let lastSample = route[0], found = 0;
for(let i = 1; i < route.length && found < 3; i++){
if(metersBetween(lastSample, route[i]) < 450) continue;
lastSample = route[i];
const near = nearestRealStop(route[i], points, 180);
if(near && near.id !== c.boardStop.id){
transferStopsToTry.push({ leg1: c, transferStop: near });
found++;
}
}
if(transferStopsToTry.length >= 9) break;
}
trace(`${transferStopsToTry.length} possível(is) parada(s) de baldeação encontrada(s) ao longo das rotas candidatas.`);
const transferResults = [];
for(const t of transferStopsToTry.slice(0, 9)){
const legBLines = await fetchScheduledLinesAtStop(t.transferStop.id);
trace(`Baldeação em "${t.transferStop.name}" (linha ${t.leg1.line.numero}): linesFromBusstop achou ${legBLines.length} linha(s) ali.`);
for(const lb of legBLines){
if(lb.patternId === t.leg1.line.patternId) continue; // mesma linha, não é baldeação de verdade
const segs = await getPatternSegments(lb.busServiceId);
const route = getRouteForPattern(segs, lb.patternId);
if(route.length < 2) continue;
const { dist, point } = closestDistanceToPoint(route, tripDestination);
trace(`  ↳ Linha ${lb.numero} a partir daí: ${Math.round(dist)}m do destino ${dist <= WALK_OK ? "✅" : "— longe demais"}.`);
if(dist <= WALK_OK){
const alightStop = nearestRealStop(point, points, 300);
transferResults.push({
type: "transfer", boardStop: t.leg1.boardStop, line: t.leg1.line,
transferStop: t.transferStop, line2: lb, walkFrom: dist, alightStop
});
break; // já achou uma conexão boa a partir dessa parada de baldeação, não precisa testar mais linhas daqui
}
}
if(transferResults.length >= 4) break;
}
transferResults.sort((a,b) => (a.boardStop.d + a.walkFrom) - (b.boardStop.d + b.walkFrom));
if(transferResults.length){
renderTripResults(transferResults.slice(0, 3));
} else {
if(mapWrap) mapWrap.style.display = "none";
area.innerHTML = `<div class="empty">Não encontrei uma rota direta nem com 1 baldeação. Tente uma origem ou destino um pouco diferente, ou use a busca por parada/linha manualmente.</div>${renderDiagnosticBlock()}`;
}
}catch(e){
if(mapWrap) mapWrap.style.display = "none";
trace(`Erro não esperado: ${e.message}`);
area.innerHTML = `<div class="status err">Erro ao traçar a rota: ${e.message}</div>${renderDiagnosticBlock()}`;
}
}

export let lastTripResults = [];

// Os onclick="" dos cartões de resultado (abaixo) são strings de HTML, não
// código JS de verdade — então eles só conseguem chamar algo que exista
// como propriedade global de window. "lastTripResults" é um "let" deste
// módulo que é REATRIBUÍDO (não só alterado por dentro) a cada nova busca;
// expor a variável em si em window ficaria com uma cópia congelada do
// valor de quando a exposição rodou (o array vazio inicial), igual ao bug
// do pendingSearchScrollRestore em search.js/nav.js. Por isso expomos uma
// função — getTripResult() — que lê lastTripResults de novo a cada toque,
// sempre pegando o valor atual.
export function getTripResult(i){ return lastTripResults[i]; }

// Índice do resultado cujo traçado está sendo mostrado no mapa agora —
// antes não existia nenhum jeito de saber, só olhando o mapa, qual dos
// cartões da lista (quando há mais de um) era o selecionado. renderTripResults
// sempre mostra o primeiro resultado automaticamente, por isso começa em 0.
export let selectedTripResultIndex = 0;

export function selectTripResult(i){
selectedTripResultIndex = i;
showTripOnMap(getTripResult(i));
document.querySelectorAll("#tripResultsArea .tripCard").forEach((card, idx) => {
card.classList.toggle("selected", idx === i);
});
}

// preserveSelection: true quando é uma VOLTA pra essa tela (ex.: depois de
// abrir o GPS de um ônibus e apertar voltar) — mantém o card que já estava
// selecionado em vez de pular pro primeiro resultado de novo. Numa busca
// nova (planTrip) não é passado, e o padrão é mostrar sempre o primeiro —
// não haveria sentido em "lembrar" a seleção de uma busca anterior.
export function renderTripResults(results, preserveSelection){
lastTripResults = results;
if(!preserveSelection || selectedTripResultIndex >= results.length) selectedTripResultIndex = 0;
const area = el("tripResultsArea");
area.innerHTML = results.map((r,i) => {
const walkToBoard = Math.round(r.boardStop.d);
const walkFromAlight = Math.round(r.walkFrom);
const selectedCls = i === selectedTripResultIndex ? " selected" : "";
// O card inteiro é clicável (onclick="selectTripResult(i)") — é mais
// fácil de acertar com o dedo do que um botãozinho de mapa na lateral,
// e deixa o cartão mais limpo. Os trechos de ônibus (.legBus) têm a
// própria ação (abrir o GPS ao vivo daquele ônibus) e por isso cortam a
// propagação do clique, senão tocar neles também re-selecionaria o
// card no mapa à toa antes de navegar pra outra tela.
if(r.type === "direct"){
return `
<div class="tripCard${selectedCls}" onclick="selectTripResult(${i})">
<div class="tripBadgeRow direct">${walkIcon} Sem baldeação · ~${walkToBoard + walkFromAlight}m a pé no total</div>
<div class="legWalk">${walkIcon} ${walkToBoard}m até ${r.boardStop.name}</div>
<div class="legConnector"></div>
<div class="legBus" onclick="event.stopPropagation(); openLegLive(${r.boardStop.id}, ${r.boardStop.lat}, ${r.boardStop.lng}, ${jsStr(r.boardStop.name)}, ${r.line.busServiceId}, ${r.line.patternId})">
<div class="badge">${r.line.numero}</div>
<div class="d">${r.line.name}${r.line.dest ? " · " + r.line.dest : ""}</div>
${busIcon}
</div>
<div class="legConnector"></div>
<div class="legWalk">${walkIcon} ${walkFromAlight}m${r.alightStop ? " (perto de " + r.alightStop.name + ")" : ""} até o destino</div>
</div>`;
}
return `
<div class="tripCard${selectedCls}" onclick="selectTripResult(${i})">
<div class="tripBadgeRow">${walkIcon} 1 baldeação · ~${walkToBoard + walkFromAlight}m a pé no total</div>
<div class="legWalk">${walkIcon} ${walkToBoard}m até ${r.boardStop.name}</div>
<div class="legConnector"></div>
<div class="legBus" onclick="event.stopPropagation(); openLegLive(${r.boardStop.id}, ${r.boardStop.lat}, ${r.boardStop.lng}, ${jsStr(r.boardStop.name)}, ${r.line.busServiceId}, ${r.line.patternId})">
<div class="badge">${r.line.numero}</div>
<div class="d">${r.line.name}${r.line.dest ? " · " + r.line.dest : ""}</div>
${busIcon}
</div>
<div class="legConnector"></div>
<div class="legWalk" style="color:var(--soon);font-weight:600;">↳ desça em ${r.transferStop.name}</div>
<div class="legBus" onclick="event.stopPropagation(); openLegLive(${r.transferStop.id}, ${r.transferStop.lat}, ${r.transferStop.lng}, ${jsStr(r.transferStop.name)}, ${r.line2.busServiceId}, ${r.line2.patternId})">
<div class="badge">${r.line2.numero}</div>
<div class="d">${r.line2.name}${r.line2.dest ? " · " + r.line2.dest : ""}</div>
${busIcon}
</div>
<div class="legConnector"></div>
<div class="legWalk">${walkIcon} ${walkFromAlight}m${r.alightStop ? " (perto de " + r.alightStop.name + ")" : ""} até o destino</div>
</div>`;
}).join("") + renderDiagnosticBlock();
if(results[selectedTripResultIndex]) showTripOnMap(results[selectedTripResultIndex]);
}

export async function openLegLive(stopId, stopLat, stopLng, stopName, busServiceId, patternId){
const myToken = bumpNavToken(); // ver stops.js selectStop()
savedRouteScrollY = window.scrollY; // pra restaurar quando a pessoa voltar pra essa posição na tela de rota
destroyLeafletMap();
if(!state.stops.find(s => String(s.id) === String(stopId))) state.stops.push({ id: stopId, name: stopName, lat: stopLat, lng: stopLng });
state.stopSel = { id: stopId, name: stopName, lat: stopLat, lng: stopLng };
state.view = "map";
state.followBusEnabled = true;
updateHeaderAndNav("map");
pushNav("map"); // empilha ANTES do carregamento assíncrono (ver stops.js selectStop)
el("subtitle").textContent = `perto de ${stopName}`;
render(`<div class="mainMapContainer" style="height:280px;"><div id="mapContainer">${mapLoadingHTML("Carregando rota e posição do ônibus…")}</div><div class="mapBtnStack">${followBtnHTML()}</div></div><section id="busListSection"><div class="sectionTitle">Buscando veículos…</div>${skeletonLineRows(2)}</section>`);
try{
const segs = await getPatternSegments(busServiceId);
if(myToken !== navToken) return; // a pessoa já saiu dessa tela enquanto isso carregava
state.route = getRouteForPattern(segs, patternId);
state.lineSel = { busServiceId, patternId, name: "Linha", dest: "" };
const lines = await fetchLinesAtStop(stopId);
if(myToken !== navToken) return;
const match = lines.find(l => String(l.patternId) === String(patternId));
if(match) state.lineSel = match;
initLineRouteMap(segs, patternId);
await refreshBusesOnMap();
if(myToken !== navToken) return;
startPolling();
}catch(e){
if(myToken !== navToken) return;
render(`${statusHTML("Erro ao carregar essa linha: "+e.message, false, true)}`);
}
}
