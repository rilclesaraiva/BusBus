import { describe, it, expect } from "vitest";
import {
  locateOnRoute, passesNear, stopPositions, etaToStop, normName, findVehiclePoint, mergeLines,
} from "../src/modules/estimates.js";

// Rua reta de ~1,1 km, de oeste pra leste, na latitude de Belém.
const lat = -1.4558;
const lng0 = -48.5;
const mPerDegLng = 111195 * Math.cos(lat * Math.PI / 180);
const at = (mEast, mNorth = 0) => ({ lat: lat + mNorth / 111195, lng: lng0 + mEast / mPerDegLng });
const line = [at(0), at(500), at(1000)];

describe("geometria do traçado", () => {
  it("projeta um ponto no traçado", () => {
    const loc = locateOnRoute(line, at(300, 10));
    expect(loc.s).toBeGreaterThan(295);
    expect(loc.s).toBeLessThan(305);
    expect(loc.d).toBeGreaterThan(8);
    expect(loc.d).toBeLessThan(12);
  });

  it("passesNear acha só o que passa dentro da tolerância", () => {
    expect(passesNear(line, at(600, 20), 35)).toHaveLength(1);
    expect(passesNear(line, at(600, 90), 35)).toHaveLength(0);
  });

  it("traçado em laço que passa duas vezes devolve duas posições", () => {
    const loop = [at(0), at(500), at(500, 300), at(0, 300), at(0, 10), at(500, 10)];
    const pos = passesNear(loop, at(250, 5), 35);
    expect(pos).toHaveLength(2);
    expect(pos[0]).toBeLessThan(pos[1]);
  });
});

describe("stopPositions", () => {
  it("parada colada no terminal (fim do traçado a ~80 m) conta como chegada", () => {
    const stop = at(1000, 80);
    expect(passesNear(line, stop, 35)).toHaveLength(0);
    const pos = stopPositions(line, stop);
    expect(pos).toHaveLength(1);
    expect(etaToStop(line, pos, at(500))).toBe(2); // 500 m / 5 m/s
  });
  it("parada longe do fim e do traçado não conta", () => {
    expect(stopPositions(line, at(500, 300))).toHaveLength(0);
  });
});

describe("etaToStop", () => {
  const stop = passesNear(line, at(600, 10), 35);
  it("calcula minutos pela distância até a parada", () => {
    // 500 m a 5 m/s = 100 s = ~2 min
    expect(etaToStop(line, stop, at(100))).toBe(2);
  });
  it("ônibus que já passou não entra", () => {
    expect(etaToStop(line, stop, at(800))).toBeNull();
  });
  it("ônibus quase na parada ainda conta (ruído de GPS)", () => {
    expect(etaToStop(line, stop, at(610))).toBe(0);
  });
  it("ônibus longe do traçado é ignorado", () => {
    expect(etaToStop(line, stop, at(100, 400))).toBeNull();
  });
  it("laço: depois de passar a primeira vez, vale a segunda", () => {
    const loop = [at(0), at(500), at(500, 300), at(0, 300), at(0, 10), at(500, 10)];
    const pos = passesNear(loop, at(250, 5), 35);
    const afterFirst = at(500, 150); // na volta, já depois da 1ª passagem
    expect(etaToStop(loop, pos, afterFirst)).not.toBeNull();
  });
  it("muito longe (>90 min) não é mostrado", () => {
    const far = [at(0), at(0, 40000)];
    const s = passesNear(far, at(0, 39990), 35);
    expect(etaToStop(far, s, at(0, 100))).toBeNull();
  });
});

describe("findVehiclePoint", () => {
  const pattern = { poly: [at(0), at(1000)] };
  const other = { type: "Shopping Pátio  Belém" };
  const points = [
    { id: 1, name: "OUTRA PARADA", lat: at(1005).lat, lng: at(1005).lng },
    { id: 2, name: "SHOPPING PATIO BELEM", lat: at(1060).lat, lng: at(1060).lng },
    { id: 3, name: "SHOPPING PATIO BELEM", lat: at(5000).lat, lng: at(5000).lng },
  ];
  it("prefere o nome do sentido contrário perto do fim do traçado", () => {
    expect(findVehiclePoint(pattern, [other], points)).toBe(2);
  });
  it("sem nome que bata, a mais próxima do fim", () => {
    expect(findVehiclePoint(pattern, [{ type: "NADA" }], points)).toBe(1);
  });
  it("sem parada por perto, null", () => {
    expect(findVehiclePoint({ poly: [at(0), at(20000)] }, [other], points)).toBeNull();
  });
  it("normName tira acento, caixa e espaços repetidos", () => {
    expect(normName("TERMINAL :  Av São Pedro")).toBe("terminal av sao pedro");
  });
});

describe("mergeLines", () => {
  it("ordena por previsão, sem previsão no fim, e não mexe sem extras", () => {
    const sys = [{ etaMin: 2 }, { etaMin: 20 }, { etaMin: null }];
    expect(mergeLines(sys, [])).toBe(sys);
    const out = mergeLines(sys, [{ etaMin: 9, estimated: true }]);
    expect(out.map(l => l.etaMin)).toEqual([2, 9, 20, null]);
  });
});
