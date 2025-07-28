# Question for BASE AI: Mobile Touch/Swipe Not Working

## Issue
Our Farcaster Mini App swipe navigation works on desktop but fails on mobile devices.

## Current Implementation
```javascript
// Using react-swipeable for touch handling
import { useSwipeable } from 'react-swipeable';

const handlers = useSwipeable({
  onSwipedUp: async () => {
    console.log('⬆️ Swipe up detected - navigating to gallery-hero-2');
    try {
      console.log('🌐 Using openUrl for navigation');
      openUrl('/gallery-hero-2');
    } catch (error) {
      console.error('Navigation error:', error);
      openUrl('/gallery-hero-2');
    }
  },
  onSwipedDown: async () => {
    console.log('⬇️ Swipe down detected');
    // Handle swipe down
  },
});

// Applied to container div
<div {...handlers} className="gallery-hero-container">
```

## Environment Details
- **Framework**: Next.js 15.3.4 with App Router
- **Mini App Library**: MiniKit (`@coinbase/onchainkit/minikit`)
- **Touch Library**: `react-swipeable`
- **Deployment**: Vercel
- **Mobile Testing**: iOS/Android via QR code

## Behavior
- ✅ **Desktop**: Swipe navigation works with mouse/keyboard
- ❌ **Mobile**: Swipe gestures do not respond to touch
- ✅ **Buttons**: Work on both desktop and mobile
- ✅ **App loads**: Successfully on mobile

## Questions for BASE AI
1. **Mobile Touch Issue**: Why does `react-swipeable` work on desktop but not mobile?
2. **MiniKit Compatibility**: Are there known conflicts between MiniKit and touch libraries?
3. **Touch Event Handling**: Do we need additional touch event handling for mobile?
4. **Alternative Approach**: Should we use a different touch library or MiniKit's built-in navigation?

**What's the correct approach for mobile-compatible swipe navigation in Farcaster Mini Apps?** 