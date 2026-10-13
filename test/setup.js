// Setup global do Vitest: várias funções do app (ex.: clearSearchHistory)
// têm o efeito colateral de re-renderizar a tela atual, e esse
// re-render espera encontrar os elementos fixos do "esqueleto" do app
// (cabeçalho, nav inferior, #screens) já no DOM — exatamente como index.html
// os entrega prontos antes do <script type="module"> rodar. Sem isso, um
// teste que só queria checar uma regra de negócio (tipo "limpar histórico
// zera a lista") quebraria por um TypeError de DOM, sem relação com o que
// está sendo testado de fato.
import { beforeEach } from "vitest";

// Importante: isso precisa rodar ANTES do primeiro import de qualquer
// módulo do app, porque src/modules/utils.js guarda
// "const screens = el('screens')" uma vez só, no momento em que o módulo é
// carregado — se o #screens ainda não existir nesse instante, essa
// constante fica presa em "null" pro resto do arquivo de teste. O Vitest
// garante que os "setupFiles" (este arquivo) terminam de rodar antes do
// próprio arquivo de teste ser carregado, então fazer a montagem aqui, fora
// de um beforeEach, é o que garante a ordem certa.
const SHELL_HTML = `
<div id="app">
<header>
<button class="backBtn" id="globalBackBtn"></button>
<div>
<h1>BusBus</h1>
<p id="subtitle">Belém em tempo real</p>
</div>
<button class="bellBtn" id="bellBtn">
<span class="bellDot" id="bellDot"></span>
</button>
</header>
<div id="screens"></div>
<nav class="bottomNav" id="bottomNav">
<button class="navBtn" id="btnNavSearch"></button>
<button class="navBtn active" id="btnNavHome"></button>
<button class="navBtn" id="btnNavRoute"></button>
<button class="navBtn" id="btnNavConfig"></button>
</nav>
</div>
`;

document.body.innerHTML = SHELL_HTML;

// Entre um teste e outro, só limpamos o CONTEÚDO de dentro do esqueleto —
// nunca substituímos os próprios nós fixos (#screens, #subtitle etc.) por
// outros novos. src/modules/utils.js guarda "const screens =
// el('screens')" uma vez só; se o nó #screens fosse troca por um novo a
// cada teste (via innerHTML = SHELL_HTML de novo), essa constante ficaria
// presa apontando pro nó antigo e desconectado do documento, e qualquer
// render() subsequente escreveria num lugar que document.getElementById()
// nunca mais encontra — foi exatamente esse bug que apareceu aqui antes
// dessa correção.
beforeEach(() => {
  document.getElementById("screens").innerHTML = "";
  document.getElementById("subtitle").textContent = "";
  document.getElementById("globalBackBtn").classList.remove("show");
  document.getElementById("bottomNav").classList.remove("hidden");
  document.getElementById("bellDot").classList.remove("show");
  document.querySelectorAll(".navBtn").forEach(btn => btn.classList.remove("active"));
  document.getElementById("btnNavHome").classList.add("active");
  try{ history.replaceState({ label: "stops" }, "", "#stops"); }catch(e){}
});
