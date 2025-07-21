import { Metadata } from 'next';

// Generate metadata for this page
export const metadata: Metadata = {
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