/**
 * Renders the supplied illustrations (assets/illustrations/) into their image slots
 * at public/images/<slot>.webp, cropped and sized per lib/images.ts.
 *
 * Always overwrites: the originals in assets/ are the source of truth. Run: pnpm illustrations
 */
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { imageSlots } from "@/lib/images";
import { illustrations } from "./illustrations";

const root = process.cwd();

/**
 * A w×h background continuing the image's soft backdrop: each half is the matching edge
 * strip of the image (which holds no subject), stretched and blurred.
 */
async function edgeFill(data: Buffer, width: number, height: number, w: number, h: number) {
  const strip = Math.round(width * 0.06);
  const half = Math.ceil(w / 2);
  const side = (left: number, outWidth: number) =>
    sharp(data)
      .extract({ left, top: 0, width: strip, height })
      .resize(outWidth, h, { fit: "fill" })
      .blur(40)
      .toBuffer();
  return sharp({ create: { width: w, height: h, channels: 3, background: "#ffffff" } })
    .composite([
      { input: await side(0, half), left: 0, top: 0 },
      { input: await side(width - strip, w - half), left: half, top: 0 },
    ])
    .png()
    .toBuffer();
}

/** Fades the image's left and right edges to transparent so it blends into a padded fill. */
async function feather(data: Buffer, width: number, height: number) {
  const mask = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <linearGradient id="g"><stop offset="0" stop-opacity="0"/><stop offset="0.12" stop-opacity="1"/>
    <stop offset="0.88" stop-opacity="1"/><stop offset="1" stop-opacity="0"/></linearGradient>
    <rect width="100%" height="100%" fill="url(#g)"/></svg>`;
  return sharp(data)
    .ensureAlpha()
    .composite([{ input: Buffer.from(mask), blend: "dest-in" }])
    .png()
    .toBuffer();
}

async function main() {
  for (const item of illustrations) {
    const { width, height } = imageSlots[item.slot];
    const out = path.join(root, "public", "images", `${item.slot}.webp`);
    await mkdir(path.dirname(out), { recursive: true });
    let img = sharp(path.join(root, "assets", "illustrations", item.file));
    if (item.extract) img = img.extract(item.extract);
    if (item.pad) {
      // Grow the short side to the slot's aspect ratio so nothing is cropped.
      const { data, info } = await img.toBuffer({ resolveWithObject: true });
      const w = Math.max(info.width, Math.round((info.height * width) / height));
      const h = Math.max(info.height, Math.round((info.width * height) / width));
      const x = w - info.width;
      const y = h - info.height;
      // Build the padded canvas as its own image: sharp always resizes before extending.
      const left = Math.floor(x / 2);
      const top = Math.floor(y / 2);
      const padded =
        item.pad === "white"
          ? await sharp(data)
              .extend({ left, right: x - left, top, bottom: y - top, background: "#ffffff" })
              .toBuffer()
          : await sharp(await edgeFill(data, info.width, info.height, w, h))
              .composite([{ input: await feather(data, info.width, info.height), left, top }])
              .toBuffer();
      img = sharp(padded);
    }
    await img.resize(width, height, { fit: "cover" }).webp({ quality: 82, effort: 6 }).toFile(out);
    console.log(`  saved ${item.slot} <- ${item.file}`);
  }
  // next/image caches optimised variants by URL; drop them so the new art shows.
  await rm(path.join(root, ".next", "cache", "images"), { recursive: true, force: true });
  console.log(
    "Illustrations done. Run `pnpm images` (or restart `pnpm dev`) to refresh the manifest.",
  );
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
