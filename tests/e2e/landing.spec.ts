import { expect, test } from "@playwright/test";

const timeout = 30_000;

test.describe("Landing smoke", () => {
  test("главная страница", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        name: "ПростоИИ — текст и картинки по подписке",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Начать за 1 ₽" }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Открыть приложение" }).first(),
    ).toBeVisible();
    await expect(page.getByTestId("hero-section")).toBeVisible();
  });

  test("страница тарифов", async ({ page }) => {
    await page.goto("/pricing");
    await expect(
      page.getByRole("heading", { name: "Прозрачные тарифы без сюрпризов" }),
    ).toBeVisible();
    await expect(page.getByTestId("pricing-table")).toBeVisible();
  });

  test("страница отмены", async ({ page }) => {
    await page.goto("/cancel");
    await expect(
      page.getByRole("heading", { name: "Отменить подписку" }),
    ).toBeVisible();
    await expect(page.getByLabel("Электронная почта аккаунта")).toBeVisible();
  });
});

test.describe("Visual snapshots", () => {
  test("hero", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle", { timeout });
    await expect(page.getByTestId("hero-section")).toHaveScreenshot(
      `hero-${testInfo.project.name}.png`,
      {
        timeout,
      },
    );
  });

  test("pricing", async ({ page }, testInfo) => {
    await page.goto("/pricing");
    await page.waitForLoadState("networkidle", { timeout });
    await expect(page.getByTestId("pricing-table")).toHaveScreenshot(
      `pricing-${testInfo.project.name}.png`,
      {
        timeout,
      },
    );
  });
});
