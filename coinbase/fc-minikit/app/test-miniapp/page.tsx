import { redirect } from 'next/navigation';

export default function TestMiniapp() {
  // Test miniapp entry point
  // This provides a complete miniapp experience with StableLink gallery
  
  redirect('/gallery-hero-test');
  return null;
}
