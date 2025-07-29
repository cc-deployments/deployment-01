import React from "react";
import "./theme.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import EmbedHandler from "./components/EmbedHandler";
import ShareHandler from "./components/ShareHandler";
import Script from 'next/script';

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
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Farcaster Mini App meta tag */}
        <meta name="fc:miniapp" content='{"version":"1","imageUrl":"https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png","button":{"title":"Unlock the Ride","action":{"type":"launch_miniapp","url":"https://web3-social-starter-fc-minikit.vercel.app/gallery-hero","name":"Car Culture: CarMania Garage","splashImageUrl":"https://i.imgur.com/y3PmlLB.jpeg","splashBackgroundColor":"#a32428"}}}' />
        {/* Eruda mobile debugging - only in development */}
        {process.env.NODE_ENV === 'development' && (
          <>
            <Script src="https://cdn.jsdelivr.net/npm/eruda" />
            <Script id="eruda-init" strategy="afterInteractive">
              {`
                if (window.location.hostname === 'localhost' || window.location.hostname.includes('ngrok')) {
                  eruda.init();
                }
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <Providers>
          <EmbedHandler />
          <ShareHandler />
          {children}
        </Providers>
      </body>
    </html>
  );
}
