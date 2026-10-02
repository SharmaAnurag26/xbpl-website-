import { test as base, expect } from "@playwright/test";

export const routes = [
  { path: "/", h1: /Build/i },
  { path: "/learning", h1: /Technology capability/i },
  { path: "/cloud", h1: /cloud environment/i },
  { path: "/security", h1: /Move forward securely/i },
  { path: "/about", h1: /possibilities/i },
  { path: "/insights", h1: /smarter tomorrow/i },
  { path: "/insights/cloud-migration-key-considerations", h1: /Cloud Migration/i },
  { path: "/contact", h1: /build what's next/i },
  { path: "/privacy", h1: /Privacy Policy/i },
  { path: "/terms", h1: /Terms of Use/i },
] as const;

type Fixtures = { consentChoice: "granted" | "denied" | null };

/**
 * Every test starts with consent already declined so the cookie banner doesn't cover the
 * page. Consent tests override `consentChoice` with `null` to see the banner.
 */
export const test = base.extend<Fixtures>({
  consentChoice: ["denied", { option: true }],
  context: async ({ context, consentChoice, baseURL }, use) => {
    if (consentChoice && baseURL) {
      await context.addCookies([{ name: "xbpl_consent", value: consentChoice, url: baseURL }]);
    }
    await use(context);
  },
});

export { expect };
