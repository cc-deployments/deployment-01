import { redirect } from 'next/navigation';

export default function Home() {
  // Build command updated in Vercel
  // TEMPORARILY DISABLED: OnchainKit dependency issue - 2025-08-16
  // Ready for Vercel deployment - 2025-08-16
  
  // IMPORTANT: This is a server component that redirects immediately
  // The splash screen timing is handled by the Farcaster app itself
  // We don't need to call sdk.actions.ready() here - it's handled in gallery-hero
  redirect('/gallery-hero');
  return null;
}
