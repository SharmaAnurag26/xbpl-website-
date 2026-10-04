import type { CoursesPageContent } from "../types";

export const courses: CoursesPageContent = {
  seo: {
    title: "Courses",
    description:
      "Explore XBPL | Learnings courses in data science, generative AI, data analytics, network security and cybersecurity, delivered on-site, at our training centres or virtually.",
  },

  hero: {
    keyword: "XBPL | Learnings · Courses",
    title: "Learn the skills that move careers and companies forward.",
    body: "Practical, certification-oriented programmes taught by seasoned trainers, for corporate teams and individual learners alike.",
    ladder: ["Learn", "Practise", "Certify"],
    cta: { label: "Talk to a Learning Advisor", href: "/contact?interest=learning" },
    image: { slot: "learning/study", alt: "A notebook and pencil on a desk" },
  },

  catalogue: {
    eyebrow: "Course catalogue",
    title: "Find your next programme.",
    intro:
      "Can't see what you need? We cover 1,500+ technology stacks and design custom programmes for your team.",
    filterLabel: "Filter courses by category",
    enquireLabel: "Enquire",
  },

  cta: {
    title: "Need training for your whole team?",
    body: "Tell us your goals. We'll design a customised programme, delivered on-site, at our training centres or virtually.",
    cta: { label: "Request a Custom Programme", href: "/contact?interest=learning" },
    image: { slot: "learning/organizations", alt: "" },
  },
};
