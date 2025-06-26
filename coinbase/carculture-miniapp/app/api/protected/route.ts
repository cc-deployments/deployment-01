import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// In-memory rate limiter (per FID)
const rateLimiter = new Map<string, number[]>();

export function checkRateLimit(fid: string) {
  const now = Date.now();
  const userRequests = rateLimiter.get(fid) || [];

  // Remove requests older than 1 minute
  const recentRequests = userRequests.filter(
    (timestamp: number) => now - timestamp < 60000
  );

  if (recentRequests.length >= 10) {
    throw new Error('Rate limit exceeded');
  }

  recentRequests.push(now);
  rateLimiter.set(fid, recentRequests);
}

// Input validation using zod (per prompt)
const userInputSchema = z.object({
  fid: z.string().min(1),
  message: z.string().max(280),
  signature: z.string()
});

export function validateInput(data: unknown) {
  return userInputSchema.parse(data);
}

// Placeholder for actual Farcaster signature verification logic
async function verifyFarcasterSignature(fid: string, signature: string): Promise<boolean> {
  // TODO: Implement real Farcaster signature verification here
  // For now, always return false (unauthorized)
  return false;
}

export async function POST(request: NextRequest) {
  let data;
  try {
    data = await request.json();
    data = validateInput(data);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { fid, signature } = data;

  // Rate limiting
  try {
    checkRateLimit(fid);
  } catch (err) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  // Verify the signature and FID
  const isValid = await verifyFarcasterSignature(fid, signature);

  if (!isValid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Return protected content
  return NextResponse.json({ content: 'Protected data' });
} 