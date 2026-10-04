import type { ReactNode } from "react";
import { ImageSlot } from "@/components/media/ImageSlot";
import { ButtonLink } from "@/components/ui/Button";
import type { CTABandContent } from "@/content/types";
import { cn } from "@/lib/cn";

type CTABandProps = Partial<CTABandContent> & {
  title: string;
  /** Extra content under the copy (pillars, process steps…). */
  children?: ReactNode;
  /** Let `children` span the full width instead of the copy column. */
  wideChildren?: boolean;
  id?: string;
  className?: string;
};

/**
 * Full-bleed statement band: oversized title on black, optional artwork filling the
 * right side, CTA below. Line breaks in `title` ("\n") are preserved.
 */
export function CTABand({
  title,
  body,
  cta,
  image,
  children,
  wideChildren,
  id,
  className,
}: CTABandProps) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section
      aria-labelledby={headingId}
      id={id}
      className={cn(
        "surface-dark relative isolate overflow-hidden border-t border-line bg-canvas",
        className,
      )}
    >
      {image ? (
        <div className="absolute inset-y-0 right-0 -z-10 w-full [mask-image:linear-gradient(90deg,transparent_0%,#000_55%)] max-md:opacity-35 md:w-[62%]">
          <ImageSlot
            slot={image.slot}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 62vw, 100vw"
          />
        </div>
      ) : null}

      <div className="container-site py-20 lg:py-28">
        <div className="max-w-2xl">
          <h2
            id={headingId}
            className="font-display text-[2.1rem] leading-[1.04] font-medium tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.6rem]"
          >
            {title.split("\n").map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          {body ? (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{body}</p>
          ) : null}
          {children && !wideChildren ? <div className="mt-10">{children}</div> : null}
        </div>
        {children && wideChildren ? <div className="mt-12">{children}</div> : null}
        {cta ? (
          <ButtonLink
            href={cta.href}
            size="lg"
            arrow
            variant={cta.variant === "outline" ? "outline-light" : "primary"}
            className="mt-10"
          >
            {cta.label}
          </ButtonLink>
        ) : null}
      </div>
    </section>
  );
}
