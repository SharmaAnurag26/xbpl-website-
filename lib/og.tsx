import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { publicEnv } from "@/lib/env";

export const OG_SIZE = { width: 1200, height: 630 };

const root = process.cwd();
const fontFile = (weight: number) =>
  readFile(
    join(root, "node_modules", "@fontsource", "sora", "files", `sora-latin-${weight}-normal.woff`),
  );

/**
 * Branded 1200×630 share image. Rendered at build time (all routes are static).
 * Uses the on-dark logo variant, never a CSS-inverted one.
 */
export async function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [sora700, sora400, logo] = await Promise.all([
    fontFile(700),
    fontFile(400),
    readFile(join(root, "public", "brand", "logo-on-dark.svg")),
  ]);
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;
  const host = new URL(publicEnv.siteUrl).host;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        color: "#ffffff",
        fontFamily: "Sora",
        backgroundColor: "#06162e",
        backgroundImage:
          "radial-gradient(circle at 85% 30%, rgba(8,121,249,0.55) 0%, rgba(8,121,249,0) 45%), radial-gradient(circle at 70% 95%, rgba(8,207,227,0.35) 0%, rgba(8,207,227,0) 40%), linear-gradient(115deg, #06162e 0%, #0a2c59 60%, #0a6ec7 100%)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- rendered by next/og, not the browser */}
      <img src={logoSrc} width={300} height={104} alt="" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontWeight: 400,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#5ee3f0",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: title.length > 48 ? 58 : 70,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -1,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#b4c3d9" }}
      >
        <span>{site.tagline}</span>
        <span>{host}</span>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: "Sora", data: sora700, weight: 700, style: "normal" },
        { name: "Sora", data: sora400, weight: 400, style: "normal" },
      ],
    },
  );
}
