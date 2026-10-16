// BusBus Experimental Modular (B.E.M.) — módulo "map.js"
// Copyright (C) 2026 rilclesaraiva — licenciado sob GNU GPLv3.
// Texto completo: https://github.com/rilclesaraiva/BusBus/blob/main/LICENSE

import L from "leaflet";
import { state } from "./state.js";
import { effectiveMapIsDark, routeLineColor } from "./state.js";
import { el } from "./utils.js";
import { metersBetween } from "./utils.js";
// Importação circular de propósito: o marcador de uma parada, desenhado
// aqui no mapa, precisa abrir a tela de linhas daquela parada ao ser
// tocado. Módulos ES lidam bem com isso desde que a chamada só aconteça
// dentro de uma função (como este callback de clique), nunca no topo do
// módulo — nesse ponto os dois módulos já terminaram de carregar.
import { selectStop, clearBusMarkerTracking } from "./stops.js";

export let leafletMap = null;

export let userMarker = null;

export let stopMarkersGroup = null;

export let busMarkersGroup = null;

export let initialCenterSet = false;

export function addBaseMapLayers(map){
const dark = effectiveMapIsDark();
const layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19
}).addTo(map);
const applyDarkFilter = () => {
const pane = map.getPane("tilePane");
if(pane) pane.style.filter = dark ? "invert(1) hue-rotate(180deg) brightness(0.95) contrast(0.9)" : "";
};
// A caixa de carregamento da home (#mapLoadingOverlay, montada em
// renderStopsScreenStructure) fica por cima do #mapContainer até aqui — o
// Leaflet toma conta do container na hora (síncrono), mas os ladrilhos do
// OpenStreetMap ainda levam um tempo pra baixar da rede, e até lá só dava
// pra ver o fundo cinza vazio. O "load" do tileLayer dispara quando os
// ladrilhos visíveis terminaram (sucesso ou erro); o setTimeout é só uma
// rede de segurança pra não deixar a caixa presa pra sempre se a conexão
// cair bem no meio do carregamento.
const hideMapLoadingOverlay = () => { const o = el("mapLoadingOverlay"); if(o) o.remove(); };
if(layer && typeof layer.on === "function"){
layer.on("load", () => { applyDarkFilter(); hideMapLoadingOverlay(); });
} else {
hideMapLoadingOverlay();
}
applyDarkFilter();
setTimeout(hideMapLoadingOverlay, 6000);
}

export function destroyLeafletMap(){
if(leafletMap){
leafletMap.remove();
leafletMap = null;
userMarker = null;
stopMarkersGroup = null;
busMarkersGroup = null;
initialCenterSet = false;
}
}

export function initLeafletMapOnce(){
const mapEl = el("mapContainer");
if(!mapEl || leafletMap) return;
const defaultCenter = state.coord ? [state.coord.lat, state.coord.lng] : [-1.4558, -48.4902];
const keepPrevView = state.lastMapView && (Date.now() - state.lastMapInteractionTs < 18000);
const center = keepPrevView ? state.lastMapView.center : defaultCenter;
const zoom = keepPrevView ? state.lastMapView.zoom : 16;
leafletMap = L.map('mapContainer', {
zoomControl: false, attributionControl: false, rotate: state.rotationEnabled, rotateControl: false,
touchRotate: state.rotationEnabled, bearing: keepPrevView ? (state.lastMapView.bearing || 0) : 0
}).setView(center, zoom);
addBaseMapLayers(leafletMap);
if(keepPrevView) initialCenterSet = true; // não deixa o próximo fix de GPS recentralizar e perder o enquadramento restaurado
leafletMap.on('rotate', () => updateCompassIcon());
const saveMapView = () => {
state.lastMapView = {
center: leafletMap.getCenter(), zoom: leafletMap.getZoom(),
bearing: (typeof leafletMap.getBearing === "function") ? leafletMap.getBearing() : 0
};
state.lastMapInteractionTs = Date.now();
};
leafletMap.on('zoomend dragend rotate', saveMapView);
const userSvgIcon = L.divIcon({
className: 'user-pin-marker',
html: `<div style="width:18px;height:18px;background:#2563eb;border:3px solid #ffffff;border-radius:50%;box-shadow:0 0 10px rgba(37,99,235,0.7);"></div>`,
iconSize: [18, 18], iconAnchor: [9, 9]
});
userMarker = L.marker(center, { icon: userSvgIcon }).addTo(leafletMap);
stopMarkersGroup = L.layerGroup().addTo(leafletMap);
if(state.stops.length > 0) updateStopMarkersOnMap();
}

export function updateMapUserPosition(){
try{
if(!leafletMap && state.view === "stops") initLeafletMapOnce();
if(userMarker && state.coord){
userMarker.setLatLng([state.coord.lat, state.coord.lng]);
if(!initialCenterSet && leafletMap){
leafletMap.setView([state.coord.lat, state.coord.lng], 16);
if(state.locSource === "GPS Vivo") initialCenterSet = true;
}
}
}catch(e){ console.error("[BusBus] mapa indisponível:", e); }
}

