import type { WmoCode } from "../types/weather";

/** Mapeamento de códigos WMO para descrição e emoji */
const WMO_DESCRIPTIONS: Record<number, { description: string; emoji: string }> =
  {
    0: { description: "Céu limpo", emoji: "☀️" },
    1: { description: "Principalmente limpo", emoji: "🌤️" },
    2: { description: "Parcialmente nublado", emoji: "⛅" },
    3: { description: "Encoberto", emoji: "☁️" },
    45: { description: "Névoa", emoji: "🌫️" },
    48: { description: "Névoa com geada", emoji: "🌫️" },
    51: { description: "Chuvisco leve", emoji: "🌦️" },
    53: { description: "Chuvisco moderado", emoji: "🌦️" },
    55: { description: "Chuvisco intenso", emoji: "🌧️" },
    61: { description: "Chuva fraca", emoji: "🌧️" },
    63: { description: "Chuva moderada", emoji: "🌧️" },
    65: { description: "Chuva forte", emoji: "🌧️" },
    71: { description: "Neve fraca", emoji: "🌨️" },
    73: { description: "Neve moderada", emoji: "🌨️" },
    75: { description: "Neve forte", emoji: "❄️" },
    77: { description: "Granizo", emoji: "🌨️" },
    80: { description: "Pancadas leves", emoji: "🌦️" },
    81: { description: "Pancadas moderadas", emoji: "🌧️" },
    82: { description: "Pancadas intensas", emoji: "⛈️" },
    85: { description: "Neve em pancadas", emoji: "🌨️" },
    86: { description: "Neve intensa em pancadas", emoji: "❄️" },
    95: { description: "Tempestade", emoji: "⛈️" },
    96: { description: "Tempestade com granizo", emoji: "⛈️" },
    99: { description: "Tempestade com granizo intenso", emoji: "⛈️" },
  };

const DEFAULT_DESCRIPTION = {
  description: "Condição desconhecida",
  emoji: "❓",
};

/**
 * Retorna descrição textual para um código WMO.
 */
export function getWmoDescription(code: WmoCode): string {
  return (WMO_DESCRIPTIONS[code] ?? DEFAULT_DESCRIPTION).description;
}

/**
 * Retorna emoji representativo para um código WMO.
 */
export function getWmoEmoji(code: WmoCode): string {
  return (WMO_DESCRIPTIONS[code] ?? DEFAULT_DESCRIPTION).emoji;
}
