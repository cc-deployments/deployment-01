import React from "react";
import "./theme.css";
// TEMPORARILY DISABLED: OnchainKit dependency issue
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
  description: 'Explore the ultimate car gallery experience',
  other: {
    'fc:miniapp': '{"version":"1","imageUrl":"https://web3-social-starter-fc-minikit.vercel.app/carmania-share.png","button":{"title":"🚗 Unlock the Ride","action":{"type":"launch_miniapp","url":"https://web3-social-starter-fc-minikit.vercel.app/gallery-hero","name":"CarCulture: CarMania Garage","splashImageUrl":"https://web3-social-starter-fc-minikit.vercel.app/splash.png","splashBackgroundColor":"#a32428"}}}'
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <EmbedHandler />
          <ShareHandler />
        </Providers>
        
        {/* Debugging removed - was causing container issues */}
      </body>
    </html>
  );
}
