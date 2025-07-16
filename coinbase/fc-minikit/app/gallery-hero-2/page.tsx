"use client";
import { useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSwipeable } from 'react-swipeable';

export default function GalleryHero2() {
  const router = useRouter();
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedUp: () => router.push('/text-page'),
    onSwipedDown: () => router.push('/gallery-hero'),
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
        width: '1260px',
        height: '2400px',
        margin: '0 auto',
        background: 'transparent',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        border: '1px solid #ccc',
        borderRadius: '8px',
        cursor: 'pointer',
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