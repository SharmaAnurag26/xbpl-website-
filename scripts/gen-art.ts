/**
 * Generates abstract brand artwork (WebP) for every image slot in lib/images.ts that has
 * no file yet. Five motifs in the XBPL palette: light ribbons, glossy orbs, isometric
 * blocks, a data mesh and radar rings. Deterministic (seeded) so results are stable.
 *
 * Existing files are never overwritten (real photography always wins) unless --force.
 * Run: pnpm art   (then the manifest refreshes on the next dev/build, or run pnpm images)
 */
import { access, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { imageSlots, type ImageSlotKey } from "@/lib/images";
import { illustrations } from "./illustrations";

const supplied = new Set<ImageSlotKey>(illustrations.map((i) => i.slot));

type Motif = "ribbons" | "orbs" | "blocks" | "mesh" | "rings";

/** Which motif each slot gets. home/hero is drawn by scripts/gen-banner.ts. */
const plan: Partial<Record<ImageSlotKey, { motif: Motif; seed: number }>> = {
  "home/build": { motif: "orbs", seed: 1 },
  "home/evolve": { motif: "blocks", seed: 2 },
  "home/lead": { motif: "rings", seed: 3 },
  "home/band": { motif: "ribbons", seed: 4 },
  "home/cta": { motif: "mesh", seed: 5 },
  "learning/hero": { motif: "orbs", seed: 6 },
  "cloud/hero": { motif: "blocks", seed: 7 },
  "cloud/cta": { motif: "blocks", seed: 8 },
  "security/hero": { motif: "rings", seed: 9 },
  "security/cta": { motif: "rings", seed: 10 },
  "about/hero": { motif: "blocks", seed: 11 },
  "about/band": { motif: "ribbons", seed: 12 },
  "insights/hero": { motif: "mesh", seed: 13 },
  "insights/from-experimentation-to-enterprise-value": { motif: "mesh", seed: 14 },
  "insights/cloud-migration-key-considerations": { motif: "blocks", seed: 15 },
  "insights/evolving-threat-landscape": { motif: "rings", seed: 16 },
  "insights/building-a-future-ready-technology-workforce": { motif: "orbs", seed: 17 },
  "insights/cloud-and-security-in-digital-transformation": { motif: "ribbons", seed: 18 },
  "insights/technology-trends-to-watch": { motif: "mesh", seed: 19 },
  "contact/hero": { motif: "ribbons", seed: 20 },
  "courses/network-security": { motif: "mesh", seed: 21 },
  "courses/cyber-security": { motif: "rings", seed: 22 },
};

function rng(seed: number) {
  let a = seed * 9973;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n: number) => n.toFixed(1);

const defs = `
  <radialGradient id="bg" cx="70%" cy="40%" r="85%">
    <stop offset="0" stop-color="#0b3a75"/><stop offset="0.45" stop-color="#071a3a"/><stop offset="1" stop-color="#02050c"/>
  </radialGradient>
  <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#0879f9" stop-opacity="0"/><stop offset="0.4" stop-color="#0879f9"/>
    <stop offset="0.75" stop-color="#08cfe3"/><stop offset="1" stop-color="#e9fdff" stop-opacity="0.9"/>
  </linearGradient>
  <radialGradient id="orb" cx="35%" cy="30%" r="75%">
    <stop offset="0" stop-color="#e9fdff"/><stop offset="0.18" stop-color="#5ee3f0"/>
    <stop offset="0.55" stop-color="#0879f9"/><stop offset="1" stop-color="#061733"/>
  </radialGradient>
  <radialGradient id="orbDeep" cx="35%" cy="30%" r="75%">
    <stop offset="0" stop-color="#9ccbff"/><stop offset="0.5" stop-color="#0a4fb0"/><stop offset="1" stop-color="#030a18"/>
  </radialGradient>
  <radialGradient id="glowSpot" cx="50%" cy="50%" r="50%">
    <stop offset="0" stop-color="#5ee3f0" stop-opacity="0.55"/><stop offset="1" stop-color="#0879f9" stop-opacity="0"/>
  </radialGradient>
  <filter id="blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="10"/></filter>
  <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.5"/></filter>`;

/* ------------------------------------------------------------------ motifs */

function ribbons(W: number, H: number, rand: () => number): string {
  const lines: string[] = [];
  const count = 70;
  const phase = rand() * Math.PI * 2;
  const amp = H * (0.12 + rand() * 0.1);
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const y0 = H * (0.42 + t * 0.32);
    const p = (x: number) =>
      y0 + Math.sin((x / W) * Math.PI * 2 + phase + t * 1.6) * amp * (0.6 + t);
    let d = `M -40 ${f(p(-40))}`;
    for (let x = 0; x <= W + 40; x += W / 24) d += ` L ${f(x)} ${f(p(x))}`;
    lines.push(
      `<path d="${d}" stroke="url(#stroke)" stroke-width="${f(0.8 + rand() * 1.4)}" fill="none" opacity="${(0.25 + rand() * 0.6).toFixed(2)}"/>`,
    );
  }
  const g = lines.join("");
  return `<g filter="url(#blur)" opacity="0.8">${g}</g>${g}`;
}

