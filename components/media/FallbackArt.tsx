import { icons, type IconName } from "@/lib/icons";

type FallbackArtProps = { tone: "aurora" | "dark"; icon?: IconName };

/**
 * Designed placeholder art (pure CSS + inline SVG, zero network cost) shown while an image
 * slot has no file. Decorative only.
 */
export function FallbackArt({ tone, icon }: FallbackArtProps) {
  const Icon = icon ? icons[icon] : null;

  return (
    <div aria-hidden className="absolute inset-0 isolate overflow-hidden bg-navy">
      {/* Base wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            tone === "aurora"
              ? "radial-gradient(120% 90% at 85% 60%, #0a6ec7 0%, #0a2c59 38%, #06162e 72%)"
              : "radial-gradient(90% 80% at 60% 45%, #0b3a75 0%, #0a2448 45%, #06162e 85%)",
        }}
      />
      {/* Static glows: many slots can be on one page, so no continuous animation here. */}
      <div className="absolute -inset-[10%]">
        <div className="absolute top-[18%] right-[12%] h-[55%] w-[45%] rounded-full bg-brand/35 blur-3xl" />
        <div className="absolute right-[30%] bottom-[8%] h-[40%] w-[35%] rounded-full bg-cyan/25 blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-grid-dark opacity-70" />

      {tone === "aurora" ? (
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          {/* Solid strokes (no gradient ids) so many instances can coexist on a page. */}
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M-50 ${700 - i * 26} C 450 ${640 - i * 40}, 900 ${420 + i * 18}, 1650 ${240 + i * 34}`}
              stroke={i === 2 ? "#08cfe3" : "#0879f9"}
              strokeWidth={i === 2 ? 3 : 1.25}
              strokeOpacity={i === 2 ? 0.9 : 0.4}
            />
          ))}
        </svg>
      ) : null}

      {Icon ? (
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative grid aspect-square w-[34%] max-w-56 min-w-20 place-items-center">
            <div className="absolute inset-0 rounded-full border border-cyan/20" />
            <div className="absolute inset-[14%] rounded-full border border-cyan/30" />
            <div className="absolute inset-[28%] rounded-full bg-brand/30 blur-xl" />
            <Icon
              className="relative h-[34%] w-[34%] text-cyan-soft drop-shadow-[0_0_18px_rgb(8_207_227/0.7)]"
              strokeWidth={1.25}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
