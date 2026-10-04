import type { SecurityPageContent } from "../types";

// Sources: xbpl.in/security.php (live site, lightly edited for grammar) and the redesign mockup.

export const security: SecurityPageContent = {
  seo: {
    title: "Cybersecurity",
    description:
      "XBPL Cybersecurity Services: risk assessment, network and endpoint security, 24/7 SOC monitoring, incident response, cloud security, compliance and CISO-as-a-Service.",
  },

  hero: {
    keyword: "Lead · XBPL | Security",
    title: "Move forward securely.",
    body: "Overcome heavyweight cybersecurity challenges with vendor-agnostic security services that fortify your defences, detect risks early and respond fast.",
    ladder: ["Detect", "Protect", "Respond", "Stay ahead"],
    cta: { label: "Talk to Our Security Experts", href: "/contact?interest=security" },
    image: {
      slot: "security/hero",
      alt: "A glowing digital shield with a padlock at its centre",
    },
  },

  intro: {
    eyebrow: "Where innovation meets protection",
    title: "Your vigilant guardian in a changing threat landscape.",
    paragraphs: [
      "As the digital landscape evolves, so do the threats organizations face. Our cybersecurity services are tailored to fortify your defences, detect potential risks and respond swiftly to emerging threats.",
      "Our comprehensive, vendor-agnostic SOC-as-a-Service is a single hub for security monitoring and incident response, backed by skilled experts and advanced technology.",
    ],
  },

  services: {
    eyebrow: "Our services",
    title: "Comprehensive cybersecurity, end to end.",
    items: [
      {
        title: "Cyber Risk Assessment & Management",
        icon: "file-search",
        bullets: [
          "Proactive risk assessments",
          "Threat modelling and analysis",
          "Vulnerability assessments",
          "Risk mitigation strategies",
        ],
      },
      {
        title: "Network Security",
        icon: "network",
        bullets: [
          "Firewall configuration and management",
          "Intrusion detection and prevention",
          "Secure network architecture design",
          "VPN setup and management",
        ],
      },
      {
        title: "Endpoint Security",
        icon: "laptop",
        bullets: [
          "Antivirus and anti-malware",
          "Endpoint detection and response",
          "Mobile device management",
          "Security patch management",
        ],
      },
      {
        title: "Incident Response & Forensics",
        icon: "siren",
        bullets: [
          "24/7 incident response team",
          "Forensic analysis and investigation",
          "Post-incident recovery planning",
          "Continuous improvement recommendations",
        ],
      },
      {
        title: "Security Awareness Training",
        icon: "graduation-cap",
        bullets: [
          "Customised employee training",
          "Phishing awareness and simulation",
          "Social engineering awareness",
          "Secure-behaviour best practices",
        ],
      },
      {
        title: "Cloud Security",
        icon: "cloud-check",
        bullets: [
          "Cloud architecture security review",
          "Identity and access management",
          "Data encryption and protection",
          "Continuous monitoring and auditing",
        ],
      },
      {
        title: "Compliance & Regulatory Support",
        icon: "scale",
        bullets: [
          "GDPR, HIPAA and PCI DSS compliance",
          "Regulatory gap analysis",
          "Policy development and enforcement",
          "Audit preparation and support",
        ],
      },
      {
        title: "Managed Security Services",
        icon: "radar",
        bullets: [
          "24/7 security monitoring and response",
          "Threat intelligence analysis",
          "Security incident management",
          "Regular security status reports",
        ],
      },
      {
        title: "Security Consulting & Advisory",
        icon: "key",
        bullets: [
          "CISO as a Service",
          "Security posture assessments",
          "Security roadmap and strategy",
          "Technology evaluation and selection",
        ],
      },
      {
        title: "Custom Solutions",
        icon: "puzzle",
        bullets: [
          "Tailored cybersecurity solutions",
          "Integration with existing systems",
          "Unique threat-mitigation strategies",
          "Specialised consulting",
        ],
      },
    ],
  },

  whyMatters: {
    title: "Why Cybersecurity Matters",
    intro: "Safeguarding your business is more crucial than ever. Here's what XBPL helps you do.",
    items: [
      {
        title: "Protect your digital assets",
        description:
          "Keep sensitive data, intellectual property and digital assets safe and confidential.",
        icon: "lock",
      },
      {
        title: "Stay ahead of emerging threats",
        description: "A proactive approach minimizes the risk of attacks as threats evolve.",
        icon: "radar",
      },
      {
        title: "Meet compliance requirements",
        description: "Comply with industry regulations and avoid legal and reputational damage.",
        icon: "scale",
      },
      {
        title: "Maintain business continuity",
        description: "Build resilience that minimizes downtime and keeps operations running.",
        icon: "building",
      },
      {
        title: "Build customer trust",
        description: "Customers engage more with companies that clearly protect their information.",
        icon: "handshake",
      },
      {
        title: "Manage risk proactively",
        description:
          "Identify and mitigate risks before they escalate, and decide with confidence.",
        icon: "eye",
      },
      {
        title: "Secure your reputation",
        description: "Prevent and respond effectively to incidents that could harm your brand.",
        icon: "badge-check",
      },
      {
        title: "Secure remote work",
        description: "Protect distributed teams with a secure, productive virtual environment.",
        icon: "globe",
      },
      {
        title: "Cost-effective protection",
        description: "Robust security that prevents far larger losses, without breaking the bank.",
        icon: "piggy-bank",
      },
      {
        title: "Expert guidance and support",
        description:
          "Skilled professionals handle the complexity so you can focus on your business.",
        icon: "headset",
      },
    ],
  },

  cta: {
    title: "Your Security Partner\nfor a Safer Tomorrow.",
    body: "Build a stronger security posture with XBPL.",
    cta: { label: "Talk to Our Security Experts", href: "/contact?interest=security" },
    image: { slot: "security/cta", alt: "" },
  },
};
