"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type FilterItem = { id: string; category: string; card: ReactNode };
type Category = { id: string; label: string };
type TabsProps = {
  categories: Category[];
  items: FilterItem[];
  label?: string;
  /** What is being filtered, for announcements ("article"/"articles", "course"/"courses"). */
  noun?: { one: string; many: string };
};

const ALL = "all";

/**
 * Category filter for a grid of server-rendered cards (insights, courses). Cards are server-rendered and passed in as
 * nodes; this component only decides which are visible.
 *
 * `?category=` is the single source of truth, so menu links such as
 * /insights?category=cloud work even when Insights is already open. The Suspense
 * fallback is the full "All" view, so the static HTML (and no-JS visitors) get every card.
 */
export function CategoryTabs(props: TabsProps) {
  return (
    <Suspense fallback={<TabsView {...props} active={ALL} />}>
      <UrlSyncedTabs {...props} />
    </Suspense>
  );
}

function UrlSyncedTabs(props: TabsProps) {
  const params = useSearchParams();
  const pathname = usePathname();
  const fromUrl = params.get("category");
  const active = fromUrl && props.categories.some((c) => c.id === fromUrl) ? fromUrl : ALL;

  function select(id: string) {
    const next = new URLSearchParams(params.toString());
    if (id === ALL) next.delete("category");
    else next.set("category", id);
    const query = next.toString();
    // Native history updates are picked up by useSearchParams without a server round-trip.
    window.history.replaceState(null, "", query ? `${pathname}?${query}` : pathname);
  }

  return <TabsView {...props} active={active} onSelect={select} />;
}

function TabsView({
  categories,
  items,
  label = "Filter insights by category",
  noun = { one: "article", many: "articles" },
  active,
  onSelect,
}: TabsProps & { active: string; onSelect?: (id: string) => void }) {
  const tabs = [{ id: ALL, label: "All" }, ...categories];
  const visible = items.filter((i) => active === ALL || i.category === active);
  const activeLabel = tabs.find((t) => t.id === active)?.label ?? "All";

  return (
    <div>
      <div
        role="group"
        aria-label={label}
        className="-mx-4 [scrollbar-width:none] overflow-x-auto px-4"
      >
        <ul className="flex min-w-max gap-2">
          {tabs.map((tab) => {
            const selected = tab.id === active;
            return (
              <li key={tab.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onSelect?.(tab.id)}
                  className={cn(
                    "h-10 rounded-full border px-4 text-sm whitespace-nowrap transition-colors",
                    selected
                      ? "border-white bg-white font-medium text-black"
                      : "border-line text-white/80 hover:border-white/60 hover:text-white",
                  )}
                >
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="sr-only" aria-live="polite">
        {`Showing ${visible.length} ${visible.length === 1 ? noun.one : noun.many}${active === ALL ? "" : ` in ${activeLabel}`}.`}
      </p>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id} hidden={active !== ALL && item.category !== active}>
            {item.card}
          </li>
        ))}
      </ul>
      {visible.length === 0 ? (
        <p className="mt-8 rounded-card bg-soft p-8 text-center text-muted">
          No {noun.many} in {activeLabel} yet. Check back soon.
        </p>
      ) : null}
    </div>
  );
}
