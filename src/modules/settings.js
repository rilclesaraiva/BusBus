// BusBus Experimental Modular (B.E.M.) — módulo "settings.js"
// Copyright (C) 2026 rilclesaraiva — licenciado sob GNU GPLv3.
// Texto completo: https://github.com/rilclesaraiva/BusBus/blob/main/LICENSE

import { state, ALLOWED_RADII, ALLOWED_UPDATE_SNOOZE_DAYS, applyTheme, APP_VERSION } from "./state.js";
import { el, render, isOfflineError } from "./utils.js";
import { updateHeaderAndNav } from "./nav.js";
import {
  paletteIcon, locIcon, rotateSettingIcon, mapThemeIcon, githubIcon,
  licenseIcon, shieldIcon, heartIcon, favicon, osmLogoDataUri, updateIcon, bugIcon, docIcon,
} from "./icons.js";
import { destroyLeafletMap, leafletMap } from "./map.js";
import { initLeafletMapOnce } from "./map.js";
import { fetchStopsSilent } from "./stops.js";
// Usado pra decidir se a checagem automática de atualização roda ao abrir o
// app (ver IS_NATIVE e checkForUpdateOnStartup, mais abaixo) — no site/PWA a
// atualização já é automática via Vercel, não faz sentido avisar sobre baixar
// um APK lá.
import { Capacitor } from "@capacitor/core";

const IS_NATIVE = Capacitor.isNativePlatform();

// Posição de rolagem da aba de Ajustes — guardada ao sair dela (ver
// saveConfigScroll/navTo/handlePopState em nav.js) e restaurada ao
// voltar. IMPORTANTE: a restauração NÃO fica aqui dentro de
// renderConfigScreen(), porque esta função é chamada toda vez que um
// ajuste muda (setRadius, setTheme, setMapTheme…) pra redesenhar a tela
// com o novo valor — se a restauração estivesse aqui, trocar um ajuste no
// meio da tela faria a posição saltar de volta pro valor salvo antigo. A
// restauração só acontece nos pontos de entrada de navegação (nav.js).
export let savedConfigScrollY = 0;

export function saveConfigScroll(){ if(state.view === "config") savedConfigScrollY = window.scrollY; }

export function renderConfigScreen(){
destroyLeafletMap();
state.view = "config";
updateHeaderAndNav("config");
el("subtitle").textContent = "Ajustes do Radar";
const radioBtns = ALLOWED_RADII.map(r => `
<button class="radioBtn ${state.radarRadius === r ? 'selected' : ''}" onclick="setRadius(${r})">
${r >= 1000 ? (r/1000)+' km' : r+' m'}
</button>
`).join("");
const themeOptions = [
{ id: "system", label: "Padrão do sistema" },
{ id: "light", label: "Claro" },
{ id: "dark", label: "Escuro" },
{ id: "amoled", label: "Preto AMOLED" },
];
const themeBtns = themeOptions.map(t => `
<button class="radioBtn ${state.theme === t.id ? 'selected' : ''}" onclick="setTheme('${t.id}')">${t.label}</button>
`).join("");
const mapThemeOptions = [
{ id: "auto", label: "Padrão do sistema" },
{ id: "light", label: "Claro" },
{ id: "dark", label: "Escuro" },
];
const mapThemeBtns = mapThemeOptions.map(t => `
<button class="radioBtn ${state.mapTheme === t.id ? 'selected' : ''}" onclick="setMapTheme('${t.id}')">${t.label}</button>
`).join("");
render(`
<section>
<div class="settingsTitle">Ajustes</div>
<div class="sectionLabel">Aparência</div>
<div class="settingsGroup">
<div class="settingsRow">
<div class="settingsIcon">${paletteIcon}</div>
<div class="rowBody">
<div class="rowTitle">Tema</div>
<div class="rowDesc">"Padrão do sistema" segue o modo claro/escuro do seu celular. AMOLED deixa o fundo 100% preto, bom pra economizar bateria em tela OLED.</div>
<div class="rowControl radioGroup">${themeBtns}</div>
</div>
</div>
</div>
<div class="sectionLabel">Mapa e navegação</div>
<div class="settingsGroup">
<div class="settingsRow">
<div class="settingsIcon">${locIcon}</div>
<div class="rowBody">
<div class="rowTitle">Raio do radar de paradas</div>
<div class="rowDesc">Distâncias pensadas pra quem vai a pé até a parada.</div>
<div class="rowControl radioGroup">${radioBtns}</div>
</div>
</div>
<div class="settingsRow">
<div class="settingsIcon">${rotateSettingIcon}</div>
<div class="rowBody">
<div class="rowTitle">Rotação do mapa</div>
<div class="rowDesc">Gira o mapa com dois dedos e mostra um botão pra reorientar ao norte. Ativar pode deixar o traçado da rota e a posição do ônibus levemente desalinhados durante o zoom — nada que impeça de usar, só um efeito visual passageiro até a animação terminar.</div>
<label class="rowControl toggleRow">
<span class="toggleSwitch">
<input type="checkbox" id="rotationToggle" ${state.rotationEnabled ? "checked" : ""} onchange="saveRotationEnabled(this.checked)">
<span class="toggleSlider"></span>
</span>
Ativar rotação do mapa (padrão: desligado)
</label>
</div>
</div>
<div class="settingsRow">
<div class="settingsIcon">${mapThemeIcon}</div>
<div class="rowBody">
<div class="rowTitle">Modo claro/escuro do mapa</div>
<div class="rowDesc">Independente do tema do app: dá pra manter o mapa sempre claro (mais fácil de ler sob sol forte) mesmo usando o app no tema escuro, por exemplo.</div>
<div class="rowControl radioGroup">${mapThemeBtns}</div>
</div>
</div>
</div>
<div class="sectionLabel">Sobre</div>
<div class="settingsGroup">
<div class="settingsRow link" onclick="navTo('about')">
<div class="settingsIcon">${shieldIcon}</div>
<div class="rowBody">
<div class="rowTitle">Sobre o BusBus</div>
<div class="rowDesc">Versão, atualizações, código-fonte, licenças e informações legais.</div>
</div>
<div class="chev">›</div>
</div>
</div>
</section>
`);
}

