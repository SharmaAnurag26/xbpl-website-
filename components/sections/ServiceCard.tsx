import { ArrowRight } from "lucide-react";
import NextLink from "next/link";
import { ImageSlot } from "@/components/media/ImageSlot";
import type { ServiceCardContent } from "@/content/types";

/**
 * Image-topped card for the three priorities (Build/Evolve/Lead).
 * The whole card is clickable through a stretched link; only one tab stop.
 */
export function ServiceCard({
  card,
  headingLevel: H = "h3",
}: {
  card: ServiceCardContent;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-card-hover has-[a:focus-visible]:shadow-card-hover">
      <ImageSlot
        slot={card.image.slot}
        alt={card.image.alt}
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
        imageClassName="transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
      />
      <div className="flex flex-1 flex-col p-6">
        <H className="font-display text-xl font-extrabold tracking-wide text-ink uppercase">
          {card.keyword}
          <span className="mt-0.5 block text-[0.95rem] font-semibold tracking-normal text-brand-text normal-case">
            {card.title}
          </span>
        </H>
        <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-muted">{card.description}</p>
        <NextLink
          href={card.link.href}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-text after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand-text"
        >
          {card.link.label}
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform group-hover:translate-x-0.5"
          />
        </NextLink>
      </div>
    </article>
  );
}
