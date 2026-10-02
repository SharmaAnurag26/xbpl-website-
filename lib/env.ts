/**
 * Public (build-time inlined) configuration. Safe to import from client components.
 * Deliberately dependency-free: this module is in every page's bundle, so it must stay tiny.
 * `process.env.NEXT_PUBLIC_*` must be referenced literally so Next can inline it.
 */

type AnalyticsProvider = "none" | "plausible" | "ga4";

const blank = (v: string | undefined) => (v && v.trim() !== "" ? v.trim() : undefined);

function siteUrl(): string {
  const raw = blank(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://xbpl.in";
  try {
    return new URL(raw).origin;
  } catch {
    throw new Error(`NEXT_PUBLIC_SITE_URL is not a valid URL: "${raw}"`);
  }
}

function analytics(): AnalyticsProvider {
  const v = blank(process.env.NEXT_PUBLIC_ANALYTICS) ?? "none";
  if (v === "none" || v === "plausible" || v === "ga4") return v;
  throw new Error(`NEXT_PUBLIC_ANALYTICS must be none | plausible | ga4 (got "${v}")`);
}

function gaId(): string | undefined {
  const v = blank(process.env.NEXT_PUBLIC_GA_ID);
  if (v && !/^G-[A-Z0-9]+$/.test(v)) throw new Error(`NEXT_PUBLIC_GA_ID looks invalid: "${v}"`);
  return v;
}

export const publicEnv = {
  siteUrl: siteUrl(),
  analytics: analytics(),
  plausibleDomain: blank(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN),
  gaId: gaId(),
} as const;
