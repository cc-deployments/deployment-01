import { Metadata } from 'next';
import FarcasterMetaTags from '../components/FarcasterMetaTags';

// Generate metadata for this page
export const metadata: Metadata = FarcasterMetaTags({ pageUrl: "/gallery-hero", buttonTitle: "Unlock the Ride" });

export default function GalleryHeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Add meta tags directly to head as per Farcaster docs */}
      <head>
        <meta name="fc:miniapp" content={JSON.stringify({
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
        })} />
        <meta name="fc:frame" content={JSON.stringify({
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
        })} />
      </head>
      {children}
    </>
  );
} 