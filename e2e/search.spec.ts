import { type Page, expect, test } from "@playwright/test";

const location = {
  id: 1,
  name: "São Paulo",
  latitude: -23.55,
  longitude: -46.63,
  country: "Brasil",
  country_code: "BR",
  admin1: "São Paulo",
};

test.beforeEach(async ({ page }) => {
  await page.route("**/v1/search?**", (route) =>
    route.fulfill({ json: { results: [location] } }),
  );
  await page.route("**/v1/forecast?**", (route) =>
    route.fulfill({
      json: {
        current: {
          temperature_2m: 24,
          apparent_temperature: 25,
          weather_code: 1,
          wind_speed_10m: 10,
          relative_humidity_2m: 62,
        },
      },
    }),
  );
  await page.goto("/");
});

async function searchAndSelectCity(page: Page) {
  await page
    .getByRole("searchbox", { name: "Nome da cidade" })
    .fill("São Paulo");
  await page.getByRole("button", { name: "Buscar" }).click();
  await page
    .getByRole("button", { name: "Selecionar São Paulo, Brasil" })
    .click();
}

test("baseline: busca uma cidade e apresenta o clima atual", async ({
  page,
}) => {
  await searchAndSelectCity(page);

  const card = page.getByLabel("Clima atual para São Paulo");
  await expect(card).toBeVisible();
  await expect(card).toContainText("24°C");
  await expect(card).toContainText("Principalmente limpo");
  await expect(card).toContainText("Vento: 10 km/h");
  await expect(card).toContainText("Umidade: 62%");
});

test("CA1.4: apresenta erro quando a busca de cidades falha", async ({
  page,
}) => {
  await page.unroute("**/v1/search?**");
  await page.route("**/v1/search?**", (route) =>
    route.fulfill({ status: 500 }),
  );

  await page
    .getByRole("searchbox", { name: "Nome da cidade" })
    .fill("São Paulo");
  await page.getByRole("button", { name: "Buscar" }).click();

  await expect(page.getByRole("alert")).toHaveText(
    "Erro ao buscar localização: 500",
  );
});

test("CA2.5: apresenta loading enquanto consulta o clima", async ({ page }) => {
  await page.unroute("**/v1/forecast?**");
  let releaseForecast: () => void = () => {};
  const forecastRelease = new Promise<void>((resolve) => {
    releaseForecast = resolve;
  });
  await page.route("**/v1/forecast?**", async (route) => {
    await forecastRelease;
    await route.fulfill({
      json: {
        current: {
          temperature_2m: 24,
          apparent_temperature: 25,
          weather_code: 1,
          wind_speed_10m: 10,
          relative_humidity_2m: 62,
        },
      },
    });
  });

  const selection = searchAndSelectCity(page);
  await expect(page.getByText("Carregando clima...")).toBeVisible();
  releaseForecast();
  await selection;
  await expect(page.getByLabel("Clima atual para São Paulo")).toBeVisible();
});

test("CA2.6: apresenta erro quando a consulta do clima falha", async ({
  page,
}) => {
  await page.unroute("**/v1/forecast?**");
  await page.route("**/v1/forecast?**", (route) =>
    route.fulfill({ status: 503 }),
  );

  await searchAndSelectCity(page);

  await expect(page.getByRole("alert")).toHaveText("Erro ao buscar clima: 503");
});
