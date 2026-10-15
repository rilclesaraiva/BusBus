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
- Build (`vite build`, com `vite-plugin-singlefile`) gera um único `dist/index.html` autocontido — é o que é publicado como PWA (deploy automático no Vercel a cada push em `main`) e também o que o Capacitor empacota no APK (ver abaixo).
- `worker.js` / `wrangler.toml` — proxy em Cloudflare Workers que esconde a API real de dados de transporte.
- Deletar branches remotas é bloqueado (403) pra esta sessão — precisa ser feito manualmente pelo rilclesaraiva na interface do GitHub.

## Build do APK (Android/Capacitor) — desde a v1.3.2

O APK deixou de ser gerado manualmente no AppMint: desde a v1.3.2 o projeto usa [Capacitor](https://capacitorjs.com) (`android/`, pasta de projeto Gradle nativo de verdade, versionada no repo) + uma Action do GitHub (`.github/workflows/android.yml`) que builda e assina o APK sozinha a cada push na `main` — espelhando o que o Vercel já fazia pro site.

- **applicationId**: `com.busbus.app` — igual ao APK que o AppMint já vinha publicando, de propósito, pra não quebrar a identidade do app.
- **Assinatura**: reaproveita a MESMA chave que o AppMint usava (exportada pelo rilclesaraiva via "Signing Key → Save my signing key" no painel do AppMint, confirmada byte a byte contra o certificado do APK publicado — fingerprint SHA-256 `5E:18:2D:AE:6F:F3:A9:EF:B2:99:87:29:A6:78:C0:CB:FE:C9:FA:6F:9B:89:5E:25:8C:DC:06:B9:E7:B7:83:75`, alias `release_key`). Isso é o que garante que quem já tem o BusBus instalado continua recebendo atualização normal, em vez de precisar reinstalar.
- **A chave NUNCA é commitada**. Ela vive só como 4 Secrets do repositório no GitHub (`ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD`), cadastrados manualmente pelo rilclesaraiva — **a API de Secrets do GitHub Actions também é bloqueada (403) pra esta sessão**, igual a de Releases, então eu nunca vou conseguir cadastrar/trocar isso sozinho, só pedir pro rilclesaraiva fazer pelo painel (Settings → Secrets and variables → Actions).
  - **Detalhe importante sobre o arquivo `.p12`**: o arquivo exportado direto do painel do AppMint usa criptografia legada (algo como RC2-40-CBC) que o JDK moderno (21, o que a Action usa) não consegue abrir — dava `KeytoolException: Tag number over 30 is not supported` bem no fim do build, na hora de assinar o APK (`:app:packageRelease`). A correção não foi trocar a chave: foi reexportar a MESMA chave/certificado (`openssl pkcs12 -legacy` pra ler o arquivo antigo, depois `openssl pkcs12 -export` sem `-legacy` pra regravar em PKCS12 moderno — AES-256-CBC/PBKDF2) — confirmado que o fingerprint SHA-256 do certificado não muda. Então o valor correto pro Secret `ANDROID_KEYSTORE_BASE64` é o base64 desse `.p12` reexportado, não o do export original do AppMint. Alias e senha continuam os mesmos (`release_key` / a senha que o rilclesaraiva definiu no export).
- **versionCode/versionName** do `android/app/build.gradle` são lidos automaticamente do `"version"` do `package.json` (mesma fonte única de sempre) — nunca editar isso direto no `build.gradle`. Esquema do versionCode: `MAJOR*10000 + MINOR*100 + PATCH` (mesmo esquema que o AppMint já usava).
- A Action também **cria/atualiza a Release do GitHub sozinha**, com o APK anexado e a nota tirada automaticamente da seção correspondente do `CHANGELOG.md` — isso funciona porque a Action usa o `GITHUB_TOKEN` gerado automaticamente pelo próprio GitHub a cada execução (com permissão `contents: write` concedida no workflow), que é diferente e não tem a mesma restrição do acesso desta sessão.
- **Não dá pra compilar o APK de verdade dentro desta sessão**: o SDK do Android só é baixado dos servidores do Google (`dl.google.com`, `maven.google.com`), que estão fora da lista de permissão de rede deste ambiente — só dá pra validar aqui o `npm run build`, `npx cap sync android` e a lógica do Gradle até onde ela não precisa baixar nada. A prova de fogo real só acontece na Action, no GitHub. **Logs completos de uma execução da Action também não dão pra ler direto desta sessão** (ficam em blob storage da Azure, fora da lista de permissão de rede) — `gh run view --log` e `gh api .../logs` falham com 403. Quando preciso investigar uma falha, o jeito que funcionou foi adicionar um passo temporário no workflow que captura a saída (`2>&1 > arquivo`) e posta como comentário no commit via `gh api repos/.../commits/$SHA/comments` (API normal do GitHub, essa sim acessível) — e remover esse passo de debug depois de achar a causa.
- Pontos que já pegaram a primeira execução real da Action (histórico, pra não repetir): Node precisa ser **22+** (Capacitor CLI 8 exige `NodeJS >=22.0.0`); o `capacitor.config` precisa ser `.json`, não `.ts` (exigiria TypeScript instalado, que não existe por padrão no runner); a action `android-actions/setup-android@v3` é **desnecessária e quebrava o build** — o runner `ubuntu-latest` já vem com o SDK todo instalado (confirmado via `sdkmanager --list_installed`: tinha até `android-36`/`build-tools;36.0.0`, o que o projeto pede); o Java tem que ser **JDK 21** (17 não compila o módulo `capacitor-android` do Capacitor 8: "invalid source release: 21").
- O build local antigo (`busbus.html` manual pro AppMint) continua funcionando como fallback caso essa esteira pare de funcionar por algum motivo — nada foi removido do fluxo antigo, só passou a não ser mais o caminho principal.

## Regra fixa: entregar a build com a versão no nome do arquivo

**Toda vez que eu entregar o `dist/index.html` buildado pro rilclesaraiva** (via SendUserFile ou qualquer outro jeito), o arquivo tem que se chamar `busbus_v{versão}.html` — ex.: `busbus_v1.3.1.html` — nunca `index.html` solto. A versão vem do `"version"` do `package.json` (a mesma fonte única de sempre). Na prática: depois de `vite build`, copio/renomeio `dist/index.html` pra um arquivo com esse nome antes de entregar.

## Deploy

- Site: `https://bus-bus-qdmb.vercel.app` (projeto Vercel `bus-bus-qdmb`, time `saraivainspaces-projects`), com deploy automático a cada push em `main`.
