import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CarCulture: CarMania Garage',
  description: 'Explore the ultimate car gallery experience',
}

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Farcaster Mini App Embed Meta Tags */}
        <meta name="fc:miniapp" content='{"version":"1","imageUrl":"https://your-deployment-url.com/carmania-share.png","button":{"title":"🚗 Unlock the Ride","action":{"type":"launch_miniapp","url":"https://your-deployment-url.com/gallery-hero","name":"CarCulture: CarMania Garage","splashImageUrl":"https://your-deployment-url.com/splash.png","splashBackgroundColor":"#a32428"}}}' />
        {/* For backward compatibility */}
        <meta name="fc:frame" content='{"version":"1","imageUrl":"https://your-deployment-url.com/carmania-share.png","button":{"title":"🚗 Unlock the Ride","action":{"type":"launch_frame","url":"https://your-deployment-url.com/gallery-hero","name":"CarCulture: CarMania Garage","splashImageUrl":"https://your-deployment-url.com/splash.png","splashBackgroundColor":"#a32428"}}}' />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 