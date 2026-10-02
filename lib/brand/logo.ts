/**
 * Single source of truth for the XBPL logo geometry.
 *
 * Coordinates are in the pixel space of reference/logo.jpeg so shapes can be checked
 * against the original by eye. Used by components/brand/Logo.tsx (inline SVG) and by
 * scripts/gen-icons.ts (static SVG/PNG/ICO files). The tagline is drawn with strokes,
 * so the logo never depends on a font being available.
 */

export type LogoVariant = "color" | "on-dark" | "mono-white";

export const NAVY = "#0a1f44";
export const CYAN = "#08d9ee";

/** Full lock-up (mark + "BPL" + tagline). */
export const FULL_VIEWBOX = { x: 118, y: 343, w: 1212, h: 420 } as const;
/** Lock-up without the tagline, for compact headers. */
export const WORDMARK_VIEWBOX = { x: 118, y: 343, w: 1212, h: 322 } as const;
/** The "X" mark alone (icons wrap it in a square canvas). */
export const MARK_VIEWBOX = { x: 120, y: 345, w: 500, h: 317 } as const;

// ---------------------------------------------------------------------------
// "X" mark: three slanted blades. Corners are softened by a same-paint stroke
// with round joins (see Logo.tsx), so the polygons themselves stay simple.
// ---------------------------------------------------------------------------
export const markBlades = {
  /** Main blade, top-left → bottom-right. */
  main: "150,385 260,385 556,652 446,652",
  /** Upper-right blade, cut parallel to the main blade. */
  upper: "515,355 610,355 428.6,517 381,474.4",
  /** Lower-left blade, cut parallel to the main blade. */
  lower: "130,652 232,652 328.7,565.7 277.8,520",
} as const;

export type GradientStop = { offset: number; color: string };
export type LinearGradientDef = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stops: GradientStop[];
};

export const markGradients: LinearGradientDef[] = [
  {
    id: "main",
    x1: 150,
    y1: 385,
    x2: 556,
    y2: 652,
    stops: [
      { offset: 0, color: "#0a3ec2" },
      { offset: 0.42, color: "#1668f2" },
      { offset: 0.53, color: "#3cc4f6" },
      { offset: 0.66, color: "#1557e0" },
      { offset: 1, color: "#0a3fbf" },
    ],
  },
  {
    id: "upper",
    x1: 381,
    y1: 500,
    x2: 610,
    y2: 355,
    stops: [
      { offset: 0, color: "#0b4fe0" },
      { offset: 1, color: CYAN },
    ],
  },
  {
    id: "lower",
    x1: 130,
    y1: 652,
    x2: 329,
    y2: 540,
    stops: [
      { offset: 0, color: "#0b3fc4" },
      { offset: 1, color: "#1f86f3" },
    ],
  },
];

// ---------------------------------------------------------------------------
// "BPL": geometric strokes, 44px wide, cap height 430 → 652.
// ---------------------------------------------------------------------------
export const LETTER_STROKE = 44;

export const letterPaths = {
  bTop: "M540 452 H690 A44.5 44.5 0 0 1 690 541",
  bBottom: "M520 541 H705 A44.5 44.5 0 0 1 705 630 H566",
  p: "M843 652 V496 A44 44 0 0 1 887 452 H930 A44.5 44.5 0 0 1 930 541 H843",
  l: "M1092 430 V586 A44 44 0 0 0 1136 630 H1282",
} as const;

/** Light accents where the letters "catch" the gradient, as in the original. */
export const letterAccents = {
  bMiddle: { d: "M514 541 H640", x1: 514, x2: 640 },
  lFoot: { d: "M1180 630 H1282", x1: 1180, x2: 1282 },
} as const;

/** Chamfered end of the "L" foot. */
export const lFootTip = "1280,608 1290,608 1316,652 1280,652";

