import { test, expect } from '@playwright/test';

test('basic test - should load localhost', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Check if page loads
  await expect(page).toHaveTitle(/CarMania|Next.js/);
  
  console.log('Page title:', await page.title());
  console.log('Page URL:', page.url());
});
