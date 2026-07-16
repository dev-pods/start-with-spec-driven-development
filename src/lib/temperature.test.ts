import { describe, expect, it } from "vitest";
import { celsiusToFahrenheit, formatTemperature } from "./temperature";

describe("celsiusToFahrenheit", () => {
  it("converte 0°C para 32°F", () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
  });

  it("converte 100°C para 212°F", () => {
    expect(celsiusToFahrenheit(100)).toBe(212);
  });

  it("converte -40°C para -40°F", () => {
    expect(celsiusToFahrenheit(-40)).toBe(-40);
  });

  it("converte 37°C para 98.6°F", () => {
    expect(celsiusToFahrenheit(37)).toBeCloseTo(98.6, 0);
  });
});

describe("formatTemperature", () => {
  it("formata temperatura em Celsius", () => {
    expect(formatTemperature(25, "C")).toBe("25°C");
  });

  it("formata temperatura em Fahrenheit", () => {
    expect(formatTemperature(77, "F")).toBe("77°F");
  });

  it("arredonda valores decimais", () => {
    expect(formatTemperature(25.7, "C")).toBe("26°C");
  });
});
