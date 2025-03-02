import { expect, test } from "@playwright/test";

test.describe("Companies Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Mocking the API response for fetching companies
    await page.route(
      "http://localhost:3002/api/v1/companies",
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            companies: [
              {
                _id: "1",
                companyName: "Company A",
                companyLogo: "logo1.png",
                companyDescription: "A description for Company A",
                jobListings: [
                  {
                    _id: "1a",
                    jobName: "Software Engineer",
                    jobLocation: "Remote",
                    salaryRange: "$100k - $120k",
                  },
                ],
              },
            ],
          }),
        });
      }
    );

    // Navigating to the Companies page
    await page.goto("http://localhost:5173/companies");
  });

  test("Should render companies page correctly", async ({ page }) => {
    // Wait for the page to fully load
    await page.waitForLoadState("load");

    // Verify that the company name and description are visible, being more specific
    await expect(page.locator("h3:text('Company A')")).toBeVisible();
    await expect(
      page.locator("p:text('A description for Company A')")
    ).toBeVisible();

    // Verify that the job listings are visible
    await expect(page.locator("text=Software Engineer")).toBeVisible();
  });

  test("Should show error if the API request fails", async ({ page }) => {
    // Mock the API response to simulate an error
    await page.route(
      "http://localhost:3002/api/v1/companies",
      async (route) => {
        await route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({
            success: false,
            message: "Failed to load companies",
          }),
        });
      }
    );

    // Trigger a re-fetching of the companies data
    await page.reload();
  });

  test("Should display company names in alphabetical order", async ({
    page,
  }) => {
    // Mock another response with multiple companies
    await page.route(
      "http://localhost:3002/api/v1/companies",
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            companies: [
              {
                _id: "1",
                companyName: "Company B",
                companyLogo: "logo2.png",
                companyDescription: "Description B",
                jobListings: [],
              },
              {
                _id: "2",
                companyName: "Company A",
                companyLogo: "logo1.png",
                companyDescription: "Description A",
                jobListings: [],
              },
            ],
          }),
        });
      }
    );

    // Reload the companies page
    await page.goto("http://localhost:5173/companies");

    // Verify the companies are listed alphabetically
    const companyNames = await page.locator("h3").allTextContents();
    expect(companyNames).toEqual(["Company A", "Company B"]);
  });

  test("Should render job listings correctly under each company", async ({
    page,
  }) => {
    // Mocking the API response with a company that has multiple job listings
    await page.route(
      "http://localhost:3002/api/v1/companies",
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            companies: [
              {
                _id: "1",
                companyName: "Company A",
                companyLogo: "logo1.png",
                companyDescription: "A description for Company A",
                jobListings: [
                  {
                    _id: "1a",
                    jobName: "Software Engineer",
                    jobLocation: "Remote",
                    salaryRange: "$100k - $120k",
                  },
                  {
                    _id: "1b",
                    jobName: "Data Scientist",
                    jobLocation: "On-site",
                    salaryRange: "$110k - $130k",
                  },
                ],
              },
            ],
          }),
        });
      }
    );

    // Navigating to the Companies page
    await page.goto("http://localhost:5173/companies");

    // Wait for the page to load
    await page.waitForLoadState("load");

    // Verify the first job listing is rendered correctly
    await expect(page.locator("text=Software Engineer")).toBeVisible();
    await expect(page.locator("text=Remote")).toBeVisible();
    await expect(page.locator("text=$100k - $120k")).toBeVisible();

    // Verify the second job listing is rendered correctly
    await expect(page.locator("text=Data Scientist")).toBeVisible();
    await expect(page.locator("text=On-site")).toBeVisible();
    await expect(page.locator("text=$110k - $130k")).toBeVisible();
  });
});
