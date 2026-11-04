// BusBus API Proxy — Cloudflare Worker
// Copyright (C) 2026 rilclesaraiva — licenciado sob GNU GPLv3.
// Texto completo: https://github.com/rilclesaraiva/BusBus/blob/main/LICENSE
//
// O que isso faz: repassa (proxy) as chamadas que o app BusBus faz pra API
// real, sem que o endereço dessa API apareça em nenhum lugar do código
// HTML/JS que fica dentro do APK. Quem abrir o APK e inspecionar o arquivo
// só vai ver o endereço deste Worker, nunca o da API original.
//
// A URL real NÃO fica escrita aqui no código-fonte — ela vem de uma
// variável de ambiente (env.UPSTREAM), cadastrada como "Secret" direto no
// painel do Cloudflare. Isso é de propósito: este arquivo pode ficar num
// repositório público no GitHub sem revelar a URL real pra ninguém que ler
// o código, porque o valor do Secret nunca é salvo no repositório, só na
// sua conta Cloudflare.
//
// Como cadastrar o Secret (uma vez só):
//   Painel Cloudflare → Workers & Pages → seu Worker → Settings →
//   Variables and Secrets → Add → Type: Secret → Name: UPSTREAM →
//   Value: a URL real da API → Save and deploy.
//
// CORS liberado pra qualquer origem (Access-Control-Allow-Origin: *).
//
// Antes este Worker restringia por origem (só aceitava chamadas vindas de
// "https://appassets.androidplatform.net", a origem que a gente tinha
// observado uma vez nos logs de erro do APK). Isso quebrou o app na prática:
// a origem real que o AppMint usa no WebView, nessa versão/dispositivo,
// era diferente da observada antes — então o navegador bloqueava toda
// chamada, e paradas/linhas paravam de carregar.
//
// Essa restrição nunca foi uma proteção forte mesmo: CORS só impede OUTRO
// SITE de chamar este Worker através do navegador de alguém — não impede
// alguém de chamar direto por fora de um navegador (curl, script, Postman).
// O que de fato protege a API real é o Secret UPSTREAM (nunca aparece no
// código, nem no APK, nem no GitHub) — isso continua intacto.

