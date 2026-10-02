"use client";

import { Cookie } from "lucide-react";
import NextLink from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { OPEN_CONSENT_EVENT, readConsent, writeConsent, type Consent } from "@/lib/consent";
import { publicEnv } from "@/lib/env";

const provider = publicEnv.analytics;
export const analyticsEnabled =
  (provider === "plausible" && !!publicEnv.plausibleDomain) ||
  (provider === "ga4" && !!publicEnv.gaId);

/**
 * Cookie banner + analytics loader. Analytics scripts are only ever rendered after the
 * visitor explicitly accepts. When no provider is configured, nothing renders at all.
 */
export function ConsentManager() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!analyticsEnabled) return;
    const stored = readConsent();
    // One-off read of an external store (cookie) at mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(stored);
    setOpen(stored === null);
    const reopen = () => {
      setOpen(true);
      requestAnimationFrame(() => panelRef.current?.focus());
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!analyticsEnabled) return null;

  function choose(value: Consent) {
    writeConsent(value);
    setConsent(value);
    setOpen(false);
    // Withdrawing consent after scripts loaded: reload so they are gone.
    if (value === "denied" && consent === "granted") window.location.reload();
  }

  return (
    <>
      {consent === "granted" ? <AnalyticsScripts /> : null}
      {open ? (
        <div
          ref={panelRef}
          role="region"
          aria-label="Cookie consent"
          tabIndex={-1}
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl animate-[rise-in_300ms_var(--ease-out-soft)] rounded-card border border-line bg-white p-5 shadow-[0_20px_50px_-20px_rgb(6_22_46/0.45)] outline-none sm:inset-x-6 sm:bottom-6"
        >
          <div className="flex gap-3">
            <Cookie aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
            <div>
              <p className="font-display text-[0.95rem] font-semibold text-ink">
                Your privacy, your choice
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                We&apos;d like to use analytics cookies to understand how this site is used and
                improve it. They are only set if you accept. Read our{" "}
                <NextLink
                  href="/privacy"
                  className="font-medium text-brand-text underline underline-offset-2"
                >
                  Privacy Policy
                </NextLink>
                .
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => choose("denied")}>
              Reject
            </Button>
            <Button size="sm" onClick={() => choose("granted")}>
              Accept analytics
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}

function AnalyticsScripts() {
  if (provider === "plausible" && publicEnv.plausibleDomain) {
    return (
      <Script
        id="plausible"
        src="https://plausible.io/js/script.js"
        data-domain={publicEnv.plausibleDomain}
        strategy="afterInteractive"
      />
    );
  }
  if (provider === "ga4" && publicEnv.gaId) {
    return (
      <>
        <Script
          id="ga4-src"
          src={`https://www.googletagmanager.com/gtag/js?id=${publicEnv.gaId}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${publicEnv.gaId}',{anonymize_ip:true});`}
        </Script>
      </>
    );
  }
  return null;
}
