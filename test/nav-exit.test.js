// Testes de src/modules/nav.js: a confirmação de saída do app ao voltar
// estando na Home. Pedido do rilclesaraiva: voltar na Home não pode fechar
// o app na hora — tem que mostrar um aviso, e repetir "voltar" sem tocar em
// nada (nem Cancelar, nem Sair) deve só fechar o aviso de novo, nunca sair
// do app sozinho. Só o toque em "Sair" (confirmExitApp) pode progredir rumo
// a fechar de verdade.
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { handlePopState } from "../src/modules/nav.js";
import { state } from "../src/modules/state.js";

beforeEach(() => {
  history.replaceState({ label: "stops" }, "", "#stops");
  state.view = "stops";
});

afterEach(() => {
  // openModal() anexa direto em document.body (fora do #app do setup.js),
  // então, diferente do resto do DOM de teste, isso não é limpo sozinho
  // entre os testes — sem isso, um aviso deixado aberto aqui vazaria pro
  // próximo teste deste arquivo.
  const leftover = document.getElementById("activeModal");
  if(leftover) leftover.remove();
});

describe("handlePopState — confirmação de saída ao voltar na Home", () => {
  it("voltar estando na Home mostra o aviso de saída, não fecha o app na hora", () => {
    handlePopState({ state: { label: "stops" } });
    const modal = document.getElementById("activeModal");
    expect(modal).not.toBeNull();
    expect(modal.textContent).toContain("Sair do BusBus?");
  });

  it("voltar de novo com o aviso já aberto, sem tocar em nada, só fecha o aviso (vira um Cancelar)", () => {
    handlePopState({ state: { label: "stops" } }); // 1º voltar: abre o aviso
    expect(document.getElementById("activeModal")).not.toBeNull();
    handlePopState({ state: { label: "stops" } }); // 2º voltar: fecha, não sai
    expect(document.getElementById("activeModal")).toBeNull();
  });

  it("o loop se repete indefinidamente — nunca sai do app sozinho só de voltar", () => {
    for(let i = 0; i < 10; i++){
      handlePopState({ state: { label: "stops" } });
    }
    // depois de 10 "voltar" alternados (abre, fecha, abre, fecha...), o app
    // continua de pé — nunca existe nenhum sinal de "saída confirmada" só
    // por causa de voltares repetidos sem toque em Sair/Cancelar.
    expect(state.view).toBe("stops");
  });

  it("um voltar vindo de outra tela pra Home é navegação normal, não aciona o aviso de saída", () => {
    state.view = "lines"; // simula estar numa tela diferente da Home
    handlePopState({ state: { label: "stops" } });
    // sem aviso de saída — isso é só "voltar de lines pra stops"
    expect(document.getElementById("activeModal")).toBeNull();
    expect(state.view).toBe("stops");
  });
});
