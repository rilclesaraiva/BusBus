// BusBus Experimental Modular (B.E.M.) — módulo "settings.js"
// Copyright (C) 2026 rilclesaraiva — licenciado sob GNU GPLv3.
// Texto completo: https://github.com/rilclesaraiva/BusBus/blob/main/LICENSE

import { state, ALLOWED_RADII, applyTheme, APP_VERSION } from "./state.js";
import { el, render } from "./utils.js";
import { updateHeaderAndNav } from "./nav.js";
import {
  paletteIcon, locIcon, rotateSettingIcon, mapThemeIcon, githubIcon, coffeeIcon,
  licenseIcon, shieldIcon, heartIcon, favicon,
} from "./icons.js";
import { destroyLeafletMap, leafletMap } from "./map.js";
import { initLeafletMapOnce } from "./map.js";
import { fetchStopsSilent } from "./stops.js";

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
{ id: "auto", label: "Igual ao tema do app" },
{ id: "light", label: "Sempre claro" },
{ id: "dark", label: "Sempre escuro" },
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
<div class="settingsRow link" onclick="window.open('${GITHUB_URL}', '_blank')">
<div class="settingsIcon">${githubIcon}</div>
<div class="rowBody">
<div class="rowTitle">Código-fonte no GitHub</div>
<div class="rowDesc">BusBus é feito por rilclesaraiva. Código aberto pra quem quiser ver, usar ou contribuir.</div>
</div>
<div class="chev">›</div>
</div>
<div class="settingsRow link" onclick="openSupportModal()">
<div class="settingsIcon">${coffeeIcon}</div>
<div class="rowBody">
<div class="rowTitle">Apoie o projeto</div>
<div class="rowDesc">Pix ou cartão (débito/crédito internacional).</div>
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
<div class="settingsRow link" onclick="openPrivacyModal()">
<div class="settingsIcon">${shieldIcon}</div>
<div class="rowBody">
<div class="rowTitle">Política de Privacidade</div>
<div class="rowDesc">O que o BusBus faz e não faz com seus dados.</div>
</div>
<div class="chev">›</div>
</div>
</div>
<div class="settingsFooter">
${heartIcon}<br>
Feito com carinho por <a class="footerAuthorLink" href="${GITHUB_PROFILE_URL}" target="_blank" rel="noopener"><b>rilclesaraiva</b></a><br>
BusBus · dados em tempo real de Belém · v${APP_VERSION}<br>
<span style="opacity:.75;">Código escrito com apoio de IA · <span class="licenseLink" style="cursor:pointer;" onclick="openPrivacyModal()">saiba mais</span></span>
</div>
</section>
`);
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

export function openModal(innerHTML){
closeModal();
const ov = document.createElement("div");
ov.className = "modalOverlay";
ov.id = "activeModal";
ov.onclick = (e) => { if(e.target === ov) closeModal(); };
ov.innerHTML = `<div class="modalCard">${innerHTML}</div>`;
document.body.appendChild(ov);
}

export function closeModal(){ const ov = el("activeModal"); if(ov) ov.remove(); }

export const BUY_COFFEE_URL = "https://buymeacoffee.com/saraivarilcle";

export const GITHUB_URL = "https://github.com/rilclesaraiva/BusBus";

export const GITHUB_PROFILE_URL = "https://github.com/rilclesaraiva";

export const PRIVACY_URL = "https://busbus.saraivarilcle.workers.dev/privacy";

export const PIX_CODE = "00020126580014br.gov.bcb.pix013675eadc64-11f6-4883-a059-9f05670af82d5204000053039865802BR5914RILCLE_SARAIVA6009Sao Paulo610901227-20062230519daqr640397992297291630413B8";

export const PIX_QR_DATA_URI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAADEAQAAAADo3bPGAAAB/UlEQVR42t2Ysa3dMBAE54yfDzt4/ZelDpYVrAN9J4adkYBhhhKgBanb2TtO+fPaP/jb+rffzMxizcwMe2aGNTPruI4tGwvlQ5od2ws7nQWbbReUgffRWZ0vAFYw6yF8up517c/5YfazZu0H1o06oLYW21qbtLU1Z3WmA/7uHfA5vZ+2TZNiX0nbNqd1aEgaBRJrywWdQmPTVq2g5ryOQi1FMZUQL+ynCTRqGyHADZ0U/SWWICWeP7emIqlJS6tyfj+JpI2xprT2vE9pmiBSKiVIPa3zhYvd1c2Ehx3M3lmc949RIthIY3uhDppQQi3G5D3I8zrSCEhNSILH/fMDwnxohWEtFzdyjjYW9IVPaayez5/9gd2hC9gSFuye798eAu2C0M0sAhfqOuB3oiql4AUeYEoNqWlNmxscfUVsNDWNpBdyIfRXlKoIcoOjNHxLlLR96/u8TtLEJg0VQm/wujDdz2QhGyDrPA++GOnaDcRxI+yu89x5OwLbUk3C28+d9w/Ji+qKxhfh5/sqjQ1CSF7f3vDP94erBJPWCz717awJb3/4cu4Cd97JJ28LD9beyNOZWXvtD7AgZrMIV+ZtMEuyF/AhrHV+Dh7JYnXteWNoD710H6IPGB6Yh3iBB683IWBKKOCNeaEvd7AaDXdyAVSDCZqqPc6d+c/uxX4CcLHkfj3ULf0AAAAASUVORK5CYII=";

export function openSupportModal(){
openModal(`
<div class="modalHead"><h3>Apoie o projeto</h3><button class="modalClose" onclick="closeModal()">✕</button></div>
<div class="aboutText pixHint">Escolha como prefere ajudar a manter o BusBus no ar.</div>
<div class="supportOptTitle">Pix</div>
<img class="pixQrImg" src="${PIX_QR_DATA_URI}" alt="QR Pix">
<div class="aboutText pixHint">Escaneie com seu banco, ou copie o código.</div>
<div class="pixCodeBox" id="pixCodeBox">${PIX_CODE}</div>
<button class="pixCopyBtn" id="pixCopyBtn" onclick="copyPixCode()">Copiar código</button>
<div class="supportDivider">ou</div>
<div class="supportOptTitle">Cartão (débito ou crédito, internacional)</div>
<button class="pixCopyBtn cardPayBtn" onclick="window.open('${BUY_COFFEE_URL}','_blank')">Pagar com cartão</button>
`);
}

export function copyPixCode(){
const btn = el("pixCopyBtn");
const done = () => { if(!btn) return; const old = btn.textContent; btn.textContent = "Copiado!"; setTimeout(() => { btn.textContent = old; }, 1800); };
const legacy = () => { try{ const ta = document.createElement("textarea"); ta.value = PIX_CODE; ta.style.cssText = "position:fixed;opacity:0"; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); done(); }catch(e){ console.error("[BusBus] copiar Pix falhou:", e); } };
try{ if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(PIX_CODE).then(done).catch(legacy); } else { legacy(); } }catch(e){ legacy(); }
}

export function openPrivacyModal(){
openModal(`
<div class="modalHead"><h3>Política de Privacidade</h3><button class="modalClose" onclick="closeModal()">✕</button></div>
<div class="aboutSection">
<div class="aboutTitle">Privacidade e dados</div>
<div class="aboutText">O BusBus pede permissão de localização só pra mostrar as paradas e ônibus mais próximos de
você no mapa e calcular distâncias e rotas a pé — essa é a única razão. Sua localização é usada apenas no seu
aparelho, em tempo real, pra desenhar o mapa; ela não é enviada, guardada ou compartilhada em nenhum servidor
nosso, e o app não coleta, não armazena e não vende nenhum dado pessoal seu. Favoritos, tema e outras preferências
ficam salvos só no seu próprio celular. Se isso mudar algum dia, será avisado claramente numa atualização do app,
antes de qualquer mudança entrar em vigor.</div>
<a class="licenseLink" href="${PRIVACY_URL}" target="_blank" style="display:inline-block;margin-top:8px;">Ver a política completa &rarr;</a>
</div>
<div class="aboutSection">
<div class="aboutTitle">O BusBus nunca vai cobrar nada</div>
<div class="aboutText">O BusBus existe pelo bem-estar de quem trabalha e de quem mora em Belém — motoristas, cobradores,
passageiros, pedestres — e pelo direito de todo mundo saber quando o próximo ônibus chega. Não é, e nunca será,
uma crítica a uma empresa ou pessoa específica: é uma crítica construtiva, feita na esperança de que os sistemas
de transporte da cidade continuem melhorando. O app não cobra, não vai cobrar e não tem planos pagos escondidos —
essa é uma promessa, não um período de teste.</div>
</div>
<div class="aboutSection">
<div class="aboutTitle">Sobre as doações</div>
<div class="aboutText">O botão "Apoie o projeto" (Pix ou cartão) é só isso: apoio voluntário, de quem quiser e puder. Nenhuma doação
é necessária pra usar qualquer parte do app, hoje ou no futuro. O dinheiro recebido serve unicamente pra manter o
BusBus funcionando e evoluindo — custos como manter o acesso aos dados, hospedagem e o tempo de desenvolvimento —
nunca pra criar cobranças, assinaturas ou recursos trancados atrás de pagamento.</div>
</div>
<div class="aboutSection">
<div class="aboutTitle">Um app que nunca para de melhorar</div>
<div class="aboutText">O BusBus é construído com a ideia de que ele nunca vai estar realmente "pronto". Sempre vai
existir uma versão melhor possível — mais rápida, mais precisa, mais acessível — e é atrás dela que o
desenvolvimento continua, por mais perto que a gente chegue. Esse estado perfeito é inatingível de propósito: é o
que garante que o app continue sendo cuidado e atualizado, em vez de parar no "bom o suficiente".</div>
</div>
<div class="aboutSection" style="border-bottom:none;">
<div class="aboutTitle">Feito com apoio de inteligência artificial</div>
<div class="aboutText">O código do BusBus foi escrito com apoio de ferramentas de IA, sob a direção de
rilclesaraiva — cada funcionalidade, ajuste e correção parte de uma decisão sua, não de algo gerado sozinho e
publicado sem revisão. É assim que um projeto pessoal e independente consegue entregar um app deste tamanho sem
uma equipe por trás. O cuidado pra deixar tudo o mais polido e livre de problemas possível é constante — e, como
em qualquer software, alguma coisa pode passar despercebida. Encontrou algo estranho? Conta pra gente em
<a class="licenseLink" href="mailto:saraivarilcle@gmail.com">saraivarilcle@gmail.com</a>.</div>
</div>
`);
}

export const LICENSE_ITEMS = [
{ name: "OpenStreetMap", icon: favicon("openstreetmap.org"), url: "https://www.openstreetmap.org", desc: "Mapas e busca de endereços são fornecidos pelos colaboradores do OpenStreetMap, sob a licença Open Database License (ODbL)." },
{ name: "Leaflet", icon: favicon("leafletjs.com"), url: "https://leafletjs.com", desc: "Biblioteca de código aberto que desenha o mapa interativo do app. Licença BSD-2-Clause." },
{ name: "Open-Meteo", icon: favicon("open-meteo.com"), url: "https://open-meteo.com", desc: "Previsão do tempo gratuita e sem necessidade de cadastro, usada no widget de clima. Licença CC BY 4.0." },
{ name: "ipapi.co", icon: favicon("ipapi.co"), url: "https://ipapi.co", desc: "Estimativa de localização aproximada por IP, usada só quando o GPS falha ou é negado." },
{ name: "Buy Me a Coffee", icon: favicon("buymeacoffee.com"), url: "https://buymeacoffee.com", desc: "Processa as doações voluntárias feitas por cartão dentro do app." },
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
