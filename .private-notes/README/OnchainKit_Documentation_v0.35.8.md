# OnchainKit Documentation v0.35.8

**Source:** [GitHub - fakepixels/md-generator](https://github.com/fakepixels/md-generator/blob/master/combined-ock-docs-0.35.8.mdx)  
**Version:** 0.35.8  
**Date Added:** 2025-01-27  
**Purpose:** Resolve current OnchainKit integration issues and prepare for reconnection

---

## 🎯 **CURRENT INTEGRATION STATUS**

### **Temporarily Disabled Components:**
- ✅ **MiniKitProvider** - Commented out due to frame-sdk import error
- ✅ **useMiniKit() hooks** - Disabled in all components
- ✅ **CSS imports** - OnchainKit styles temporarily removed
- ✅ **Context dependencies** - All context usage commented out

### **Waiting For:**
- ⏳ **BASE team npm release** - frame-sdk fix committed but not published
- ⏳ **Version 0.38.20+** - Expected to resolve current import errors
- ⏳ **Build success** - Restore full OnchainKit functionality

---

## 🚀 **ONCHAINKIT CORE CONCEPTS**

### **MiniKit Architecture:**
```typescript
// Core provider setup
import { MiniKitProvider } from '@coinbase/onchainkit/minikit'

// Provider configuration
<MiniKitProvider>
  <YourApp />
</MiniKitProvider>
```

### **useMiniKit Hook:**
```typescript
import { useMiniKit } from '@coinbase/onchainkit/minikit'

// Basic usage
const { context, isReady } = useMiniKit()

// Context provides:
// - client: Farcaster client instance
// - clientFid: User's Farcaster ID
// - isInMiniApp: Environment detection
```

### **Frame Ready State:**
```typescript
// Set frame ready for Mini App
const { setFrameReady } = useMiniKit()

useEffect(() => {
  setFrameReady({ disableNativeGestures: true })
}, [setFrameReady])
```

---

## 🔧 **INTEGRATION PATTERNS**

### **1. Environment Detection:**
```typescript
// Recommended pattern (Base App compatible)
const { context } = useMiniKit()
const isInMiniApp = context !== null

// Alternative pattern
const { isInMiniApp } = useMiniKit()
```

### **2. Button Integration:**
```typescript
// Mini App button with proper styling
import '@coinbase/onchainkit/styles.css'

// Button component
<button 
  onClick={handleAction}
  className="ock-button"
>
  Action
</button>
```

### **3. Navigation Handling:**
```typescript
// External URL navigation
const handleExternalLink = (url: string) => {
  if (isInMiniApp) {
    // Use Mini App navigation
    window.open(url, '_blank')
  } else {
    // Fallback for web
    window.location.href = url
  }
}
```

---

## 🚨 **CURRENT ISSUES & SOLUTIONS**

### **Frame-sdk Import Error:**
```bash
# Error: Cannot resolve '@farcaster/frame-sdk'
# Solution: Wait for BASE team npm release
# Status: Fixed in source code, pending npm publish
```

### **Build Failures:**
```bash
# Issue: Webpack compilation errors
# Root Cause: frame-sdk dependency resolution
# Temporary Fix: Comment out OnchainKit components
# Permanent Fix: Update to v0.38.20+ when available
```

### **Context Detection:**
```typescript
// Current workaround
const { context } = useMiniKit()
const isInMiniApp = context !== null

// When OnchainKit is re-enabled
const { isInMiniApp } = useMiniKit()
```

---

## 📱 **MINI APP INTEGRATION**

### **Splash Screen:**
```typescript
// Immediate splash dismissal
useEffect(() => {
  const dismissSplash = async () => {
    try {
      await sdk.actions.ready({ disableNativeGestures: true })
      console.log('✅ Splash screen dismissed')
    } catch (error) {
      console.error('❌ Splash dismissal error:', error)
    }
  }
  dismissSplash()
}, [])
```

### **Gesture Handling:**
```typescript
// Swipe navigation with Mini App context
const { isInMiniApp } = useMiniKit()

const handleSwipe = (direction: 'left' | 'right') => {
  if (isInMiniApp) {
    // Mini App specific navigation
    navigateToPage(direction)
  } else {
    // Web fallback
    handleWebNavigation(direction)
  }
}
```

### **Button Functionality:**
```typescript
// UNLOCK button with Mini App integration
const handleUnlock = async () => {
  if (isInMiniApp) {
    // Mini App specific action
    await sdk.actions.ready()
    // Perform unlock logic
  } else {
    // Web fallback
    console.log('Web unlock action')
  }
}
```

---

## 🔄 **RECONNECTION WORKFLOW**

### **Phase 1: Verify Fix Available**
```bash
# Check npm for new version
npm view @coinbase/onchainkit version

# Expected: 0.38.20 or higher
# Current: 0.38.19 (without frame-sdk fix)
```

### **Phase 2: Update Package**
```bash
# When new version is available
npm update @coinbase/onchainkit

# Verify installation
npm list @coinbase/onchainkit
```

### **Phase 3: Re-enable Components**
```typescript
// 1. Uncomment MiniKitProvider in providers.tsx
import { MiniKitProvider } from '@coinbase/onchainkit/minikit'

// 2. Uncomment CSS import in layout.tsx
import '@coinbase/onchainkit/styles.css'

// 3. Uncomment useMiniKit hooks in all components
const { context, isReady } = useMiniKit()

// 4. Restore context dependencies
useEffect(() => {
  // Context-dependent logic
}, [context])
```

### **Phase 4: Test & Deploy**
```bash
# Local testing
npm run dev
npm run build

# Deploy to production
git add .
git commit -m "Re-enable OnchainKit integration"
git push
```

---

## 📋 **COMPONENT CHECKLIST**

### **Files to Update:**
- [ ] `app/providers.tsx` - MiniKitProvider wrapper
- [ ] `app/layout.tsx` - CSS import
- [ ] `app/components/EmbedHandler.tsx` - useMiniKit hook
- [ ] `app/components/ShareHandler.tsx` - useMiniKit hook
- [ ] `app/gallery-hero/page.tsx` - useMiniKit hook
- [ ] `app/gallery-hero-2/page.tsx` - useMiniKit hook
- [ ] `app/text-page/page.tsx` - useMiniKit hook
- [ ] `app/manifold-gallery/page.tsx` - useMiniKit hook

### **Search Patterns:**
```bash
# Find all commented OnchainKit code
grep -r "// import.*@coinbase/onchainkit" .
grep -r "// const.*useMiniKit" .
grep -r "TEMPORARILY DISABLED: OnchainKit" .
```

---

## 🎯 **PERFORMANCE OPTIMIZATION**

### **Lazy Loading:**
```typescript
// Lazy load OnchainKit components
const MiniKitProvider = lazy(() => import('@coinbase/onchainkit/minikit'))

// Suspense wrapper
<Suspense fallback={<LoadingSpinner />}>
  <MiniKitProvider>
    <YourApp />
  </MiniKitProvider>
</Suspense>
```

### **Context Optimization:**
```typescript
// Memoize context-dependent values
const memoizedValue = useMemo(() => {
  return context ? expensiveCalculation(context) : null
}, [context])
```

### **Bundle Analysis:**
```bash
# Analyze bundle size impact
npm run build
npx @next/bundle-analyzer
```

---

## 🔍 **TROUBLESHOOTING GUIDE**

### **Common Errors:**
1. **"Cannot resolve '@farcaster/frame-sdk'"**
   - **Cause:** NPM package not updated
   - **Solution:** Wait for BASE team release

2. **"useMiniKit is not a function"**
   - **Cause:** Import path incorrect
   - **Solution:** Use `@coinbase/onchainkit/minikit`

3. **"Context is undefined"**
   - **Cause:** Provider not wrapping component
   - **Solution:** Ensure MiniKitProvider is active

4. **"Build failed due to webpack errors"**
   - **Cause:** Syntax errors from incomplete commenting
   - **Solution:** Fix all JSX structure issues

### **Debug Commands:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for conflicting packages
npm ls @farcaster/frame-sdk
npm ls @coinbase/onchainkit
```

---

## 📚 **RESOURCES & REFERENCES**

### **Official Documentation:**
- [OnchainKit GitHub](https://github.com/coinbase/onchainkit)
- [Base App Documentation](https://docs.base.org/)
- [Farcaster Mini Apps](https://miniapps.farcaster.xyz/)

### **Community Resources:**
- [Base Discord](https://discord.gg/buildonbase)
- [Farcaster Discord](https://discord.gg/farcaster)
- [Coinbase Developer Community](https://developers.coinbase.com/)

### **Related Files:**
- `ONCHAINKIT_RECONNECTION_CHECKLIST.md` - Current reconnection status
- `MINIKIT_SETUP.md` - Setup and configuration
- `MINIKIT_TROUBLESHOOTING.md` - Common issues and solutions

---

## 🚀 **NEXT STEPS**

### **Immediate Actions:**
1. **Monitor npm releases** - Check daily for v0.38.20+
2. **Prepare reconnection code** - Review all commented components
3. **Test local builds** - Ensure no syntax errors remain

### **When Fix is Available:**
1. **Update package** - `npm update @coinbase/onchainkit`
2. **Re-enable components** - Uncomment all OnchainKit code
3. **Test functionality** - Verify Mini App features work
4. **Deploy to production** - Release fully functional app

### **Future Enhancements:**
1. **Performance optimization** - Bundle analysis and lazy loading
2. **Advanced features** - Enhanced gesture handling and animations
3. **Cross-platform testing** - Ensure compatibility across devices

---

**Status:** Ready for OnchainKit reconnection when npm package is updated  
**Last Updated:** 2025-01-27  
**Next Review:** After BASE team releases v0.38.20+ with frame-sdk fix
