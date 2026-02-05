import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the main heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /saas template/i })).toBeVisible();
  });

  test('should display getting started section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /getting started/i })).toBeVisible();
  });

  test('should display test commands section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /test commands/i })).toBeVisible();
  });

  test('should have proper page title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/saas template/i);
  });
});

test.describe('Navigation', () => {
  test('should load without errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(errors).toHaveLength(0);
  });
});

test.describe('Responsive Design', () => {
  test('should be readable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should be readable on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should be readable on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    const main = page.locator('main');
    await expect(main).toBeVisible();
  });
});
