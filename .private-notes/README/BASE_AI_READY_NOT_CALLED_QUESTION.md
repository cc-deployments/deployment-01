# Question for BASE AI: "Ready not called" Warning in Farcaster Preview Tool

## The Problem
We've successfully migrated from dual SDK (Farcaster SDK + MiniKit) to MiniKit-only architecture as recommended. However, when testing in Farcaster's Preview Tool, we get this warning:

**"Ready not called"**
> "Your app hasn't called `sdk.actions.ready()` yet. This may cause the splash screen to persist."

## Our Current Implementation
We're using MiniKit with this setup:
```tsx
const { context, isFrameReady, setFrameReady } = useMiniKit();

useEffect(() => {
  if (!isFrameReady && context) {
    console.log('📱 Setting frame ready with disableNativeGestures to prevent conflicts');
    setFrameReady({ disableNativeGestures: true });
  }
}, [isFrameReady, setFrameReady, context]);
```

## The Question
**How do we properly signal "ready" to Farcaster when using MiniKit-only architecture?**

### Options we're considering:
1. **Add `sdk.actions.ready()` call** - But we removed the Farcaster SDK
2. **Use MiniKit's built-in ready signal** - Does `setFrameReady()` handle this?
3. **Hybrid approach** - Keep minimal Farcaster SDK just for ready signal
4. **Different MiniKit method** - Is there a MiniKit equivalent to `sdk.actions.ready()`?

## Context
- We're using MiniKit-only as recommended by your documentation
- The app loads and renders correctly
- Navigation and functionality work
- But Farcaster shows "Ready not called" warning
- This may affect splash screen behavior

## What's the recommended approach for properly signaling readiness to Farcaster when using MiniKit-only architecture?

---

**Goal**: Eliminate the "Ready not called" warning while maintaining the clean MiniKit-only approach. 