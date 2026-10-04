import { Check } from "lucide-react";
import type { DetailItem } from "@/content/types";
import { cn } from "@/lib/cn";
import { IconTile } from "./IconTile";

type DetailGridProps = {
  items: DetailItem[];
  /** Column count on large screens. */
  columns?: 2 | 3 | 4 | 5;
  /** Show a running number on each card (01, 02…). */
  numbered?: boolean;
};

const cols = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

/** Cards with icon, title, optional description and bullet list (services, reasons, values). */
export function DetailGrid({ items, columns = 3, numbered = false }: DetailGridProps) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 lg:gap-5", cols[columns])}>
      {items.map((item, i) => (
        <li
          key={item.title}
          className="group relative flex flex-col gap-5 overflow-hidden rounded-card border border-line bg-surface p-6 transition-[border-color,background-color] duration-300 hover:border-brand/60 hover:bg-surface-2 sm:p-7"
        >
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-[image:var(--gradient-text)] transition-transform duration-500 ease-out-soft group-hover:scale-x-100"
          />
          <div className="flex items-start justify-between gap-4">
            {item.icon ? (
              <IconTile icon={item.icon} className="group-hover:bg-brand group-hover:text-white" />
            ) : null}
            {numbered ? (
              <span className="font-display text-sm font-medium text-brand-text tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
            ) : null}
          </div>
          <div>
            <h3 className="font-display text-lg leading-snug font-medium tracking-[-0.01em] text-white">
              {item.title}
            </h3>
            {item.description ? (
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            ) : null}
          </div>
          {item.bullets ? (
            <ul className="mt-auto space-y-2 border-t border-line pt-4">
              {item.bullets.map((b) => (
                <li key={b} className="flex gap-2.5 text-sm text-white/85">
                  <Check
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-volt"
                    strokeWidth={2.4}
                  />
                  {b}
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
