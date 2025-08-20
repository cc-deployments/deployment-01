# 📝 Note for BASE Discord - OnchainKit Dependency Issue

**Date:** 2025-08-18  
**Issue:** OnchainKit frame-sdk import error  
**Status:** Identified root cause and potential workaround  

---

## 🔍 **Issue Description**

We're experiencing a persistent build error with OnchainKit 0.38.18+:

```
Attempted import error: '@farcaster/frame-sdk' does not contain a default export (imported as 'sdk').
```

## 🧪 **Our Investigation Results**

### **What We Tested:**
1. **Node.js versions:** 20.19.1, 21.7.3, 22.18.0
2. **All versions:** Same frame-sdk import error persists
3. **Direct SDK test:** @farcaster/miniapp-sdk imports work perfectly

### **Key Discovery:**
- ✅ **@farcaster/miniapp-sdk** imports successfully (version 0.1.9)
- ❌ **OnchainKit** fails with frame-sdk import error
- 🔍 **Root cause:** OnchainKit trying to import from deprecated `@farcaster/frame-sdk`

## 💡 **Technical Details**

### **Working Import:**
```typescript
import { sdk } from '@farcaster/miniapp-sdk'  // ✅ Works
```

### **Failing Import (in OnchainKit):**
```typescript
import sdk from '@farcaster/frame-sdk'  // ❌ Fails - deprecated package
```

## 🎯 **Questions for BASE Team**

1. **Is this a known issue** with OnchainKit 0.38.18+?
2. **Are you aware** that OnchainKit is importing from deprecated `@farcaster/frame-sdk`?
3. **Is there a timeline** for updating OnchainKit to use `@farcaster/miniapp-sdk`?
4. **Should we continue** using OnchainKit or switch to direct SDK?

## 🚀 **Current Status**

- **Mini App:** ✅ Building and deploying successfully (OnchainKit disabled)
- **Smart Contract:** ✅ Deployed to BASE Sepolia
- **Workaround:** ✅ Direct Farcaster SDK available as alternative

## 🤝 **Our Approach**

We're not blocking on this issue - our Mini App is functional. However, we'd like to understand:
- If this is a known OnchainKit limitation
- Whether we should wait for a fix
- If there are alternative approaches we should consider

---

**Note:** We're sharing this to help improve OnchainKit and understand the intended architecture. Our Mini App continues to work while we await guidance.
