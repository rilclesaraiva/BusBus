# BusBus

Rastreamento de ônibus em tempo real para Belém (PA) — paradas, linhas, veículos no mapa, rotas a pé e previsão do tempo, num app leve, gratuito e sem anúncios.

BusBus é um projeto pessoal e independente, feito por [rilclesaraiva](https://github.com/rilclesaraiva). Não tem vínculo com nenhuma operadora de transporte ou órgão público.

## O que tem no repositório

```
BusBus/
├── busbus.html     # o app inteiro: um único arquivo HTML/CSS/JS,
│                     # empacotado em APK via AppMint (HTML → Android)
├── worker.js        # proxy em Cloudflare Workers que protege a API
│                     # de dados de transporte e serve a política de
│                     # privacidade
├── wrangler.toml     # configuração de deploy do Worker
├── package.json
└── LICENSE
```

## Como funciona

O app (`busbus.html`) nunca fala direto com a API de dados de transporte. Todas as chamadas passam por um proxy próprio em Cloudflare Workers (`worker.js`), que:

- Esconde o endereço real da API (guardado como *Secret* no painel do Cloudflare, nunca neste repositório);
- Serve a [política de privacidade](https://busbus.saraivarilcle.workers.dev/privacy) do app;
- Faz cache curto (5s) na borda da Cloudflare pra aliviar a carga na API de origem sem deixar os dados desatualizados.

## Dados e serviços de terceiros

O BusBus é construído sobre serviços gratuitos e de código aberto. A lista completa, com descrição e licença de cada um, está dentro do próprio app em **Ajustes → Licenças & Atribuições**. Os principais:

- [OpenStreetMap](https://www.openstreetmap.org) — mapas e geocodificação (ODbL)
- [Leaflet](https://leafletjs.com) — biblioteca de mapa interativo (BSD-2-Clause)
- [Open-Meteo](https://open-meteo.com) — previsão do tempo (CC BY 4.0)
- [ipapi.co](https://ipapi.co) — localização aproximada por IP (fallback)

## Licença

Este projeto é distribuído sob a [GNU General Public License v3.0](./LICENSE). Isso significa que qualquer cópia, modificação ou redistribuição — inclusive como app publicado — precisa continuar com o código aberto, sob a mesma licença.

## Contato

Dúvidas, sugestões ou problemas: [saraivarilcle@gmail.com](mailto:saraivarilcle@gmail.com) ou [buymeacoffee.com/saraivarilcle](https://buymeacoffee.com/saraivarilcle)
