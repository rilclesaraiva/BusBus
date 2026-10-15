// Até a v1.4.0, ficar fora da aba de Pesquisa ou de Rota por um tempo
// (SEARCH_IDLE_CLEAR_MS / ROUTE_IDLE_CLEAR_MS, 90s cada) apagava a busca ou
// a rota traçada sozinha, mesmo que a pessoa só tivesse ido dar uma olhada
// rápida em outra aba. Removido a pedido do rilclesaraiva: nem busca nem
// rota mostram dado "ao vivo" que realmente fique desatualizado nesse
// intervalo (é tudo parada/linha/trajeto, estático) — a limpeza automática
// só causava a sensação de "cadê minha busca" sem necessidade. Agora as 4
// abas (Pesquisa, Paradas, Rota, Ajustes) têm persistência total: nada se
// apaga sozinho por tempo, só por ação explícita da pessoa (botão de
// limpar, apagar um campo, traçar uma rota nova).
import { describe, it, expect, beforeEach, vi } from "vitest";
import { updateHeaderAndNav } from "../src/modules/nav.js";
import {
  selectTripGeo, renderTripResults, renderRouteScreen,
} from "../src/modules/trip-planner.js";
import * as tripPlannerModule from "../src/modules/trip-planner.js";
import { state } from "../src/modules/state.js";

beforeEach(() => {
  vi.useFakeTimers();
  state.searchQuery = "";
});

describe("busca: sair da aba não apaga mais nada, por mais tempo que passe", () => {
  it("sair da aba de busca com uma pesquisa em andamento não agenda limpeza nenhuma", () => {
    state.searchQuery = "ônibus 123"; // simula uma busca já feita (handleSearch faz o mesmo em state.searchQuery)
    updateHeaderAndNav("stops"); // saiu da busca pra outra aba
    vi.advanceTimersByTime(10 * 60 * 1000); // 10 minutos — bem além do antigo limite de 90s
    expect(state.searchQuery).toBe("ônibus 123");
  });
});

describe("rota: sair da aba não apaga mais nada, por mais tempo que passe", () => {
  const result = {
    type: "direct",
    boardStop: { id: 1, name: "Parada A", lat: -1.45, lng: -48.48, d: 120 },
    line: { numero: "101", name: "Linha A", busServiceId: 11, patternId: 111 },
    walkFrom: 80,
    alightStop: { id: 2, name: "Parada A2", lat: -1.44, lng: -48.47 },
  };

  it("sair da aba de rota com uma rota já traçada não agenda limpeza nenhuma", () => {
    renderRouteScreen(); // monta #tripOriginInput/#tripDestInput, que selectTripGeo() precisa
    selectTripGeo("o", -1.455, -48.49, "Origem de teste");
    selectTripGeo("d", -1.46, -48.48, "Destino de teste");
    renderTripResults([result]);

    updateHeaderAndNav("stops"); // saiu da aba de rota
    vi.advanceTimersByTime(10 * 60 * 1000); // 10 minutos — bem além do antigo limite de 90s

    expect(tripPlannerModule.tripOrigin).not.toBeNull();
    expect(tripPlannerModule.tripDestination).not.toBeNull();
  });
});
