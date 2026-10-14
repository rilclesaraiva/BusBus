// BusBus Experimental Modular (B.E.M.) — módulo "stops.js"
// Copyright (C) 2026 rilclesaraiva — licenciado sob GNU GPLv3.
// Texto completo: https://github.com/rilclesaraiva/BusBus/blob/main/LICENSE

import L from "leaflet";
import { state, CITY, isFavorite } from "./state.js";
import { el, jsStr, pick, fmtEta, statusHTML, errMsg, render, mapLoadingHTML, isOfflineError, OFFLINE_MSG } from "./utils.js";
import { api } from "./api.js";
import { pinIcon, starIconFilled, starIconOutline, busIcon } from "./icons.js";
import { getDepartureSchedule, fetchScheduledLinesAtStop } from "./api.js";
import {
  destroyLeafletMap, initLeafletMapOnce, updateMapUserPosition, focusStopOnMap,
  updateStopMarkersOnMap, initLineRouteMap, fitMapToBusAndStop, getBusBearing,
  busMarkersGroup,
} from "./map.js";
// Importação circular de propósito: a navegação (voltar/avançar de aba)
// precisa chamar renderStopsScreenStructure/startGpsTracking ao voltar pra
// "paradas", e esta tela precisa empilhar navegação (pushNav) ao abrir uma
// parada/linha. Só funciona porque as chamadas ficam dentro de funções, não
// no topo do módulo.
import { pushNav, updateHeaderAndNav, bumpNavToken, navToken } from "./nav.js";
import { startGpsTracking } from "./gps.js";

export function weatherEmoji(code){
if(code === 0) return "☀️";
if(code === 1 || code === 2) return "🌤️";
if(code === 3) return "☁️";
if(code === 45 || code === 48) return "🌫️";
if(code >= 51 && code <= 57) return "🌦️";
if(code >= 61 && code <= 67) return "🌧️";
if(code >= 71 && code <= 77) return "🌨️";
if(code >= 80 && code <= 82) return "🌧️";
if(code === 85 || code === 86) return "🌨️";
if(code >= 95) return "⛈️";
return "🌡️";
}

