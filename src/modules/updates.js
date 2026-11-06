// Aviso de atualização do app Android, no modelo do BoomListener.
//
// Fluxo: busca a última Release pública no GitHub, compara com a versão
// instalada e, se for mais nova, mostra um painel em tela cheia com as notas
// da Release (o texto do CHANGELOG). Confere ao abrir o app (sempre) e ao
// voltar pro app (no máximo a cada 10 min). A Release mais recente fica no
// aparelho: ela aparece na hora, antes da consulta, e o ETag guardado faz o
// GitHub responder 304 (que não gasta o limite da API) quando nada mudou.
//
// "Agora não" vale só até abrir o app de novo e não grava nada. O sino
// adia por 1 semana ou 1 mês, ou pula aquela versão (isso é gravado). Depois
// de a pessoa responder, o aviso não volta na mesma sessão. Só no app
// Android: no site/PWA a atualização já é automática.
import { APP_VERSION } from "./state.js";
import { el } from "./utils.js";
import { closeModal } from "./settings.js";
import { verifiedIcon, bellOffIcon } from "./icons.js";

const RELEASES_API_URL = "https://api.github.com/repos/rilclesaraiva/BusBus/releases/latest";
const RELEASES_PAGE_URL = "https://github.com/rilclesaraiva/BusBus/releases";

export const RESUME_MIN_INTERVAL_MS = 10 * 60 * 1000;
export const PAUSE_WEEK_MS = 7 * 86400000;
export const PAUSE_MONTH_MS = 30 * 86400000;

const K = {
  latest: "busbus_upd_latest",     // {version, url, notes} da última Release vista
  etag: "busbus_upd_etag",
  checkedAt: "busbus_upd_checked_at", // só marcado quando o GitHub respondeu
  pauseUntil: "busbus_upd_pause_until",
  skip: "busbus_upd_skip_version",
};

// ---------- lógica pura (testada em test/updates.test.js) ----------

// >0 se "a" é mais nova que "b". Pedaço faltando ou não numérico conta 0.
export function compareSemver(a, b){
  const pa = String(a).split(".").map(n => parseInt(n, 10) || 0);
  const pb = String(b).split(".").map(n => parseInt(n, 10) || 0);
  for(let i = 0; i < 3; i++){
    const d = (pa[i] || 0) - (pb[i] || 0);
    if(d !== 0) return d;
  }
  return 0;
}

// Resposta da API do GitHub -> {version, url, notes}, ou null se a Release
// não tem versão ou APK anexado.
export function parseRelease(data){
  if(!data) return null;
  const version = String(data.tag_name || "").replace(/^v/i, "").trim();
  const apk = (data.assets || []).find(a => /\.apk$/i.test(a.name || ""));
  if(!version || !apk || !apk.browser_download_url) return null;
  return { version, url: apk.browser_download_url, notes: String(data.body || "") };
}

// Deve avisar sozinho agora? (A checagem manual ignora isto.)
export function shouldPrompt(latest, installed, now, pauseUntil, skipVersion){
  if(!latest || compareSemver(latest.version, installed) <= 0) return false;
  if(pauseUntil && now < pauseUntil) return false;
  if(skipVersion && skipVersion === latest.version) return false;
  return true;
}

// Confere ao voltar pro app? Só se a última resposta do GitHub tem 10 min+.
export function shouldCheckOnResume(checkedAt, now){
  return !checkedAt || now - checkedAt >= RESUME_MIN_INTERVAL_MS;
}

