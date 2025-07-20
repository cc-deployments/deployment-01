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
    miniapp: withValidProperties({
      version: "1",
      name: "Car Culture: CarMania Garage",
      iconUrl: `${IMAGE_DOMAIN}/icon.png`,
      homeUrl: URL,
      splashImageUrl: "https://i.imgur.com/y3PmlLB.jpeg",
      splashBackgroundColor: "#a32428",
      webhookUrl: `${URL}/api/webhook`,
      subtitle: "Drive the Past-Own the Moment",
      description: "Collect iconic cars, discover automotive stories, and mint daily digital collectibles. CarCulture: CarMania Garage is your daily drive into automotive history.",
      screenshotUrls: [
        `${IMAGE_DOMAIN}/screenshot1.png`,
        `${IMAGE_DOMAIN}/screenshot2.png`,
        `${IMAGE_DOMAIN}/screenshot3.png`
      ],
      primaryCategory: "entertainment",
      tags: [
        "car",
        "art", 
        "storytelling",
        "social",
        "collectibles"
      ],
      heroImageUrl: "https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png",
      tagline: "Daily Drops. Legendary Rides.",
      ogTitle: "Car Culture: CarMania Garage",
      ogDescription: "Car Culture's CarMania Garage: iconic cars, stories, and featured 'car of the day' collectibles",
      ogImageUrl: "https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png",
      requiredChains: [
        "eip155:8453",
        "eip155:1"
      ],
      requiredCapabilities: [
        "actions.signIn",
        "wallet.getEthereumProvider",
        "wallet.getCapabilities", // EIP-5792: Check wallet capabilities
        "wallet.sendCalls", // EIP-5792: Send batch transactions
        "wallet.getCallsStatus", // EIP-5792: Check transaction status
        "wallet.showCallsStatus", // EIP-5792: Show transaction status
        "actions.sendNotification",
        "actions.composeCast",
        "actions.openCast",
        "actions.openProfile",
        "haptics.impactOccurred",
        "navigation.goBack",
        "navigation.openUrl"
      ],
      canonicalDomain: "web3-social-starter-fc-minikit.vercel.app",
      imageUrl: "https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png",
      castShareUrl: `${URL}/gallery-hero`,
      buttonTitle: "Unlock the Ride"
    })
  });
} 