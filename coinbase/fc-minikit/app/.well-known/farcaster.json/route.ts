// Dynamic API route for Farcaster manifest - Serve correct Mini App manifest
import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    accountAssociation: {
      header: "eyJmaWQiOjI3MDE3MCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDE3NUUwMEZkMjU2NTFBNDhlMzliOUYyNTEyNjUwYmY0ZjU5MkJGNTkifQ",
      payload: "eyJkb21haW4iOiJ3ZWIzLXNvY2lhbC1zdGFydGVyLWZjLW1pbmlraXQudmVyY2VsLmFwcCJ9",
      signature: "MHhjMTY3ODA5YThlMDYyZWQ0ZTg4Zjk0MDQyNGI2NTFiZjZlYTRhYzMzOWJmYTdlNDFmNTQ0NDVjYzQ4YmI0ZjdhNWI2MDIyZWE1NzM2NGU0YzY5M2E2ZDI0MGFiNTA5MzhlZjZjYTQyMmE2NDNhNzc0ZjVjZGEwOGRiN2NkZGRmNjFi"
    },
    frame: {
      name: "CarCulture: CarMania Garage",
      version: "1",
      iconUrl: "https://web3-social-starter-fc-minikit.vercel.app/icon.png",
      homeUrl: "https://web3-social-starter-fc-minikit.vercel.app",
      imageUrl: "https://web3-social-starter-fc-minikit.vercel.app/hero-v2.png",
      buttonTitle: "Unlock the Ride",
      splashImageUrl: "https://web3-social-starter-fc-minikit.vercel.app/splash.png",
      splashBackgroundColor: "#a32428",
      webhookUrl: "https://api.neynar.com/f/app/70171be3-816f-416d-b846-4328fb0d210a/event",
      subtitle: "Daily Drops, Legendary Rides",
      description: "Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history.",
      screenshotUrls: [
        "https://web3-social-starter-fc-minikit.vercel.app/screenshot1.png",
        "https://web3-social-starter-fc-minikit.vercel.app/screenshot2.png",
        "https://web3-social-starter-fc-minikit.vercel.app/screenshot3.png"
      ],
      primaryCategory: "art-creativity",
      tags: [
        "social",
        "carculture",
        "car",
        "storytelling",
        "collectibles"
      ],
      heroImageUrl: "https://web3-social-starter-fc-minikit.vercel.app/hero-v2.png",
      tagline: "Drive the Past. Own the Now.",
      ogTitle: "CarCulture: CarMania Garage",
      ogDescription: "Car Culture's CarMania Garage: iconic cars, stories, and featured 'car of the day'",
      ogImageUrl: "https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png",
      castShareUrl: "https://web3-social-starter-fc-minikit.vercel.app/gallery-hero"
    }
  };

  return NextResponse.json(manifest);
} 