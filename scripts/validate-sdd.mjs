import { existsSync, readFileSync } from "node:fs";

const phase = process.argv[2] ?? "full";
const validPhases = new Set([
  "intent",
  "spec",
  "plan",
  "tasks",
  "feedback",
  "review",
  "full",
]);

if (!validPhases.has(phase)) {
  throw new Error(`Fase desconhecida: ${phase}`);
}

const files = {
  constitution: readFileSync("constitution.md", "utf8"),
  spec: readFileSync("specs/weather-app-spec.md", "utf8"),
  plan: readFileSync("plans/weather-app-plan.md", "utf8"),
  tasks: readFileSync("tasks/weather-app-tasks.md", "utf8"),
};

const acceptanceCriteria = ["CA5.1", "CA5.2", "CA5.3"];
const baselineCriteria = {
  F1: ["CA1.1", "CA1.2", "CA1.3", "CA1.4"],
  F2: ["CA2.1", "CA2.2", "CA2.3", "CA2.4", "CA2.5", "CA2.6"],
  F3: ["CA3.1", "CA3.2", "CA3.3", "CA3.4"],
  F4: ["CA4.1", "CA4.2", "CA4.3"],
};

function requireText(content, expected, source) {
  if (!content.includes(expected)) {
    throw new Error(`${source}: âncora ausente: ${expected}`);
  }
}

function requireCriterionReference(content, criterion, source) {
  const fullRange = /CA5\.1\s*[-–]\s*CA5\.3/;
  if (!content.includes(criterion) && !fullRange.test(content)) {
    throw new Error(`${source}: critério ausente: ${criterion}`);
  }
}

function validateConstitution() {
  for (const heading of [
    "# Constituição do Weather App",
    "## Princípios",
    "## Feedforward e Feedback",
    "## Governança",
  ]) {
    requireText(files.constitution, heading, "constitution");
  }
}

function validateIntent() {
  const path = "intentions/7-day-forecast.md";
  if (!existsSync(path)) {
    throw new Error(`intent: arquivo ausente: ${path}`);
  }

  const intent = readFileSync(path, "utf8");
  for (const heading of [
    "Intenção",
    "Valor esperado",
    "Resultados desejados",
    "Restrições",
    "Dúvidas",
  ]) {
    requireNonEmptySection(intent, heading, "intent");
  }

  for (const requestAnchor of [
    "cidade",
    "7 dias",
    "condição climática",
    "máxima",
    "mínima",
  ]) {
    requireText(intent.toLowerCase(), requestAnchor, "intent: solicitação");
  }
}

