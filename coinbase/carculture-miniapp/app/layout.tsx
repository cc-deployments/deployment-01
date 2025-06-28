import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import dynamic from 'next/dynamic';
import '@coinbase/onchainkit/styles.css';

const Providers = dynamic(() => import('../shared/identity/Providers'), { ssr: false });

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Car Culture Mini App',
  description: 'Mint and collect exclusive car NFTs',
  category: 'entertainment',
  openGraph: {
    title: 'CarCulture MiniApp',
    description: 'Mint CarMania NFTs and celebrate the Art of the Automobile.',
    images: ['/preview.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MiniKitProvider projectId={process.env.NEXT_PUBLIC_PROJECT_ID}>
          <Providers>
            {children}
          </Providers>
        </MiniKitProvider>
      </body>
    </html>
  );
} 