// Tela "Sobre": abre a partir dos Ajustes (navTo('about')), com botão voltar.
export function renderAboutScreen(){
destroyLeafletMap();
state.view = "about";
updateHeaderAndNav("about");
el("subtitle").textContent = "Sobre";
const updateSnoozeOptions = [
{ days: 0, label: "Nunca" },
{ days: 1, label: "1 dia" },
{ days: 3, label: "3 dias" },
{ days: 7, label: "1 semana" },
];
const updateSnoozeBtns = updateSnoozeOptions.map(o => `
<button class="radioBtn ${state.updateSnoozeDays === o.days ? 'selected' : ''}" onclick="setUpdateSnoozeDays(${o.days})">${o.label}</button>
`).join("");
render(`
<section>
<div class="aboutHero">
<img class="aboutHeroIcon" src="./icon-192.png" alt="" onerror="this.style.display='none'">
<div class="aboutHeroName">BusBus</div>
<div class="aboutBadges"><span class="aboutBadge">v${APP_VERSION}</span><span class="aboutBadge">${IS_NATIVE ? "Android" : "Site"}</span></div>
<div class="aboutHeroDesc">Rastreamento de ônibus em tempo real para Belém. Gratuito, sem anúncios e sem conta. Feito no Brasil, com auxílio de IA, sob direção e revisão do autor.</div>
</div>
<div class="sectionLabel">Atualizações</div>
<div class="settingsGroup">
<div class="settingsRow link" onclick="checkForUpdate()">
<div class="settingsIcon">${updateIcon}</div>
<div class="rowBody">
<div class="rowTitle">Verificar atualizações</div>
<div class="rowDesc" id="updateStatus">Você está na versão v${APP_VERSION}. Toque para ver se já tem uma mais nova.</div>
</div>
<div class="chev">›</div>
</div>
${IS_NATIVE ? `
<div class="settingsRow">
<div class="settingsIcon">${updateIcon}</div>
<div class="rowBody">
<div class="rowTitle">Avisar sobre atualização</div>
<div class="rowDesc">O app confere sozinho, ao abrir, se tem uma versão nova. Escolha depois de quanto tempo lembrar de novo se você tocar em "Agora não" — ou desligue com "Nunca" (ainda dá pra checar na mão, no botão acima).</div>
<div class="rowControl radioGroup">${updateSnoozeBtns}</div>
</div>
</div>` : ``}
</div>
<div class="sectionLabel">Desenvolvedor</div>
<div class="settingsGroup">
<div class="settingsRow link" onclick="window.open('${GITHUB_PROFILE_URL}', '_blank')">
<div class="settingsIcon">${heartIcon}</div>
<div class="rowBody">
<div class="rowTitle">rilclesaraiva</div>
<div class="rowDesc">Feito no Brasil · github.com/rilclesaraiva</div>
</div>
<div class="chev">›</div>
</div>
</div>
<div class="sectionLabel">Projeto</div>
<div class="settingsGroup">
<div class="settingsRow link" onclick="window.open('${GITHUB_URL}', '_blank')">
<div class="settingsIcon">${githubIcon}</div>
<div class="rowBody">
<div class="rowTitle">Código-fonte</div>
<div class="rowDesc">github.com/rilclesaraiva/BusBus</div>
</div>
<div class="chev">›</div>
</div>
<div class="settingsRow link" onclick="window.open('${RELEASES_PAGE_URL}', '_blank')">
<div class="settingsIcon">${updateIcon}</div>
<div class="rowBody">
<div class="rowTitle">Novidades</div>
<div class="rowDesc">Cada versão e o que mudou nela</div>
</div>
<div class="chev">›</div>
</div>
<div class="settingsRow link" onclick="window.open('${GITHUB_URL}/issues', '_blank')">
<div class="settingsIcon">${bugIcon}</div>
<div class="rowBody">
<div class="rowTitle">Reportar um problema</div>
<div class="rowDesc">Achou um erro ou teve uma ideia? Abra uma issue</div>
</div>
<div class="chev">›</div>
</div>
<div class="settingsRow link" onclick="window.open('${GITHUB_URL}/blob/main/LICENSE', '_blank')">
<div class="settingsIcon">${licenseIcon}</div>
<div class="rowBody">
<div class="rowTitle">Licença</div>
<div class="rowDesc">GNU GPL v3: livre para usar, estudar, modificar e compartilhar</div>
</div>
<div class="chev">›</div>
</div>
<div class="settingsRow link" onclick="openLicensesModal()">
<div class="settingsIcon">${licenseIcon}</div>
<div class="rowBody">
<div class="rowTitle">Licenças &amp; Atribuições</div>
<div class="rowDesc">Mapas, clima e outros serviços de terceiros usados no app.</div>
</div>
<div class="chev">›</div>
</div>
</div>
<div class="sectionLabel">Legal</div>
<div class="settingsGroup">
<div class="settingsRow link" onclick="window.open('${PRIVACY_URL}', '_blank')">
<div class="settingsIcon">${shieldIcon}</div>
<div class="rowBody">
<div class="rowTitle">Política de privacidade</div>
<div class="rowDesc">O que o app faz com as informações, por completo</div>
</div>
<div class="chev">›</div>
</div>
<div class="settingsRow link" onclick="window.open('${TERMS_URL}', '_blank')">
<div class="settingsIcon">${docIcon}</div>
<div class="rowBody">
<div class="rowTitle">Termos de uso</div>
<div class="rowDesc">As regras para usar o app</div>
</div>
<div class="chev">›</div>
</div>
</div>
<div class="settingsGroup">
<div class="settingsRow link" onclick="window.open('${GITHUB_URL}', '_blank')">
<div class="settingsIcon">${heartIcon}</div>
<div class="rowBody">
<div class="rowTitle">Quer apoiar o projeto?</div>
<div class="rowDesc">Entre no repositório do projeto.</div>
</div>
<div class="chev">›</div>
</div>
</div>
</section>
`);
}

