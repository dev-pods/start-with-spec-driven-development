## Review

_Parabéns! Você evoluiu um produto existente sem perder a intenção que já estava
registrada._

<img src="../images/jetpacktocat.png" alt="Jetpacktocat celebrando a conclusão" width="180" align="right">

Você começou com um Weather App funcional e terminou com um incremento completo.
O valor do exercício está no diff entre os dois estados.

### O que você realizou

- O pedido foi registrado antes da solução.
- A mesma spec ganhou F5, a previsão diária de 7 dias, sem perder F1–F4: busca
	de cidade, clima atual, conversão de temperatura e condições WMO.
- O plano registrou impacto em dados, API, UI e testes.
- Tasks pequenas conduziram duas fatias de implementação.
- Testes determinísticos provaram o comportamento e a regressão.
- Todo feedback vermelho, quando existiu, voltou primeiro ao Plan.
- O pedido inicial aparece como intenção, a fonte inicial do SDD, não como
	feedback de validação.
- O PR reuniu intenção, decisão, execução e evidência.

Esse é o sentido de uma spec viva e ancorada: ela não nasce perfeita nem vira
documentação esquecida. Ela acompanha o produto e torna cada mudança explicável.

### O que levar para o próximo projeto

- Comece mudanças pelo estado atual, não por um documento novo ou por código.
- Use IDs estáveis para conectar intenção, decisão, execução e evidência.
- Trate validação vermelha como feedback de planejamento.
- Revise o delta nas duas direções: do pedido ao teste e do código à spec.

### O que vem a seguir?

- Aplique o mesmo fluxo a uma mudança ambígua do seu produto e compare o tempo
	de review quando o PR contém a cadeia completa de evidências.
- Explore o [spec-kit](https://github.com/github/spec-kit), o
	[OpenSpec](https://github.com/Fission-AI/OpenSpec) e o
	[BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD).
- Releia o PR final e identifique quais decisões poderiam ser automatizadas sem
	reduzir a qualidade da revisão humana.