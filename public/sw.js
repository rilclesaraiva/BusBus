// BusBus Experimental Modular (B.E.M.) — Service Worker
// Copyright (C) 2026 rilclesaraiva — licenciado sob GNU GPLv3.
// Texto completo: https://github.com/rilclesaraiva/BusBus/blob/main/LICENSE
//
// Mesma estratégia do busbus.html original: deixa o app instalável (no
// Android, no Chrome de computador e no iPhone via "Adicionar à Tela de
// Início" do Safari) e guarda uma cópia do "casco" do app pra abrir
// instantaneamente mesmo com internet ruim ou sem internet nenhuma.
//
// O build do Vite (vite-plugin-singlefile) já embute todo o JS e CSS
// dentro do próprio index.html — não existem mais arquivos separados de
// script/estilo pra listar aqui, só o HTML final, o manifesto e os ícones.
//
// De propósito, NÃO guarda em cache nada que precisa estar sempre
// atualizado: paradas, linhas, posição dos ônibus, clima, mapa, busca de
// endereço. Essas chamadas sempre vão direto pra rede — um app de
// transporte com dado velho é pior que um app sem dado nenhum. Só o casco
// (a "casca" visual do app) é que fica em cache, pra abrir rápido.
//
// Suba o número da versão abaixo sempre que publicar uma atualização do
// build — isso avisa o navegador que existe um casco novo pra baixar e
// substituir o antigo. Usamos um nome de cache diferente do busbus.html
// original ("bem-shell" em vez de "busbus-shell") de propósito: são dois
// apps publicados em endereços diferentes, cada um com seu próprio
// Service Worker e cache, sem qualquer risco de um pisar no cache do
// outro mesmo que um dia sejam servidos do mesmo domínio.
const CACHE_VERSION = "bem-shell-v1";
const SHELL_FILES = [
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_VERSION)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Só mexe em pedidos GET de arquivos do próprio app (mesma origem). Tudo
  // que é de outro domínio — a API de dados de transporte, o clima, os
  // tiles do mapa, as fontes, o Leaflet (agora embutido no bundle, mas por
  // segurança o filtro continua aqui) — passa direto pra rede, sem
  // interceptação nenhuma daqui.
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) {
    return;
  }

  // "Network falling back to cache": tenta buscar uma versão nova primeiro
  // (pra sempre pegar a atualização mais recente do app quando há
  // internet) e só usa a cópia salva se a rede falhar — é o que garante
  // que o app ainda abre offline ou com conexão instável.
  event.respondWith(
    fetch(req)
      .then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(req, resClone));
        return res;
      })
      .catch(() => caches.match(req))
  );
});
