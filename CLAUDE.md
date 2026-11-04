# CLAUDE.md

Este arquivo é lido no início de cada sessão: é como a IA recupera o contexto do projeto depois de perder a memória das conversas anteriores. Leia também o `CHANGELOG.md` pra saber o que já foi feito. As regras seguem o documento "Estrutura Universal para Vibe Coding" adotado pelo mantenedor em 2026-11-04; onde uma regra antiga contradizia o documento, o documento venceu e a antiga foi apagada.

## Projeto
BusBus — rastreamento de ônibus em tempo real para Belém (PA), publicado como PWA (site) e como APK Android. Público: regional, Brasil.

## Mantenedor
- Nome: rilclesaraiva (usuário do GitHub) · Contato: saraivarilcle@gmail.com
- Apoio: https://buymeacoffee.com/saraivarilcle · Licença: GPL-3.0
- Segredos ficam em: a definir pelo mantenedor (sugestão: pasta privada na nuvem ou gerenciador de senhas)

## Stack
- Stack: Vite + JavaScript (módulos ES) + Leaflet; no Android, empacotado com Capacitor (`android/`).
- Build: `npm run build` · Testes: `npm test`
- Mapa: projeto existente, mantém os nomes que já tem — código em `src/modules/` (módulos planos: mapa, GPS, busca, paradas, planejador, ajustes…), entrada em `src/app.js`, dados oficiais de itinerário em `src/modules/itinerarios.js`. Sem reestruturar pastas sem pedido do mantenedor.
- Versão: campo `"version"` do `package.json` (fonte única; injetado no build por `vite.config.js` e lido no CI por `VERSION_CMD`)
- Release: automático pelo CI quando a versão é nova e tem seção no CHANGELOG (ver Release) → `busbus_v{versão}.apk` na Release do GitHub
- Pacote Android: `com.busbus.app`, fixo · R8 ainda desligado (`minifyEnabled false`); o documento manda ligar, sem ofuscação (`-dontobfuscate`) — pendente, em rodada própria com vistoria no aparelho
- Ícone: `public/icon-*.png` e `android/app/src/main/res/mipmap-*`; só muda se o mantenedor pedir

## Arquitetura
O build (`vite build`, com `vite-plugin-singlefile`) gera um único `dist/index.html` autocontido. Esse arquivo é o site (deploy automático no Vercel a cada push na `main`) e também o que o Capacitor empacota no APK. `worker.js` / `wrangler.toml` são o proxy em Cloudflare Workers que esconde a API real de dados de transporte e serve a política de privacidade (`/privacy`); o deploy do Worker é manual, feito pelo mantenedor. Linhas fora do acervo de `itinerarios.js` caem no modo antigo (geocodificação reversa ao vivo) em `trip-planner.js`.

## Regras de estrutura
- Seguir as convenções do projeto existente. Nenhuma dependência nova sem justificar.
- Deletar branches remotas é bloqueado (403) pra esta sessão; se sobrar alguma, o mantenedor apaga pela interface do GitHub.

## Fluxo de trabalho
- Uma tarefa por vez, mudanças pequenas. Não refatorar fora do escopo.
- Tudo direto na `main`: sem branches e sem PR. Cada push gera o build para vistoria (artefato `busbus_v{versão}.apk` da execução, aba Actions) e o deploy do site no Vercel.
- **Agrupar bugs (regra do BusBus, mantida):** quando o mantenedor reporta bugs um a um numa sessão de testes, corrigir no código e só commitar/dar push quando ele sinalizar que terminou a leva ("agora sim", "pode mandar", parou de reportar, pediu a build). Na dúvida, perguntar antes. Bug isolado fora de uma sessão de testes pode seguir direto: corrigir, commitar, avisar.
- Rodar `npm test` e `npm run build` antes do push. O APK não compila nesta sessão (o SDK do Android vem de `dl.google.com`/`maven.google.com`, fora da rede liberada): o CI é a única prova do Android, e a IA diz isso em vez de afirmar que testou.
- Só dizer que terminou quando o CI daquele commit passar no GitHub. CI vermelho é corrigido antes de qualquer tarefa nova.
- Registrar toda mudança em `[Unreleased]` no CHANGELOG. Sem bump de versão fora de release.
- Preferir remover a acumular: o que não é usado sai.
- Na dúvida, perguntar. Nunca inventar API.
- Bloqueio de segurança do ambiente (proxy, permissão, leitura de credencial) nunca é contornado: o passo vai para o CI ou para o mantenedor.
- Entrega de arquivo buildado: `dist/index.html` vai pro mantenedor como `busbus_v{versão}.html`, nunca como `index.html` solto.

## Release (regra absoluta)
- Só com confirmação explícita do mantenedor citando a versão ("confirmo release v1.8.0"), na conversa. "Ok", "beleza" ou silêncio não contam.
- Sem confirmação: nada de bump de versão nem de mover `[Unreleased]`.
- A IA nunca cria tag nem Release: o commit `chore(release): vX.Y.Z` na `main` basta, e o CI (`.github/workflows/ci.yml`, job `release`) cria a tag e publica quando vê versão nova com seção no CHANGELOG. Não existe mais disparo manual do workflow.
- Toda atualização vai para os artefatos do Actions (build para vistoria) e a IA avisa com o link. O mantenedor vistoria e só então pede o release público.
- Entre a vistoria e o commit de release, só mudam versão e CHANGELOG; mudou código, nova vistoria.
- Passo a passo depois do "confirmo release vX.Y.Z":
  0. Revisão com contexto limpo: um subagente (ou sessão nova) lê só este arquivo e o diff desde o último release e procura falhas de segurança, quebra de regras e itens do CHANGELOG que não estão no código; os achados vão pro mantenedor, que decide entre lançar assim ou corrigir antes (o que exige nova vistoria).
  1. Mover `[Unreleased]` para `## [X.Y.Z] — AAAA-MM-DD` e deixar um `[Unreleased]` vazio.
  2. Subir `"version"` no `package.json` (SemVer: bugfix = PATCH, novidade compatível = MINOR, quebra = MAJOR). `versionName`/`versionCode` do Android vêm dele sozinhos (`MAJOR*10000 + MINOR*100 + PATCH`); nunca editar no `build.gradle`.
  3. Commit `chore(release): vX.Y.Z` e push na `main`.
  4. O CI cria a tag, anexa o mesmo APK que acabou de buildar e usa a seção do CHANGELOG como nota.

