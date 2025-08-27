// Dynamic API route for Farcaster manifest - Serve correct Mini App manifest
// Vercel deployment fix: Ensure dynamic route is properly recognized
// FORCE REBUILD: Vercel must serve this dynamic route, not cached manifest
import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    version: "1",
    imageUrl: "https://carmania.carculture.com/carmania-share.png",
    button: {
      title: "🚗 Unlock the Ride",
      action: {
        type: "launch_miniapp",
        url: "https://carmania.carculture.com/gallery-hero",
        name: "CarCulture: CarMania Garage",
        splashImageUrl: "https://carmania.carculture.com/splash.png"
      }
    }
  };

  return NextResponse.json(manifest, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store'
    }
  });
}
