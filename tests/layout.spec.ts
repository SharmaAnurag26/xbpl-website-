import { expect, test } from "./fixtures";

test.describe("site shell", () => {
  test("home renders header, main and footer landmarks", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  });

  test("stylesheets and scripts load (no CSP/asset failures)", async ({ page }) => {
    const failedAssets: string[] = [];
    page.on("requestfailed", (req) => {
      if (req.url().includes("/_next/static/")) failedAssets.push(req.url());
    });
    page.on("response", (res) => {
      if (res.url().includes("/_next/static/") && res.status() >= 400) failedAssets.push(res.url());
    });
    await page.goto("/", { waitUntil: "load" });
    // Header height comes from the compiled Tailwind CSS; anything else means styles didn't load.
    const headerHeight = await page
      .locator("header > div")
      .first()
      .evaluate((el) => getComputedStyle(el).height);
    expect(headerHeight).toBe("76px");
    expect(failedAssets).toEqual([]);
  });

  test("skip link moves focus to main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();
    await skip.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });

  test("security headers are set", async ({ request }) => {
    const res = await request.get("/");
    const h = res.headers();
    expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(h["strict-transport-security"]).toContain("max-age=");
    expect(h["x-frame-options"]).toBe("DENY");
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["permissions-policy"]).toContain("camera=()");
    expect(h["x-powered-by"]).toBeUndefined();
  });

  test("styleguide is not exposed in production", async ({ page }) => {
    const res = await page.goto("/styleguide");
    expect(res?.status()).toBe(404);
  });
});

test.describe("mobile navigation", () => {
  test.skip(({ isMobile }) => !isMobile, "drawer is mobile-only");

  test("drawer opens, traps focus, closes on Escape", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Open menu" });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Main menu" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Cloud" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});
