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

// As páginas legais (política de privacidade e termos de uso) ficam em docs/
// e são publicadas no GitHub Pages. O Worker só redireciona, pra manter vivos
// os links de versões antigas do app.
const PRIVACY_URL = "https://rilclesaraiva.github.io/BusBus/privacy";
const TERMS_URL = "https://rilclesaraiva.github.io/BusBus/terms";
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

    // Páginas legais: redireciona pro GitHub Pages. Não precisa de CORS nem do
    // Secret UPSTREAM, então fica antes dessa checagem.
    if (url.pathname === "/privacy" || url.pathname === "/privacy-policy") {
      return Response.redirect(PRIVACY_URL, 301);
    }
    if (url.pathname === "/terms") {
      return Response.redirect(TERMS_URL, 301);
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
