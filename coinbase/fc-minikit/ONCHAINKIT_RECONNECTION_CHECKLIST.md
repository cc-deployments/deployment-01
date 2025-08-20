# 🔌 OnchainKit Reconnection Checklist

**Date Created:** 2025-08-16  
**Reason:** Temporary disable due to frame-sdk import error  
**Status:** ⏳ WAITING FOR BASE TEAM FIX  
**Last Updated:** 2025-08-18 - Node.js version testing completed  
**Git Hash:** d3c6a9c - Direct Farcaster SDK breakthrough confirmed

---

## 🚫 **TEMPORARILY DISABLED COMPONENTS**

### **1. Core Providers**
- **File:** `app/providers.tsx`
- **Component:** `MiniKitProvider`
- **Action:** Uncomment import and wrapper
- **Lines:** 3, 32-36

### **2. CSS Styles**
- **File:** `app/layout.tsx`
- **Import:** `@coinbase/onchainkit/styles.css`
- **Action:** Uncomment line 3

### **3. MiniKit Hooks**
- **File:** `app/components/EmbedHandler.tsx`
- **Hook:** `useMiniKit()`
- **Action:** Uncomment import and usage
- **Lines:** 3, 7, 15-17

- **File:** `app/components/ShareHandler.tsx`
- **Hook:** `useMiniKit()`
- **Action:** Uncomment import and usage
- **Lines:** 3, 7, 15-17

- **File:** `app/text-page/page.tsx`
- **Hook:** `useMiniKit()`
- **Action:** Uncomment import and usage
- **Lines:** 5, 11

- **File:** `app/gallery-hero/page.tsx`
- **Hook:** `useMiniKit()`
- **Action:** Uncomment import and usage
- **Lines:** 5, 11

- **File:** `app/gallery-hero-2/page.tsx`
- **Hook:** `useMiniKit()`
- **Action:** Uncomment import and usage
- **Lines:** 4, 9

- **File:** `app/manifold-gallery/page.tsx`
- **Hook:** `useMiniKit()`
- **Action:** Uncomment import and usage
- **Lines:** 5, 9

---

## 🔄 **RECONNECTION STEPS**

### **Phase 1: Verify Fix Available**
- [ ] Check if BASE team has released OnchainKit fix
- [ ] Verify frame-sdk import error is resolved
- [ ] Test local build with `npm run build`

### **Phase 2: Re-enable Components**
- [ ] Uncomment all `MiniKitProvider` imports
- [ ] Uncomment all `useMiniKit()` hook usage
- [ ] Uncomment CSS import in layout
- [ ] Restore context dependencies in useEffect arrays

### **Phase 2.5: Restore JSX Structure (CRITICAL)**
- [ ] **Fix providers.tsx:** Replace fragment wrapper with MiniKitProvider
- [ ] **Restore context variables:** Uncomment `context` declarations
- [ ] **Fix variable references:** Uncomment all `context` usage
- [ ] **Verify JSX syntax:** Ensure proper tag nesting

### **Phase 3: Test & Deploy**
- [ ] Test local development server
- [ ] Verify Mini App functionality
- [ ] Commit and push reconnection changes
- [ ] Monitor Vercel deployment

---

## 📝 **SEARCH PATTERNS TO FIND DISABLED CODE**

```bash
# Find all commented OnchainKit imports
grep -r "// import.*@coinbase/onchainkit" .

# Find all commented useMiniKit usage
grep -r "// const.*useMiniKit" .

# Find all TEMPORARILY DISABLED comments
grep -r "TEMPORARILY DISABLED: OnchainKit" .

# Find all commented context references
grep -r "// console.log.*context" .
```

---

## 🔬 **NODE.JS VERSION TESTING RESULTS (2025-08-18)**

### **Compatibility Testing Completed:**
- **Node.js 20.19.1:** ❌ Frame-sdk import error persists
- **Node.js 21.7.3:** ❌ Frame-sdk import error persists (same issue)
- **Node.js 22.18.0:** ❌ Frame-sdk import error persists (still persists)

### **Key Discovery:**
**The frame-sdk import issue is NOT Node.js version compatibility.** It's a fundamental OnchainKit dependency problem that:
- Persists across all Node.js versions (20, 21, 22)
- Is embedded in OnchainKit's compiled code
- Requires a fix from the BASE team in OnchainKit itself

### **Conclusion:**
Node.js upgrade alone will not resolve the OnchainKit issue. We must wait for BASE to fix the frame-sdk dependency in OnchainKit.

### **🎯 BREAKTHROUGH DISCOVERY (2025-08-18):**
**Direct @farcaster/miniapp-sdk import works perfectly!** This reveals:
- ✅ **Farcaster SDK itself is fine** - imports work correctly
- ❌ **OnchainKit has the dependency issue** - wrong import path
- 🎯 **Potential workaround available** - use direct SDK instead of OnchainKit

### **Workaround Strategy:**
1. **Use @farcaster/miniapp-sdk directly** for Mini App functionality
2. **Implement core features** without OnchainKit dependency
3. **Maintain OnchainKit disabled** until BASE fixes the issue
4. **Test page created:** `/test-direct-sdk` to verify functionality

---

## 🚨 **COMMON ISSUES & SOLUTIONS**

### **JSX Structure Errors:**
- **Error:** "Expected a semicolon" or "Expected ',', got '.'"
- **Cause:** Broken JSX when commenting out wrapper components
- **Solution:** Use proper React fragments or restore original structure

### **Context Variable Errors:**
- **Error:** "Cannot find name 'context'"
- **Cause:** Variable commented out but still referenced
- **Solution:** Comment out all variable usage or restore variable declaration

### **Build Failures:**
- **Error:** "Build failed because of webpack errors"
- **Cause:** Syntax errors from incomplete commenting
- **Solution:** Fix all syntax issues before re-enabling OnchainKit

---

## ⚠️ **IMPORTANT NOTES**

- **All changes are commented out** with clear "TEMPORARILY DISABLED" markers
- **No code was deleted** - only commented
- **Easy to reverse** by uncommenting lines
- **Search for "TEMPORARILY DISABLED: OnchainKit"** to find all changes

---

## 🎯 **CURRENT STATUS**

- ✅ **OnchainKit:** Temporarily disabled in all components
- ✅ **Build:** Should now succeed without frame-sdk errors
- ✅ **Manifest:** Ready to deploy with updated URLs
- ⏳ **Next:** Wait for BASE team fix, then reconnect everything

---

## 🔧 **CRITICAL FIXES APPLIED (2025-08-16)**

### **JSX Structure Fixes:**
- **File:** `app/providers.tsx`
- **Issue:** JSX structure broken when commenting out MiniKitProvider
- **Fix:** Wrapped children in React fragments (`<>...</>`)
- **Status:** ✅ **FIXED**

### **Context Variable References:**
- **Files:** `gallery-hero-2/page.tsx`, `text-page/page.tsx`
- **Issue:** `context` variable referenced after being commented out
- **Fix:** Commented out all `context` usage
- **Status:** ✅ **FIXED**

### **Build Process:**
- **Issue:** Vercel build failing due to syntax errors
- **Fix:** Proper JSX structure and variable handling
- **Status:** ✅ **READY FOR BUILD**

---

**Last Updated:** 2025-08-16
