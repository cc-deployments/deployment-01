import React from "react";
import "./theme.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";
import EmbedHandler from "./components/EmbedHandler";
import ShareHandler from "./components/ShareHandler";
import NotificationHandler from "./components/NotificationHandler";

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
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="bg-background">
        <Providers>
          <EmbedHandler />
          <ShareHandler />
          <NotificationHandler />
          {children}
        </Providers>
      </body>
    </html>
  );
}
