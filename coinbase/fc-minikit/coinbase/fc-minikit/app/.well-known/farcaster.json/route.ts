// Dynamic API route for Farcaster manifest - Serve correct Mini App manifest
import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    accountAssociation: {
      header: "eyJmaWQiOjI3MDE3MCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDE3NWRFMEZkMjU2NTFBNDhlMzliOUYyNTEyNjUwYmY0ZjU5MkJGNTkifQ",
      payload: "eyJkb21haW4iOiJkZXBsb3ltZW50LTAxLXJqOTEtdmVyY2VsLmFwcCJ9",
      signature: "MHhjMTY3ODA5YThlMDYyZWQ0ZTg4Zjk0MDQyNGI2NTFiZjZlYTRhYzMzOWJmYTdlNDFmNTQ0NDVjYzQ4YmI0ZjdhNWI2MDIyZWE1NzM2NGU0YzY5M2E2ZDI0MGFiNTA5MzhlZjZjYTQyMmE2NDNhNzc0ZjVjZGEwOGRiN2NkZGRmNjFi"
    },
    miniapp: {
      version: "1",
      name: "CarCulture: CarMania Garage",
      subtitle: "Drive the Past. Own the Moment",
      description: "Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history.",
      iconUrl: "https://deployment-01-rj91-vercel.app/favicon.png",
      splashImageUrl: "https://deployment-01-rj91-vercel.app/splash.png",
      splashBackgroundColor: "#a32428",
      homeUrl: "https://deployment-01-rj91-vercel.app",
      webhookUrl: "https://api.neynar.com/f/app/70171be3-816f-416d-b846-4328fb0d210a/event",
      primaryCategory: "entertainment",
      heroImageUrl: "https://deployment-01-rj91-vercel.app/hero-v2.png",
      tagline: "Daily Drops. Legendary Rides.",
      ogTitle: "CarCulture: CarMania Garage",
      ogDescription: "Car Culture's CarMania Garage: iconic cars, stories, and featured 'car of the day' collectibles",
      ogImageUrl: "https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png",
      castShareUrl: "https://deployment-01-rj91-vercel.app/gallery-hero",
      screenshotUrls: [
        "https://deployment-01-rj91-vercel.app/screenshot1.png",
        "https://deployment-01-rj91-vercel.app/screenshot2.png",
        "https://deployment-01-rj91-vercel.app/screenshot3.png"
      ],
      tags: [
        "car",
        "art", 
        "storytelling",
        "social",
        "art"
      ],
      previewImageUrl: "https://deployment-01-rj91-vercel.app/hero-v2.png",
      buttonTitle: "Unlock the Ride"
    }
  };

  return NextResponse.json(manifest);
} 