export function setUpdateSnoozeDays(days){
if(!ALLOWED_UPDATE_SNOOZE_DAYS.includes(days)) return;
state.updateSnoozeDays = days;
try{ localStorage.setItem("busbus_update_snooze_days", String(days)); }catch(e){}
renderAboutScreen();
}

export function setRadius(r){
if(!ALLOWED_RADII.includes(r)) return;
state.radarRadius = r;
try{ localStorage.setItem("busbus_radar_radius", String(r)); }catch(e){}
renderConfigScreen();
if(state.coord) fetchStopsSilent(); // atualiza a busca de paradas já com o novo raio
}

export function setTheme(theme){
state.theme = theme;
applyTheme(theme);
try{ localStorage.setItem("busbus_theme", theme); }catch(e){}
renderConfigScreen();
}

export function setMapTheme(theme){
state.mapTheme = theme;
try{ localStorage.setItem("busbus_map_theme", theme); }catch(e){}
renderConfigScreen();
// Se o mapa da tela de paradas já estiver aberto, recarrega ele agora com
// o visual novo. Os outros mapas (linha em tempo real, planejar rota)
// pegam o tema atualizado da próxima vez que forem abertos — refazê-los na
// hora atrapalharia o acompanhamento do ônibus que já estiver rolando.
if(leafletMap && state.view === "stops"){
destroyLeafletMap();
try{ initLeafletMapOnce(); }catch(e){ console.error("[BusBus] mapa indisponível:", e); }
}
}

