import { expect, test } from "./fixtures";

// The server treats submissions faster than 2.5s after page load as bots.
const HUMAN_DELAY = 2700;

test.describe("contact form", () => {
  test("shows accessible errors and focuses the first invalid field", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Submit Enquiry" }).click();

    const name = page.getByRole("textbox", { name: "Name", exact: true });
    await expect(name).toBeFocused();
    await expect(name).toHaveAttribute("aria-invalid", "true");
    await expect(name).toHaveAttribute("aria-describedby", "contact-name-error");
    await expect(page.locator("#contact-name-error")).toHaveText("Please enter your name.");
    await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
    await expect(page.getByText("Please choose an option.")).toBeVisible();
    await expect(page.getByText("Please agree so we can respond to your enquiry.")).toBeVisible();
  });

  test("preselects the interest from the link that brought the visitor", async ({ page }) => {
    await page.goto("/contact?interest=cloud");
    await expect(page.getByLabel("I'm interested in")).toHaveValue("cloud");
  });

  test("course enquiries pre-fill the interest and message", async ({ page }) => {
    await page.goto("/contact?interest=learning&course=Network%20Security");
    await expect(page.getByLabel("I'm interested in")).toHaveValue("learning");
    await expect(page.getByRole("textbox", { name: "Message", exact: true })).toHaveValue(
      /"Network Security" programme/,
    );
  });

  test("rejects an invalid email and phone", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Work Email").fill("not-an-email");
    await page.getByLabel("Phone").fill("abc");
    await page.getByRole("textbox", { name: "Name", exact: true }).click();
    await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
    await expect(page.getByText("Please enter a valid phone number.")).toBeVisible();
  });

  test("submits successfully and announces the result", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("textbox", { name: "Name", exact: true }).fill("Asha Rao");
    await page.getByLabel("Company").fill("Example Industries");
    await page.getByLabel("Work Email").fill("asha@example.com");
    await page.getByLabel("I'm interested in").selectOption("security");
    await page
      .getByRole("textbox", { name: "Message", exact: true })
      .fill("We would like to discuss a security assessment for our cloud estate.");
    await page.getByRole("checkbox").check();
    await page.waitForTimeout(HUMAN_DELAY);
    await page.getByRole("button", { name: "Submit Enquiry" }).click();

    const status = page.getByRole("status");
    await expect(status).toContainText("Thank you");
    await expect(page.getByRole("heading", { name: /Thank you/ })).toBeFocused();
  });

  test("honeypot field is hidden from users and assistive tech", async ({ page }) => {
    await page.goto("/contact");
    const honeypot = page.locator('input[name="website"]');
    await expect(honeypot).toHaveAttribute("tabindex", "-1");
    await expect(honeypot).not.toBeInViewport();
    await expect(page.getByRole("textbox", { name: /leave this field empty/i })).toHaveCount(0);
  });
});

test.describe("newsletter", () => {
  test("validates and subscribes", async ({ page }) => {
    await page.goto("/insights");
    const email = page.getByRole("textbox", { name: "Email address" });
    await email.fill("nope");
    await page.getByRole("button", { name: "Subscribe" }).click();
    await expect(page.locator("#newsletter-error")).toHaveText(
      "Please enter a valid email address.",
    );

    await email.fill("reader@example.com");
    await page.waitForTimeout(HUMAN_DELAY);
    await page.getByRole("button", { name: "Subscribe" }).click();
    await expect(page.getByRole("status")).toContainText("Thanks for subscribing");
  });
});
