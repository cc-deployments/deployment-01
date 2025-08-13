import { redirect } from 'next/navigation';

export default function Home() {
  // Build command updated in Vercel
  redirect('/gallery-hero');
  return null;
}
