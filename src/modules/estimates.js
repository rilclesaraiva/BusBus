// BusBus Experimental Modular (B.E.M.) — módulo "estimates.js"
// Copyright (C) 2026 rilclesaraiva — licenciado sob GNU GPLv3.
// Texto completo: https://github.com/rilclesaraiva/BusBus/blob/main/LICENSE
//
// Previsão estimada pro que o sistema de dados não entrega: muitas paradas
// não estão ligadas, lá, a linhas que passam por elas (o itinerário passa,
// mas a parada nunca mostra o ônibus). Aqui a ligação vem da geometria: uma
// linha "passa" pela parada se o traçado dela (/pattern) fica a poucos metros
// dela. A posição dos ônibus vem da última parada do trajeto, onde o sistema
// reconhece a linha; a previsão é a distância pelo traçado até a parada,
// dividida por uma velocidade média. É previsão, não dado oficial.
import { CITY } from "./state.js";
import { api, ensureAllLines, ensureAllPoints } from "./api.js";

export const NEAR_STOP_M = 35;       // o traçado precisa passar a até isso da parada
export const TERMINAL_NEAR_M = 120;  // fim do traçado (terminal) até isso da parada também conta
export const BUS_OFF_ROUTE_M = 100;  // ônibus mais longe que isso do traçado é ignorado
export const AVG_SPEED_MPS = 5;      // ~18 km/h, média de ônibus urbano
export const MAX_ETA_MIN = 90;
const BEHIND_TOLERANCE_M = 25;       // ruído de GPS: ônibus "quase" na parada ainda não passou

const R = 6371000;

// ---------- geometria (pura) ----------

function xy(p, lat0){
  const k = Math.cos(lat0 * Math.PI / 180);
  return { x: p.lng * Math.PI / 180 * R * k, y: p.lat * Math.PI / 180 * R };
}

// Projeta p em cada trecho do traçado. Devolve, por trecho: índice, distância
// até o trecho (m) e posição ao longo do traçado (m desde o início).
function projectAll(poly, p){
  const lat0 = poly[0].lat;
  const P = xy(p, lat0);
  const out = [];
  let acc = 0;
  let a = xy(poly[0], lat0);
  for(let i = 0; i < poly.length - 1; i++){
    const b = xy(poly[i + 1], lat0);
    const dx = b.x - a.x, dy = b.y - a.y;
    const len = Math.hypot(dx, dy);
    let t = len ? ((P.x - a.x) * dx + (P.y - a.y) * dy) / (len * len) : 0;
    t = Math.max(0, Math.min(1, t));
    const d = Math.hypot(P.x - (a.x + t * dx), P.y - (a.y + t * dy));
    out.push({ i, d, s: acc + t * len });
    acc += len;
    a = b;
  }
  return out;
}

// Ponto mais próximo do traçado: {s, d}.
export function locateOnRoute(poly, p){
  if(!poly || poly.length < 2) return null;
  let best = null;
  for(const r of projectAll(poly, p)) if(!best || r.d < best.d) best = r;
  return { s: best.s, d: best.d };
}

// Posições (m ao longo do traçado) onde ele passa a até maxOff da parada.
// Um traçado que cruza a parada duas vezes (laço) devolve duas posições.
export function passesNear(poly, stop, maxOff = NEAR_STOP_M){
  if(!poly || poly.length < 2) return [];
  const hits = projectAll(poly, stop).filter(r => r.d <= maxOff);
  const groups = [];
  for(const h of hits){
    const g = groups[groups.length - 1];
    if(g && h.i - g.lastI <= 1){ g.lastI = h.i; if(h.d < g.best.d) g.best = h; }
    else groups.push({ lastI: h.i, best: h });
  }
  return groups.map(g => g.best.s);
}

