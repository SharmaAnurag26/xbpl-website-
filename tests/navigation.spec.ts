import type { Locator, Page } from "@playwright/test";
import { expect, test } from "./fixtures";

/** The dropdown panel a menu button controls (found via aria-controls, not position). */
async function panelFor(page: Page, trigger: Locator) {
  const id = await trigger.getAttribute("aria-controls");
  return page.locator(`#${id}`);
}

test.describe("mega menu", () => {
  test.skip(({ isMobile }) => isMobile, "dropdown menus are desktop-only");

  test("opens by keyboard, closes on Escape and returns focus", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "What we do" });
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const panel = await panelFor(page, trigger);
    await expect(panel.getByRole("link", { name: /Cybersecurity/ })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  });

  test("menu links navigate and close the panel", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "What we do" });
    await trigger.click();
    const panel = await panelFor(page, trigger);
    await panel.getByRole("link", { name: /Cloud Solutions/ }).click();
    await expect(page).toHaveURL(/\/cloud$/);
    await expect(panel).toHaveCount(0);
  });

  test("insights menu filters the grid even when already on Insights", async ({ page }) => {
    await page.goto("/insights");
    const trigger = page.getByRole("button", { name: "Insights" });
    await trigger.click();
    await (await panelFor(page, trigger)).getByRole("link", { name: "Cybersecurity" }).click();
    await expect(page).toHaveURL(/category=cybersecurity/);
    await expect(page.locator("main article").filter({ visible: true })).toHaveCount(1);
  });
});

test.describe("site search", () => {
  test("keyboard shortcut opens search, results filter, Enter navigates", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Control+k");
    const dialog = page.getByRole("dialog", { name: "Search" });
    await expect(dialog).toBeVisible();
    const input = dialog.getByRole("combobox");
    await input.fill("migration");
    await expect(dialog.getByRole("option").first()).toContainText("Cloud Migration");
    await input.press("Enter");
    await expect(page).toHaveURL(/\/insights\/cloud-migration-key-considerations$/);
  });

  test("shows a helpful empty state", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Search" }).click();
    await page.getByRole("dialog", { name: "Search" }).getByRole("combobox").fill("zzzz");
    await expect(page.getByText("No results. Try another word.").first()).toBeVisible();
  });
});
