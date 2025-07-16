// Dynamic API route for Farcaster manifest - Updated for correct Vercel URL
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
  // Correct Vercel deployment URL for Farcaster embeds
  const URL = 'https://web3-social-starter-fc-minikit.vercel.app';
  const IMAGE_DOMAIN = URL;

  return NextResponse.json({
    accountAssociation: {
      header: process.env.FARCASTER_HEADER || "",
      payload: process.env.FARCASTER_PAYLOAD || "",
      signature: process.env.FARCASTER_SIGNATURE || "",
    },
    miniapp: withValidProperties({
      version: "1",
      name: "Car Culture: CarMania Garage",
      subtitle: "Daily Car Culture Collectibles",
      description: "Collect iconic cars, discover automotive stories, and mint daily digital collectibles. CarCulture: CarMania Garage is your daily drive into automotive history.",
      iconUrl: `${IMAGE_DOMAIN}/icon.png`,
      splashImageUrl: "https://i.imgur.com/y3PmlLB.jpeg",
      splashBackgroundColor: "#a32428",
      homeUrl: URL,
      webhookUrl: `${URL}/api/webhook`,
      primaryCategory: "entertainment",
      heroImageUrl: `${IMAGE_DOMAIN}/carmania-gallery-hero.png`,
      tagline: "Daily Drops. Legendary Rides.",
      ogTitle: "Car Culture: CarMania Garage",
      ogDescription: "Check out CarMania Garage - your gateway to automotive NFTs and community!",
      ogImageUrl: `${IMAGE_DOMAIN}/carmania-gallery-hero.png`,
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
      previewImageUrl: `${IMAGE_DOMAIN}/carmania-gallery-hero.png`,
      buttonTitle: "Unlock the Ride"
    })
  });
} 