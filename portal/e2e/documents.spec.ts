import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
  await page.fill('input[name="email"]', "admin@scaleyukti.ai");
  await page.fill('input[name="password"]', "changeme123");
  await page.click('button[type="submit"]');
  await page.waitForURL("**/documents");
});

test("lists all seeded documents grouped by category", async ({ page }) => {
  await expect(page.getByText("17 documents", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Client & Public-Facing" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Internal & Strategy" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Leads & Outreach" })).toBeVisible();
});

test("search narrows the list and updates the count", async ({ page }) => {
  await page.getByPlaceholder("Search documents…").fill("internal pricing");
  await expect(page.getByText("1 of 17 documents")).toBeVisible();
  await expect(page.getByRole("link", { name: /Internal Pricing & Margin Analysis/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Series A Pitch Deck/ })).toBeHidden();
});

test("search with no matches shows the empty state", async ({ page }) => {
  await page.getByPlaceholder("Search documents…").fill("zzz-nomatch");
  await expect(page.getByText(/No documents match/)).toBeVisible();
});

test("opening a document renders its content in the detail page", async ({ page }) => {
  await page.getByRole("link", { name: /Series A Pitch Deck/ }).click();
  await expect(page).toHaveURL(/\/documents\/scaleyukti-series-a-pitch$/);
  await expect(page.getByRole("heading", { name: "Series A Pitch Deck" })).toBeVisible();

  const frame = page.frameLocator("iframe");
  await expect(frame.locator("body")).toContainText("Indian SMEs", { timeout: 10_000 });
});
