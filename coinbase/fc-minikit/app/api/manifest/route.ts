import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    name: "CarMania Garage",
    description: "Explore the CarMania Garage - your gateway to automotive NFTs and community",
    icon: "https://carculture-minikit.vercel.app/icon.png",
    splash: "https://carculture-minikit.vercel.app/splash.png",
    hero: "https://carculture-minikit.vercel.app/carmania-gallery-hero.png",
    screenshots: [
      "https://carculture-minikit.vercel.app/screenshot1.png",
      "https://carculture-minikit.vercel.app/screenshot2.png",
      "https://carculture-minikit.vercel.app/screenshot3.png"
    ],
    tags: ["automotive", "nft", "community", "cars", "carculture"],
    socialShare: {
      description: "Check out CarMania Garage - your gateway to automotive NFTs and community!"
    },
    subtitle: "Your gateway to automotive NFTs and community",
    buttonTitle: "Unlock the Ride"
  };

  return NextResponse.json(manifest);
} 