"use client";

import { useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export default function EmbedHandler() {

  useEffect(() => {
    const checkEmbedContext = async () => {
      try {
        const context = await sdk.context;
        console.log('🔍 Checking embed context:', context);
        
        if (context?.location?.type === 'cast_embed') {
          console.log('🎯 Cast embed detected!');
          
          // Log embed details
          console.log('📝 Cast text:', context.location.cast?.text);
          console.log('👤 Cast author:', context.location.cast?.author);
          console.log('🔗 Embed URL:', context.location.embed);
        } else {
          console.log('📍 Not in cast embed context. Location type:', context?.location?.type);
        }
      } catch (error) {
        console.error('❌ Error checking embed context:', error);
      }
    };

    checkEmbedContext();
  }, []);

  // This component doesn't render anything visible
  // It just handles embed context detection
  return null;
} 