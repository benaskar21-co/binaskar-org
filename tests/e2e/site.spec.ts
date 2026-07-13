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
      .getByLabel("التنقل الرئيسي")
      .getByRole("link", { name: "الخدمات" })
      .click();
    await expect(page).toHaveURL(/\/ar#services/);
    await expect(page.locator("#services")).toBeVisible();
  });

  test("contact button reveals form", async ({ page }) => {
    await page.goto("/ar");
    await page
      .getByRole("link", { name: "ناقش التحدّي" })
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
    await page.getByRole("button", { name: "Send the context" }).click();
    await expect(page.getByRole("alert").first()).toBeVisible();
  });

  test("shows success after the inquiry API accepts the submission", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });
    await page.goto("/en#contact");
    await page.getByLabel("Name").fill("Test User");
    await page.getByLabel("Email").fill("test@example.com");
    await page
      .getByLabel("What decision or challenge are you working through?")
      .fill("This is a test inquiry message.");
    await page.getByRole("button", { name: "Send the context" }).click();
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
    await page.getByRole("button", { name: "فتح القائمة" }).click();
    await expect(page.getByLabel("التنقل للجوال")).toBeVisible();
    await expect(page.getByLabel("التنقل للجوال").getByRole("link", { name: "الخدمات" })).toBeVisible();
  });

  test("no horizontal overflow on a small phone or landscape", async ({ page }) => {
    for (const viewport of [
      { width: 375, height: 812 },
      { width: 844, height: 390 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/ar");
      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
    }
  });

  test("mobile menu closes with Escape", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/ar");
    await page.getByRole("button", { name: "فتح القائمة" }).click();
    await page.keyboard.press("Escape");
    await expect(page.getByLabel("التنقل للجوال")).toBeHidden();
  });
});

test.describe("Legacy routes", () => {
  test("redirects /en/contact to contact section", async ({ page }) => {
    await page.goto("/en/contact");
    await expect(page).toHaveURL(/\/en#contact/);
  });
});
