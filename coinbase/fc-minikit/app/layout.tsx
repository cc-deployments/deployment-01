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
        <script src="https://cdn.jsdelivr.net/npm/eruda"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Enhanced Eruda initialization for mobile debugging
            (function() {
              // Enable Eruda for development environments
              if (window.location.hostname === 'localhost' ||
                  window.location.hostname.includes('ngrok') ||
                  window.location.hostname.includes('vercel.app')) {

                eruda.init();

                eruda.get('console').log('🔍 Eruda Debug Console Active');
                eruda.get('console').log('📱 Mobile Debug Mode Enabled');
                eruda.get('console').log('🌐 URL: ' + window.location.href);
                eruda.get('console').log('📱 User Agent: ' + navigator.userAgent);

                const isInMiniApp = window.location.href.includes('farcaster') ||
                                   window.location.href.includes('warpcast') ||
                                   window.location.href.includes('base.app');
                eruda.get('console').log('🎯 Mini App Environment: ' + (isInMiniApp ? 'YES' : 'NO'));

                // Suppress 401 errors from cca-lite.coinbase.com
                const originalFetch = window.fetch;
                window.fetch = function(...args) {
                  const url = args[0];
                  if (typeof url === 'string' && url.includes('cca-lite.coinbase.com')) {
                    eruda.get('console').log('🚫 Suppressing 401 error from: ' + url);
                    return Promise.resolve(new Response(JSON.stringify({}), {
                      status: 200,
                      headers: { 'Content-Type': 'application/json' }
                    }));
                  }
                  return originalFetch.apply(this, args);
                };

                document.addEventListener('touchstart', function(e) {
                  eruda.get('console').log('👆 Touch Start:', e.touches.length + ' touches');
                });

                document.addEventListener('touchend', function(e) {
                  eruda.get('console').log('👆 Touch End:', e.changedTouches.length + ' touches');
                });

                let startX = 0;
                let startY = 0;

                document.addEventListener('touchstart', function(e) {
                  startX = e.touches[0].clientX;
                  startY = e.touches[0].clientY;
                });

                document.addEventListener('touchend', function(e) {
                  const endX = e.changedTouches[0].clientX;
                  const endY = e.changedTouches[0].clientY;
                  const deltaX = endX - startX;
                  const deltaY = endY - startY;

                  if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
                    eruda.get('console').log('🔄 Swipe Detected:', {
                      deltaX: deltaX,
                      deltaY: deltaY,
                      direction: Math.abs(deltaX) > Math.abs(deltaY) ?
                        (deltaX > 0 ? 'RIGHT' : 'LEFT') :
                        (deltaY > 0 ? 'DOWN' : 'UP')
                    });
                  }
                });
              }

              // Enable Eruda with URL parameter for production testing
              if (window.location.search.includes('debug=true') ||
                  window.location.search.includes('eruda=true')) {
                eruda.init();
                eruda.get('console').log('🔧 Eruda Enabled via URL Parameter');
              }
            })();
          `
        }} />
      </body>
    </html>
  );
}
