"use client";

import { useState, useEffect } from 'react';

// Custom hook to replace useMiniKit functionality
export function useFarcasterSDK() {
  const [isFrameReady, setIsFrameReady] = useState(false);
  const [context, setContext] = useState<any>(null);

  // Simulate frame ready state
  useEffect(() => {
    // Set frame as ready after a short delay to simulate MiniKit behavior
    const timer = setTimeout(() => {
      setIsFrameReady(true);
      console.log('✅ Frame ready state set');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Function to set frame ready (replaces setFrameReady)
  const setFrameReady = (options?: { disableNativeGestures?: boolean }) => {
    console.log('🎯 Setting frame ready with options:', options);
    setIsFrameReady(true);
    
    if (options?.disableNativeGestures) {
      console.log('🚫 Native gestures disabled');
    }
  };

  // Function to open URL (replaces context.openUrl)
  const openUrl = (url: string) => {
    console.log('🔗 Opening URL:', url);
    window.open(url, '_blank');
  };

  // Function to share content (replaces context.share)
  const share = (data: any) => {
    console.log('📤 Sharing data:', data);
    if (navigator.share) {
      navigator.share(data);
    } else {
      console.log('📋 Share API not available, copying to clipboard');
      // Fallback to clipboard
      navigator.clipboard.writeText(data.url || data.text || JSON.stringify(data));
    }
  };

  // Function to show notification (replaces context.showNotification)
  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    console.log(`🔔 ${type.toUpperCase()}: ${message}`);
    // You can implement a toast notification system here
  };

  return {
    isFrameReady,
    setFrameReady,
    context: {
      openUrl,
      share,
      showNotification,
      // Add other context methods as needed
    },
    // Direct methods for convenience
    openUrl,
    share,
    showNotification,
  };
}
