/**
 * Downloads the site's stock photography into public/images/<slot>.webp and writes
 * docs/IMAGE_CREDITS.md. Two sources:
 * - Wikimedia Commons (`file`): mostly early Unsplash / PxHere uploads mirrored on Commons.
 * - Openverse (`openverse` id): rawpixel's public-domain collection.
 *
 * Every photo is CC0 (no attribution required, commercial use allowed). Licences are
 * re-checked against the source API on every run; a photo that is no longer CC0 is skipped.
 *
 * Existing files are kept unless --force is passed. Run: pnpm photos
 */
import { access, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { imageSlots, type ImageSlotKey } from "@/lib/images";
import { illustrations } from "./illustrations";

type Photo = {
  slot: ImageSlotKey;
  subject: string;
  /** Brightness multiplier, e.g. 0.6 to keep overlaid text legible on a bright photo. */
  brightness?: number;
} & ({ file: string } | { openverse: string });

const photos: Photo[] = [
  {
    slot: "learning/hero",
    file: "Woman_working_behind_computer.jpg",
    subject: "Learner working on a laptop",
  },
  {
    slot: "learning/organizations",
    file: "Large_meeting_room_(Unsplash).jpg",
    subject: "Training room set up for a session",
  },
  {
    slot: "learning/study",
    file: "Pencil_shavings_on_a_notebook_(Unsplash).jpg",
    subject: "Notebook and pencil",
  },
  {
    slot: "home/build",
    file: "Two_people_meeting_with_iphone_and_ipad_(Unsplash).jpg",
    subject: "Team discussion around a table",
  },
  {
    slot: "insights/building-a-future-ready-technology-workforce",
    file: "Man_at_a_laptop_in_an_office_(Unsplash).jpg",
    subject: "Professional at a laptop in an office",
  },
  // ---- Page banners and bands ----
  {
    slot: "cloud/hero",
    openverse: "58f92c3a-d455-4941-9aa0-d7638ec004bf",
    subject: "Server racks lit in blue",
  },
  {
    slot: "cloud/cta",
    openverse: "c580cdaf-7228-4c08-92cf-1401c43a5d84",
    subject: "Corridor of supercomputer racks",
    brightness: 0.55,
  },
  {
    slot: "security/hero",
    openverse: "47ab60b7-1c0e-42a5-a0cb-77e203beec31",
    subject: "Padlocks on a laptop keyboard",
  },
  {
    slot: "security/cta",
    openverse: "a34957fd-54a4-41c9-b39e-fbc690c7de8c",
    subject: "Chained padlocks",
  },
  {
    slot: "home/evolve",
    openverse: "7d2ed772-9e4d-4582-9297-6c2d6ac94d06",
    subject: "Server racks in a data centre",
  },
  {
    slot: "home/lead",
    openverse: "a00e78d0-117d-406d-a152-71c051a491fb",
    subject: "Combination lock on a laptop",
  },
  {
    slot: "insights/evolving-threat-landscape",
    openverse: "24ee5cff-e17b-4248-9454-93ccf8f4c03e",
    subject: "Terminal output on a dark screen",
  },
  {
    slot: "about/hero",
    file: "Twisting_building_facade_(Unsplash).jpg",
    subject: "Glass tower at night",
  },
  {
    slot: "insights/hero",
    file: "Chantilly_library_study_(Unsplash).jpg",
    subject: "Historic library",
  },
  {
    slot: "contact/hero",
    file: "New_York_skyline_with_light_trails_(Unsplash).jpg",
    subject: "City skyline with light trails",
  },
  {
    slot: "home/cta",
    file: "City_of_lights_(Unsplash).jpg",
    subject: "City at night from above",
  },
  {
    slot: "about/band",
    file: "City_Lights_at_Night_(Unsplash_-uzgaA9LfNw).jpg",
    subject: "Harbour skyline at night",
  },
  {
    slot: "insights/technology-trends-to-watch",
    file: "London_glow_(Unsplash).jpg",
    subject: "City towers glowing at night",
  },
];

const UA = { "User-Agent": "XBPLWebsiteBuild/1.0 (https://xbpl.in; sales@xbpl.in)" };
const root = process.cwd();
const sleep = (ms: number) => new Promise((ok) => setTimeout(ok, ms));
const clean = (s?: string) =>
  (s ?? "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();

type Info = { license: string; artist: string; page: string; source: string; thumb: string };

async function commons(file: string, width: number): Promise<Info> {
  const api = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(file)}&prop=imageinfo&iiprop=extmetadata|url&iiurlwidth=${width}&format=json`;
  const json = (await (await fetch(api, { headers: UA })).json()) as {
    query: {
      pages: Record<
        string,
        {
          imageinfo?: {
            thumburl: string;
            descriptionurl: string;
            extmetadata: Record<string, { value: string }>;
          }[];
        }
      >;
    };
  };
  const ii = Object.values(json.query.pages)[0]?.imageinfo?.[0];
  if (!ii) throw new Error(`Not found on Commons: ${file}`);
  return {
    license: clean(ii.extmetadata.LicenseShortName?.value),
    artist: clean(ii.extmetadata.Artist?.value),
    page: ii.descriptionurl,
    source: "Commons",
    thumb: ii.thumburl,
  };
}

async function openverse(id: string): Promise<Info> {
  const res = await fetch(`https://api.openverse.org/v1/images/${id}/`, { headers: UA });
  if (!res.ok) throw new Error(`Not found on Openverse (${res.status}): ${id}`);
  const j = (await res.json()) as {
    license: string;
    creator: string | null;
    foreign_landing_url: string;
    source: string;
    url: string;
  };
  return {
    license: j.license === "cc0" ? "CC0" : j.license,
    artist: j.creator ?? "",
    page: j.foreign_landing_url,
    source: j.source === "rawpixel" ? "rawpixel" : j.source,
    // The 1024px link from the API; rawpixel's larger public renditions are watermarked.
    thumb: j.url,
  };
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
  const credits: string[] = [];
  for (const photo of photos) {
    const { width, height } = imageSlots[photo.slot];
    // Commons only serves standard thumbnail widths.
    const fetchWidth = width > 1920 ? 3840 : 1920;
    const meta =
      "file" in photo ? await commons(photo.file, fetchWidth) : await openverse(photo.openverse);
    await sleep(1200);
    if (meta.license !== "CC0") {
      console.warn(`  skip ${photo.slot}: licence is "${meta.license}", not CC0`);
      continue;
    }
    credits.push(
      `| \`${photo.slot}\` | ${photo.subject} | ${meta.artist || "Unknown"} | ${meta.license} | [${meta.source}](${meta.page}) |`,
    );

    const out = path.join(root, "public", "images", `${photo.slot}.webp`);
    if (!force && (await exists(out))) {
      console.log(`  keep ${photo.slot}`);
      continue;
    }
    const res = await fetch(meta.thumb, { headers: UA });
    if (!res.ok) throw new Error(`Download failed (${res.status}) for ${photo.slot}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await mkdir(path.dirname(out), { recursive: true });
    await sharp(buf)
      .resize(width, height, { fit: "cover", position: sharp.strategy.attention })
      .modulate({ saturation: 0.92, brightness: photo.brightness ?? 1 })
      .webp({ quality: 78, effort: 6 })
      .toFile(out);
    console.log(`  saved ${photo.slot} (${meta.artist})`);
    await sleep(1500);
  }

  const md = `# Image credits

_Generated by \`pnpm photos\`; do not edit by hand._

All photographs below are **CC0 1.0 (public domain dedication)**: free for commercial use,
no attribution required. Credits are listed anyway as good practice. Licences are re-verified
against their source (Wikimedia Commons or Openverse) each time the script runs.

Generated artwork (3D renders in \`public/3d\`, abstract art from \`pnpm art\`, the hero banner
from \`pnpm banner\`) is original to this project.

| Slot | Subject | Photographer | Licence | Source |
| --- | --- | --- | --- | --- |
${credits.join("\n")}

## Supplied illustrations

Provided by XBPL; originals in \`assets/illustrations/\`, rendered by \`pnpm illustrations\`.
TODO: record the source and licence of each (free stock licences often require attribution).

| Slot | Subject | File |
| --- | --- | --- |
${illustrations.map((i) => `| \`${i.slot}\` | ${i.subject} | \`${i.file}\` |`).join("\n")}
`;
  await writeFile(path.join(root, "docs", "IMAGE_CREDITS.md"), md);
  // next/image caches optimised variants by URL; drop them so replaced photos show.
  await rm(path.join(root, ".next", "cache", "images"), { recursive: true, force: true });
  console.log(`Photos done; credits in docs/IMAGE_CREDITS.md`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
