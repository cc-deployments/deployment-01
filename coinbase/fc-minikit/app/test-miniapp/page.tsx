import { redirect } from 'next/navigation';

export default function TestMiniapp() {
  // Test miniapp entry point - follows same flow as production
  // gallery-hero-test → gallery-hero-2 → text-page-test → StableLink gallery
  
  redirect('/gallery-hero-test');
  return null;
}
