import { redirect } from 'next/navigation';

export default function HomeTest() {
  // Test miniapp that redirects to StableLink gallery flow
  // This keeps production unchanged while providing test functionality
  
  redirect('/gallery-hero-test');
  return null;
}
