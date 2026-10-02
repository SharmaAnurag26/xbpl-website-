import { site } from "@/content/site";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = `${site.name}: ${site.tagline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Learning • Cloud • Cybersecurity",
    title: "Technology that builds capability and secures what's next.",
  });
}
