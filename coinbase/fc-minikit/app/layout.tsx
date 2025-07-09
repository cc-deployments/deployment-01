import React from "react";
import "./theme.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata } from "next";
import type { Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const URL = "https://web3-social-starter-fc-minikit.vercel.app";
  const ogTitle = "CarCulture: CarMania Garage";
  const ogDescription = "Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history.";
  const ogImage = "/hero-v2.png";
  const subtitle = "Daily Drops, Legendary Rides";
  const tagline = "Drive the Past. Claim the Future.";
  const description = ogDescription;
  return {
    title: "CarCulture: CarMania Garage",
    description,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: URL,
      images: [ogImage],
      siteName: "CarCulture: CarMania Garage",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
    other: {
      subtitle,
      tagline,
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: "/hero-v2.png",
        button: {
          title: `Launch CarCulture: CarMania Garage`,
          action: {
            type: "launch_frame",
            name: "CarCulture: CarMania Garage",
            url: URL,
            splashImageUrl: "/splash.png",
            splashBackgroundColor: "#a32428",
          },
        },
      }),
    },
  };
}

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
