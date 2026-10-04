# Content to confirm with the client

Kept up to date as the site evolves. Items marked ✅ were confirmed from the live site
(xbpl.in, crawled 2026-10-04); everything else still needs a decision or material.

## Company facts

| Item                    | Value                                                                 | Status                                                                                                                |
| ----------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Registered company name | Xyberopex Bharat Private Limited                                      | ✅ from xbpl.in                                                                                                       |
| Head office             | C-72, Nilgiri-1, Sector-34, Noida, Gautam Buddha Nagar, UP 201301     | ✅ from xbpl.in. **The mockup said Bengaluru; please confirm Noida is current.**                                      |
| Phone                   | +91-9953271747                                                        | ✅ from xbpl.in                                                                                                       |
| Email                   | sales@xbpl.in                                                         | ✅ from xbpl.in                                                                                                       |
| Social                  | LinkedIn, X/Twitter @xbplindia, Instagram @xbplindia, Facebook        | ✅ from xbpl.in. The LinkedIn link is a personal-profile URL (`/in/…`); a company page (`/company/…`) is recommended. |
| Stats                   | 2,500+ consultants; 1,500+ technology stacks; startups to Fortune 500 | ✅ from xbpl.in                                                                                                       |
| Production domain       | https://xbpl.in                                                       | `NEXT_PUBLIC_SITE_URL`                                                                                                |

## Brand

| Item                                                                         | Note                                                                                                 |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Logo master file                                                             | The site uses a hand-built SVG recreation of the new logo. Supply the original vector if one exists. |
| Technology partner logos (AWS, Azure, Google Cloud, Oracle, VMware, Red Hat) | Shown as plain text until official marks and usage rights are confirmed.                             |

## Content imported from xbpl.in

All live-site copy was lightly edited for grammar and clarity (meaning and claims unchanged). Please skim:

| Page                        | Imported                                                                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Learning                    | Hero body, "Knowledge is your superpower" intro, training challenges, 6 courses, "Why choose XBPL \| Learnings" (10), 7-step engagement process, delivery formats in FAQ |
| Cloud                       | Intro, 7 platform areas, 8 end-to-end managed services (with features), 8-step Cloud Financial Optimization Framework, 12 partner points, 7-step process                 |
| Security                    | Intro (SOC-as-a-Service), 10 service groups (40 sub-services), 10 reasons it matters                                                                                     |
| Managed Services (new page) | Intro + 12 features from the live home page                                                                                                                              |
| About                       | XYBEROPEX intro, Mission, Vision, 6 core values                                                                                                                          |

Claims carried over from the live site that XBPL should be able to substantiate: "global SOC presence", "24/7 incident response team", "GDPR, HIPAA, PCI DSS compliance", "Fortune 500 standards", "globally recognised certifications".

Course descriptions on the live site were placeholder (lorem ipsum). The new one-line course summaries (`content/pages/learning.ts` → `courses`) describe each topic in general terms. **Please confirm or replace them**, and add durations, levels or prices if you want them shown.

## Still needed

| Item                                                    | Note                                                                              |
| ------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Client logos (`content/pages/home.ts` → `clients`)      | **Empty, so hidden.** Send logo files plus written permission to display them.    |
| Testimonials (`content/pages/home.ts` → `testimonials`) | **Empty, so hidden.** Send real quotes with name, role and company (and consent). |
| Learner/trainer/course numbers                          | Not on the live site; send if you want them shown.                                |
| Home hero, section intros, mockup copy                  | Transcribed from the redesign mockup; check wording.                              |
| Insights articles                                       | Six sample articles written for launch; review before publishing.                 |
| Privacy Policy / Terms                                  | Templates for this site's data flows; legal review required.                      |

## Training-first refresh

| Item                                                                             | Note                                                                                                                                                                                                           |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home hero ("Corporate training that turns knowledge into real-world capability") | New positioning copy; confirm.                                                                                                                                                                                 |
| "For learners & students" panel                                                  | Assumes XBPL also trains individuals (the live site addresses both). Confirm, or the panel can be removed.                                                                                                     |
| Photos                                                                           | CC0 stock (mostly early Unsplash / PxHere via Wikimedia Commons). See `docs/IMAGE_CREDITS.md`. Photos of your own training sessions would be even more convincing; drop them into `public/images/<slot>.webp`. |
| Supplied illustrations (course cards, two Insights covers, learners panel)       | **Confirm source and licence.** Record them in `scripts/illustrations.ts` / `docs/IMAGE_CREDITS.md`. Free tiers of stock sites (e.g. Freepik) usually require a visible credit; a premium licence does not.    |
