"use client";

import { Menu } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import type { Link } from "@/content/types";

const loadDrawer = () => import("./MobileDrawer");
const MobileDrawer = dynamic(loadDrawer, { ssr: false });

type MobileNavProps = { links: Link[]; cta: Link };

/**
 * Menu button for small screens. The drawer itself (Radix Dialog) is fetched on first
 * intent (hover, focus or touch) so it never weighs on the initial page load.
 */
export function MobileNav({ links, cta }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefetch = () => void loadDrawer();

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? "mobile-drawer" : undefined}
        onPointerEnter={prefetch}
        onFocus={prefetch}
        onTouchStart={prefetch}
        onClick={() => {
          setRequested(true);
          setOpen(true);
        }}
        className="inline-flex size-11 items-center justify-center rounded-lg text-ink hover:bg-soft lg:hidden"
      >
        <Menu aria-hidden className="size-6" />
      </button>
      {requested ? (
        <MobileDrawer
          links={links}
          cta={cta}
          open={open}
          onOpenChange={setOpen}
          onCloseFocus={() => buttonRef.current?.focus()}
        />
      ) : null}
    </>
  );
}
