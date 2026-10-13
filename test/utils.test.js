// Testes das funções puras de src/modules/utils.js — a maior parte veio do
// harness manual em jsdom que a gente usava antes do B.E.M. existir (ver
// histórico do busbus.html original), só que agora roda via Vitest em vez
// de um script solto.
import { describe, it, expect } from "vitest";
import { normalize, fmtEta, fmtTimeAgo, metersBetween, bearingBetween, jsStr, pick, errMsg } from "../src/modules/utils.js";

describe("normalize", () => {
  it("remove acentos", () => {
    expect(normalize("Parada São José")).toBe("parada sao jose");
  });
  it("ignora espaço sobrando no fim (bug relatado)", () => {
    expect(normalize("Parque Shopping ")).toBe(normalize("Parque Shopping"));
  });
  it("trata hífen e outros separadores como espaço", () => {
    expect(normalize("Parque-Shopping")).toBe(normalize("Parque Shopping"));
  });
  it("colapsa espaços múltiplos", () => {
    expect(normalize("Praça   da   República")).toBe("praca da republica");
  });
  it("trata vírgula e ponto como separador", () => {
    expect(normalize("Av. Almirante, Barroso")).toBe("av almirante barroso");
  });
});

describe("fmtEta", () => {
  it("chegando quando <= 1 min", () => {
    expect(fmtEta(1, null)).toEqual({ label: "chegando", cls: "now" });
    expect(fmtEta(0, null)).toEqual({ label: "chegando", cls: "now" });
  });
  it("classe soon entre 2 e 5 min", () => {
    expect(fmtEta(5, null)).toEqual({ label: "5 min", cls: "soon" });
  });
  it("sem classe especial acima de 5 min", () => {
    expect(fmtEta(12, null)).toEqual({ label: "12 min", cls: "" });
  });
  it("cai pro horário programado quando não há previsão em tempo real", () => {
    expect(fmtEta(null, "14:30")).toEqual({ label: "14:30", cls: "", isSched: true });
  });
  it("mostra travessão quando não há nada", () => {
    expect(fmtEta(null, null)).toEqual({ label: "—", cls: "" });
  });
});

describe("fmtTimeAgo", () => {
  it("retorna vazio sem timestamp", () => {
    expect(fmtTimeAgo(null)).toBe("");
  });
  it("agora para menos de 30s", () => {
    expect(fmtTimeAgo(Date.now() - 5000)).toBe("agora");
  });
  it("minutos para menos de 1h", () => {
    expect(fmtTimeAgo(Date.now() - 5 * 60000)).toBe("há 5 min");
  });
  it("horas acima de 1h", () => {
    expect(fmtTimeAgo(Date.now() - 2 * 3600000)).toBe("há 2 h");
  });
});

describe("metersBetween", () => {
  it("retorna ~0 pro mesmo ponto", () => {
    expect(metersBetween({ lat: -1.45, lng: -48.49 }, { lat: -1.45, lng: -48.49 })).toBeCloseTo(0, 3);
  });
  it("estima corretamente uma distância conhecida (~111km por grau de latitude)", () => {
    const d = metersBetween({ lat: 0, lng: 0 }, { lat: 1, lng: 0 });
    expect(d).toBeGreaterThan(110000);
    expect(d).toBeLessThan(112000);
  });
});

describe("bearingBetween", () => {
  it("aponta pra norte (0°) quando só muda a latitude", () => {
    const b = bearingBetween({ lat: 0, lng: 0 }, { lat: 1, lng: 0 });
    expect(b).toBeCloseTo(0, 1);
  });
  it("aponta pra leste (90°) quando só muda a longitude", () => {
    const b = bearingBetween({ lat: 0, lng: 0 }, { lat: 0, lng: 1 });
    expect(b).toBeCloseTo(90, 0);
  });
});

describe("jsStr", () => {
  it("escapa aspas duplas pra entidade HTML (pra caber dentro de onclick=\"\")", () => {
    expect(jsStr('Parada "Central"')).toBe('&quot;Parada \\&quot;Central\\&quot;&quot;');
  });
  it("trata undefined/null como string vazia", () => {
    // JSON.stringify("") dá duas aspas, e o próprio jsStr troca TODA aspas
    // (inclusive essas duas) por &quot; — então o resultado é "&quot;&quot;",
    // não '""'.
    expect(jsStr(undefined)).toBe("&quot;&quot;");
    expect(jsStr(null)).toBe("&quot;&quot;");
  });
});

describe("pick", () => {
  it("retorna o primeiro campo presente e não-nulo", () => {
    expect(pick({ a: null, b: 5 }, ["a", "b"])).toBe(5);
  });
  it("cai no fallback quando nada bate", () => {
    expect(pick({}, ["a", "b"], "default")).toBe("default");
  });
});

describe("errMsg", () => {
  it("usa .message de um Error", () => {
    expect(errMsg(new Error("falhou"))).toBe("falhou");
  });
  it("converte outros valores pra string", () => {
    expect(errMsg("algo")).toBe("algo");
  });
});
