import type { LearningPageContent } from "../types";

// Copy transcribed from reference/mockup.jpeg (02. Learning page).
// TODO: verify wording against source copy.

export const learning: LearningPageContent = {
  seo: {
    title: "Learning & Capability",
    description:
      "XBPL Learning helps organizations build future-ready technology capabilities through structured, practical and business-aligned learning solutions.",
  },

  hero: {
    keyword: "Build",
    title: "Technology capability for what's next.",
    body: "XBPL Learning helps organizations build future-ready technology capabilities through structured, practical and business-aligned learning solutions.",
    ladder: ["Skills", "People", "Possibilities"],
    cta: { label: "Talk to Our Learning Experts", href: "/contact?interest=learning" },
    image: {
      slot: "learning/hero",
      alt: "A professional working with a holographic learning interface",
    },
  },

  approach: {
    title: "Our Learning Approach",
    intro: "From learning programs to workforce transformation.",
    items: [
      { icon: "clipboard-check", title: "Capability Assessment" },
      { icon: "waypoints", title: "Learning Architecture" },
      { icon: "presentation", title: "Instructor-Led Training" },
      { icon: "flask", title: "Hands-On Labs & Simulations" },
      { icon: "award", title: "Assessments & Certifications" },
      { icon: "messages", title: "Mentoring & Reinforcement" },
    ],
  },

  areas: {
    title: "Technology Areas",
    intro: "Build skills across a wide range of technologies.",
    items: [
      { icon: "brain", title: "AI & Generative AI" },
      { icon: "cloud", title: "Cloud" },
      { icon: "shield-check", title: "Cybersecurity" },
      { icon: "chart", title: "Data & Analytics" },
      { icon: "infinity", title: "DevOps" },
      { icon: "code", title: "Software Engineering" },
      { icon: "layout-grid", title: "Enterprise Applications" },
      { icon: "kanban", title: "Project & Agile" },
      { icon: "bot", title: "Automation" },
      { icon: "atom", title: "Emerging Technologies" },
    ],
  },

  process: {
    title: "Knowledge isn't the outcome.\nCapability is.",
    stepsLabel: "How XBPL builds capability",
    steps: [
      { icon: "book-open", label: "Learn" },
      { icon: "repeat", label: "Practice" },
      { icon: "pointer", label: "Apply" },
      { icon: "clipboard-check", label: "Assess" },
      { icon: "refresh", label: "Reinforce" },
    ],
    cta: { label: "Explore Learning Solutions", href: "/contact?interest=learning" },
  },
};
