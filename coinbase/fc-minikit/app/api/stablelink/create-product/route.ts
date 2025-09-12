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

    // Create CDP OnRamp configuration using manual URL construction
    const projectId = process.env.CDP_PROJECT_ID || '1cceb0e4-e690-40ac-8f3d-7d1f3da1417a';
    const productId = `cdp_${Date.now()}`;
    
    // Build OnRamp URL with correct parameters to bypass asset selection
    const baseUrl = 'https://pay.coinbase.com/buy/input';
    const params = new URLSearchParams({
      appId: projectId,
      destinationWallets: JSON.stringify([{
        address: contractAddress || '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
        blockchains: ['base']
      }]),
      defaultExperience: 'buy',
      defaultNetwork: 'base',
      // Key parameters to bypass asset selection
      assets: 'ETH', // Restrict to only ETH
      defaultAsset: 'ETH', // Pre-select ETH
      presetFiatAmount: price.toString(), // Set the USD amount
      fiatCurrency: 'USD',
      productName: `${name} NFT`,
      productId,
      forceLogin: 'true',
      paymentMethods: 'card,apple_pay,google_pay,ach,coinbase',
      enableTransfers: 'true',
      theme: 'light',
      description: `Purchase ${name} NFT - ${description || 'Digital collectible'}`,
      minAmount: price.toString(),
      maxAmount: (price * 1.1).toFixed(2)
    });

    const cdpOnRampUrl = `${baseUrl}?${params.toString()}`;
    
    console.log('Generated OnRamp URL (manual construction):', cdpOnRampUrl);
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
        config: {
          projectId,
          destinationWallets: [{
            address: contractAddress || '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
            blockchains: ['base']
          }],
          assets: 'ETH',
          defaultAsset: 'ETH',
          defaultNetwork: 'base',
          presetFiatAmount: price,
          fiatCurrency: 'USD'
        }
      });
    }

    return NextResponse.json({
      success: true,
      productId,
      paymentUrl: cdpOnRampUrl,
      message: 'CDP OnRamp payment created',
      type: 'cdp_onramp',
      config: {
        projectId,
        destinationWallets: [{
          address: contractAddress || '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
          blockchains: ['base']
        }],
        assets: 'ETH',
        defaultAsset: 'ETH',
        defaultNetwork: 'base',
        presetFiatAmount: price,
        fiatCurrency: 'USD'
      }
    });

  } catch (error) {
    console.error('CDP OnRamp integration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
