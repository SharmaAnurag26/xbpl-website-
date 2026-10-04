/**
 * Verifies WCAG 2.2 contrast for every text/background pairing the design system uses.
 * Run: pnpm contrast. Exits non-zero if any pair falls below its required ratio.
 */

type Pair = { label: string; fg: string; bg: string; min: number };

const AA_TEXT = 4.5;
const AA_LARGE = 3;

const pairs: Pair[] = [
  // Dark editorial theme: text on the black canvas and raised surfaces
  { label: "ink on canvas", fg: "#ffffff", bg: "#000000", min: AA_TEXT },
  { label: "muted on canvas", fg: "#a7adb8", bg: "#000000", min: AA_TEXT },
  { label: "muted on surface", fg: "#a7adb8", bg: "#0e0f13", min: AA_TEXT },
  { label: "muted on surface-2", fg: "#a7adb8", bg: "#17191f", min: AA_TEXT },
  { label: "brand-text on canvas", fg: "#6cb4ff", bg: "#000000", min: AA_TEXT },
  { label: "brand-text on surface", fg: "#6cb4ff", bg: "#0e0f13", min: AA_TEXT },
  { label: "cyan-soft on canvas", fg: "#5ee3f0", bg: "#000000", min: AA_TEXT },
  { label: "error on surface", fg: "#ff7b7b", bg: "#0e0f13", min: AA_TEXT },
  { label: "success on canvas", fg: "#4ade9b", bg: "#000000", min: AA_TEXT },
  { label: "brand (display) on canvas", fg: "#0879f9", bg: "#000000", min: AA_LARGE },
  // Solid colour tiles
  { label: "white on brand fill tile", fg: "#ffffff", bg: "#0663d4", min: AA_TEXT },
  { label: "black on cyan tile", fg: "#000000", bg: "#08cfe3", min: AA_TEXT },
  { label: "black on volt tile", fg: "#000000", bg: "#d4ff3a", min: AA_TEXT },
  { label: "volt text on black chip", fg: "#d4ff3a", bg: "#000000", min: AA_TEXT },
  { label: "white on navy-3 sub-nav", fg: "#ffffff", bg: "#0a2c59", min: AA_TEXT },
  { label: "white on navy-2 tile", fg: "#ffffff", bg: "#0a2448", min: AA_TEXT },
  // Primary button gradient: white text must pass at both ends
  { label: "white on btn start", fg: "#ffffff", bg: "#0663d4", min: AA_TEXT },
  { label: "white on btn end", fg: "#ffffff", bg: "#0874b0", min: AA_TEXT },
  { label: "white on btn hover start", fg: "#ffffff", bg: "#0556bb", min: AA_TEXT },
  // Article/legal headers keep the navy gradient
  { label: "on-dark-muted on navy", fg: "#a7adb8", bg: "#06162e", min: AA_TEXT },
  { label: "on-dark-muted on hero mid", fg: "#a7adb8", bg: "#0a2c59", min: AA_TEXT },
];

function channel(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const n = Number.parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 0xff;
  const g = (n >> 8) & 0xff;
  const b = n & 0xff;
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function ratio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

let failed = 0;
for (const p of pairs) {
  const r = ratio(p.fg, p.bg);
  const ok = r >= p.min;
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${r.toFixed(2).padStart(5)}:1  (min ${p.min})  ${p.label}`);
}

if (failed > 0) {
  console.error(`\n${failed} pair(s) below WCAG AA.`);
  process.exit(1);
}
console.log("\nAll pairs meet WCAG 2.2 AA.");
