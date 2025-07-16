// Dynamic API route for Farcaster manifest
import { NextResponse } from 'next/server';

function withValidProperties(
  properties: Record<string, undefined | string | string[]>,
) {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return !!value;
    }),
  );
}

export async function GET() {
  const URL = 'https://web3-social-starter-fc-minikit.vercel.app';
  const IMAGE_DOMAIN = URL;

  return NextResponse.json({
    accountAssociation: {
      header: process.env.FARCASTER_HEADER,
      payload: process.env.FARCASTER_PAYLOAD,
      signature: process.env.FARCASTER_SIGNATURE,
    },
    miniapp: withValidProperties({
      version: "1",
      name: "CarCulture: CarMania Garage",
      subtitle: "Daily Car Culture Collectibles",
      description: "Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history.",
      iconUrl: `${IMAGE_DOMAIN}/favicon.png`,
      splashImageUrl: `${IMAGE_DOMAIN}/splash.png`,
      splashBackgroundColor: "#a32428", // Fixed: matches app brand red
      homeUrl: URL,
      webhookUrl: `${URL}/api/webhook`,
      primaryCategory: "entertainment",
      heroImageUrl: `${IMAGE_DOMAIN}/hero-v2.png`,
      tagline: "Daily Drops. Legendary Rides.",
      ogTitle: "CarCulture: CarMania Garage",
      ogDescription: "Car Culture's CarMania Garage: iconic cars, stories, and featured 'car of the day' collectibles", // Updated description
      ogImageUrl: `${IMAGE_DOMAIN}/hero-v2.png`, // Updated: using hero-v2.png for social sharing
      screenshotUrls: [
        `${IMAGE_DOMAIN}/screenshot1.png`,
        `${IMAGE_DOMAIN}/screenshot2.png`,
        `${IMAGE_DOMAIN}/screenshot3.png`
      ],
      tags: [
        "car",
        "art", 
        "storytelling",
        "social",
        "collectibles"
      ],
      previewImageUrl: `${IMAGE_DOMAIN}/hero-v2.png`,
      buttonTitle: "Unlock the Ride"
    })
  });
} 