export async function fetchWeather(lat, lng){
try{
const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,apparent_temperature,weather_code,precipitation&timezone=auto`;
const res = await fetch(url);
if(!res.ok) return;
const data = await res.json();
const c = data && data.current;
if(!c) return;
state.weather = {
temp: Math.round(c.temperature_2m),
feels: Math.round(c.apparent_temperature),
code: c.weather_code,
precip: c.precipitation
};
renderWeatherChip();
}catch(e){ console.error("[BusBus] clima falhou:", e); }
}

export function renderWeatherChip(){
const chip = el("weatherChip");
if(!chip || !state.weather) return;
const w = state.weather;
chip.innerHTML = `<span class="wIcon">${weatherEmoji(w.code)}</span>${w.temp}°<span class="wFeels">sensação ${w.feels}°</span>`;
chip.style.display = "flex";
}

export function toggleWeatherDetail(){
let card = el("weatherDetailCard");
if(card){ card.remove(); return; }
if(!state.weather) return;
const w = state.weather;
const chip = el("weatherChip");
if(!chip) return;
const mapWrap = chip.closest(".mainMapContainer");
if(!mapWrap) return;
const div = document.createElement("div");
div.id = "weatherDetailCard";
div.className = "weatherDetailCard";
div.innerHTML = `<b>Previsão agora:</b> ${weatherEmoji(w.code)} ${w.temp}°C, sensação de ${w.feels}°C.`
+ (w.precip > 0 ? ` Chuva em curso (${w.precip}mm).` : " Sem chuva no momento.")
+ ` Bom saber se vale esperar o ônibus com guarda-chuva ou não.`;
mapWrap.insertAdjacentElement("afterend", div);
}

export function renderStopsScreenStructure(){
state.view = "stops";
destroyLeafletMap();
updateHeaderAndNav("stops");
// O subtítulo de "Radar de Xm (fonte)" só era escrito dentro de
// fetchStopsSilent(), que só roda de novo quando a localização mudou o
// bastante ou ficou velha o bastante — então, ao voltar pra essa aba sem
// nenhuma dessas condições, o subtítulo continuava mostrando o texto da
// tela anterior (ex: "Ajustes do Radar"). Escreve aqui, na hora de montar a
// tela, pra sempre corresponder à tela que está de fato na tela.
const subtitleEl = el("subtitle");
if(subtitleEl){
subtitleEl.textContent = state.coord
? `Radar de ${state.radarRadius}m (${state.locSource})`
: "Buscando sua localização…";
}
render(`
<div class="mainMapContainer">
<div id="mapContainer"></div>
<div class="mapLoadingOverlay" id="mapLoadingOverlay">${mapLoadingHTML("Carregando mapa…")}</div>
<div class="weatherChip" id="weatherChip" style="display:none;" onclick="toggleWeatherDetail()" title="Previsão do tempo"></div>
<div class="mapBtnStack">
<button class="mapBtn" id="locateBtn" onclick="recenterMap()" title="Ir para minha localização">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>
</button>
${state.rotationEnabled ? `
<button class="mapBtn" id="compassBtn" onclick="resetOrientation()" title="Reorientar o mapa para o norte">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 L12 6 M9 4 L12 2 L15 4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="13" r="8"/><polygon points="12 9 14 13 12 17 10 13" fill="currentColor" stroke="none"/></svg>
</button>` : ""}
</div>
</div>
<div id="statusArea"></div>
<section id="stopList">${renderFavoritesSection()}${state.stops.length > 0 ? "" : skeletonStopCards()}</section>
`);
try{ initLeafletMapOnce(); }catch(e){ console.error("[BusBus] mapa indisponível:", e); }
if(state.stops.length > 0) renderStopsListOnly();
if(state.weather) renderWeatherChip();
}

export function skeletonStopCards(n = 3){
return `<div class="sectionTitle">Buscando paradas…</div>` + Array.from({length:n}).map(() => `
<div class="skeletonCard">
<div class="skeletonIcon"></div>
<div style="flex:1;">
<div class="skeletonLine" style="width:70%;margin-bottom:8px;"></div>
<div class="skeletonLine" style="width:45%;"></div>
</div>
</div>`).join("");
}

export async function fetchStopsSilent(){
if(!state.coord) return;
const subtitleEl = el("subtitle");
if(subtitleEl) subtitleEl.textContent = `Radar de ${state.radarRadius}m (${state.locSource})`;
try {
const data = await api(`/busStop/${state.coord.lat}/${state.coord.lng}/${CITY}?radiusInMeters=${state.radarRadius}`);
const list = Array.isArray(data) ? data : (data.items || data.result || []);
state.stops = list.map(s => ({
id: pick(s, ["id","pointId","idPonto","pointLocationId"]),
name: pick(s, ["name","nome","nomePonto","description"], "Parada sem nome"),
lat: pick(s, ["lat","latitude"]) ?? (s.latLng && s.latLng.lat),
lng: pick(s, ["lng","lon","longitude"]) ?? (s.latLng && s.latLng.lng),
raw: s
})).filter(s => s.id !== null);
updateStopMarkersOnMap();
renderStopsListOnly();
} catch(e){
console.error("[BusBus] erro ao buscar paradas:", e);
const list = el("stopList");
const msg = isOfflineError(e) ? OFFLINE_MSG : ("Erro ao buscar paradas: " + errMsg(e));
if(list) list.innerHTML = renderFavoritesSection() + statusHTML(msg, false, true);
}
}

export function renderFavoritesSection(){
if(!state.favoriteStops.length) return "";
const html = state.favoriteStops.map(f => `
<div class="stopCard" onclick="openFavoriteStop('${f.id}', ${f.lat}, ${f.lng}, ${jsStr(f.name)})">
<div class="stopIcon" style="background:var(--soon-soft);color:var(--soon);">${starIconFilled}</div>
<div class="stopInfo">
<div class="name">${f.name}</div>
<div class="meta">Toque para ver as linhas neste sentido</div>
</div>
</div>`).join("");
return `<div class="sectionTitle">Favoritas</div>${html}`;
}

export function renderStopsListOnly(){
const listEl = el("stopList");
if(!listEl) return;
const html = state.stops.map(s => `
<div class="stopCard" onclick="focusStopOnMap(${s.lat}, ${s.lng}); selectStop('${s.id}')">
<div class="stopIcon">${pinIcon}</div>
<div class="stopInfo">
<div class="name">${s.name}</div>
<div class="meta">Toque para ver as linhas neste sentido</div>
</div>
</div>`).join("");
listEl.innerHTML = `
${renderFavoritesSection()}
<div class="sectionTitle">${state.stops.length} parada(s) encontradas</div>
${html || `<div class="empty">${pinIcon}<div>Nenhuma parada encontrada no raio. Ajuste nos Ajustes.</div></div>`}
`;
}

export let savedStopsScrollY = 0; // guarda a posição de rolagem da home (lista de paradas) pra restaurar ao voltar de uma parada

export let savedLinesScrollY = 0; // guarda a posição de rolagem da lista de linhas pra restaurar ao voltar do mapa do ônibus

export function skeletonLineRows(n = 4){
return Array.from({length:n}).map(() => `
<div class="lineRow" style="cursor:default;">
<div class="skeletonIcon" style="width:52px;height:36px;border-radius:12px;"></div>
<div style="flex:1;">
<div class="skeletonLine" style="width:75%;margin-bottom:8px;"></div>
<div class="skeletonLine" style="width:40%;"></div>
</div>
</div>`).join("");
}

export function toggleFavorite(id, name, lat, lng){
if(isFavorite(id)){
state.favoriteStops = state.favoriteStops.filter(f => String(f.id) !== String(id));
} else {
state.favoriteStops.push({ id, name, lat, lng });
}
try{ localStorage.setItem("busbus_favorites", JSON.stringify(state.favoriteStops)); }catch(e){}
const btn = el("favBtn");
if(btn) btn.innerHTML = isFavorite(id) ? starIconFilled : starIconOutline;
}

export function openFavoriteStop(id, lat, lng, name){
if(!state.stops.find(s => String(s.id) === String(id))) state.stops.push({ id, name, lat, lng });
focusStopOnMap(lat, lng);
selectStop(id);
}

export async function selectStop(id){
// Marca essa chamada como "a navegação atual" — se a pessoa sair dessa
// tela (voltar, ou abrir outra parada) antes da API responder, o token
// muda e o resultado atrasado é descartado em vez de ser desenhado em
// cima de qualquer tela que esteja aberta na hora (ver bumpNavToken em
// nav.js).
const myToken = bumpNavToken();
// guarda onde a pessoa estava rolada na home ANTES de sair dela — só faz
// sentido quando ela realmente está vindo da home (toque num resultado de
// busca ou numa favorita vindo de outra tela não deve sobrescrever isso
// com a rolagem de uma tela diferente).
if(state.view === "stops") savedStopsScrollY = window.scrollY;
destroyLeafletMap();
savedLinesScrollY = 0; // parada nova: a lista deve abrir do topo, não restaurar rolagem de uma parada anterior
const stop = state.stops.find(s => String(s.id) === String(id)) || { name: "Parada " + id, id: id };
state.stopSel = stop;
state.view = "lines";
updateHeaderAndNav("lines");
// pushNav tem que acontecer AQUI, antes do carregamento assíncrono abaixo
// — não só depois que os dados chegam. A tela já muda pra "lines" agora
// (botão de voltar aparece, cabeçalho atualiza), então o histórico
// precisa refletir isso na hora, senão voltar (gesto do Android ou botão
// do app) durante o carregamento não tem pra onde ir: o gesto do sistema
// fecha o app, e o botão do app trava "isPopping" pra sempre (porque o
// popstate esperado nunca chega), quebrando a navegação até um reload.
pushNav("lines");
el("subtitle").textContent = stop.name;
render(`<section><div class="sectionTitle">Buscando linhas no ponto…</div>${skeletonLineRows()}</section>`);
try{
let data = await api(`/forecast/lines/fromPoint/${id}/${CITY}`);
let list = Array.isArray(data) ? data : (data.items || data.result || []);
state.lines = list.map(l => ({
busServiceId: pick(l, ["busServiceId","idLinha","lineId"]),
patternId: pick(l, ["patternId","idPadrao","patternID"]),
number: pick(l, ["busServiceNumber","numero","number"], "—"),
name: pick(l, ["nameLine","lineDescription","description","name"], "Linha"),
dest: pick(l, ["destination","destino"], ""),
etaMin: pick(l, ["arrivalTime","previsao","etaMinutes"]),
schedTime: pick(l, ["scheduleTime","horario","time","horaProgramada"]),
scheduled: false,
raw: l
}));
if(state.lines.length === 0){
const scheduled = await fetchScheduledLinesAtStop(id);
state.lines = scheduled.map(l => ({
busServiceId: l.busServiceId, patternId: l.patternId,
number: l.numero, name: l.name, dest: l.dest,
etaMin: null, schedTime: null, scheduled: true
}));
}
if(myToken !== navToken) return; // a pessoa já saiu dessa tela enquanto isso carregava
renderLines();
}catch(e){
if(myToken !== navToken) return;
render(`${statusHTML("Erro ao buscar linhas: " + errMsg(e), false, true)}`);
}
}

export function renderLines(){
const anyScheduled = state.lines.some(l => l.scheduled);
const rows = state.lines.map((l,i) => {
if(l.scheduled){
return `<div class="lineRow" onclick="selectLine(${i})">
<div class="badge" style="background:var(--river-soft);color:var(--river);">${l.number}</div>
<div class="dest">${l.name}${l.dest ? `<br><small style="color:var(--ink-soft);font-weight:400;">Sentido: ${l.dest}</small>` : ''}</div>
<div class="eta">—<small>ver horário</small></div>
</div>`;
}
const eta = fmtEta(l.etaMin, l.schedTime);
return `<div class="lineRow" onclick="selectLine(${i})">
<div class="badge">${l.number}</div>
<div class="dest">${l.name}${l.dest ? `<br><small style="color:var(--ink-soft);font-weight:400;">Sentido: ${l.dest}</small>` : ''}</div>
<div class="eta ${eta.cls}">${eta.label}<small>${eta.isSched ? 'programado' : 'previsão'}</small></div>
</div>`;
}).join("");
const s = state.stopSel;
const fav = isFavorite(s.id);
render(`
<section>
<div class="sectionTitleRow">
<div class="sectionTitle">Linhas em ${s.name}</div>
<button class="favStar" id="favBtn" onclick="toggleFavorite('${s.id}', ${jsStr(s.name)}, ${s.lat}, ${s.lng})" title="Favoritar parada">
${fav ? starIconFilled : starIconOutline}
</button>
</div>
${anyScheduled ? `<div style="font-size:12px;color:var(--ink-soft);margin-bottom:10px;">Nenhum ônibus com GPS ativo agora — mostrando a grade de linhas programadas pra essa parada. Toque numa linha pra ver o horário.</div>` : ""}
${rows || `<div class="empty">Nenhuma linha cadastrada pra essa parada.</div>`}
</section>
`);
}

export async function selectLine(i){
const myToken = bumpNavToken(); // ver selectStop() acima
savedLinesScrollY = window.scrollY; // guarda onde a pessoa estava na lista antes de abrir o GPS do ônibus
destroyLeafletMap();
state.lineSel = state.lines[i];
state.view = "map";
state.followBusEnabled = true;
updateHeaderAndNav("map");
pushNav("map"); // mesmo motivo de selectStop() acima: empilha ANTES do carregamento assíncrono
const titleText = state.lineSel.dest ? `${state.lineSel.name} (${state.lineSel.dest})` : state.lineSel.name;
el("subtitle").textContent = titleText;
render(`
<div class="mainMapContainer" style="height:280px;">
<div id="mapContainer">${mapLoadingHTML("Carregando rota e posição do ônibus…")}</div>
<div class="mapBtnStack">${followBtnHTML()}</div>
</div>
<section id="busListSection"><div class="sectionTitle">Buscando veículos…</div>${skeletonLineRows(2)}</section>
`);
try{
const pat = await api(`/pattern/${state.lineSel.busServiceId}/${CITY}`);
if(myToken !== navToken) return; // a pessoa já saiu dessa tela enquanto isso carregava
const seg = (Array.isArray(pat) ? pat : []).find(p => String(p.id) === String(state.lineSel.patternId)) || pat[0];
state.route = seg ? seg.polyLine : [];
initLineRouteMap(pat, state.lineSel.patternId);
await refreshBusesOnMap();
if(myToken !== navToken) return; // checa de novo: outro await pode ter passado por cima da navegação
startPolling();
}catch(e){
if(myToken !== navToken) return;
render(`${statusHTML("Erro ao carregar a rota", false, true)}`);
}
}

export function followBtnHTML(){
return `
<button class="mapBtn ${state.followBusEnabled ? 'followActive' : ''}" id="followBusBtn" onclick="toggleFollowBus()" title="Seguir ônibus">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke-linecap="round"/><rect x="2.5" y="2.5" width="4" height="4" rx="1" fill="none" stroke="none"/></svg>
</button>`;
}

export function toggleFollowBus(){
state.followBusEnabled = !state.followBusEnabled;
const btn = el("followBusBtn");
if(btn) btn.classList.toggle("followActive", state.followBusEnabled);
if(state.followBusEnabled) fitMapToBusAndStop();
}

export async function refreshBusesOnMap(){
try{
const data = await api(`/all/forecast/${state.stopSel.id}/${state.lineSel.patternId}/${CITY}`);
state.buses = (Array.isArray(data) ? data : []).map(b => ({
plate: b.codVehicle, lat: b.latLng && b.latLng.lat, lng: b.latLng && b.latLng.lng,
eta: b.arrivalTime, dest: b.destination
})).filter(b => b.lat && b.lng);
if(busMarkersGroup) busMarkersGroup.clearLayers();
state.buses.forEach(b => {
const angle = getBusBearing(state.route, b.lat, b.lng);
const busSvgIcon = L.divIcon({
className: 'bus-pin-marker',
html: `<div style="position:relative;width:36px;height:36px;display:flex;align-items:center;justify-content:center;">
<div style="position:absolute;width:36px;height:36px;top:0;left:0;transform:rotate(${angle}deg);transform-origin:18px 18px;pointer-events:none;">
<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
<path d="M 12 8 L 18 2 L 24 8" stroke="#D64545" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>
<div style="width:26px;height:26px;background:#D64545;border:2px solid #ffffff;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#ffffff;box-shadow:0 2px 8px rgba(0,0,0,0.4);z-index:2;">
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="11" rx="2"/><path d="M3 12h18M7 17v2M17 17v2"/></svg>
</div>
</div>`,
iconSize: [36, 36], iconAnchor: [18, 18]
});
L.marker([b.lat, b.lng], { icon: busSvgIcon }).addTo(busMarkersGroup);
});
fitMapToBusAndStop();
renderBusListOnly();
}catch(e){ console.error("[BusBus] erro ao atualizar ônibus:", e); }
}

export function renderScheduleHTML(sched){
if(!sched || !sched.partidas || !sched.partidas.length) return `<div class="empty">Sem grade de horário cadastrada pra essa linha.</div>`;
const now = new Date();
const nowMin = now.getHours()*60 + now.getMinutes();
const toMin = t => { const [h,m] = t.split(":").map(Number); return h*60+m; };
let nextIdx = sched.partidas.findIndex(t => toMin(t) >= nowMin);
const pills = sched.partidas.map((t,i) => {
const isNext = i === nextIdx;
return `<span style="display:inline-block;margin:3px 5px 3px 0;padding:6px 11px;border-radius:999px;font-size:12.5px;font-weight:600;
${isNext ? "background:var(--primary);color:#fff;" : "background:var(--bg);color:var(--ink-soft);border:1px solid var(--line);"}">${t}${isNext ? " · próximo" : ""}</span>`;
}).join("");
return `
<div style="font-size:12px;color:var(--ink-soft);margin-bottom:8px;">Primeira partida ${sched.primeiraPartida} · última ${sched.ultimaPartida}</div>
<div>${pills}</div>
${nextIdx === -1 ? `<div style="font-size:12px;color:var(--ink-soft);margin-top:8px;">Já passou do horário de hoje — a primeira partida de amanhã é ${sched.partidas[0]}.</div>` : ""}
`;
}

