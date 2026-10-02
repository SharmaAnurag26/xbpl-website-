import type { HomePageContent } from "../types";

// Copy transcribed from reference/mockup.jpeg (01. Home page).
// TODO: verify wording against source copy (body paragraphs were transcribed from a low-res mockup).

export const home: HomePageContent = {
  seo: {
    title: "XBPL: Build • Evolve • Lead | Learning, Cloud & Cybersecurity",
    description:
      "XBPL helps organizations strengthen their people, modernize their technology landscape and build resilient digital environments through integrated Learning, Cloud and Cybersecurity solutions.",
  },

  hero: {
    eyebrow: "People • Technology • Security",
    ladder: ["People", "Technology", "Security", "A brighter tomorrow"],
    display: ["Build.", "Evolve.", "Lead."],
    headline:
      "Technology that builds capability, accelerates transformation and secures what's next.",
    highlight: "transformation",
    body: "XBPL helps organizations strengthen their people, modernize their technology landscape and build resilient digital environments through integrated Learning, Cloud and Cybersecurity solutions.",
    ctas: [
      { label: "Explore Our Solutions", href: "#solutions" },
      { label: "Talk to Us", href: "/contact", variant: "outline" },
    ],
    image: {
      slot: "home/hero",
      alt: "A professional standing on a cliff edge at sunrise, looking out over a modern city skyline",
    },
  },

  stats: {
    label: "XBPL at a glance",
    items: [
      // TODO: confirm with client (headcount figure)
      { kind: "number", value: 2500, suffix: "+", label: "Technology Experts & Consultants" },
      // TODO: confirm with client (skill-area count)
      { kind: "number", value: 1500, suffix: "+", label: "Technology & Skill Areas" },
      {
        kind: "text",
        title: "Enterprise Ready",
        label: "From Growing Businesses to Global Enterprises",
      },
      {
        kind: "text",
        title: "Future Focused",
        label: "AI • Cloud • Cybersecurity • Emerging Technologies",
      },
    ],
  },

  priorities: {
    eyebrow: "Our Expertise",
    title: "Three Technology Priorities.\nOne Partner.",
    intro:
      "Technology transformation requires people who can use it, infrastructure that can scale and security that protects it. XBPL brings these together.",
    cards: [
      {
        keyword: "Build",
        title: "Learning & Capability",
        description:
          "Build the skills your workforce needs for today's technologies and tomorrow's opportunities.",
        image: { slot: "home/build", alt: "" },
        link: { label: "Explore Learning", href: "/learning" },
      },
      {
        keyword: "Evolve",
        title: "Cloud Solutions",
        description:
          "Modernize, scale and manage your technology environment with cloud solutions designed around your business.",
        image: { slot: "home/evolve", alt: "" },
        link: { label: "Explore Cloud", href: "/cloud" },
      },
      {
        keyword: "Lead",
        title: "Cybersecurity",
        description:
          "Move forward with confidence with cybersecurity solutions that protect your business and enable growth.",
        image: { slot: "home/lead", alt: "" },
        link: { label: "Explore Security", href: "/security" },
      },
    ],
  },

  connected: {
    title: "People. Technology. Security.\nConnected for a stronger tomorrow.",
    image: { slot: "home/band", alt: "" },
    pillars: [
      { icon: "users", title: "People", description: "Build capability" },
      { icon: "cpu", title: "Technology", description: "Modernize and scale" },
      { icon: "shield-check", title: "Security", description: "Protect what matters" },
    ],
  },

  whyChoose: {
    title: "Why Organizations Choose XBPL",
    items: [
      { icon: "target", title: "Business-Aligned Solutions" },
      { icon: "user-check", title: "Expert-Led Delivery" },
      { icon: "sliders", title: "Flexible & Scalable Engagement Models" },
      { icon: "puzzle", title: "Technology Agnostic" },
      { icon: "rocket", title: "Execution Focused" },
    ],
  },

  cta: {
    title: "What's your next\ntechnology priority?",
    body: "Whether you're building workforce capability, modernizing your cloud environment or strengthening cybersecurity, let's explore how XBPL can help.",
    cta: { label: "Talk to an XBPL Expert", href: "/contact" },
    image: { slot: "home/cta", alt: "" },
  },
};