export function recenterMap(){
if(leafletMap && state.coord){
leafletMap.flyTo([state.coord.lat, state.coord.lng], leafletMap.getZoom(), { duration: 0.6 });
}
}

// "map" é opcional e serve só pro mapa de visão geral do planejador de
// rota (tripMap, em trip-planner.js), que é uma instância Leaflet
// separada do "leafletMap" global daqui — Home e GPS ao vivo de uma linha
// usam o mesmo #mapContainer/leafletMap, então pra eles o padrão (sem
// argumento) já resolve.
export function resetOrientation(map = leafletMap){
if(map && typeof map.setBearing === "function"){
map.setBearing(0);
}
}

export function updateCompassIcon(map = leafletMap, btnId = "compassBtn"){
const btn = el(btnId);
if(!btn || !map) return;
const bearing = (typeof map.getBearing === "function") ? map.getBearing() : 0;
const svg = btn.querySelector("svg");
if(svg) svg.style.transform = `rotate(${-bearing}deg)`;
btn.classList.toggle("off", Math.abs(bearing % 360) < 0.5);
}

export function updateStopMarkersOnMap(){
if(!stopMarkersGroup) return;
stopMarkersGroup.clearLayers();
state.stops.forEach(s => {
if(s.lat && s.lng){
const stopSvgIcon = L.divIcon({
className: 'stop-pin-marker',
html: `<div style="width:24px;height:24px;background:#1E6B4E;border:2px solid #ffffff;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#ffffff;box-shadow:0 2px 6px rgba(0,0,0,0.3);cursor:pointer;">
<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s7-7.5 7-12.5A7 7 0 0 0 5 9.5C5 14.5 12 22 12 22Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>
</div>`,
iconSize: [24, 24], iconAnchor: [12, 12]
});
const marker = L.marker([s.lat, s.lng], { icon: stopSvgIcon });
marker.on('click', () => selectStop(s.id));
stopMarkersGroup.addLayer(marker);
}
});
}

export function focusStopOnMap(lat, lng){
if(leafletMap && lat && lng){
leafletMap.flyTo([lat, lng], 17, { duration: 0.8 });
}
}

// "allPatterns" (opcional) é a lista completa de trajetos dessa linha — tipo
// vem direto de /pattern/{busServiceId}/{cidade}. Quando passado, a gente
// desenha os OUTROS sentidos da linha também, com a mesma linha normal do
// sentido selecionado — assim dá pra ver o trajeto "fechando", ida e volta
// ao mesmo tempo, em vez de só metade do circuito. (Chegamos a diferenciar
// sólido/tracejado por sentido com ônibus ao vivo, mas voltamos atrás: sem
// saber com certeza qual sentido está realmente ativo o tempo todo, a
// distinção criava mais confusão do que ajudava — melhor os dois sempre
// iguais.)
export function initLineRouteMap(allPatterns, selectedPatternId){
const mapEl = el("mapContainer");
if(!mapEl) return;
leafletMap = L.map('mapContainer', {
zoomControl: false, attributionControl: false, rotate: state.rotationEnabled, rotateControl: false,
touchRotate: state.rotationEnabled, bearing: 0
});
addBaseMapLayers(leafletMap);
// Mesmo botão/ícone de bússola da Home (updateCompassIcon olha o
// #compassBtn que a tela atual tiver renderizado em followBtnHTML, em
// stops.js) — faltava ligar esse mapa (GPS ao vivo de uma linha) ao
// evento de rotação, por isso o botão não reagia nem aparecia certo aqui.
leafletMap.on('rotate', () => updateCompassIcon());
busMarkersGroup = L.layerGroup().addTo(leafletMap);
// Zera o rastreamento de marcadores de ônibus (busMarkersByPlate, em
// stops.js) toda vez que uma tela de GPS de linha nova é montada — sem
// isso, a primeira leitura dessa linha nova poderia comparar com um
// marcador de uma linha/tela ANTERIOR (já removida desse mapa) e tentar
// deslizar algo que não existe mais aqui.
clearBusMarkerTracking();
const otherPatterns = (Array.isArray(allPatterns) ? allPatterns : [])
.filter(p => String(p.id) !== String(selectedPatternId) && Array.isArray(p.polyLine) && p.polyLine.length > 1);
const allBoundsLatLngs = [];
const lineStyle = { color: routeLineColor(), weight: 5, opacity: 0.8 };
otherPatterns.forEach(p => {
const latLngs = p.polyLine.map(pt => [pt.lat, pt.lng]);
L.polyline(latLngs, lineStyle).addTo(leafletMap);
allBoundsLatLngs.push(...latLngs);
});
if(state.route && state.route.length > 0){
const latLngs = state.route.map(p => [p.lat, p.lng]);
const routePoly = L.polyline(latLngs, lineStyle).addTo(leafletMap);
allBoundsLatLngs.push(...latLngs);
leafletMap.fitBounds(L.latLngBounds(allBoundsLatLngs.length ? allBoundsLatLngs : routePoly.getBounds()), { padding: [20, 20] });
// Setinhas de sentido ao longo do traçado — só no sentido selecionado
// (o que está em destaque), não nos outros sentidos em cinza, pra não
// poluir. Diferente da seta que tinha no ícone do ônibus (removida —
// ver stops.js), aqui o sentido não é um chute: os pontos do traçado já
// vêm na ordem certa (início ao fim) direto da API, é só geometria.
addDirectionArrows(leafletMap, state.route, routeLineColor());
} else {
leafletMap.setView([-1.4558, -48.4902], 14);
}
if(state.stopSel && state.stopSel.lat){
const stopTargetIcon = L.divIcon({
className: 'target-stop-pin',
html: `<div style="width:20px;height:20px;background:#1E6B4E;border:3px solid #ffffff;border-radius:50%;box-shadow:0 0 8px rgba(0,0,0,0.4);"></div>`,
iconSize: [20, 20], iconAnchor: [10, 10]
});
L.marker([state.stopSel.lat, state.stopSel.lng], { icon: stopTargetIcon }).addTo(leafletMap);
}
}

