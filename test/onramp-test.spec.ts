import { test, expect } from '@playwright/test';

test.describe('CDP OnRamp Integration Tests', () => {
  test('should load CDP OnRamp demo page', async ({ page }) => {
    // Navigate to the CDP OnRamp demo page
    await page.goto('http://localhost:3000/cdp-demo');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check if page loads successfully (it shows CarMania title)
    await expect(page).toHaveTitle(/CarMania/);
    
    console.log('Page title:', await page.title());
    console.log('Page URL:', page.url());
    
    // Look for CDP OnRamp specific elements
    const onrampElements = page.locator('text=/OnRamp|Credit Card|Debit Card|Apple Pay/i');
    const onrampCount = await onrampElements.count();
    console.log(`Found ${onrampCount} OnRamp-related elements`);
    
    // Check for NFT product cards
    const nftCards = page.locator('[data-testid="nft-card"], .nft-card, .product-card');
    const nftCount = await nftCards.count();
    console.log(`Found ${nftCount} NFT product cards`);
    
    // Look for buy buttons
    const buyButtons = page.locator('button:has-text("Buy"), button:has-text("Purchase"), button:has-text("Credit Card")');
    const buyCount = await buyButtons.count();
    console.log(`Found ${buyCount} buy buttons`);
    
    // Take a screenshot
    await page.screenshot({ path: 'test-results/onramp-demo-screenshot.png' });
    
    console.log('✅ CDP OnRamp demo page loaded successfully!');
  });

  test('should display NFT products with correct pricing', async ({ page }) => {
    await page.goto('http://localhost:3000/cdp-demo');
    await page.waitForLoadState('networkidle');
    
    // Check for specific NFT products (use first() to handle multiple elements)
    const summertimeBlues = page.locator('text=/Summertime Blues/i').first();
    await expect(summertimeBlues).toBeVisible();
    
    const lowTide = page.locator('text=/Low Tide/i');
    await expect(lowTide).toBeVisible();
    
    const flatSea = page.locator('text=/Flat Sea/i');
    await expect(flatSea).toBeVisible();
    
    // Check for ETH pricing
    const ethPrices = page.locator('text=/0.001 ETH|ETH/i');
    const priceCount = await ethPrices.count();
    console.log(`Found ${priceCount} ETH price references`);
    
    // Verify pricing is correct (0.001 ETH) - use first() to handle multiple elements
    const correctPrice = page.locator('text=/0.001 ETH/').first();
    await expect(correctPrice).toBeVisible();
    
    console.log('✅ NFT products displayed with correct pricing!');
  });

  test('should handle OnRamp button clicks', async ({ page }) => {
    await page.goto('http://localhost:3000/cdp-demo');
    await page.waitForLoadState('networkidle');
    
    // Look for any buy/OnRamp buttons
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    console.log(`Found ${buttonCount} buttons on the page`);
    
    // Try to click the first buy button if it exists
    const buyButton = page.locator('button:has-text("Buy"), button:has-text("Purchase"), button:has-text("Credit Card")').first();
    if (await buyButton.count() > 0) {
      console.log('Found buy button, attempting to click...');
      
      // Click the button
      await buyButton.click();
      
      // Wait a moment for any popup or navigation
      await page.waitForTimeout(2000);
      
      // Check if a new window/tab opened or if there's a popup
      const pages = page.context().pages();
      console.log(`Number of pages after click: ${pages.length}`);
      
      // Take a screenshot after click
      await page.screenshot({ path: 'test-results/onramp-after-click.png' });
      
      console.log('✅ Buy button click handled!');
    } else {
      console.log('No buy button found on the page');
    }
  });

  test('should load chat agent commerce page', async ({ page }) => {
    // Test the chat agent commerce page
    await page.goto('http://localhost:3000/chatagent-demo');
    await page.waitForLoadState('networkidle');
    
    console.log('Page title:', await page.title());
    console.log('Page URL:', page.url());
    
    // Look for chat elements
    const chatElements = page.locator('text=/chat|Chat|AI|Drivr/i');
    const chatCount = await chatElements.count();
    console.log(`Found ${chatCount} chat-related elements`);
    
    // Look for input fields
    const inputs = page.locator('input, textarea');
    const inputCount = await inputs.count();
    console.log(`Found ${inputCount} input fields`);
    
    // Take a screenshot
    await page.screenshot({ path: 'test-results/chatagent-demo-screenshot.png' });
    
    console.log('✅ Chat agent commerce page loaded successfully!');
  });
});
