import { expect, routes, test } from "./fixtures";

test.describe("every route renders with complete SEO metadata", () => {
  for (const route of routes) {
    test(`${route.path}`, async ({ page }) => {
      const res = await page.goto(route.path);
      expect(res?.status()).toBe(200);

      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(route.h1);

      await expect(page).toHaveTitle(/XBPL/);
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description?.length ?? 0).toBeGreaterThan(50);

      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      // Next writes the root canonical without a trailing slash.
      expect(canonical).toMatch(
        route.path === "/" ? /^https?:\/\/[^/]+\/?$/ : new RegExp(`${route.path}$`),
      );

      await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute(
        "content",
        /opengraph-image/,
      );
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
        "content",
        "summary_large_image",
      );

      // All JSON-LD blocks parse, and inner pages carry breadcrumbs.
      const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
      const types = blocks.flatMap((b) => {
        const data = JSON.parse(b) as { "@type": string } | { "@type": string }[];
        return (Array.isArray(data) ? data : [data]).map((d) => d["@type"]);
      });
      expect(types).toContain("Organization");
      if (route.path !== "/") expect(types).toContain("BreadcrumbList");
      if (route.path.startsWith("/insights/")) expect(types).toContain("Article");
    });
  }

  test("unknown routes return the custom 404", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/moved on/i);
  });
});

test.describe("metadata routes", () => {
  test("sitemap lists pages and articles", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.ok()).toBeTruthy();
    const xml = await res.text();
    for (const r of routes) expect(xml).toContain(`${r.path === "/" ? "" : r.path}</loc>`);
    expect(xml).not.toContain("/styleguide");
  });

  test("robots.txt points at the sitemap", async ({ request }) => {
    const body = await (await request.get("/robots.txt")).text();
    expect(body).toContain("Sitemap:");
    expect(body).toContain("Disallow: /styleguide");
  });

  test("manifest and icons are served", async ({ request }) => {
    expect((await request.get("/manifest.webmanifest")).ok()).toBeTruthy();
    expect((await request.get("/icon.svg")).ok()).toBeTruthy();
    expect((await request.get("/favicon.ico")).ok()).toBeTruthy();
    expect((await request.get("/apple-icon.png")).ok()).toBeTruthy();
  });

  test("Open Graph images render as PNG", async ({ request }) => {
    for (const path of [
      "/opengraph-image",
      "/insights/cloud-migration-key-considerations/opengraph-image",
    ]) {
      const res = await request.get(path);
      expect(res.ok()).toBeTruthy();
      expect(res.headers()["content-type"]).toContain("image/png");
    }
  });
});
