"use client";

import { inView } from "motion";
import { animate } from "motion/mini";
import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. Use small increments (0.06) to stagger items in a grid. */
  delay?: number;
};

/**
 * Fade/rise-in on scroll.
 *
 * Content is fully visible in the server HTML. After hydration, only elements that are
 * still below the fold are hidden and then revealed, so there is never a blank page
 * without JS, no LCP penalty, and nothing flashes for content already on screen.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(18px)";

    const stop = inView(
      el,
      () => {
        const controls = animate(
          el,
          { opacity: [0, 1], transform: ["translateY(18px)", "translateY(0)"] },
          { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
        );
        void controls.finished.then(() => {
          el.style.removeProperty("opacity");
          el.style.removeProperty("transform");
        });
      },
      { amount: 0.15 },
    );

    return () => {
      stop();
      el.style.removeProperty("opacity");
      el.style.removeProperty("transform");
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
