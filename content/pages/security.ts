import type { SecurityPageContent } from "../types";

// Copy transcribed from reference/mockup.jpeg (04. Security page).
// TODO: verify wording against source copy.

export const security: SecurityPageContent = {
  seo: {
    title: "Cybersecurity",
    description:
      "XBPL helps organizations strengthen cyber resilience through security solutions designed to protect their infrastructure, data, users and digital operations.",
  },

  hero: {
    keyword: "Lead",
    title: "Move forward securely.",
    body: "XBPL helps organizations strengthen cyber resilience through security solutions designed to protect their infrastructure, data, users and digital operations.",
    ladder: ["Detect", "Protect", "Respond", "Stay ahead"],
    cta: { label: "Talk to Our Security Experts", href: "/contact?interest=security" },
    image: {
      slot: "security/hero",
      alt: "A glowing digital shield with a padlock at its centre",
    },
  },

  capabilities: {
    title: "Our Security Capabilities",
    intro: "Comprehensive cybersecurity solutions for today's evolving threat landscape.",
    items: [
      { icon: "file-search", title: "Security Assessment & Advisory" },
      { icon: "radar", title: "SOC & Security Monitoring" },
      { icon: "shield-half", title: "Managed Security Services" },
      { icon: "siren", title: "Incident Detection & Response" },
      { icon: "cloud-check", title: "Cloud Security" },
      { icon: "graduation-cap", title: "Security Awareness & Capability" },
    ],
  },

  whyMatters: {
    title: "Why Cybersecurity Matters",
    items: [
      { icon: "building", title: "Protect Business Operations" },
      { icon: "lock", title: "Safeguard Critical Data" },
      { icon: "trending-up", title: "Enable Confident Growth" },
      { icon: "shield-check", title: "Stay Ahead of Emerging Threats" },
    ],
  },

  cta: {
    title: "Your Security Partner\nfor a Safer Tomorrow.",
    body: "Build a stronger security posture with XBPL.",
    cta: { label: "Talk to Our Security Experts", href: "/contact?interest=security" },
    image: { slot: "security/cta", alt: "" },
  },
};
