import { defineConfig, devices } from "@playwright/test";

const PORT = 3200;

/**
 * Tests run against a production build (`next build && next start`) so they exercise
 * exactly what ships. E2E=1 swaps the email transport for a no-op.
 * Set PW_SKIP_BUILD=1 to reuse an existing .next build.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `${process.env.PW_SKIP_BUILD ? "" : "pnpm run build && "}pnpm exec next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
    // Analytics are enabled for the test build so the consent flow can be verified;
    // the Plausible script request is intercepted in tests and never leaves the machine.
    env: {
      E2E: "1",
      NEXT_PUBLIC_ANALYTICS: "plausible",
      NEXT_PUBLIC_PLAUSIBLE_DOMAIN: "xbpl.test",
    },
  },
});
