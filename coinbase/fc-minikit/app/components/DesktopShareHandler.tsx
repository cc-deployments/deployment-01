"use client";

import { useEffect } from 'react';

export default function DesktopShareHandler() {
  useEffect(() => {
    // Enhanced share function that works on all platforms
    const enhancedShare = async (options: {
      title: string;
      text: string;
      url: string;
    }) => {
      console.log('🔄 Attempting to share:', options);
      
      try {
        // Method 1: Try Web Share API (mobile only)
        if (navigator.share && typeof navigator.share === 'function') {
          console.log('📱 Trying Web Share API...');
          await navigator.share(options);
          console.log('✅ Shared via Web Share API');
          alert('Shared successfully! 🚗✨');
          return { success: true, method: 'web-share' };
        }
        
        // Method 2: Try Clipboard API (modern browsers)
        if (navigator.clipboard && navigator.clipboard.writeText) {
          console.log('📋 Trying Clipboard API...');
          const shareText = `${options.text}\n\n${options.url}`;
          await navigator.clipboard.writeText(shareText);
          console.log('✅ Copied to clipboard via Clipboard API');
          alert('Link copied to clipboard! Share this mini app in your Farcaster cast! 🚗✨');
          return { success: true, method: 'clipboard' };
        }
        
        // Method 3: Fallback to execCommand (older browsers)
        console.log('🔧 Trying execCommand fallback...');
        const shareText = `${options.text}\n\n${options.url}`;
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.style.opacity = '0';
        textArea.style.pointerEvents = 'none';
        textArea.setAttribute('readonly', '');
        
        document.body.appendChild(textArea);
        
        // Select and copy
        textArea.select();
        textArea.setSelectionRange(0, 99999); // For mobile devices
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          console.log('✅ Copied to clipboard via execCommand');
          alert('Link copied to clipboard! Share this mini app in your Farcaster cast! 🚗✨');
          return { success: true, method: 'exec-command' };
        }
        
        // Method 4: Show URL for manual copying
        console.log('⚠️ All automatic methods failed, showing manual copy option');
        const manualCopy = confirm(
          `Share failed automatically. Would you like to copy the link manually?\n\n${options.url}`
        );
        
        if (manualCopy) {
          // Try one more time with a different approach
          const input = document.createElement('input');
          input.value = options.url;
          input.style.position = 'fixed';
          input.style.left = '-999999px';
          input.style.top = '-999999px';
          document.body.appendChild(input);
          input.select();
          const copied = document.execCommand('copy');
          document.body.removeChild(input);
          
          if (copied) {
            alert('Link copied to clipboard!');
            return { success: true, method: 'manual-copy' };
          }
        }
        
        throw new Error('All share methods failed');
        
      } catch (error) {
        console.error('❌ Share failed:', error);
        
        // Final fallback - show the URL
        alert(`Share failed. Please copy this link manually:\n\n${options.url}`);
        return { 
          success: false, 
          error: error.message,
          fallback: options.url 
        };
      }
    };

    // CarMania specific share functions
    const shareCarMania = async () => {
      return await enhancedShare({
        title: 'CarMania Gallery',
        text: 'Check out CarMania Gallery - an amazing car collection mini app! 🚗✨',
        url: window.location.href
      });
    };

    const shareCarManiaGarage = async () => {
      return await enhancedShare({
        title: 'CarMania Garage',
        text: 'Check out CarMania Garage!',
        url: window.location.href
      });
    };

    // Make functions available globally
    (window as any).shareCarMania = shareCarMania;
    (window as any).shareCarManiaGarage = shareCarManiaGarage;
    (window as any).enhancedShare = enhancedShare;

    // Log browser capabilities for debugging
    console.log('🔍 Browser share capabilities:', {
      webShare: !!navigator.share,
      clipboard: !!navigator.clipboard?.writeText,
      execCommand: !!document.execCommand,
      userAgent: navigator.userAgent,
      platform: navigator.platform
    });

  }, []);

  return null;
}
