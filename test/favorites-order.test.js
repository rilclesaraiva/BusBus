// Reordenar favoritos: a nova ordem tem que valer e ser gravada no aparelho.
import { describe, it, expect, beforeEach } from "vitest";
import { state } from "../src/modules/state.js";
import { reorderFavoriteStops, lineDedupeKey } from "../src/modules/stops.js";

const fav = id => ({ id, name: "Parada " + id, lat: 0, lng: 0 });

describe("reorderFavoriteStops", () => {
  beforeEach(() => {
    localStorage.clear();
    state.favoriteStops = [fav("1"), fav("2"), fav("3")];
  });
  it("aplica a nova ordem e grava em localStorage", () => {
    reorderFavoriteStops(["3", "1", "2"]);
    expect(state.favoriteStops.map(f => f.id)).toEqual(["3", "1", "2"]);
    expect(JSON.parse(localStorage.getItem("busbus_favorites")).map(f => f.id)).toEqual(["3", "1", "2"]);
  });
  it("nunca perde um favorito que ficou fora da lista", () => {
    reorderFavoriteStops(["2"]);
    expect(state.favoriteStops.map(f => f.id)).toEqual(["2", "1", "3"]);
  });
  it("ignora ids que não existem e aceita id numérico", () => {
    reorderFavoriteStops([3, "99", "1", "2"]);
    expect(state.favoriteStops.map(f => f.id)).toEqual(["3", "1", "2"]);
  });
});

describe("lineDedupeKey", () => {
  const base = { patternId: 1, number: "755", dest: "X", etaMin: 72, schedTime: null };
  it("usa o veículo quando a resposta traz (mesmo veículo = mesma chave)", () => {
    expect(lineDedupeKey({ ...base, raw: { codVehicle: "BN75502" } })).toBe(lineDedupeKey({ ...base, etaMin: 70, raw: { codVehicle: "BN75502" } }));
  });
  it("veículos diferentes na mesma linha e previsão são ônibus diferentes", () => {
    expect(lineDedupeKey({ ...base, raw: { codVehicle: "A" } })).not.toBe(lineDedupeKey({ ...base, raw: { codVehicle: "B" } }));
  });
  it("sem veículo, usa linha + previsão", () => {
    expect(lineDedupeKey({ ...base, raw: {} })).toBe(lineDedupeKey({ ...base, raw: {} }));
    expect(lineDedupeKey({ ...base, raw: {} })).not.toBe(lineDedupeKey({ ...base, etaMin: 10, raw: {} }));
  });
});
