"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type FilterItem = { id: string; category: string; card: ReactNode };
type Category = { id: string; label: string };

const ALL = "all";

/**
 * Category filter for the insights grid. Cards are server-rendered and passed in as
 * nodes; this component only decides which are visible. Without JS every card shows.
 * The selection is mirrored to `?category=` so filtered views can be shared.
 */
export function CategoryTabs({
  categories,
  items,
  label = "Filter insights by category",
}: {
  categories: Category[];
  items: FilterItem[];
  label?: string;
}) {
  const [active, setActive] = useState(ALL);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("category");
    if (fromUrl && categories.some((c) => c.id === fromUrl)) {
      // Syncing from the URL is a one-off external read at mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(fromUrl);
    }
  }, [categories]);

  function select(id: string) {
    setActive(id);
    const url = new URL(window.location.href);
    if (id === ALL) url.searchParams.delete("category");
    else url.searchParams.set("category", id);
    window.history.replaceState(null, "", url);
  }

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
        <ul className="flex min-w-max gap-1 border-b border-line">
          {tabs.map((tab) => {
            const selected = tab.id === active;
            return (
              <li key={tab.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => select(tab.id)}
                  className={cn(
                    "relative h-11 px-3 text-sm font-medium whitespace-nowrap transition-colors sm:px-4",
                    "after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:transition-transform after:duration-300",
                    selected
                      ? "text-brand-text after:scale-x-100 after:bg-brand"
                      : "text-muted after:scale-x-0 after:bg-line hover:text-ink hover:after:scale-x-100",
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
        {`Showing ${visible.length} ${visible.length === 1 ? "article" : "articles"}${active === ALL ? "" : ` in ${activeLabel}`}.`}
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
          No articles in {activeLabel} yet. Check back soon.
        </p>
      ) : null}
    </div>
  );
}
