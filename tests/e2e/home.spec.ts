import { expect, test } from "@playwright/test";

test("home page responds and sets the expected title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/art\.sumitsute/i);
  await expect(page.locator("body")).toBeVisible();
});
