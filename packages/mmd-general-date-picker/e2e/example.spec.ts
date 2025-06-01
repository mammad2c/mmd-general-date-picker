import { test, expect } from "@playwright/test";

// Extend the Window interface to include MmdGeneralDatePicker
declare global {
  interface Window {
    MmdGeneralDatePicker: typeof import("../src/index").default;
  }
}

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000");

  page.evaluate(() => {
    new window.MmdGeneralDatePicker({
      element: "#app",
    });
  });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/E2E Test Environment/);
});
