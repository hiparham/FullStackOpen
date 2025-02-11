import { test, expect } from "@playwright/test";
test("API", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  const element = await page.getByText("Please Log In | BlogApp");
  await expect(element).toBeVisible();
});