// Posições em que o ônibus "chega" à parada: onde o traçado passa por ela e,
// se o traçado termina por perto (parada colada num terminal, onde o traçado
// dá voltas e o fim fica a uma centena de metros), o fim do traçado.
export function stopPositions(poly, stop){
  const pos = passesNear(poly, stop, NEAR_STOP_M);
  if(poly && poly.length > 1 && metersApart(stop, poly[poly.length - 1]) <= TERMINAL_NEAR_M){
    const total = locateOnRoute(poly, poly[poly.length - 1]).s;
    if(!pos.some(x => Math.abs(x - total) < 30)) pos.push(total);
  }
  return pos;
}

// Minutos até o ônibus chegar à parada, ou null se ele já passou, está fora do
// traçado ou longe demais pra valer a pena mostrar.
export function etaToStop(poly, stopPositions, bus, speed = AVG_SPEED_MPS){
  const loc = locateOnRoute(poly, bus);
  if(!loc || loc.d > BUS_OFF_ROUTE_M) return null;
  const ahead = stopPositions.filter(s => s >= loc.s - BEHIND_TOLERANCE_M).sort((a, b) => a - b)[0];
  if(ahead === undefined) return null;
  const mins = Math.round(Math.max(0, ahead - loc.s) / speed / 60);
  return mins > MAX_ETA_MIN ? null : mins;
}

