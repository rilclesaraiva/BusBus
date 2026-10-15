# Instruções para o Claude neste repositório

Este arquivo é lido automaticamente no início de cada sessão — é como eu (Claude) recupero contexto do projeto depois de perder a memória de conversas anteriores. Leia também o `CHANGELOG.md` pra saber o que já foi feito.

## Regra fixa: manter o CHANGELOG.md atualizado

**Toda vez que eu fizer uma mudança de código que vá virar uma versão nova** (correção, funcionalidade nova, ajuste visual — não só commits triviais), devo:
1. Adicionar/atualizar a entrada correspondente no `CHANGELOG.md`, seguindo o formato já estabelecido lá (seções `✨ Novidades`, `🐛 Correções`, `🎨 Ajustes visuais`).
2. Fazer isso **no mesmo momento em que decido o bump de versão** em `package.json`, não depois.
3. Nunca esperar o rilclesaraiva pedir a release note na hora de publicar — ela já deve estar pronta no changelog.

Isso existe porque sessões de conversa têm memória limitada: o changelog é a fonte de verdade que sobrevive a isso.

## Versionamento

- Fonte única da versão: campo `"version"` do `package.json`, injetado no build (`vite.config.js` → `%APP_VERSION%` no HTML final e `import.meta.env.APP_VERSION`).
- SemVer: `MAJOR.MINOR.PATCH`. Bugfix only → PATCH. Funcionalidade nova sem quebrar nada → MINOR. Mudança incompatível → MAJOR.

## Estrutura do projeto

- `src/` — código-fonte modular (Vite). `src/modules/itinerarios.js` tem os dados oficiais de itinerário por linha (Prefeitura de Belém / SEGBEL), extraídos de um PDF fornecido pelo rilclesaraiva + do site da SEGBEL pras linhas do BRT. Linhas fora desse acervo caem no modo antigo (geocodificação reversa ao vivo) em `trip-planner.js`.
- Build (`vite build`, com `vite-plugin-singlefile`) gera um único `dist/index.html` autocontido — usado tanto como PWA (deploy automático no Vercel a cada push em `main`) quanto renomeado pra `busbus.html` e convertido em APK via AppMint pelo próprio rilclesaraiva (etapa manual, fora desta sessão).
- `worker.js` / `wrangler.toml` — proxy em Cloudflare Workers que esconde a API real de dados de transporte.
- Releases do GitHub (`gh api repos/rilclesaraiva/BusBus/releases`) guardam os APKs publicados. **Importante**: esta sessão consegue *ler* releases via API, mas não consegue criar, editar nem deletar releases (403 bloqueado pelo tipo de sessão) — por isso a release note precisa estar pronta (no CHANGELOG) antes do rilclesaraiva publicar, porque não dá pra editar depois.
- Deletar branches remotas também é bloqueado (403) — precisa ser feito manualmente pelo rilclesaraiva na interface do GitHub.

## Regra fixa: entregar a build com a versão no nome do arquivo

**Toda vez que eu entregar o `dist/index.html` buildado pro rilclesaraiva** (via SendUserFile ou qualquer outro jeito), o arquivo tem que se chamar `busbus_v{versão}.html` — ex.: `busbus_v1.3.1.html` — nunca `index.html` solto. A versão vem do `"version"` do `package.json` (a mesma fonte única de sempre). Na prática: depois de `vite build`, copio/renomeio `dist/index.html` pra um arquivo com esse nome antes de entregar.

## Deploy

- Site: `https://bus-bus-qdmb.vercel.app` (projeto Vercel `bus-bus-qdmb`, time `saraivainspaces-projects`), com deploy automático a cada push em `main`.
