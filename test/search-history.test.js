// Testes do histórico de busca (src/modules/search.js): salvar, deduplicar
// (ignorando acento/maiúscula via normalize) e limpar.
import { describe, it, expect, beforeEach } from "vitest";
import { loadSearchHistory, addSearchHistory, clearSearchHistory, historyKey } from "../src/modules/search.js";

beforeEach(() => {
  localStorage.clear();
});

describe("histórico de busca", () => {
  it("começa vazio", () => {
    expect(loadSearchHistory("ponto")).toEqual([]);
  });
  it("adiciona um termo e ele aparece no topo", () => {
    addSearchHistory("ponto", "Praça da República");
    expect(loadSearchHistory("ponto")[0]).toBe("Praça da República");
  });
  it("não deduplica por string exata, mas por normalize (evita 'praça' e 'Praça' duplicados)", () => {
    addSearchHistory("ponto", "praça da república");
    addSearchHistory("ponto", "Praça da República");
    const hist = loadSearchHistory("ponto");
    expect(hist).toHaveLength(1);
    expect(hist[0]).toBe("Praça da República"); // a versão mais recente fica
  });
  it("ignora termo vazio/só espaço", () => {
    addSearchHistory("ponto", "   ");
    expect(loadSearchHistory("ponto")).toEqual([]);
  });
  it("limita a 8 itens", () => {
    for(let i = 0; i < 12; i++) addSearchHistory("ponto", `termo ${i}`);
    expect(loadSearchHistory("ponto")).toHaveLength(8);
  });
  it("ponto e linha usam históricos separados", () => {
    addSearchHistory("ponto", "Parada X");
    addSearchHistory("linha", "309");
    expect(loadSearchHistory("ponto")).toEqual(["Parada X"]);
    expect(loadSearchHistory("linha")).toEqual(["309"]);
    expect(historyKey("ponto")).not.toBe(historyKey("linha"));
  });
  it("clearSearchHistory apaga só o tipo pedido", () => {
    addSearchHistory("ponto", "Parada X");
    addSearchHistory("linha", "309");
    clearSearchHistory("ponto");
    expect(loadSearchHistory("ponto")).toEqual([]);
    expect(loadSearchHistory("linha")).toEqual(["309"]);
  });
});
