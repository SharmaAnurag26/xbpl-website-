import { expect, test } from "./fixtures";

test.describe("insights", () => {
  test("lists six articles and filters by category", async ({ page }) => {
    await page.goto("/insights");
    const cards = page.locator("main article");
    await expect(cards).toHaveCount(6);

    await page.getByRole("button", { name: "Cybersecurity" }).click();
    await expect(page.getByRole("button", { name: "Cybersecurity" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page).toHaveURL(/category=cybersecurity/);
    await expect(cards.filter({ visible: true })).toHaveCount(1);
    await expect(page.getByText(/Showing 1 article in Cybersecurity/)).toBeAttached();

    await page.getByRole("button", { name: "All", exact: true }).click();
    await expect(cards.filter({ visible: true })).toHaveCount(6);
    await expect(page).not.toHaveURL(/category=/);
  });

  test("category deep links apply on load", async ({ page }) => {
    await page.goto("/insights?category=enterprise-technology");
    await expect(page.getByRole("button", { name: "Enterprise Technology" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.locator("main article").filter({ visible: true })).toHaveCount(2);
  });

  test("article cards open the article page", async ({ page }) => {
    await page.goto("/insights");
    await page
      .getByRole("link", { name: "5 Key Considerations for a Successful Cloud Migration" })
      .click();
    await expect(page).toHaveURL(/\/insights\/cloud-migration-key-considerations$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Cloud Migration/);
    await expect(page.getByRole("heading", { name: "Related insights" })).toBeVisible();
  });
});
