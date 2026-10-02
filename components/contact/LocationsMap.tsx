import { MAP, MAP_HEIGHT, projectPercent } from "@/lib/map";

type Location = { name: string; lon: number; lat: number };

/**
 * Static dotted world map (public/images/world-dots.svg, ~33 KB, cached) with pins
 * positioned by the same projection that drew it. No map SDK, no third-party requests.
 */
export function LocationsMap({ title, locations }: { title: string; locations: Location[] }) {
  return (
    <figure className="rounded-card border border-line bg-soft p-4 sm:p-5">
      <figcaption className="mb-3 text-sm font-semibold text-ink">{title}</figcaption>
      <div className="relative" style={{ aspectRatio: `${MAP.width} / ${MAP_HEIGHT}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, no optimisation needed */}
        <img
          src="/images/world-dots.svg"
          alt=""
          width={MAP.width}
          height={MAP_HEIGHT}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full"
        />
        {locations.map((loc) => (
          <span
            key={loc.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={projectPercent(loc.lon, loc.lat)}
          >
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-brand/40 motion-reduce:animate-none"
            />
            <span
              aria-hidden
              className="relative block size-3 rounded-full border-2 border-white bg-brand-text shadow-[0_0_0_4px_rgb(8_121_249/0.2)]"
            />
          </span>
        ))}
      </div>
      <ul className="mt-3 space-y-1 text-sm text-muted">
        {locations.map((loc) => (
          <li key={loc.name} className="flex items-center gap-2">
            <span aria-hidden className="size-2 rounded-full bg-brand-text" />
            {loc.name}
          </li>
        ))}
      </ul>
    </figure>
  );
}
