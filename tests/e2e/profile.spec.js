import { test, expect } from "@playwright/test";

test.describe("Profile Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    const token = "your_actual_auth_token";
    const userId = "your_actual_user_id";

    await page.goto("http://localhost:5173/profile");
    await page.evaluate(
      ([token, userId]) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
      },
      [token, userId]
    );

    await page.goto("http://localhost:5173/profile");
  });
});
