# XBPL Website: Build Plan

Companion to `docs/ANALYSIS.md`. Status: **awaiting "go"**.

## 1. Stack (as briefed, with notes)

| Area       | Choice                                                                                                                             | Note                                                                                               |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Framework  | Next.js latest stable, App Router, RSC by default, TS `strict` + `noUncheckedIndexedAccess`                                        | Exact version pinned at scaffold time                                                              |
| Styling    | Tailwind CSS v4 (`@theme` tokens as CSS variables) + shadcn/ui primitives                                                          | shadcn only where it earns its place: Sheet (mobile drawer), Select, Label, Form bits              |
| Motion     | `motion` (`motion/react`) with `LazyMotion` + `domAnimation`                                                                       | Confined to small client islands                                                                   |
| Icons      | lucide-react                                                                                                                       | Imported per icon; tree-shaken                                                                     |
| Fonts      | `next/font/google`: Sora (display), Inter (body)                                                                                   | `display: swap`, subset latin, CSS variables                                                       |
| Forms      | react-hook-form + zod (shared schema client/server)                                                                                | Server Actions                                                                                     |
| Email      | Resend (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, optional `RESEND_AUDIENCE_ID`)                                 | No-op transport when `E2E=1` so tests never send mail                                              |
| Rate limit | `@upstash/ratelimit` if `UPSTASH_REDIS_REST_URL/TOKEN` set, else in-memory sliding window                                          | In-memory is per-instance on Vercel (documented)                                                   |
| MDX        | `@next/mdx` + `remark-frontmatter` + `remark-mdx-frontmatter` + `remark-gfm`; frontmatter validated with zod at build              | Listing reads frontmatter via `gray-matter`; pages statically generated via `generateStaticParams` |
| Tooling    | pnpm, ESLint (flat config, `next/core-web-vitals` + `typescript-eslint` strict), Prettier (+ tailwind plugin), Husky + lint-staged |                                                                                                    |
| Tests      | Playwright + `@axe-core/playwright`                                                                                                | Runs against `next build && next start`                                                            |
| Images     | `sharp` script for blur placeholders + favicon/OG generation                                                                       |                                                                                                    |

