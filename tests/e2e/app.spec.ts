import { test, expect } from "@playwright/test";

test.describe("Dashboard", () => {
  test("shows key blocks and keeps layout within viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 720 });
    await page.goto("/app");
    await expect(page.getByRole("heading", { name: "Домашняя" })).toBeVisible();
    await expect(page.getByText("Последние результаты")).toBeVisible();
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 1;
    });
    expect(hasHorizontalScroll).toBeFalsy();
  });
});
