// Reordenar favoritos: a nova ordem tem que valer e ser gravada no aparelho.
import { describe, it, expect, beforeEach } from "vitest";
import { state } from "../src/modules/state.js";
import { reorderFavoriteStops } from "../src/modules/stops.js";

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
