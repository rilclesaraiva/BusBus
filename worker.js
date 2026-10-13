// BusBus API Proxy — Cloudflare Worker
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
// Também restringe quem pode chamar este Worker via navegador/WebView: só
// origens explicitamente autorizadas na lista ALLOWED_ORIGINS recebem os
// cabeçalhos de CORS liberando a resposta.
//
// IMPORTANTE sobre essa restrição: CORS é uma regra que o NAVEGADOR aplica
// (inclusive dentro da WebView do app, que é baseada em Chromium) — ela
// impede que *sites de terceiros* chamem este Worker a partir do navegador
// de alguém. Ela não impede alguém de chamar este Worker diretamente por
// fora de um navegador (curl, um script, Postman etc.), porque nesses casos
// não existe navegador aplicando a regra. Isso não tem solução 100%
// enquanto o endereço do Worker estiver acessível publicamente (é assim
// pra qualquer API usada por um app distribuído) — mas já tira a URL real
// de circulação tanto do APK quanto do código-fonte público, que era o
// problema que resolvemos aqui.

// Origem observada nos logs de erro do APK (AppMint serve o HTML local via
// WebViewAssetLoader do Android, então o app "roda" sob esse domínio
// virtual). Se no futuro aparecer um erro de CORS bloqueado no app, me
// manda a origem exata que apareceu no erro que eu adiciono aqui.
const ALLOWED_ORIGINS = new Set([
  "https://appassets.androidplatform.net",
  // Descomente pra testar localmente no navegador normal, se precisar:
  // "http://localhost:5500",
  // "http://127.0.0.1:5500",
]);

function corsHeaders(origin) {
  const allow = origin && ALLOWED_ORIGINS.has(origin) ? origin : "";
  const headers = {
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
  if (allow) headers["Access-Control-Allow-Origin"] = allow;
  return headers;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(origin);

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
