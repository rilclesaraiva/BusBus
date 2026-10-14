// BusBus Experimental Modular (B.E.M.) — módulo "api.js"
// Copyright (C) 2026 rilclesaraiva — licenciado sob GNU GPLv3.
// Texto completo: https://github.com/rilclesaraiva/BusBus/blob/main/LICENSE

import { state, CITY, BASE } from "./state.js";
import { pick, metersBetween } from "./utils.js";

export async function api(path){
const url = `${BASE}${path}`;
const res = await fetch(url);
if(!res.ok) throw new Error(`HTTP ${res.status}`);
return res.json();
}

export let departureCache = {};

export async function getDepartureSchedule(patternId){
if(departureCache[patternId]) return departureCache[patternId];
try{
const data = await api(`/departure/${patternId}/${CITY}`);
const entry = (Array.isArray(data) ? data : [])[0] || null;
departureCache[patternId] = entry;
return entry;
}catch(e){ return null; }
}

export let allLinesCache = null, allPointsCache = null;

export async function ensureAllLines(){
if(allLinesCache) return allLinesCache;
const data = await api(`/allLines/${CITY}`);
allLinesCache = (Array.isArray(data) ? data : []).map(l => ({
id: l.id, numero: l.numero || "", name: l.name || l.shortName || "Linha",
trajetos: (l.trajetos || []).map(t => ({
id: t.id_migracao, nome: t.nome || "", _id: t._id
}))
}));
return allLinesCache;
}

export async function ensureAllPoints(){
if(allPointsCache) return allPointsCache;
const data = await api(`/allPoints/${CITY}`);
const list = Array.isArray(data) ? data : (data.items || data.result || []);
allPointsCache = list.map(p => ({
id: pick(p, ["id","pointId","idPonto","pointLocationId"]),
name: pick(p, ["name","nome","nomePonto","description"], "Parada sem nome"),
lat: pick(p, ["lat","latitude"]) ?? (p.latLng && p.latLng.lat),
lng: pick(p, ["lng","lon","longitude"]) ?? (p.latLng && p.latLng.lng)
})).filter(p => p.id !== null && p.lat && p.lng);
return allPointsCache;
}

export async function nominatimReverse(lat, lng){
try{
const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=17&addressdetails=1`);
if(!res.ok) return null;
const data = await res.json();
const a = data.address || {};
return a.road || a.pedestrian || a.footway || a.square || data.name || null;
}catch(e){ return null; }
}

const BELEM_CENTER = { lat: -1.4558, lng: -48.4902 };

// Photon é melhor pra busca "enquanto digita" de verdade (indexa prefixo de
// palavra — "castan" já acha "Castanheira" mesmo digitando pela metade), ao
// contrário do /search do Nominatim, que é feito pra endereço completo. Mas
// é um serviço público de terceiro, fora do nosso controle — pode estar
// bloqueado, limitado (rate limit) ou fora do ar numa rede específica sem
// isso significar "sem internet" no aparelho inteiro. Por isso
// "if(!res.ok)" aqui LANÇA um erro (em vez de devolver [] como antes) —
// assim nominatimSearch() sabe que foi uma falha do serviço, não "não
// achei nada", e tenta o Nominatim antes de desistir de verdade.
async function searchPhoton(q){
const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&lat=${BELEM_CENTER.lat}&lon=${BELEM_CENTER.lng}&zoom=13&limit=10&lang=pt`;
const res = await fetch(url);
if(!res.ok) throw new Error(`Photon respondeu HTTP ${res.status}`);
const data = await res.json();
const feats = Array.isArray(data.features) ? data.features : [];
return feats
.map(f => {
const p = f.properties || {};
const coords = f.geometry && f.geometry.coordinates;
if(!coords) return null;
const [lng, lat] = coords;
const label = [p.name, p.street, p.city || p.district, p.state].filter(Boolean).join(", ") || p.name || "Local";
return { lat, lng, label };
})
.filter(r => r && metersBetween(BELEM_CENTER, r) < 80000) // só resultados dentro da Região Metropolitana de Belém (~80km do centro)
.slice(0, 6);
}

// Volta de reserva do Nominatim puro — sem o sufixo ", Belém, Pará" colado
// (isso é o que atrapalhava antes), só com viewbox+bounded pra restringir
// geograficamente. Não faz busca por palavra pela metade tão bem quanto o
// Photon, mas pelo menos acha o nome COMPLETO ("Shopping Castanheira")
// quando o Photon estiver fora do ar ou bloqueado nessa rede.
async function searchNominatim(q){
const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(q)}&viewbox=-48.62,-1.15,-48.30,-1.55&bounded=1&limit=6`;
const res = await fetch(url);
if(!res.ok) throw new Error(`Nominatim respondeu HTTP ${res.status}`);
const data = await res.json();
return (Array.isArray(data) ? data : []).map(d => ({ lat: parseFloat(d.lat), lng: parseFloat(d.lon), label: d.display_name }));
}

export async function nominatimSearch(q){
let photonErr = null, nominatimErr = null;
try{
const results = await searchPhoton(q);
if(results.length) return results;
}catch(e){ photonErr = e; console.error("[BusBus] Photon falhou:", e); }
try{
const results = await searchNominatim(q);
if(results.length) return results;
}catch(e){ nominatimErr = e; console.error("[BusBus] Nominatim falhou:", e); }
// Se os DOIS serviços falharam de verdade (não "nenhum resultado", mas
// erro de rede/HTTP), joga o erro pra quem chamou mostrar algo útil em
// vez de um "nenhum lugar encontrado" enganoso — essa troca de serviço
// pra outro é justamente o que impedia a gente de enxergar isso antes.
if(photonErr && nominatimErr) throw photonErr;
return [];
}

export let patternCache = {};

export async function getPatternSegments(busServiceId){
if(patternCache[busServiceId]) return patternCache[busServiceId];
try{
const pat = await api(`/pattern/${busServiceId}/${CITY}`);
const segs = Array.isArray(pat) ? pat : [];
patternCache[busServiceId] = segs;
return segs;
}catch(e){ return []; }
}

export async function fetchLinesAtStop(stopId){
try{
const data = await api(`/forecast/lines/fromPoint/${stopId}/${CITY}`);
const list = Array.isArray(data) ? data : (data.items || data.result || []);
return list.map(l => ({
busServiceId: pick(l, ["busServiceId","idLinha","lineId"]),
patternId: pick(l, ["patternId","idPadrao","patternID"]),
numero: pick(l, ["busServiceNumber","numero","number"], "—"),
name: pick(l, ["nameLine","name","nome"], "Linha"),
dest: pick(l, ["destination","destino"], "")
})).filter(l => l.busServiceId && l.patternId);
}catch(e){ return []; }
}

export async function fetchScheduledLinesAtStop(stopId){
try{
const data = await api(`/linesFromBusstop/${stopId}/${CITY}`);
const list = Array.isArray(data) ? data : [];
const out = [];
list.forEach(l => {
(l.trajetos || []).forEach(t => {
if(l.id && t.id_migracao){
out.push({
busServiceId: l.id, patternId: t.id_migracao,
numero: l.numero || "—", name: l.name || l.shortName || "Linha", dest: t.nome || ""
});
}
});
});
return out;
}catch(e){ return []; }
}
