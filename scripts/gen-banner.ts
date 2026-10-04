/**
 * Generates the Home hero banner (public/images/home/hero.webp, 2400×1350): a stylised
 * dawn skyline with light trails in the XBPL palette. The left ~45% stays dark so the
 * hero copy remains readable. Deterministic (seeded), so re-running gives the same image.
 *
 * Run: pnpm banner   (then `pnpm images` refreshes the manifest; dev/build do it automatically)
 */
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const W = 2400;
const H = 1350;
const HORIZON = 905;
const SUN = { x: 1720, y: 885 };

/** Small seeded PRNG (mulberry32) so the artwork is reproducible. */
function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r = (n: number) => n.toFixed(1);

/* ---------------------------------------------------------------- stars */
function stars(): string {
  const rand = rng(7);
  let out = "";
  for (let i = 0; i < 260; i++) {
    const x = rand() * W;
    const y = rand() * HORIZON * 0.75;
    const size = rand() < 0.08 ? 1.8 : 0.9;
    const o = 0.15 + rand() * 0.55;
    out += `<circle cx="${r(x)}" cy="${r(y)}" r="${size}" fill="#cfefff" opacity="${o.toFixed(2)}"/>`;
  }
  return out;
}

/* ---------------------------------------------------------------- skyline */
type Layer = {
  seed: number;
  base: number;
  maxH: number;
  minH: number;
  fill: string;
  windows: number; // probability a window is lit
  windowFill: string;
  spread: number; // width of the tall city centre (gaussian sigma, px)
};

function skyline(l: Layer): string {
  const rand = rng(l.seed);
  let buildings = "";
  let windows = "";
  let x = 380 + rand() * 40;
  while (x < W + 40) {
    const w = 34 + rand() * 70;
    // Taller towers near the sunrise, tapering out to the edges.
    const envelope = Math.exp(-((x - SUN.x) ** 2) / (2 * l.spread ** 2));
    const h = l.minH + (l.maxH - l.minH) * envelope * (0.45 + rand() * 0.55);
    const top = l.base - h;
    buildings += `<rect x="${r(x)}" y="${r(top)}" width="${r(w)}" height="${r(h + 2)}"/>`;
    // Occasional spire or stepped crown.
    if (h > l.maxH * 0.55 && rand() < 0.35) {
      buildings += `<rect x="${r(x + w / 2 - 2)}" y="${r(top - 46 - rand() * 50)}" width="4" height="${r(60 + rand() * 40)}"/>`;
    } else if (rand() < 0.3) {
      buildings += `<rect x="${r(x + w * 0.18)}" y="${r(top - 18)}" width="${r(w * 0.64)}" height="20"/>`;
    }
    if (l.windows > 0) {
      for (let wy = top + 14; wy < l.base - 16; wy += 20) {
        for (let wx = x + 7; wx < x + w - 9; wx += 12) {
          if (rand() < l.windows) {
            windows += `<rect x="${r(wx)}" y="${r(wy)}" width="5" height="8" opacity="${(0.35 + rand() * 0.6).toFixed(2)}"/>`;
          }
        }
      }
    }
    x += w + rand() * 6;
  }
  return `<g fill="${l.fill}">${buildings}</g><g fill="${l.windowFill}">${windows}</g>`;
}

/* ---------------------------------------------------------------- light trails */
function trails(): string {
  const lines: string[] = [];
  const count = 9;
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1); // 0 = inner lane, 1 = outer lane
    const startX = 760 + t * 1080;
    const c1x = 1060 + t * 760;
    const c2x = 1520 + t * 300;
    const d = `M${startX} ${H + 20} C ${c1x} 1180, ${c2x} 1000, ${SUN.x - 14 + t * 28} ${HORIZON + 2}`;
    const core = i === 3 || i === 6;
    lines.push(
      `<path d="${d}" stroke="url(#trail)" stroke-width="${core ? 7 : 2.4}" fill="none" stroke-linecap="round" opacity="${core ? 1 : 0.7}"/>`,
    );
  }
  const crisp = lines.join("");
  return `<g filter="url(#glow)">${crisp}</g>${crisp}`;
}

/* ---------------------------------------------------------------- particles */
function particles(): string {
  const rand = rng(21);
  let out = "";
  for (let i = 0; i < 70; i++) {
    const x = 900 + rand() * 1500;
    const y = 300 + rand() * 900;
    out += `<circle cx="${r(x)}" cy="${r(y)}" r="${r(1 + rand() * 2.2)}" fill="#5ee3f0" opacity="${(0.2 + rand() * 0.6).toFixed(2)}"/>`;
  }
  return `<g filter="url(#softglow)">${out}</g>`;
}

