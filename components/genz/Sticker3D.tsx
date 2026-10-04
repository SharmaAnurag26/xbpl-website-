import Image from "next/image";
import type { StickerName } from "@/content/types";
import stickerSizes from "@/lib/stickers.json";
import { cn } from "@/lib/cn";

/** Pixel sizes of the pre-rendered 3D objects in public/3d (written by scripts/render-3d.ts). */
export const stickers = stickerSizes as Record<StickerName, { width: number; height: number }>;

type Sticker3DProps = {
  name: StickerName;
  /** Rendered width hint for `sizes`, e.g. "(min-width: 1024px) 40vw, 70vw". */
  sizes: string;
  className?: string;
  float?: boolean;
  /** Seconds; offsets the float so several stickers don't move in sync. */
  delay?: number;
  priority?: boolean;
};

/** Decorative 3D render (transparent WebP). Purely visual, so hidden from assistive tech. */
export function Sticker3D({
  name,
  sizes,
  className,
  float = true,
  delay = 0,
  priority,
}: Sticker3DProps) {
  const { width, height } = stickers[name];
  return (
    <Image
      src={`/3d/${name}.webp`}
      alt=""
      aria-hidden
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      draggable={false}
      className={cn(
        "pointer-events-none h-auto drop-shadow-[0_30px_40px_rgb(8_121_249/0.35)] select-none",
        float && "animate-float motion-reduce:animate-none",
        className,
      )}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    />
  );
}
