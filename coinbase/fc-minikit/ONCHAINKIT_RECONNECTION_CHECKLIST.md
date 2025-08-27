# 🔌 OnchainKit Reconnection Checklist

**Date Created:** 2025-08-16  
**Reason:** Temporary disable due to frame-sdk import error  
**Status:** ⏳ WAITING FOR BASE TEAM NPM RELEASE  
**Last Updated:** 2025-08-25 - NPM package status confirmed  
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
- [ ] Check if BASE team has released OnchainKit npm package with frame-sdk fix
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

## 🔬 **CURRENT STATUS UPDATE (2025-08-25)**

### **Frame-sdk Fix Status:**
- ✅ **Source code fixed**: BASE team committed frame-sdk fix on 2025-08-15
- ❌ **NPM package not updated**: Still at version 0.38.19 (without fix)
- ⏳ **Waiting for**: BASE to publish new npm package with the fix

### **Version Information:**
- **Current installed**: `@coinbase/onchainkit@0.38.19`
- **Latest npm version**: `0.38.19` (same - no update yet)
- **Fix committed**: 2025-08-15 in BASE source code
- **NPM release needed**: Version 0.38.20 or higher

### **Monitoring Results:**
- **Daily check**: `node monitor-onchainkit.js` shows no new version
- **GitHub commits**: Latest from 2025-08-13 (before frame-sdk fix)
- **Status**: Still waiting for npm package release with August 15 fix

### **Key Discovery:**
**The frame-sdk fix exists in BASE's source code but has NOT been published to npm yet.** We must wait for BASE to release a new npm package version that includes the fix.

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
- **Frame-sdk fix exists in source code** but not yet in npm package

---

## 🎯 **CURRENT STATUS**

- ✅ **OnchainKit:** Temporarily disabled in all components
- ✅ **Build:** Should now succeed without frame-sdk errors
- ✅ **Manifest:** Ready to deploy with updated URLs
- ✅ **Frame-sdk fix**: Committed to BASE source code on 2025-08-15
- ⏳ **Next:** Wait for BASE to publish npm package with the fix

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

**Last Updated:** 2025-08-25 - NPM package status confirmed, frame-sdk fix exists in source code but not yet published to npm
