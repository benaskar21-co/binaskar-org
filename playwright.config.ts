import { defineConfig, devices } from "@playwright/test";

// Dedicated port so tests never reuse another project's dev server on 3000.
const PORT = process.env.E2E_PORT ?? "3200";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: `npm run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}/ar`,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
