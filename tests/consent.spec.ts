import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "./fixtures";

// The test build enables Plausible (see playwright.config.ts). The script request is
// intercepted, so nothing is sent to a real analytics service.
test.use({ consentChoice: null });

test.describe("cookie consent", () => {
  test("analytics load only after the visitor accepts", async ({ page }) => {
    let analyticsRequests = 0;
    await page.route("https://plausible.io/**", (route) => {
      analyticsRequests++;
      return route.fulfill({ status: 200, contentType: "text/javascript", body: "" });
    });

    await page.goto("/");
    const banner = page.getByRole("region", { name: "Cookie consent" });
    await expect(banner).toBeVisible();
    await page.waitForTimeout(500);
    expect(analyticsRequests).toBe(0);

    const axe = await new AxeBuilder({ page }).include('[aria-label="Cookie consent"]').analyze();
    expect(axe.violations.map((v) => v.id)).toEqual([]);

    await banner.getByRole("button", { name: "Accept analytics" }).click();
    await expect(banner).toBeHidden();
    await expect.poll(() => analyticsRequests).toBeGreaterThan(0);

    // The choice persists across navigation.
    await page.goto("/about");
    await expect(page.getByRole("region", { name: "Cookie consent" })).toBeHidden();
  });

  test("rejecting keeps analytics off, and the choice can be revisited", async ({ page }) => {
    let analyticsRequests = 0;
    await page.route("https://plausible.io/**", (route) => {
      analyticsRequests++;
      return route.fulfill({ status: 200, contentType: "text/javascript", body: "" });
    });

    await page.goto("/");
    await page.getByRole("button", { name: "Reject" }).click();
    await page.reload();
    await page.waitForTimeout(500);
    expect(analyticsRequests).toBe(0);

    await page.getByRole("button", { name: "Cookie settings" }).click();
    await expect(page.getByRole("region", { name: "Cookie consent" })).toBeVisible();
  });
});
