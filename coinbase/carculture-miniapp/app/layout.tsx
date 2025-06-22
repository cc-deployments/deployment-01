import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MiniKitContextProvider } from './providers/MiniKitProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CarCulture MiniApp',
  description: 'Mint CarMania NFTs and celebrate the Art of the Automobile.',
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
        <MiniKitContextProvider>{children}</MiniKitContextProvider>
      </body>
    </html>
  );
} 