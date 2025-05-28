import { PrivyProvider } from '@privy-io/react-auth';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CarCulture - Neynar',
  description: 'CarCulture social integration with Neynar',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}>
          {children}
        </PrivyProvider>
      </body>
    </html>
  );
} 