// Trava o scroll da página por trás do painel/pop-up enquanto ele estiver
// aberto — sem isso, arrastar o dedo sobre a área escura atrás do painel
// ainda rolava a tela de baixo junto (comum em overlays "position:fixed" no
// mobile). A técnica é travar o <body> em "position:fixed" na posição atual
// e devolver o scroll exato pro mesmo lugar ao fechar.
let modalScrollY = 0;

function lockBodyScroll(){
modalScrollY = window.scrollY;
document.body.style.position = "fixed";
document.body.style.top = `-${modalScrollY}px`;
document.body.style.left = "0";
document.body.style.right = "0";
}

function unlockBodyScroll(){
if(document.body.style.position !== "fixed") return;
document.body.style.position = "";
document.body.style.top = "";
document.body.style.left = "";
document.body.style.right = "";
window.scrollTo(0, modalScrollY);
}

export function openModal(innerHTML){
closeModal();
lockBodyScroll();
const ov = document.createElement("div");
ov.className = "modalOverlay";
ov.id = "activeModal";
ov.onclick = (e) => { if(e.target === ov) closeModal(); };
ov.innerHTML = `<div class="modalCard">${innerHTML}</div>`;
document.body.appendChild(ov);
}

export function closeModal(){
const ov = el("activeModal");
if(ov) ov.remove();
unlockBodyScroll();
}

export const GITHUB_URL = "https://github.com/rilclesaraiva/BusBus";

export const GITHUB_PROFILE_URL = "https://github.com/rilclesaraiva";

// Páginas legais: ficam em docs/ e são publicadas no GitHub Pages.
export const PRIVACY_URL = "https://rilclesaraiva.github.io/BusBus/privacy";

export const TERMS_URL = "https://rilclesaraiva.github.io/BusBus/terms";

export const RELEASES_API_URL = "https://api.github.com/repos/rilclesaraiva/BusBus/releases/latest";

export const RELEASES_PAGE_URL = `${GITHUB_URL}/releases`;

// Compara duas versões "MAJOR.MINOR.PATCH" (sem o "v" na frente). Devolve
// >0 se "a" é mais nova que "b", <0 se mais velha, 0 se igual. Pedaço
// faltando ou não numérico conta como 0 (ex.: comparar com "dev", a versão
// de desenvolvimento local, nunca trava a comparação).
function compareSemver(a, b){
const pa = String(a).split(".").map(n => parseInt(n, 10) || 0);
const pb = String(b).split(".").map(n => parseInt(n, 10) || 0);
for(let i = 0; i < 3; i++){
const diff = (pa[i] || 0) - (pb[i] || 0);
if(diff !== 0) return diff;
}
return 0;
}

// Busca a última Release no GitHub e já separa versão + APK anexado —
// usado tanto pela checagem manual (checkForUpdate, botão em Ajustes)
// quanto pela automática (checkForUpdateOnStartup, ao abrir o app). Deixa
// pra quem chama decidir o que fazer com erro/resultado: a manual mostra
// status na tela, a automática fica calada se der errado.
async function fetchLatestApkRelease(){
const res = await fetch(RELEASES_API_URL);
if(!res.ok) throw new Error("GitHub releases respondeu " + res.status);
const data = await res.json();
const remoteVersion = String(data.tag_name || "").replace(/^v/i, "").trim();
const apkAsset = (data.assets || []).find(a => /\.apk$/i.test(a.name || ""));
return { remoteVersion, apkAsset };
}

