"use client";

import { useEffect, useState } from 'react';

interface ShareOptions {
  title: string;
  text: string;
  url: string;
}

export default function ImprovedShareHandler() {
  const [shareSupported, setShareSupported] = useState(false);
  const [clipboardSupported, setClipboardSupported] = useState(false);

  useEffect(() => {
    // Check for Web Share API support
    setShareSupported(!!navigator.share);
    
    // Check for Clipboard API support
    setClipboardSupported(!!navigator.clipboard && !!navigator.clipboard.writeText);
    
    console.log('📱 Share capabilities:', {
      webShare: !!navigator.share,
      clipboard: !!navigator.clipboard?.writeText
    });
  }, []);

  const shareContent = async (options: ShareOptions) => {
    try {
      // Try Web Share API first (mobile-friendly) - but skip in iframe environments
      if (shareSupported && window.self === window.top) {
        await navigator.share(options);
        console.log('✅ Shared via Web Share API');
        return { success: true, method: 'web-share' };
      } else if (shareSupported && window.self !== window.top) {
        console.log('⚠️ Web Share API blocked in iframe, using clipboard...');
      }
      
      // Fallback to clipboard
      if (clipboardSupported) {
        const shareText = `${options.text}\n\n${options.url}`;
        await navigator.clipboard.writeText(shareText);
        console.log('✅ Copied to clipboard via Clipboard API');
        return { success: true, method: 'clipboard' };
      }
      
      // Final fallback for older browsers
      const shareText = `${options.text}\n\n${options.url}`;
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        console.log('✅ Copied to clipboard via execCommand');
        return { success: true, method: 'exec-command' };
      }
      
      throw new Error('All share methods failed');
      
    } catch (error) {
      console.error('❌ Share failed:', error);
      return { 
        success: false, 
        error: error.message,
        fallback: options.url 
      };
    }
  };

  const showShareFeedback = (result: any) => {
    if (result.success) {
      const messages = {
        'web-share': 'Shared successfully! 🚗✨',
        'clipboard': 'Link copied to clipboard! Share this mini app in your Farcaster cast! 🚗✨',
        'exec-command': 'Link copied to clipboard!'
      };
      alert(messages[result.method] || 'Shared successfully!');
    } else {
      alert(`Share failed. Please copy manually: ${result.fallback}`);
    }
  };

  // Export share function for use in other components
  const shareCarMania = async () => {
    const result = await shareContent({
      title: 'CarMania Gallery',
      text: 'Check out CarMania Gallery - an amazing car collection mini app! 🚗✨',
      url: window.location.href
    });
    showShareFeedback(result);
    return result;
  };

  const shareCarManiaGarage = async () => {
    const result = await shareContent({
      title: 'CarMania Garage',
      text: 'Check out CarMania Garage!',
      url: window.location.href
    });
    showShareFeedback(result);
    return result;
  };

  // Make functions available globally for other components
  useEffect(() => {
    (window as any).shareCarMania = shareCarMania;
    (window as any).shareCarManiaGarage = shareCarManiaGarage;
  }, []);

  return null;
}
