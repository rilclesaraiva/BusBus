<div align="center">

# ğ BusBus

**Onde estÃ¡ seu Ã´nibus, agora.**
Rastreamento de Ã´nibus em tempo real para BelÃ©m (PA) â de graÃ§a, sem anÃºncios, sem conta.

[![LicenÃ§a: GPLv3](https://img.shields.io/badge/licenÃ§a-GPLv3-146B49?style=flat-square)](./LICENSE)
[![Plataforma: Android](https://img.shields.io/badge/plataforma-Android-146B49?style=flat-square)](#)
[![Feito em BelÃ©m](https://img.shields.io/badge/feito%20em-BelÃ©m%20(PA)-146B49?style=flat-square)](#)

![BusBus](./hero.png)

</div>

BusBus Ã© um projeto pessoal e independente, feito por [rilclesaraiva](https://github.com/rilclesaraiva). NÃ£o tem vÃ­nculo com nenhuma operadora de transporte ou Ã³rgÃ£o pÃºblico â existe pelo direito de quem mora e trabalha em BelÃ©m de saber quando o prÃ³ximo Ã´nibus chega.

## â¨ O que o app faz

| | |
|---|---|
| ğºï¸ **Mapa ao vivo** | Paradas, linhas e veÃ­culos em tempo real, com sua localizaÃ§Ã£o GPS |
| ğ¶ **Rotas a pÃ©** | AtÃ© a parada mais prÃ³xima, com raio de busca ajustÃ¡vel |
| ğ¤ï¸ **Clima integrado** | PrevisÃ£o do tempo (Open-Meteo) direto no mapa |
| â­ **Favoritos e histÃ³rico** | Suas paradas e buscas mais usadas, salvas sÃ³ no seu aparelho |
| ğ¨ **Temas** | Claro, escuro e AMOLED (preto puro, economiza bateria) |
| ğ **Avisos do sistema** | Comunicados mantidos pela equipe do BusBus |
| ğ **Apoio opcional** | Pix ou cartÃ£o (dÃ©bito/crÃ©dito internacional) â nunca obrigatÃ³rio |

## ğ± Capturas de tela

<div align="center">
<table>
<tr>
<td><img src="./paradas.png" width="200"><br><sub>Paradas prÃ³ximas + clima</sub></td>
<td><img src="./mapa.png" width="200"><br><sub>Rota e Ã´nibus ao vivo no mapa</sub></td>
<td><img src="./pesquisar.png" width="200"><br><sub>Busca por linha</sub></td>
</tr>
<tr>
<td><img src="./horario.png" width="200"><br><sub>HorÃ¡rio programado (tema escuro)</sub></td>
<td><img src="./mensagens.png" width="200"><br><sub>Avisos do sistema</sub></td>
<td><img src="./ajustes.png" width="200"><br><sub>Ajustes e temas</sub></td>
</tr>
</table>
</div>

## ğ¦ O que tem no repositÃ³rio

```
BusBus/
âââ busbus.html     # o app inteiro: um Ãºnico arquivo HTML/CSS/JS,
â                    # empacotado em APK via AppMint (HTML â Android)
âââ worker.js        # proxy em Cloudflare Workers que protege a API
â                    # de dados de transporte e serve a polÃ­tica de
â                    # privacidade
âââ wrangler.toml     # configuraÃ§Ã£o de deploy do Worker
âââ package.json
âââ LICENSE
```

## âï¸ Como funciona

O app (`busbus.html`) nunca fala direto com a API de dados de transporte. Todas as chamadas passam por um proxy prÃ³prio em Cloudflare Workers (`worker.js`), que:

- Esconde o endereÃ§o real da API (guardado como *Secret* no painel do Cloudflare, nunca neste repositÃ³rio);
- Serve a [polÃ­tica de privacidade](https://busbus.saraivarilcle.workers.dev/privacy) do app;
- Faz cache curto (5s) na borda da Cloudflare pra aliviar a carga na API de origem sem deixar os dados desatualizados.

## ğ Dados e serviÃ§os de terceiros

O BusBus Ã© construÃ­do sobre serviÃ§os gratuitos e de cÃ³digo aberto. A lista completa, com descriÃ§Ã£o e licenÃ§a de cada um, estÃ¡ dentro do prÃ³prio app em **Ajustes â LicenÃ§as & AtribuiÃ§Ãµes**:

<div align="center">
<img src="./licencas.png" width="220">
</div>

- [OpenStreetMap](https://www.openstreetmap.org) â mapas e geocodificaÃ§Ã£o (ODbL)
- [Leaflet](https://leafletjs.com) â biblioteca de mapa interativo (BSD-2-Clause)
- [Open-Meteo](https://open-meteo.com) â previsÃ£o do tempo (CC BY 4.0)
- [ipapi.co](https://ipapi.co) â localizaÃ§Ã£o aproximada por IP (fallback)

## ğ Privacidade

Sua localizaÃ§Ã£o Ã© usada sÃ³ no seu aparelho, em tempo real, pra desenhar o mapa â nunca Ã© enviada, guardada ou compartilhada em nenhum servidor nosso. Leia a [polÃ­tica de privacidade completa](https://busbus.saraivarilcle.workers.dev/privacy).

## ğ LicenÃ§a

Este projeto Ã© distribuÃ­do sob a [GNU General Public License v3.0](./LICENSE). Isso significa que qualquer cÃ³pia, modificaÃ§Ã£o ou redistribuiÃ§Ã£o â inclusive como app publicado â precisa continuar com o cÃ³digo aberto, sob a mesma licenÃ§a.

## âï¸ Contato

DÃºvidas, sugestÃµes ou problemas: [saraivarilcle@gmail.com](mailto:saraivarilcle@gmail.com) ou [buymeacoffee.com/saraivarilcle](https://buymeacoffee.com/saraivarilcle)

---

<div align="center"><sub>Feito com carinho por <b>rilclesaraiva</b> â BusBus Â· dados em tempo real de BelÃ©m</sub></div>
