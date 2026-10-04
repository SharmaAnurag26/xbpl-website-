import type { SiteContent } from "./types";

export const site: SiteContent = {
  name: "XBPL",
  legalName: "Xyberopex Bharat Private Limited",
  tagline: "Build • Evolve • Lead",
  description:
    "XBPL helps organizations strengthen their people, modernize their technology landscape and build resilient digital environments through integrated Learning, Cloud and Cybersecurity solutions.",

  nav: [
    { label: "Courses", href: "/courses" },
    {
      label: "What we do",
      href: "/learning",
      menu: {
        title: "Three technology priorities. One partner.",
        body: "People who can use technology, infrastructure that can scale and security that protects it, brought together.",
        cta: { label: "Talk to an XBPL Expert", href: "/contact" },
        links: [
          {
            label: "Learning & Capability",
            href: "/learning",
            description:
              "Build the skills your workforce needs for today's technologies and tomorrow's opportunities.",
          },
          {
            label: "Cloud Solutions",
            href: "/cloud",
            description:
              "Modernize, scale and manage your technology environment with cloud solutions.",
          },
          {
            label: "Cybersecurity",
            href: "/security",
            description:
              "Move forward with confidence with security that protects your business and enables growth.",
          },
          {
            label: "Managed Services",
            href: "/managed-services",
            description:
              "Managed IT services that keep your operations seamless, secure and productive.",
          },
        ],
      },
    },
    {
      label: "Insights",
      href: "/insights",
      menu: {
        title: "Insights for a smarter tomorrow.",
        body: "Perspectives, practical guides and real-world stories across learning, cloud, cybersecurity and emerging technologies.",
        cta: { label: "All insights", href: "/insights" },
        links: [
          { label: "AI & GenAI", href: "/insights?category=ai-genai" },
          { label: "Cloud", href: "/insights?category=cloud" },
          { label: "Cybersecurity", href: "/insights?category=cybersecurity" },
          { label: "Learning", href: "/insights?category=learning" },
          { label: "Enterprise Technology", href: "/insights?category=enterprise-technology" },
        ],
      },
    },
    {
      label: "Who we are",
      href: "/about",
      menu: {
        title: "Technology should create possibilities, not complexity.",
        body: "XBPL was built around a simple belief: technology creates its greatest value when people, platforms and security move forward together.",
        cta: { label: "About XBPL", href: "/about" },
        links: [
          { label: "About XBPL", href: "/about", description: "Who we are and what we believe." },
          {
            label: "Our story",
            href: "/about#our-story",
            description: "People, platforms and security, moving forward together.",
          },
          {
            label: "Our purpose",
            href: "/about#our-purpose",
            description: "Understand, design, execute, enable, evolve.",
          },
          { label: "Contact", href: "/contact", description: "Let's build what's next." },
        ],
      },
    },
    { label: "Contact", href: "/contact" },
  ],

  search: {
    label: "Search",
    placeholder: "Search pages and insights",
    empty: "No results. Try another word.",
    hint: "Press Ctrl K or / to search",
  },

  headerCta: { label: "Contact Us", href: "/contact" },

  footer: {
    blurb: "Build • Evolve • Lead",
    groups: [
      {
        title: "Quick Links",
        links: [
          { label: "Home", href: "/" },
          { label: "Courses", href: "/courses" },
          { label: "Learning", href: "/learning" },
          { label: "Cloud", href: "/cloud" },
          { label: "Security", href: "/security" },
          { label: "About", href: "/about" },
          { label: "Insights", href: "/insights" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Our Solutions",
        links: [
          { label: "Learning & Capability", href: "/learning" },
          { label: "Cloud Solutions", href: "/cloud" },
          { label: "Cybersecurity", href: "/security" },
          { label: "Managed Services", href: "/managed-services" },
        ],
      },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
    copyright: "XBPL. All rights reserved.",
  },

  // From xbpl.in (live site).
  contact: {
    office: {
      label: "Xyberopex Bharat Private Limited",
      lines: [
        "C-72, Nilgiri-1, Sector-34, Noida",
        "Gautam Buddha Nagar, Uttar Pradesh 201301, India",
      ],
    },
    phone: { display: "+91 99532 71747", href: "tel:+919953271747" },
    email: "sales@xbpl.in",
  },

  social: [
    {
      network: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/xyberopex-xbpl-518532303/",
    },
    { network: "x", label: "X (Twitter)", href: "https://twitter.com/xbplindia" },
    { network: "instagram", label: "Instagram", href: "https://www.instagram.com/xbplindia/" },
    {
      network: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61558464205321",
    },
  ],
};
