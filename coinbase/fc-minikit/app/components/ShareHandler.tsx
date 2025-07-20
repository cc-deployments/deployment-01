"use client";

import { useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export default function ShareHandler() {
  useEffect(() => {
    const handleCastShare = async () => {
      try {
        const context = await sdk.context;
        
        if (context?.location?.type === 'cast_share') {
          console.log('🎯 Cast share detected!');
          console.log('📝 Shared cast text:', context.location.cast?.text);
          console.log('👤 Cast author:', context.location.cast?.author);
          console.log('🔗 Cast hash:', context.location.cast?.hash);
          
          // Handle the shared cast - could redirect to a specific page
          // or show content related to the shared cast
          if (context.location.cast?.text) {
            console.log('📋 Processing shared cast content...');
            // You could parse the cast text for keywords, URLs, etc.
            // and customize the app experience based on the shared content
          }
        }
      } catch (error) {
        console.error('❌ Error handling cast share:', error);
      }
    };

    handleCastShare();
  }, []);

  return null;
} 