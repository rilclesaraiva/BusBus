// Testes de src/modules/nav.js: a pilha de navegação não deve crescer sem
// limite quando a pessoa alterna repetidamente entre as mesmas abas — era
// o bug original ("voltar precisava de centenas de toques numa sessão
// longa") que o navStack com dedup corrigiu.
import { describe, it, expect, vi, beforeEach } from "vitest";
import { pushNav, navStack, handlePopState } from "../src/modules/nav.js";
import * as nav from "../src/modules/nav.js";
import * as settingsModule from "../src/modules/settings.js";

// navTo()/handlePopState() disparam GPS, fetch de rede, mapa Leaflet etc. —
// tudo fora do escopo deste teste, que quer checar só a lógica da pilha.
// pushNav() em si é puro em relação a isso (só toca history + navStack),
// então testamos direto nele, sem precisar mockar o resto do app.
beforeEach(() => {
  history.replaceState({ label: "stops" }, "", "#stops");
});

describe("pushNav — pilha de navegação sem crescimento ilimitado", () => {
  it("empilha uma aba nova normalmente", () => {
    pushNav("search");
    expect(navStack).toEqual(["stops", "search"]);
  });

  it("ao voltar pra uma aba que já está na pilha, pula pra ela em vez de empilhar de novo", () => {
    pushNav("search");
    pushNav("config");
    pushNav("search"); // já visitada — não deveria crescer a pilha
    expect(navStack).toEqual(["stops", "search"]);
  });

  it("alternar repetidamente entre as mesmas abas não faz a pilha crescer sem limite", () => {
    for(let i = 0; i < 50; i++){
      pushNav("search");
      pushNav("stops");
    }
    // só "stops" e "search" existem de verdade nessa sequência — nunca mais
    // que 2 entradas, mesmo depois de 100 idas e voltas.
    expect(navStack.length).toBeLessThanOrEqual(2);
  });

  it("tocar de novo na mesma aba atual não duplica nem quebra a pilha", () => {
    pushNav("search");
    pushNav("search");
    expect(navStack).toEqual(["stops", "search"]);
  });
});

describe("handlePopState — não trava a navegação se uma tela der erro ao recarregar", () => {
  it("reseta isPopping mesmo quando o render da tela lança uma exceção", () => {
    const boom = vi.spyOn(settingsModule, "renderConfigScreen").mockImplementation(() => {
      throw new Error("falha simulada ao recarregar a tela");
    });
    expect(() => handlePopState({ state: { label: "config" } })).toThrow("falha simulada");
    // o ponto do teste: mesmo com a exceção, isPopping não pode ficar
    // travado em "true" — senão todo toque em qualquer aba a partir daqui
    // seria ignorado silenciosamente (pushNav checa isPopping no início).
    expect(nav.isPopping).toBe(false);
    pushNav("search"); // confirma que a navegação continua funcionando normalmente
    expect(navStack).toContain("search");
    boom.mockRestore();
  });
});
