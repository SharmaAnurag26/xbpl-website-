"use client";

import { inView } from "motion";
import { useEffect, useRef } from "react";

type CountUpProps = { value: number; suffix?: string; className?: string };

const format = (n: number) => Math.round(n).toLocaleString("en-US");
const DURATION = 1600;
// Matches the site's ease-out curve closely; a plain function keeps this island tiny.
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

/**
 * Renders the final value on the server ("2,500+") so the number is correct without JS
 * and for crawlers. When the stat scrolls into view, it counts up from zero.
 * Screen readers always get the final value.
 */
export function CountUp({ value, suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen at hydration: leave it alone rather than flash back to 0.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    let frame = 0;
    el.textContent = `0${suffix}`;
    const stop = inView(
      el,
      () => {
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          el.textContent = `${format(value * easeOutExpo(t))}${suffix}`;
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { amount: 0.6 },
    );

    return () => {
      stop();
      cancelAnimationFrame(frame);
      el.textContent = `${format(value)}${suffix}`;
    };
  }, [value, suffix]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden>
        {format(value)}
        {suffix}
      </span>
      <span className="sr-only">
        {format(value)}
        {suffix}
      </span>
    </span>
  );
}
