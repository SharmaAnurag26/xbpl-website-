import { ArrowRight } from "lucide-react";
import NextLink from "next/link";
import { ImageSlot } from "@/components/media/ImageSlot";
import type { ImageRef } from "@/content/types";
import { cn } from "@/lib/cn";

export type FeatureTileProps = {
  eyebrow: string;
  title: string;
  href: string;
  /** Artwork tile. Omit for a solid colour tile. */
  image?: ImageRef;
  /** Solid tile colour (ignored when an image is given). */
  tone?: "brand" | "cyan";
  linkLabel?: string;
  headingLevel?: "h2" | "h3";
};

/**
 * Tall portrait card for the featured grid: label + title at the top, artwork or a
 * solid brand colour behind. The whole tile is one link (single tab stop).
 */
export function FeatureTile({
  eyebrow,
  title,
  href,
  image,
  tone = "brand",
  linkLabel = "Explore",
  headingLevel: H = "h3",
}: FeatureTileProps) {
  const onCyan = !image && tone === "cyan";
  return (
    <article
      className={cn(
        "group relative isolate flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-card p-5 sm:aspect-[3/4] sm:p-6",
        image ? "bg-surface" : tone === "cyan" ? "bg-cyan" : "bg-brand-deep-fill",
      )}
    >
      {image ? (
        <>
          <ImageSlot
            slot={image.slot}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
            className="-z-20"
            imageClassName="transition-transform duration-700 ease-out-soft group-hover:scale-[1.06]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(0_0_0/0.9)_0%,rgb(0_0_0/0.72)_35%,rgb(0_0_0/0.15)_62%,rgb(0_0_0/0.6)_100%)]"
          />
        </>
      ) : (
        <svg
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 h-full w-full",
            onCyan ? "text-black/15" : "text-white/15",
          )}
          viewBox="0 0 300 400"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="250" cy="330" r="120" />
          <circle cx="250" cy="330" r="80" />
          <path d="M-20 260 C 80 200, 160 320, 320 220" />
        </svg>
      )}

      <div>
        <p
          className={cn(
            "text-[0.7rem] font-semibold tracking-[0.14em] uppercase",
            onCyan ? "text-black/75" : "text-white/90",
          )}
        >
          {eyebrow}
        </p>
        <H
          className={cn(
            "mt-3 font-display text-lg leading-snug font-medium tracking-[-0.01em] sm:text-xl",
            onCyan ? "text-black" : "text-white",
          )}
        >
          <NextLink
            href={href}
            className="after:absolute after:inset-0 after:z-10 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-4 focus-visible:after:outline-cyan-soft"
          >
            {title}
          </NextLink>
        </H>
      </div>

      <span
        aria-hidden
        className={cn(
          "inline-flex items-center gap-2 text-sm font-medium transition-transform duration-300 group-hover:translate-x-1",
          onCyan ? "text-black" : "text-white",
        )}
      >
        {linkLabel}
        <ArrowRight className="size-4" />
      </span>
    </article>
  );
}
