import type { InsightsPageContent } from "../types";

// Copy transcribed from reference/mockup.jpeg (06. Insights page).
// TODO: verify wording against source copy.

export const insights: InsightsPageContent = {
  seo: {
    title: "Insights",
    description:
      "Perspectives, practical guides and real-world stories across learning, cloud, cybersecurity and emerging technologies.",
  },

  hero: {
    title: "Insights for a smarter tomorrow.",
    body: "Perspectives, practical guides and real-world stories across learning, cloud, cybersecurity and emerging technologies.",
    ladder: ["New perspectives", "Practical insights"],
    image: {
      slot: "insights/hero",
      alt: "A professional reviewing data across several screens",
    },
  },

  filterLabel: "Filter insights by category",
  categories: [
    { id: "ai-genai", label: "AI & GenAI" },
    { id: "cloud", label: "Cloud" },
    { id: "cybersecurity", label: "Cybersecurity" },
    { id: "learning", label: "Learning" },
    { id: "enterprise-technology", label: "Enterprise Technology" },
  ],

  newsletter: {
    title: "Get the latest insights",
    // TODO: verify wording (truncated in the mockup).
    body: "Subscribe to our insights and stay updated with the latest trends, ideas and best practices.",
    placeholder: "Your email address",
    submitLabel: "Subscribe",
  },

  article: {
    backLabel: "All insights",
    relatedTitle: "Related insights",
    ctaTitle: "Want to discuss this with our team?",
    ctaBody: "Tell us where you are today and where you want to go next.",
    cta: { label: "Talk to an XBPL Expert", href: "/contact" },
  },
};