// Fluxo "manual mas funcional" combinado com o rilclesaraiva: sem uma ponte
// JS documentada pelo AppMint pra baixar/instalar/apagar arquivo (ver
// conversa sobre isso), o app não consegue automatizar o download+instalação
// — só pode levar a pessoa até o APK certo e deixar o Android cuidar do
// resto (download nativo do navegador/WebView + abrir o instalador, ambos
// fora do alcance do JS daqui).
export async function checkForUpdate(){
const statusEl = el("updateStatus");
if(statusEl) statusEl.textContent = "Verificando se tem uma versão mais nova…";
try{
const { remoteVersion, apkAsset } = await fetchLatestApkRelease();
if(!remoteVersion || !apkAsset){
if(statusEl) statusEl.innerHTML = `Não encontrei um APK publicado na última versão. <a class="licenseLink" href="${RELEASES_PAGE_URL}" target="_blank" rel="noopener">Ver releases no GitHub &rarr;</a>`;
return;
}
if(compareSemver(remoteVersion, APP_VERSION) > 0){
if(statusEl) statusEl.textContent = `Nova versão v${remoteVersion} disponível (você está na v${APP_VERSION}).`;
openUpdateAvailableModal(remoteVersion, apkAsset.browser_download_url);
} else {
if(statusEl) statusEl.textContent = `Você já está na versão mais recente (v${APP_VERSION}).`;
}
}catch(e){
console.error("[BusBus] erro ao verificar atualização:", e);
if(statusEl) statusEl.innerHTML = `Não consegui verificar agora${isOfflineError(e) ? " — você está sem conexão" : ""}. <a class="licenseLink" href="${RELEASES_PAGE_URL}" target="_blank" rel="noopener">Ver releases no GitHub &rarr;</a>`;
}
}

// Checagem automática ao abrir o app — pedida pelo rilclesaraiva depois de
// ver esse comportamento em outro app (Mihon/Tachiyomi). Só roda no Android
// nativo (no site/PWA a atualização já é automática via Vercel, avisar
// sobre baixar um APK não faz sentido lá — ver IS_NATIVE), e respeita tanto
// o "Nunca" quanto o adiamento em Ajustes → "Avisar sobre atualização": se
// a pessoa tocou "Agora não" há pouco tempo, fica calada até o prazo
// escolhido passar. Silenciosa de propósito em qualquer erro — isso roda
// sem ninguém ter pedido nada, não faz sentido incomodar com erro de rede
// logo ao abrir o app (quem quiser saber o motivo, confere na mão em
// Ajustes).
export async function checkForUpdateOnStartup(){
if(!IS_NATIVE) return;
if(state.updateSnoozeDays === 0) return;
try{
const snoozedUntil = parseInt(localStorage.getItem("busbus_update_snoozed_until"), 10);
if(snoozedUntil && Date.now() < snoozedUntil) return;
}catch(e){}
try{
const { remoteVersion, apkAsset } = await fetchLatestApkRelease();
if(remoteVersion && apkAsset && compareSemver(remoteVersion, APP_VERSION) > 0){
openUpdateAvailableModal(remoteVersion, apkAsset.browser_download_url, { automatic: true });
}
}catch(e){
console.error("[BusBus] checagem automática de atualização falhou (silenciosa de propósito):", e);
}
}

// Guarda a URL do APK entre abrir o aviso e a pessoa tocar em "Baixar" —
// mais simples que embutir a URL inteira (com barras, dois-pontos etc.)
// dentro de um atributo onclick="" no HTML gerado.
let pendingUpdateDownloadUrl = null;

// Antes o toque em "Verificar atualizações" já abria o download sozinho,
// sem perguntar nada — o rilclesaraiva achou isso ruim (te joga pra fora do
// app sem escolha). Agora só pergunta: a pessoa decide se quer ir buscar a
// atualização agora ou deixar pra depois.
//
// "automatic" diz se esse aviso apareceu sozinho (checkForUpdateOnStartup)
// ou foi pedido na mão (botão "Verificar atualizações") — só no primeiro
// caso o "Agora não" aplica o adiamento escolhido em Ajustes (ver
// dismissUpdateModal, abaixo): quem checou na mão já tá prestando atenção,
// não faz sentido um adiamento de dias pra uma recusa feita ali na hora.
let updateModalIsAutomatic = false;

