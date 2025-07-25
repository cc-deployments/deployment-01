import { useState, useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export function useSafeArea() {
  const [safeArea, setSafeArea] = useState<SafeAreaInsets>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSafeArea = async () => {
      try {
        console.log('🔍 Getting safe area insets...');
        const context = await sdk.context;
        
        if (context?.client?.safeAreaInsets) {
          console.log('✅ Safe area insets found:', context.client.safeAreaInsets);
          setSafeArea(context.client.safeAreaInsets);
        } else {
          console.log('⚠️ No safe area insets found, using defaults');
          // Default safe areas for common devices
          setSafeArea({
            top: 44, // iPhone status bar + notch area
            bottom: 34, // iPhone home indicator
            left: 0,
            right: 0
          });
        }
      } catch (error) {
        console.error('❌ Error getting safe area:', error);
        // Fallback to default safe areas
        setSafeArea({
          top: 44,
          bottom: 34,
          left: 0,
          right: 0
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    getSafeArea();
  }, []);

  return { safeArea, isLoading };
} 