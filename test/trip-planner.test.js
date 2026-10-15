// Testes de src/modules/trip-planner.js: bugs reais reportados pela pessoa
// testando o B.E.M. no celular, ausentes na versão monólito, mais a
// melhoria de UX pedida em seguida (card selecionado marcado). A aba de
// rota já teve um temporizador que limpava a rota sozinha depois de um
// tempo em segundo plano — removido na v1.4.0+ (persistência total, ver
// resetRouteResults em trip-planner.js e test/scroll-persistence.test.js).
//
// 1) O ícone 🗺 de cada card de resultado é desenhado como HTML puro
//    (onclick="...") — isso só consegue chamar algo que exista em
//    "window". "lastTripResults" é um "let" deste módulo REATRIBUÍDO (não
//    só mutado) a cada nova busca; expor a variável em si em window (como
//    o onclick antigo fazia, implicitamente, ao referenciá-la pelo nome)
//    ficaria com uma cópia congelada do valor de quando a exposição
//    rodou — exatamente a mesma classe de bug do pendingSearchScrollRestore
//    em search.js/nav.js. selectTripResult(i) é a correção: lê o valor
//    atual de lastTripResults a cada toque (via getTripResult(i)) E marca
//    visualmente qual card está selecionado.
//
// 2) Voltar da tela de acompanhamento em tempo real de um ônibus (aberta a
//    partir de um resultado do planejador) deve devolver a pessoa pros
//    resultados já calculados, não pra uma busca em branco — renderRouteScreen()
//    precisa repopular #tripResultsArea a partir de lastTripResults quando ele
//    não estiver vazio.
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  renderRouteScreen, renderTripResults, getTripResult, selectTripResult,
  selectTripGeo, selectedTripResultIndex, tripOrigin, handleTripGeo,
} from "../src/modules/trip-planner.js";
import * as tripPlannerModule from "../src/modules/trip-planner.js";
import { el } from "../src/modules/utils.js";

// Dois resultados plausíveis e DIFERENTES entre si — o ponto do bug 1 era
// que o mapa continuava mostrando sempre o traçado do primeiro, mesmo
// clicando no ícone do segundo.
const resultA = {
  type: "direct",
  boardStop: { id: 1, name: "Parada A", lat: -1.45, lng: -48.48, d: 120 },
  line: { numero: "101", name: "Linha A", busServiceId: 11, patternId: 111 },
  walkFrom: 80,
  alightStop: { id: 2, name: "Parada A2", lat: -1.44, lng: -48.47 },
};
const resultB = {
  type: "direct",
  boardStop: { id: 3, name: "Parada B", lat: -1.46, lng: -48.49, d: 200 },
  line: { numero: "202", name: "Linha B", busServiceId: 22, patternId: 222 },
  walkFrom: 150,
  alightStop: { id: 4, name: "Parada B2", lat: -1.43, lng: -48.46 },
};

beforeEach(() => {
  // #tripResultsArea só existe depois que a tela de rota foi desenhada —
  // renderRouteScreen() é quem cria esse <div> dentro de #screens.
  renderRouteScreen();
  // showTripOnMap() (chamado por renderTripResults ao fim de toda busca)
  // precisa de uma origem/destino já escolhidos pra desenhar os
  // marcadores — exatamente como a pessoa já teria feito antes de ver
  // resultados na tela real.
  selectTripGeo("o", -1.455, -48.49, "Origem de teste");
  selectTripGeo("d", -1.46, -48.48, "Destino de teste");
  // devolve lastTripResults a um estado conhecido entre testes, já que é
  // um "let" exportado e mutável por renderTripResults().
  renderTripResults([]);
});

