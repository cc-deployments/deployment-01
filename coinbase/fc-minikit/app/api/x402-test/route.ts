import { NextRequest, NextResponse } from 'next/server';
import { paymentMiddleware } from 'x402-express';
import { facilitator } from '@coinbase/x402';

// Production configuration
const isProduction = process.env.NODE_ENV === 'production';

// Configure facilitator based on environment
const facilitatorConfig = isProduction 
  ? facilitator // CDP's hosted facilitator for mainnet
  : { url: "https://x402.org/facilitator" as const }; // Testnet facilitator

// Your receiving wallet address
const RECEIVING_ADDRESS = process.env.X402_RECEIVING_ADDRESS || "0x0000000000000000000000000000000000000000";
const NETWORK: "base" | "base-sepolia" = isProduction ? "base" : "base-sepolia";

// Configure protected endpoints
const protectedRoutes = {
  "GET /api/x402-test": {
    price: "$0.001", // 0.001 USDC
    network: NETWORK,
    config: {
      description: "Test x402 payment endpoint for CarCulture premium content",
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
  RECEIVING_ADDRESS as `0x${string}`,
  protectedRoutes,
  facilitatorConfig
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
            network: NETWORK,
            payTo: RECEIVING_ADDRESS,
            facilitator: isProduction ? "https://facilitator.cdp.coinbase.com" : "https://x402.org/facilitator"
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