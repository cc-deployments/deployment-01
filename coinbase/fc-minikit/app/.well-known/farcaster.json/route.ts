
// Dynamic API route for Farcaster manifest - Serve correct Mini App manifest
// Vercel deployment fix: Ensure dynamic route is properly recognized
// FORCE REBUILD: Vercel must serve this dynamic route, not cached manifest
import { NextResponse } from 'next/server';


export async function GET() {
  const manifest = {
    baseBuilder: {
      allowedAddresses: ["0x048a22DAB92f2c1e7Deb3847Ca151B888aAb0F1C"]
    },
    accountAssociation: {
      header: "eyJmaWQiOjI3MDE3MCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDE3NWRFMEZkMjU2NTFBNDhlMzliOUYyNTEyNjUwYmY0ZjU5MkJGNTkifQ",
      payload: "eyJkb21haW4iOiJjYXJtYW5pYS5jYXJjdWx0dXJlLmNvbSJ9",
      signature: "MHgxODMxOTM2MjI2OWM3MTM5NmYyYjFmZDYwMDM1YTc3ZDM2NDNjMWY4ZmM0YWM4YmQ1NzYzMzhkYmUyZWI1MDA4MzAxODk1N2U3ZjJmMGMwZWViOWVhZjcwZGUwYjkwZDQzMDczMTE3MDk1OTkyMjllZmI2NTNhNzhjZDE5YjhiNDFi"
    },
    frame: {
      version: "1",
      name: "CarCulture: CarMania Garage",
      subtitle: "Drive the Past. Own the Moment",
      description: "Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history.",
      iconUrl: "https://carmania.carculture.com/favicon.png",
      imageUrl: "https://carmania.carculture.com/carmania-share.png",
      splashImageUrl: "https://carmania.carculture.com/splashImageUrl.png",
      splashBackgroundColor: "#a32428",
      homeUrl: "https://carmania.carculture.com/gallery-hero",
      webhookUrl: "https://api.neynar.com/f/app/70171be3-816f-416d-b846-4328fb0d210a/event",
      primaryCategory: "entertainment",
      heroImageUrl: "https://carmania.carculture.com/hero-v2.png",
      tagline: "Daily Drops. Legendary Rides.",
      ogTitle: "CarCulture: CarMania Garage",
      ogDescription: "Car Culture's CarMania Garage: iconic cars, stories, and featured 'car of the day' collectibles",
      ogImageUrl: "https://carmania.carculture.com/carmania-share.png",
      castShareUrl: "https://carmania.carculture.com/gallery-hero",
      screenshotUrls: [
        "https://carmania.carculture.com/carmania-gallery-hero.png",
        "https://carmania.carculture.com/carmania-gallery-hero-2.png",
        "https://carmania.carculture.com/text-page.png"
      ],
      tags: [
        "car",
        "art", 
        "storytelling",
        "social",
        "entertainment"
      ],
      previewImageUrl: "https://carmania.carculture.com/hero-v2.png",
      noindex: false
    }
  };

  return NextResponse.json(manifest, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0, private',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store',
      'Last-Modified': new Date().toUTCString(),
      'ETag': `"${Date.now()}-${Math.random()}"`,
      'Vary': '*',
      'X-Cache-Bust': Date.now().toString()
    }
  });
}
