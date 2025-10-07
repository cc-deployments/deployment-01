// @ts-nocheck
import React from "react";
import "./theme.css";
import "./tailwind.css"; // Import Tailwind CSS FIRST
// import "@coinbase/onchainkit/styles.css"; // REMOVED - using shared-auth instead
import type { Metadata, Viewport } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { Providers } from "./providers";
import EmbedHandler from "./components/EmbedHandler";
import ShareHandler from "./components/ShareHandler";


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CarCulture: CarMania Garage',
  description: 'Explore the ultimate car gallery experience - an amazing car collection mini app! 🚗✨',
  openGraph: {
    title: 'CarCulture: CarMania Garage',
    description: 'Explore the ultimate car gallery experience - an amazing car collection mini app! 🚗✨',
    url: 'https://carmania.carculture.com',
    siteName: 'CarMania Gallery',
    images: [
      {
        url: 'https://carmania.carculture.com/carmania-share.png',
        width: 1200,
        height: 630,
        alt: 'CarMania Gallery - Ultimate Car Collection Experience',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CarCulture: CarMania Garage',
    description: 'Explore the ultimate car gallery experience - an amazing car collection mini app! 🚗✨',
    images: ['https://carmania.carculture.com/carmania-share.png'],
  },
  other: {
    'fc:miniapp': '{"version":"1","imageUrl":"https://carmania.carculture.com/carmania-share.png","ogimageUrl":"https://carmania.carculture.com/hero-v2.png","button":{"title":"Unlock the Ride","action":{"type":"launch_miniapp","url":"https://carmania.carculture.com/gallery-hero","name":"CarCulture: CarMania Garage","splashImageUrl":"https://carmania.carculture.com/splashImageUrl.png","splashBackgroundColor":"#a32428"}}}',
    'fc:frame': '{"version":"next","imageUrl":"https://carmania.carculture.com/carmania-share.png","button":{"title":"Unlock the Ride","action":{"type":"launch_frame","name":"CarCulture: CarMania Garage","url":"https://carmania.carculture.com/gallery-hero","splashImageUrl":"https://carmania.carculture.com/splashImageUrl.png","splashBackgroundColor":"#a32428"}}}'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Manifold Widget Scripts removed - not needed for direct contract interaction */}
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <EmbedHandler />
          <ShareHandler />
        </Providers>
      </body>
    </html>
  );
}
