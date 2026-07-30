import { useCallback, useState } from "react";
import { fetchWeather, searchLocations } from "../services/weather";
import type { AsyncState, Location, WeatherData } from "../types/weather";

export function useWeather() {
  const [searchState, setSearchState] = useState<AsyncState<Location[]>>({
    status: "idle",
  });
  const [weatherState, setWeatherState] = useState<AsyncState<WeatherData>>({
    status: "idle",
  });

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchState({ status: "idle" });
      return;
    }

    setSearchState({ status: "loading" });
    try {
      const locations = await searchLocations(query);
      setSearchState(
        locations.length === 0
          ? { status: "error", message: "Nenhuma cidade encontrada." }
          : { status: "success", data: locations },
      );
    } catch (error) {
      setSearchState({
        status: "error",
        message:
          error instanceof Error ? error.message : "Erro ao buscar cidade.",
      });
    }
  }, []);

  const selectLocation = useCallback(async (location: Location) => {
    setWeatherState({ status: "loading" });
    setSearchState({ status: "idle" });
    try {
      setWeatherState({
        status: "success",
        data: await fetchWeather(location),
      });
    } catch (error) {
      setWeatherState({
        status: "error",
        message:
          error instanceof Error ? error.message : "Erro ao buscar clima.",
      });
    }
  }, []);

  return { searchState, weatherState, search, selectLocation };
}
