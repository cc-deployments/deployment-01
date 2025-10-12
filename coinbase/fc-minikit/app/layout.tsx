import React from "react";
import "./theme.css";
// OnchainKit CSS has syntax error - temporarily disabled
// import "@coinbase/onchainkit/styles.css";
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
  // Temporarily removed problematic JSON strings causing syntax error
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
