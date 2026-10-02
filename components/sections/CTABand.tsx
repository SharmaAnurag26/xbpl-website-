import type { ReactNode } from "react";
import { ImageSlot } from "@/components/media/ImageSlot";
import { ButtonLink } from "@/components/ui/Button";
import type { CTABandContent } from "@/content/types";
import { cn } from "@/lib/cn";

type CTABandProps = Partial<CTABandContent> & {
  title: string;
  /** Extra content under the copy (pillars, process steps…). */
  children?: ReactNode;
  /** Let `children` span the full band width instead of the copy column. */
  wideChildren?: boolean;
  id?: string;
  className?: string;
};

/**
 * Dark, inset "band" used to punctuate every page: statement + optional CTA, with
 * glow/grid texture and an optional image fading in from the right.
 * Line breaks in `title` ("\n") are preserved as separate lines.
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
    <section aria-labelledby={headingId} id={id} className={cn("bg-white py-6 lg:py-8", className)}>
      <div className="container-site">
        <div className="surface-dark relative isolate overflow-hidden rounded-band bg-[linear-gradient(115deg,#06162e_0%,#0a2448_55%,#0a3a78_100%)] shadow-[0_30px_60px_-30px_rgb(6_22_46/0.6)]">
          {image ? (
            <div className="absolute inset-y-0 right-0 -z-10 w-full [mask-image:linear-gradient(90deg,transparent_0%,#000_45%)] max-sm:opacity-25 sm:w-[62%]">
              <ImageSlot
                slot={image.slot}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 62vw, 100vw"
              />
            </div>
          ) : null}
          <div aria-hidden className="absolute inset-0 -z-10 bg-grid-dark opacity-50" />
          <div
            aria-hidden
            className="absolute -bottom-1/2 -left-1/4 -z-10 h-full w-2/3 rounded-full bg-[radial-gradient(closest-side,rgb(8_121_249/0.28),transparent)]"
          />

          <div className="relative px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <div className="max-w-2xl">
              <h2
                id={headingId}
                className="font-display text-[1.6rem] leading-tight font-bold text-white sm:text-3xl lg:text-[2.05rem]"
              >
                {title.split("\n").map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              {body ? (
                <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-on-dark-muted sm:text-base">
                  {body}
                </p>
              ) : null}
              {children && !wideChildren ? <div className="mt-8">{children}</div> : null}
            </div>
            {children && wideChildren ? <div className="mt-8">{children}</div> : null}
            {cta ? (
              <ButtonLink
                href={cta.href}
                size="lg"
                arrow
                variant={cta.variant === "outline" ? "outline-light" : "primary"}
                className={cn("mt-8", wideChildren && "sm:mx-auto sm:flex sm:w-fit")}
              >
                {cta.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
