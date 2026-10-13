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
<div class="updated">Última atualização: 12 de outubro de 2026</div>

<p>O BusBus é um app gratuito e independente de rastreamento de ônibus de Belém (PA), feito por uma
única pessoa como projeto pessoal. Esta página explica, de forma direta, o que o app faz e não faz
com os seus dados.</p>

<h2>Localização</h2>
<p>O BusBus pede permissão de localização só pra mostrar no mapa as paradas e ônibus mais próximos de
você, e calcular distâncias. Sua localização é usada apenas no seu próprio aparelho, em tempo real,
pra desenhar o mapa. Ela <strong>não é enviada, guardada ou compartilhada</strong> em nenhum servidor
nosso. Se você negar ou desativar a permissão, o app continua funcionando, só não consegue te mostrar
automaticamente o que está perto.</p>

<h2>O que fica salvo no seu aparelho</h2>
<p>Paradas favoritas, tema escolhido, histórico de busca e quais avisos você já viu ficam salvos
apenas localmente no seu celular (armazenamento do próprio navegador/app). Nada disso é enviado pra
nenhum servidor nosso nem sai do seu aparelho.</p>

<h2>Serviços de terceiros que o app usa</h2>
<ul>
  <li><strong>Proxy próprio do BusBus (Cloudflare Workers):</strong> repassa as coordenadas que você
  está vendo no mapa pra buscar paradas, linhas e ônibus em tempo real de um serviço de dados de
  transporte público de Belém. Não envia nome, email ou qualquer identificador pessoal — só as
  coordenadas necessárias pra fazer a busca.</li>
  <li><strong>Open-Meteo:</strong> serviço público e gratuito de previsão do tempo. Recebe apenas as
  coordenadas necessárias pra buscar a previsão local.</li>
  <li><strong>ipapi.co:</strong> usado só como última alternativa, quando o GPS falha ou é negado,
  pra estimar sua localização aproximada a partir do seu endereço IP.</li>
  <li><strong>Buy Me a Coffee:</strong> link externo e opcional pra quem quiser apoiar o projeto
  voluntariamente. Ao clicar, você sai do app e passa a estar sujeito à política de privacidade
  desse site, não a esta.</li>
</ul>

<h2>O que o BusBus não faz</h2>
<ul>
  <li>Não tem cadastro, login ou conta de usuário.</li>
  <li>Não mostra anúncios.</li>
  <li>Não usa ferramentas de análise, rastreamento ou publicidade de terceiros.</li>
  <li>Não vende, aluga ou compartilha dados pessoais com ninguém.</li>
  <li>Não cobra nada pra usar qualquer parte do app.</li>
</ul>

<h2>Crianças</h2>
<p>O BusBus não é direcionado a crianças e não coleta intencionalmente dados de menores de idade.</p>

<h2>Mudanças nesta política</h2>
<p>Se algo aqui mudar, esta mesma página será atualizada, e qualquer mudança relevante será avisada
dentro do próprio app antes de entrar em vigor.</p>

<h2>Contato</h2>
<p>Dúvidas, sugestões ou problemas: <a href="https://buymeacoffee.com/saraivarilcle" target="_blank" rel="noopener">buymeacoffee.com/saraivarilcle</a></p>
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

    // Política de privacidade — página pública estática, exigida pela
    // Play Store. Não precisa de CORS (não é chamada pelo app, é aberta
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