const PRIVACY_POLICY_HTML = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Política de Privacidade — BusBus</title>
<style>
  body{font-family:-apple-system,system-ui,"Segoe UI",Roboto,sans-serif;max-width:680px;margin:0 auto;
    padding:32px 20px 60px;line-height:1.6;color:#1a1a1a;background:#fafaf7;}
  h1{font-size:24px;margin-bottom:4px;}
  .updated{color:#666;font-size:13px;margin-bottom:28px;}
  h2{font-size:17px;margin-top:32px;color:#1E6B4E;}
  p,li{font-size:14.5px;color:#2a2a2a;}
  ul{padding-left:20px;}
  a{color:#1E6B4E;}
</style>
</head>
<body>
<h1>Política de Privacidade — BusBus</h1>
<div class="updated">Última atualização: 4 de novembro de 2026</div>

<p>O BusBus é um app gratuito e independente de rastreamento de ônibus de Belém (PA), feito por uma
única pessoa (rilclesaraiva) como projeto pessoal. Esta página descreve, de forma direta, tudo o que o
app envia pela rede e o que fica guardado no seu aparelho. O código do app e do proxy é aberto:
<a href="https://github.com/rilclesaraiva/BusBus">github.com/rilclesaraiva/BusBus</a>.</p>

<h2>Localização</h2>
<p>O BusBus pede permissão de localização só pra mostrar no mapa as paradas e ônibus mais próximos de
você e calcular distâncias. Pra isso, <strong>a sua posição é enviada</strong> ao proxy do BusBus e ao
serviço de previsão do tempo (detalhes abaixo). O código do proxy (público, em worker.js) só repassa a
consulta e devolve a resposta, e não grava a posição. Se você negar ou desativar a permissão, o app
continua funcionando, só não consegue mostrar automaticamente o que está perto.</p>

<h2>Pra quem vai o quê</h2>
<ul>
  <li><strong>Proxy do BusBus (Cloudflare Workers):</strong> recebe a sua posição (latitude e longitude)
  ao buscar paradas próximas, além dos códigos das linhas e paradas que você abre, e repassa essas consultas
  ao serviço de dados de transporte público de Belém. A Cloudflare pode manter uma cópia da resposta por até
  5 segundos e, como hospedagem, processa o endereço IP das conexões segundo a política dela.</li>
  <li><strong>Open-Meteo (previsão do tempo):</strong> recebe a latitude e a longitude da sua posição atual
  (ou da última conhecida) pra devolver a previsão local, além do seu IP, como qualquer site.</li>
  <li><strong>ipapi.co:</strong> só quando o GPS falha ou é negado e não há posição salva: recebe o seu IP pra
  estimar um local aproximado.</li>
  <li><strong>OpenStreetMap, Photon (Komoot) e Nominatim:</strong> o mapa é desenhado com imagens baixadas do
  servidor de mapas do OpenStreetMap, que vê o seu IP e a região do mapa que você está olhando. Na busca de
  endereços do planejador de rota, o texto que você digita (junto com um ponto fixo no centro de Belém, não a
  sua posição) vai pro Photon e pro Nominatim. O Nominatim também recebe pontos do traçado de algumas linhas
  (não a sua posição) pra descobrir nomes de ruas.</li>
  <li><strong>Google (ícones):</strong> ao abrir "Licenças &amp; Atribuições", os pequenos logos de alguns
  serviços vêm do serviço de ícones de sites do Google, que recebe o seu IP e os endereços dos sites mostrados.</li>
  <li><strong>GitHub (só no app Android):</strong> ao abrir o app e quando você toca em "Verificar
  atualizações", o app consulta a API pública do GitHub pra saber se existe uma versão nova. O GitHub vê o
  seu IP.</li>
</ul>
<p>Cada um desses serviços trata os dados que recebe conforme a política dele. O BusBus não envia nome,
e-mail nem qualquer identificador pessoal a nenhum deles.</p>

<h2>O que fica salvo no seu aparelho</h2>
<p>Paradas favoritas, histórico de busca, tema e outras preferências (raio de busca, mapa, aviso de
atualização), a última posição conhecida e quais avisos você já viu ficam salvos apenas no seu aparelho,
no armazenamento do próprio navegador ou app. Pra apagar tudo, limpe os dados do app ou desinstale.</p>

<h2>O que o BusBus não faz</h2>
<ul>
  <li>Não tem cadastro, login ou conta de usuário.</li>
  <li>Não mostra anúncios.</li>
  <li>Não usa ferramentas de análise, rastreamento ou publicidade de terceiros.</li>
  <li>Não vende nem cede os seus dados a terceiros pra outros fins (publicidade, análise ou revenda).</li>
  <li>Não cobra nada pra usar qualquer parte do app.</li>
</ul>

<h2>Retenção e seus direitos</h2>
<p>O BusBus não guarda dados pessoais seus em servidor próprio, então não há o que apagar do lado dele.
Os serviços de terceiros acima seguem as próprias políticas de retenção. Mesmo assim, se quiser perguntar
algo ou exercer qualquer direito previsto na Lei Geral de Proteção de Dados (Lei nº 13.709/2018), escreva
pro contato abaixo.</p>

<h2>Crianças</h2>
<p>O BusBus não é direcionado a crianças e não coleta intencionalmente dados de menores de idade.</p>

<h2>Mudanças nesta política</h2>
<p>Se algo aqui mudar, esta mesma página será atualizada e a data acima também.</p>

<h2>Contato</h2>
<p>Dúvidas, sugestões ou problemas: <a href="mailto:saraivarilcle@gmail.com">saraivarilcle@gmail.com</a>
ou uma <a href="https://github.com/rilclesaraiva/BusBus/issues">issue no GitHub</a>.</p>
</body>
</html>`;

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export default {
  async fetch(request, env) {
    const cors = corsHeaders();

    // Preflight do navegador
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== "GET") {
      return new Response(JSON.stringify({ error: "method_not_allowed" }), {
        status: 405,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const url = new URL(request.url);

    // Caminho de teste rápido: abrir a URL do Worker direto no navegador
    // sem nenhum path extra mostra essa mensagem, em vez de tentar proxiar.
    if (url.pathname === "/" || url.pathname === "") {
      return new Response(
        JSON.stringify({ status: "ok", service: "busbus-api-proxy" }),
        { status: 200, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }

    // Política de privacidade — página pública estática (a Play Store
    // exigiria uma URL assim). Não precisa de CORS (não é chamada pelo app, é aberta
    // direto no navegador por qualquer pessoa, inclusive pelo revisor da
    // Play Console) nem do Secret UPSTREAM, então fica antes dessa checagem.
    if (url.pathname === "/privacy" || url.pathname === "/privacy-policy") {
      return new Response(PRIVACY_POLICY_HTML, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    if (!env.UPSTREAM) {
      // O Secret UPSTREAM ainda não foi cadastrado no painel do Cloudflare.
      return new Response(
        JSON.stringify({ error: "upstream_not_configured" }),
        { status: 500, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }

    const upstreamUrl = env.UPSTREAM + url.pathname + url.search;

    try {
      const upstreamRes = await fetch(upstreamUrl, {
        headers: { "Accept": "application/json" },
        // Cache bem curto na borda da Cloudflare: alivia carga na API de
        // origem sem deixar os dados "velhos" pro usuário (ônibus se move
        // rápido, então o cache não pode durar muito).
        cf: { cacheTtl: 5, cacheEverything: true },
      });

      const body = await upstreamRes.text();
      return new Response(body, {
        status: upstreamRes.status,
        headers: {
          ...cors,
          "Content-Type": upstreamRes.headers.get("Content-Type") || "application/json",
        },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: "upstream_unreachable" }), {
        status: 502,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }
  },
};
