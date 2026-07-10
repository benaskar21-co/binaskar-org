import { test, expect } from "@playwright/test";

test.describe("Arabic single page", () => {
  test("home page loads with RTL", async ({ page }) => {
    await page.goto("/ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("navigates to services section", async ({ page }) => {
    await page.goto("/ar");
    await page
      .getByLabel("Main navigation")
      .getByRole("link", { name: "الخدمات" })
      .click();
    await expect(page).toHaveURL(/\/ar#services/);
    await expect(page.locator("#services")).toBeVisible();
  });

  test("contact button reveals form", async ({ page }) => {
    await page.goto("/ar");
    await page
      .getByRole("link", { name: "تواصل معنا" })
      .last()
      .click();
    await expect(page).toHaveURL(/\/ar#contact/);
    await expect(page.getByLabel("الاسم")).toBeVisible();
  });
});

test.describe("English single page", () => {
  test("home page loads with LTR", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("language switcher preserves hash", async ({ page }) => {
    await page.goto("/en#services");
    await page
      .getByLabel("Language switcher")
      .getByRole("button", { name: "ar", exact: true })
      .click();
    await expect(page).toHaveURL(/\/ar#services/);
  });
});

test.describe("Contact form", () => {
  test("shows validation on empty submit", async ({ page }) => {
    await page.goto("/en#contact");
    await page.getByRole("button", { name: "Send" }).click();
    await expect(page.getByRole("alert").first()).toBeVisible();
  });

  test("submits successfully in dev mode", async ({ page }) => {
    await page.goto("/en#contact");
    await page.getByLabel("Name").fill("Test User");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Your message").fill("This is a test inquiry message.");
    await page.getByRole("button", { name: "Send" }).click();
    await expect(page.getByRole("status")).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Layout", () => {
  test("no horizontal overflow on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/ar");
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });

  test("mobile menu opens", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/ar");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByLabel("Mobile navigation")).toBeVisible();
    await expect(page.getByLabel("Mobile navigation").getByRole("link", { name: "الخدمات" })).toBeVisible();
  });
});

test.describe("Legacy routes", () => {
  test("redirects /en/contact to contact section", async ({ page }) => {
    await page.goto("/en/contact");
    await expect(page).toHaveURL(/\/en#contact/);
  });
});
