import { Metadata } from 'next';

// Generate metadata for this page following official Farcaster docs exactly
export const metadata: Metadata = {
  other: {
    // Follow official Farcaster docs format exactly
    'fc:miniapp': JSON.stringify({
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
    }),
    'fc:frame': JSON.stringify({
      version: "1",
      imageUrl: "https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png",
      button: {
        title: "Unlock the Ride",
        action: {
          type: "launch_frame",
          url: "https://web3-social-starter-fc-minikit.vercel.app/gallery-hero",
          name: "Car Culture: CarMania Garage",
          splashImageUrl: "https://i.imgur.com/y3PmlLB.jpeg",
          splashBackgroundColor: "#a32428"
        }
      }
    })
  },
  openGraph: {
    title: "Car Culture: CarMania Garage",
    description: "Collect iconic cars, discover automotive stories, and mint daily digital collectibles.",
    images: ["https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Culture: CarMania Garage",
    description: "Collect iconic cars, discover automotive stories, and mint daily digital collectibles.",
    images: ["https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png"],
  },
};

export default function GalleryHeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 