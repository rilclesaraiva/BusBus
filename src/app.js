// BusBus — Experimental Modular (B.E.M.)
// Copyright (C) 2026 rilclesaraiva — licenciado sob GNU GPLv3.
// Texto completo: https://github.com/rilclesaraiva/BusBus/blob/main/LICENSE
//
// Checkpoint 2 da migração pro Vite: o app que no checkpoint 1 ainda estava
// inteiro num módulo só (igual era no busbus.html) agora está dividido em
// módulos menores por responsabilidade (src/modules/*.js) — estado, API,
// mapa, paradas, busca, planejador de rota, ajustes, navegação, etc. Este
// arquivo é só o ponto de entrada: importa cada módulo (o que já executa o
// código de cada um, registrando listeners etc.) e faz a sequência de
// inicialização, igual o fim do busbus.html original fazia.
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";

// Disponibiliza o Leaflet como window.L: os módulos de mapa usam
// "L.map(...)", "L.tileLayer(...)" etc. como se fosse uma variável global,
// do jeito que já funcionava com o <script> de CDN do busbus.html.
window.L = L;

// leaflet-rotate é um bundle UMD que espera encontrar "L" já pronto como
// variável global no momento em que o próprio script roda (ele faz
// "L.extend(...)" direto no topo do arquivo, sem importar o Leaflet). Um
// "import" estático desse pacote executaria ANTES da linha "window.L = L"
// acima, porque imports estáticos sempre rodam antes do código do próprio
// módulo — daria "ReferenceError: L is not defined". Por isso usamos um
// import dinâmico aqui, que roda na ordem normal (depois de window.L já
// estar definido).
await import("leaflet-rotate");

import { state, loadPersistedSettings, applyTheme } from "./modules/state.js";
import { startGpsTracking } from "./modules/gps.js";
import { renderStopsScreenStructure } from "./modules/stops.js";
import { updateBellDot } from "./modules/messages.js";
import "./modules/nav.js"; // registra o listener de popstate como efeito de módulo

// ---------------------------------------------------------------------
// Sequência de inicialização — igual ao final do busbus.html original.
// ---------------------------------------------------------------------
loadPersistedSettings();
applyTheme(state.theme);
try{ history.replaceState({ label: "stops" }, "", "#stops"); }catch(e){ console.error("[BusBus] replaceState bloqueado:", e); }
renderStopsScreenStructure();
updateBellDot();
try{
  const saved = localStorage.getItem("busbus_last_coord");
  if(saved){
    const parsed = JSON.parse(saved);
    if(parsed && parsed.lat && parsed.lng){
      const { setAndSaveCoord } = await import("./modules/gps.js");
      setAndSaveCoord(parsed.lat, parsed.lng, "Última Conhecida", parsed.time || Date.now());
    }
  }
}catch(e){}
startGpsTracking();

// Registra o Service Worker só quando faz sentido: quando o arquivo está
// sendo servido por um site de verdade (http/https), não quando está
// aberto como arquivo local ou dentro do WebView do APK (onde a API de
// Service Worker normalmente nem existe). sw.js só existe junto do
// busbus.html quando ele está hospedado como site/PWA — dentro do APK do
// AppMint esse bloco simplesmente não faz nada.
if("serviceWorker" in navigator && (location.protocol === "http:" || location.protocol === "https:")){
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

// ---------------------------------------------------------------------
// Exposição global pro HTML conseguir chamar essas funções.
//
// O app inteiro é desenhado com onclick="nomeDaFuncao(...)" escrito direto
// nos templates de string (o jeito que já funcionava no busbus.html, onde
// o <script> não era um módulo e toda função de nível superior já virava
// global automaticamente). Dentro de um módulo ES (import/export), isso
// deixa de acontecer sozinho — então, até reescrever essas chamadas pra
// addEventListener (fora do escopo deste checkpoint), as funções que o
// HTML referencia por nome precisam ser expostas aqui, manualmente.
//
// Esta lista foi conferida de novo contra todo onclick="", onchange="",
// oninput="" e onfocus="" do app (inclusive os gerados dentro de template
// strings, como as sugestões de endereço do planejador de rota) — e ganhou
// "selectTripGeo", que estava faltando na lista equivalente do checkpoint 1
// (um bug preexistente desde antes da divisão em módulos: a sugestão de
// endereço no planejador de rota já dava "selectTripGeo is not defined" se
// alguém tocasse nela, só que nenhum teste anterior tinha exercitado esse
// caminho pra pegar isso).
// ---------------------------------------------------------------------
import { goBack, navTo } from "./modules/nav.js";
import {
  clearSearchHistory, clearSearchInput, runHistorySearch, setSearchType, handleSearch,
  searchSelectStop, searchSelectLine, handleSearchInputFocus,
} from "./modules/search.js";
import {
  selectStop, selectLine, openFavoriteStop, toggleFavorite,
  toggleFollowBus, toggleWeatherDetail,
} from "./modules/stops.js";
import { recenterMap, resetOrientation, focusStopOnMap } from "./modules/map.js";
import {
  planTrip, useMyLocationForTrip, handleTripGeo, selectTripGeo,
  openLegLive, showRouteStreetsModal, selectTripResult, clearTripField,
} from "./modules/trip-planner.js";
import {
  setRadius, setTheme, setMapTheme,
  closeModal, openSupportModal, copyPixCode, openLicensesModal, openPrivacyModal,
} from "./modules/settings.js";
import { saveRotationEnabled } from "./modules/state.js";

Object.assign(window, {
  goBack, navTo,
  clearSearchHistory, clearSearchInput, runHistorySearch, setSearchType, handleSearch,
  searchSelectStop, searchSelectLine, handleSearchInputFocus,
  selectStop, selectLine, openFavoriteStop, focusStopOnMap, toggleFavorite,
  recenterMap, resetOrientation, toggleFollowBus, openLegLive, showRouteStreetsModal,
  toggleWeatherDetail,
  planTrip, useMyLocationForTrip, handleTripGeo, selectTripGeo, selectTripResult, clearTripField,
  setRadius, saveRotationEnabled, setTheme, setMapTheme,
  closeModal, openSupportModal, copyPixCode, openLicensesModal, openPrivacyModal,
});
