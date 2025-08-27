import React from "react";
import "./theme.css";
// TEMPORARILY DISABLED: OnchainKit dependency issue
// import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CarCulture: CarMania Garage',
  description: 'Explore the ultimate car gallery experience',
  other: {
    'fc:miniapp': '{"miniapp":{"version":"1","name":"CarCulture: CarMania Garage","iconUrl":"https://carmania.carculture.com/icon.png","homeUrl":"https://carmania.carculture.com/gallery-hero","imageUrl":"https://carmania.carculture.com/carmania-share.png","splashImageUrl":"https://carmania.carculture.com/splash.png","requiredChains":["eip155:8453"]}}'
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
        </Providers>
      </body>
    </html>
  );
}
