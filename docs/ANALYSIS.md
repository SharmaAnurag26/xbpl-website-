# XBPL Website: Design Analysis

Source material: `reference/mockup.jpeg` (7-page composite, roughly 1450×1090 px overall, so each page is about 330–440 px wide) and `reference/logo.jpeg`.
`reference/static-prototype/` was **not provided**, so the color tokens come from the brief and the copy is transcribed from the mockup (see §7).

---

## 1. Design language

**Positioning:** premium B2B enterprise tech. The tone is confident, calm and "future-forward". The visual vocabulary has three parts:

1. **Dark, cinematic heroes.** Deep navy fields with electric-blue light (light trails, glowing clouds, shields, holographic UI) and a human subject or iconic object on the right. Copy sits on the darker left side.
2. **Clean light content sections.** White or very soft blue-grey backgrounds, generous whitespace, small line icons in blue inside pale rounded tiles, short labels, no long paragraphs.
3. **Dark "band" sections** that punctuate each page (statement + CTA). They use glow, wave or particle imagery, rounded 16px containers that sit inside the page container (not full-bleed), and a gradient CTA button.

Rhythm on every page: **dark hero → light grid section(s) → dark band/CTA → footer.** The rhythm is very consistent, so a small component set can cover all 7 pages.

**Signature motifs**

