"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import type { NavItem } from "@/content/types";
import { cn } from "@/lib/cn";
import { isActiveItem } from "@/lib/nav";

const OPEN_DELAY = 90;
const CLOSE_DELAY = 180;

const itemClass =
  "relative inline-flex h-(--header-h) items-center gap-2 px-3 text-[1.05rem] transition-colors xl:px-5";
const underline =
  "after:absolute after:inset-x-3 after:bottom-3 after:h-0.5 after:origin-left after:rounded-full after:bg-[image:var(--gradient-text)] after:transition-transform after:duration-300 after:ease-out-soft xl:after:inset-x-5";

/**
 * Desktop navigation with full-width dropdown panels (disclosure pattern).
 * Opens on click, keyboard or hover intent; closes on Escape, outside click,
 * focus leaving the menu, or navigation.
 */
export function MegaNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<number | null>(null);
  const [lastPath, setLastPath] = useState(pathname);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const timer = useRef<number | undefined>(undefined);

  // Close when the route changes (adjusting state during render, per React guidance).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
  }

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      buttonRefs.current[open]?.focus();
      setOpen(null);
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const schedule = (fn: () => void, ms: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(fn, ms);
  };

  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(null);
  };

  const openItem = open !== null ? items[open] : undefined;

  return (
    <div
      ref={wrapperRef}
      onBlur={onBlur}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") schedule(() => setOpen(null), CLOSE_DELAY);
      }}
      onPointerEnter={() => window.clearTimeout(timer.current)}
    >
      <ul className="flex items-center">
        {items.map((item, i) => {
          const active = isActiveItem(pathname, item);
          const isOpen = open === i;
          if (!item.menu) {
            return (
              <li key={item.label}>
                <NextLink
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    itemClass,
                    underline,
                    active
                      ? "text-white after:scale-x-100"
                      : "text-white/90 after:scale-x-0 hover:text-white",
                  )}
                >
                  {item.label}
                </NextLink>
              </li>
            );
          }
          return (
            <li
              key={item.label}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse")
                  schedule(() => setOpen(i), open === null ? OPEN_DELAY : 0);
              }}
            >
              <button
                ref={(el) => {
                  buttonRefs.current[i] = el;
                }}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`mega-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  itemClass,
                  underline,
                  "outline-offset-[-2px]",
                  isOpen && "bg-white/[0.04] shadow-[inset_0_0_0_1px_var(--color-cyan-soft)]",
                  active || isOpen ? "text-white" : "text-white/90 hover:text-white",
                  active && !isOpen ? "after:scale-x-100" : "after:scale-x-0",
                )}
              >
                {item.label}
                {active ? <span className="sr-only"> (current section)</span> : null}
                <ChevronDown
                  aria-hidden
                  strokeWidth={2.25}
                  className={cn("size-4 transition-transform duration-200", isOpen && "rotate-180")}
                />
              </button>
            </li>
          );
        })}
      </ul>

      {openItem?.menu && open !== null ? (
        <>
          {/* Dim the page beneath the panel. */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-full h-svh animate-[fade-in_200ms] bg-black/60"
            onPointerDown={() => setOpen(null)}
          />
          <div
            id={`mega-panel-${open}`}
            className="absolute inset-x-0 top-full animate-[mega-in_260ms_var(--ease-out-soft)] border-y border-line bg-canvas"
          >
            <div className="container-site grid gap-10 py-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:py-12">
              <div>
                <p className="text-eyebrow font-semibold text-cyan-soft uppercase">
                  {openItem.label}
                </p>
                <p className="mt-4 font-display text-[1.75rem] leading-[1.1] font-medium tracking-[-0.03em] text-white">
                  {openItem.menu.title}
                </p>
                <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted">
                  {openItem.menu.body}
                </p>
                <NextLink
                  href={openItem.menu.cta.href}
                  onClick={() => setOpen(null)}
                  className="group mt-6 inline-flex items-center gap-2 font-medium text-brand-text hover:text-white"
                >
                  {openItem.menu.cta.label}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform group-hover:translate-x-1"
                  />
                </NextLink>
              </div>
              <ul className="grid content-start gap-x-6 gap-y-1 sm:grid-cols-2">
                {openItem.menu.links.map((link) => (
                  <li key={link.label}>
                    <NextLink
                      href={link.href}
                      onClick={() => setOpen(null)}
                      className="group block rounded-tile border-l-2 border-transparent px-4 py-3.5 transition-colors hover:border-brand hover:bg-surface"
                    >
                      <span className="flex items-center justify-between gap-3 font-medium text-white">
                        {link.label}
                        <ArrowRight
                          aria-hidden
                          className="size-4 text-brand-text opacity-0 transition-[opacity,transform] group-hover:translate-x-1 group-hover:opacity-100"
                        />
                      </span>
                      {link.description ? (
                        <span className="mt-1 block text-sm leading-snug text-muted">
                          {link.description}
                        </span>
                      ) : null}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