function openUpdateAvailableModal(version, downloadUrl, opts = {}){
pendingUpdateDownloadUrl = downloadUrl;
updateModalIsAutomatic = !!opts.automatic;
openModal(`
<div class="modalHead"><h3>Nova versão disponível</h3><button class="modalClose" onclick="dismissUpdateModal()">✕</button></div>
<div class="aboutText" style="margin-bottom:18px;">A versão <b>v${version}</b> do BusBus já está disponível (você está na v${APP_VERSION}). Quer baixar agora? Depois de baixar, é só abrir o arquivo pra instalar.</div>
<div class="modalBtnRow">
<button class="modalBtnCancel" onclick="dismissUpdateModal()">Agora não</button>
<button class="modalBtnConfirm" onclick="confirmDownloadUpdate()">Baixar</button>
</div>
`);
}

export function dismissUpdateModal(){
if(updateModalIsAutomatic){
try{
const days = ALLOWED_UPDATE_SNOOZE_DAYS.includes(state.updateSnoozeDays) ? state.updateSnoozeDays : 3;
localStorage.setItem("busbus_update_snoozed_until", String(Date.now() + days * 86400000));
}catch(e){}
}
closeModal();
}

export function confirmDownloadUpdate(){
if(pendingUpdateDownloadUrl) window.open(pendingUpdateDownloadUrl, "_blank");
closeModal();
}

export const LICENSE_ITEMS = [
{ name: "OpenStreetMap", icon: osmLogoDataUri, url: "https://www.openstreetmap.org", desc: "Mapas e busca de endereços são fornecidos pelos colaboradores do OpenStreetMap, sob a licença Open Database License (ODbL)." },
{ name: "Leaflet", icon: favicon("leafletjs.com"), url: "https://leafletjs.com", desc: "Biblioteca de código aberto que desenha o mapa interativo do app. Licença BSD-2-Clause." },
{ name: "Open-Meteo", icon: favicon("open-meteo.com"), url: "https://open-meteo.com", desc: "Previsão do tempo gratuita e sem necessidade de cadastro, usada no widget de clima. Licença CC BY 4.0." },
{ name: "ipapi.co", icon: favicon("ipapi.co"), url: "https://ipapi.co", desc: "Estimativa de localização aproximada por IP, usada só quando o GPS falha ou é negado." },
{ name: "Prefeitura de Belém / SEGBEL", icon: favicon("belem.pa.gov.br"), url: "https://seguranca.belem.pa.gov.br/linhas/", desc: "As listas de ruas de \"Ruas da linha\" vêm dos itinerários oficiais publicados pela Prefeitura de Belém, através da Segbel (Segurança, Ordem Pública e Mobilidade)." },
];

export function openLicensesModal(){
const items = LICENSE_ITEMS.map(it => `
<div class="licenseItem">
<img class="licenseLogo" src="${it.icon}" alt="" onerror="this.style.display='none'">
<div class="licenseBody">
<div class="licenseTitle">${it.name}</div>
<div class="licenseDesc">${it.desc}</div>
<a class="licenseLink" href="${it.url}" target="_blank">${it.url}</a>
</div>
</div>`).join("");
openModal(`
<div class="modalHead"><h3>Licenças &amp; Atribuições</h3><button class="modalClose" onclick="closeModal()">✕</button></div>
<div class="aboutText" style="margin-bottom:10px;">O BusBus é feito com a ajuda de serviços e bibliotecas de terceiros, gratuitos e abertos. O devido crédito vai todo pra eles:</div>
<div class="licenseItem">
<div class="licenseBody">
<div class="licenseTitle">Dados de transporte em tempo real</div>
<div class="licenseDesc">Paradas, linhas e posição dos ônibus vêm de um serviço de dados de transporte público de Belém, acessado através do proxy próprio do BusBus.</div>
</div>
</div>
${items}
`);
}
