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

    console.log('Creating product with CDP integration:', {
      name,
      description,
      price,
      currency,
      image,
      contractAddress,
      tokenId,
      mintUrl
    });

    // For now, redirect directly to the mint URL since we have the actual Manifold URLs
    // This provides immediate functionality while we build out the full CDP integration
    if (mintUrl) {
      return NextResponse.json({
        success: true,
        productId: `cdp_${Date.now()}`,
        paymentUrl: mintUrl, // Direct to Manifold mint URL
        message: 'Redirecting to mint page',
        type: 'direct_mint'
      });
    }

    // Fallback: Create a CDP checkout URL (this would need real CDP integration)
    const cdpCheckoutUrl = `https://commerce.coinbase.com/checkout/${contractAddress || 'default'}?amount=${price}&currency=${currency}&name=${encodeURIComponent(name)}`;
    
    return NextResponse.json({
      success: true,
      productId: `cdp_${Date.now()}`,
      paymentUrl: cdpCheckoutUrl,
      message: 'CDP checkout created',
      type: 'cdp_checkout'
    });

  } catch (error) {
    console.error('CDP integration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
