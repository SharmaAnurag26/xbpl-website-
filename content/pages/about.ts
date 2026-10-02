import type { AboutPageContent } from "../types";
import { home } from "./home";

// Copy transcribed from reference/mockup.jpeg (05. About page).
// TODO: verify wording against source copy.

export const about: AboutPageContent = {
  seo: {
    title: "About XBPL",
    description:
      "XBPL was built around a simple belief: technology creates its greatest value when people, platforms and security move forward together.",
  },

  hero: {
    title: "Technology should create possibilities, not complexity.",
    body: "XBPL was built around a simple belief: technology creates its greatest value when people, platforms and security move forward together.",
    cta: { label: "Our Story", href: "#our-story" },
    image: {
      slot: "about/hero",
      alt: "A modern glass office building lit in blue at dusk",
    },
  },

  // TODO: confirm with client. The mockup has an "Our Story" button but no story copy;
  // this section reuses only statements that appear in the mockup. Replace with the real story.
  story: {
    eyebrow: "Our Story",
    title: "People, platforms and security, moving forward together.",
    paragraphs: [
      "XBPL was built around a simple belief: technology creates its greatest value when people, platforms and security move forward together.",
      "XBPL helps organizations strengthen their people, modernize their technology landscape and build resilient digital environments through integrated Learning, Cloud and Cybersecurity solutions.",
    ],
    pillars: home.priorities.cards,
  },

  purpose: {
    eyebrow: "Our Purpose",
    title: "Make technology work better for business and people.",
    items: [
      { icon: "search", title: "Understand", description: "Start with the business problem." },
      { icon: "pen-tool", title: "Design", description: "Build the right solution." },
      { icon: "zap", title: "Execute", description: "Turn strategy into action." },
      { icon: "users", title: "Enable", description: "Develop capability and ownership." },
      { icon: "refresh", title: "Evolve", description: "Continuously improve." },
    ],
  },

  band: {
    title: "Performance. Productivity.\nProfitability.",
    body: "Technology should improve business. XBPL helps organizations use technology to drive better performance, higher productivity and sustainable profitability.",
    // TODO: confirm with client. Mockup label kept; consider "Talk to Us" → /contact.
    cta: { label: "Learn More About XBPL", href: "#our-story" },
    image: { slot: "about/band", alt: "" },
  },
};
