import { test, expect } from '@playwright/test';
import { OnchainTestKit } from '@coinbase/onchaintestkit';

test.describe('CarMania MiniApp Tests', () => {
  let onchainTestKit: OnchainTestKit;

  test.beforeEach(async ({ page }) => {
    // Initialize OnchainTestKit with Base Sepolia
    onchainTestKit = await OnchainTestKit.create({
      chain: 'base-sepolia',
      rpcUrl: 'https://sepolia.base.org',
      page,
    });

    // Navigate to your MiniApp
    await page.goto('http://localhost:3000');
  });

  test('should load MiniApp successfully', async ({ page }) => {
    // Check if the page loads without errors
    await expect(page).toHaveTitle(/CarMania/);
    
    // Check for key elements
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should connect wallet successfully', async ({ page }) => {
    // Click connect wallet button
    const connectButton = page.locator('button:has-text("Connect")');
    await connectButton.click();

    // Wait for wallet connection
    await onchainTestKit.connectWallet();
    
    // Verify connection
    await expect(page.locator('text=Connected')).toBeVisible();
  });

  test('should display NFT gallery', async ({ page }) => {
    // Connect wallet first
    await onchainTestKit.connectWallet();
    
    // Check for NFT gallery elements
    await expect(page.locator('[data-testid="nft-gallery"]')).toBeVisible();
    await expect(page.locator('[data-testid="nft-card"]')).toHaveCount(3); // Your 3 NFTs
  });

  test('should handle CDP OnRamp integration', async ({ page }) => {
    // Connect wallet
    await onchainTestKit.connectWallet();
    
    // Click on an NFT to view details
    await page.locator('[data-testid="nft-card"]').first().click();
    
    // Check for buy button
    await expect(page.locator('button:has-text("Buy with Credit Card")')).toBeVisible();
  });

  test.afterEach(async () => {
    // Clean up
    if (onchainTestKit) {
      await onchainTestKit.cleanup();
    }
  });
});