function orbs(W: number, H: number, rand: () => number): string {
  let out = `<ellipse cx="${W * 0.62}" cy="${H * 0.5}" rx="${W * 0.45}" ry="${H * 0.45}" fill="url(#glowSpot)"/>`;
  // Orbit lines
  for (let k = 0; k < 4; k++) {
    out += `<ellipse cx="${f(W * 0.6)}" cy="${f(H * 0.52)}" rx="${f(W * (0.22 + k * 0.09))}" ry="${f(H * (0.08 + k * 0.035))}" fill="none" stroke="#5ee3f0" stroke-opacity="${0.35 - k * 0.06}" stroke-width="1.5" transform="rotate(${-14 + k * 3} ${W * 0.6} ${H * 0.52})"/>`;
  }
  const n = 6;
  for (let i = 0; i < n; i++) {
    const r = Math.min(W, H) * (i === 0 ? 0.2 : 0.04 + rand() * 0.09);
    const cx = i === 0 ? W * 0.6 : W * (0.3 + rand() * 0.65);
    const cy = i === 0 ? H * 0.5 : H * (0.15 + rand() * 0.7);
    out += `<ellipse cx="${f(cx + r * 0.2)}" cy="${f(cy + r * 1.15)}" rx="${f(r * 0.9)}" ry="${f(r * 0.18)}" fill="#000" opacity="0.45" filter="url(#blur)"/>`;
    out += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="url(#${i % 2 ? "orbDeep" : "orb"})"/>`;
  }
  return out;
}

function blocks(W: number, H: number, rand: () => number): string {
  const s = Math.min(W, H) * 0.075;
  const cx = W * 0.6;
  const cy = H * 0.42;
  const cubes: { i: number; j: number; h: number; lit: boolean }[] = [];
  for (let i = -4; i <= 4; i++) {
    for (let j = -4; j <= 4; j++) {
      const dist = Math.hypot(i, j);
      if (dist > 4.6 || rand() < 0.18) continue;
      cubes.push({ i, j, h: s * (0.4 + rand() * 3.2) * (1.2 - dist / 6), lit: rand() < 0.14 });
    }
  }
  cubes.sort((a, b) => a.i + a.j - (b.i + b.j));
  let out = `<ellipse cx="${cx}" cy="${cy + s * 2}" rx="${W * 0.45}" ry="${H * 0.4}" fill="url(#glowSpot)"/>`;
  for (const c of cubes) {
    const x = cx + (c.i - c.j) * s * 0.866;
    const y = cy + (c.i + c.j) * s * 0.5;
    const top = `${f(x)},${f(y - c.h)} ${f(x + s * 0.866)},${f(y - c.h + s * 0.5)} ${f(x)},${f(y - c.h + s)} ${f(x - s * 0.866)},${f(y - c.h + s * 0.5)}`;
    const left = `${f(x - s * 0.866)},${f(y - c.h + s * 0.5)} ${f(x)},${f(y - c.h + s)} ${f(x)},${f(y + s)} ${f(x - s * 0.866)},${f(y + s * 0.5)}`;
    const right = `${f(x + s * 0.866)},${f(y - c.h + s * 0.5)} ${f(x)},${f(y - c.h + s)} ${f(x)},${f(y + s)} ${f(x + s * 0.866)},${f(y + s * 0.5)}`;
    out += `<polygon points="${left}" fill="${c.lit ? "#0879f9" : "#0a2c59"}"/>`;
    out += `<polygon points="${right}" fill="${c.lit ? "#0663d4" : "#061a3a"}"/>`;
    out += `<polygon points="${top}" fill="${c.lit ? "#9af2fa" : "#1559b0"}" stroke="#5ee3f0" stroke-opacity="0.35" stroke-width="1"/>`;
  }
  return out;
}

function mesh(W: number, H: number, rand: () => number): string {
  const cols = 46;
  const rows = 26;
  const pts: { x: number; y: number; z: number }[] = [];
  const ph = rand() * 10;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const u = c / (cols - 1);
      const v = r / (rows - 1);
      const z = Math.sin(u * 6 + ph) * Math.cos(v * 4 + ph * 0.7);
      // Perspective: rows further back are narrower and higher.
      const depth = 0.35 + v * 0.65;
      const x = W * 0.5 + (u - 0.5) * W * 1.25 * depth;
      const y = H * 0.25 + v * H * 0.75 - z * H * 0.09 * depth;
      pts.push({ x, y, z });
    }
  }
  let dots = "";
  for (const p of pts) {
    const o = 0.25 + (p.z + 1) * 0.35;
    dots += `<circle cx="${f(p.x)}" cy="${f(p.y)}" r="${f(1.2 + (p.z + 1) * 1.2)}" fill="${p.z > 0.55 ? "#e9fdff" : "#5ee3f0"}" opacity="${o.toFixed(2)}"/>`;
  }
  let links = "";
  for (let k = 0; k < 40; k++) {
    const a = pts[Math.floor(rand() * pts.length)];
    const b = pts[Math.floor(rand() * pts.length)];
    if (!a || !b || Math.hypot(a.x - b.x, a.y - b.y) > W * 0.3) continue;
    links += `<line x1="${f(a.x)}" y1="${f(a.y)}" x2="${f(b.x)}" y2="${f(b.y)}" stroke="#0879f9" stroke-opacity="0.45" stroke-width="1.2"/>`;
  }
  return `<ellipse cx="${W * 0.5}" cy="${H * 0.55}" rx="${W * 0.55}" ry="${H * 0.45}" fill="url(#glowSpot)"/>${links}<g filter="url(#soft)" opacity="0.7">${dots}</g>${dots}`;
}

