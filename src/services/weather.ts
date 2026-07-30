import type { Location, WeatherData } from "../types/weather";

const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_API = "https://api.open-meteo.com/v1/forecast";

export async function searchLocations(query: string): Promise<Location[]> {
  if (!query.trim()) return [];

  const url = new URL(GEOCODING_API);
  url.searchParams.set("name", query.trim());
  url.searchParams.set("count", "5");
  url.searchParams.set("language", "pt");
  url.searchParams.set("format", "json");

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Erro ao buscar localização: ${response.status}`);
  }

  const data = await response.json();
  return (data.results as Location[]) ?? [];
}

export async function fetchWeather(location: Location): Promise<WeatherData> {
  const url = new URL(FORECAST_API);
  url.searchParams.set("latitude", String(location.latitude));
  url.searchParams.set("longitude", String(location.longitude));
  url.searchParams.set(
    "current",
    "temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m",
  );
  url.searchParams.set("timezone", "auto");

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Erro ao buscar clima: ${response.status}`);
  }

  const data = await response.json();
  return { location, current: data.current };
}
