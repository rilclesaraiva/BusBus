# Arquitetura do BusBus

Arquitetura e decisões do projeto. O `CLAUDE.md` guarda só as regras e o contexto; os detalhes ficam aqui.

## Visão geral

O build (`vite build`, com `vite-plugin-singlefile`) gera um único `dist/index.html` autocontido. Esse arquivo é o site (deploy automático no Vercel a cada push na `main`) e também o que o Capacitor empacota no APK Android.

`worker.js` / `wrangler.toml` são o proxy em Cloudflare Workers que esconde a API real de dados de transporte e redireciona `/privacy` e `/terms` pras páginas legais. O deploy do Worker é manual, feito pelo mantenedor.

Linhas fora do acervo de `itinerarios.js` caem no modo antigo (geocodificação reversa ao vivo) em `trip-planner.js`.

## Código

Projeto existente: os módulos são planos, em `src/modules/`, com a entrada em `src/app.js`. A pasta não segue o desenho `core`/`data`/`features` do documento de estrutura, de propósito: reestruturar só com pedido do mantenedor.

| Módulo | Papel |
|---|---|
| `app.js` (entrada) | Monta o app, expõe as funções chamadas pelo HTML e dispara a checagem de atualização |
| `state.js` | Estado compartilhado e preferências |
| `api.js` | Chamadas ao Worker e caches de linhas e paradas |
| `utils.js` | Funções utilitárias |
| `icons.js` | Ícones SVG da interface |
| `nav.js` | Pilha de navegação e troca de telas |
| `map.js` | Mapa Leaflet: marcadores, seguimento do usuário e do ônibus |
| `gps.js` | Localização do aparelho |
| `stops.js` | Paradas, linhas, previsões e favoritas |
| `search.js` | Busca e histórico |
| `trip-planner.js` | Planejador de rota |
| `itinerarios.js` | Dados oficiais de itinerário por linha |
| `settings.js` | Ajustes, tela Sobre, modais e licenças |
| `updates.js` | Aviso de atualização do app Android (painel, Release, ETag) |
| `messages.js` | Mensagens do sistema e o ponto de aviso no sino |
| `native.js` | Integrações com o Capacitor (barra de status, botão voltar, retorno ao app) |

## Release e build

O CI (`.github/workflows/ci.yml`) testa, builda e assina o APK em todo push na `main`. O job `release` publica quando a versão do `package.json` é nova e já tem seção no CHANGELOG. As regras estão no `CLAUDE.md`.
