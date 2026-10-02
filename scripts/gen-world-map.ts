/**
 * Generates public/images/world-dots.svg: a lightweight dotted world map (Natural Earth
 * 110m land via world-atlas). Run once: pnpm map. The output is committed.
 */
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { geoContains } from "d3-geo";
import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import land110 from "world-atlas/land-110m.json";
import { MAP, MAP_HEIGHT, project } from "@/lib/map";

const topology = land110 as unknown as Topology<{ land: GeometryCollection }>;
const land = feature(topology, topology.objects.land) as unknown as FeatureCollection<
  Polygon | MultiPolygon
>;

const segments: string[] = [];
for (let lat = MAP.latTop - MAP.step / 2; lat > MAP.latBottom; lat -= MAP.step) {
  for (let lon = -180 + MAP.step / 2; lon < 180; lon += MAP.step) {
    if (land.features.some((f) => geoContains(f, [lon, lat]))) {
      const { x, y } = project(lon, lat);
      segments.push(`M${x.toFixed(1)} ${y.toFixed(1)}h0`);
    }
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MAP.width} ${MAP_HEIGHT}" width="${MAP.width}" height="${MAP_HEIGHT}"><path d="${segments.join("")}" stroke="#b9c6d8" stroke-width="5.2" stroke-linecap="round" fill="none"/></svg>\n`;

async function main() {
  const out = path.join(process.cwd(), "public", "images", "world-dots.svg");
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, svg);
  console.log(`world-dots.svg: ${segments.length} dots, ${(svg.length / 1024).toFixed(1)} KB`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
