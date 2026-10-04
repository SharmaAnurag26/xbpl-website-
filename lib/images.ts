import type { IconName } from "@/lib/icons";

/**
 * Registry of every image slot on the site.
 *
 * Drop a file at public/images/<slot>.webp (or .avif/.jpg/.png) and it replaces the
 * designed fallback automatically on the next `pnpm dev` / `pnpm build`.
 * docs/IMAGE_BRIEF.md is generated from this list by `pnpm images`.
 */
export type SlotDef = {
  /** Recommended source size in px (width × height). Aspect ratio is derived from it. */
  width: number;
  height: number;
  /** Brief for the photographer / image generator. */
  subject: string;
  /** Fallback art shown until the real image exists. */
  fallback: { tone: "aurora" | "dark"; icon?: IconName };
};

export const imageSlots = {
  // ---- Home --------------------------------------------------------------
  "home/hero": {
    width: 2400,
    height: 1350,
    subject:
      "Lone professional with a backpack standing on a rocky ledge at sunrise, looking over a futuristic city skyline; a glowing blue light trail runs from the foreground into the city. Subject on the right third; left half darker and calm for headline text.",
    fallback: { tone: "aurora" },
  },
  "home/build": {
    width: 800,
    height: 500,
    subject:
      "Diverse team in a modern training room collaborating around a screen; cool blue grading, shallow depth of field.",
    fallback: { tone: "dark", icon: "graduation-cap" },
  },
  "home/evolve": {
    width: 800,
    height: 500,
    subject:
      "Glowing cloud icon hovering above server racks in a dark data centre; blue/cyan light.",
    fallback: { tone: "dark", icon: "cloud" },
  },
  "home/lead": {
    width: 800,
    height: 500,
    subject:
      "Digital shield with a padlock in front of a city skyline at dusk; blue holographic style.",
    fallback: { tone: "dark", icon: "shield-check" },
  },
  "home/band": {
    width: 1600,
    height: 700,
    subject:
      "Abstract flowing ribbons of blue and cyan light on deep navy; ribbons concentrated on the right half.",
    fallback: { tone: "aurora" },
  },
  "home/cta": {
    width: 1600,
    height: 700,
    subject:
      "Earth at night from orbit with glowing network connection arcs between cities; navy/blue palette, globe on the right.",
    fallback: { tone: "aurora", icon: "waypoints" },
  },

  // ---- Learning ----------------------------------------------------------
  "learning/hero": {
    width: 1600,
    height: 1100,
    subject:
      "Professional in a dark shirt interacting with a holographic learning interface (icons, panels) in a dark room lit in blue.",
    fallback: { tone: "dark", icon: "graduation-cap" },
  },

  // ---- Cloud -------------------------------------------------------------
  "cloud/hero": {
    width: 1600,
    height: 1100,
    subject:
      "Large luminous cloud made of light particles above rows of server racks; deep navy with electric blue glow.",
    fallback: { tone: "dark", icon: "cloud" },
  },
  "cloud/cta": {
    width: 1200,
    height: 800,
    subject:
      "Data-centre corridor with server racks receding into blue light; right-side focal point.",
    fallback: { tone: "dark", icon: "layers" },
  },

  // ---- Security ----------------------------------------------------------
  "security/hero": {
    width: 1600,
    height: 1100,
    subject:
      "Glowing blue shield with a padlock at its centre, surrounded by fine circuit lines on navy.",
    fallback: { tone: "dark", icon: "shield-check" },
  },
  "security/cta": {
    width: 1200,
    height: 800,
    subject:
      "Professional at a desk facing a large world-map threat dashboard in a dark SOC; blue tones.",
    fallback: { tone: "dark", icon: "radar" },
  },

  // ---- About -------------------------------------------------------------
  "about/hero": {
    width: 1600,
    height: 1100,
    subject:
      "Modern glass office tower at dusk, looking up, with blue interior light (XBPL signage only if photographed on the real building).",
    fallback: { tone: "dark", icon: "building" },
  },
  "about/band": {
    width: 1600,
    height: 700,
    subject:
      "Silhouettes of people helping each other climb a mountain ridge at sunrise; warm sun on the right, navy sky.",
    fallback: { tone: "aurora", icon: "trending-up" },
  },

  // ---- Insights ----------------------------------------------------------
  "insights/hero": {
    width: 1600,
    height: 1100,
    subject:
      "Professional with glasses studying data on multiple screens, blue monitor light on the face; dark office.",
    fallback: { tone: "dark", icon: "chart" },
  },
  "insights/from-experimentation-to-enterprise-value": {
    width: 1200,
    height: 675,
    subject: "Stylised glowing AI brain / neural network on navy.",
    fallback: { tone: "dark", icon: "brain" },
  },
  "insights/cloud-migration-key-considerations": {
    width: 1200,
    height: 675,
    subject: "Glowing cloud above a data-centre floor; blue tones.",
    fallback: { tone: "dark", icon: "cloud-upload" },
  },
  "insights/evolving-threat-landscape": {
    width: 1200,
    height: 675,
    subject: "Padlock inside a digital shield with circuit patterns.",
    fallback: { tone: "dark", icon: "shield-half" },
  },
  "insights/building-a-future-ready-technology-workforce": {
    width: 1200,
    height: 675,
    subject: "Small team of professionals discussing around a laptop; modern office, blue grade.",
    fallback: { tone: "dark", icon: "users" },
  },
  "insights/cloud-and-security-in-digital-transformation": {
    width: 1200,
    height: 675,
    subject: "Cloud and shield icons connected over a server landscape; navy/blue.",
    fallback: { tone: "dark", icon: "cloud-check" },
  },
  "insights/technology-trends-to-watch": {
    width: 1200,
    height: 675,
    subject: "Abstract futuristic cityscape with data streams; cyan highlights.",
    fallback: { tone: "dark", icon: "rocket" },
  },

  // ---- Learning: audiences & study ------------------------------------
  "learning/organizations": {
    width: 1600,
    height: 1067,
    subject: "Training room or workshop set up for a corporate session.",
    fallback: { tone: "dark", icon: "presentation" },
  },
  "learning/learners": {
    width: 1600,
    height: 1067,
    subject: "Individual learner studying on a laptop.",
    fallback: { tone: "dark", icon: "graduation-cap" },
  },
  "learning/study": {
    width: 1600,
    height: 1067,
    subject: "Study still life: notebook, pencil, laptop.",
    fallback: { tone: "dark", icon: "book-open" },
  },

  // ---- Courses -------------------------------------------------------------
  "courses/data-science-r": {
    width: 1200,
    height: 800,
    subject: "Code or statistical charts on a screen.",
    fallback: { tone: "dark", icon: "chart" },
  },
  "courses/data-science-python": {
    width: 1200,
    height: 800,
    subject: "Developer writing Python on a laptop.",
    fallback: { tone: "dark", icon: "code" },
  },
  "courses/data-analytics-visualization": {
    width: 1200,
    height: 800,
    subject: "Dashboards or data visualisation on a laptop.",
    fallback: { tone: "dark", icon: "chart" },
  },
  "courses/generative-ai": {
    width: 1200,
    height: 800,
    subject: "Abstract AI / code visual.",
    fallback: { tone: "dark", icon: "brain" },
  },
  "courses/network-security": {
    width: 1200,
    height: 800,
    subject: "Network infrastructure (switches, cables) or abstract network visual.",
    fallback: { tone: "dark", icon: "network" },
  },
  "courses/cyber-security": {
    width: 1200,
    height: 800,
    subject: "Security visual (shield, padlock, SOC screens).",
    fallback: { tone: "dark", icon: "shield-check" },
  },

  // ---- Contact -----------------------------------------------------------
  "contact/hero": {
    width: 2400,
    height: 900,
    subject:
      "City skyline at night with long-exposure light trails on a highway leading into it; text-safe dark area on the left.",
    fallback: { tone: "aurora" },
  },
} satisfies Record<string, SlotDef>;

export type ImageSlotKey = keyof typeof imageSlots;

export const imageSlotKeys = Object.keys(imageSlots) as ImageSlotKey[];

export function isImageSlotKey(value: string): value is ImageSlotKey {
  return value in imageSlots;
}
