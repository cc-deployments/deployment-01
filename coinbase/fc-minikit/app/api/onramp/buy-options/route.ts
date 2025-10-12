import { NextRequest, NextResponse } from 'next/server';

const CDP_API_BASE_URL = 'https://api.cdp.coinbase.com';

// Helper function to get CDP JWT token
async function getCdpJwtToken(): Promise<string> {
  const projectId = process.env.NEXT_PUBLIC_CDP_PROJECT_ID;
  const apiKeyId = process.env.NEXT_PUBLIC_CDP_API_KEY_ID;
  const apiKeySecret = process.env.CDP_API_KEY_SECRET;

  if (!projectId || !apiKeyId || !apiKeySecret) {
    throw new Error('Missing CDP configuration. Please set NEXT_PUBLIC_CDP_PROJECT_ID, NEXT_PUBLIC_CDP_API_KEY_ID, and CDP_API_KEY_SECRET environment variables.');
  }

  // For now, we'll use a simple approach. In production, you'd want to implement proper JWT signing
  // This is a placeholder - you'll need to implement proper JWT token generation
  return `${apiKeyId}:${apiKeySecret}`;
}

// Convert snake_case to camelCase
function convertSnakeToCamelCase(obj: any): any {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(convertSnakeToCamelCase);
  
  const converted: any = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    converted[camelKey] = convertSnakeToCamelCase(value);
  }
  return converted;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') || 'US';
    const subdivision = searchParams.get('subdivision') || 'CA';

    const jwt = await getCdpJwtToken();

    const response = await fetch(`${CDP_API_BASE_URL}/onramp/v1/buy/options`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('CDP API error:', response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      
      try {
        const errorData = JSON.parse(errorText);
        return NextResponse.json(
          { error: errorData.message || 'Failed to fetch buy options' },
          { status: response.status }
        );
      } catch {
        return NextResponse.json(
          { error: 'Failed to fetch buy options' },
          { status: response.status }
        );
      }
    }

    const data = await response.json();
    const dataCamelCase = convertSnakeToCamelCase(data);
    return NextResponse.json(dataCamelCase);
  } catch (error) {
    console.error('Error fetching buy options:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