## Segredos
- Nunca commitar chaves, keystores, senhas ou `.env`.
- A chave de assinatura já existe (a mesma que o AppMint usava) e **nunca deve ser trocada**: trocar a chave impede que quem já tem o app instalado receba atualização. Se um dia for preciso gerar outra, parar e perguntar.
- Secrets de assinatura: a IA nunca lê nem exibe o conteúdo. Cadastrar secrets no GitHub é sempre tarefa manual do mantenedor (a API de Secrets também é bloqueada, 403, pra esta sessão).

## Idioma
- README e CHANGELOG em português.
- O README sempre tem a seção de transparência sobre IA. Nunca remover.

## Projeto público
- Política de privacidade: texto em `worker.js` (servida em `https://busbus.saraivarilcle.workers.dev/privacy`), resumo no app (`openPrivacyModal`, em `settings.js`) e no README. Páginas legais em `docs/` (GitHub Pages) e termos de uso ainda não existem; por ora a política fica no Worker, que já está linkado no README e no app.
- Coleta nova (SDK, permissão, chamada de rede, cookie) → atualizar a política (`worker.js`), o resumo no app e o README no mesmo commit. O texto do Worker só vai ao ar quando o mantenedor faz um novo deploy do Worker.
- Nenhuma afirmação sem respaldo: o que README, política e loja dizem precisa ser verdade no código. Antes de reescrever a política, fazer o inventário a partir do código (permissões, bibliotecas de terceiros, chamadas de rede, armazenamento local). Na dúvida, não afirmar.

## Apoio e contato
- O README termina com a seção de apoio e contato, usando os dados de *Mantenedor*.
- No app: nunca citar doação ou pagamento. Só "Quer apoiar o projeto? Entre no repositório do projeto." com link pro repositório (o modal do Pix e o Buy Me a Coffee saíram do app, inclusive do site, em `[Unreleased]`).

## Notas do build do Android (Capacitor)
- **applicationId**: `com.busbus.app` — o mesmo do APK que o AppMint já publicava, de propósito, pra não quebrar a identidade do app.
- **Assinatura**: a mesma chave do AppMint, confirmada contra o certificado do APK publicado (SHA-256 `5E:18:2D:AE:6F:F3:A9:EF:B2:99:87:29:A6:78:C0:CB:FE:C9:FA:6F:9B:89:5E:25:8C:DC:06:B9:E7:B7:83:75`, alias `release_key`). Vive só como 4 Secrets do repositório (`ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD`).
- **O `.p12` do Secret precisa ser o reexportado**, não o original do painel do AppMint: o original usa criptografia legada (RC2-40-CBC) que o JDK 21 não abre (`KeytoolException: Tag number over 30 is not supported`, no `:app:packageRelease`). A correção foi reexportar a MESMA chave com `openssl pkcs12 -legacy` (leitura) e `openssl pkcs12 -export` sem `-legacy` (gravação, AES-256-CBC/PBKDF2); o fingerprint do certificado não muda.
- **Logs completos de uma execução da Action não dá pra ler daqui** (ficam em blob storage da Azure, fora da rede liberada: `gh run view --log` falha com 403). Pra investigar uma falha, o que funcionou foi um passo temporário no workflow que captura a saída e posta como comentário no commit via `gh api repos/.../commits/$SHA/comments`, removido depois de achar a causa.
- **Armadilhas que já pegaram a Action (histórico, pra não repetir)**: Node precisa ser 22+ (Capacitor CLI 8); o `capacitor.config` tem que ser `.json`, não `.ts`; a action `android-actions/setup-android` é desnecessária e quebrava o build (o runner `ubuntu-latest` já traz o SDK com `android-36`/`build-tools;36.0.0`); o Java tem que ser JDK 21 (o 17 não compila o `capacitor-android` do Capacitor 8).
- O build antigo manual (`busbus.html` pro AppMint) continua como fallback, caso a esteira pare por algum motivo.

## Deploy
- Site: `https://bus-bus-qdmb.vercel.app` (projeto Vercel `bus-bus-qdmb`, time `saraivainspaces-projects`), deploy automático a cada push na `main`.
- Worker: deploy manual pelo mantenedor (painel da Cloudflare ou `wrangler`).

## Contexto atual
- Foco: alinhamento ao documento de estrutura (feito em `[Unreleased]`, sem versão nova; a próxima versão só com "confirmo release vX.Y.Z").
- Ida à Play Store: pausada por tempo indeterminado (talvez cancelada). Existe app criado no Play Console, sem ficha completa.
- Pendências do documento: R8 ligado sem ofuscação; termos de uso e páginas legais em `docs/` (só se o projeto for pra loja); AAB só se a Play for retomada; definir onde ficam os segredos.
- Problemas conhecidos: nenhum registrado.
