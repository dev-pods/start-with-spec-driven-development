## Revisão: Spec-Driven Development na Prática

_Parabéns! Você concluiu o hands-on de Spec-Driven Development construindo um Weather App completo do brief à entrega._

<img src="https://octodex.github.com/images/jetpacktocat.png" alt="celebrate" width=200 align=right>

### O que você construiu

Você percorreu o fluxo SDD completo — e tem os artefatos para provar:

- **Brief & Spec** — problema documentado e critérios de aceite testáveis (`specs/`)
- **Plan & Tasks** — plano técnico fatiado em unidades verificáveis (`plans/`, `tasks/`)
- **Code** — implementação guiada pelas tasks, incluindo a previsão de 7 dias (`src/`)
- **Test, Hardening & E2E** — verificação de que a spec foi cumprida (`src/lib/*.test.ts`, `e2e/`)
- **Iterate** — o loop de feedback que retroalimentou o plano e as tasks até todas as validações passarem (`feedback/`)
- **Review & Ship** — review rastreável, CI que enforça SDD e deploy (`.github/`)

### O princípio que ficou

> **Cada etapa deriva da spec** — o plano a detalha, as tasks a fatiam, o código a executa e os testes a verificam. Se um comportamento não está na spec, ele não entra no código; se é um critério de aceite, existe um teste que o prova.

### O que vem a seguir?

- [sdd-weather-app](https://github.com/dev-pods/sdd-weather-app) — a versão completa, com 11 módulos e 8h de conteúdo
- Leve o SDD para ferramentas reais: [spec-kit](https://github.com/github/spec-kit), [OpenSpec](https://github.com/Fission-AI/OpenSpec) e [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD)
- [GitHub Skills](https://skills.github.com) — outros exercícios hands-on
