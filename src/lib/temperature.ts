/**
 * Converte temperatura de Celsius para Fahrenheit.
 * @param celsius - temperatura em graus Celsius
 * @returns temperatura em graus Fahrenheit (arredondada para 1 casa decimal)
 */
export function celsiusToFahrenheit(celsius: number): number {
  return Math.round(((celsius * 9) / 5 + 32) * 10) / 10;
}

/**
 * Formata temperatura para exibição, incluindo unidade.
 * @param value - valor numérico da temperatura
 * @param unit - unidade de exibição ("C" | "F")
 */
export function formatTemperature(value: number, unit: "C" | "F"): string {
  const rounded = Math.round(value);
  return `${rounded === 0 ? 0 : rounded}°${unit}`;
}
