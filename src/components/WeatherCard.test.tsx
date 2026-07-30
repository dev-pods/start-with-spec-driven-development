import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { WeatherData } from "../types/weather";
import { WeatherCard } from "./WeatherCard";

const weather: WeatherData = {
  location: {
    id: 1,
    name: "São Paulo",
    latitude: -23.55,
    longitude: -46.63,
    country: "Brasil",
    country_code: "BR",
    admin1: "São Paulo",
  },
  current: {
    temperature_2m: 24,
    apparent_temperature: 25,
    weather_code: 1,
    wind_speed_10m: 10,
    relative_humidity_2m: 62,
  },
};

describe("WeatherCard", () => {
  it("CA2.1-CA2.4: apresenta os dados observáveis do clima atual", () => {
    render(<WeatherCard data={weather} />);

    const card = screen.getByLabelText("Clima atual para São Paulo");
    expect(card).toHaveTextContent("24°C");
    expect(card).toHaveTextContent("Sensação: 25°C");
    expect(card).toHaveTextContent("Principalmente limpo");
    expect(card).toHaveTextContent("Vento: 10 km/h");
    expect(card).toHaveTextContent("Umidade: 62%");
  });
});
