// Testes da "aba esquecida em segundo plano volta limpa sozinha" — pedido
// explícito: a busca já tinha um temporizador de inatividade, mas ele
// contava o tempo mesmo com a pessoa olhando os resultados na tela (podia
// sumir debaixo dela). Agora o relógio só corre enquanto a aba NÃO é a
// selecionada, e o mesmo comportamento foi estendido pra aba de rota, que
// antes não tinha nada disso. updateHeaderAndNav() (nav.js) é o ponto único
// por onde toda troca de tela passa, e é lá que os dois temporizadores são
// ligados/desligados.
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { updateHeaderAndNav } from "../src/modules/nav.js";
import { SEARCH_IDLE_CLEAR_MS } from "../src/modules/search.js";
import * as searchModule from "../src/modules/search.js";
import {
  selectTripGeo, renderTripResults, renderRouteScreen, ROUTE_IDLE_CLEAR_MS,
} from "../src/modules/trip-planner.js";
import * as tripPlannerModule from "../src/modules/trip-planner.js";
import { state } from "../src/modules/state.js";

beforeEach(() => {
  vi.useFakeTimers();
  state.searchQuery = "";
});

afterEach(() => {
  // evita um temporizador de um teste vazar pro próximo
  searchModule.cancelSearchIdleClear();
  tripPlannerModule.cancelRouteIdleClear();
  vi.useRealTimers();
});

describe("busca: updateHeaderAndNav aciona o relógio só quando a pessoa sai da aba", () => {
  it("sair da aba de busca com uma pesquisa em andamento agenda a limpeza", () => {
    state.searchQuery = "ônibus 123"; // simula uma busca já feita (handleSearch faz o mesmo em state.searchQuery)
    updateHeaderAndNav("stops"); // saiu da busca pra outra aba
    vi.advanceTimersByTime(SEARCH_IDLE_CLEAR_MS);
    expect(state.searchQuery).toBe("");
  });

  it("ficar NA aba de busca (updateHeaderAndNav('search')) não limpa nada, mesmo depois do tempo todo passar", () => {
    state.searchQuery = "ônibus 123";
    updateHeaderAndNav("search");
    vi.advanceTimersByTime(SEARCH_IDLE_CLEAR_MS * 2);
    expect(state.searchQuery).toBe("ônibus 123");
  });

  it("sair e voltar antes do tempo passar cancela a limpeza agendada", () => {
    state.searchQuery = "ônibus 123";
    updateHeaderAndNav("stops"); // agenda
    updateHeaderAndNav("search"); // cancela, porque voltou
    vi.advanceTimersByTime(SEARCH_IDLE_CLEAR_MS * 2);
    expect(state.searchQuery).toBe("ônibus 123");
  });
});

describe("rota: a mesma proteção, agora também na aba de rota (pedido novo — antes não existia)", () => {
  const result = {
    type: "direct",
    boardStop: { id: 1, name: "Parada A", lat: -1.45, lng: -48.48, d: 120 },
    line: { numero: "101", name: "Linha A", busServiceId: 11, patternId: 111 },
    walkFrom: 80,
    alightStop: { id: 2, name: "Parada A2", lat: -1.44, lng: -48.47 },
  };

  it("sair da aba de rota com uma rota já traçada agenda a limpeza", () => {
    renderRouteScreen(); // monta #tripOriginInput/#tripDestInput, que selectTripGeo() precisa
    selectTripGeo("o", -1.455, -48.49, "Origem de teste");
    selectTripGeo("d", -1.46, -48.48, "Destino de teste");
    renderTripResults([result]);

    updateHeaderAndNav("stops"); // saiu da aba de rota
    vi.advanceTimersByTime(ROUTE_IDLE_CLEAR_MS);

    expect(tripPlannerModule.tripOrigin).toBeNull();
    expect(tripPlannerModule.tripDestination).toBeNull();
  });

  it("ficar NA aba de rota não limpa nada", () => {
    renderRouteScreen();
    selectTripGeo("o", -1.455, -48.49, "Origem de teste");
    selectTripGeo("d", -1.46, -48.48, "Destino de teste");
    renderTripResults([result]);

    updateHeaderAndNav("route");
    vi.advanceTimersByTime(ROUTE_IDLE_CLEAR_MS * 2);

    expect(tripPlannerModule.tripOrigin).not.toBeNull();
  });
});
