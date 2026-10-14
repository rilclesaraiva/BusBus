# Changelog

Todas as mudanças notáveis do BusBus (B.E.M.) ficam registradas aqui, por versão — tanto pra quem acompanha o projeto quanto pra mim (Claude) continuar de onde parei em sessões futuras, já que não guardo memória entre conversas.

Formato livremente inspirado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/). Versionamento: [SemVer](https://semver.org/lang/pt-BR/) — `MAJOR.MINOR.PATCH`, onde incompatibilidades/mudanças grandes de comportamento sobem o `MAJOR`, funcionalidades novas sem quebrar nada sobem o `MINOR`, e correções sobem o `PATCH`.

## [1.1.2] — 2026-10-14

### 🐛 Correções
- **Carregamento "fantasma" ao voltar rápido demais**: a correção da v1.1.1 resolveu o histórico de navegação, mas expôs um problema relacionado: se a pessoa saísse de uma tela (voltar, ou abrir outra parada/linha) antes da API responder, o resultado atrasado ainda era desenhado — só que agora em cima de QUALQUER tela aberta na hora, inclusive a Home, misturando o conteúdo de "linhas"/"GPS da linha" com a tela errada por baixo. Corrigido com um sistema de token: cada chamada a `selectStop`, `selectLine`, `searchSelectLine` e `openLegLive` marca a navegação como "atual"; se outra navegação acontecer antes da resposta chegar, o resultado atrasado é silenciosamente descartado em vez de ser renderizado.

## [1.1.1] — 2026-10-14

### 🐛 Correções
- **App fechando ao voltar durante carregamento**: em quatro telas (linhas de uma parada, GPS de uma linha a partir da lista, a partir da busca, e a partir do planejador de rota), a troca de tela acontecia visualmente antes da entrada correspondente ser registrada no histórico de navegação. Resultado: se a pessoa apertasse voltar (gesto/botão do Android, ou o botão de voltar do próprio app) enquanto a tela ainda estava carregando ("Buscando linhas...", "Buscando veículos..."), o app fechava inteiro em vez de voltar pra tela anterior — e o botão de voltar do app ficava travado e parava de funcionar daquele ponto em diante, mesmo depois do carregamento terminar. Corrigido registrando a navegação (`pushNav`) assim que a tela muda, antes do carregamento assíncrono começar, não depois.

## [1.1.0] — 2026-10-14

### ✨ Novidades
- **Itinerário oficial das linhas**: mais de 160 linhas já têm o trajeto oficial da Prefeitura de Belém / SEGBEL cadastrado (`src/modules/itinerarios.js`), extraído de um PDF fornecido pelo rilclesaraiva + do site da SEGBEL pras linhas do BRT. O botão "Ver ruas desta linha" mostra essas ruas na hora, sem precisar estimar o caminho por geocodificação ponto a ponto. Linhas fora desse acervo continuam no modo antigo (mais lento, por geocodificação reversa), com aviso na tela.
- **Tela de carregamento do mapa**: a tela inicial agora mostra um indicador de carregamento enquanto o mapa ainda está sendo baixado, em vez de aparecer vazia.
- **Posição de rolagem lembrada**: as telas de Home e Linhas voltam pra onde você estava rolando, em vez de voltar pro topo sempre.
- **Versão web**: o app passou a ser publicado também como site (Vercel), pra poder ser testado e instalado (via "Adicionar à Tela de Início") em qualquer navegador, iPhone incluído.

### 🐛 Correções
- **Botão "Ver ruas desta linha"**: corrigido um erro silencioso (`state` não exposto em `window`) que fazia o botão não reagir ao toque em alguns casos.
- **Navegação ao voltar**: corrigido um caso em que apertar voltar duas vezes rápido pulava direto pra tela inicial, ignorando telas intermediárias.
- **Busca de endereço no planejador de rotas**: quando o serviço principal de busca (Photon) falha, o app agora tenta um serviço alternativo (Nominatim) automaticamente, então encontrar um endereço completo voltou a funcionar de forma mais confiável.
- **Aviso de sem conexão**: se a internet cair, as telas que buscam dados (paradas próximas, busca de endereço) agora mostram "Você está sem conexão!" em vez de uma mensagem de erro técnica crua.

### 🎨 Ajustes visuais
- **Ícone novo**: o ícone do app foi trocado para o logo oficial do BusBus — o ônibus vermelho com a estrela azul (antes era um placeholder de ônibus verde).
- **Carregamento padronizado**: a caixa de carregamento do mapa e os cards "fantasma" (skeleton) agora são iguais em todas as telas que abrem uma linha (Pesquisar, Paradas, Rota).
- **Toque na aba ativa**: tocar numa aba que já está selecionada agora rola rapidamente pro topo da tela.
- **Dica na busca de endereço**: adicionado um aviso explicando que, por enquanto, a busca por aproximação funciona melhor com o nome completo do lugar (nas linhas sem itinerário oficial).

## [1.0.35] e anteriores

Histórico anterior à reconstrução modular (B.E.M.) não documentado neste changelog — ver as [releases do GitHub](https://github.com/rilclesaraiva/BusBus/releases) pra notas publicadas junto com os APKs dessa fase.

## [1.0.0] — base da reconstrução modular (B.E.M.)

Primeira versão do código-fonte reorganizado em módulos (`src/`) com Vite + `vite-plugin-singlefile`, mantendo a saída como um único arquivo HTML (pro AppMint e pro PWA).
