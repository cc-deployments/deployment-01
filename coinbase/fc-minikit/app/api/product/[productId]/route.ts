import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

const products = {
  'summertime-blues': {
    id: 'summertime-blues',
    name: 'Summertime Blues NFT',
    price: '0.001',
    currency: 'ETH',
    description: 'A legendary automotive NFT featuring classic summer vibes and car culture nostalgia.',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '1',
    imageUrl: '/carmania-gallery-hero.png',
    mintUrl: 'https://manifold.xyz/@carculture/id/4144040176'
  },
  'woodie-wagon': {
    id: 'woodie-wagon',
    name: 'Woodie Wagon NFT',
    price: '0.002',
    currency: 'ETH',
    description: 'An exclusive Woodie Wagon design celebrating surf culture and automotive heritage.',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '2',
    imageUrl: '/carmania-gallery-hero-2.png',
    mintUrl: 'https://manifold.xyz/@carculture/id/4149840112'
  },
  'premium-collector': {
    id: 'premium-collector',
    name: 'Premium Collector NFT',
    price: '0.005',
    currency: 'ETH',
    description: 'The ultimate collector piece featuring rare automotive art with exclusive benefits.',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '3',
    imageUrl: '/carmania-gallery-hero.png',
    mintUrl: 'https://manifold.xyz/@carculture/id/4169097456'
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  
  try {
    const product = products[productId as keyof typeof products];
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if payment is provided in headers
    const paymentHeader = request.headers.get('X-PAYMENT');
    
    if (!paymentHeader) {
      // Return 402 Payment Required with payment details
      return NextResponse.json(
        {
          amount: '0.001', // 0.001 USDC for product details
          recipient: '0x048a22DAB92f2c1e7Deb3847Ca151B888aAbOF1C', // Your CarCulture wallet
          reference: `product-${productId}-${Date.now()}`,
          currency: 'USDC',
          description: `Product details for ${product.name}`,
          product: {
            id: product.id,
            name: product.name,
            price: product.price,
            currency: product.currency
          }
        },
        { status: 402 }
      );
    }

    // Verify payment (in production, you'd verify the payment on-chain)
    console.log('💰 Payment received for product:', productId, paymentHeader);
    
    // Return the full product data
    return NextResponse.json(product, {
      headers: {
        'X-PAYMENT-RESPONSE': 'verified',
        'X-PAYMENT-AMOUNT': '0.001',
        'X-PAYMENT-CURRENCY': 'USDC'
      }
    });

  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product data' },
      { status: 500 }
    );
  }
}

