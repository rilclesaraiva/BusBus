// BusBus Experimental Modular (B.E.M.) — módulo "api.js"
// Copyright (C) 2026 rilclesaraiva — licenciado sob GNU GPLv3.
// Texto completo: https://github.com/rilclesaraiva/BusBus/blob/main/LICENSE

import { state, CITY, BASE } from "./state.js";
import { pick } from "./utils.js";

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

export async function nominatimSearch(q){
try{
const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(q + ", Belém, Pará")}&viewbox=-48.62,-1.15,-48.30,-1.55&bounded=1&limit=6`;
const res = await fetch(url);
if(!res.ok) return [];
const data = await res.json();
return data.map(d => ({ lat: parseFloat(d.lat), lng: parseFloat(d.lon), label: d.display_name }));
}catch(e){ return []; }
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
