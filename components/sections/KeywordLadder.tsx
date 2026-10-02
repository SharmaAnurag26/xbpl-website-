import { cn } from "@/lib/cn";

/** Stacked uppercase keywords at the edge of heroes (e.g. AGILE / SCALABLE / RESILIENT). */
export function KeywordLadder({ items, className }: { items: string[]; className?: string }) {
  return (
    <p
      className={cn(
        "border-l-2 border-cyan/70 pl-4 font-display text-xs leading-[1.9] font-semibold tracking-[0.18em] text-white/90 uppercase",
        className,
      )}
    >
      {items.map((item, i) => (
        <span
          key={item}
          className={cn("block", i === items.length - 1 && items.length > 3 && "text-cyan-soft")}
        >
          {item}
        </span>
      ))}
    </p>
  );
}
