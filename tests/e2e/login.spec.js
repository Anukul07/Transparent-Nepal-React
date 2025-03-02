import { expect, test } from "@playwright/test";

test.describe("Login Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.route(
      "http://localhost:3002/api/v1/users/login",
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            status: "success",
            token: "fake-token",
            userId: "12345",
            role: "user",
          }),
        });
      }
    );

    await page.goto("http://localhost:5173/");
  });

  test("Should render login page correctly", async ({ page }) => {
    await expect(
      page.locator("text=Create an account or Sign in")
    ).toBeVisible();
    await expect(page.locator("label:text('Email') + input")).toBeVisible();
    await expect(page.locator("label:text('Password') + input")).toBeVisible();
    await expect(page.locator("button", { hasText: "Log In" })).toBeVisible();
  });

  test("Should render social login buttons and allow clicking", async ({
    page,
  }) => {
    const facebookButton = page.locator(
      "button:has-text('Login with Facebook')"
    );
    const googleButton = page.locator("button:has-text('Login with Google')");

    await expect(facebookButton).toBeVisible();
    await expect(googleButton).toBeVisible();

    await facebookButton.click();
    await googleButton.click();
  });

  test("Should show error on invalid credentials", async ({ page }) => {
    await page.route(
      "http://localhost:3002/api/v1/users/login",
      async (route) => {
        await route.fulfill({
          status: 401,
          contentType: "application/json",
          body: JSON.stringify({ message: "Login failed. Please try again." }),
        });
      }
    );

    await page
      .locator("label:text('Email') + input")
      .fill("invalid@example.com");
    await page.locator("label:text('Password') + input").fill("wrongpassword");
    await page.click("button:has-text('Log In')");

    await expect(
      page.locator("text=Login failed. Please try again.")
    ).toBeVisible();
  });

  test("Should login successfully with valid credentials", async ({ page }) => {
    await page.locator("label:text('Email') + input").fill("test@example.com");
    await page.locator("label:text('Password') + input").fill("password123");

    const [response] = await Promise.all([
      page.waitForResponse("http://localhost:3002/api/v1/users/login"),
      page.click("button:has-text('Log In')"),
    ]);

    const responseBody = await response.json();
    console.log("Mock API Response:", responseBody);
    expect(responseBody).toHaveProperty("token");

    const storedToken = await page.evaluate(() =>
      localStorage.getItem("token")
    );
    expect(storedToken).toBe("fake-token");
  });
});
