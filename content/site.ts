import type { SiteContent } from "./types";

export const site: SiteContent = {
  name: "XBPL",
  legalName: "XBPL", // TODO: confirm with client (registered company name for footer/JSON-LD)
  tagline: "Build • Evolve • Lead",
  description:
    "XBPL helps organizations strengthen their people, modernize their technology landscape and build resilient digital environments through integrated Learning, Cloud and Cybersecurity solutions.",

  nav: [
    { label: "Home", href: "/" },
    { label: "Learning", href: "/learning" },
    { label: "Cloud", href: "/cloud" },
    { label: "Security", href: "/security" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  headerCta: { label: "Contact Us", href: "/contact" },

  footer: {
    blurb: "Build • Evolve • Lead",
    groups: [
      {
        title: "Quick Links",
        links: [
          { label: "Home", href: "/" },
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
          // TODO: confirm with client. No dedicated Managed Services page; links to cloud capabilities.
          { label: "Managed Services", href: "/cloud#capabilities" },
        ],
      },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
    copyright: "XBPL. All rights reserved.",
  },

  contact: {
    // TODO: confirm with client (full postal address)
    office: { label: "India (Head Office)", lines: ["Bengaluru, Karnataka, India"] },
    // TODO: confirm with client. Mockup shows a placeholder number.
    phone: { display: "+91 80 0000 0000", href: "tel:+918000000000" },
    // TODO: confirm with client
    email: "info@xbpl.in",
  },

  social: {
    // TODO: confirm with client (company LinkedIn URL)
    linkedin: "https://www.linkedin.com/company/xbpl",
  },
};
