import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// Fonte única da versão: o "version" do package.json. Em vez de digitar o
// número em três lugares diferentes (e esquecer de atualizar um deles mais
// cedo ou mais tarde), o build lê daqui e injeta tanto no JS (pra aparecer
// na tela de Ajustes do app) quanto no próprio HTML final (visível até sem
// abrir o app, só olhando o código-fonte do arquivo publicado) — então
// "qual versão é esse build?" sempre tem uma resposta sem precisar lembrar
// de nada na hora de gerar um novo.
const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url)));

// Troca "%APP_VERSION%" pelo número de verdade dentro do index.html — é
// assim que o comentário/meta tag do HTML final fica com a versão certa
// sem precisar editar o index.html toda vez que a versão muda.
function injectAppVersionIntoHtml(version){
  return {
    name: "inject-app-version-into-html",
    transformIndexHtml(html){
      return html.replace(/%APP_VERSION%/g, version);
    },
  };
}

export default defineConfig({
  plugins: [viteSingleFile(), injectAppVersionIntoHtml(pkg.version)],
  define: {
    // Vira uma string literal de verdade no JS compilado (não um "import"
    // de runtime) — é como o módulo state.js consegue expor APP_VERSION
    // pro resto do app, inclusive a tela de Ajustes.
    "import.meta.env.APP_VERSION": JSON.stringify(pkg.version),
  },
  build: {
    // Um único arquivo HTML na saída, igual ao busbus.html de hoje — é
    // esse arquivo que vai pro AppMint e que a Cloudflare Pages serve
    // como PWA. Sem isso o Vite geraria JS/CSS em arquivos separados.
    cssCodeSplit: false,
    assetsInlineLimit: 100000000, // embute tudo (ícones pequenos, etc.) no HTML
    // "esnext": precisa de suporte a top-level await (usado pra garantir
    // que o leaflet-rotate só rode depois de "window.L = L"). WebViews do
    // AppMint e navegadores de celular atuais (o público real do BusBus)
    // já suportam isso sem problema — é o mesmo nível de suporte que ES
    // modules já exige.
    target: "esnext",
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
