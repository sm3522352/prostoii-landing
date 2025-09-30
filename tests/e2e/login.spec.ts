import { test, expect } from "@playwright/test";

test.describe("Login page", () => {
  test("renders telegram login CTA", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: "Войдите через Telegram" })).toBeVisible();
    const openButton = page.getByRole("link", { name: /Открыть в Telegram/i });
    await expect(openButton).toHaveAttribute("href", /t.me/);
    await expect(page.getByText("Мы используем Telegram только для авторизации", { exact: false })).toBeVisible();
  });
});