function esc(s){
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function inline(s){
  return esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

// Markdown limitado (títulos, listas, negrito, código, links) -> HTML seguro.
// Linha "> destaque" vira parágrafo.
export function notesToHtml(md){
  const out = [];
  let inList = false;
  const closeList = () => { if(inList){ out.push("</ul>"); inList = false; } };
  for(const raw of String(md || "").replace(/\r/g, "").split("\n")){
    const line = raw.trim();
    if(!line){ closeList(); continue; }
    let m;
    if((m = line.match(/^#{1,6}\s+(.*)$/))){ closeList(); out.push(`<h4>${inline(m[1])}</h4>`); }
    else if((m = line.match(/^[-*]\s+(.*)$/))){
      if(!inList){ out.push("<ul>"); inList = true; }
      out.push(`<li>${inline(m[1])}</li>`);
    }
    else if((m = line.match(/^>\s?(.*)$/))){ closeList(); out.push(`<p>${inline(m[1])}</p>`); }
    else { closeList(); out.push(`<p>${inline(line)}</p>`); }
  }
  closeList();
  return out.join("");
}

// ---------- armazenamento ----------

function get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
function set(k, v){ try{ localStorage.setItem(k, v); }catch(e){} }
function del(k){ try{ localStorage.removeItem(k); }catch(e){} }

function readLatest(){
  try{
    const o = JSON.parse(get(K.latest));
    return o && o.version && o.url ? o : null;
  }catch(e){ return null; }
}

function readPauseUntil(){ return parseInt(get(K.pauseUntil), 10) || 0; }

// Estado dos avisos, pra tela Sobre: {paused: ms|0, skip: "x.y.z"|""}
export function getNoticeState(now = Date.now()){
  const p = readPauseUntil();
  return { paused: p > now ? p : 0, skip: get(K.skip) || "" };
}

export function setNoticePause(ms){
  set(K.pauseUntil, String(Date.now() + ms));
  del(K.skip);
}

export function clearNotices(){
  del(K.pauseUntil);
  del(K.skip);
}

function skipVersion(v){ set(K.skip, v); }

// ---------- rede ----------

// Consulta a última Release com o ETag guardado. Devolve a Release (nova ou
// do cache, no 304) ou null se não há APK publicado. Lança erro de rede/HTTP.
async function fetchLatest(){
  const etag = get(K.etag);
  const cached = readLatest();
  let res;
  try{
    res = await fetch(RELEASES_API_URL, etag && cached ? { headers: { "If-None-Match": etag } } : undefined);
  }catch(e){
    // Se o cabeçalho extra for barrado, tenta de novo sem ele.
    if(!(etag && cached)) throw e;
    res = await fetch(RELEASES_API_URL);
  }
  if(res.status === 304 && cached){
    set(K.checkedAt, String(Date.now()));
    return cached;
  }
  if(!res.ok) throw new Error("GitHub releases respondeu " + res.status);
  const latest = parseRelease(await res.json());
  const newEtag = res.headers.get("ETag");
  if(latest){ set(K.latest, JSON.stringify(latest)); } else { del(K.latest); }
  if(newEtag) set(K.etag, newEtag); else del(K.etag);
  set(K.checkedAt, String(Date.now()));
  return latest;
}

// ---------- painel em tela cheia ----------

let sessionAnswered = false; // já mostrou/respondeu nesta sessão
let pendingUrl = "";

export function closeUpdatePanel(){ closeModal(); }

export function downloadUpdate(){
  if(pendingUrl) window.open(pendingUrl, "_blank");
  closeUpdatePanel();
}

// "Agora não": só fecha. Nada é gravado e o aviso não volta nesta sessão.
export function dismissUpdatePanel(){ closeUpdatePanel(); }

export function toggleUpdateBellMenu(e){
  if(e) e.stopPropagation();
  const m = el("updBellMenu");
  if(m) m.classList.toggle("open");
}

export function postponeUpdate(kind){
  const v = (el("updatePanel") || {}).dataset ? el("updatePanel").dataset.version : "";
  if(kind === "week") setNoticePause(PAUSE_WEEK_MS);
  else if(kind === "month") setNoticePause(PAUSE_MONTH_MS);
  else if(kind === "skip" && v) skipVersion(v);
  closeUpdatePanel();
  const s = el("noticesStatus");
  if(s) s.textContent = noticesStatusText();
}

function showPanel(latest){
  closeModal();
  pendingUrl = latest.url;
  const ov = document.createElement("div");
  ov.id = "activeModal";
  ov.className = "updateOverlay";
  ov.innerHTML = `
<div class="updatePanel" id="updatePanel" data-version="${esc(latest.version)}" onclick="document.getElementById('updBellMenu')?.classList.remove('open')">
  <div class="updScroll">
    <div class="updBadge">${verifiedIcon}</div>
    <h2 class="updTitle">Nova versão disponível!</h2>
    <div class="updSub">v${esc(latest.version)} · você tem a v${esc(APP_VERSION)}</div>
    <div class="updNotes">${notesToHtml(latest.notes) || '<p>Sem notas para esta versão.</p>'}</div>
  </div>
  <div class="updBar">
    <button class="updBtnPrimary" onclick="downloadUpdate()">Baixar</button>
    <button class="updBtnGhost" onclick="dismissUpdatePanel()">Agora não</button>
    <div class="updBellWrap">
      <button class="updBell" aria-label="Adiar avisos" onclick="toggleUpdateBellMenu(event)">${bellOffIcon}</button>
      <div class="updBellMenu" id="updBellMenu">
        <button onclick="postponeUpdate('week')">Não avisar por uma semana</button>
        <button onclick="postponeUpdate('month')">Não avisar por um mês</button>
        <button onclick="postponeUpdate('skip')">Pular esta versão</button>
      </div>
    </div>
  </div>
</div>`;
  document.body.appendChild(ov);
}

// ---------- gatilhos ----------

let isNative = false;
export function initUpdates(native){
  isNative = !!native;
  if(!isNative) return;
  startupCheck();
}

function promptable(latest){
  return shouldPrompt(latest, APP_VERSION, Date.now(), readPauseUntil(), get(K.skip) || "");
}

function show(latest){
  sessionAnswered = true;
  showPanel(latest);
}

async function autoCheck(){
  try{
    const latest = await fetchLatest();
    if(!sessionAnswered && promptable(latest)) show(latest);
  }catch(e){
    console.error("[BusBus] checagem automática de atualização falhou (silenciosa de propósito):", e);
  }
}

// Abertura do app: mostra o que está guardado na hora e consulta em seguida.
function startupCheck(){
  const cached = readLatest();
  if(cached && promptable(cached)) show(cached);
  autoCheck();
}

// Chamado ao voltar pro app.
export function onAppResume(){
  if(!isNative || sessionAnswered) return;
  if(!shouldCheckOnResume(parseInt(get(K.checkedAt), 10) || 0, Date.now())) return;
  autoCheck();
}

// Botão "Verificar atualizações": ignora pausa/pulo e mostra o mesmo painel.
export async function checkForUpdate(){
  const statusEl = el("updateStatus");
  if(statusEl) statusEl.textContent = "Verificando se tem uma versão mais nova…";
  try{
    const latest = await fetchLatest();
    if(!latest){
      if(statusEl) statusEl.innerHTML = `Não encontrei um APK publicado na última versão. <a class="licenseLink" href="${RELEASES_PAGE_URL}" target="_blank" rel="noopener">Ver releases no GitHub &rarr;</a>`;
    } else if(compareSemver(latest.version, APP_VERSION) > 0){
      if(statusEl) statusEl.textContent = `Nova versão v${latest.version} disponível (você está na v${APP_VERSION}).`;
      show(latest);
    } else if(statusEl){
      statusEl.textContent = `Você já está na versão mais recente (v${APP_VERSION}).`;
    }
  }catch(e){
    console.error("[BusBus] erro ao verificar atualização:", e);
    if(statusEl) statusEl.innerHTML = `Não consegui verificar agora${e && e.name === "TypeError" ? " — você está sem conexão" : ""}. <a class="licenseLink" href="${RELEASES_PAGE_URL}" target="_blank" rel="noopener">Ver releases no GitHub &rarr;</a>`;
  }
}

// ---------- texto da linha "Avisos de atualização" ----------

function fmtDate(ms){
  return new Date(ms).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

export function noticesStatusText(){
  const s = getNoticeState();
  if(s.paused) return `Pausados até ${fmtDate(s.paused)}. Toque para mudar.`;
  if(s.skip) return `Pulando a v${s.skip}. Toque para mudar.`;
  return "Normais: o app avisa quando houver versão nova. Toque para mudar.";
}