// ---------------------------------------------------------------------------
// Tagline: "BUILD • EVOLVE • LEAD" as stroked glyph centre-lines.
// ---------------------------------------------------------------------------
const TAG_TOP = 717;
const TAG_BOTTOM = 748;
const TAG_MID = (TAG_TOP + TAG_BOTTOM) / 2;
const TRACKING = 22;
const WORD_GAP = 66; // space either side of a dot
export const TAGLINE_STROKE = 4.5;
export const DOT_RADIUS = 10;

type Glyph = { width: number; path: (x: number) => string };

const t = TAG_TOP;
const b = TAG_BOTTOM;

const glyphs: Record<string, Glyph> = {
  B: {
    width: 26,
    path: (x) =>
      `M${x} ${t} V${b} M${x} ${t} H${x + 15} A7.5 7.5 0 0 1 ${x + 15} ${t + 15} H${x} ` +
      `M${x + 15} ${t + 15} H${x + 17} A8 8 0 0 1 ${x + 17} ${b} H${x}`,
  },
  U: {
    width: 22,
    path: (x) => `M${x} ${t} V${b - 11} A11 11 0 0 0 ${x + 22} ${b - 11} V${t}`,
  },
  I: { width: 0, path: (x) => `M${x} ${t} V${b}` },
  L: { width: 20, path: (x) => `M${x} ${t} V${b} H${x + 20}` },
  D: {
    width: 26.5,
    path: (x) => `M${x} ${t} H${x + 11} A15.5 15.5 0 0 1 ${x + 11} ${b} H${x} Z`,
  },
  E: {
    width: 20,
    path: (x) => `M${x + 20} ${t} H${x} V${b} H${x + 20} M${x} ${TAG_MID} H${x + 17}`,
  },
  V: { width: 28, path: (x) => `M${x} ${t} L${x + 14} ${b} L${x + 28} ${t}` },
  O: {
    width: 31,
    path: (x) =>
      `M${x} ${TAG_MID} A15.5 15.5 0 1 0 ${x + 31} ${TAG_MID} A15.5 15.5 0 1 0 ${x} ${TAG_MID}`,
  },
  A: {
    width: 28,
    path: (x) => `M${x} ${b} L${x + 14} ${t} L${x + 28} ${b} M${x + 4.5} ${t + 21} H${x + 23.5}`,
  },
};

function wordWidth(word: string): number {
  return [...word].reduce(
    (sum, ch, i) => sum + (glyphs[ch]?.width ?? 0) + (i > 0 ? TRACKING : 0),
    0,
  );
}

function layoutTagline() {
  const words = ["BUILD", "EVOLVE", "LEAD"];
  const total = words.reduce((sum, w) => sum + wordWidth(w), 0) + (words.length - 1) * WORD_GAP * 2;
  // Centre the tagline under the full lock-up (mark left edge 130 → "L" tip 1316).
  let x = (130 + 1316) / 2 - total / 2;
  const segments: string[] = [];
  const dots: { cx: number; cy: number }[] = [];

  words.forEach((word, wi) => {
    [...word].forEach((ch, ci) => {
      const glyph = glyphs[ch];
      if (!glyph) return;
      if (ci > 0) x += TRACKING;
      segments.push(glyph.path(x));
      x += glyph.width;
    });
    if (wi < words.length - 1) {
      dots.push({ cx: x + WORD_GAP, cy: TAG_MID });
      x += WORD_GAP * 2;
    }
  });

  return { d: segments.join(" "), dots };
}

export const tagline = layoutTagline();

export const dotGradient: LinearGradientDef = {
  id: "dot",
  x1: 0,
  y1: 0,
  x2: 1,
  y2: 1,
  stops: [
    { offset: 0, color: "#1668f2" },
    { offset: 1, color: CYAN },
  ],
};

/** Paint for the letters/tagline for each variant. */
export function inkFor(variant: LogoVariant): string {
  return variant === "color" ? NAVY : "#ffffff";
}

export const viewBoxString = (v: { x: number; y: number; w: number; h: number }) =>
  `${v.x} ${v.y} ${v.w} ${v.h}`;