function rings(W: number, H: number, rand: () => number): string {
  const cx = W * (0.55 + rand() * 0.1);
  const cy = H * 0.5;
  const R = Math.min(W, H) * 0.42;
  let out = `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R * 1.2)}" fill="url(#glowSpot)"/>`;
  for (let k = 1; k <= 7; k++) {
    const r = (R * k) / 7;
    const dash =
      rand() < 0.5 ? `stroke-dasharray="${f(4 + rand() * 18)} ${f(6 + rand() * 20)}"` : "";
    out += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="none" stroke="#5ee3f0" stroke-opacity="${(0.15 + k * 0.06).toFixed(2)}" stroke-width="${k % 3 === 0 ? 2.5 : 1.2}" ${dash}/>`;
  }
  // Sweep and arcs
  const a0 = rand() * Math.PI * 2;
  const sweep = `M ${f(cx)} ${f(cy)} L ${f(cx + R * Math.cos(a0))} ${f(cy + R * Math.sin(a0))} A ${f(R)} ${f(R)} 0 0 1 ${f(cx + R * Math.cos(a0 + 0.7))} ${f(cy + R * Math.sin(a0 + 0.7))} Z`;
  out += `<path d="${sweep}" fill="#08cfe3" opacity="0.22"/>`;
  for (let k = 0; k < 4; k++) {
    const r = R * (0.45 + k * 0.17);
    const s0 = rand() * Math.PI * 2;
    const s1 = s0 + 0.6 + rand();
    out += `<path d="M ${f(cx + r * Math.cos(s0))} ${f(cy + r * Math.sin(s0))} A ${f(r)} ${f(r)} 0 0 1 ${f(cx + r * Math.cos(s1))} ${f(cy + r * Math.sin(s1))}" stroke="#e9fdff" stroke-width="4" fill="none" stroke-linecap="round" filter="url(#soft)"/>`;
  }
  // Blips
  for (let k = 0; k < 9; k++) {
    const a = rand() * Math.PI * 2;
    const r = R * (0.2 + rand() * 0.75);
    out += `<circle cx="${f(cx + r * Math.cos(a))}" cy="${f(cy + r * Math.sin(a))}" r="${f(3 + rand() * 4)}" fill="#e9fdff" filter="url(#soft)"/>`;
  }
  out += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R * 0.06)}" fill="#e9fdff" filter="url(#soft)"/>`;
  return out;
}

const draw: Record<Motif, (W: number, H: number, rand: () => number) => string> = {
  ribbons,
  orbs,
  blocks,
  mesh,
  rings,
};

function svgFor(W: number, H: number, motif: Motif, seed: number): string {
  const rand = rng(seed);
  // A faint grid ties every piece to the site's technical texture.
  let grid = "";
  const step = Math.round(Math.min(W, H) / 12);
  for (let x = 0; x <= W; x += step) grid += `<line x1="${x}" y1="0" x2="${x}" y2="${H}"/>`;
  for (let y = 0; y <= H; y += step) grid += `<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>${defs}</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<g stroke="#ffffff" stroke-opacity="0.035" stroke-width="1">${grid}</g>
${draw[motif](W, H, rand)}
</svg>`;
}

async function exists(file: string) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const force = process.argv.includes("--force");
  let written = 0;
  for (const [slot, job] of Object.entries(plan) as [
    ImageSlotKey,
    { motif: Motif; seed: number },
  ][]) {
    const out = path.join(process.cwd(), "public", "images", `${slot}.webp`);
    // Supplied illustrations are never replaced, even with --force.
    if (supplied.has(slot) || (!force && (await exists(out)))) continue;
    const { width, height } = imageSlots[slot];
    await mkdir(path.dirname(out), { recursive: true });
    await sharp(Buffer.from(svgFor(width, height, job.motif, job.seed)))
      .webp({ quality: 78, effort: 6 })
      .toFile(out);
    written++;
    console.log(`  ${slot} (${job.motif})`);
  }
  console.log(`Artwork: ${written} image(s) generated.`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
