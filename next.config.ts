import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const analytics = process.env.NEXT_PUBLIC_ANALYTICS ?? "none";

// Third-party origins are allowed only for the analytics provider that is switched on.
const analyticsScriptSrc =
  analytics === "plausible"
    ? ["https://plausible.io"]
    : analytics === "ga4"
      ? ["https://www.googletagmanager.com"]
      : [];
const analyticsConnectSrc =
  analytics === "plausible"
    ? ["https://plausible.io"]
    : analytics === "ga4"
      ? [
          "https://*.google-analytics.com",
          "https://*.analytics.google.com",
          "https://www.googletagmanager.com",
        ]
      : [];

/**
 * Static CSP (no nonces) so every page can be statically generated.
 * 'unsafe-inline' for scripts is required by Next's inline bootstrap/RSC payload scripts
 * when nonces are not used — see docs/DECISIONS.md.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${analyticsScriptSrc.join(" ")}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' ${analyticsConnectSrc.join(" ")}`,
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
]
  .map((d) => d.trim())
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

const withMDX = createMDX({
  options: {
    // String form so the plugins are serialisable for Turbopack.
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
  },
});

export default withMDX(nextConfig);
