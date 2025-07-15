"use client";
import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';

export default function GalleryHero2() {
  const router = useRouter();
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  // Responsive container logic
  const [isLocalhost, setIsLocalhost] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      setIsLocalhost(true);
    }
  }, []);

  // Swipe up handler
  const handlers = useSwipeable({
    onSwipedUp: () => router.push('/text-page'),
    trackTouch: true,
  });

  // Tap handler
  const handleTap = () => {
    window.open('https://app.manifold.xyz/c/man-driving-car', '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      {...handlers}
      onClick={handleTap}
      role="button"
      tabIndex={0}
      aria-label="Open Car of the Day mint page"
      onKeyPress={e => {
        if (e.key === 'Enter' || e.key === ' ') handleTap();
      }}
      style={{
        width: '100%',
        maxWidth: isLocalhost ? 600 : 1260,
        height: isLocalhost ? 1200 : 2400,
        position: 'relative',
        margin: '0 auto',
        background: 'transparent',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        ...(isLocalhost && {
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }),
      }}
    >
      <Image
        src="/carmania-gallery-hero-2.png"
        alt="CarMania Gallery Hero 2"
        width={1260}
        height={2400}
        style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
        priority
      />
    </div>
  );
} 