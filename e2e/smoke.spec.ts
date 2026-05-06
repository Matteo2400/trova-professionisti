import { test, expect } from '@playwright/test';

test.describe('Public site smoke tests', () => {
  test('homepage loads with hero and search bar', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/TrovaPro/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('search page returns results from DB', async ({ page }) => {
    await page.goto('/cerca');
    await expect(page.locator('text=professionisti trovati')).toBeVisible();
  });

  test('professional profile page loads', async ({ page }) => {
    await page.goto('/cerca');
    const firstCard = page.locator('a[href^="/professionista/"]').first();
    await firstCard.waitFor({ state: 'visible' });
    await firstCard.click();
    await expect(page.url()).toMatch(/\/professionista\//);
  });

  test('login page loads', async ({ page }) => {
    await page.goto('/auth/login');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('registration role selector works', async ({ page }) => {
    await page.goto('/auth/registrazione');
    await expect(page.getByText('Sono un cliente')).toBeVisible();
    await expect(page.getByText('Sono un professionista')).toBeVisible();
  });

  test('protected dashboard redirects to login', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForURL(/\/auth\/login/);
    expect(page.url()).toContain('/auth/login');
  });

  test('protected admin redirects to login', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForURL(/\/auth\/login/);
    expect(page.url()).toContain('/auth/login');
  });
});

test.describe('Authentication', () => {
  test('login with seeded admin succeeds', async ({ page }) => {
    await page.goto('/auth/login');
    await page.locator('input[type="email"]').fill('admin@trovapro.it');
    await page.locator('input[type="password"]').fill('admin123!');
    await page.getByRole('button', { name: /accedi/i }).click();
    await page.waitForURL(/\/admin/, { timeout: 10_000 });
    expect(page.url()).toContain('/admin');
  });

  test('login with wrong password shows error', async ({ page }) => {
    await page.goto('/auth/login');
    await page.locator('input[type="email"]').fill('admin@trovapro.it');
    await page.locator('input[type="password"]').fill('wrong-password');
    await page.getByRole('button', { name: /accedi/i }).click();
    await expect(page.getByText(/non corretti/i)).toBeVisible();
  });
});
