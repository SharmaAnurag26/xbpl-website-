/**
 * Generates every static brand asset from components/brand/Logo.tsx:
 *   public/brand/*.svg             logo variants for <img>, email, press use
 *   app/icon.svg                   SVG favicon (modern browsers)
 *   app/favicon.ico                16/32/48 PNG-in-ICO fallback
 *   app/apple-icon.png             180×180
 *   public/brand/icon-192.png, icon-512.png, icon-maskable-512.png   web manifest
 * Run: pnpm icons (commit the output; it is not regenerated at build time).
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import { Logo, type LogoLayout } from "@/components/brand/Logo";
import type { LogoVariant } from "@/lib/brand/logo";

const root = process.cwd();
const NAVY_BG = "#06162e";

function svg(markup: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>\n${markup}\n`;
}

function logoSvg(variant: LogoVariant, layout: LogoLayout): string {
  return svg(renderToStaticMarkup(<Logo id="xbpl" variant={variant} layout={layout} />));
}

/** The mark centred on a square canvas, optionally on a background. */
function squareMark(size: number, opts: { bg?: string; padding: number; radius?: number }): string {
  const inner = size - opts.padding * 2;
  const h = (inner * 317) / 500;
  return svg(
    renderToStaticMarkup(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
      >
        {opts.bg ? <rect width={size} height={size} rx={opts.radius ?? 0} fill={opts.bg} /> : null}
        <Logo
          id="xbpl-mark"
          layout="mark"
          title={null}
          x={opts.padding}
          y={(size - h) / 2}
          width={inner}
          height={h}
        />
      </svg>,
    ),
  );
}

async function png(svgMarkup: string, size: number): Promise<Buffer> {
  return sharp(Buffer.from(svgMarkup), { density: 384 }).resize(size, size).png().toBuffer();
}

/** Minimal ICO container holding PNG images (supported by all current browsers). */
function ico(images: { size: number; data: Buffer }[]): Buffer {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach((img, i) => {
    const e = 6 + i * 16;
    header.writeUInt8(img.size >= 256 ? 0 : img.size, e);
    header.writeUInt8(img.size >= 256 ? 0 : img.size, e + 1);
    header.writeUInt8(0, e + 2);
    header.writeUInt8(0, e + 3);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(img.data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += img.data.length;
  });
  return Buffer.concat([header, ...images.map((i) => i.data)]);
}

async function main() {
  const brandDir = path.join(root, "public", "brand");
  await mkdir(brandDir, { recursive: true });

  const files: Record<string, string> = {
    "logo.svg": logoSvg("color", "full"),
    "logo-on-dark.svg": logoSvg("on-dark", "full"),
    "logo-mono-white.svg": logoSvg("mono-white", "full"),
    "logo-wordmark.svg": logoSvg("color", "wordmark"),
    "logo-wordmark-on-dark.svg": logoSvg("on-dark", "wordmark"),
    "logo-mark.svg": logoSvg("color", "mark"),
  };
  for (const [name, content] of Object.entries(files)) {
    await writeFile(path.join(brandDir, name), content);
  }

  // Favicon: transparent mark with a little padding reads best at 16–32px.
  const faviconSvg = squareMark(64, { padding: 3 });
  await writeFile(path.join(root, "app", "icon.svg"), faviconSvg);
  const icoImages = await Promise.all(
    [16, 32, 48].map(async (size) => ({ size, data: await png(faviconSvg, size) })),
  );
  await writeFile(path.join(root, "app", "favicon.ico"), ico(icoImages));

  // Touch / manifest icons sit on navy so the mark keeps its contrast on any wallpaper.
  const tile = squareMark(512, { bg: NAVY_BG, padding: 96 });
  await writeFile(path.join(root, "app", "apple-icon.png"), await png(tile, 180));
  await writeFile(path.join(brandDir, "icon-192.png"), await png(tile, 192));
  await writeFile(path.join(brandDir, "icon-512.png"), await png(tile, 512));
  const maskable = squareMark(512, { bg: NAVY_BG, padding: 136 });
  await writeFile(path.join(brandDir, "icon-maskable-512.png"), await png(maskable, 512));

  console.log("Brand assets written to public/brand and app/.");
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
