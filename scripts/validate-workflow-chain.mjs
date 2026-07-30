import { readFileSync } from "node:fs";

const stepTitles = [
  "Intenção",
  "Especificação",
  "Planejamento",
  "Tarefas",
  "Codificação",
  "Test e Hardening",
  "E2E",
  "Handoff de Feedback",
  "Revisão + Integração",
];

const steps = [
  ["1-step.yml", 1, 2, "intentions/7-day-forecast.md"],
  ["2-step.yml", 2, 3, "specs/weather-app-spec.md"],
  ["3-step.yml", 3, 4, "plans/weather-app-plan.md"],
  ["4-step.yml", 4, 5, "tasks/weather-app-tasks.md"],
  ["5-step.yml", 5, 6, "src/services/weather.test.ts"],
  ["6-step.yml", 6, 7, "src/components/WeatherCard.test.tsx"],
  ["7-step.yml", 7, 8, "e2e/search.spec.ts"],
  ["8-step.yml", 8, 9, "feedback/7-day-forecast-loop.md"],
];

function requireText(content, expected, source) {
  if (!content.includes(expected)) {
    throw new Error(`${source}: contrato ausente: ${expected}`);
  }
}

function rejectText(content, forbidden, source) {
  if (content.includes(forbidden)) {
    throw new Error(`${source}: conteúdo proibido: ${forbidden}`);
  }
}

const forbiddenDelegation = [
  "Selecione o agente",
  "Selecione **SDD",
  "por meio do agente",
  "SDD Spec Writer",
  "SDD Technical Planner",
  "SDD Change Reviewer",
];

const startWorkflow = readFileSync(
  ".github/workflows/0-start-exercise.yml",
  "utf8",
);
for (const expected of [
  "name: Step 0",
  'STEP_1_FILE: ".github/steps/1-step.md"',
  "for step in {1..9}",
  'gh workflow disable "Step $step"',
  'gh workflow enable "Step 1"',
]) {
  requireText(startWorkflow, expected, "0-start-exercise.yml");
}

const progressPaths = new Set();
for (const [file, current, next, progressPath] of steps) {
  const content = readFileSync(`.github/workflows/${file}`, "utf8");
  for (const expected of [
    `name: Step ${current}`,
    "  push:",
    "    branches-ignore:",
    "      - main",
    `      - "${progressPath}"`,
    `STEP_${next}_FILE: ".github/steps/${next}-step.md"`,
    'gh workflow disable "${{github.workflow}}"',
    `gh workflow enable "Step ${next}"`,
  ]) {
    requireText(content, expected, file);
  }

  if (progressPaths.has(progressPath)) {
    throw new Error(`${file}: gatilho duplicado: ${progressPath}`);
  }
  progressPaths.add(progressPath);
}

const firstStepWorkflow = readFileSync(".github/workflows/1-step.yml", "utf8");
requireText(
  firstStepWorkflow,
  "node scripts/validate-sdd.mjs intent",
  "1-step.yml",
);

const finalWorkflow = readFileSync(".github/workflows/9-last-step.yml", "utf8");
for (const expected of [
  "name: Step 9",
  "  pull_request:",
  "      - main",
  "    types: [opened, reopened, synchronize]",
  '      - "review/7-day-forecast.md"',
  "pnpm validate:sdd review",
  "finish-exercise.yml@v0.9.1",
]) {
  requireText(finalWorkflow, expected, "9-last-step.yml");
}
if (finalWorkflow.includes("gh workflow enable")) {
  throw new Error("9-last-step.yml: Step 9 não deve habilitar outro step");
}
progressPaths.add("review/7-day-forecast.md");

if (progressPaths.size !== 9) {
  throw new Error(
    `Esperados 9 gatilhos exclusivos; encontrados ${progressPaths.size}`,
  );
}

for (let index = 0; index < stepTitles.length; index += 1) {
  const step = index + 1;
  const lesson = readFileSync(`.github/steps/${step}-step.md`, "utf8");
  requireText(
    lesson,
    `## Step ${step}: ${stepTitles[index]} —`,
    `${step}-step.md`,
  );
  requireText(lesson, "feature/7-day-forecast", `${step}-step.md`);
  for (const diagramContract of [
    "```mermaid",
    "subgraph",
    "classDef",
    "style ",
  ]) {
    requireText(lesson, diagramContract, `${step}-step.md`);
  }
  if (step <= steps.length) {
    requireText(lesson, "branch atual não é `main`", `${step}-step.md`);
    requireText(lesson, steps[index][3], `${step}-step.md`);
  }
  for (const forbidden of forbiddenDelegation) {
    rejectText(lesson, forbidden, `${step}-step.md`);
  }
}

