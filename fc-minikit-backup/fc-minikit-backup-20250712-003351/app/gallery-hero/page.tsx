"use client";
import { useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ShareArrow from '../components/ShareArrow';
import PrivyLogin from '../components/PrivyLogin';

export default function GalleryHero() {
  const router = useRouter();
  useEffect(() => {
    sdk.actions.ready();
  }, []);
  const handlers = useSwipeable({
    onSwipedUp: () => router.push('/gallery-hero-2'),
    trackTouch: true,
  });

  return (
    <div
      style={{
        width: '100%',
        maxWidth: isLocalhost ? '600px' : '1260px',
        height: isLocalhost ? '1200px' : '2400px',
        margin: '0 auto',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        ...(isLocalhost && {
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }),
      }}
    >
      <div className="image-area">
        <Image
          src="/carmania-gallery-hero.png"
          alt="CarMania Gallery Hero"
          width={1260}
          height={2200}
          style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block', maxHeight: isLocalhost ? '600px' : '2200px' }}
          priority
        />
      </div>
      <div
        style={{
          width: isLocalhost ? '420px' : '1260px',
          height: '200px',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Uncomment if ShareArrow is used: <ShareArrow onClick={handleShare} /> */}
      </div>
    </div>
  );
} 