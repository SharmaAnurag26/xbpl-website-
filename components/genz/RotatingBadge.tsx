import { cn } from "@/lib/cn";

/** Circular spinning text badge (decorative). */
export function RotatingBadge({ text, className }: { text: string; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("relative grid size-32 place-items-center sm:size-36", className)}
    >
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 animate-spin-slow motion-reduce:animate-none"
      >
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text
          className="fill-white font-display text-[15px] font-semibold uppercase"
          letterSpacing="3.2"
        >
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <span className="grid size-14 place-items-center rounded-full bg-volt text-black">
        <svg
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </span>
    </div>
  );
}
