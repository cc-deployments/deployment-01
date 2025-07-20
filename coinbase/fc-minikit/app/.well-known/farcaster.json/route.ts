// Dynamic API route for Farcaster manifest - Redirect to FC hosted manifest
import { NextResponse } from 'next/server';

export async function GET() {
  // Redirect to Farcaster hosted manifest URL
  const FC_HOSTED_MANIFEST_URL = 'https://api.farcaster.xyz/miniapps/hosted-manifest/0197eff8-b3b9-5206-48c3-004415cfae5f';
  
  // Return 307 redirect to FC hosted manifest
  return NextResponse.redirect(FC_HOSTED_MANIFEST_URL, 307);
} 