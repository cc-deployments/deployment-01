"use client";

import { useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';

export default function EmbedHandler() {
  const { context } = useMiniKit();

  useEffect(() => {
    const checkEmbedContext = async () => {
      try {
        console.log('🔍 Checking embed context:', context);
        
        if (context?.location?.type === 'cast_embed') {
          console.log('🎯 Cast embed detected!');
          
          // Log embed details
          console.log('📝 Cast content:', context.location.cast);
          console.log('👤 Cast author:', context.location.cast?.author);
          console.log('🔗 Embed URL:', context.location.embed);
        } else {
          console.log('📍 Not in cast embed context. Location type:', context?.location?.type);
        }
      } catch (error) {
        console.error('❌ Error checking embed context:', error);
      }
    };

    if (context) {
      checkEmbedContext();
    }
  }, [context]);

  // This component doesn't render anything visible
  // It just handles embed context detection
  return null;
} 