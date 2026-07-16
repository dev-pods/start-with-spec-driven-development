/**
 * Placeholder inicial do Weather App.
 *
 * O aplicativo em si — busca de cidade, serviço Open-Meteo, hook de estado e
 * componentes de UI (incluindo a previsão de 7 dias) — é CONSTRUÍDO pelo agente
 * no Step 5, a partir da spec (`specs/weather-app-spec.md`), do plano
 * (`plans/weather-app-plan.md`) e das tasks (`tasks/weather-app-tasks.md`).
 *
 * A fundação tipada e testável já vem pronta em `src/types/` e `src/lib/`.
 * No Step 5 este arquivo é substituído pela composição real do app.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-blue-800 mb-2">🌤️ Weather App</h1>
      <p className="text-blue-600 max-w-md">
        Ainda não construído. No Step 5, peça ao agente para implementar o app a
        partir da spec, do plano e das tasks.
      </p>
    </div>
  );
}