function validateSpec() {
  for (const [feature, criteria] of Object.entries(baselineCriteria)) {
    requirePattern(
      files.spec,
      new RegExp(`^### ${feature}:`, "m"),
      `spec baseline: funcionalidade ausente: ${feature}`,
    );
    for (const criterion of criteria) {
      requireText(files.spec, `**${criterion}:**`, "spec baseline");
    }
  }

  requirePattern(files.spec, /^### F5:/m, "spec: funcionalidade F5 ausente");
  requireText(files.spec, "Histórico", "spec");
  requireText(files.spec, "Contrato observável", "spec");

  for (const criterion of acceptanceCriteria) {
    requireCriterionScenario(files.spec, criterion);
  }
}

function validatePlan() {
  for (const criterion of acceptanceCriteria) {
    requireCriterionReference(files.plan, criterion, "plan");
  }

  for (const decision of [
    "WeatherData",
    "WeatherCard",
    "daily",
    "temperature_2m_max",
    "temperature_2m_min",
    "weather_code",
    "timezone=auto",
    "forecast_days=7",
    "Estratégia de testes",
  ]) {
    requireText(files.plan, decision, "plan");
  }
}

function validateTasks() {
  requireText(files.tasks, "Baseline concluída", "tasks baseline");
  for (let task = 1; task <= 8; task += 1) {
    requirePattern(
      files.tasks,
      new RegExp(`^\\| T${task} \\|`, "m"),
      `tasks baseline: T${task} ausente ou alterada`,
    );
  }

  const incrementalIds = new Set(
    [...files.tasks.matchAll(/\bT(\d+)\b/g)]
      .map((match) => Number(match[1]))
      .filter((id) => id > 8),
  );
  if (incrementalIds.size < 3) {
    throw new Error(
      "tasks: esperadas ao menos três tasks incrementais após T8",
    );
  }

  for (const criterion of acceptanceCriteria) {
    requireCriterionReference(files.tasks, criterion, "tasks");
  }
  requireText(files.tasks, "Depende", "tasks");
  requireText(files.tasks, "Critério de feito", "tasks");
  requirePattern(
    files.tasks,
    /Superfícies afetadas|Arquivos afetados|Arquivos ou superfícies/i,
    "tasks: superfícies afetadas ausentes",
  );
}

function requirePattern(content, pattern, message) {
  if (!pattern.test(content)) {
    throw new Error(message);
  }
}

function requireNonEmptySection(content, heading, source) {
  const headingMatch = new RegExp(`^#{2,4} ${heading}\s*$`, "im").exec(content);
  if (!headingMatch) {
    throw new Error(`${source}: seção ausente: ${heading}`);
  }

  const sectionStart = headingMatch.index + headingMatch[0].length;
  const remainingContent = content.slice(sectionStart);
  const nextHeading = remainingContent.search(/^#{1,6}\s+/m);
  const section = remainingContent.slice(
    0,
    nextHeading === -1 ? remainingContent.length : nextHeading,
  );
  if (!/\S/.test(section)) {
    throw new Error(`${source}: seção vazia: ${heading}`);
  }
}

function requireCriterionScenario(content, criterion) {
  const marker = `**${criterion}:**`;
  const start = content.indexOf(marker);
  if (start === -1) {
    throw new Error(`spec: critério ausente: ${criterion}`);
  }

  const nextCriterion = content.indexOf("\n- **CA", start + marker.length);
  const definition = content.slice(
    start,
    nextCriterion === -1 ? content.length : nextCriterion,
  );
  for (const keyword of ["DADO", "QUANDO", "ENTÃO"]) {
    requireText(definition.toUpperCase(), keyword, `spec ${criterion}`);
  }
}

function validateTestEvidence() {
  const evidenceFiles = [
    "src/services/weather.test.ts",
    "src/components/WeatherCard.test.tsx",
    "e2e/search.spec.ts",
  ];

  for (const path of evidenceFiles) {
    const content = readFileSync(path, "utf8");
    requireText(content, "expect", path);
    for (const criterion of acceptanceCriteria) {
      requireCriterionReference(content, criterion, path);
    }
  }

  const serviceTests = readFileSync(evidenceFiles[0], "utf8");
  requireText(serviceTests, "daily", evidenceFiles[0]);
  requireText(serviceTests, "forecast_days", evidenceFiles[0]);

  const baselineEvidence = {
    "src/components/SearchBar.test.tsx": ["CA1.1"],
    "src/hooks/useWeather.test.ts": ["CA1.2", "CA1.3", "CA2.5"],
    "src/components/WeatherCard.test.tsx": ["CA2.1", "CA2.4"],
    "e2e/search.spec.ts": ["baseline:", "CA1.4", "CA2.5", "CA2.6"],
  };
  for (const [path, anchors] of Object.entries(baselineEvidence)) {
    const content = readFileSync(path, "utf8");
    for (const anchor of anchors) {
      requireText(content, anchor, `${path}: evidência baseline`);
    }
  }
}

function validateFeedback() {
  const path = "feedback/7-day-forecast-loop.md";
  if (!existsSync(path)) {
    throw new Error(`feedback: arquivo ausente: ${path}`);
  }

  const feedback = readFileSync(path, "utf8");
  for (const heading of [
    "Comandos e estados",
    "Evidências",
    "Critérios afetados",
    "Decisão de planejamento",
    "Artefatos alterados",
    "Resultado da revalidação",
  ]) {
    requireNonEmptySection(feedback, heading, "feedback");
  }

  for (const command of [
    "pnpm lint",
    "pnpm build",
    "pnpm test",
    "pnpm test:e2e",
  ]) {
    requireText(feedback, command, "feedback");
  }
}

function validateReview() {
  const path = "review/7-day-forecast.md";
  if (!existsSync(path)) {
    throw new Error(`review: arquivo ausente: ${path}`);
  }

  const review = readFileSync(path, "utf8");
  const headings = ["Achados", "Matriz de rastreabilidade", "Resumo"];
  for (const heading of headings) {
    requireNonEmptySection(review, heading, "review");
  }

  const headingPositions = headings.map((heading) =>
    review.search(new RegExp(`^#{2,4} ${heading}\\s*$`, "im")),
  );
  if (
    !(
      headingPositions[0] < headingPositions[1] &&
      headingPositions[1] < headingPositions[2]
    )
  ) {
    throw new Error("review: Achados, Matriz e Resumo estão fora de ordem");
  }

  requireText(review, "|", "review: matriz de rastreabilidade");
  for (const criterion of acceptanceCriteria) {
    requireCriterionReference(review, criterion, "review");
  }
}

validateConstitution();

if (phase === "intent") {
  validateIntent();
  process.exit(0);
}

if (phase === "feedback") {
  validateFeedback();
  process.exit(0);
}

if (phase === "review") {
  validateReview();
  process.exit(0);
}

validateIntent();
validateSpec();
if (phase === "spec") process.exit(0);

validatePlan();
if (phase === "plan") process.exit(0);

validateTasks();
if (phase === "tasks") process.exit(0);

validateTestEvidence();
validateFeedback();

console.log(
  "Rastreabilidade F5: intenção → spec → plan → tasks → testes → feedback validada.",
);
