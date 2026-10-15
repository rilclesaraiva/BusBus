// BusBus Experimental Modular (B.E.M.) — módulo "native.js"
// Copyright (C) 2026 rilclesaraiva — licenciado sob GNU GPLv3.
// Texto completo: https://github.com/rilclesaraiva/BusBus/blob/main/LICENSE
//
// Integrações específicas do app nativo (Capacitor/Android), que não fazem
// sentido nem existem na versão web/PWA. Tudo aqui é protegido por
// Capacitor.isNativePlatform() — no navegador/PWA este módulo não faz nada.
//
// Por que isso existe (v1.3.3): até a v1.3.2, o APK vinha do AppMint, um
// WebView-wrapper no-code que já resolvia essas coisas por baixo dos panos
// sozinho. A partir da v1.3.2 o projeto passou a usar Capacitor (projeto
// Android nativo de verdade) e NENHUMA dessas integrações vem de graça —
// precisam ser ligadas explicitamente, senão o comportamento regride:
//
// 1) Botão/gesto de voltar fechando o app em QUALQUER tela (até saindo de
//    uma parada pra Home): sem o plugin @capacitor/app escutando o evento
//    nativo "backButton" e decidindo o que fazer, o Android trata o back
//    como "fechar a activity" sempre, não importa se o WebView ainda tem
//    histórico de navegação pra voltar. O app já mantém controle preciso
//    de "em que nível da navegação estou" via navStack (nav.js) — aqui só
//    traduzimos isso pra decisão nativa: tem navegação pra desfazer?
//    history.back(); senão, estamos na raiz mesmo, aí sim fecha o app.
//
// 1.1) Painéis pop-up (Licenças & Atribuições, Ruas da linha, Verificar
//    atualizações — tudo que passa por openModal()/closeModal() em
//    settings.js) não entram no histórico de navegação: são só um <div>
//    sobreposto, sem pushState nenhum. Resultado: antes desta correção, o
//    voltar nativo ignorava completamente que um painel estava aberto e ia
//    direto pra lógica do item acima, navegando a aba de baixo enquanto o
//    painel continuava visível por cima. Por isso aqui a gente SEMPRE
//    confere primeiro se tem um painel aberto (#activeModal) — se tiver, o
//    voltar só fecha ele, do mesmo jeito que tocar no X ou fora do painel
//    já fazia.
//
// 2) Título colado na barra de notificação: a partir do Android 15 (API
//    35), apps são renderizados edge-to-edge por padrão/obrigação — o
//    conteúdo do WebView passa a ser desenhado POR BAIXO da status bar, a
//    não ser que o app avise que não quer isso. StatusBar.setOverlaysWebView
//    ({overlay:false}) é o jeito oficial do Capacitor de dizer "não, quero
//    que o conteúdo comece depois da status bar" — isso ajusta sozinho a
//    área visível do WebView, sem precisar calcular inset manualmente.
//    (Existe também um reforço via CSS env(safe-area-inset-top) no
//    styles.css, só por garantia.)

import { Capacitor } from "@capacitor/core";

export async function setupNativeIntegrations(){
if(!Capacitor.isNativePlatform()) return;

try{
const { App } = await import("@capacitor/app");
App.addListener("backButton", () => {
if(document.getElementById("activeModal")){
import("./settings.js").then(({ closeModal }) => closeModal());
return;
}
// Importa dinamicamente pra evitar um ciclo de import estático entre
// native.js e nav.js (nav.js não precisa saber que native.js existe).
import("./nav.js").then(({ navStack }) => {
if(navStack.length > 1){
history.back();
} else {
App.exitApp();
}
});
});
}catch(e){
console.error("[BusBus] falha ao configurar o botão voltar nativo:", e);
}

try{
const { StatusBar } = await import("@capacitor/status-bar");
await StatusBar.setOverlaysWebView({ overlay: false });
}catch(e){
console.error("[BusBus] falha ao configurar a status bar nativa:", e);
}
}
