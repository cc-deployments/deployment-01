import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

interface AuthRequest {
  fid: string | number;
  username?: string;
  location?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { fid, username, location }: AuthRequest = await request.json();

    // Validate required fields
    if (!fid) {
      return NextResponse.json(
        { error: 'FID is required for authentication' },
        { status: 400 }
      );
    }

    // Convert FID to number for consistency
    const fidNumber = typeof fid === 'string' ? parseInt(fid, 10) : fid;

    // Create session data
    const sessionData = {
      fid: fidNumber,
      username: username || 'unknown',
      location: location || 'unknown',
      authenticatedAt: new Date().toISOString(),
      sessionId: `session_${fidNumber}_${Date.now()}`,
    };

    // Store session in Redis with expiration (24 hours)
    const sessionKey = `farcaster_session:${fidNumber}`;
    await redis.setex(sessionKey, 86400, JSON.stringify(sessionData));

    // Create a simple JWT-like token (in production, use a proper JWT library)
    const token = Buffer.from(JSON.stringify({
      fid: fidNumber,
      sessionId: sessionData.sessionId,
      exp: Math.floor(Date.now() / 1000) + 86400, // 24 hours
    })).toString('base64');

    return NextResponse.json({
      success: true,
      token,
      session: sessionData,
      message: 'Farcaster authentication successful'
    });

  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
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
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 