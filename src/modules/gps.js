// BusBus Experimental Modular (B.E.M.) — módulo "gps.js"
// Copyright (C) 2026 rilclesaraiva — licenciado sob GNU GPLv3.
// Texto completo: https://github.com/rilclesaraiva/BusBus/blob/main/LICENSE

import { state } from "./state.js";
import { metersBetween } from "./utils.js";
import { updateMapUserPosition } from "./map.js";
import { fetchStopsSilent, fetchWeather } from "./stops.js";

export function startGpsTracking(){
// Se já existe um watch rodando, ele continua valendo — reiniciar aqui
// (clearWatch + watchPosition de novo) descartava o último fix de GPS e
// obrigava o aparelho a adquirir um fix 100% novo do zero (maximumAge: 0),
// o que podia levar vários segundos. Isso é o que deixava a troca de aba
// lenta: a cada navTo('stops') o app jogava fora uma localização boa que
// já tinha.
if(state.watchGpsId) return;
if("geolocation" in navigator){
state.watchGpsId = navigator.geolocation.watchPosition(
pos => {
setAndSaveCoord(pos.coords.latitude, pos.coords.longitude, "GPS Vivo");
},
err => {
fallbackToIpOrStorage();
},
{ enableHighAccuracy: true, timeout: 8000, maximumAge: 15000 }
);
} else {
fallbackToIpOrStorage();
}
}

export function setAndSaveCoord(lat, lng, sourceName, timestamp = Date.now()){
state.coord = { lat, lng };
state.locSource = sourceName;
state.locTimestamp = timestamp;
try {
localStorage.setItem("busbus_last_coord", JSON.stringify({ lat, lng, sourceName, time: timestamp }));
} catch(e){}
if(state.view === "stops"){
updateMapUserPosition();
const now = Date.now();
const movedEnough = !state.lastStopsFetchCoord || metersBetween(state.lastStopsFetchCoord, state.coord) > 40;
const staleEnough = (now - state.lastStopsFetchTs) > 20000;
if(state.stops.length === 0 || movedEnough || staleEnough){
state.lastStopsFetchCoord = { lat, lng };
state.lastStopsFetchTs = now;
fetchStopsSilent();
}
const wMovedEnough = !state.lastWeatherFetchCoord || metersBetween(state.lastWeatherFetchCoord, state.coord) > 2000;
const wStaleEnough = (now - state.lastWeatherFetchTs) > 900000;
if(!state.weather || wMovedEnough || wStaleEnough){
state.lastWeatherFetchCoord = { lat, lng };
state.lastWeatherFetchTs = now;
fetchWeather(lat, lng);
}
}
}

export async function fallbackToIpOrStorage(){
try {
const saved = localStorage.getItem("busbus_last_coord");
if(saved){
const parsed = JSON.parse(saved);
if(parsed && parsed.lat && parsed.lng){
setAndSaveCoord(parsed.lat, parsed.lng, "Última Conhecida", parsed.time || Date.now() - 120000);
return;
}
}
} catch(e){}
try {
const res = await fetch("https://ipapi.co/json/");
const ipData = await res.json();
if(ipData && ipData.latitude && ipData.longitude){
setAndSaveCoord(ipData.latitude, ipData.longitude, "Aproximado (IP)");
return;
}
} catch(e){}
setAndSaveCoord(-1.4558, -48.4902, "Padrão Belém");
}