describe("getTripResult — leitura ao vivo de lastTripResults (bug do ícone 🗺 que não trocava o traçado)", () => {
  it("reflete o valor atual mesmo depois de lastTripResults ser reatribuído por uma nova busca", () => {
    renderTripResults([resultA]);
    expect(getTripResult(0)).toBe(resultA);

    // simula uma nova busca chegando — reatribui lastTripResults, não só
    // muta o array antigo "in place"
    renderTripResults([resultB, resultA]);
    expect(getTripResult(0)).toBe(resultB);
    expect(getTripResult(1)).toBe(resultA);
  });

  it("o HTML dos cartões chama selectTripResult(i), nunca a variável lastTripResults crua (que não existe em window)", () => {
    renderTripResults([resultA, resultB]);
    const html = el("tripResultsArea").innerHTML;
    expect(html).toContain("selectTripResult(0)");
    expect(html).toContain("selectTripResult(1)");
    expect(html).not.toMatch(/lastTripResults\[/);
  });
});

describe("selectTripResult — marca visualmente qual card está sendo mostrado no mapa", () => {
  it("o primeiro resultado já nasce marcado como selecionado (é o que showTripOnMap mostra automaticamente)", () => {
    renderTripResults([resultA, resultB]);
    const cards = el("tripResultsArea").querySelectorAll(".tripCard");
    expect(cards[0].classList.contains("selected")).toBe(true);
    expect(cards[1].classList.contains("selected")).toBe(false);
    expect(selectedTripResultIndex).toBe(0);
  });

  it("tocar no ícone 🗺 de outro resultado move a marcação pra ele, e só pra ele", () => {
    renderTripResults([resultA, resultB]);
    selectTripResult(1);
    const cards = el("tripResultsArea").querySelectorAll(".tripCard");
    expect(cards[0].classList.contains("selected")).toBe(false);
    expect(cards[1].classList.contains("selected")).toBe(true);
    expect(selectedTripResultIndex).toBe(1);
  });
});

describe("renderRouteScreen — não perde os resultados já calculados ao voltar pra tela de rota", () => {
  it("repopula #tripResultsArea a partir de lastTripResults quando a pessoa volta pra essa tela", () => {
    renderTripResults([resultA, resultB]);
    expect(el("tripResultsArea").innerHTML).toContain("Linha A");

    // renderRouteScreen() é exatamente o que handlePopState chama no ramo
    // "route" (voltar do mapa em tempo real de um ônibus) — reconstrói o
    // HTML da tela do zero via render(), o que por si só zeraria
    // #tripResultsArea se nada repopulasse os resultados guardados.
    renderRouteScreen();

    const area = el("tripResultsArea");
    expect(area).not.toBeNull();
    expect(area.innerHTML).toContain("Linha A");
    expect(area.innerHTML).toContain("Linha B");
  });

  it("não quebra nem desenha resultados quando ainda não existe nenhuma busca feita", () => {
    renderTripResults([]);
    expect(() => renderRouteScreen()).not.toThrow();
    expect(el("tripResultsArea").innerHTML).toBe("");
  });
});

describe("renderRouteScreen — lembra qual resultado estava selecionado ao voltar (não pula pro primeiro de novo)", () => {
  it("volta mostrando o mesmo card selecionado antes de abrir o GPS do ônibus", () => {
    renderTripResults([resultA, resultB]);
    selectTripResult(1); // pessoa escolheu o segundo resultado antes de abrir o ônibus
    expect(selectedTripResultIndex).toBe(1);

    // renderRouteScreen() é o que handlePopState chama ao voltar da tela de
    // GPS em tempo real — antes disso resetava a seleção pro índice 0 toda
    // vez, mesmo que a pessoa tivesse escolhido explicitamente o segundo.
    renderRouteScreen();

    expect(selectedTripResultIndex).toBe(1);
    const cards = el("tripResultsArea").querySelectorAll(".tripCard");
    expect(cards[1].classList.contains("selected")).toBe(true);
    expect(cards[0].classList.contains("selected")).toBe(false);
  });

  it("uma busca NOVA (sem preserveSelection) continua voltando a mostrar o primeiro resultado", () => {
    renderTripResults([resultA, resultB]);
    selectTripResult(1);
    renderTripResults([resultB, resultA]); // planTrip() chama assim, sem o 2º argumento
    expect(selectedTripResultIndex).toBe(0);
  });
});

describe("campos de origem/destino: botão de limpar (X) e reset da rota ao apagar o texto", () => {
  it("o botão de limpar some com o texto todo e a área de resultados/mapa", () => {
    renderTripResults([resultA]);
    expect(el("tripOriginClearBtn")).not.toBeNull();
    expect(el("tripResultsArea").innerHTML).not.toBe("");

    // oninput="handleTripGeo('o', this.value)" só dispara DEPOIS que o
    // próprio campo já reflete o que a pessoa digitou — por isso o teste
    // também zera o .value do input antes de chamar a função, pra simular
    // de verdade um backspace até apagar tudo (ou o botão de limpar).
    el("tripOriginInput").value = "";
    handleTripGeo("o", "");

    expect(tripPlannerModule.tripOrigin).toBeNull();
    expect(el("tripOriginClearBtn").style.display).toBe("none");
    // a rota/resultado antigo não faz mais sentido sem origem — some junto
    expect(el("tripResultsArea").innerHTML).toBe("");
    expect(el("tripMapWrap").style.display).toBe("none");
  });

  it("digitar de novo (sem apagar tudo) não reseta um resultado que já estava na tela", () => {
    renderTripResults([resultA]);
    handleTripGeo("o", "Av"); // editando, mas não vazio — só 2 letras, nem dispara a busca ainda
    expect(el("tripResultsArea").innerHTML).not.toBe("");
  });
});
