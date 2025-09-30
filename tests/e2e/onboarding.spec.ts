import { test, expect } from "@playwright/test";

test.describe("Onboarding flow", () => {
  test("displays steps and allows skipping", async ({ page }) => {
    await page.goto("/onboarding");
    await expect(page.getByRole("heading", { name: "Несколько вопросов для точного старта" })).toBeVisible();
    await expect(page.getByText("Шаг 1 из", { exact: false })).toBeVisible();
    await page.getByRole("button", { name: "Далее" }).click();
    await expect(page.getByText("Шаг 2 из", { exact: false })).toBeVisible();
    await page.getByRole("button", { name: "Пропустить" }).click();
    await expect(page).toHaveURL(/\/app$/);
  });
});
