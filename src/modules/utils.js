// BusBus Experimental Modular (B.E.M.) — módulo "utils.js"
// Copyright (C) 2026 rilclesaraiva — licenciado sob GNU GPLv3.
// Texto completo: https://github.com/rilclesaraiva/BusBus/blob/main/LICENSE


export const el = s => document.getElementById(s);

export const screens = el("screens");

export function normalize(s){
// Al\u00e9m de min\u00fasculas e sem acento, troca qualquer caractere que n\u00e3o seja
// letra/n\u00famero por espa\u00e7o (h\u00edfen, v\u00edrgula, ponto, barra\u2026) e colapsa espa\u00e7os
// (inclusive um espa\u00e7o sobrando no fim, digitado sem querer), pra "Parque
// Shopping " ou "Parque-Shopping" continuarem achando "Parque Shopping".
return (s||"").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
.replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
}

export function jsStr(s){ return JSON.stringify(String(s ?? "")).replace(/"/g, "&quot;"); }

export function pick(obj, candidates, fallback=null){
for(const c of candidates){ if(obj && obj[c] !== undefined && obj[c] !== null) return obj[c]; }
return fallback;
}

export function fmtEta(mins, schedTime){
if(mins !== null && mins !== undefined) {
if(mins <= 1) return { label: "chegando", cls: "now" };
if(mins <= 5) return { label: `${mins} min`, cls: "soon" };
return { label: `${mins} min`, cls: "" };
}
if(schedTime) return { label: schedTime, cls: "", isSched: true };
return { label: "—", cls: "" };
}

export function fmtTimeAgo(ts){
if(!ts) return "";
const diffSec = Math.floor((Date.now() - ts) / 1000);
if(diffSec < 30) return "agora";
if(diffSec < 60) return "há menos de 1 min";
const mins = Math.floor(diffSec / 60);
if(mins < 60) return `há ${mins} min`;
const hrs = Math.floor(mins / 60);
return `há ${hrs} h`;
}

export function render(html){ screens.innerHTML = html; }

export function statusHTML(msg, loading, err){
if(!msg) return "";
return `<div class="status ${err?'err':''}">${loading?'<div class="spinner"></div>':''}${msg}</div>`;
}

// Esqueleto de carregamento pra dentro de um #mapContainer vazio, enquanto a
// rota/posição dos ônibus ainda não chegou da API. Sem isso a pessoa via só
// a caixa cinza vazia do Leaflet (o fundo de #mapContainer antes do mapa
// existir) sem nenhum sinal de que algo estava acontecendo. Uma vez que
// initLineRouteMap()/initLeafletMapOnce() rodam, o Leaflet substitui todo o
// conteúdo do container (inclusive este esqueleto) pelos próprios painéis do
// mapa — então não precisa ser removido manualmente.
export function mapLoadingHTML(msg){
return `<div class="mapLoading"><div class="spinner"></div>${msg}</div>`;
}

export function errMsg(e){ return e && e.message ? e.message : String(e); }

export const OFFLINE_MSG = "Você está sem conexão!";

// "Failed to fetch" (Chrome) / "NetworkError when attempting to fetch
// resource" (Firefox) é como o fetch() do navegador avisa que a requisição
// nem chegou a sair — sem internet, modo avião, sinal caiu no meio do
// caminho. Detectado isso (ou o caso mais direto, navigator.onLine ===
// false), troca o texto técnico cru (que não diz nada pra quem não
// programa) por uma frase que a pessoa realmente entende.
export function isOfflineError(e){
if(typeof navigator !== "undefined" && navigator.onLine === false) return true;
const msg = (e && e.message) || "";
return e instanceof TypeError && /fetch|network/i.test(msg);
}

export function friendlyErrMsg(e){
return isOfflineError(e) ? OFFLINE_MSG : errMsg(e);
}

// Rolagem animada até o topo, usada pelo atalho "tocar na aba em que já
// está" (navTo, em nav.js). O "behavior:'smooth'" nativo do
// window.scrollTo não deixa escolher a duração — cada navegador decide
// sozinho, e no Chrome/WebView costuma ficar devagar pra uma lista
// comprida. Aqui a duração é fixa e curta (metade do que o nativo levava,
// a pedido explícito) e não cresce com a distância, então deslizar do
// fundo de uma lista bem comprida não demora mais que de qualquer outro
// ponto.
export function scrollToTopFast(duration = 220){
const startY = window.scrollY || window.pageYOffset || 0;
if(startY <= 0) return;
const startTime = performance.now();
function step(now){
const t = Math.min(1, (now - startTime) / duration);
const eased = 1 - Math.pow(1 - t, 3); // ease-out cúbico: começa rápido, desacelera suave no fim
window.scrollTo(0, Math.round(startY * (1 - eased)));
if(t < 1) requestAnimationFrame(step);
}
requestAnimationFrame(step);
}

export function metersBetween(a, b){
const R = 6371000, latR = a.lat * Math.PI/180;
const dLat = (b.lat - a.lat) * Math.PI/180, dLng = (b.lng - a.lng) * Math.PI/180;
const x = dLng * Math.cos(latR), y = dLat;
return Math.sqrt(x*x + y*y) * R;
}

export function bearingBetween(a, b){
return Math.atan2((b.lng - a.lng) * Math.cos(a.lat*Math.PI/180), b.lat - a.lat) * (180/Math.PI);
}
