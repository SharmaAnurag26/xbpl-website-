import { Plus } from "lucide-react";
import type { FaqSection } from "@/content/types";

/** FAQ built on native <details>: keyboard and screen-reader friendly with zero JS. */
export function Faq({ faq, id }: { faq: FaqSection; id: string }) {
  if (faq.items.length === 0) return null;
  return (
    <section
      aria-labelledby={`${id}-title`}
      className="border-t border-line bg-canvas py-20 lg:py-28"
    >
      <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <h2
          id={`${id}-title`}
          className="font-display text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] text-white sm:text-5xl"
        >
          {faq.title}
        </h2>
        <div className="border-t border-line">
          {faq.items.map((item) => (
            <details key={item.question} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium text-white sm:text-xl [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:border-volt group-open:bg-volt group-open:text-black">
                  <Plus aria-hidden className="size-4" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
