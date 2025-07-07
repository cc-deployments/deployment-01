import React from "react";
import "./theme.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const URL = process.env.NEXT_PUBLIC_URL;
  const ogTitle = process.env.NEXT_PUBLIC_APP_OG_TITLE || "CarCulture: CarMania Garage";
  const ogDescription = process.env.NEXT_PUBLIC_APP_OG_DESCRIPTION || "Collect iconic cars, discover automotive stories, and mint daily digital classics. CarCulture: CarMania Garage is your daily drive into automotive history.";
  const ogImage = process.env.NEXT_PUBLIC_APP_OG_IMAGE || "/carmania-gallery-hero.png";
  const subtitle = process.env.NEXT_PUBLIC_APP_SUBTITLE || "Daily Drops, Legendary Rides";
  const tagline = process.env.NEXT_PUBLIC_APP_TAGLINE || "Drive the Past. Own the Moment.";
  const description = process.env.NEXT_PUBLIC_APP_DESCRIPTION || ogDescription;
  return {
    title: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "CarCulture: CarMania Garage",
    description,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: URL,
      images: [ogImage],
      siteName: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "CarCulture: CarMania Garage",
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
        imageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE,
        button: {
          title: `Launch ${process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "CarCulture: CarMania Garage"}`,
          action: {
            type: "launch_frame",
            name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "CarCulture: CarMania Garage",
            url: URL,
            splashImageUrl: process.env.NEXT_PUBLIC_SPLASH_IMAGE,
            splashBackgroundColor:
              process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR,
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