- Blue-to-cyan gradient (from the logo "X") on display words: BUILD / EVOLVE / LEAD, and "transformation" in the home hero.
- Stacked uppercase "keyword ladders" at the right of heroes: `PEOPLE / TECHNOLOGY / SECURITY / A BRIGHTER TOMORROW`, `SKILLS / PEOPLE / POSSIBILITIES`, `AGILE / SCALABLE / RESILIENT`, `DETECT / PROTECT / RESPOND / STAY AHEAD`, `NEW PERSPECTIVES / PRACTICAL INSIGHTS`.
- Light streaks or beams (the home hero road, the home band's wave, the chevron process strip on Learning).
- Icon tiles: about a 40px rounded-square tile, pale blue fill, blue 1.5px line icon, label of 1–2 short lines centered below.

## 2. Color system

| Token    | Hex       | Use                                              |
| -------- | --------- | ------------------------------------------------ |
| `navy`   | `#06162e` | Hero and band base, footer text, darkest surface |
| `navy-2` | `#0a2448` | Secondary dark surface, card-on-dark             |
| `brand`  | `#0879f9` | Icons, active nav, decorative accents            |
| `cyan`   | `#08cfe3` | Gradient end, glows, highlights on dark          |
| `ink`    | `#07182f` | Body headings on light                           |
| `muted`  | `#65758d` | Secondary text on light                          |
| `line`   | `#e4eaf2` | Borders, dividers                                |
| `soft`   | `#f5f8fc` | Section and card tint backgrounds                |

Gradients: primary button `135deg #066ef1 → #08c6df`; dark hero `navy → #0a2c59 → #0a6ec7`.

**Contrast issues found (WCAG 2.2 AA, measured):**

| Pair                                            | Ratio  | Verdict                                                                                               |
| ----------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| `brand #0879f9` text on white                   | ~4.1:1 | ❌ Fails for body-size text. Mockup uses it for small links ("Explore Learning →") and card subtitles |
| `muted #65758d` on white                        | ~4.7:1 | ✅ barely                                                                                             |
| `muted #65758d` on `soft #f5f8fc`               | ~4.4:1 | ❌ fails for small text                                                                               |
| White text on `#08c6df` (button gradient end)   | ~2.1:1 | ❌ fails                                                                                              |
| White text on `#066ef1` (button gradient start) | ~4.7:1 | ✅                                                                                                    |

**Refinement (proposed):** keep every token visually but add text-safe variants:

- `brand-text #0663d4` (~5.6:1 on white) for links and small blue labels. `brand` stays for icons and large display text.
- `muted-strong` (~#56667e) wherever muted text sits on `soft`.
- Button gradient retuned to roughly `#0663d4 → #0878b0`. It still reads blue-to-teal, and white text stays ≥4.5:1 across the whole surface. True cyan moves to the glow/shadow and hover sheen, so the mockup's "electric" feel survives. Final values will be checked by a contrast script in Phase A.

## 3. Typography

The mockup uses a bold geometric sans for display (tight, wide letterforms like the logo's "BPL") and a neutral grotesk for body.

- **Display:** **Sora** (600/700/800). It is geometric and its rounded terminals echo the logo; it suits the "BUILD. EVOLVE. LEAD." all-caps hero. Manrope was the alternative, but it is softer and less like the logo.
- **Body/UI:** **Inter** (400/500/600).
- Scale (fluid with `clamp`): hero display about 44 → 88px; page-hero H1 about 32 → 52px; section H2 about 26 → 36px; card title 16–18px; body 15–17px; eyebrow 12px uppercase +0.14em tracking.
- Section headings in the mockup are left-aligned on inner pages and centered on Home's "Three Technology Priorities". `SectionHeading` will support both.

## 4. Layout and spacing

- Container: max 1220px with a fluid gutter (16px mobile → 24px tablet → 32px desktop).
- Header: 76px, sticky, white, with a subtle bottom border or shadow on scroll. Logo left, 7 nav links, gradient "Contact Us" pill-ish button (about 8px radius). The active link is blue with an underline.
- Section vertical padding: about 64px mobile → 96px desktop. Dark bands are inset cards (radius 16–20px) inside the container.
- Grids: 6-up icon rows (Learning approach, Cloud capabilities: 3×2 cards), 5-up rows (Technology Areas 5×2, Why Choose 5, Purpose 5), 4-up (stats, Why Security Matters), 3-up cards (Home priorities, Insights).
- Cards: white, 1px `line` border, 12–16px radius, soft shadow, hover lift.

## 5. Component inventory (derived from all 7 pages)

| Component                                                                                                 | Seen on                                                                                          |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `Header` / `MobileNav` (drawer)                                                                           | all                                                                                              |
| `Hero` (variant `home`: full-bleed photo with left scrim, giant display, keyword ladder, 2 CTAs)          | Home                                                                                             |
| `Hero` (variant `page`: navy gradient, gradient keyword + H1 + body + 1 CTA, image right, keyword ladder) | Learning, Cloud, Security, About, Insights, Contact                                              |
| `StatBar` (4 items: 2 numeric with count-up, 2 text)                                                      | Home                                                                                             |
| `SectionHeading` (eyebrow, title, intro, align)                                                           | all                                                                                              |
| `ServiceCard` (image top, keyword, subtitle in blue, text, "Explore →")                                   | Home priorities                                                                                  |
| `CapabilityCard` (bordered tile, icon, title)                                                             | Cloud, Security                                                                                  |
| `FeatureIconCard` (borderless icon tile + 1–2 line label, optional sublabel)                              | Home why-choose, Learning approach/areas, Security why-matters, About purpose, Home band pillars |
| `ProcessSteps` (chevron strip on dark, Learn > Practice > Apply > Assess > Reinforce)                     | Learning                                                                                         |
| `TechLogoStrip`                                                                                           | Cloud                                                                                            |
| `CTABand` (dark inset card, image/glow, heading, body, CTA; variants with pillars)                        | all                                                                                              |
| `ArticleCard` (image, category chip on image, title, excerpt, Read More →)                                | Insights                                                                                         |
| `CategoryTabs` (underline tabs)                                                                           | Insights                                                                                         |
| `NewsletterForm` (inline band)                                                                            | Insights                                                                                         |
| `ContactForm`, `ContactDetails`, `LocationsMap`                                                           | Contact                                                                                          |
| `Footer` (logo, Quick Links, Our Solutions, Follow Us, legal row)                                         | all                                                                                              |
| `ImageSlot` (next/image + blur + gradient fallback)                                                       | all                                                                                              |
| `Logo` (color / on-dark / mono)                                                                           | header, footer, OG                                                                               |

## 6. Section inventory per page

### 01 Home

1. **Hero** (photo: hiker on cliff above city at sunrise, blue light road). Display "BUILD. EVOLVE. LEAD." with the periods colored. Right ladder "PEOPLE / TECHNOLOGY / SECURITY / A BRIGHTER TOMORROW". Sub-headline "Technology that builds capability, accelerates **transformation** and secures what's next." Body. CTAs: Explore Our Solutions (primary), Talk to Us (outline).
2. **StatBar** (white): 2,500+ Technology Experts & Consultants · 1,500+ Technology & Skill Areas · Enterprise Ready, From Growing Businesses to Global Enterprises · Future Focused, AI • Cloud • Cybersecurity Emerging Technologies.
3. **Our Expertise**: "Three Technology Priorities. One Partner." + intro + 3 ServiceCards (BUILD / Learning & Capability; EVOLVE / Cloud Solutions; LEAD / Cybersecurity).
4. **Band**: "People. Technology. Security. Connected for a stronger tomorrow." + 3 pillars (People: Build capability; Technology: Modernize and scale; Security: Protect what matters) + wave-light visual.
5. **Why Organizations Choose XBPL**: 5 FeatureIconCards.
6. **CTA band** (globe network): "What's your next technology priority?" + body + "Talk to an XBPL Expert".
7. **Footer**.

### 02 Learning

Hero (BUILD; "Technology capability for what's next"; ladder SKILLS/PEOPLE/POSSIBILITIES; CTA "Talk to Our Learning Experts") → Our Learning Approach ("From learning programs to workforce transformation", 6 items) → Technology Areas ("Build skills across a wide range of technologies", 10 items, 5×2 bordered) → dark band "Knowledge isn't the outcome. Capability is." with ProcessSteps + "Explore Learning Solutions".

### 03 Cloud

Hero (EVOLVE; ladder AGILE/SCALABLE/RESILIENT; CTA "Talk to Our Cloud Experts") → Our Cloud Capabilities ("End-to-end cloud solutions for your transformation journey", 6 cards, 3×2) → Leading Technologies ("We work across leading cloud ecosystems to help you build, modernize and scale", 6 logos) → CTA band "From strategy to operations. We help you evolve." + "Discuss Your Cloud Strategy".

### 04 Security

Hero (LEAD; "Move forward securely."; ladder DETECT/PROTECT/RESPOND/STAY AHEAD; CTA "Talk to Our Security Experts") → Our Security Capabilities ("Comprehensive cybersecurity solutions for today's evolving threat landscape", 6 cards) → Why Cybersecurity Matters (Protect Business Operations, Safeguard Critical Data, Enable Confident Growth, Stay Ahead of Emerging Threats) → CTA band "Your Security Partner for a Safer Tomorrow." + "Build a stronger security posture with XBPL."

### 05 About

Hero ("Technology should create possibilities — not complexity."; glass building with XBPL signage; CTA "Our Story") → Our Purpose ("Make technology work better for business and people", 5 steps: Understand / Design / Execute / Enable / Evolve, each with a short sublabel) → band "Performance. Productivity. Profitability." + body + "Learn More About XBPL".

### 06 Insights

Hero ("Insights for a smarter tomorrow."; ladder NEW PERSPECTIVES / PRACTICAL INSIGHTS) → CategoryTabs (All, AI & GenAI, Cloud, Cybersecurity, Learning, Enterprise Technology) → 3×2 ArticleCard grid → Newsletter band "Get the latest insights".

### 07 Contact

Hero ("Let's build what's next."; city-at-night light trails) → two columns: "Send us a message" form card | "Get in touch" details (India (Head Office), Bengaluru, Karnataka, India; +91 80 0000 0000; info@xbpl.in) + Follow Us (LinkedIn) + "Explore Our Locations" world map with pins.

## 7. Copy source

The prototype is missing, so all copy is **transcribed from the mockup**. At this resolution, headings and labels are reliable. Body paragraphs are mostly legible but may have small wording errors, so every transcribed paragraph gets a `// TODO: verify wording against source copy` marker and is listed in `CONTENT_TODO.md`. Where the mockup shows only a label (e.g. capability cards without descriptions), the build shows only the label. No descriptions will be invented (see A3).

## 8. Ambiguities and decisions

| #   | Ambiguity                                                                                                              | Decision                                                                                                                                                                                                                                                                                           |
| --- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | `reference/static-prototype/` missing                                                                                  | Use the token values from the brief. Copy is transcribed from the mockup. If the prototype turns up, I'll diff its copy against mine.                                                                                                                                                              |
| A2  | Home eyebrow: the brief says "People • Technology • Security"; the mockup shows a stacked right-side ladder            | Desktop: right-side ladder as in the mockup. Below lg: a single-line eyebrow "People • Technology • Security" above the display. Both come from one content field.                                                                                                                                 |
| A3  | Capability/feature cards show titles only; no descriptions are visible                                                 | Ship titles only (1:1 with mockup). Content types have an optional `description` field the client can fill later.                                                                                                                                                                                  |
| A4  | Insights: tab list has 6 categories, but one mockup card is tagged "Perspectives" (not a tab)                          | Treat **Perspectives** as an article _tag_. Its category is Enterprise Technology. The "All" tab shows it; the chip displays the tag.                                                                                                                                                              |
| A5  | Article titles exist in the mockup; bodies don't                                                                       | Write 6 sample MDX articles using the mockup titles. Bodies are generic, non-claim thought pieces and the frontmatter carries `draft: sample` + a TODO. "Technology Trends to Watch in 2025 and Beyond" is outdated (today is Oct 2026), so it's flagged for the client.                           |
| A6  | About: "Our Story" is a CTA but the mockup has no story section                                                        | The button anchors to a short `#our-story` section that uses only the hero belief statement. The full story is a TODO for the client; I won't invent company history.                                                                                                                              |
| A7  | About band CTA "Learn More About XBPL" sits _on_ the About page                                                        | Keep the mockup label and anchor it to `#our-story`. Flagged in CONTENT_TODO, with the recommendation that the client switch to "Talk to Us" → `/contact`, since a closing CTA that points back up the same page is weak.                                                                          |
| A8  | Contact map shows pins in several regions, but only one office is listed                                               | Render only Bengaluru as an office pin. Other pins wait for client confirmation (TODO).                                                                                                                                                                                                            |
| A9  | Partner logos (AWS, Azure, etc.) are trademarks                                                                        | Use official monochrome SVG marks (simple-icons, CC0 paths) shown in neutral grey with color on hover, with `aria-label`. Partnership status is a TODO and legal review is recommended. If XBPL isn't an official partner, the heading "Leading Technologies" (not "Partners") is already neutral. |
| A10 | Footer © "2024"                                                                                                        | Render the current year dynamically.                                                                                                                                                                                                                                                               |
| A11 | Footer "Our Solutions" includes "Managed Services", which has no page                                                  | Link it to `/cloud#capabilities` (Managed Cloud Services) and flag it.                                                                                                                                                                                                                             |
| A12 | "I'm interested in" select options are not visible                                                                     | Learning & Capability, Cloud Solutions, Cybersecurity, Managed Services, General Enquiry (TODO confirm).                                                                                                                                                                                           |
| A13 | Stats 2,500+ / 1,500+, address, phone `+91 80 0000 0000` (obviously placeholder), `info@xbpl.in`, LinkedIn URL, domain | Use as shown, all marked TODO. The site URL comes from `NEXT_PUBLIC_SITE_URL` (default `https://xbpl.in`, TODO).                                                                                                                                                                                   |
| A14 | Newsletter destination unspecified                                                                                     | Server action: add the contact to a Resend Audience if `RESEND_AUDIENCE_ID` is set, otherwise email a notification to the inbox. Same honeypot and rate-limit protection as the contact form.                                                                                                      |
| A15 | Inner-page footers are cropped in the mockup                                                                           | The same footer goes on every page.                                                                                                                                                                                                                                                                |
| A16 | Mockup imagery is AI-generated                                                                                         | Not used. An ImageSlot system with gradient fallbacks, plus `IMAGE_BRIEF.md`.                                                                                                                                                                                                                      |

## 9. Risks for the quality bars

- **LCP on mobile:** both hero types are image-heavy. Mitigations: `priority` + `fetchPriority="high"` on the hero image only, correct `sizes`, AVIF/WebP, never animating the hero text from `opacity:0`, and gradient fallbacks that cost 0 bytes.
- **JS budget:** Motion is about 30KB+. Mitigations: `LazyMotion` + `m` + `domAnimation` in a few small client islands (reveal wrapper, count-up, mobile nav). Pages otherwise stay RSC.
- **CSP vs static generation:** nonce-based CSP forces dynamic rendering. See PLAN §6 for the trade-off.
- **Rate limiting on Vercel serverless:** in-memory limits are per-instance. Plan: Upstash Redis when env is set, with an in-memory fallback (documented).
