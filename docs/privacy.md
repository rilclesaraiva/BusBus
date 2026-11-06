---
layout: default
title: Política de Privacidade — BusBus
permalink: /privacy
---

# Política de Privacidade — BusBus

Última atualização: 5 de novembro de 2026

O BusBus é um app gratuito e independente de rastreamento de ônibus de Belém (PA), feito por uma única pessoa (rilclesaraiva) como projeto pessoal. Esta página descreve, de forma direta, tudo o que o app envia pela rede e o que fica guardado no seu aparelho. O código do app e do proxy é aberto: [github.com/rilclesaraiva/BusBus](https://github.com/rilclesaraiva/BusBus).

## Localização

O BusBus pede permissão de localização só pra mostrar no mapa as paradas e ônibus mais próximos de você e calcular distâncias. Pra isso, **a sua posição é enviada** ao proxy do BusBus e ao serviço de previsão do tempo (detalhes abaixo). O código do proxy (público, em `worker.js`) só repassa a consulta e devolve a resposta, e não grava a posição. Se você negar ou desativar a permissão, o app continua funcionando, só não consegue mostrar automaticamente o que está perto.

## Pra quem vai o quê

- **Proxy do BusBus (Cloudflare Workers):** recebe a sua posição (latitude e longitude) ao buscar paradas próximas, além dos códigos das linhas e paradas que você abre, e repassa essas consultas ao serviço de dados de transporte público de Belém. A Cloudflare pode manter uma cópia da resposta por até 5 segundos e, como hospedagem, processa o endereço IP das conexões segundo a política dela.
- **Open-Meteo (previsão do tempo):** recebe a latitude e a longitude da sua posição atual (ou da última conhecida) pra devolver a previsão local, além do seu IP, como qualquer site.
- **ipapi.co:** só quando o GPS falha ou é negado e não há posição salva: recebe o seu IP pra estimar um local aproximado.
- **OpenStreetMap, Photon (Komoot) e Nominatim:** o mapa é desenhado com imagens baixadas do servidor de mapas do OpenStreetMap, que vê o seu IP e a região do mapa que você está olhando. Na busca de endereços do planejador de rota, o texto que você digita (junto com um ponto fixo no centro de Belém, não a sua posição) vai pro Photon e pro Nominatim. O Nominatim também recebe pontos do traçado de algumas linhas (não a sua posição) pra descobrir nomes de ruas.
- **Google (ícones):** ao abrir "Licenças & Atribuições", os pequenos logos de alguns serviços vêm do serviço de ícones de sites do Google, que recebe o seu IP e os endereços dos sites mostrados.
- **GitHub (só no app Android):** ao abrir o app, ao voltar pra ele (no máximo a cada 10 minutos) e quando você toca em "Verificar atualizações", o app consulta a API pública do GitHub pra saber se existe uma versão nova. O GitHub vê o seu IP.

Cada um desses serviços trata os dados que recebe conforme a política dele. O BusBus não envia nome, e-mail nem qualquer identificador pessoal a nenhum deles.

## O que fica salvo no seu aparelho

Paradas favoritas, histórico de busca, tema e outras preferências (raio de busca, mapa, aviso de atualização), a última posição conhecida, a última versão publicada que o app viu (com as notas) e quais avisos você já viu ficam salvos apenas no seu aparelho, no armazenamento do próprio navegador ou app. Pra apagar tudo, limpe os dados do app ou desinstale.

## O que o BusBus não faz

- Não tem cadastro, login ou conta de usuário.
- Não mostra anúncios.
- Não usa ferramentas de análise, rastreamento ou publicidade de terceiros.
- Não vende nem cede os seus dados a terceiros pra outros fins (publicidade, análise ou revenda).
- Não cobra nada pra usar qualquer parte do app.

## Retenção e seus direitos

O BusBus não guarda dados pessoais seus em servidor próprio, então não há o que apagar do lado dele. Os serviços de terceiros acima seguem as próprias políticas de retenção. Mesmo assim, se quiser perguntar algo ou exercer qualquer direito previsto na Lei Geral de Proteção de Dados (Lei nº 13.709/2018), escreva pro contato abaixo.

## Crianças

O BusBus não é direcionado a crianças e não coleta intencionalmente dados de menores de idade.

## Mudanças nesta política

Se algo aqui mudar, esta mesma página será atualizada e a data acima também.

## Contato

Dúvidas, sugestões ou problemas: [saraivarilcle@gmail.com](mailto:saraivarilcle@gmail.com) ou uma [issue no GitHub](https://github.com/rilclesaraiva/BusBus/issues).

Veja também os [Termos de Uso](terms).
