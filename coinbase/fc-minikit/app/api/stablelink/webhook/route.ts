import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, data } = body;

    console.log('StableLink webhook received:', { event, data });

    // Handle different webhook events
    switch (event) {
      case 'payment.completed':
        await handlePaymentCompleted(data);
        break;
      case 'payment.failed':
        await handlePaymentFailed(data);
        break;
      case 'payment.cancelled':
        await handlePaymentCancelled(data);
        break;
      default:
        console.log('Unhandled webhook event:', event);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handlePaymentCompleted(data: any) {
  console.log('Payment completed:', data);
  
  // Here you would:
  // 1. Mint the NFT to the buyer's wallet
  // 2. Send confirmation email
  // 3. Update your database
  // 4. Notify the DRIVR agent
  
  // For now, just log the successful payment
  console.log('NFT should be minted to:', data.customer.wallet_address);
  console.log('Product metadata:', data.product.metadata);
}

async function handlePaymentFailed(data: any) {
  console.log('Payment failed:', data);
  // Handle failed payment (maybe send notification, retry logic, etc.)
}

async function handlePaymentCancelled(data: any) {
  console.log('Payment cancelled:', data);
  // Handle cancelled payment
}


