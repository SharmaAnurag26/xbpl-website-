/**
 * Renders the site's 3D visuals once, offline, into transparent WebP "stickers"
 * (public/3d/*.webp). Uses three.js inside headless Chromium (Playwright), so the live
 * site ships plain images: no WebGL, no 3D library, no runtime cost.
 *
 * Run: pnpm render3d   (takes ~1 minute; commit the output)
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { markBlades } from "@/lib/brand/logo";

const root = process.cwd();
const OUT = path.join(root, "public", "3d");
const SUPERSAMPLE = 2;

type Job = { name: string; width: number; height: number };

const jobs: Job[] = [
  { name: "x-mark", width: 1800, height: 1440 },
  { name: "knot", width: 900, height: 900 },
  { name: "blob", width: 900, height: 900 },
  { name: "glass-cube", width: 900, height: 900 },
  { name: "rings", width: 1000, height: 820 },
  { name: "shield", width: 900, height: 900 },
  { name: "cloud", width: 1000, height: 760 },
  { name: "capsules", width: 900, height: 900 },
];

/** Browser-side scene code. Each builder returns a THREE.Object3D centred at the origin. */
const sceneModule = String.raw`
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const BLUE = 0x0879f9, CYAN = 0x08cfe3, DEEP = 0x0a3fbf, VOLT = 0xb8f000;

const chrome = (color, extra = {}) => new THREE.MeshPhysicalMaterial({
  color, metalness: 0.55, roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.06,
  iridescence: 0.35, iridescenceIOR: 1.3, iridescenceThicknessRange: [180, 420], ...extra,
});
const plastic = (color) => new THREE.MeshPhysicalMaterial({
  color, metalness: 0, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.08, sheen: 0.4,
});
const glass = () => new THREE.MeshPhysicalMaterial({
  color: 0xdff9ff, metalness: 0, roughness: 0.04, transmission: 1, thickness: 1.4, ior: 1.45,
  attenuationColor: new THREE.Color(CYAN), attenuationDistance: 2.2, clearcoat: 1,
});

function noiseBlob() {
  const g = new THREE.IcosahedronGeometry(1.15, 96);
  const p = g.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const n = Math.sin(v.x * 2.6) * Math.cos(v.y * 2.2) * 0.16 + Math.sin(v.z * 3.1 + v.y * 1.4) * 0.11;
    v.multiplyScalar(1 + n);
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return new THREE.Mesh(g, chrome(CYAN, { color: 0x2fb6ff }));
}

function xMark(blades) {
  // Logo pixel space → centred units; y flipped for 3D.
  const toShape = (pts) => {
    const s = new THREE.Shape();
    pts.forEach(([x, y], i) => {
      const px = (x - 373) / 140, py = -(y - 503) / 140;
      i ? s.lineTo(px, py) : s.moveTo(px, py);
    });
    s.closePath();
    return s;
  };
  const opts = { depth: 0.75, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.06, bevelSegments: 8, curveSegments: 12 };
  const group = new THREE.Group();
  const mats = { main: chrome(BLUE, { color: 0x1668f2 }), upper: chrome(CYAN, { color: 0x14c4ee }), lower: chrome(DEEP, { color: 0x1f5fe0 }) };
  for (const [name, pts] of Object.entries(blades)) {
    const geo = new THREE.ExtrudeGeometry(toShape(pts), opts);
    geo.translate(0, 0, -0.375);
    group.add(new THREE.Mesh(geo, mats[name]));
  }
  group.rotation.set(-0.42, 0.78, 0.12);
  return group;
}

function rings() {
  const group = new THREE.Group();
  const specs = [[BLUE, [-0.9, 0.15, 0], [0.4, 0.2, 0]], [CYAN, [0.15, -0.35, 0.1], [1.2, 0.6, 0.3]], [VOLT, [0.95, 0.35, -0.1], [0.3, 1.1, 0.5]]];
  for (const [color, pos, rot] of specs) {
    const m = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.2, 64, 160), color === VOLT ? plastic(color) : chrome(color));
    m.position.set(...pos); m.rotation.set(...rot);
    group.add(m);
  }
  return group;
}

function shield() {
  const s = new THREE.Shape();
  s.moveTo(0, 1.25);
  s.bezierCurveTo(0.55, 1.05, 0.95, 1.0, 1.05, 0.98);
  s.lineTo(1.05, 0.1);
  s.bezierCurveTo(1.05, -0.62, 0.45, -1.08, 0, -1.3);
  s.bezierCurveTo(-0.45, -1.08, -1.05, -0.62, -1.05, 0.1);
  s.lineTo(-1.05, 0.98);
  s.bezierCurveTo(-0.95, 1.0, -0.55, 1.05, 0, 1.25);
  const body = new THREE.ExtrudeGeometry(s, { depth: 0.42, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.1, bevelSegments: 10, curveSegments: 48 });
  body.center();
  const group = new THREE.Group();
  group.add(new THREE.Mesh(body, chrome(BLUE, { color: 0x1d6ff0 })));
  const tick = new THREE.Shape();
  tick.moveTo(-0.5, 0.05); tick.lineTo(-0.16, -0.3); tick.lineTo(0.55, 0.42); tick.lineTo(0.42, 0.55); tick.lineTo(-0.16, -0.04); tick.lineTo(-0.37, 0.18); tick.closePath();
  const tg = new THREE.ExtrudeGeometry(tick, { depth: 0.18, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.04, bevelSegments: 6 });
  tg.center(); tg.translate(0, 0, 0.36);
  group.add(new THREE.Mesh(tg, plastic(VOLT)));
  group.rotation.set(-0.15, 0.55, 0.05);
  return group;
}

function cloud() {
  const group = new THREE.Group();
  const mat = plastic(0xe9f6ff);
  mat.sheenColor = new THREE.Color(CYAN);
  [[-0.95, -0.15, 0, 0.62], [-0.25, 0.25, 0.05, 0.85], [0.6, 0.05, 0, 0.72], [1.15, -0.25, 0, 0.5], [0.1, -0.35, 0.2, 0.62]].forEach(([x, y, z, r]) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 96, 64), mat);
    m.position.set(x, y, z); group.add(m);
  });
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.22, 64, 48), chrome(BLUE));
  dot.position.set(1.45, 0.75, 0.3); group.add(dot);
  group.rotation.set(0.2, -0.25, 0);
  return group;
}

function capsules() {
  const group = new THREE.Group();
  const specs = [[BLUE, [-0.55, 0.35, 0], [0.3, 0, 0.9]], [VOLT, [0.45, -0.1, 0.3], [-0.4, 0.3, -0.5]], [CYAN, [0.1, 0.75, -0.4], [0.9, 0.2, 0.3]]];
  for (const [color, pos, rot] of specs) {
    const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.95, 16, 48), color === VOLT ? plastic(color) : chrome(color));
    m.position.set(...pos); m.rotation.set(...rot); group.add(m);
  }
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.3, 64, 48), glass());
  ball.position.set(-0.6, -0.65, 0.4); group.add(ball);
  return group;
}

function glassCube() {
  const group = new THREE.Group();
  const cube = new THREE.Mesh(new RoundedBoxGeometry(1.5, 1.5, 1.5, 8, 0.22), glass());
  cube.rotation.set(0.55, 0.7, 0.1); group.add(cube);
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42, 1), plastic(VOLT));
  core.rotation.set(0.4, 0.3, 0); group.add(core);
  return group;
}

const builders = {
  "x-mark": (a) => xMark(a.blades),
  knot: () => { const m = new THREE.Mesh(new THREE.TorusKnotGeometry(0.9, 0.3, 360, 64, 2, 3), chrome(BLUE, { color: 0x1d7bff })); m.rotation.set(0.5, 0.3, 0); return m; },
  blob: noiseBlob,
  "glass-cube": glassCube,
  rings,
  shield,
  cloud,
  capsules,
};

window.render = async (name, width, height, args) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(3, 4, 5); scene.add(key);
  const rimCyan = new THREE.PointLight(CYAN, 40, 0, 2); rimCyan.position.set(-4, 2, 2); scene.add(rimCyan);
  const rimBlue = new THREE.PointLight(BLUE, 50, 0, 2); rimBlue.position.set(4, -2, -2); scene.add(rimBlue);

  const obj = builders[name](args);
  scene.add(obj);

  // Frame the object tightly: fit its bounding box (not a loose sphere) to the view.
  const box = new THREE.Box3().setFromObject(obj);
  const size = box.getSize(new THREE.Vector3());
  obj.position.sub(box.getCenter(new THREE.Vector3()));
  const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
  const halfV = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
  const halfH = halfV * camera.aspect;
  const dist = Math.max(size.y / 2 / halfV, size.x / 2 / halfH) * 1.12 + size.z / 2;
  camera.position.set(0, 0, dist);
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
  return renderer.domElement.toDataURL("image/png");
};
window.ready = true;
`;

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  const page = await browser.newPage();
  page.on("pageerror", (e) => console.error("page error:", e.message));

  // Serve three.js from node_modules to the page under a fake origin.
  await page.route("http://render.local/**", async (route) => {
    const url = new URL(route.request().url());
    if (url.pathname === "/") {
      const html = `<!doctype html><html><body style="margin:0;background:transparent">
        <script type="importmap">{"imports":{"three":"/three/build/three.module.js","three/addons/":"/three/examples/jsm/"}}</script>
        <script type="module" src="/scene.js"></script></body></html>`;
      return route.fulfill({ contentType: "text/html", body: html });
    }
    if (url.pathname === "/scene.js") {
      return route.fulfill({ contentType: "text/javascript", body: sceneModule });
    }
    const file = path.join(root, "node_modules", url.pathname);
    return route.fulfill({ contentType: "text/javascript", body: await readFile(file) });
  });

  await page.goto("http://render.local/");
  await page.waitForFunction(
    () => (window as unknown as { ready?: boolean }).ready === true,
    null,
    {
      timeout: 30000,
    },
  );

  const sizes: Record<string, { width: number; height: number }> = {};
  for (const job of jobs) {
    const started = Date.now();
    const dataUrl = await page.evaluate(
      ([name, w, h, blades]) =>
        (
          window as unknown as {
            render: (n: string, w: number, h: number, a: unknown) => Promise<string>;
          }
        ).render(name, w, h, { blades }),
      [
        job.name,
        job.width * SUPERSAMPLE,
        job.height * SUPERSAMPLE,
        Object.fromEntries(
          Object.entries(markBlades).map(([k, pts]) => [
            k,
            pts.split(" ").map((pair) => pair.split(",").map(Number)),
          ]),
        ),
      ] as const,
    );
    const png = Buffer.from(dataUrl.split(",")[1] ?? "", "base64");
    // Downsample (supersampling AA), then trim transparent margins so stickers size predictably.
    const scaled = await sharp(png)
      .resize(job.width, job.height, { kernel: "lanczos3" })
      .png()
      .toBuffer();
    const { data, info } = await sharp(scaled)
      .trim({ threshold: 1 })
      .toBuffer({ resolveWithObject: true });
    await sharp(data)
      .webp({ quality: 86, alphaQuality: 90, effort: 6 })
      .toFile(path.join(OUT, `${job.name}.webp`));
    sizes[job.name] = { width: info.width, height: info.height };
    console.log(`  ${job.name}.webp  ${info.width}×${info.height}  (${Date.now() - started} ms)`);
  }

  await browser.close();
  await writeFile(path.join(root, "lib", "stickers.json"), JSON.stringify(sizes, null, 2) + "\n");
  // Next.js caches optimised images by URL for hours; drop the cache so new renders show up.
  await rm(path.join(root, ".next", "cache", "images"), { recursive: true, force: true });
  console.log("3D renders written to public/3d/ (sizes in lib/stickers.json)");
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
