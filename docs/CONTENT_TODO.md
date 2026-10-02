# Content to confirm with the client

Every item below is marked `// TODO: confirm with client` in the source. Kept up to date each phase.

## Company facts

| Item                    | Current value                                   | Where                                 |
| ----------------------- | ----------------------------------------------- | ------------------------------------- |
| Registered company name | "XBPL"                                          | `content/site.ts` → `legalName`       |
| Head office address     | Bengaluru, Karnataka, India (city only)         | `content/site.ts` → `contact.office`  |
| Phone                   | +91 80 0000 0000 (**placeholder from mockup**)  | `content/site.ts` → `contact.phone`   |
| Email                   | info@xbpl.in                                    | `content/site.ts` → `contact.email`   |
| LinkedIn URL            | https://www.linkedin.com/company/xbpl (guessed) | `content/site.ts` → `social.linkedin` |
| Production domain       | https://xbpl.in                                 | `NEXT_PUBLIC_SITE_URL`                |

## Navigation

| Item                      | Note                                                         |
| ------------------------- | ------------------------------------------------------------ |
| Footer "Managed Services" | No dedicated page; currently links to `/cloud#capabilities`. |

## Brand

| Item                                                                         | Note                                                                                 |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Logo master file                                                             | The site uses a hand-built SVG recreation. Supply the original vector if one exists. |
| Technology partner logos (AWS, Azure, Google Cloud, Oracle, VMware, Red Hat) | Shown as plain text until official marks and usage rights are confirmed.             |

## Home page (`content/pages/home.ts`)

| Item                                                  | Note                                                                                                                             |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| "2,500+ Technology Experts & Consultants"             | Claim from the mockup; confirm the figure.                                                                                       |
| "1,500+ Technology & Skill Areas"                     | Claim from the mockup; confirm the figure.                                                                                       |
| Hero body, section intro, card descriptions, CTA body | Transcribed from the low-res mockup; check wording.                                                                              |
| "Future Focused" sub-label                            | The mockup reads "AI • Cloud • Cybersecurity Emerging Technologies"; a bullet was added before "Emerging Technologies". Confirm. |
| "Why Organizations Choose XBPL" items                 | Titles only (no descriptions in the mockup). Add one-line descriptions if wanted.                                                |

_Copy for the other pages and article bodies is added in Phase C._