// Direção do trecho entre dois pontos do traçado (ordem já garantida pela
// API — início ao fim), em graus, 0 = norte, sentido horário. Mesma fórmula
// que a antiga getBusBearing() usava (removida de stops.js), só que aqui
// aplicada a dois pontos FIXOS do traçado, não à posição instantânea (e por
// natureza incerta) de um ônibus em movimento.
function bearingBetween(from, to){
const lat1 = from.lat * Math.PI / 180, lat2 = to.lat * Math.PI / 180;
const dLng = (to.lng - from.lng) * Math.PI / 180;
const y = Math.sin(dLng) * Math.cos(lat2);
const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}

// Desenha setinhas de sentido ao longo de um traçado, tipo as da 99 na
// polilinha da moto — mas aqui usando a ordem (já conhecida, vinda da API)
// dos pontos do traçado em si, não a direção instantânea de um ônibus, que é
// sempre um chute. "points" precisa estar na ordem início → fim.
function addDirectionArrows(map, points, color){
if(!Array.isArray(points) || points.length < 2) return;
const STEP_METERS = 150; // espaçamento entre setinhas — perto o bastante pra guiar, sem poluir o traçado
let traveled = 0; // distância andada desde o início do traçado, somando segmento a segmento
let nextArrowAt = STEP_METERS; // só a primeira seta já nasce um pouco adiante do início, não bem na primeira parada
for(let i = 0; i < points.length - 1; i++){
const from = points[i], to = points[i + 1];
const segDist = metersBetween(from, to);
if(!segDist || segDist <= 0) continue;
const segStart = traveled, segEnd = traveled + segDist;
// Um segmento longo pode precisar de mais de uma seta — por isso "while", não "if"
while(nextArrowAt <= segEnd){
const t = (nextArrowAt - segStart) / segDist;
const lat = from.lat + (to.lat - from.lat) * t;
const lng = from.lng + (to.lng - from.lng) * t;
const bearing = bearingBetween(from, to);
const arrowIcon = L.divIcon({
className: 'route-direction-arrow',
html: `<div style="width:12px;height:12px;transform:rotate(${bearing}deg);display:flex;align-items:center;justify-content:center;"><svg width="11" height="11" viewBox="0 0 11 11"><path d="M5.5 0 L10 9.5 L5.5 7.2 L1 9.5 Z" fill="${color}" stroke="#ffffff" stroke-width="0.6"/></svg></div>`,
iconSize: [12, 12], iconAnchor: [6, 6]
});
// interactive/keyboard desligados: são só indicação visual, não devem
// roubar cliques das paradas nem entrar na ordem de tabulação
L.marker([lat, lng], { icon: arrowIcon, interactive: false, keyboard: false }).addTo(map);
nextArrowAt += STEP_METERS;
}
traveled = segEnd;
}
}

export function fitMapToBusAndStop(){
if(!leafletMap || !state.followBusEnabled) return;
if(!state.buses.length || !state.stopSel || !state.stopSel.lat) return;
try{
const bounds = L.latLngBounds([[state.stopSel.lat, state.stopSel.lng]]);
let minDist = Infinity;
state.buses.forEach(b => {
bounds.extend([b.lat, b.lng]);
const d = metersBetween(state.stopSel, b);
if(d < minDist) minDist = d;
});
const maxZoom = minDist < 250 ? 18 : (minDist < 800 ? 17 : 15.5);
if(typeof leafletMap.flyToBounds === "function"){
leafletMap.flyToBounds(bounds, { padding: [50, 50], maxZoom, duration: 0.9 });
} else {
leafletMap.fitBounds(bounds, { padding: [50, 50], maxZoom });
}
}catch(e){ /* sem mapa ainda (ex.: tela recém trocada) — ignora */ }
}

