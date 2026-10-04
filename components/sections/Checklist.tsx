import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

/** Compact checklist in columns (e.g. "What you get with XBPL"). */
export function Checklist({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 border-b border-line py-4 text-[0.98rem] text-white"
        >
          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-volt text-black">
            <Check aria-hidden className="size-3.5" strokeWidth={3} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
