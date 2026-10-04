import type { HomePageContent } from "../types";
import { learning } from "./learning";

// Copy transcribed from reference/mockup.jpeg (01. Home page).
// TODO: verify wording against source copy (body paragraphs were transcribed from a low-res mockup).

export const home: HomePageContent = {
  seo: {
    title: "XBPL: Build • Evolve • Lead | Learning, Cloud & Cybersecurity",
    description:
      "XBPL helps organizations strengthen their people, modernize their technology landscape and build resilient digital environments through integrated Learning, Cloud and Cybersecurity solutions.",
  },

  hero: {
    eyebrow: "Corporate Training • Upskilling • Certification",
    ladder: ["Learn", "Practise", "Lead", "A brighter tomorrow"],
    display: ["Build.", "Evolve.", "Lead."],
    headline: "Corporate training that turns knowledge into real-world capability.",
    highlight: "capability",
    body: "XBPL | Learnings delivers practical, certification-oriented training across 1,500+ technology stacks, on-site, at our training centres or in virtual classrooms. Knowledge is your superpower; we're your sidekick.",
    ctas: [
      { label: "Explore Courses", href: "/courses" },
      { label: "Train Your Team", href: "/contact?interest=learning", variant: "outline" },
    ],
    image: {
      slot: "home/hero",
      alt: "A professional standing on a cliff edge at sunrise, looking out over a modern city skyline",
    },
  },

  // Figures from xbpl.in (live site).
  stats: {
    label: "XBPL at a glance",
    items: [
      { kind: "number", value: 2500, suffix: "+", label: "Technology Experts & Consultants" },
      { kind: "number", value: 1500, suffix: "+", label: "Technology Stacks Covered" },
      {
        kind: "text",
        title: "Startups to Fortune 500",
        label: "Solutions for businesses of every size",
      },
      {
        kind: "text",
        title: "Future Focused",
        label: "Experts in AI, Cloud, Cybersecurity & Emerging Technologies",
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

  featuredCta: {
    eyebrow: "Talk to us",
    title: "What's your next technology priority? Let's explore how XBPL can help.",
    href: "/contact",
    linkLabel: "Talk to an XBPL Expert",
  },

  latestInsights: { eyebrow: "Insight", linkLabel: "Read more" },

  tickerLabel: "Technology areas we build capability in",

  audiences: {
    eyebrow: "Learn with XBPL",
    title: "Built for teams. Loved by learners.",
    intro:
      "Whether you're upskilling a whole department or building your own career in tech, there's a path for you.",
    items: [
      {
        label: "For organizations",
        title: "Corporate training, tailored to your goals.",
        description:
          "Customised programmes that align your workforce with your strategy, from cybersecurity to data analytics and cloud.",
        points: [
          "Training needs assessment and custom curricula",
          "On-site, at our training centres or virtual",
          "Dedicated account manager and progress reporting",
        ],
        image: {
          slot: "learning/organizations",
          alt: "A training room set up for a corporate session",
        },
        cta: { label: "Train Your Team", href: "/contact?interest=learning" },
      },
      {
        label: "For learners & students",
        title: "Skills that get you hired and promoted.",
        description:
          "Practical, hands-on learning on the technologies employers use, with programmes that lead to recognised certifications.",
        points: [
          "Job-ready skills in data, AI, cloud and security",
          "Hands-on labs and real-world projects",
          "Industry-recognised certification paths",
        ],
        image: { slot: "learning/learners", alt: "Illustration of a student sketching an idea" },
        cta: { label: "Explore Courses", href: "/courses" },
      },
    ],
  },

  popularCourses: {
    eyebrow: "Popular programmes",
    title: "Start learning what's next.",
    intro: "A sample of our catalogue. Every programme can be tailored for your team.",
    cta: { label: "View all courses", href: "/courses" },
  },

  formats: {
    eyebrow: "Ways to learn",
    title: "Learning that actually sticks.",
    intro:
      "Mix the formats your teams need, from live sessions to hands-on labs, all mapped to the skills your business is building.",
    items: learning.approach.items,
    cta: { label: "Explore Learning & Capability", href: "/learning" },
  },

  // Add real, approved client logos here (files in /public/clients). Hidden while empty.
  clients: { title: "Trusted by teams at", logos: [] },

  // Add real, attributable testimonials here. Hidden while empty.
  testimonials: { title: "What teams say", items: [] },

  connected: {
    title: "People. Technology. Security.",
    subtitle: "Connected for a stronger tomorrow.",
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
