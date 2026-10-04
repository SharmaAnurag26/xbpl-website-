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

  // Source: xbpl.in/about.php (live site, lightly edited for grammar).
  story: {
    eyebrow: "Our Story",
    title: "Welcome to XYBEROPEX.",
    paragraphs: [
      "Xyberopex Bharat Private Limited (XBPL) exists to empower organizations through cutting-edge technology and unwavering support. We provide the tools and assistance businesses need to reach their full potential.",
      "Our focus is simple: maximize performance, boost productivity and drive profitability. We handle the complexity of technological innovation, so our clients can concentrate on their core competencies and excel in their industries with confidence.",
    ],
    pillars: home.priorities.cards,
  },

  missionVision: [
    {
      title: "Our Mission",
      body: "To revolutionize the way businesses navigate the digital realm, with managed IT services that solve today's challenges and anticipate tomorrow's trends. Through a culture of innovation and personalized solutions, we strive to be the catalyst for our clients' success.",
    },
    {
      title: "Our Vision",
      body: "To be a global leader in managed IT services, setting the standard for excellence and innovation, where businesses of every size can seamlessly harness technology to achieve their goals, supported by continuous learning, strategic partnerships and a commitment to sustainability.",
    },
  ],

  values: {
    eyebrow: "Core values",
    title: "What we stand for.",
    items: [
      {
        title: "Innovation",
        description:
          "We embrace creativity and proactively seek innovative solutions to stay at the forefront of technology.",
        icon: "lightbulb",
      },
      {
        title: "Integrity",
        description:
          "We do business with the highest ethical standards: transparent, honest and reliable.",
        icon: "scale",
      },
      {
        title: "Collaboration",
        description: "We grow together, within our team and in partnership with our clients.",
        icon: "handshake",
      },
      {
        title: "Continuous improvement",
        description: "We keep learning and adapting to deliver the best possible outcomes.",
        icon: "trending-up",
      },
      {
        title: "Sustainability",
        description:
          "We integrate environmentally responsible practices and minimize our footprint.",
        icon: "leaf",
      },
      {
        title: "Empowerment",
        description:
          "We help our team, clients and partners reach their full potential, because collective success drives individual success.",
        icon: "sparkles",
      },
    ],
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
    cta: { label: "Talk to Us", href: "/contact" },
    image: { slot: "about/band", alt: "" },
  },
};
