# Changelog

Todas as mudanças notáveis do BusBus (B.E.M.) ficam registradas aqui, por versão — tanto pra quem acompanha o projeto quanto pra mim (Claude) continuar de onde parei em sessões futuras, já que não guardo memória entre conversas.

Formato livremente inspirado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/). Versionamento: [SemVer](https://semver.org/lang/pt-BR/) — `MAJOR.MINOR.PATCH`, onde incompatibilidades/mudanças grandes de comportamento sobem o `MAJOR`, funcionalidades novas sem quebrar nada sobem o `MINOR`, e correções sobem o `PATCH`.

## [1.6.0] — 2026-10-16

### ✨ Novidades
- **Setinhas de sentido no traçado da linha**, inspiradas nas setas que a 99 desenha na rota da moto: ao longo do trajeto em destaque (não nos outros sentidos da linha, em cinza), pequenas setinhas marcam pra onde a linha segue. Diferente da seta que existia no ícone do ônibus (removida na v1.5.0), aqui o sentido não é um chute: os pontos do traçado já vêm na ordem certa (início ao fim) direto da API, então é só geometria — bem mais confiável.

### 🐛 Correções
- **Pontos do mapa descentralizados voltou a acontecer mesmo depois da correção da v1.4.0**: o disparo único de reconferência de tamanho do mapa, feito direto na hora do app voltar de segundo plano, podia ler o tamanho do WebView antes dele terminar de redimensionar de verdade de volta, "confirmando" um tamanho errado que não se autocorrigia depois. Agora a reconferência é repetida (logo no retorno, e de novo em 300ms e 800ms), cobrindo a demora variável do redimensionamento real.

## [1.5.0] — 2026-10-15

### ✨ Novidades
- **Ônibus desliza no mapa em vez de "piscar"**: antes, cada atualização (a cada 10s) apagava e redesenhava o marcador do ônibus direto na posição nova, dando a impressão de um salto seco de ponto em ponto. Agora o marcador desliza suavemente até a posição nova, com uma leve desaceleração no final.
- **Abas de Pesquisa e Rota com persistência total**: o temporizador que apagava a busca ou a rota traçada sozinha depois de 90s fora da aba foi removido — nenhuma das 4 abas (Pesquisa, Paradas, Rota, Ajustes) perde mais conteúdo por tempo, só por ação explícita (limpar, apagar um campo, traçar rota nova).

### 🐛 Correções
- **Seta de direção do ônibus removida**: calculada a partir do ponto mais próximo no traçado da linha, a seta errava perto de cruzamentos, retornos e trechos onde a linha passa duas vezes colada (ida e volta) — sem um jeito confiável de corrigir isso com uma leitura pontual. Melhor não mostrar do que mostrar errado; com o deslizamento suave do marcador (acima), dá pra perceber o sentido pelo próprio movimento.

## [1.4.0] — 2026-10-15

Quarta leva de correções do APK por Capacitor, a partir de mais testes reais no aparelho — e a volta de uma funcionalidade que não era viável até agora.

### ✨ Novidades
- **Confirmação ao sair do app está de volta**: removida na v1.3.1 por bugs decorrentes do AppMint (não dava pra interceptar o botão voltar de fato, só reagir ao histórico de navegação — e isso perdia a corrida contra um toque duplo rápido, fechando o app sem perguntar nada). Com o Capacitor, o evento nativo de voltar chega antes de qualquer navegação acontecer, sem essa corrida — então a confirmação volta, só no app: na tela inicial, voltar mostra "Sair do BusBus?" com Cancelar/Sair; voltar de novo sem escolher nada só fecha o aviso, nunca sai sozinho.

### 🐛 Correções
- **Pontos do mapa desalinhados da posição real** depois de o app voltar de repouso: o Leaflet guarda o tamanho do mapa em cache e só recalcula a posição dos marcadores quando alguém manda ele reconferir — como isso não acontecia ao voltar de segundo plano, os pontos (localização, paradas, ônibus) ficavam "grudados" na posição de antes de apagar a tela até um toque manual no mapa corrigir. Agora o mapa sempre reconfere o próprio tamanho ao voltar.
- **Painel pop-up (Licenças & Atribuições, Ruas da linha etc.) não fechava com o voltar do navegador na versão site/PWA**, só no app — o app consegue interceptar o botão voltar nativo antes dele navegar; o navegador não tem esse gancho prévio, então o voltar já tinha trocado de aba por baixo antes do nosso código conseguir reagir. Corrigido desfazendo essa navegação e só então fechando o painel, com o mesmo resultado do app.
- **Rolagem da aba de Ajustes não era lembrada** ao trocar de aba e voltar (e, com menos frequência, o mesmo também podia acontecer nas outras abas): o navegador tentava restaurar a posição sozinho, numa corrida imprevisível contra o nosso próprio código reconstruindo a tela — às vezes os dois batiam por acaso, na maioria das vezes a reconstrução vencia e a posição se perdia. Desligada a restauração automática do navegador, e as 4 abas (Pesquisa, Paradas, Rota, Ajustes) agora salvam e restauram a própria posição de forma confiável, tanto trocando de aba quanto pelo botão voltar.

## [1.3.5] — 2026-10-15

Terceira leva de correções do APK por Capacitor, a partir de mais testes reais no aparelho.

### 🐛 Correções
- **Auto-update com dado velho depois do celular voltar de repouso**: ao apagar a tela (ou o app ir pra segundo plano) e voltar, o GPS do ônibus e a lista de linhas de uma parada continuavam mostrando a informação de antes de apagar por até 10s, até o próximo ciclo normal do auto-update — dava a impressão de "não atualizou ainda" bem na hora de ir atrás do ônibus. Agora, ao voltar de segundo plano, a tela força uma busca imediata em vez de só esperar o próximo ciclo.
- **Botão de reorientar ao norte só existia no mapa da Home**: com a rotação do mapa ativada nos Ajustes, só o mapa da Home ganhava o botão de bússola — o mapa de GPS ao vivo de uma linha (a partir de uma parada ou do planejador de rota) e o mapa de visão geral da rota traçada ficavam sem jeito de voltar a apontar pro norte. Agora os três mapas ganham o botão quando a rotação está ativada.

### 🎨 Ajustes visuais
- **Destaque azul ao tocar em qualquer botão/aba/card**: o WebView do Android desenha por padrão um flash/contorno de destaque (geralmente azul) sempre que algo clicável é tocado — um comportamento de navegador, não algo que o app já controlava. Desligado via CSS (`-webkit-tap-highlight-color`), junto com a seleção de texto por toque longo nos elementos de interface (abas, botões, cards), que também disparava esse tipo de destaque indesejado fora de campos de texto.

## [1.3.4] — 2026-10-15

Segunda leva de correções do APK por Capacitor, a partir de testes reais no aparelho.

### 🐛 Correções
- **Voltar com um painel pop-up aberto** (Licenças & Atribuições, Ruas da linha, Verificar atualizações) **navegava a aba de baixo em vez de fechar o painel**: o botão voltar nativo agora sempre fecha o painel primeiro, se houver um aberto — só depois disso volta a mexer na navegação por trás dele.
- **Barra de rolagem cinza nativa do Android ainda aparecia**: a v1.3.3 só tinha escondido a barra de rolagem do CSS (`::-webkit-scrollbar`), mas o WebView do Android desenha a dele própria por cima, numa camada separada que o CSS não alcança — desligada agora direto na configuração nativa do WebView.
- **Ícone mal recortado**: o ícone novo da v1.3.3 usava a arte "de ponta a ponta" (sem margem), e a máscara adaptativa que o Android aplica em cima dos ícones (círculo, quadrado arredondado etc., dependendo do aparelho/launcher) cortava pedaços do ônibus e do texto "BUSBUS". Reduzido e centralizado dentro da "zona segura" (~58% do raio) que o Android garante não cortar, em todos os tamanhos — o mesmo arquivo-fonte também corrige o ícone "maskable" da versão web/PWA quando adicionada à tela inicial no Android.

## [1.3.3] — 2026-10-15

Primeira leva de correções do APK gerado por Capacitor (v1.3.2) — o AppMint escondia tudo isso por trás do WebView-wrapper dele; agora que o projeto Android é de verdade, cada uma dessas integrações precisa ser ligada explicitamente, e na v1.3.2 nenhuma tinha sido ainda.

### 🐛 Correções
- **Botão/gesto de voltar fechava o app em qualquer tela**: sair de uma parada e voltar pra Home, por exemplo, fechava o BusBus direto em vez de voltar pra tela anterior. Faltava o app avisar o Android de que o WebView ainda tinha navegação pra desfazer — corrigido ligando o botão voltar nativo à navegação que o app já controla internamente (`navStack`).
- **Localização não funcionava** (GPS "jogando" pra um lugar que a pessoa não estava, ou preso na última posição conhecida): faltavam as permissões de localização (`ACCESS_FINE_LOCATION`/`ACCESS_COARSE_LOCATION`) declaradas no app — sem isso o WebView nem chega a pedir a localização de verdade.
- **Título colado na barra de notificação**: a partir do Android 15 os apps passaram a ser desenhados por baixo da status bar por padrão — corrigido avisando o Android que o conteúdo não deve ficar sob a barra, com um reforço por CSS como garantia extra.
- **Efeito "elástico"/gelatina ao puxar a tela além do limite**: o WebView nativo tem, por padrão, um efeito de esticar o conteúdo que o site/PWA nunca teve — desligado tanto por CSS quanto direto na configuração do WebView.

### 🎨 Ajustes visuais
- **Ícone do APK**: trocado o placeholder genérico do Capacitor (o robozinho padrão) pelo logo oficial do BusBus (ônibus vermelho com a estrela azul), em todos os tamanhos/densidades.

## [1.3.2] — 2026-10-15

Sem mudanças de comportamento pra quem usa o app — essa versão existe só pra marcar a troca de como o APK é gerado.

### 🔧 Infraestrutura
- **O APK deixou de ser gerado manualmente no AppMint**: o projeto agora tem um projeto Android de verdade (Capacitor, pasta `android/`) e uma Action do GitHub que builda e assina o APK sozinha a cada push na `main`, com a MESMA chave de assinatura que o AppMint já usava (exportada do próprio painel do AppMint) — então quem já tem o app instalado continua recebendo atualização normal, sem precisar reinstalar nada. Detalhes técnicos no `CLAUDE.md`.

## [1.3.1] — 2026-10-14

### 🐛 Correções
- **Removida a confirmação ao sair do app (volta a fechar direto)**: a confirmação "Sair do BusBus?" adicionada na v1.3.0 saiu com dois problemas sérios — (1) apertar voltar duas vezes rápido ainda fechava o app sem perguntar nada, por causa de uma corrida entre o app nativo e o JavaScript (o WebView não dá pra interceptar o botão voltar diretamente, só reagir ao histórico de navegação do navegador, e isso é lento demais pra correr contra dois toques rápidos); (2) trocar de aba e voltar pra Home às vezes disparava o aviso à toa, achando que era um voltar na Home quando na verdade era só troca de aba. Como não existe (até onde fomos capazes de confirmar) uma função JS documentada do AppMint pra interceptar o botão voltar de verdade — o que resolveria os dois problemas na raiz —, a funcionalidade foi removida por completo até isso mudar. Voltar na Home volta a fechar o app direto, do jeito que era antes da v1.3.0.

## [1.3.0] — 2026-10-14

### ✨ Novidades
- **Confirmação ao sair do app**: antes, apertar voltar (gesto ou botão do Android) estando na Home fechava o BusBus na hora, sem avisar nada. Agora aparece um aviso perguntando "Sair do BusBus?" com Cancelar/Sair. Se a pessoa apertar voltar de novo sem tocar em nenhum dos dois, o aviso só fecha (como se fosse Cancelar) — o app nunca fecha sozinho só por voltares repetidos, só mesmo tocando em "Sair".
- **Aviso de atualização, não download automático**: o botão "Verificar atualizações" dos Ajustes agora mostra um aviso perguntando se quer baixar a nova versão, com Cancelar/Baixar, em vez de já abrir o download sozinho assim que encontrava uma versão nova.

## [1.2.0] — 2026-10-14

### ✨ Novidades
- **Verificar atualizações nos Ajustes**: novo botão em Ajustes → Sobre que consulta a última release publicada no GitHub e, se houver uma versão mais nova que a instalada, já abre o download do APK (o Android cuida do resto — abrir o instalador e apagar o arquivo depois ficam por conta da pessoa, tocando no arquivo baixado). Ficou nesse formato "manual, mas funcional" porque o gerador usado pra empacotar o app em APK (AppMint) não documenta nenhuma ponte JavaScript pra automatizar download/instalação/exclusão de arquivo a partir do código do app — só expõe isso como permissão do Android, sem função JS associada, então automatizar o fluxo inteiro está fora do alcance por enquanto.

### 🐛 Correções
- **Lista de linhas de uma parada sem auto-update**: a tela que mostra as linhas (com previsão de chegada) de uma parada escolhida não se atualizava sozinha — um ônibus que passava da parada continuava aparecendo na lista até a pessoa sair da tela e voltar pra ela. Agora essa tela atualiza a previsão a cada 10s automaticamente, igual já acontecia no mapa de GPS de uma linha, parando o auto-update ao sair da tela (ou quando o app vai pra segundo plano) pra não gastar bateria/dados à toa.

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
