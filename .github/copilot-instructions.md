# Instruções SDD do Weather App

## Fonte de verdade

- Leia `constitution.md`, `specs/weather-app-spec.md`,
  `plans/weather-app-plan.md` e `tasks/weather-app-tasks.md` antes de alterar
  comportamento.
- Preserve os IDs existentes. Novos comportamentos exigem novos critérios de aceite.
- Trate os artefatos como documentação viva do sistema atual, não como templates descartáveis.
- Nos arquivos `.github/steps/*.md`, nunca use um ID de funcionalidade (`Fx`) ou
  critério de aceite (`CAx.y`) sem explicar, no mesmo contexto, o comportamento
  que ele representa.

## Ordem de mudança

1. Intenção registrada como fonte inicial do SDD e do feedforward.
2. Spec, quando o comportamento observável muda.
3. Plan, com análise de impacto.
4. Tasks incrementais.
5. Código e testes.
6. Validação e review de rastreabilidade.

Feedforward é o conjunto de guias disponíveis antes da execução: Constituição,
intenção, spec, plano, tasks, instruções e critérios. Feedback é o retorno dos
sensores depois da execução ou validação. O replanejamento usa feedback para
atualizar o feedforward da próxima iteração; não use os termos como sinônimos.

## Loop

Quando uma validação ficar vermelha, registre o feedback e retorne ao planning
agent. Não corrija diretamente o código antes de confirmar o plano da próxima
iteração.

## Engenharia

- React 18, TypeScript strict, Vite, Vitest, Testing Library e Playwright.
- Reaproveite funções e tipos existentes.
- Teste comportamento observável; não acople testes a classes CSS.
- E2E deve interceptar APIs externas com fixtures determinísticas.