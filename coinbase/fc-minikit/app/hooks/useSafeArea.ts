import { useState, useEffect } from 'react';

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
        console.log('🔍 Getting safe area insets using MiniKit approach...');
        
        // Use MiniKit's environment detection instead of direct SDK calls
        // For now, use default safe areas that work well across devices
        const defaultSafeArea = {
          top: 44, // iPhone status bar + notch area
          bottom: 34, // iPhone home indicator
          left: 0,
          right: 0
        };
        
        console.log('✅ Using default safe area insets:', defaultSafeArea);
        setSafeArea(defaultSafeArea);
        
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
        console.log('✅ Safe area loading complete');
        setIsLoading(false);
      }
    };
    
    // Add a small delay to ensure proper initialization
    const timer = setTimeout(() => {
      getSafeArea();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return { safeArea, isLoading };
} 