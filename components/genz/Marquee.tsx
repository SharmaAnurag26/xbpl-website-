import { cn } from "@/lib/cn";

/**
 * Infinite ticker. The list is rendered twice and slid by 50%, so it loops seamlessly.
 * Pauses on hover; with reduced motion it becomes a static, wrapping list.
 */
export function Marquee({
  items,
  label,
  className,
}: {
  items: string[];
  label: string;
  className?: string;
}) {
  return (
    <section
      aria-label={label}
      className={cn(
        "group relative overflow-hidden border-y border-line bg-canvas [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] py-6",
        className,
      )}
    >
      <ul className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3">
        {[...items, ...items].map((item, i) => (
          <li
            key={`${item}-${i}`}
            aria-hidden={i >= items.length || undefined}
            className={cn(
              "flex items-center font-display text-2xl font-medium tracking-[-0.02em] whitespace-nowrap text-white sm:text-[2.5rem]",
              i >= items.length && "motion-reduce:hidden",
            )}
          >
            <span className="px-6 sm:px-9">{item}</span>
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-5 shrink-0 text-volt sm:size-7"
              fill="currentColor"
            >
              <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
            </svg>
          </li>
        ))}
      </ul>
    </section>
  );
}