**Environment findings:** pnpm is not installed (Node 24.14 and corepack 0.34 are). Phase A will run `corepack enable pnpm`, falling back to `npm i -g pnpm` if Windows permissions block it. The folder is **not a git repo**, and Husky needs one, so Phase A runs `git init` (I'll leave committing to you).

## 2. Folder structure

```
xbpl-website/
├─ app/
│  ├─ layout.tsx                 # fonts, Header/Footer, skip link, consent, JSON-LD Organization+WebSite
│  ├─ page.tsx                   # Home
│  ├─ learning/page.tsx
│  ├─ cloud/page.tsx
│  ├─ security/page.tsx
│  ├─ about/page.tsx
│  ├─ insights/page.tsx          # tabs via ?category= (static default + client filter, see §5)
│  ├─ insights/[slug]/page.tsx   # SSG, Article + Breadcrumb JSON-LD
│  ├─ contact/page.tsx
│  ├─ privacy/page.tsx  terms/page.tsx
│  ├─ not-found.tsx  error.tsx  global-error.tsx
│  ├─ actions/contact.ts  actions/newsletter.ts
│  ├─ sitemap.ts  robots.ts  manifest.ts
│  ├─ opengraph-image.tsx        # branded OG (next/og), per-article variant in [slug]
│  ├─ icon.svg  apple-icon.png  favicon.ico
│  └─ globals.css                # Tailwind v4 @theme tokens, base, utilities (glow, grid texture)
├─ components/
│  ├─ layout/    Header, NavLinks, MobileNav, Footer, SkipLink, Container, Section
│  ├─ brand/     Logo (variant: color | on-dark | mono)
│  ├─ ui/        Button, Input, Textarea, Select, Label, FieldError (shadcn-based)
│  ├─ sections/  Hero, StatBar, SectionHeading, ServiceCard, CapabilityCard, FeatureIconCard,
│  │             ProcessSteps, TechLogoStrip, CTABand, KeywordLadder
│  ├─ insights/  ArticleCard, CategoryTabs, NewsletterForm, ArticleBody (MDX components)
│  ├─ contact/   ContactForm, ContactDetails, LocationsMap
│  ├─ media/     ImageSlot
│  ├─ motion/    Reveal, CountUp, MotionProvider   ("use client" islands)
│  └─ privacy/   CookieConsent, Analytics
├─ content/
│  ├─ site.ts            # nav, footer, contact details, socials, stats   (TODO markers)
│  ├─ pages/home.ts learning.ts cloud.ts security.ts about.ts insights.ts contact.ts legal.ts
│  ├─ insights/*.mdx     # 6 sample articles
│  └─ types.ts           # typed content schema (no `any`)
├─ lib/        seo.ts (metadata builder, JSON-LD), insights.ts, email.ts, rate-limit.ts,
│              validation.ts (zod schemas), env.ts (zod-validated env), images.ts, cn.ts
├─ public/
│  ├─ images/<page>/<slot>.webp     # empty until assets arrive; fallbacks render meanwhile
│  ├─ brand/ logo.svg logo-on-dark.svg logo-mono-white.svg logo-mark.svg
│  └─ tech/  aws.svg azure.svg ...
├─ scripts/  gen-image-manifest.ts (blur data + dimensions → lib/image-manifest.json),
│            gen-icons.ts (favicon set from logo-mark.svg), check-contrast.ts
├─ tests/    routes.spec.ts, contact.spec.ts, a11y.spec.ts, nav.spec.ts
├─ docs/     ANALYSIS.md PLAN.md CONTENT_TODO.md IMAGE_BRIEF.md DECISIONS.md
├─ reference/  (mockup + logo, kept out of the build)
└─ .env.example  next.config.ts  mdx-components.tsx  playwright.config.ts  README.md
```

## 3. Key architecture decisions

1. **Content-as-code:** every string lives in `content/*.ts`, typed by `content/types.ts`. Components receive content via props and never import copy directly, except page files that wire content to sections. Icons are referenced by a string key from a typed icon map, so the content files stay data-only.
2. **ImageSlot system:** `<ImageSlot slot="home/hero" alt="…" />` looks up `lib/image-manifest.json`, which is generated by `scripts/gen-image-manifest.ts` at `prebuild`. If the file exists, it renders `next/image` with intrinsic width/height + `blurDataURL`. If not, it renders a designed CSS gradient/glow fallback with the same aspect ratio, so there's no CLS, no 404s, and the page still looks finished. Dropping a `.webp` into `public/images/...` is the whole workflow.
3. **Logo:** hand-built SVG recreation. The X is two gradient blades and "BPL" uses geometric navy strokes with the tagline as outlined paths, so it doesn't depend on a font. Variants: color (light bg), on-dark (gradient X + white BPL/tagline, no CSS filters), mono-white, and a mark (X only) for favicons. It's a faithful approximation; if the client has the original vector, that replaces it.
4. **Motion:** `Reveal` (fade/translate 12px on intersection, once) wraps below-the-fold sections only. `CountUp` server-renders the final value ("2,500+"), so the HTML is correct without JS and the animation only replays it. Hero glows are pure CSS keyframes. Everything is disabled under `prefers-reduced-motion`.
5. **Client components (the full list):** MobileNav, Reveal, CountUp, CategoryTabs filter, ContactForm, NewsletterForm, CookieConsent, Analytics, error.tsx. Everything else is RSC.

## 4. Forms and email

- A shared zod schema validates on both the client (RHF resolver) and the server (the action re-parses `FormData`; the client is never trusted).
- Protections: a hidden honeypot field (fake success on fill), a minimum fill-time check (signed timestamp), rate limiting (5 / 10 min / IP), length caps, stripping control characters, and HTML-escaping all values in the email template. Plain text + escaped HTML is sent through Resend.
- Accessible errors: `aria-invalid`, `aria-describedby`, an error summary that receives focus on submit failure, and a live region for the success/failure status.
- Missing env in production → the action returns a graceful error and logs on the server. `E2E=1` → no-op transport.

## 5. Insights

- Frontmatter: `title, slug?, category (enum of the 5), tags?, date, excerpt, cover (slot key), author?, draft?`. zod fails the build on invalid frontmatter.
- `/insights` is statically generated with all articles in the HTML. `CategoryTabs` filters on the client and syncs to `?category=` (shareable, back-button friendly). Reading `searchParams` on the server would make the page dynamic, so that's avoided. Without JS, all articles show (the "All" state).
- `/insights/[slug]`: SSG, reading time, a breadcrumb, related articles from the same category, Article + BreadcrumbList JSON-LD, and a per-article OG image.

## 6. SEO, security, privacy

- `lib/seo.ts` `buildMetadata({ title, description, path, image })` produces canonical, OG, and Twitter cards. `metadataBase` comes from `NEXT_PUBLIC_SITE_URL`.
- `sitemap.ts` covers static routes + articles. `robots.ts` disallows everything on non-production deployments (`VERCEL_ENV !== 'production'`).
- JSON-LD: Organization + WebSite (root), BreadcrumbList (inner pages), Article (posts).
- Headers in `next.config.ts`: HSTS (2y, includeSubDomains, preload), X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy (camera/mic/geolocation off, etc.), COOP same-origin, and CSP.
- **CSP trade-off:** nonce-based CSP would make every page dynamic and hurt performance (and the Lighthouse target). I'll use a static CSP instead: `default-src 'self'; script-src 'self' 'unsafe-inline' <analytics host>; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self' <analytics host>; font-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests`. `'unsafe-inline'` for scripts is needed for Next's inline bootstrap without nonces. The site has no user-generated HTML, which limits the XSS surface. This will be recorded in `DECISIONS.md`.
- Cookie consent: a small accessible banner (Accept / Reject / Manage), with the choice stored in a first-party cookie. `Analytics` mounts Plausible or GA4 (`NEXT_PUBLIC_ANALYTICS=plausible|ga4|none`) **only after** consent. A footer "Cookie settings" link reopens the banner.

## 7. Phases (each ends with `pnpm build && pnpm lint && pnpm test` + a summary)

| Phase             | Scope                                                                                                                                                                                                                                                                                                                 | Exit criteria                                                                             |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **A: Foundation** | pnpm/git setup, Next scaffold, strict TS, ESLint/Prettier/Husky, Tailwind v4 tokens + contrast script, fonts, logo SVGs, icons/favicons, ImageSlot + manifest script, Header/MobileNav/Footer/SkipLink, full component library, `content/types.ts`, `/styleguide` dev-only route (excluded from prod build + sitemap) | Build and lint pass; the styleguide shows every component at 360 and 1440px               |
| **B: Home**       | Home content + page; screenshot at 1440 and 360 with Playwright, compare against the mockup, fix differences                                                                                                                                                                                                          | Visual parity checklist ticked                                                            |
| **C: Pages**      | Learning, Cloud, Security, About, Insights (MDX + 6 articles + `[slug]`), Contact (form, details, SVG map), privacy/terms, 404/error                                                                                                                                                                                  | All routes render; contact works end-to-end with Resend in dev                            |
| **D: Hardening**  | SEO/JSON-LD/sitemap/robots/OG, headers/CSP, consent + analytics, perf pass (bundle analyzer, LCP), a11y pass, Playwright route + form + axe suites, Lighthouse mobile runs                                                                                                                                            | Lighthouse ≥95 in all 4 categories on every page (local prod build), axe has 0 violations |
| **E: Handover**   | README (setup, env, Vercel deploy, editing content, adding articles, adding images), `CONTENT_TODO.md`, `IMAGE_BRIEF.md`, final "what I still need from you" checklist                                                                                                                                                | Docs complete                                                                             |

## 8. What I need from you (none of these block Phase A)

1. Confirmation of the copy decisions in ANALYSIS §8 (especially A4, A6, A7, A9). You can answer later.
2. The static prototype, if it exists, so I can cross-check copy.
3. Later: real images, stats confirmation, contact details, LinkedIn URL, domain, and Resend credentials.
