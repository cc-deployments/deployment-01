// carculture-landing/src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CarCulture - Where Cars Meet Culture",
  description: "Discover automotive NFTs, daily drops, and exclusive collections. Join the CarCulture community.",
  keywords: "automotive NFTs, car culture, digital collectibles, blockchain, NFTs",
  openGraph: {
    title: "CarCulture - Where Cars Meet Culture",
    description: "Discover automotive NFTs, daily drops, and exclusive collections",
    type: "website",
    url: "https://carculture.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

