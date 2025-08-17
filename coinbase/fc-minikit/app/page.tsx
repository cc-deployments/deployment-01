import { redirect } from 'next/navigation';

export default function Home() {
  // Build command updated in Vercel
  // TEMPORARILY DISABLED: OnchainKit dependency issue - 2025-08-16
  // Ready for Vercel deployment - 2025-08-16
  redirect('/gallery-hero');
  return null;
}
