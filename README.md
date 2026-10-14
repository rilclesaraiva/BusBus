<div align="center">

# 🚌 BusBus

**Onde está seu ônibus, agora.**
Rastreamento de ônibus em tempo real para Belém (PA) — de graça, sem anúncios, sem conta.

[![Licença: GPLv3](https://img.shields.io/badge/licença-GPLv3-146B49?style=flat-square)](./LICENSE)
[![Plataforma: Android](https://img.shields.io/badge/plataforma-Android-146B49?style=flat-square)](#)
[![Plataforma: iPhone (web)](https://img.shields.io/badge/plataforma-iPhone%20(web)-146B49?style=flat-square)](#-testar-no-iphone-ou-em-qualquer-navegador)
[![Feito em Belém](https://img.shields.io/badge/feito%20em-Belém%20(PA)-146B49?style=flat-square)](#)
[![Código com apoio de IA](https://img.shields.io/badge/código-com%20apoio%20de%20IA-146B49?style=flat-square)](#-feito-com-apoio-de-ia)

![BusBus](./hero.png)

</div>

BusBus é um projeto pessoal e independente, feito por [rilclesaraiva](https://github.com/rilclesaraiva). Não tem vínculo com nenhuma operadora de transporte ou órgão público — existe pelo direito de quem mora e trabalha em Belém de saber quando o próximo ônibus chega.

> 🤖 O código deste projeto foi escrito com apoio de ferramentas de IA, sob direção e revisão de rilclesaraiva. Mais detalhes [aqui embaixo](#-feito-com-apoio-de-ia).

## 📲 Testar no iPhone (ou em qualquer navegador)

O app originalmente roda como Android (APK), mas a mesma versão também está publicada como site, então dá pra usar — e instalar — em qualquer aparelho com navegador, iPhone incluído:

**🔗 [bus-bus-qdmb.vercel.app](https://bus-bus-qdmb.vercel.app)**

Pra instalar no iPhone como se fosse um app (ícone na tela, tela cheia, sem barra do navegador):
1. Abra o link acima no **Safari** (precisa ser o Safari, não funciona por outro navegador no iOS)
2. Toque no ícone de compartilhar (o quadrado com a seta pra cima)
3. Escolha **"Adicionar à Tela de Início"**

> ⚠️ Essa versão web está em fase de teste — pode receber atualizações frequentes e o link pode mudar conforme o projeto evolui.

## ✨ O que o app faz

| | |
|---|---|
| 🗺️ **Mapa ao vivo** | Paradas, linhas e veículos em tempo real, com sua localização GPS |
| 🚶 **Rotas a pé** | Até a parada mais próxima, com raio de busca ajustável |
| 🌤️ **Clima integrado** | Previsão do tempo (Open-Meteo) direto no mapa |
| ⭐ **Favoritos e histórico** | Suas paradas e buscas mais usadas, salvas só no seu aparelho |
| 🎨 **Temas** | Claro, escuro e AMOLED (preto puro, economiza bateria) |
| 🔔 **Avisos do sistema** | Comunicados mantidos pela equipe do BusBus |
| 💚 **Apoio opcional** | Pix ou cartão (débito/crédito internacional) — nunca obrigatório |

## 📱 Capturas de tela

<div align="center">
<table>
<tr>
<td><img src="./paradas.png" width="200"><br><sub>Paradas próximas + clima</sub></td>
<td><img src="./mapa.png" width="200"><br><sub>Rota e ônibus ao vivo no mapa</sub></td>
<td><img src="./pesquisar.png" width="200"><br><sub>Busca por linha</sub></td>
</tr>
<tr>
<td><img src="./horario.png" width="200"><br><sub>Horário programado (tema escuro)</sub></td>
<td><img src="./mensagens.png" width="200"><br><sub>Avisos do sistema</sub></td>
<td><img src="./ajustes.png" width="200"><br><sub>Ajustes e temas</sub></td>
</tr>
</table>
</div>

## 📦 O que tem no repositório

```
BusBus/
├── busbus.html     # o app inteiro: um único arquivo HTML/CSS/JS,
│                    # empacotado em APK via AppMint (HTML → Android)
├── worker.js        # proxy em Cloudflare Workers que protege a API
│                    # de dados de transporte e serve a política de
│                    # privacidade
├── wrangler.toml     # configuração de deploy do Worker
├── package.json
└── LICENSE
```

## ⚙️ Como funciona

O app (`busbus.html`) nunca fala direto com a API de dados de transporte. Todas as chamadas passam por um proxy próprio em Cloudflare Workers (`worker.js`), que:

- Esconde o endereço real da API (guardado como *Secret* no painel do Cloudflare, nunca neste repositório);
- Serve a [política de privacidade](https://busbus.saraivarilcle.workers.dev/privacy) do app;
- Faz cache curto (5s) na borda da Cloudflare pra aliviar a carga na API de origem sem deixar os dados desatualizados.

## 🙏 Dados e serviços de terceiros

O BusBus é construído sobre serviços gratuitos e de código aberto. A lista completa, com descrição e licença de cada um, está dentro do próprio app em **Ajustes → Licenças & Atribuições**:

<div align="center">
<img src="./licencas.png" width="220">
</div>

- [OpenStreetMap](https://www.openstreetmap.org) — mapas e geocodificação (ODbL)
- [Leaflet](https://leafletjs.com) — biblioteca de mapa interativo (BSD-2-Clause)
- [Open-Meteo](https://open-meteo.com) — previsão do tempo (CC BY 4.0)
- [ipapi.co](https://ipapi.co) — localização aproximada por IP (fallback)

## 🔒 Privacidade

Sua localização é usada só no seu aparelho, em tempo real, pra desenhar o mapa — nunca é enviada, guardada ou compartilhada em nenhum servidor nosso. Leia a [política de privacidade completa](https://busbus.saraivarilcle.workers.dev/privacy).

## 🤖 Feito com apoio de IA

O código do BusBus — o app (`busbus.html`), o proxy (`worker.js`) e os próprios materiais deste repositório — foi escrito com apoio de ferramentas de IA. Cada funcionalidade, correção e decisão de design parte de rilclesaraiva, que dirige, revisa e testa tudo antes de publicar; nada aqui é gerado e colocado no ar sem revisão. É assim que um projeto pessoal e independente, sem equipe por trás, consegue entregar um app deste tamanho.

O cuidado pra manter o BusBus polido e livre de problemas é constante, mas, como em qualquer software, alguma coisa pode passar despercebida — principalmente numa fase inicial de testes com poucos usuários. Encontrou algo estranho? Abra uma [issue](https://github.com/rilclesaraiva/BusBus/issues) ou mande um e-mail (contato abaixo).

## 📄 Licença

Este projeto é distribuído sob a [GNU General Public License v3.0](./LICENSE). Isso significa que qualquer cópia, modificação ou redistribuição — inclusive como app publicado — precisa continuar com o código aberto, sob a mesma licença.

## ✉️ Contato

Dúvidas, sugestões ou problemas: [saraivarilcle@gmail.com](mailto:saraivarilcle@gmail.com) ou [buymeacoffee.com/saraivarilcle](https://buymeacoffee.com/saraivarilcle)

---

<div align="center"><sub>Feito com carinho por <b>rilclesaraiva</b> — BusBus · dados em tempo real de Belém</sub></div>