export function normName(s){
  return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function metersApart(a, b){
  const lat0 = a.lat;
  const A = xy(a, lat0), B = xy(b, lat0);
  return Math.hypot(A.x - B.x, A.y - B.y);
}

// A parada onde dá pra ver os ônibus de um traçado: a última dele. O nome dela
// é o "type" do traçado do sentido contrário (que parte de lá). Sem nome que
// bata, a parada mais próxima do fim do traçado.
export function findVehiclePoint(pattern, otherPatterns, points, radius = 150){
  const end = pattern.poly[pattern.poly.length - 1];
  const near = points
    .map(p => ({ p, d: metersApart(end, p) }))
    .filter(x => x.d <= radius)
    .sort((a, b) => a.d - b.d);
  if(!near.length) return null;
  const wanted = new Set(otherPatterns.map(o => normName(o.type)).filter(Boolean));
  const named = near.find(x => wanted.has(normName(x.p.name)));
  return (named || near[0]).p.id;
}

// ---------- traçados de todas as linhas (guardados no aparelho) ----------

const STORE_KEY = "busbus_patterns_v1";
const STORE_TTL_MS = 7 * 86400000;
const round5 = n => Math.round(n * 1e5) / 1e5;

function readStore(){
  try{
    const o = JSON.parse(localStorage.getItem(STORE_KEY));
    if(o && Date.now() - o.t < STORE_TTL_MS && o.lines) return o.lines;
  }catch(e){}
  return null;
}

function writeStore(lines){
  try{ localStorage.setItem(STORE_KEY, JSON.stringify({ t: Date.now(), lines })); }catch(e){}
}

// lines: [{id, number, name, patterns:[{id, type, poly:[[lat,lng],...]}]}]
function hydrate(lines){
  return lines.map(l => ({
    ...l,
    patterns: l.patterns.map(p => ({ ...p, poly: p.poly.map(([lat, lng]) => ({ lat, lng })) }))
  }));
}

let patternsPromise = null;

export function loadAllPatterns(){
  if(patternsPromise) return patternsPromise;
  patternsPromise = (async () => {
    const stored = readStore();
    if(stored) return hydrate(stored);
    const all = await ensureAllLines();
    const out = [];
    let failed = 0, next = 0;
    const worker = async () => {
      while(next < all.length){
        const l = all[next++];
        try{
          const pat = await api(`/pattern/${l.id}/${CITY}`);
          const patterns = (Array.isArray(pat) ? pat : [])
            .filter(p => p && p.polyLine && p.polyLine.length > 1)
            .map(p => ({ id: p.id, type: p.type || "", poly: p.polyLine.map(q => [round5(q.lat), round5(q.lng)]) }));
          if(patterns.length) out.push({ id: l.id, number: l.numero, name: l.name, patterns });
        }catch(e){ failed++; }
      }
    };
    await Promise.all([worker(), worker(), worker(), worker(), worker(), worker()]);
    if(!failed) writeStore(out); // incompleto não vai pro armazenamento: tenta de novo na próxima
    return hydrate(out);
  })().catch(e => { patternsPromise = null; throw e; });
  return patternsPromise;
}

// ---------- posição dos ônibus ----------

const vehicleCache = new Map();

export async function fetchPatternVehicles(pointId, patternId, ttlMs = 15000){
  const key = `${pointId}|${patternId}`;
  const hit = vehicleCache.get(key);
  if(hit && Date.now() - hit.t < ttlMs) return hit.v;
  const data = await api(`/all/forecast/${pointId}/${patternId}/${CITY}`);
  const v = (Array.isArray(data) ? data : [])
    .map(b => ({ plate: b.codVehicle, lat: b.latLng && b.latLng.lat, lng: b.latLng && b.latLng.lng }))
    .filter(b => b.lat && b.lng);
  vehicleCache.set(key, { t: Date.now(), v });
  return v;
}

// ---------- API usada pelas telas ----------

// Linhas cujo traçado passa pela parada, que o sistema não listou, com os
// ônibus ao vivo e a previsão estimada. Uma linha da lista por ônibus.
export async function computeEstimatedLines(stop, systemLines){
  const [lines, points] = await Promise.all([loadAllPatterns(), ensureAllPoints()]);
  const haveSvc = new Set(systemLines.map(l => String(l.busServiceId)));
  const havePat = new Set(systemLines.map(l => String(l.patternId)));
  const cands = [];
  for(const l of lines){
    if(haveSvc.has(String(l.id))) continue;
    for(const p of l.patterns){
      if(havePat.has(String(p.id))) continue;
      const pos = stopPositions(p.poly, stop);
      if(pos.length) cands.push({ line: l, pattern: p, pos });
    }
  }
  const picked = cands.slice(0, 15);
  const rows = [];
  let next = 0;
  const worker = async () => {
    while(next < picked.length){
      const c = picked[next++];
      try{
        const others = c.line.patterns.filter(o => o !== c.pattern);
        const pointId = findVehiclePoint(c.pattern, others, points);
        if(pointId == null) continue;
        const vehicles = await fetchPatternVehicles(pointId, c.pattern.id);
        const mine = vehicles
          .map(v => ({ v, eta: etaToStop(c.pattern.poly, c.pos, v) }))
          .filter(x => x.eta !== null)
          .sort((a, b) => a.eta - b.eta)
          .slice(0, 3);
        for(const x of mine){
          rows.push({
            busServiceId: c.line.id, patternId: c.pattern.id,
            number: c.line.number, name: c.line.name,
            dest: (others[0] && others[0].type) || "",
            etaMin: x.eta, schedTime: null, scheduled: false,
            estimated: true, vehiclePoint: pointId, plate: x.v.plate
          });
        }
      }catch(e){ console.error("[BusBus] estimativa falhou pra um traçado (ignorado):", e); }
    }
  };
  await Promise.all([worker(), worker(), worker(), worker()]);
  return rows;
}

// Mapa de uma linha estimada: os ônibus dela com a previsão até a parada.
export async function estimateBusesForLine(line, stop, route){
  const pos = stopPositions(route, stop);
  if(!pos.length) return [];
  const vehicles = await fetchPatternVehicles(line.vehiclePoint, line.patternId, 8000);
  return vehicles
    .map(v => ({ plate: v.plate, lat: v.lat, lng: v.lng, eta: etaToStop(route, pos, v), dest: line.dest }))
    .filter(b => b.eta !== null);
}

// Junta as linhas do sistema com as estimadas, por previsão (sem previsão no fim).
export function mergeLines(systemLines, extras){
  if(!extras.length) return systemLines;
  const all = [...systemLines, ...extras];
  return all
    .map((l, i) => ({ l, i }))
    .sort((a, b) => {
      const ea = a.l.etaMin ?? Infinity, eb = b.l.etaMin ?? Infinity;
      return ea === eb ? a.i - b.i : ea - eb;
    })
    .map(x => x.l);
}
