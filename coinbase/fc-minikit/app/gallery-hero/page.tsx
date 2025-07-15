"use client";
import { useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function GalleryHero() {
  const router = useRouter();
  useEffect(() => {
    sdk.actions.ready();
  }, []);
  const handlers = useSwipeable({
    onSwipedUp: () => router.push('/gallery-hero-2'),
    trackTouch: true,
  });

  // Responsive container logic

  return (
    <div {...handlers} style={{
      width: '1260px',
      height: '2400px',
      margin: '0 auto',
      background: 'transparent',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      border: '1px solid #ccc',
      borderRadius: '8px',
    }}>
      {/* Social Identity Nav Link */}
      <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 10 }}>
        <Link href="/coinbase/socialidentity">
          <button style={{ padding: '10px 20px', borderRadius: 8, background: '#a32428', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            Social Identity
          </button>
        </Link>
      </div>
      {/* Main image with new art including Share button and Unlock the Ride button components */}
      <div style={{ width: '1260px', height: '2400px', position: 'relative' }}>
        <Image
          src="/carmania-gallery-hero.png"
          alt="CarMania Gallery Hero"
          width={1260}
          height={2400}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          priority
        />
      </div>
    </div>
  );
} 