export function renderBusListOnly(){
const secEl = el("busListSection");
if(!secEl) return;
if(state.buses.length){
const busList = state.buses.map(b=>{
const eta = fmtEta(b.eta);
const lineFullName = b.dest ? `${state.lineSel.name} (${b.dest})` : state.lineSel.name;
return `<div class="lineRow">
<div class="badge" style="background:var(--now-soft);color:var(--now);">${busIcon}</div>
<div class="dest">
${lineFullName}
<br>
<span class="plateTag">Veículo ${b.plate || "—"}</span>
</div>
<div class="eta ${eta.cls}">${eta.label}<small>previsão</small></div>
</div>`;
}).join("");
secEl.innerHTML = `
<div class="sectionTitleRow">
<div class="sectionTitle">Veículos nesta linha</div>
<button class="infoBtn" onclick="showRouteStreetsModal(state.lineSel.busServiceId, state.lineSel.patternId, state.route, state.lineSel.number)" title="Ver ruas desta linha">i</button>
</div>
${busList}
`;
return;
}
secEl.innerHTML = `
<div class="sectionTitleRow">
<div class="sectionTitle">Veículos nesta linha</div>
<button class="infoBtn" onclick="showRouteStreetsModal(state.lineSel.busServiceId, state.lineSel.patternId, state.route, state.lineSel.number)" title="Ver ruas desta linha">i</button>
</div>
<div class="empty" style="padding:24px 20px 10px;">Nenhum ônibus ativo com GPS nesta linha no momento.</div>
<div class="sectionTitle">Horário programado</div>
<div id="scheduleArea">${statusHTML("Buscando horários…", true)}</div>
`;
getDepartureSchedule(state.lineSel.patternId).then(sched => {
const sArea = el("scheduleArea");
if(sArea) sArea.innerHTML = renderScheduleHTML(sched);
});
}

export function startPolling(){ stopPolling(); state.timer = setInterval(refreshBusesOnMap, 10000); }

export function stopPolling(){ if(state.timer) clearInterval(state.timer); state.timer = null; }

document.addEventListener("visibilitychange", () => {
if (document.hidden) stopPolling();
else if (state.view === "map") startPolling();
});
