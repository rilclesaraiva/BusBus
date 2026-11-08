import { describe, it, expect } from "vitest";
import { userDragCountsNow, noteAppResumed, RESUME_GUARD_MS } from "../src/modules/map.js";

describe("guarda de arrasto ao voltar do segundo plano", () => {
  it("conta arrasto normalmente antes de qualquer retorno", () => {
    expect(userDragCountsNow(Date.now())).toBe(true);
  });
  it("ignora arrasto logo depois de voltar e volta ao normal depois", () => {
    noteAppResumed();
    expect(userDragCountsNow(Date.now() + 100)).toBe(false);
    expect(userDragCountsNow(Date.now() + RESUME_GUARD_MS + 50)).toBe(true);
  });
});
