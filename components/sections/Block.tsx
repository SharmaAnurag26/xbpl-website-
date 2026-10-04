import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { SectionHeadingContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { SectionHeading } from "./SectionHeading";

type BlockProps = {
  id: string;
  heading: SectionHeadingContent;
  children: ReactNode;
  /** Prose paragraphs shown under the heading. */
  paragraphs?: string[];
  tone?: "canvas" | "soft";
  className?: string;
};

/** Standard content section: heading (+ optional paragraphs), then any content. */
export function Block({
  id,
  heading,
  children,
  paragraphs,
  tone = "canvas",
  className,
}: BlockProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "border-t border-line py-20 lg:py-28",
        tone === "soft" ? "bg-soft" : "bg-canvas",
        className,
      )}
    >
      <div className="container-site">
        <Reveal>
          <SectionHeading id={`${id}-title`} {...heading} />
          {paragraphs ? (
            <div className="mt-6 grid max-w-5xl gap-5 text-base leading-relaxed text-muted lg:grid-cols-2 lg:gap-10">
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          ) : null}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
