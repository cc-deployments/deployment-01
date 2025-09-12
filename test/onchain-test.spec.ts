import { test, expect } from '@playwright/test';

test('OnchainTestKit test - should load MiniApp', async ({ page }) => {
  // Navigate to your MiniApp
  await page.goto('http://localhost:3000');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Check if page loads successfully
  await expect(page).toHaveTitle(/CarMania/);
  
  // Check for key elements on the page
  const body = page.locator('body');
  await expect(body).toBeVisible();
  
  // Look for any buttons or interactive elements
  const buttons = page.locator('button');
  const buttonCount = await buttons.count();
  console.log(`Found ${buttonCount} buttons on the page`);
  
  // Check if there are any wallet-related elements
  const walletElements = page.locator('text=/connect|wallet|Connect/i');
  const walletCount = await walletElements.count();
  console.log(`Found ${walletCount} wallet-related elements`);
  
  // Take a screenshot for debugging
  await page.screenshot({ path: 'test-results/miniapp-screenshot.png' });
  
  console.log('✅ MiniApp loaded successfully!');
});