/* ---------------------------------------------------------------- ground grid */
function grid(): string {
  let out = "";
  for (let i = -14; i <= 14; i++) {
    out += `<line x1="${SUN.x}" y1="${HORIZON}" x2="${SUN.x + i * 640}" y2="${H}" />`;
  }
  for (let k = 1; k <= 9; k++) {
    const y = HORIZON + (H - HORIZON) * (k / 9) ** 2.1;
    out += `<line x1="0" y1="${r(y)}" x2="${W}" y2="${r(y)}" />`;
  }
  return `<g stroke="#2a9bf8" stroke-width="1.2" opacity="0.16">${out}</g>`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#040d1f"/>
    <stop offset="0.45" stop-color="#08214a"/>
    <stop offset="0.68" stop-color="#0b3f84"/>
    <stop offset="1" stop-color="#0a6ec7"/>
  </linearGradient>
  <radialGradient id="sun" cx="${SUN.x}" cy="${SUN.y}" r="1150" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#f2feff" stop-opacity="1"/>
    <stop offset="0.07" stop-color="#9af2fa" stop-opacity="0.9"/>
    <stop offset="0.24" stop-color="#08cfe3" stop-opacity="0.5"/>
    <stop offset="0.5" stop-color="#0879f9" stop-opacity="0.24"/>
    <stop offset="1" stop-color="#0879f9" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0a2c59"/>
    <stop offset="0.35" stop-color="#061733"/>
    <stop offset="1" stop-color="#030a18"/>
  </linearGradient>
  <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#5ee3f0" stop-opacity="0"/>
    <stop offset="0.7" stop-color="#5ee3f0" stop-opacity="0.22"/>
    <stop offset="1" stop-color="#5ee3f0" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="trail" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0" stop-color="#0879f9" stop-opacity="0.15"/>
    <stop offset="0.45" stop-color="#0879f9" stop-opacity="0.95"/>
    <stop offset="1" stop-color="#bff7ff" stop-opacity="1"/>
  </linearGradient>
  <linearGradient id="textside" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#040d1f" stop-opacity="0.92"/>
    <stop offset="0.38" stop-color="#040d1f" stop-opacity="0.6"/>
    <stop offset="0.62" stop-color="#040d1f" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="backlit" x1="0" y1="${HORIZON - 520}" x2="0" y2="${HORIZON}" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#0d3a78"/>
    <stop offset="1" stop-color="#4fb4ec"/>
  </linearGradient>
  <linearGradient id="ridge" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#061430"/>
    <stop offset="1" stop-color="#02060f"/>
  </linearGradient>
  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9"/></filter>
  <filter id="softglow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter>
  <filter id="haze-blur"><feGaussianBlur stdDeviation="14"/></filter>
</defs>

<rect width="${W}" height="${H}" fill="url(#sky)"/>
${stars()}
<rect width="${W}" height="${H}" fill="url(#sun)"/>

<!-- far, hazy skyline -->
<g opacity="0.5">${skyline({ seed: 3, base: HORIZON, minH: 40, maxH: 470, fill: "url(#backlit)", windows: 0, windowFill: "#fff", spread: 520 })}</g>
<rect x="0" y="${HORIZON - 190}" width="${W}" height="230" fill="url(#haze)" filter="url(#haze-blur)"/>
<!-- mid skyline with lit windows -->
${skyline({ seed: 11, base: HORIZON + 4, minH: 30, maxH: 380, fill: "#0b2a58", windows: 0.22, windowFill: "#8ff0f8", spread: 420 })}

<!-- ground, grid and light trails -->
<rect y="${HORIZON}" width="${W}" height="${H - HORIZON}" fill="url(#ground)"/>
${grid()}
<ellipse cx="${SUN.x}" cy="${HORIZON}" rx="980" ry="46" fill="#5ee3f0" opacity="0.55" filter="url(#haze-blur)"/>
<ellipse cx="${SUN.x}" cy="${HORIZON}" rx="420" ry="9" fill="#e9fdff" opacity="0.85" filter="url(#softglow)"/>
${trails()}
${particles()}

<!-- foreground ridge rising to a cliff on the right -->
<path d="M0 1240 C 380 1215, 760 1250, 1080 1262 S 1700 1226, 1980 1150 L 2140 1105 L 2400 1088 L 2400 ${H} L 0 ${H} Z" fill="url(#ridge)"/>
<path d="M1980 1150 L 2140 1105 L 2400 1088" stroke="#2a9bf8" stroke-opacity="0.35" stroke-width="2" fill="none"/>

<!-- keep the copy side dark -->
<rect width="${W}" height="${H}" fill="url(#textside)"/>
</svg>`;

async function main() {
  const out = path.join(process.cwd(), "public", "images", "home", "hero.webp");
  await mkdir(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(svg)).webp({ quality: 80, effort: 6 }).toFile(out);
  const { size } = await stat(out);
  console.log(`Banner written: public/images/home/hero.webp (${(size / 1024).toFixed(0)} KB)`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
