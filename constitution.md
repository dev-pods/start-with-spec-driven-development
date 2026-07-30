# Constituição do Weather App

## Propósito

Este documento define os princípios permanentes que governam a evolução do
Weather App. Spec, plano, tasks, código e testes podem mudar; esta Constituição
define como essas mudanças devem acontecer.

## Princípios

### 1. A spec é a fonte de verdade do comportamento

Todo comportamento observável precisa existir na spec antes de chegar ao código.
Funcionalidades e critérios de aceite preservam seus IDs para manter a
rastreabilidade entre pedido, implementação e evidência.

### 2. Mudanças evoluem artefatos vivos

Um novo pedido não recria o projeto. Primeiro sua intenção é registrada como a
fonte inicial do SDD; depois atualiza, nesta ordem, spec, plano, tasks, código e
testes. Artefatos da baseline permanecem visíveis para que o delta possa ser
revisado.

### 3. Decisões precedem implementação

O plano registra impacto, alternativas e estratégia de validação antes de uma
mudança técnica. As tasks derivam desse plano e devem ser pequenas, dependentes
e verificáveis.

### 4. Critérios de aceite exigem evidência

Cada critério de aceite deve ser comprovado no nível mais econômico que represente
o comportamento: teste unitário, serviço, componente ou E2E. Testes validam o
contrato observável e não detalhes incidentais de implementação.

### 5. Validação vermelha retorna ao planejamento

Uma falha é feedback, não autorização para editar código por tentativa. O
sintoma é registrado, seu impacto é avaliado e o plano recebe a decisão antes
de novos deltas em tasks, código ou testes.

### 6. A baseline permanece íntegra

Antes de uma evolução, lint, build, testes e E2E devem estar verdes. O incremento
preserva acessibilidade, TypeScript strict, integrações determinísticas e os
comportamentos já aceitos.

## Feedforward e Feedback

- **Feedforward** é o conjunto de guias disponíveis antes de cada execução:
  intenção, Constituição, spec, plano, tasks, instruções e critérios de aceite.
- **Feedback** é o retorno dos sensores depois da execução: compilação, lint,
  testes, CI, review, erros e outras evidências observadas.

Os dois alimentam o SDD em momentos diferentes. O replanejamento interpreta o
feedback e atualiza o feedforward que orientará a próxima execução. Um pedido
inicial nunca é classificado como feedback, e uma falha observada nunca é
reescrita como pedido.

## Governança

- Alterações nesta Constituição exigem justificativa explícita e review.
- Uma mudança constitucional deve ser feita antes dos artefatos afetados.
- Orientações locais podem detalhar estes princípios, mas não contradizê-los.

**Versão:** 1.1  
**Ratificada em:** 2026-07-30