import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MiniKitProvider from './providers/MiniKitProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'CarCulture MiniApp',
  description: 'Mint CarMania NFTs and celebrate the Art of the Automobile.',
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
        <MiniKitProvider>{children}</MiniKitProvider>
      </body>
    </html>
  );
} 