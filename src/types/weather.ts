/** Código WMO para condição climática */
export type WmoCode = number;

/** Dados de localização retornados pela geocoding API */
export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string;
}

/** Dados de previsão do tempo (unidades SI) */
export interface WeatherData {
  location: Location;
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    weather_code: WmoCode;
    wind_speed_10m: number;
    relative_humidity_2m: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: WmoCode[];
  };
}

/** Estado de uma requisição assíncrona */
export type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };
