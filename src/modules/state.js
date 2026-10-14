// BusBus Experimental Modular (B.E.M.) — módulo "state.js"
// Copyright (C) 2026 rilclesaraiva — licenciado sob GNU GPLv3.
// Texto completo: https://github.com/rilclesaraiva/BusBus/blob/main/LICENSE


// Injetado pelo build (vite.config.js, lendo direto do "version" do
// package.json) — não precisa editar isso na mão. Em "npm run dev" (sem
// passar pelo build de verdade) fica "dev" mesmo, pra nunca confundir com
// um número de versão publicado de fato.
export const APP_VERSION = typeof import.meta.env.APP_VERSION === "string" ? import.meta.env.APP_VERSION : "dev";

export const CITY = "1224";

export const BASE = "https://busbus.saraivarilcle.workers.dev";

export const ALLOWED_RADII = [600, 900, 1200];

export let state = {
view: "stops",
coord: null,
locSource: "Buscando...",
locTimestamp: null,
radarRadius: 600,
rotationEnabled: false,
theme: "system",
mapTheme: "light", // padrão de fábrica: mapa sempre claro. "auto" segue o tema do app; "dark" força escuro — o usuário troca em Ajustes
favoriteStops: [],
lastMapView: null,
lastMapInteractionTs: 0,
stops: [],
lastStopsFetchCoord: null,
lastStopsFetchTs: 0,
stopSel: null,
lines: [],
lineSel: null,
route: null,
buses: [],
followBusEnabled: true,
timer: null,
watchGpsId: null,
lastError: null,
searchQuery: "",
searchType: "ponto",
weather: null,
lastWeatherFetchCoord: null,
lastWeatherFetchTs: 0
};

export function loadPersistedSettings(){
try{
const r = parseInt(localStorage.getItem("busbus_radar_radius"), 10);
if(ALLOWED_RADII.includes(r)) state.radarRadius = r;
}catch(e){}
try{
state.rotationEnabled = localStorage.getItem("busbus_rotation_enabled") === "1";
}catch(e){}
try{
const t = localStorage.getItem("busbus_theme");
if(t === "dark" || t === "amoled" || t === "light" || t === "system") state.theme = t;
}catch(e){}
try{
const mt = localStorage.getItem("busbus_map_theme");
if(mt === "light" || mt === "dark" || mt === "auto") state.mapTheme = mt;
}catch(e){}
try{
const favs = JSON.parse(localStorage.getItem("busbus_favorites") || "[]");
if(Array.isArray(favs)) state.favoriteStops = favs;
}catch(e){}
}

export function applyTheme(theme){
if(theme === "dark" || theme === "amoled" || theme === "light"){
document.documentElement.setAttribute("data-theme", theme);
} else {
document.documentElement.removeAttribute("data-theme"); // "system": deixa o @media prefers-color-scheme decidir
}
}

export function effectiveMapIsDark(){
if(state.mapTheme === "dark") return true;
if(state.mapTheme === "light") return false;
// "auto": segue o tema do app (e, se o app estiver no padrão do sistema,
// segue o modo claro/escuro do próprio aparelho)
if(state.theme === "dark" || state.theme === "amoled") return true;
if(state.theme === "light") return false;
try{ return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches; }
catch(e){ return false; }
}

export function routeLineColor(){
return effectiveMapIsDark() ? '#7EC8FF' : '#2B5F8A';
}

export function isFavorite(id){ return state.favoriteStops.some(f => String(f.id) === String(id)); }

export function saveRotationEnabled(v){
state.rotationEnabled = v;
try{ localStorage.setItem("busbus_rotation_enabled", v ? "1" : "0"); }catch(e){}
}
