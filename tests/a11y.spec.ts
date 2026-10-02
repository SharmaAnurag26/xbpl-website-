import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";
import { expect, routes, test } from "./fixtures";

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function scrollThrough(page: Page) {
  // Reveal animations finish once elements have been scrolled into view.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(900);
}

test.describe("WCAG 2.2 AA (axe)", () => {
  for (const route of [...routes, { path: "/does-not-exist" }]) {
    test(`${route.path} has no detectable violations`, async ({ page }) => {
      await page.goto(route.path);
      await scrollThrough(page);
      const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
      const summary = results.violations.map(
        (v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`,
      );
      expect(summary).toEqual([]);
    });
  }

  test("contact form error state has no violations", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Submit Enquiry" }).click();
    await expect(page.getByText("Please enter your name.")).toBeVisible();
    const results = await new AxeBuilder({ page }).withTags(TAGS).include("form").analyze();
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});

test.describe("keyboard", () => {
  test("focus is always visible on interactive elements", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard walkthrough runs on desktop");
    await page.goto("/");
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      const outline = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return "none";
        const s = getComputedStyle(el);
        const after = getComputedStyle(el, "::after");
        return s.outlineStyle !== "none" ? s.outlineStyle : after.outlineStyle;
      });
      expect(outline).not.toBe("none");
    }
  });
});
