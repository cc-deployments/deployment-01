"use client";
import { useEffect, useState } from 'react';
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
  const [isLocalhost, setIsLocalhost] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      setIsLocalhost(true);
    }
  }, []);

  return (
    <div {...handlers} style={{
      width: '100%',
      maxWidth: isLocalhost ? 600 : 1260,
      height: isLocalhost ? 1200 : 2400,
      margin: '0 auto',
      background: 'transparent',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      ...(isLocalhost && {
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        border: '1px solid #ccc',
        borderRadius: '8px',
      }),
    }}>
      {/* Social Identity Nav Link */}
      <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 10 }}>
        <Link href="/coinbase/socialidentity">
          <button style={{ padding: '10px 20px', borderRadius: 8, background: '#a32428', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            Social Identity
          </button>
        </Link>
      </div>
      <div style={{ width: '100%', position: 'relative' }}>
        <Image
          src="/carmania-gallery-hero.png"
          alt="CarMania Gallery Hero"
          width={1260}
          height={2150}
          style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
          priority
        />
      </div>
      {/* Transparent area at bottom (optional for buttons, etc.) */}
    </div>
  );
} 