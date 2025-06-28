import { Providers } from './Providers';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CarCulture',
  description: 'CarCulture social integration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="fc:frame" content='{"version":"next","imageUrl":"https://web3-social-starter-neynar-v2.vercel.app/splash.png","button":{"title":"Open App","action":{"type":"launch_frame","name":"CarCulture","url":"https://web3-social-starter-neynar-v2.vercel.app","splashImageUrl":"https://web3-social-starter-neynar-v2.vercel.app/splash.png","splashBackgroundColor":"#000000"}},"actions":["comment","quote","like"]}' />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 