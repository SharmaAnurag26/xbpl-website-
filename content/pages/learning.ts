import type { LearningPageContent } from "../types";

// Sources: xbpl.in/learnings.php (live site, lightly edited for grammar) and the
// redesign mockup (headings, technology areas, Learn → Reinforce band).

export const learning: LearningPageContent = {
  seo: {
    title: "Learning & Capability",
    description:
      "XBPL | Learnings delivers customised corporate technology training (on-site, at our training centres or in virtual classrooms) with industry-recognised certifications.",
  },

  hero: {
    keyword: "Build · XBPL | Learnings",
    title: "Technology capability for what's next.",
    body: "Acquire essential tech skills, shorten project timelines, build happier and more confident tech teams, and transform strategy through AI-driven innovation.",
    ladder: ["Skills", "People", "Possibilities"],
    cta: { label: "Talk to Our Learning Experts", href: "/contact?interest=learning" },
    image: {
      slot: "learning/hero",
      alt: "A professional working with a holographic learning interface",
    },
  },

  intro: {
    eyebrow: "Knowledge is your superpower. We're your sidekick.",
    title: "A new era in corporate learning.",
    paragraphs: [
      "XBPL | Learnings is a corporate training company built to fix what has long held professional development back. Our journey began with one commitment: to transform corporate training with modern technology and data-driven insight.",
      "Our aim is to help businesses unlock the true potential of their teams, raise performance and move toward their strategic goals, with a training path that is dynamic, customisable and built around your needs.",
    ],
    challenges: [
      {
        title: "Challenges in training delivery",
        description: "Organizations struggle with:",
        bullets: ["Engaging the workforce", "Adaptable training solutions", "Scalability"],
        icon: "users",
      },
      {
        title: "Limits of conventional approaches",
        description: "Common problems include:",
        bullets: ["Stale content", "Lacklustre delivery", "No personalisation"],
        icon: "scroll",
      },
    ],
  },

  approach: {
    title: "Our Learning Approach",
    intro: "From learning programs to workforce transformation.",
    items: [
      {
        title: "Instructor-Led Training",
        description:
          "Delivered on-site at your location, at our training centres or in virtual classrooms, with minimal disruption to your operations.",
        icon: "presentation",
        tone: "surface",
        sticker: "capsules",
        tag: "Flexible",
      },
      {
        title: "Hands-On Labs & Simulations",
        description: "Real-world, practical learning your teams can apply immediately.",
        icon: "flask",
        tone: "brand",
        sticker: "glass-cube",
        tag: "Hands-on",
      },
      {
        title: "Assessments & Certifications",
        description: "Many programmes lead to globally recognised certifications.",
        icon: "award",
        tone: "volt",
      },
      {
        title: "Mentoring & Reinforcement",
        description: "Ongoing support and resources after every session.",
        icon: "messages",
        tone: "cyan",
      },
      {
        title: "Capability Assessment",
        description: "We start with your needs, then design programmes around your business goals.",
        icon: "clipboard-check",
        tone: "surface",
        sticker: "knot",
      },
      {
        title: "Learning Architecture",
        description: "Tailored curricula for cybersecurity, data analytics, cloud and more.",
        icon: "waypoints",
        tone: "surface",
        sticker: "rings",
      },
    ],
  },

  // Course titles from xbpl.in. Summaries describe each topic in general terms.
  // TODO: confirm with client (the live site only had placeholder descriptions).
  courses: {
    eyebrow: "Explore our courses",
    title: "Popular programmes.",
    intro: "A sample of our catalogue. Every programme can be tailored for your teams.",
    formats: ["On-site", "Training centre", "Virtual classroom"],
    items: [
      {
        slug: "data-science-with-r",
        title: "Data Science with R",
        category: "Data Science",
        icon: "chart",
        image: "courses/data-science-r",
        summary:
          "Statistics, data wrangling and visualisation with R, from fundamentals to applied analysis.",
      },
      {
        slug: "data-science-with-python",
        title: "Data Science with Python",
        category: "Data Science",
        icon: "code",
        image: "courses/data-science-python",
        summary: "Analyse data and build models with Python's data-science ecosystem.",
      },
      {
        slug: "data-analytics-visualization",
        title: "Data Analytics & Data Visualization",
        category: "Data Science",
        icon: "chart",
        image: "courses/data-analytics-visualization",
        summary:
          "Turn raw data into clear insight with analysis techniques and compelling dashboards.",
      },
      {
        slug: "gen-ai-certificate",
        title: "Certificate Programs on Gen AI",
        category: "AI",
        icon: "brain",
        image: "courses/generative-ai",
        summary: "Understand generative AI and apply it responsibly in real business workflows.",
      },
      {
        slug: "network-security",
        title: "Network Security",
        category: "Cybersecurity",
        icon: "network",
        image: "courses/network-security",
        summary:
          "Secure networks with firewalls, intrusion detection, secure architecture and VPNs.",
      },
      {
        slug: "cyber-security",
        title: "Cyber Security",
        category: "Cybersecurity",
        icon: "shield-check",
        image: "courses/cyber-security",
        summary: "Core security skills: threats, risk, defence and incident response.",
      },
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

  whyChoose: {
    eyebrow: "Why choose XBPL | Learnings",
    title: "Because you have more to choose.",
    items: [
      {
        title: "Industry-specific expertise",
        description:
          "Seasoned trainers who understand the training needs and challenges of businesses across industries.",
        icon: "briefcase",
      },
      {
        title: "Customised corporate training",
        description:
          "Programmes tailored to your goals, whether that's cybersecurity, data analytics or cloud technologies.",
        icon: "sliders",
      },
      {
        title: "Flexible training delivery",
        description: "On-site at your location, at our training centres or in virtual classrooms.",
        icon: "laptop",
      },
      {
        title: "Practical, applicable learning",
        description:
          "Real-world skills your teams can apply immediately for tangible business value.",
        icon: "wrench",
      },
      {
        title: "Industry-recognised certifications",
        description:
          "Many programmes lead to globally recognised certifications that boost your team's credibility.",
        icon: "badge-check",
      },
      {
        title: "Dedicated account management",
        description:
          "One point of contact who works closely with you to meet your training objectives.",
        icon: "headset",
      },
      {
        title: "Comprehensive training portfolio",
        description: "A wide catalogue of IT courses for IT departments and wider teams alike.",
        icon: "layers",
      },
      {
        title: "Quality assurance",
        description:
          "Internal quality processes and feedback loops so training keeps improving with your needs.",
        icon: "shield-check",
      },
      {
        title: "Cost-effective solutions",
        description: "Competitive pricing and flexible payment options for corporate clients.",
        icon: "piggy-bank",
      },
      {
        title: "Proven B2B success",
        description:
          "A track record of helping businesses across industries meet their training goals.",
        icon: "handshake",
      },
    ],
  },

  engagement: {
    eyebrow: "7-step engagement process",
    title: "From first call to lasting capability.",
    intro: "A clear, guided process, so engagement and satisfaction are built in from day one.",
    steps: [
      {
        title: "Initial contact and needs assessment",
        bullets: ["Client enquiry", "Needs assessment"],
      },
      {
        title: "Proposal and agreement",
        bullets: ["Customised proposal", "Negotiation and agreement"],
      },
      {
        title: "Training delivery",
        bullets: ["Scheduling", "Training sessions", "Feedback collection"],
      },
      { title: "Programme development", bullets: ["Curriculum design", "Resource allocation"] },
      { title: "Assessment and feedback", bullets: ["Assessment", "Feedback loop"] },
      {
        title: "Reporting and progress tracking",
        bullets: ["Progress reports", "Performance metrics"],
      },
      { title: "Support and resources", bullets: ["Ongoing support", "Resource access"] },
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

  faq: {
    title: "Questions, answered.",
    items: [
      {
        question: "How is training delivered?",
        answer:
          "However suits you best: on-site at your location, at our training centres, or through virtual classrooms, with minimal disruption to your operations.",
      },
      {
        question: "Can programmes be tailored to our organization?",
        answer:
          "Yes. We specialise in customised corporate training aligned to your business goals, whether you're upskilling in cybersecurity, data analytics or cloud technologies.",
      },
      {
        question: "Do your programmes lead to certifications?",
        answer:
          "Many of our programmes lead to globally recognised certifications that strengthen your team's credibility and marketability.",
      },
      {
        question: "Will we have a single point of contact?",
        answer:
          "Yes. A dedicated account manager works closely with your organization to make sure your training objectives are met.",
      },
      {
        question: "Which technology areas do you cover?",
        answer:
          "AI & Generative AI, Cloud, Cybersecurity, Data & Analytics, DevOps, Software Engineering, Enterprise Applications, Project & Agile, Automation and Emerging Technologies.",
      },
      {
        question: "How do we get started?",
        answer:
          "Tell us about your goals through the contact form, or call +91 99532 71747. Our learning team will plan the next step with you.",
      },
    ],
  },
};
