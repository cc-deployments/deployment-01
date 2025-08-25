import React from "react";
import "./theme.css";
// TEMPORARILY DISABLED: OnchainKit dependency issue
// import "@coinbase/onchainkit/styles.css";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import FarcasterMetaTags from './components/FarcasterMetaTags'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CarCulture: CarMania Garage',
  description: 'Collect iconic cars, discover automotive stories, and mint daily digital classics.',
  openGraph: {
    title: 'CarCulture: CarMania Garage',
    description: 'Collect iconic cars, discover automotive stories, and mint daily digital classics.',
    images: ['https://carmania.carculture.com/hero-v2.png'],
  },
  other: {
    'fc:miniapp': '{"version":"1","imageUrl":"https://carmania.carculture.com/carmania-share.png","button":{"title":"🚗 Unlock the Ride","action":{"type":"launch_miniapp","url":"https://carmania.carculture.com/gallery-hero","name":"CarCulture: CarMania Garage","splashImageUrl":"https://carmania.carculture.com/splash.png","splashBackgroundColor":"#a32428"}}}'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <FarcasterMetaTags />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
