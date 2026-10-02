import Image from "next/image";
import manifestJson from "@/lib/image-manifest.json";
import { imageSlots, type ImageSlotKey } from "@/lib/images";
import { cn } from "@/lib/cn";
import { FallbackArt } from "./FallbackArt";

type ManifestEntry = { src: string; width: number; height: number; blurDataURL: string };
const manifest = manifestJson as Partial<Record<ImageSlotKey, ManifestEntry>>;

type ImageSlotProps = {
  slot: ImageSlotKey;
  /** Describe the image; pass "" for purely decorative images. */
  alt: string;
  /** Responsive `sizes` hint for next/image. */
  sizes: string;
  /** Only for the above-the-fold LCP image. */
  priority?: boolean;
  /**
   * `fill`: the parent controls the box (e.g. hero backgrounds); the parent must be
   * positioned and sized. Otherwise the slot renders its own box at the registry aspect ratio.
   */
  fill?: boolean;
  className?: string;
  imageClassName?: string;
  /** CSS object-position, e.g. "70% 50%" to keep a subject in frame when cropped. */
  position?: string;
};

export function ImageSlot({
  slot,
  alt,
  sizes,
  priority = false,
  fill = false,
  className,
  imageClassName,
  position = "50% 50%",
}: ImageSlotProps) {
  const def = imageSlots[slot];
  const entry = manifest[slot];

  return (
    <div
      className={cn(fill ? "absolute inset-0" : "relative w-full", "overflow-hidden", className)}
      style={fill ? undefined : { aspectRatio: `${def.width} / ${def.height}` }}
    >
      {entry ? (
        <Image
          src={entry.src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          placeholder="blur"
          blurDataURL={entry.blurDataURL}
          className={cn("object-cover", imageClassName)}
          style={{ objectPosition: position }}
        />
      ) : (
        <FallbackArt
          tone={def.fallback.tone}
          icon={"icon" in def.fallback ? def.fallback.icon : undefined}
        />
      )}
    </div>
  );
}
