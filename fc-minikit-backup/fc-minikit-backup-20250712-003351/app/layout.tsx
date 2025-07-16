import React from "react";
import "./theme.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata } from "next";
import type { Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL('https://web3-social-starter-fc-minikit.vercel.app'),
  // ...add any other metadata fields here as needed
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/favicon.ico/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon.ico/site.webmanifest" />
      </head>
      <body className="bg-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
