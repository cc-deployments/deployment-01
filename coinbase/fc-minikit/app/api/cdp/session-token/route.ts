import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { partnerUserId, redirectUrl } = await request.json();
    
    // Get CDP configuration from environment
    const projectId = process.env.CDP_PROJECT_ID || '1cceb0e4-e690-40ac-8f3d-7d1f3da1417a';
    const clientApiKey = process.env.NEXT_PUBLIC_CDP_CLIENT_API_KEY;
    
    console.log('🔧 CDP Project ID:', projectId);
    console.log('🔧 CDP Client API Key:', clientApiKey ? 'Present' : 'Missing');
    console.log('🔧 Partner User ID:', partnerUserId);
    
    if (!clientApiKey) {
      throw new Error('CDP Client API Key not configured');
    }

    // Call CDP's session token API to generate a real JWT token
    const sessionTokenResponse = await fetch('https://api.cdp.coinbase.com/platform/v1/session-tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${clientApiKey}`,
        'X-CDP-Project-ID': projectId,
      },
      body: JSON.stringify({
        partnerUserId,
        redirectUrl,
        expiresIn: 3600, // 1 hour
      }),
    });

    if (!sessionTokenResponse.ok) {
      const errorText = await sessionTokenResponse.text();
      console.error('CDP Session Token API Error:', errorText);
      throw new Error(`CDP API Error: ${sessionTokenResponse.status}`);
    }

    const { sessionToken } = await sessionTokenResponse.json();
    
    console.log('🔧 Generated real CDP session token:', sessionToken);
    
    return NextResponse.json({
      sessionToken,
      projectId,
      partnerUserId,
      redirectUrl,
    });
    
  } catch (error) {
    console.error('Session token generation error:', error);
    return NextResponse.json(
      { error: `Failed to generate session token: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
