import { test, expect } from '@playwright/test';

test.describe('Landing pages', () => {
  test('Home page loads and contains CTA buttons', async ({ page }) => {
    await page.goto('/');
    // Hero section CTAs
    const trialBtn = await page.getByRole('link', { name: /начать/i });
    await expect(trialBtn).toHaveAttribute('data-goal', 'click_trial');
    const openAppBtn = await page.getByRole('link', { name: /открыть приложение/i });
    await expect(openAppBtn).toHaveAttribute('data-goal', 'click_open_app');
  });

  test('Pricing page loads and displays image packs', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page).toHaveTitle(/тарифы/i);
    // Expect to find pack purchase buttons
    await expect(page.locator('[data-goal="click_buy_pack_10"]')).toBeVisible();
    await expect(page.locator('[data-goal="click_buy_pack_20"]')).toBeVisible();
    await expect(page.locator('[data-goal="click_buy_pack_50"]')).toBeVisible();
  });

  test('Offer and privacy pages load', async ({ page }) => {
    await page.goto('/docs/offer');
    await expect(page.getByRole('heading', { name: /оферты/i, level: 1 })).toBeVisible();
    await page.goto('/docs/privacy');
    await expect(page.getByRole('heading', { name: /конфиденциальности/i, level: 1 })).toBeVisible();
  });

  test('Cancel page has email form', async ({ page }) => {
    await page.goto('/cancel');
    const input = page.getByPlaceholder('Ваш e-mail');
    await expect(input).toBeVisible();
    const submit = page.getByRole('button', { name: /отправить запрос/i });
    await expect(submit).toBeVisible();
  });
});