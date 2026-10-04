import type { ImageSlotKey } from "@/lib/images";

/**
 * Illustrations supplied by XBPL (originals in assets/illustrations/).
 * Shared by import-illustrations.ts (renders the slots) and fetch-photos.ts (credits).
 * `extract` crops the source (in source pixels) before it is resized to the slot.
 * `pad` extends the image to the slot's aspect ratio instead of cropping it: "white" adds
 * white margins, "blur" fills with a blurred stretch of the image (soft gradient backgrounds).
 */
export type Illustration = {
  slot: ImageSlotKey;
  file: string;
  subject: string;
  extract?: { left: number; top: number; width: number; height: number };
  pad?: "white" | "blur";
};

export const illustrations: Illustration[] = [
  {
    slot: "courses/generative-ai",
    file: "isometric-ai-robot.jpg",
    subject: "Isometric AI robot connected to chat, analytics and power",
    extract: { left: 0, top: 720, width: 4000, height: 2667 },
  },
  {
    slot: "courses/data-science-python",
    file: "brain-circuit.jpg",
    subject: "Brain with circuit-like neural connections",
  },
  {
    slot: "courses/data-science-r",
    file: "isometric-data-workplace.jpg",
    subject: "Isometric data workplace with charts and analysts",
  },
  {
    slot: "courses/data-analytics-visualization",
    file: "team-analytics-dashboard.jpg",
    subject: "Team around an analytics dashboard",
  },
  {
    slot: "courses/network-security",
    file: "fingerprint-unlock-shields.jpg",
    subject: "Fingerprint unlock, shields and server racks",
  },
  {
    slot: "courses/cyber-security",
    file: "cyber-threats-set.jpg",
    subject: "Cyber threats: phishing, password theft, ransomware, spoofing",
    // The six small vignettes on the right of the set.
    extract: { left: 1560, top: 0, width: 2440, height: 1458 },
    pad: "white",
  },
  {
    slot: "insights/cloud-migration-key-considerations",
    file: "isometric-cloud-upload.jpg",
    subject: "Isometric cloud upload",
  },
  {
    slot: "insights/from-experimentation-to-enterprise-value",
    file: "brain-realistic.jpg",
    subject: "Human brain on a soft grey background",
    extract: { left: 0, top: 250, width: 4000, height: 3200 },
    pad: "blur",
  },
  {
    slot: "learning/learners",
    file: "student-idea.jpg",
    subject: "Student drawing, with a lightbulb idea",
    extract: { left: 0, top: 500, width: 4000, height: 2667 },
  },
];
