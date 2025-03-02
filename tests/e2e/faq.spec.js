// faq.spec.js
import { test, expect } from "@playwright/test";

test.describe("FAQ Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/faq");
  });

  test("should display all FAQ questions", async ({ page }) => {
    const questions = await page
      .locator("h3.text-xl.font-bold")
      .allTextContents();
    expect(questions.length).toBeGreaterThan(0);
    expect(questions).toContain("What is TransparentNepal?");
    expect(questions).toContain(
      "How can I apply for a job on TransparentNepal?"
    );
    expect(questions).toContain("How can I contact TransparentNepal support?");
    expect(questions).toContain("How do I create a TransparentNepal profile?");
  });

  test("should display answers for each FAQ question", async ({ page }) => {
    const answers = await page
      .locator("p.text-gray-700.text-sm")
      .allTextContents();
    expect(answers.length).toBeGreaterThan(0);
    expect(answers[0]).toContain(
      "TransparentNepal is a platform that allows users to review companies"
    );
    expect(answers[1]).toContain(
      "To apply for a job on TransparentNepal, create a profile"
    );
    expect(answers[9]).toContain(
      "You can contact TransparentNepal support by visiting the 'Help Center' on their website"
    );
    expect(answers[11]).toContain(
      "To create a TransparentNepal profile, simply sign up with your email or through social media accounts."
    );
  });

  test("should have clickable FAQ items", async ({ page }) => {
    const faqItems = await page
      .locator("div.bg-\\[\\#f1f1f0\\].p-6.rounded-xl")
      .all();
    expect(faqItems.length).toBeGreaterThan(0);

    for (const item of faqItems) {
      await expect(item).toBeVisible();
    }
  });

  test("should have a scrollable FAQ section", async ({ page }) => {
    const faqContainer = await page.locator("div.w-\\[80\\%\\]").first();
    await expect(faqContainer).toBeVisible();

    // Scroll to the bottom and check if the last FAQ item is visible
    await faqContainer.evaluate((node) => (node.scrollTop = node.scrollHeight));
    const lastFaqItem = await page
      .locator("div.bg-\\[\\#f1f1f0\\].p-6.rounded-xl")
      .last();
    await expect(lastFaqItem).toBeVisible();
  });
});
