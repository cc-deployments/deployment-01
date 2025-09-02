"use client";

import { useEffect } from 'react';

export default function DebugBannerRemover() {
  useEffect(() => {
    // Remove MiniKit debug banner if it exists
    const removeDebugBanner = () => {
      // Look for common debug banner selectors
      const debugSelectors = [
        '[data-testid="minikit-debug"]',
        '.minikit-debug',
        '.debug-banner',
        '[class*="debug"]',
        '[class*="Debug"]'
      ];

      debugSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          // Check if element contains debug text
          const text = element.textContent || '';
          if (text.includes('MiniKit Debug') || 
              text.includes('Context:') || 
              text.includes('Frame:') || 
              text.includes('Env:')) {
            console.log('🗑️ Removing debug banner:', element);
            element.remove();
          }
        });
      });

      // Also check for any elements with debug text content
      const allElements = document.querySelectorAll('*');
      allElements.forEach(element => {
        const text = element.textContent || '';
        if (text.includes('MiniKit Debug: Context: ✅ TRUE Frame: ✅ READY Env: 📱 MINI APP')) {
          console.log('🗑️ Removing debug banner by text content:', element);
          element.remove();
        }
      });
    };

    // Remove immediately
    removeDebugBanner();

    // Set up observer to remove any dynamically added debug banners
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const text = element.textContent || '';
            
            // Check if the added element is a debug banner
            if (text.includes('MiniKit Debug') || 
                text.includes('Context:') || 
                text.includes('Frame:') || 
                text.includes('Env:')) {
              console.log('🗑️ Removing dynamically added debug banner:', element);
              element.remove();
            }

            // Also check child elements
            const debugElements = element.querySelectorAll('*');
            debugElements.forEach(child => {
              const childText = child.textContent || '';
              if (childText.includes('MiniKit Debug') || 
                  childText.includes('Context:') || 
                  childText.includes('Frame:') || 
                  childText.includes('Env:')) {
                console.log('🗑️ Removing child debug banner:', child);
                child.remove();
              }
            });
          }
        });
      });
    });

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
