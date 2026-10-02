/**
 * Equirectangular projection shared by scripts/gen-world-map.ts (which draws
 * public/images/world-dots.svg) and LocationsMap (which places pins over it).
 */
export const MAP = {
  width: 1000,
  latTop: 84,
  latBottom: -58, // Antarctica is cropped.
  step: 2.5, // degrees between dots
} as const;

export const MAP_HEIGHT = Math.round((MAP.width * (MAP.latTop - MAP.latBottom)) / 360);

export function project(lon: number, lat: number): { x: number; y: number } {
  return {
    x: ((lon + 180) / 360) * MAP.width,
    y: ((MAP.latTop - lat) / (MAP.latTop - MAP.latBottom)) * MAP_HEIGHT,
  };
}

/** Position as percentages of the map box, for absolutely positioned pins. */
export function projectPercent(lon: number, lat: number): { left: string; top: string } {
  const { x, y } = project(lon, lat);
  return { left: `${(x / MAP.width) * 100}%`, top: `${(y / MAP_HEIGHT) * 100}%` };
}
