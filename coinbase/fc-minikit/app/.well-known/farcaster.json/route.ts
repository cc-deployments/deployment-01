// Dynamic API route for Farcaster manifest - Serve correct Mini App manifest
import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    accountAssociation: {
      header: "eyJmaWQiOjI3MDE3MCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDE3NUUwMEZkMjU2NTFBNDhlMzliOUYyNTEyNjUwYmY0ZjU5MkJGNTkifQ",
      payload: "eyJkb21haW4iOiJ3ZWIzLXNvY2lhbC1zdGFydGVyLWZjLW1pbmlraXQudmVyY2VsLmFwcCJ9",
      signature: "MHhjMTY3ODA5YThlMDYyZWQ0ZTg4Zjk0MDQyNGI2NTFiZjZlYTRhYzMzOWJmYTdlNDFmNTQ0NDVjYzQ4YmI0ZjdhNWI2MDIyZWE1NzM2NGU0YzY5M2E2ZDI0MGFiNTA5MzhlZjZjYTQyMmE2NDNhNzc0ZjVjZGEwOGRiN2NkZGRmNjFi"
    },
    miniapp: {
      version: "1",
      name: "CarCulture: CarMania Garage",
      subtitle: "Collect the Classics. Cruise the Future.",
      description: "Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history.",
      iconUrl: "https://web3-social-starter-fc-minikit.vercel.app/favicon.png",
      splashImageUrl: "https://web3-social-starter-fc-minikit.vercel.app/splash.png",
      splashBackgroundColor: "#a32428",
      homeUrl: "https://web3-social-starter-fc-minikit.vercel.app",
      webhookUrl: "https://web3-social-starter-fc-minikit.vercel.app/api/webhook",
      primaryCategory: "entertainment",
      heroImageUrl: "https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png",
      tagline: "Daily Drops. Legendary Rides.",
      ogTitle: "CarCulture: CarMania Garage",
      ogDescription: "Car Culture's CarMania Garage: iconic cars, stories, and featured 'car of the day' collectibles",
      ogImageUrl: "https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png",
      castShareUrl: "https://web3-social-starter-fc-minikit.vercel.app/car",
      screenshotUrls: [
        "https://web3-social-starter-fc-minikit.vercel.app/screenshot1.png",
        "https://web3-social-starter-fc-minikit.vercel.app/screenshot2.png",
        "https://web3-social-starter-fc-minikit.vercel.app/screenshot3.png"
      ],
      tags: [
        "car",
        "art",
        "storytelling",
        "social",
        "art"
      ],
      previewImageUrl: "https://web3-social-starter-fc-minikit.vercel.app/hero-v2.png",
      buttonTitle: "Unlock the Ride"
    }
  };

  return NextResponse.json(manifest);
} 