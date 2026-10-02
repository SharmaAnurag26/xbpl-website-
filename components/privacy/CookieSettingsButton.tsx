"use client";

import { openConsentBanner } from "@/lib/consent";
import { analyticsEnabled } from "./ConsentManager";

/** Footer control to revisit the consent choice. Hidden when no analytics are configured. */
export function CookieSettingsButton() {
  if (!analyticsEnabled) return null;
  return (
    <li>
      <button
        type="button"
        onClick={openConsentBanner}
        className="rounded-sm text-sm text-muted transition-colors hover:text-brand-text"
      >
        Cookie settings
      </button>
    </li>
  );
}
