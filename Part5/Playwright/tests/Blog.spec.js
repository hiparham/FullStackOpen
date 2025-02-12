import { test, expect, describe, beforeEach } from "@playwright/test";
import { createPost, LoginHelper } from "./Helper";
describe("Blog App", () => {
  beforeEach(async ({ page, request }) => {
    // Emptying the database
    await request.post("/api/reset");
    // Creating A New User
    await request.post("/api/users", {
      data: {
        username: "Blogger",
        name: "Blog Lover",
        password: "professional",
      },
    });
    // Navigating to React App
    await page.goto("/");
  });

  test("Shows Login Form By Default", async ({ page }) => {
    const element = await page.getByText("Please Log In | BlogApp");
    await expect(element).toBeVisible();
  });

  describe("Loggin In", () => {
    test("Failed Login", async ({ page }) => {
      await LoginHelper(page, "Blogger", "Bad Password");
      await expect(page.getByText("Wrong User Or Password")).toBeVisible();
    });

    test("Successful login", async ({ page }) => {
      await LoginHelper(page, "Blogger", "professional");
      await expect(
        page.getByRole("heading").filter({ hasText: "Hello" })
      ).toBeVisible();
    });
  });

  describe("When Logged In", () => {
    beforeEach(async ({ page }) => {
      await LoginHelper(page, "Blogger", "professional");
    });
    test("A New Post Can Be Created", async ({ page }) => {
      await createPost(
        page,
        "Playwright Test",
        "Developer",
        "https://playwright.dev/docs/intro"
      );
      await expect(page.getByText("Playwright Test")).toBeVisible();
    });
  });
});
