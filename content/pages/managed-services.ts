import type { ManagedServicesPageContent } from "../types";

// Source: xbpl.in home page, "XBPL | Managed Services" (live site, lightly edited for grammar).

export const managedServices: ManagedServicesPageContent = {
  seo: {
    title: "Managed IT Services",
    description:
      "XBPL Managed IT Services: proactive monitoring, disaster recovery, compliance assurance, performance optimization and dedicated account management for seamless operations.",
  },

  hero: {
    keyword: "XBPL | Managed Services",
    title: "Technology that meets reliability.",
    body: "A comprehensive suite of managed IT services that empowers your organization with cutting-edge technology, seamless operations and enhanced productivity.",
    ladder: ["Reliable", "Efficient", "Innovative"],
    cta: { label: "Talk to Us About Managed Services", href: "/contact?interest=managed-services" },
    image: {
      slot: "cloud/cta",
      alt: "A data-centre corridor lined with server racks",
    },
  },

  intro: {
    eyebrow: "Why managed services",
    title: "IT that runs, so you can grow.",
    paragraphs: [
      "IT plays a critical role in the success of every modern business. XBPL's managed services keep your technology performing, secure and compliant, while you focus on your core business.",
      "Discover the difference our managed IT services can make. Join hands with XBPL, where technology meets reliability, efficiency and innovation.",
    ],
  },

  features: {
    eyebrow: "What's included",
    title: "Twelve reasons teams choose XBPL.",
    items: [
      {
        title: "Disaster recovery planning",
        description: "Robust plans that keep your business running through unforeseen events.",
        icon: "lifebuoy",
      },
      {
        title: "Dedicated account management",
        description:
          "Personal attention and strategic guidance that align IT with your objectives.",
        icon: "headset",
      },
      {
        title: "Employee training programmes",
        description:
          "Training that equips your workforce to make the most of your technology infrastructure.",
        icon: "graduation-cap",
      },
      {
        title: "Strategic partnerships",
        description: "Partnerships with leading technology providers bring you top-tier solutions.",
        icon: "handshake",
      },
      {
        title: "Customer-centric approach",
        description: "Services tailored to your unique business requirements.",
        icon: "users",
      },
      {
        title: "Cost efficiency",
        description: "Optimized costs without compromising quality, at a competitive rate.",
        icon: "piggy-bank",
      },
      {
        title: "Cutting-edge technology",
        description: "The latest global-standard technologies keep your business ahead.",
        icon: "cpu",
      },
      {
        title: "Proactive monitoring",
        description: "Issues are spotted and resolved before they affect your operations.",
        icon: "activity",
      },
      {
        title: "Compliance assurance",
        description:
          "Infrastructure that adheres to industry regulations and compliance standards.",
        icon: "scale",
      },
      {
        title: "Continuous innovation",
        description: "The agility to keep pace with an evolving technology landscape.",
        icon: "lightbulb",
      },
      {
        title: "Data integrity and privacy",
        description: "Stringent protection for the integrity and privacy of your data.",
        icon: "fingerprint",
      },
      {
        title: "Performance optimization",
        description: "Systems tuned to meet or exceed high-performance benchmarks.",
        icon: "gauge",
      },
    ],
  },

  cta: {
    title: "Performance. Productivity.\nProfitability.",
    body: "Let XBPL handle the complexity of your IT, so your teams can concentrate on what they do best.",
    cta: { label: "Talk to an XBPL Expert", href: "/contact?interest=managed-services" },
    image: { slot: "about/band", alt: "" },
  },
};
