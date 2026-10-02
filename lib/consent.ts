/** Client-side consent storage: a first-party cookie, readable without JS frameworks. */
export type Consent = "granted" | "denied";

const COOKIE = "xbpl_consent";
const MAX_AGE = 60 * 60 * 24 * 180; // 180 days, then we ask again
export const OPEN_CONSENT_EVENT = "xbpl:open-consent";

export function readConsent(): Consent | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=(granted|denied)`));
  return (match?.[1] as Consent | undefined) ?? null;
}

export function writeConsent(value: Consent): void {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}

export function openConsentBanner(): void {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
