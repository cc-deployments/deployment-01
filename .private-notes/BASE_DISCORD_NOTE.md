# 📝 OnchainKit Dependency Issue - BASE Discord

**Date:** 2025-08-19  
**Issue:** OnchainKit frame-sdk import error  
**Status:** Identified root cause + working solution  

---

## 🔍 **Issue**

OnchainKit 0.38.18+ build error:
```
Attempted import error: '@farcaster/frame-sdk' does not contain a default export (imported as 'sdk').
```

## 🧪 **Our Investigation**

**Tested Node.js versions:** 20.19.1, 21.7.3, 22.18.0  
**Result:** Same frame-sdk error persists across all versions  
**Key Discovery:** Direct @farcaster/miniapp-sdk import works perfectly ✅

## 💡 **Root Cause**

- ❌ **OnchainKit:** Tries to import from deprecated `@farcaster/frame-sdk`
- ✅ **Direct SDK:** Imports from `@farcaster/miniapp-sdk` successfully

## 🎯 **Questions for BASE Team**

1. Is this a known OnchainKit 0.38.18+ issue?
2. Are you aware OnchainKit imports from deprecated frame-sdk?
3. Timeline for updating OnchainKit to use miniapp-sdk?

## 🚀 **Current Status**

- **Mini App:** ✅ Building/deploying successfully (OnchainKit temporarily disabled)
- **Smart Contract:** ✅ Deployed to BASE Sepolia
- **Workaround:** ✅ Direct Farcaster SDK available
- **Fix Status:** ✅ **RESOLVED in source code** - Waiting for npm package release

## 🤝 **Our Approach**

We're not blocked - our Mini App is functional. The frame-sdk issue has been **RESOLVED** in the OnchainKit source code (commit c7bb3970 on 2025-08-15). We're now waiting for the npm package release.

**Test page:** https://carmania.carculture.com/test-direct-sdk

## 📊 **Monitoring Setup**

We've created automated monitoring to detect when the fixed npm package is released:

**Daily Check:**
```bash
npm run monitor
# or
./monitor-daily.sh
```

**Cron Job (optional):**
```bash
0 9 * * * cd /path/to/fc-minikit && npm run monitor
```

**What We're Monitoring:**
- ✅ **Source code**: Fixed (frame-sdk → miniapp-sdk)
- ⏳ **npm package**: Waiting for 0.38.20+ release
- 🔍 **Status**: Check daily for updates
