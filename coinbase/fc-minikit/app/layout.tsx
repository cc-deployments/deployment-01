import React from "react";
import "./theme.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import EmbedHandler from "./components/EmbedHandler";
import ShareHandler from "./components/ShareHandler";

export const metadata: Metadata = {
  metadataBase: new URL('https://web3-social-starter-fc-minikit.vercel.app'),
  alternates: {
    canonical: 'https://web3-social-starter-fc-minikit.vercel.app',
  },
  title: 'CarCulture: CarMania Garage',
  description: 'Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history.',
  openGraph: {
    title: 'CarCulture: CarMania Garage',
    description: 'Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history.',
    url: 'https://web3-social-starter-fc-minikit.vercel.app',
    siteName: 'CarCulture: CarMania Garage',
    images: [
      {
        url: 'https://web3-social-starter-fc-minikit.vercel.app/hero-v2.png',
        width: 1200,
        height: 630,
        alt: 'CarCulture: CarMania Garage',
        type: 'image/png',
      }
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CarCulture: CarMania Garage',
    description: 'Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history.',
    images: ['https://web3-social-starter-fc-minikit.vercel.app/hero-v2.png'],
    creator: '@carculture',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // ...add any other metadata fields here as needed
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Farcaster Mini App meta tag */}
        <meta name="fc:miniapp" content='{"version":"1","imageUrl":"https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png","button":{"title":"Unlock the Ride","action":{"type":"launch_miniapp","url":"https://web3-social-starter-fc-minikit.vercel.app/gallery-hero","name":"Car Culture: CarMania Garage","splashImageUrl":"https://i.imgur.com/y3PmlLB.jpeg","splashBackgroundColor":"#a32428"}}}' />
      </head>
      <body className="bg-background">
        <Providers>
          <EmbedHandler />
          <ShareHandler />
          {children}
        </Providers>
      </body>
    </html>
  );
}
