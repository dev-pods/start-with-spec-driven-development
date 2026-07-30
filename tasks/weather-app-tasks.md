# Tasks: Weather App

## Baseline concluída

| ID | Entrega | Critério de feito | Rastreia | Estado |
|---|---|---|---|---|
| T1 | Tipos do domínio | `Location`, `WeatherData` e `AsyncState` compilam em strict mode | Plano: modelo de dados | Concluída |
| T2 | Funções de temperatura | Conversão e formatação possuem testes unitários | CA3.1–CA3.4 | Concluída |
| T3 | Mapeamento WMO | Descrição, emoji e fallback possuem testes unitários | CA4.1–CA4.3 | Concluída |
| T4 | Serviço Open-Meteo | Busca e clima atual tratam sucesso e erro HTTP | CA1.2, CA1.4, CA2.1–CA2.6 | Concluída |
| T5 | Estado assíncrono | Hook expõe busca, seleção, loading, sucesso e erro | CA1.3, CA2.5, CA2.6 | Concluída |
| T6 | Busca acessível | Campo, botão e resultados seguem o contrato observável | CA1.1–CA1.4 | Concluída |
| T7 | Card de clima atual | Card apresenta todos os dados da F2 | CA2.1–CA2.4 | Concluída |
| T8 | Fluxo integrado | Busca, seleção e clima atual passam no E2E determinístico | CA1.1–CA2.6 | Concluída |

## Regra para incrementos

Novas tasks são adicionadas sem reescrever as concluídas. Cada task nova precisa
de ID único, dependências, superfícies afetadas, critério de feito e CA rastreado.