// Dynamic API route for Farcaster manifest - Serve correct Mini App manifest
import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    accountAssociation: {
      header: process.env.FARCASTER_HEADER,
      payload: process.env.FARCASTER_PAYLOAD,
      signature: process.env.FARCASTER_SIGNATURE,
    },
    miniapp: {
      version: "1",
      name: "CarCulture: CarMania Garage",
      subtitle: "Daily Drops, Legendary Rides",
      description: "Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history.",
      iconUrl: "https://web3-social-starter-fc-minikit.vercel.app/favicon.png",
      splashImageUrl: "https://web3-social-starter-fc-minikit.vercel.app/splash.png",
      splashBackgroundColor: "#a32428",
      homeUrl: "https://web3-social-starter-fc-minikit.vercel.app",
      webhookUrl: "https://web3-social-starter-fc-minikit.vercel.app/api/webhook",
      primaryCategory: "art-creativity",
      heroImageUrl: "https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png",
      tagline: "Drive the Past. Own the Now.",
      ogTitle: "CarCulture: CarMania Garage",
      ogDescription: "Car Culture's CarMania Garage: iconic cars, stories, and featured 'car of the day'",
      ogImageUrl: "https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png",
      castShareUrl: "https://web3-social-starter-fc-minikit.vercel.app/gallery-hero",
      screenshotUrls: [
        "https://web3-social-starter-fc-minikit.vercel.app/screenshot1.png"
      ],
      tags: [
        "social",
        "carculture", 
        "car",
        "storytelling",
        "collectibles"
      ],
      previewImageUrl: "https://web3-social-starter-fc-minikit.vercel.app/hero-v2.png",
      buttonTitle: "Unlock the Ride",
      // Embed meta tags for FC embed tool
      "fc:miniapp": {
        version: "1",
        imageUrl: "https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png",
        button: {
          title: "Unlock the Ride",
          action: {
            type: "launch_miniapp",
            url: "https://web3-social-starter-fc-minikit.vercel.app/gallery-hero",
            name: "Car Culture: CarMania Garage",
            splashImageUrl: "https://i.imgur.com/y3PmlLB.jpeg",
            splashBackgroundColor: "#a32428"
          }
        }
      }
    }
  };

  return NextResponse.json(manifest);
} 