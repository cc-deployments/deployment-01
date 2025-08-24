// Dynamic API route for Farcaster manifest - Serve correct Mini App manifest
import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    accountAssociation: {
      header: "eyJmaWQiOjI3MDE3MCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDE3NWRFMEZkMjU2NTFBNDhlMzliOUYyNTEyNjUwYmY0ZjU5MkJGNTkifQ",
      payload: "eyJkb21haW4iOiJjYXJtYW5pYS5jYXJjdWx0dXJlLmNvbSJ9",
      signature: "MHgxODMxOTM2MjI2OWM3MTM5NmYyYjFmZDYwMDM1YTc3ZDM2NDNjMWY4ZmM0YWM4YmQ1NzYzMzhkYmUyZWI1MDA4MzAxODk1N2U3ZjJmMGMwZWViOWVhZjcwZGUwYjkwZDQzMDczMTE3MDk1OTkyMjllZmI2NTNhNzhjZDE5YjhiNDFi"
    },
    miniapp: {
      version: "1",
      name: "CarCulture: CarMania Garage",
      subtitle: "Drive the Past. Own the Moment",
      description: "Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history.",
      iconUrl: "https://carmania.carculture.com/favicon.png",
      splashImageUrl: "https://carmania.carculture.com/splash.png",
      splashBackgroundColor: "#a32428",
      homeUrl: "https://carmania.carculture.com",
      webhookUrl: "https://api.neynar.com/f/app/70171be3-816f-416d-b846-4328fb0d210a/event",
      primaryCategory: "entertainment",
      heroImageUrl: "https://carmania.carculture.com/hero-v2.png",
      tagline: "Daily Drops. Legendary Rides.",
      ogTitle: "CarCulture: CarMania Garage",
      ogDescription: "Car Culture's CarMania Garage: iconic cars, stories, and featured 'car of the day' collectibles",
      ogImageUrl: "https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png",
      castShareUrl: "https://carmania.carculture.com/gallery-hero",
      screenshotUrls: [
        "https://carmania.carculture.com/screenshot1.png",
        "https://carmania.carculture.com/screenshot2.png",
        "https://carmania.carculture.com/screenshot3.png"
      ],
      tags: [
        "car",
        "art", 
        "storytelling",
        "social",
        "art"
      ],
      previewImageUrl: "https://carmania.carculture.com/hero-v2.png",
      buttonTitle: "Unlock the Ride"
    }
  };

  return NextResponse.json(manifest);
} // Cache bust: Sun Aug 24 10:37:48 EDT 2025
