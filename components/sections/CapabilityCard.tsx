import type { FeatureItem } from "@/content/types";
import { IconTile } from "./IconTile";

/** Bordered tile with icon + title (Cloud / Security capabilities). */
export function CapabilityCard({ item }: { item: FeatureItem }) {
  return (
    <div className="group flex h-full flex-col items-center gap-4 rounded-card border border-line bg-white px-5 py-7 text-center shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-out-soft hover:-translate-y-1 hover:border-brand/30 hover:shadow-card-hover">
      <IconTile
        icon={item.icon}
        size="lg"
        className="group-hover:bg-brand group-hover:text-white"
      />
      <h3 className="font-display text-[0.98rem] leading-snug font-semibold text-ink">
        {item.title}
      </h3>
      {item.description ? (
        <p className="text-sm leading-relaxed text-muted">{item.description}</p>
      ) : null}
    </div>
  );
}
