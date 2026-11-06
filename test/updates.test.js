import { describe, it, expect } from "vitest";
import {
  compareSemver, parseRelease, shouldPrompt, shouldCheckOnResume, notesToHtml,
  RESUME_MIN_INTERVAL_MS,
} from "../src/modules/updates.js";

describe("compareSemver", () => {
  it("compara por partes numéricas", () => {
    expect(compareSemver("1.10.0", "1.9.9")).toBeGreaterThan(0);
    expect(compareSemver("1.8.0", "1.8.0")).toBe(0);
    expect(compareSemver("1.7.9", "1.8.0")).toBeLessThan(0);
    expect(compareSemver("2.0.0", "dev")).toBeGreaterThan(0);
  });
});

describe("parseRelease", () => {
  const data = { tag_name: "v1.9.0", body: "notas", assets: [{ name: "busbus_v1.9.0.apk", browser_download_url: "https://x/a.apk" }] };
  it("extrai versão, apk e notas", () => {
    expect(parseRelease(data)).toEqual({ version: "1.9.0", url: "https://x/a.apk", notes: "notas" });
  });
  it("devolve null sem apk ou sem tag", () => {
    expect(parseRelease({ tag_name: "v1.9.0", assets: [] })).toBeNull();
    expect(parseRelease({ assets: data.assets })).toBeNull();
    expect(parseRelease(null)).toBeNull();
  });
});

describe("shouldPrompt", () => {
  const L = { version: "1.9.0", url: "u", notes: "" };
  const now = 1000;
  it("avisa só se a versão é mais nova", () => {
    expect(shouldPrompt(L, "1.8.0", now, 0, "")).toBe(true);
    expect(shouldPrompt(L, "1.9.0", now, 0, "")).toBe(false);
    expect(shouldPrompt(null, "1.8.0", now, 0, "")).toBe(false);
  });
  it("respeita pausa e versão pulada", () => {
    expect(shouldPrompt(L, "1.8.0", now, now + 1, "")).toBe(false);
    expect(shouldPrompt(L, "1.8.0", now, now - 1, "")).toBe(true);
    expect(shouldPrompt(L, "1.8.0", now, 0, "1.9.0")).toBe(false);
    expect(shouldPrompt({ ...L, version: "1.9.1" }, "1.8.0", now, 0, "1.9.0")).toBe(true);
  });
});

describe("shouldCheckOnResume", () => {
  it("só depois de 10 min da última resposta", () => {
    const t = 5_000_000;
    expect(shouldCheckOnResume(0, t)).toBe(true);
    expect(shouldCheckOnResume(t - RESUME_MIN_INTERVAL_MS + 1, t)).toBe(false);
    expect(shouldCheckOnResume(t - RESUME_MIN_INTERVAL_MS, t)).toBe(true);
  });
});

describe("notesToHtml", () => {
  it("renderiza títulos, listas, negrito e destaque", () => {
    const h = notesToHtml("### Fixed\n- **Mapa**: corrigido\n\n> destaque");
    expect(h).toBe("<h4>Fixed</h4><ul><li><b>Mapa</b>: corrigido</li></ul><p>destaque</p>");
  });
  it("escapa HTML e só aceita links http(s)", () => {
    const h = notesToHtml("<img src=x onerror=1> [a](javascript:alert(1)) [ok](https://a.b/c)");
    expect(h).not.toContain("<img");
    expect(h).not.toContain('href="javascript');
    expect(h).toContain('<a href="https://a.b/c"');
  });
});
