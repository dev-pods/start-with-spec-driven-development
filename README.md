# Spec-Driven Development: Construindo com Intenção

_Aprenda a metodologia Spec-Driven Development (SDD) construindo um Weather App real, do brief à entrega._

## Bem-vindo(a)

- **Para quem é este exercício**: Desenvolvedores que querem estruturar melhor o processo de desenvolvimento com IA, passando de "código primeiro" para "spec primeiro"
- **O que você vai aprender**:
  - A metodologia SDD de ponta a ponta, do brief à entrega (fluxo completo no diagrama abaixo)
  - Como escrever especificações com critérios de aceite testáveis
  - Como reconhecer esses conceitos em ferramentas reais de SDD ([spec-kit](https://github.com/github/spec-kit), [OpenSpec](https://github.com/Fission-AI/OpenSpec), [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD))
- **O que você vai construir**: Um Weather App funcional em React + TypeScript + Vite consumindo a API Open-Meteo (sem necessidade de API key)
- **Pré-requisitos**:
  - Conhecimento básico de Git e GitHub
  - Familiaridade com TypeScript/React (nível iniciante é suficiente)
  - Conta no GitHub com acesso ao GitHub Copilot (recomendado)

- **Duração**: Este exercício leva **cerca de 1 hora** para ser concluído.

## Visão geral: o fluxo SDD

```mermaid
flowchart LR
    subgraph planejamento["Planejamento"]
        direction LR
        A[Brief] --> B[Spec] --> C[Plan] --> D[Tasks]
    end

    subgraph construcao["Construção"]
        E[Code]
    end

    subgraph testes["Testes"]
        direction LR
        F[Test] --> G[Hardening] --> H[E2E]
    end

    subgraph iteracao["Iteração"]
        K{Tudo verde?}
    end

    subgraph entrega["Entrega"]
        direction LR
        I[Review] --> J[Ship]
    end

    D --> E --> F
    H --> K
    K -->|Sim| I
    K -.->|Não: feedback replaneja| C

    classDef planning fill:#1565c0,stroke:#0d47a1,color:#ffffff
    classDef build fill:#6a1b9a,stroke:#4a148c,color:#ffffff
    classDef testing fill:#ef6c00,stroke:#e65100,color:#ffffff
    classDef iterate fill:#f9a825,stroke:#f57f17,color:#000000
    classDef release fill:#2e7d32,stroke:#1b5e20,color:#ffffff

    class A,B,C,D planning
    class E build
    class F,G,H testing
    class K iterate
    class I,J release

    style planejamento fill:#e3f2fd,stroke:#1565c0,color:#0d47a1
    style construcao fill:#f3e5f5,stroke:#6a1b9a,color:#4a148c
    style testes fill:#fff3e0,stroke:#ef6c00,color:#e65100
    style iteracao fill:#fffde7,stroke:#f9a825,color:#f57f17
    style entrega fill:#e8f5e9,stroke:#2e7d32,color:#1b5e20
```

> **O princípio que costura o fluxo**: cada etapa deriva da spec — o plano a detalha, as tasks a fatiam, o código a executa e os testes a verificam. Se um comportamento não está na spec, ele não entra no código; se é um critério de aceite, existe um teste que o prova.

## Neste exercício, você irá:

As etapas do diagrama acontecem em **9 steps práticos**, cada step constrói um pedaço real do Weather App:

**Planejamento**

1. **Brief** — configurar o ambiente e entender por que não começar pelo código
2. **Spec** — escrever a especificação com critérios de aceite testáveis
3. **Plan** — transformar a spec em um plano técnico com estratégia de testes
4. **Tasks** — quebrar o plano em tarefas verificáveis rastreadas à spec
5. **Code** — delegar ao agente a construção do app inteiro, guiado pela spec e pelas tasks
6. **Test + Hardening** — verificar cada camada (rede, estado, componente) e cobrir os edge cases da spec
7. **E2E** — validar a spec pela perspectiva do usuário
8. **Iterate** — rodar o loop de feedback (validar → registrar → replanejar → reimplementar) até tudo ficar verde
9. **Review + Ship** — fazer review rastreável e configurar o deploy

### Como iniciar o exercício

Copie o exercício para sua conta, aguarde **cerca de 20 segundos** para a Mona preparar a primeira lição e depois **atualize a página**.

[![](https://img.shields.io/badge/Copiar%20Exercício-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/new?template_owner=dev-pods&template_name=start-with-spec-driven-development&owner=%40me&name=skills-start-with-spec-driven-development&description=Exercise:+Spec-Driven+Development&visibility=public)

<details>
<summary>Problemas para começar?</summary><br/>

Ao copiar o exercício, recomendamos as seguintes configurações:

- Para owner, escolha sua conta pessoal ou uma organização.
- Recomendamos criar um repositório público, pois repositórios privados consomem minutos de Actions.

Se o exercício não estiver pronto em 20 segundos, verifique a aba [Actions](../../actions).

- Verifique se há um job em execução. Às vezes demora um pouco mais.
- Se a página mostrar um job com falha, abra uma issue. Você encontrou um bug!

</details>
