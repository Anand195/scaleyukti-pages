import { test, expect } from "@playwright/test";

test("homepage shows the value proposition and service lines", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("AI systems that ship");
  await expect(page.getByRole("heading", { name: "AI Agent Development" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Document Intelligence" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "AI Skills Training" })).toBeVisible();
});

test("team login link goes to the login page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Team login" }).click();
  await expect(page).toHaveURL(/\/login$/);
});
