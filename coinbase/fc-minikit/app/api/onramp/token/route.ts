import { NextRequest, NextResponse } from 'next/server';
import { securityMiddleware, handleOPTIONS, SECURITY_CONFIG } from '../../../../lib/security';

interface OnrampTokenRequest {
  amount?: string;
  currency?: string;
  destinationAddress?: string;
  blockchain?: string;
  productId?: string;
  productName?: string;
}

interface OnrampTokenResponse {
  success: boolean;
  token?: string;
  onrampUrl?: string;
  error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<OnrampTokenResponse>> {
  try {
    // Security validation using centralized middleware
    const security = securityMiddleware(request);
    if (security.error) {
      return security.error;
    }
    
    const { clientIP, headers } = security;
    
    // Parse request body
    const body: OnrampTokenRequest = await request.json();
    const { 
      amount = '0.01', 
      currency = 'ETH', 
      destinationAddress = '0x048a22DAB92f2c1e7Deb3847Ca151B888aAbOF1C',
      blockchain = 'base',
      productId,
      productName = 'CarMania NFT'
    } = body;
    
    console.log('🎯 Onramp token request:', {
      amount,
      currency,
      destinationAddress,
      blockchain,
      productId,
      clientIP
    });
    
    // Validate required fields
    if (!destinationAddress) {
      return NextResponse.json(
        { success: false, error: 'Destination address is required' },
        { status: 400 }
      );
    }
    
    // Generate Onramp URL with client IP verification
    const baseUrl = 'https://pay.coinbase.com/buy/input';
    const params = new URLSearchParams({
      appId: SECURITY_CONFIG.CDP_PROJECT_ID,
      addresses: JSON.stringify([{
        address: destinationAddress,
        blockchains: [blockchain]
      }]),
      assets: currency,
      defaultAsset: currency,
      defaultNetwork: blockchain,
      presetFiatAmount: amount,
      fiatCurrency: 'USD',
      productName: productName,
      productId: productId || `carmania_${Date.now()}`,
      forceLogin: 'true',
      paymentMethods: 'card,apple_pay,google_pay,ach,coinbase',
      enableTransfers: 'true',
      theme: 'light',
      description: `Purchase ${productName} - Digital collectible`,
      minAmount: amount,
      maxAmount: (parseFloat(amount) * 1.1).toFixed(2),
      // Add client IP for verification (if supported by Coinbase)
      clientIp: clientIP
    });
    
    const onrampUrl = `${baseUrl}?${params.toString()}`;
    
    console.log('✅ Generated secure Onramp URL with client IP:', clientIP);
    
    // Use pre-configured CORS headers from security middleware
    
    return NextResponse.json(
      { 
        success: true, 
        onrampUrl,
        clientIp: clientIP // Include for debugging
      },
      { 
        status: 200,
        headers
      }
    );
    
  } catch (error) {
    console.error('❌ Onramp token generation error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate onramp token' 
      },
      { status: 500 }
    );
  }
}

// Handle preflight OPTIONS requests
export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  return handleOPTIONS(request);
}
