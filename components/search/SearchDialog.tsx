"use client";

import { ArrowRight, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog } from "radix-ui";
import { useId, useMemo, useState, type KeyboardEvent } from "react";
import type { SiteContent } from "@/content/types";
import { cn } from "@/lib/cn";
import type { SearchEntry } from "@/lib/search-index";

const MAX_RESULTS = 8;

/** Every word must appear somewhere; title matches rank first. */
function search(index: SearchEntry[], query: string): SearchEntry[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return index.filter((e) => e.kind === "Page");
  return index
    .map((entry) => {
      const title = entry.title.toLowerCase();
      const haystack =
        `${title} ${entry.description} ${entry.keywords} ${entry.kind}`.toLowerCase();
      if (!words.every((w) => haystack.includes(w))) return null;
      const score = words.reduce((s, w) => s + (title.includes(w) ? 2 : 1), 0);
      return { entry, score };
    })
    .filter((r): r is { entry: SearchEntry; score: number } => r !== null)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.entry)
    .slice(0, MAX_RESULTS);
}

type SearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  index: SearchEntry[];
  copy: SiteContent["search"];
  onCloseFocus: () => void;
};

/** Search palette (combobox + listbox). Loaded on demand by SearchButton. */
export default function SearchDialog({
  open,
  onOpenChange,
  index,
  copy,
  onCloseFocus,
}: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const results = useMemo(() => search(index, query), [index, query]);
  const listId = useId();

  const go = (entry: SearchEntry | undefined) => {
    if (!entry) return;
    onOpenChange(false);
    router.push(entry.href);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active]);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm data-[state=open]:animate-[fade-in_150ms]" />
        <Dialog.Content
          aria-describedby={undefined}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            onCloseFocus();
          }}
          className="fixed inset-x-3 top-[10vh] z-50 mx-auto max-w-2xl overflow-hidden rounded-card border border-line bg-surface shadow-[0_40px_80px_-30px_rgb(8_121_249/0.5)] outline-none data-[state=open]:animate-[rise-in_220ms_var(--ease-out-soft)]"
        >
          <Dialog.Title className="sr-only">{copy.label}</Dialog.Title>
          <div className="flex items-center gap-3 border-b border-line px-5">
            <Search aria-hidden className="size-5 shrink-0 text-muted" />
            <input
              autoFocus
              type="search"
              role="combobox"
              aria-label={copy.placeholder}
              aria-expanded
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
              placeholder={copy.placeholder}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              className="h-16 flex-1 bg-transparent text-lg text-white placeholder:text-muted focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            <Dialog.Close
              className="inline-flex size-9 items-center justify-center rounded-md text-muted hover:bg-white/10 hover:text-white"
              aria-label="Close search"
            >
              <X aria-hidden className="size-5" />
            </Dialog.Close>
          </div>

          <p className="sr-only" aria-live="polite">
            {results.length === 0 ? copy.empty : `${results.length} results`}
          </p>
          {results.length === 0 ? (
            <p className="px-5 py-10 text-center text-muted">{copy.empty}</p>
          ) : (
            <ul
              id={listId}
              role="listbox"
              aria-label={copy.label}
              className="max-h-[60vh] overflow-y-auto p-2"
            >
              {results.map((entry, i) => (
                <li
                  key={entry.href}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onPointerMove={() => setActive(i)}
                  onClick={() => go(entry)}
                  className={cn(
                    "flex cursor-pointer items-center gap-4 rounded-tile px-4 py-3",
                    i === active && "bg-surface-2",
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.7rem] font-semibold tracking-[0.12em] text-brand-text uppercase">
                      {entry.kind}
                    </p>
                    <p className="mt-0.5 truncate font-medium text-white">{entry.title}</p>
                    <p className="truncate text-sm text-muted">{entry.description}</p>
                  </div>
                  <ArrowRight
                    aria-hidden
                    className={cn(
                      "size-4 shrink-0 text-brand-text",
                      i === active ? "opacity-100" : "opacity-0",
                    )}
                  />
                </li>
              ))}
            </ul>
          )}
          <p className="hidden border-t border-line px-5 py-3 text-xs text-muted sm:block">
            ↑ ↓ to move · Enter to open · Esc to close
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
