import { test, expect } from "@playwright/test";

test("documents list redirects an unauthenticated visitor to login", async ({ page }) => {
  await page.goto("/documents");
  await expect(page).toHaveURL(/\/login$/);
});

test("a document detail page redirects an unauthenticated visitor to login", async ({ page }) => {
  await page.goto("/documents/dishant-pricing-internal");
  await expect(page).toHaveURL(/\/login$/);
});

test("an unknown document slug redirects to login before revealing a 404", async ({ page }) => {
  await page.goto("/documents/this-slug-does-not-exist");
  await expect(page).toHaveURL(/\/login$/);
});

test("wrong password shows an error and does not sign in", async ({ page }) => {
  await page.goto("/login");
  await page.fill('input[name="email"]', "admin@scaleyukti.ai");
  await page.fill('input[name="password"]', "wrong-password");
  await page.click('button[type="submit"]');
  await expect(page.getByText("Invalid email or password.")).toBeVisible();
  await expect(page).toHaveURL(/\/login$/);
});

test("the seeded admin can sign in and reach the document list", async ({ page }) => {
  await page.goto("/login");
  await page.fill('input[name="email"]', "admin@scaleyukti.ai");
  await page.fill('input[name="password"]', "changeme123");
  await page.click('button[type="submit"]');
  await page.waitForURL("**/documents");
  await expect(page.getByRole("heading", { name: "Documents & Reports" })).toBeVisible();
});
