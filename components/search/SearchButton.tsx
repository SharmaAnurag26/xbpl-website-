"use client";

import { Search } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/content/types";
import type { SearchEntry } from "@/lib/search-index";

const loadDialog = () => import("./SearchDialog");
const SearchDialog = dynamic(loadDialog, { ssr: false });

type SearchButtonProps = { index: SearchEntry[]; copy: SiteContent["search"] };

/** Search trigger. Ctrl/⌘+K or "/" also open it. The dialog code loads on first use. */
export function SearchButton({ index, copy }: SearchButtonProps) {
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "");
      const shortcut =
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") || (e.key === "/" && !typing);
      if (!shortcut) return;
      e.preventDefault();
      setRequested(true);
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label={copy.label}
        aria-haspopup="dialog"
        aria-keyshortcuts="Control+K Meta+K /"
        title={copy.hint}
        onPointerEnter={() => void loadDialog()}
        onFocus={() => void loadDialog()}
        onClick={() => {
          setRequested(true);
          setOpen(true);
        }}
        className="inline-flex h-11 min-w-11 items-center justify-center gap-2.5 rounded-lg px-2 text-[1.05rem] text-white transition-colors hover:bg-white/10 lg:px-3"
      >
        <Search aria-hidden className="size-[1.35rem]" strokeWidth={1.75} />
        <span aria-hidden className="hidden lg:inline">
          {copy.label}
        </span>
      </button>
      {requested ? (
        <SearchDialog
          open={open}
          onOpenChange={setOpen}
          index={index}
          copy={copy}
          onCloseFocus={() => buttonRef.current?.focus()}
        />
      ) : null}
    </>
  );
}
