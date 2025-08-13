# MiniKit Troubleshooting Guide

## Common Issues & Solutions

### 1. Runtime Error: "useMiniKit must be used within a MiniKitProvider"

**Problem:** Components using `useMiniKit()` fail with provider error.

**Solution:** Always provide MiniKitProvider, never conditionally wrap:
```tsx
// ✅ CORRECT - Always provide provider
export function Providers(props: { children: ReactNode }) {
  return (
    <MiniKitProvider apiKey={process.env.NEXT_PUBLIC_CDP_CLIENT_API_KEY} chain={baseChain}>
      {props.children}
    </MiniKitProvider>
  );
}

// ❌ WRONG - Conditional provider breaks useMiniKit()
if (isMiniApp) {
  return <MiniKitProvider>{props.children}</MiniKitProvider>;
}
return <>{props.children}</>;
```

### 2. 401 Unauthorized Errors from cca-lite.coinbase.com

**Problem:** Console shows 401 errors from `POST https://cca-lite.coinbase.com/metrics`

**Solution:** These are **expected** in desktop browsers. The MiniKit SDK tries to send metrics even in desktop environments.

**Expected Behavior:**
- ✅ **Desktop browsers**: 401 errors in console (normal, won't break functionality)
- ✅ **Mini App environment**: No 401 errors, proper authentication

### 3. MiniKit Context is False on Desktop

**Problem:** `context` is `false` when testing in desktop browsers.

**Solution:** This is **by design**. Use proper context checking:
```tsx
const { context } = useMiniKit();

// Check if actually in mini app environment
const isInMiniApp = context?.user?.fid !== undefined;

if (isInMiniApp) {
  // Mini app specific code
} else {
  // Desktop fallback code
}
```

### 4. useEffect Pattern for setFrameReady

**Correct Pattern:**
```tsx
const { setFrameReady, isFrameReady, context } = useMiniKit();

useEffect(() => {
  if (!isFrameReady) {
    setFrameReady();
  }
}, [setFrameReady, isFrameReady]);
```

## Environment Detection

### Desktop vs Mini App Detection:
```tsx
// Method 1: Check context
const isInMiniApp = context?.user?.fid !== undefined;

// Method 2: Check URL
const isInMiniApp = window.location.href.includes('farcaster.app') || 
                   window.location.href.includes('warpcast.com');

// Method 3: Check user agent
const isInMiniApp = window.navigator.userAgent.includes('Farcaster');
```

## Best Practices

1. **Always provide MiniKitProvider** - never conditionally wrap
2. **Accept 401 errors in desktop** - they're expected behavior
3. **Use context checking for conditional rendering** - not provider wrapping
4. **Follow the exact useEffect pattern** for setFrameReady
5. **Test in both desktop and mini app environments**

## Common Patterns

### Navigation Helper:
```tsx
const navigateTo = useCallback((path: string) => {
  if (context?.user?.fid) {
    // Mini app - use MiniKit navigation
    openUrl(path);
  } else {
    // Desktop - use Next.js router
    router.push(path);
  }
}, [context, openUrl, router]);
```

### Conditional Rendering:
```tsx
const isInMiniApp = context?.user?.fid !== undefined;

return (
  <div>
    {isInMiniApp ? (
      <MiniAppSpecificComponent />
    ) : (
      <DesktopFallbackComponent />
    )}
  </div>
);
``` 