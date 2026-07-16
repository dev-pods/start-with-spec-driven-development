import { describe, expect, it } from "vitest";
import { getWmoDescription, getWmoEmoji } from "./wmo";

describe("getWmoDescription", () => {
  it("retorna descrição para código 0 (céu limpo)", () => {
    expect(getWmoDescription(0)).toBe("Céu limpo");
  });

  it("retorna descrição para código 95 (tempestade)", () => {
    expect(getWmoDescription(95)).toBe("Tempestade");
  });

  it("retorna descrição padrão para código desconhecido", () => {
    expect(getWmoDescription(999)).toBe("Condição desconhecida");
  });
});

describe("getWmoEmoji", () => {
  it("retorna emoji para céu limpo (código 0)", () => {
    expect(getWmoEmoji(0)).toBe("☀️");
  });

  it("retorna emoji padrão para código desconhecido", () => {
    expect(getWmoEmoji(999)).toBe("❓");
  });
});
