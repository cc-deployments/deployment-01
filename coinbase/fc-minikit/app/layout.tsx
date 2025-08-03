import React from "react";
import "./theme.css";
import "@coinbase/onchainkit/styles.css";
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
        
        {/* Eruda Mobile Debugging - Development Only */}
        <script 
          src="https://cdn.jsdelivr.net/npm/eruda"
          async
        />
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              // Simple Eruda initialization with 401 error suppression
              (function() {
                const initEruda = () => {
                  if (typeof window.eruda === 'undefined') {
                    setTimeout(initEruda, 100);
                    return;
                  }
                  
                  // Suppress 401 errors from cca-lite.coinbase.com
                  const originalFetch = window.fetch;
                  window.fetch = function(...args) {
                    const url = args[0];
                    if (typeof url === 'string' && url.includes('cca-lite.coinbase.com')) {
                      console.log('Suppressing 401 error from: ' + url);
                      return Promise.resolve(new Response(JSON.stringify({}), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' }
                      }));
                    }
                    return originalFetch.apply(this, args);
                  };
                  
                  // Enable Eruda for development environments
                  if (window.location.hostname === 'localhost' ||
                      window.location.hostname.includes('ngrok') ||
                      window.location.hostname.includes('vercel.app')) {

                    window.eruda.init();
                    console.log('Eruda Debug Console Active');
                  }

                  // Enable Eruda with URL parameter for production testing
                  if (window.location.search.includes('debug=true') ||
                      window.location.search.includes('eruda=true')) {
                    window.eruda.init();
                    console.log('Eruda Enabled via URL Parameter');
                  }
                };
                
                initEruda();
              })();
            `
          }}
        />
      </body>
    </html>
  );
}
