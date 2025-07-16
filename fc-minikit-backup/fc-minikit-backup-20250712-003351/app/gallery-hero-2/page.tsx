"use client";
import { useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import Image from 'next/image';

export default function GalleryHero2() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <div
      style={{
        width: 1260,
        height: 2400,
        position: 'relative',
        margin: '0 auto',
        background: 'transparent',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Image
        src="/carmania-gallery-hero-2.png"
        alt="CarMania Gallery Hero 2"
        width={1260}
        height={2400}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        priority
      />
    </div>
  );
} 