const firstLesson = readFileSync(".github/steps/1-step.md", "utf8");
requireText(firstLesson, "git checkout -b feature/7-day-forecast", "1-step.md");
for (const expected of [
  "No Explorer do VS Code",
  "```markdown",
  "Não use o terminal nem delegue essa criação ao Copilot",
  "pnpm validate:sdd intent",
]) {
  requireText(firstLesson, expected, "1-step.md");
}
const specLesson = readFileSync(".github/steps/2-step.md", "utf8");
for (const expected of [
  "substitua seu conteúdo pelo",
  "### F5: Previsão diária de 7 dias",
  "CA5.1",
  "Não delegue essa edição ao Copilot",
]) {
  requireText(specLesson, expected, "2-step.md");
}
rejectText(specLesson, "Selecione o agente", "2-step.md");
const planLesson = readFileSync(".github/steps/3-step.md", "utf8");
for (const expected of [
  "## Delta F5: previsão diária de 7 dias",
  "forecast_days=7",
  "### Estratégia de testes do delta",
  "Não delegue essa edição ao Copilot",
]) {
  requireText(planLesson, expected, "3-step.md");
}
rejectText(planLesson, "Selecione o agente", "3-step.md");

const tasksLesson = readFileSync(".github/steps/4-step.md", "utf8");
for (const expected of [
  "## Incremento F5: previsão diária de 7 dias",
  "| T9 |",
  "| T10 |",
  "| T11 |",
  "não delegue essa edição ao Copilot",
]) {
  requireText(tasksLesson, expected, "4-step.md");
}
rejectText(tasksLesson, "Peça ao planning agent", "4-step.md");

const serviceLesson = readFileSync(".github/steps/5-step.md", "utf8");
for (const expected of [
  "Execute T9",
  "intentions/7-day-forecast.md",
  "CA5.1",
  "forecast_days=7",
  "src/hooks/useWeather.test.ts",
  "fixture determinística",
  "Registrar feedback e replanejar",
]) {
  requireText(serviceLesson, expected, "5-step.md");
}

const componentLesson = readFileSync(".github/steps/6-step.md", "utf8");
for (const expected of [
  "Execute T10",
  "WeatherCard",
  "CA5.1",
  "CA5.2",
  "CA5.3",
  "Não altere",
  "E2E",
  "fixture determinística",
]) {
  requireText(componentLesson, expected, "6-step.md");
}

const e2eLesson = readFileSync(".github/steps/7-step.md", "utf8");
for (const expected of [
  "Execute T11",
  "Intercepte geocoding e",
  "CA5.1",
  "CA5.2",
  "CA5.3",
  "cenários baseline de busca, loading e erros",
  "Não use rede real",
]) {
  requireText(e2eLesson, expected, "7-step.md");
}

const feedbackLesson = readFileSync(".github/steps/8-step.md", "utf8");
for (const expected of [
  "# Loop de feedback: previsão de 7 dias",
  "<verde ou vermelho>",
  "## Decisão de planejamento",
  "Não delegue o preenchimento ao Copilot",
]) {
  requireText(feedbackLesson, expected, "8-step.md");
}
for (const forbidden of ["SDD Technical Planner"]) {
  rejectText(feedbackLesson, forbidden, "8-step.md");
}
const finalLesson = readFileSync(".github/steps/9-step.md", "utf8");
for (const expected of [
  "# Review: previsão de 7 dias",
  "## Matriz de rastreabilidade",
  "<status>",
  "Não delegue a inspeção ao Copilot",
]) {
  requireText(finalLesson, expected, "9-step.md");
}
rejectText(finalLesson, "SDD Change Reviewer", "9-step.md");
requireText(finalLesson, "--head feature/7-day-forecast", "9-step.md");
requireText(
  finalLesson,
  "git push -u origin feature/7-day-forecast",
  "9-step.md",
);

const guard = readFileSync(".github/workflows/sdd-guard.yml", "utf8");
for (const command of [
  "pnpm lint",
  "pnpm build",
  "pnpm test",
  "pnpm test:e2e",
  "pnpm validate:workflows",
  "pnpm validate:sdd full",
]) {
  requireText(guard, command, "sdd-guard.yml");
}

const deploy = readFileSync(".github/workflows/deploy-pages.yml", "utf8");
for (const expected of [
  "  workflow_run:",
  '    workflows: ["SDD Guard"]',
  "github.event.workflow_run.conclusion == 'success'",
]) {
  requireText(deploy, expected, "deploy-pages.yml");
}

console.log(
  "Encadeamento, gatilhos, títulos, Guard e deploy dos Steps 0 → 9 validados.",
);
