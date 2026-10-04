import { Check } from "lucide-react";
import { ImageSlot } from "@/components/media/ImageSlot";
import { ButtonLink } from "@/components/ui/Button";
import type { Audience } from "@/content/types";
import { cn } from "@/lib/cn";

/** Two side-by-side audience panels (organizations / individual learners) with photos. */
export function AudienceSplit({ items }: { items: Audience[] }) {
  return (
    <ul className="grid gap-5 lg:grid-cols-2">
      {items.map((item, i) => (
        <li
          key={item.label}
          className={cn(
            "group flex flex-col overflow-hidden rounded-card border",
            i === 0 ? "border-line bg-surface" : "border-transparent bg-brand-deep-fill",
          )}
        >
          <div className="relative">
            <ImageSlot
              slot={item.image.slot}
              alt={item.image.alt}
              sizes="(min-width: 1024px) 600px, 100vw"
              className="aspect-[16/8]"
              imageClassName="transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
            />
            <span
              className={cn(
                "absolute top-4 left-4 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-[0.1em] uppercase",
                i === 0 ? "bg-black/75 text-white backdrop-blur" : "bg-volt text-black",
              )}
            >
              {item.label}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-7 sm:p-9">
            <h3 className="font-display text-2xl leading-tight font-medium tracking-[-0.02em] text-white sm:text-[1.75rem]">
              {item.title}
            </h3>
            <p className={cn("mt-3 leading-relaxed", i === 0 ? "text-muted" : "text-white/90")}>
              {item.description}
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {item.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-white">
                  <span
                    className={cn(
                      "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                      i === 0 ? "bg-volt text-black" : "bg-white text-brand-deep-fill",
                    )}
                  >
                    <Check aria-hidden className="size-3.5" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <ButtonLink
              href={item.cta.href}
              size="lg"
              arrow
              variant={i === 0 ? "primary" : "outline-light"}
              className="mt-8 self-start"
            >
              {item.cta.label}
            </ButtonLink>
          </div>
        </li>
      ))}
    </ul>
  );
}
