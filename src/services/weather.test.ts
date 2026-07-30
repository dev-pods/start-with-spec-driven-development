import { afterEach, describe, expect, it, vi } from "vitest";
import type { Location } from "../types/weather";
import { fetchWeather, searchLocations } from "./weather";

afterEach(() => vi.restoreAllMocks());

const location: Location = {
  id: 1,
  name: "São Paulo",
  latitude: -23.55,
  longitude: -46.63,
  country: "Brasil",
  country_code: "BR",
  admin1: "São Paulo",
};

describe("searchLocations", () => {
  it("CA1.2: busca até cinco localizações em português", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        new Response(JSON.stringify({ results: [location] }), { status: 200 }),
      );

    await expect(searchLocations(" São Paulo ")).resolves.toEqual([location]);

    const url = new URL(fetchMock.mock.calls[0][0] as string);
    expect(url.hostname).toBe("geocoding-api.open-meteo.com");
    expect(url.searchParams.get("name")).toBe("São Paulo");
    expect(url.searchParams.get("count")).toBe("5");
    expect(url.searchParams.get("language")).toBe("pt");
  });

  it("não chama a rede para uma busca vazia", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    await expect(searchLocations("   ")).resolves.toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("CA1.4: informa o status quando a geocodificação falha", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("", { status: 503 }),
    );
    await expect(searchLocations("São Paulo")).rejects.toThrow(/503/);
  });
});

describe("fetchWeather", () => {
  it("CA2.1-CA2.4: solicita somente o clima atual", async () => {
    const current = {
      temperature_2m: 24,
      apparent_temperature: 25,
      weather_code: 1,
      wind_speed_10m: 10,
      relative_humidity_2m: 62,
    };
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        new Response(JSON.stringify({ current }), { status: 200 }),
      );

    await expect(fetchWeather(location)).resolves.toEqual({
      location,
      current,
    });

    const url = new URL(fetchMock.mock.calls[0][0] as string);
    expect(url.hostname).toBe("api.open-meteo.com");
    expect(url.searchParams.get("current")).toContain("temperature_2m");
    expect(url.searchParams.get("timezone")).toBe("auto");
  });

  it("CA2.6: informa o status quando a consulta do clima falha", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("", { status: 500 }),
    );
    await expect(fetchWeather(location)).rejects.toThrow(/500/);
  });
});
