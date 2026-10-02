import type { SVGProps } from "react";
import {
  CYAN,
  DOT_RADIUS,
  FULL_VIEWBOX,
  LETTER_STROKE,
  MARK_VIEWBOX,
  TAGLINE_STROKE,
  WORDMARK_VIEWBOX,
  dotGradient,
  inkFor,
  lFootTip,
  letterAccents,
  letterPaths,
  markBlades,
  markGradients,
  tagline,
  viewBoxString,
  type LinearGradientDef,
  type LogoVariant,
} from "@/lib/brand/logo";

export type LogoLayout = "full" | "wordmark" | "mark";

type LogoProps = Omit<SVGProps<SVGSVGElement>, "id" | "viewBox"> & {
  /** Unique per placement on a page; prefixes gradient ids so instances never collide. */
  id: string;
  variant?: LogoVariant;
  layout?: LogoLayout;
  /** Accessible name. Pass `null` when the logo is decorative (e.g. inside a labelled link). */
  title?: string | null;
};

const viewBoxes = { full: FULL_VIEWBOX, wordmark: WORDMARK_VIEWBOX, mark: MARK_VIEWBOX };

function Gradient({
  def,
  id,
  userSpace = true,
}: {
  def: LinearGradientDef;
  id: string;
  userSpace?: boolean;
}) {
  return (
    <linearGradient
      id={id}
      gradientUnits={userSpace ? "userSpaceOnUse" : "objectBoundingBox"}
      x1={def.x1}
      y1={def.y1}
      x2={def.x2}
      y2={def.y2}
    >
      {def.stops.map((s) => (
        <stop key={s.offset} offset={s.offset} stopColor={s.color} />
      ))}
    </linearGradient>
  );
}

export function Logo({
  id,
  variant = "color",
  layout = "full",
  title = "XBPL — Build • Evolve • Lead",
  ...rest
}: LogoProps) {
  const ink = inkFor(variant);
  const mono = variant === "mono-white";
  const gid = (name: string) => `${id}-${name}`;
  const paint = (name: string) => (mono ? "#ffffff" : `url(#${gid(name)})`);
  const accentEnd = variant === "color" ? ink : "#ffffff";
  const vb = viewBoxes[layout];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBoxString(vb)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {!mono && (
        <defs>
          {markGradients.map((g) => (
            <Gradient key={g.id} def={g} id={gid(g.id)} />
          ))}
          <Gradient def={dotGradient} id={gid("dot")} userSpace={false} />
          {Object.entries(letterAccents).map(([name, a]) => (
            <Gradient
              key={name}
              id={gid(name)}
              def={{
                id: name,
                x1: a.x1,
                y1: 0,
                x2: a.x2,
                y2: 0,
                stops: [
                  { offset: 0, color: name === "lFoot" ? accentEnd : "#16a6f0" },
                  { offset: 1, color: name === "lFoot" ? CYAN : accentEnd },
                ],
              }}
            />
          ))}
        </defs>
      )}

      {/* X mark */}
      <g strokeLinejoin="round" strokeWidth={10}>
        {(Object.keys(markBlades) as (keyof typeof markBlades)[]).map((blade) => (
          <polygon
            key={blade}
            points={markBlades[blade]}
            fill={paint(blade)}
            stroke={paint(blade)}
          />
        ))}
      </g>

      {layout !== "mark" && (
        <>
          {/* BPL */}
          <g fill="none" stroke={ink} strokeWidth={LETTER_STROKE}>
            {Object.values(letterPaths).map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          {!mono && (
            <g fill="none" strokeWidth={LETTER_STROKE}>
              {Object.entries(letterAccents).map(([name, a]) => (
                <path key={name} d={a.d} stroke={paint(name)} />
              ))}
            </g>
          )}
          <polygon points={lFootTip} fill={mono ? "#ffffff" : CYAN} />
        </>
      )}

      {layout === "full" && (
        <>
          <path
            d={tagline.d}
            fill="none"
            stroke={ink}
            strokeWidth={TAGLINE_STROKE}
            strokeLinecap="butt"
            strokeLinejoin="miter"
          />
          {tagline.dots.map((dot) => (
            <circle key={dot.cx} cx={dot.cx} cy={dot.cy} r={DOT_RADIUS} fill={paint("dot")} />
          ))}
        </>
      )}
    </svg>
  );
}
