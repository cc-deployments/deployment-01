import { NextRequest, NextResponse } from 'next/server';
import { paymentMiddleware } from 'x402-express';

// Testnet configuration for safe testing
const testnetConfig = {
  url: "https://x402.org/facilitator"
};

// Your receiving wallet address (replace with your actual address)
const RECEIVING_ADDRESS = "0xYourWalletAddress"; // TODO: Replace with actual address

// Configure protected endpoints
const protectedRoutes = {
  "GET /api/x402-test": {
    price: "$0.001", // 0.001 USDC
    network: "base-sepolia", // testnet
    config: {
      description: "Test x402 payment endpoint for CarCulture premium content",
      inputSchema: {
        type: "object",
        properties: {
          content: { 
            type: "string", 
            description: "Type of content requested (e.g., 'nft-data', 'market-analysis')" 
          }
        }
      },
      outputSchema: {
        type: "object",
        properties: {
          data: { type: "string", description: "Premium CarCulture content" },
          timestamp: { type: "string", description: "Content timestamp" },
          paymentVerified: { type: "boolean", description: "Payment verification status" }
        }
      }
    }
  }
};

// Create payment middleware
const middleware = paymentMiddleware(
  RECEIVING_ADDRESS,
  protectedRoutes,
  testnetConfig
);

export async function GET(request: NextRequest) {
  try {
    // Check if payment header exists
    const paymentHeader = request.headers.get('X-PAYMENT');
    
    if (!paymentHeader) {
      // Return 402 Payment Required with x402 format
      return NextResponse.json(
        {
          error: "Payment Required",
          message: "This endpoint requires x402 payment",
          payment: {
            amount: "0.001",
            currency: "USDC",
            network: "base-sepolia",
            payTo: RECEIVING_ADDRESS,
            facilitator: "https://x402.org/facilitator"
          }
        },
        { status: 402 }
      );
    }

    // If payment header exists, verify and return content
    // In a real implementation, you would verify the payment with the facilitator
    const content = {
      data: "🎉 Payment successful! This is premium CarCulture content:\n\n🚗 **Latest NFT Collection Data**\n• Floor Price: 0.05 ETH\n• Volume (24h): 2.3 ETH\n• Holders: 287\n• Listed: 45\n\n📊 **Market Analysis**\n• Trending: Summer cars (+15%)\n• Hot: Woodie wagons (+8%)\n• Stable: Vintage classics (0%)\n\n💡 **AI Insights**\n• Best time to buy: Weekends\n• Recommended: Mid-tier collectibles\n• Watch: New drops this Friday",
      timestamp: new Date().toISOString(),
      paymentVerified: true,
      message: "Welcome to x402-powered CarCulture premium data!"
    };

    return NextResponse.json(content);

  } catch (error) {
    console.error('x402 test endpoint error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}