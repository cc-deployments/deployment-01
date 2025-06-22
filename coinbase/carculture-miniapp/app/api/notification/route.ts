import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { title, body, token, url } = requestBody;

    // Validate required fields
    if (!title || !body || !token || !url) {
      return NextResponse.json(
        { error: 'Missing required fields: title, body, token, url' },
        { status: 400 }
      );
    }

    // Forward notification to Farcaster
    const response = await fetch('https://api.farcaster.xyz/v2/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FARCASTER_API_KEY}`,
      },
      body: JSON.stringify({
        title,
        body,
        token,
        url,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Farcaster notification error:', error);
      return NextResponse.json(
        { error: 'Failed to send notification' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Notification proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle CORS preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 