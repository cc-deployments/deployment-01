import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, currency, image, metadata } = body;

    // Validate required fields
    if (!name || !description || !price || !currency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Mock StableLink API integration (replace with real API when available)
    console.log('Creating product with StableLink:', {
      name,
      description,
      price,
      currency,
      image,
      metadata
    });

    // Simulate API response
    const stableLinkData = {
      id: `prod_${Date.now()}`,
      payment_url: `https://checkout.stablelink.io/pay/${Date.now()}?amount=${price}&currency=${currency}&name=${encodeURIComponent(name)}`
    };

    return NextResponse.json({
      success: true,
      productId: stableLinkData.id,
      paymentUrl: stableLinkData.payment_url,
      message: 'Product created successfully'
    });

  } catch (error) {
    console.error('StableLink integration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
