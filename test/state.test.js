// Testes de src/modules/state.js: tema do app, tema do mapa (independente
// do tema do app — funcionalidade pedida explicitamente numa atualização
// anterior) e persistência em localStorage.
import { describe, it, expect, beforeEach, vi } from "vitest";
import { state, ALLOWED_RADII, loadPersistedSettings, effectiveMapIsDark, routeLineColor, isFavorite, saveRotationEnabled } from "../src/modules/state.js";

beforeEach(() => {
  localStorage.clear();
  state.theme = "system";
  state.mapTheme = "auto";
  state.rotationEnabled = false;
  state.radarRadius = 600;
  state.favoriteStops = [];
});

describe("effectiveMapIsDark", () => {
  it("mapTheme 'dark' força escuro mesmo com tema do app claro", () => {
    state.mapTheme = "dark";
    state.theme = "light";
    expect(effectiveMapIsDark()).toBe(true);
  });
  it("mapTheme 'light' força claro mesmo com tema do app escuro", () => {
    state.mapTheme = "light";
    state.theme = "dark";
    expect(effectiveMapIsDark()).toBe(false);
  });
  it("mapTheme 'auto' segue o tema escuro/amoled do app", () => {
    state.mapTheme = "auto";
    state.theme = "amoled";
    expect(effectiveMapIsDark()).toBe(true);
    state.theme = "dark";
    expect(effectiveMapIsDark()).toBe(true);
  });
  it("mapTheme 'auto' + tema do app 'light' dá mapa claro", () => {
    state.mapTheme = "auto";
    state.theme = "light";
    expect(effectiveMapIsDark()).toBe(false);
  });
  it("mapTheme 'auto' + tema do app 'system' consulta prefers-color-scheme", () => {
    state.mapTheme = "auto";
    state.theme = "system";
    // jsdom não implementa matchMedia de verdade — é preciso criar a
    // função antes de poder espiá-la (diferente de window.fetch, por
    // exemplo, que o jsdom já define).
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    expect(effectiveMapIsDark()).toBe(true);
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    expect(effectiveMapIsDark()).toBe(false);
  });
});

describe("routeLineColor", () => {
  it("usa azul claro (legível) quando o mapa está escuro", () => {
    state.mapTheme = "dark";
    expect(routeLineColor()).toBe("#7EC8FF");
  });
  it("usa azul escuro (original) quando o mapa está claro", () => {
    state.mapTheme = "light";
    expect(routeLineColor()).toBe("#2B5F8A");
  });
});

describe("isFavorite", () => {
  it("compara ids como string (evita bug de tipo number vs string)", () => {
    state.favoriteStops = [{ id: 123, name: "x", lat: 0, lng: 0 }];
    expect(isFavorite("123")).toBe(true);
    expect(isFavorite(123)).toBe(true);
    expect(isFavorite("999")).toBe(false);
  });
});

describe("loadPersistedSettings", () => {
  it("carrega o raio salvo só se estiver na lista permitida", () => {
    localStorage.setItem("busbus_radar_radius", "900");
    loadPersistedSettings();
    expect(state.radarRadius).toBe(900);
  });
  it("ignora um raio salvo fora da lista permitida", () => {
    localStorage.setItem("busbus_radar_radius", "99999");
    loadPersistedSettings();
    expect(ALLOWED_RADII.includes(state.radarRadius)).toBe(true);
    expect(state.radarRadius).toBe(600); // valor padrão, não o 99999 inválido
  });
  it("carrega o tema do mapa salvo", () => {
    localStorage.setItem("busbus_map_theme", "dark");
    loadPersistedSettings();
    expect(state.mapTheme).toBe("dark");
  });
  it("ignora um valor de tema do mapa inválido", () => {
    localStorage.setItem("busbus_map_theme", "neon");
    loadPersistedSettings();
    expect(state.mapTheme).toBe("auto"); // mantém o valor atual, não aceita lixo
  });
  it("carrega favoritos salvos", () => {
    localStorage.setItem("busbus_favorites", JSON.stringify([{ id: 1, name: "Parada X", lat: 1, lng: 2 }]));
    loadPersistedSettings();
    expect(state.favoriteStops).toHaveLength(1);
    expect(state.favoriteStops[0].name).toBe("Parada X");
  });
  it("não quebra com JSON corrompido no localStorage", () => {
    localStorage.setItem("busbus_favorites", "{não é json válido");
    expect(() => loadPersistedSettings()).not.toThrow();
  });
});

describe("saveRotationEnabled", () => {
  it("persiste o valor em localStorage", () => {
    saveRotationEnabled(true);
    expect(state.rotationEnabled).toBe(true);
    expect(localStorage.getItem("busbus_rotation_enabled")).toBe("1");
    saveRotationEnabled(false);
    expect(localStorage.getItem("busbus_rotation_enabled")).toBe("0");
  });
});
