import { SearchBar } from "./components/SearchBar";
import { WeatherCard } from "./components/WeatherCard";
import { useWeather } from "./hooks/useWeather";
import type { Location } from "./types/weather";

export default function App() {
  const { searchState, weatherState, search, selectLocation } = useWeather();

  function handleLocationSelect(location: Location) {
    selectLocation(location);
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-sky-50 to-blue-100 px-4 pt-16">
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold text-blue-800">Weather App</h1>
        <p className="text-blue-600">Clima atual com Open-Meteo</p>
      </header>

      <SearchBar
        onSearch={search}
        isLoading={searchState.status === "loading"}
      />

      {searchState.status === "loading" && (
        <output className="mt-4 text-gray-600">Buscando cidades...</output>
      )}

      {searchState.status === "error" && (
        <p className="mt-4 text-red-700" role="alert">
          {searchState.message}
        </p>
      )}

      {searchState.status === "success" && (
        <ul className="mt-4 w-full max-w-md divide-y rounded-lg bg-white shadow">
          {searchState.data.map((location) => (
            <li key={location.id}>
              <button
                type="button"
                onClick={() => handleLocationSelect(location)}
                className="w-full px-4 py-3 text-left transition-colors hover:bg-blue-50"
                aria-label={`Selecionar ${location.name}, ${location.country}`}
              >
                <span className="font-medium">{location.name}</span>
                {location.admin1 && (
                  <span className="ml-2 text-sm text-gray-500">
                    {location.admin1}
                  </span>
                )}
                <span className="ml-2 text-sm text-gray-500">
                  {location.country}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {weatherState.status === "loading" && (
        <output className="mt-8 text-gray-600">Carregando clima...</output>
      )}

      {weatherState.status === "error" && (
        <p className="mt-8 text-red-700" role="alert">
          {weatherState.message}
        </p>
      )}

      {weatherState.status === "success" && (
        <div className="mt-8">
          <WeatherCard data={weatherState.data} />
        </div>
      )}
    </main>
  );
}
