"use client";
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export default function ManifoldGallery() {
  const router = useRouter();

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        console.log('Checking if in Mini App environment...');
        const isInMiniApp = await sdk.isInMiniApp();
        console.log('Is in Mini App:', isInMiniApp);
        
        if (isInMiniApp) {
          console.log('Calling sdk.actions.ready()...');
          await sdk.actions.ready();
          console.log('sdk.actions.ready() called successfully');
        } else {
          console.log('Not in Mini App environment, skipping ready() call');
        }
      } catch (error) {
        console.error('Error initializing SDK:', error);
      }
    };
    
    initializeSDK();
  }, []);

  const handlers = useSwipeable({
    onSwipedUp: () => {
      window.open('https://app.manifold.xyz/c/carculture', '_blank', 'noopener,noreferrer');
    },
    onSwipedDown: () => router.push('/text-page'),
    trackTouch: true,
  });

  return (
    <>
      <div
        {...handlers}
        style={{
          width: 1260,
          minHeight: 800,
          maxWidth: '100vw',
          margin: "0 auto",
          background: "transparent",
          overflowY: "auto",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: '100vh',
        }}
      >
      <iframe
        src="https://manifold.xyz/@carculture"
        title="CarCulture Manifold Gallery"
        width={1260}
        style={{ border: "none", width: "100%", minHeight: 1200, height: '100vh' }}
        allowFullScreen
      />
    </div>
    </>
  );
} 