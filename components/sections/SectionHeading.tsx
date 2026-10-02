import type { SectionHeadingContent } from "@/content/types";
import { cn } from "@/lib/cn";

type SectionHeadingProps = SectionHeadingContent & {
  align?: "left" | "center";
  tone?: "light" | "dark";
  /** Heading level; sections default to h2. */
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  as: Heading = "h2",
  id,
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn(align === "center" && "mx-auto max-w-2xl text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-eyebrow font-semibold uppercase",
            dark ? "text-cyan-soft" : "text-brand-text",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "text-[1.6rem] leading-tight font-bold sm:text-3xl lg:text-[2.1rem]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title.split("\n").map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </Heading>
      {intro ? (
        <p
          className={cn(
            "mt-3 text-[0.95rem] leading-relaxed sm:text-base",
            dark ? "text-on-dark-muted" : "text-muted",
            align === "center" && "mx-auto max-w-xl",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
