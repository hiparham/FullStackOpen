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

    await request.post("/api/users", {
      data: {
        username: "Photographer",
        name: "Other User",
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
    test("Posts Can Be Liked", async ({ page }) => {
      await createPost(
        page,
        "Playwright Test",
        "Developer",
        "https://playwright.dev/docs/intro"
      );
      await page.getByText("Display Info").click();
      await page.getByTestId("likeButton").click();
      await expect(page.getByText("Likes : 1")).toBeVisible();
    });
    test("Users Can Delete their posts", async ({ page }) => {
      await createPost(
        page,
        "Playwright Test",
        "Developer",
        "https://playwright.dev/docs/intro"
      );
      await page.reload();
      await page.getByText("Display Info").click();
      await page.getByText("Delete Post").click();
      await expect(page.getByText("Playwright Test")).not.toBeVisible();
    });
  });
  describe("Loggin Both User Tests", () => {
    test("Create Post", async ({ page }) => {
      await LoginHelper(page, "Photographer", "professional");
      await createPost(
        page,
        "Photographer Writing",
        "Photogenic",
        "unsplash.com"
      );
      await page.getByText("Log Out").click();
      await LoginHelper(page, "Blogger", "professional");
      await page.getByText("Display Info").click();
      await expect(page.getByText("Delete Post")).not.toBeVisible();
    });
  });

  describe("Most Liked Right Order", () => {
    beforeEach(async ({ page }) => {
      await LoginHelper(page, "Blogger", "professional");
      await createPost(page, "First", "123", "2211");
      await createPost(page, "Most Liked", "123", "2211");
      const buttons = await page.locator(".info").all();
      await buttons[1].click();
      await page.getByTestId("likeButton").click();
      await page.getByText("Likes : 1").waitFor("attached");
    });
    test("Right Order based on likes", async ({ page }) => {
      await page.reload();
      const title = await page.locator(".title").first();
      await expect(title).toHaveText("Most Liked");
    });
  });
});
