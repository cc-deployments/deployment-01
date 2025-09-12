import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, currency, image, contractAddress, tokenId, mintUrl } = body;

    // Validate required fields
    if (!name || !price || !currency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Creating CDP OnRamp product:', {
      name,
      description,
      price,
      currency,
      image,
      contractAddress,
      tokenId,
      mintUrl
    });

    // Create CDP OnRamp configuration
    const appId = process.env.CDP_PROJECT_ID || '1cceb0e4-e690-40ac-8f3d-7d1f3da1417a';
    const productId = `cdp_${Date.now()}`;
    
    // Build CDP OnRamp URL for NFT purchase
    const onRampConfig = {
      appId,
      targetChainId: '8453', // Base mainnet
      destinationWallets: [{
        address: contractAddress || '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
        blockchains: ['base']
      }],
      defaultExperience: 'buy',
      defaultNetwork: 'base',
      amount: price.toString(),
      currency: 'USD', // Use USD for fiat payments, ETH will be bought
      productName: `${name} NFT`,
      productId
    };

    // Generate OnRamp URL with support for both buying and transferring
    const baseUrl = 'https://pay.coinbase.com/buy/input';
    const params = new URLSearchParams({
      appId: onRampConfig.appId,
      destinationWallets: JSON.stringify(onRampConfig.destinationWallets),
      defaultExperience: 'buy',
      defaultNetwork: 'base',
      // Force ETH as the asset
      asset: 'ETH',
      amount: onRampConfig.amount, // Already in USD
      currency: 'USD', // Use USD for fiat payments
      productName: onRampConfig.productName,
      productId: onRampConfig.productId,
      forceLogin: 'true',
      // Enable both buying and transferring
      paymentMethods: 'card,apple_pay,google_pay,ach,coinbase',
      // Enable transfer from Coinbase
      enableTransfers: 'true',
      theme: 'light',
      // Add context that this is for an NFT purchase
      description: `Purchase ${name} NFT - ${description || 'Digital collectible'}`,
      // Set minimum and maximum amount in USD
      minAmount: price.toString(), // Already in USD
      maxAmount: (price * 1.1).toFixed(2) // Allow slight buffer for gas fees
    });

    const cdpOnRampUrl = `${baseUrl}?${params.toString()}`;
    
    console.log('Generated OnRamp URL:', cdpOnRampUrl);
    console.log('OnRamp parameters:', Object.fromEntries(params.entries()));

    // If mintUrl is provided, we can offer both options
    if (mintUrl) {
      return NextResponse.json({
        success: true,
        productId,
        paymentUrl: cdpOnRampUrl,
        mintUrl, // Keep Manifold URL as backup
        message: 'CDP OnRamp payment created with Manifold fallback',
        type: 'cdp_onramp',
        config: onRampConfig
      });
    }

    return NextResponse.json({
      success: true,
      productId,
      paymentUrl: cdpOnRampUrl,
      message: 'CDP OnRamp payment created',
      type: 'cdp_onramp',
      config: onRampConfig
    });

  } catch (error) {
    console.error('CDP OnRamp integration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
