import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for smoke testing the landing and static pages.
 * Tests visit a selection of routes and verify the presence of
 * important elements and data attributes. Running these tests in CI
 * helps ensure that pages render without JavaScript errors and that
 * primary CTA buttons remain in the DOM. For more comprehensive
 * coverage, additional tests can be added later.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: [['list'], ['html']],
  webServer: {
    command: 'pnpm start',
    port: 3000
  },
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 12'] }
    }
  ]
});