# Question for BASE AI: Safe Area Hooks and MiniKit Initialization

## Issue Description
Our Farcaster Mini App is stuck in loading state due to safe area hook issues and MiniKit initialization problems.

## Current Implementation

### Safe Area Hook
```tsx
// hooks/useSafeArea.ts
export function useSafeArea() {
  const [safeArea, setSafeArea] = useState<SafeAreaInsets>({
    top: 0, bottom: 0, left: 0, right: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set default safe areas immediately without delay
    const defaultSafeArea = {
      top: 44, // iPhone status bar + notch area
      bottom: 34, // iPhone home indicator
      left: 0, right: 0
    };
    
    console.log('✅ Setting default safe area insets:', defaultSafeArea);
    setSafeArea(defaultSafeArea);
    setIsLoading(false);
  }, []);

  return { safeArea, isLoading };
}
```

### MiniKit Initialization
```tsx
// gallery-hero/page.tsx
const { context, isFrameReady, setFrameReady } = useMiniKit();

useEffect(() => {
  if (!isFrameReady && context) {
    console.log('📱 Setting frame ready with ENABLED native gestures');
    setFrameReady({ disableNativeGestures: false });
  }
}, [isFrameReady, setFrameReady, context]);
```

## Console Output Analysis
```
🎨 GalleryHero component rendering...
🔍 Frame context available: false  // ❌ CONTEXT IS FALSE
📱 Safe area insets: { top: 0, bottom: 0, left: 0, right: 0 }  // ❌ ZERO VALUES
```

## Technical Details
- **Framework**: Next.js 15.3.4 with App Router
- **Mini App Library**: MiniKit (`@coinbase/onchainkit/minikit`)
- **Deployment**: Vercel + Local Development
- **Issue**: Component stuck in loading state, `context` is false

## Questions for BASE AI

### 1. **MiniKit Context Issue**
- **Why is `context` false in MiniKit?**
- **Should `setFrameReady()` be called even when `context` is false?**
- **What's the proper MiniKit initialization sequence?**

### 2. **Safe Area Hook Problems**
- **Is using default safe areas (44/34) the correct approach?**
- **Should we wait for MiniKit context before setting safe areas?**
- **What's the proper way to get device-specific safe areas in Mini Apps?**

### 3. **Loading State Management**
- **Should the component wait for MiniKit context before rendering?**
- **Is the loading state tied to safe area initialization?**
- **What's the correct loading sequence for Mini Apps?**

### 4. **Environment Detection**
- **How to properly detect if we're in a Mini App environment?**
- **Should we handle both web and Mini App contexts?**
- **What's the fallback behavior when not in Mini App?**

## Current Status
- ✅ **Manifest working**: `/.well-known/farcaster.json` accessible
- ✅ **Build successful**: No compilation errors
- ❌ **Context false**: MiniKit context not available
- ❌ **Safe areas zero**: Default values not being set
- ❌ **Loading stuck**: Component not rendering

## Expected Behavior
- **MiniKit context should be available** in Mini App environment
- **Safe areas should be set** to proper device values
- **Component should render** without loading state
- **Navigation should work** with swipe gestures

**What's the correct approach for MiniKit initialization and safe area handling in Farcaster Mini Apps?** 