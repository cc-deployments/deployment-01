import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  
  try {
    // Check if payment is provided in headers
    const paymentHeader = request.headers.get('X-PAYMENT');
    
    if (!paymentHeader) {
      // Return 402 Payment Required with payment details
      return NextResponse.json(
        {
          amount: '0.001', // 0.001 USDC for floor price data
          recipient: '0x048a22DAB92f2c1e7Deb3847Ca151B888aAbOF1C', // Your CarCulture wallet
          reference: `floor-price-${collection}-${Date.now()}`,
          currency: 'USDC',
          description: `Floor price data for ${collection} collection`
        },
        { status: 402 }
      );
    }

    // Verify payment (in production, you'd verify the payment on-chain)
    // For now, we'll simulate successful payment verification
    console.log('💰 Payment received:', paymentHeader);
    
    // Return the requested data
    const floorPriceData = {
      collection: collection,
      floorPrice: '0.05', // Example floor price in ETH
      currency: 'ETH',
      lastUpdated: new Date().toISOString(),
      volume24h: '12.5',
      totalSupply: '10000',
      holders: '8500'
    };

    return NextResponse.json(floorPriceData, {
      headers: {
        'X-PAYMENT-RESPONSE': 'verified',
        'X-PAYMENT-AMOUNT': '0.001',
        'X-PAYMENT-CURRENCY': 'USDC'
      }
    });

  } catch (error) {
    console.error('Error fetching floor price:', error);
    return NextResponse.json(
      { error: 'Failed to fetch floor price data' },
      { status: 500 }
    );
  }
}
