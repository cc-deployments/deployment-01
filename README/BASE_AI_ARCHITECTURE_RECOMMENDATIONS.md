# BASE AI Architecture Recommendations - Monorepo Structure

## 📋 **Document Purpose**
This document tracks BASE AI's recommendations for our monorepo architecture, separate from our working codebase. This allows us to reference these recommendations without disrupting our current working MiniApp.

---

## 🏗️ **BASE AI Recommendations (2025-01-27)**

### **🏛️ Architecture Strategy: Separate Layouts Per App with Shared Providers**

**BASE AI Recommendation:** Each app should have its own layout that imports shared providers from the root.

#### **📁 Recommended Structure:**
```
CCulture-Apps-New/
├── packages/
│   ├── shared-ui/
│   │   ├── components/
│   │   │   ├── Button/
│   │   │   ├── Modal/
│   │   │   └── index.ts
│   │   └── styles/
│   │       └── globals.css
│   ├── shared-auth/
│   │   └── (authentication providers)
│   ├── shared-utils/
│   │   ├── constants/
│   │   ├── helpers/
│   │   └── types/
│   └── shared-config/
│       ├── eslint-config/
│       ├── typescript-config/
│       └── tailwind-config/
```

### **🔧 Development Strategy:**
- **Separate dev servers** for different app types
- Use `concurrently` or `nx` to manage multiple dev servers
- Each app should have its own deployment config

### **📦 Deployment Configuration:**
- Each app should have its own deployment config since they serve different purposes
- For MiniApps specifically, you'll need the manifest file

---

## 🚀 **STEP 1 IMPLEMENTATION: Monorepo Import Resolution (2025-07-27)**

### **🎯 Current Issue:**
- Import errors with `getAppSpecificConfig` vs `getSharedEnvConfig`
- Module resolution cache issues
- Relative imports like `../../../packages/shared-config/env`

### **✅ BASE AI Solution:**

#### **1. TypeScript Path Mapping (Recommended)**

**Configure in `coinbase/fc-minikit/tsconfig.json`:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@shared/*": ["../../../packages/shared-config/*"],
      "@shared/env": ["../../../packages/shared-config/env"]
    }
  }
}
```

**Update import in `app/providers.tsx`:**
```tsx
// Instead of: import from '../../../packages/shared-config/env'
import { getSharedEnvConfig } from '@shared/env';
```

#### **2. Next.js Configuration**

**Update `coinbase/fc-minikit/next.config.js`:**
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true, // Allow imports from outside the project directory
  },
};

module.exports = nextConfig;
```

#### **3. Clear Development Cache**

**Complete cache clearing process:**
```bash
# Stop dev server completely
# Clear Next.js cache
rm -rf .next
rm -rf node_modules/.cache

# Clear TypeScript cache
rm -rf tsconfig.tsbuildinfo

# Restart dev server
npm run dev
```

#### **4. Monorepo Package Management**

**Option A: Workspace Dependencies (Recommended)**

**Add to `fc-minikit/package.json`:**
```json
{
  "dependencies": {
    "@cculture/shared-config": "workspace:*"
  }
}
```

**Update `packages/shared-config/package.json`:**
```json
{
  "name": "@cculture/shared-config",
  "version": "1.0.0",
  "main": "./env.ts",
  "exports": {
    ".": "./env.ts",
    "./env": "./env.ts"
  }
}
```

#### **5. Verify File Structure**

**Ensure structure:**
```
CCulture-Apps-New/
├── packages/
│   └── shared-config/
│       ├── package.json
│       └── env.ts (exports getSharedEnvConfig)
└── coinbase/
    └── fc-minikit/
        ├── package.json
        ├── tsconfig.json
        └── app/
            └── providers.tsx
```

#### **6. Export/Import Syntax**

**In `packages/shared-config/env.ts`:**
```typescript
// Named export (recommended)
export function getSharedEnvConfig() {
  // implementation
}
```

**In `app/providers.tsx`:**
```typescript
// Named import
import { getSharedEnvConfig } from '@shared/env';
```

### **🔧 Implementation Steps:**

1. **Configure TypeScript paths** in `fc-minikit/tsconfig.json`
2. **Update Next.js config** to allow external imports
3. **Clear all caches** and restart dev server
4. **Test import resolution** with new path mapping
5. **Verify no remaining references** to old function names

### **✅ Success Criteria:**
- [ ] No import errors in dev server
- [ ] `getSharedEnvConfig` imports successfully
- [ ] Clean TypeScript compilation
- [ ] Working development server

---

## 🔐 **2. Shared User Context and Hooks - BASE AI Recommendation**

### **Core Shared Package Structure:**
```
packages/
├── shared-auth/
│   ├── providers/
│   │   ├── BaseAuthProvider.tsx      # Common wagmi/query setup
│   │   ├── MiniKitAuthProvider.tsx   # MiniKit-specific wrapper
│   │   ├── StandardAuthProvider.tsx  # RainbowKit/OnchainKit wrapper
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useSharedAuth.ts          # Common auth logic
│   │   ├── useWalletConnection.ts    # Unified wallet state
│   │   └── index.ts
│   ├── config/
│   │   ├── wagmi.ts                  # Shared wagmi configuration
│   │   ├── chains.ts                 # Chain configurations
│   │   └── connectors.ts             # Connector configurations
│   └── types/
│       └── auth.ts                   # Shared auth types
```

### **Base Authentication Provider:**
Create a foundational provider that both MiniKit and standard apps can extend:

```tsx
// packages/shared-auth/providers/BaseAuthProvider.tsx
'use client';

import { createConfig, http, cookieStorage, createStorage } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { ReactNode, useState } from 'react';

// Shared wagmi configuration
export function getSharedWagmiConfig() {
  return createConfig({
    chains: [base, baseSepolia],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [base.id]: http(),
      [baseSepolia.id]: http(),
    },
  });
}

interface BaseAuthProviderProps {
  children: ReactNode;
  config?: ReturnType<typeof getSharedWagmiConfig>;
}

export function BaseAuthProvider({ children, config }: BaseAuthProviderProps) {
  const [wagmiConfig] = useState(() => config || getSharedWagmiConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

### **MiniKit-Specific Provider:**
```tsx
// packages/shared-auth/providers/MiniKitAuthProvider.tsx
'use client';

import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { base } from 'wagmi/chains';
import { ReactNode } from 'react';

interface MiniKitAuthProviderProps {
  children: ReactNode;
  apiKey?: string;
  projectName?: string;
}

export function MiniKitAuthProvider({ 
  children, 
  apiKey,
  projectName 
}: MiniKitAuthProviderProps) {
  return (
    <MiniKitProvider
      apiKey={apiKey || process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          name: projectName || process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
        },
      }}
    >
      {children}
    </MiniKitProvider>
  );
}
```

### **Standard Web3 Provider:**
```tsx
// packages/shared-auth/providers/StandardAuthProvider.tsx
'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ReactNode } from 'react';

interface StandardAuthProviderProps {
  children: ReactNode;
  apiKey?: string;
  projectName?: string;
}

export function StandardAuthProvider({ 
  children, 
  apiKey,
  projectName 
}: StandardAuthProviderProps) {
  return (
    <OnchainKitProvider
      apiKey={apiKey || process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      config={{
        appearance: {
          name: projectName || process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
        },
      }}
    >
      <RainbowKitProvider>
        {children}
      </RainbowKitProvider>
    </OnchainKitProvider>
  );
}
```

### **Shared User Context and Hooks:**
```tsx
// packages/shared-auth/hooks/useSharedAuth.ts

export interface SharedAuthState {
  address?: string;
  isConnected: boolean;
  chainId?: number;
  fid?: string;        // MiniKit-specific
  frameContext?: any;  // MiniKit-specific
  connector?: any;     // Standard web3-specific
}

export function useSharedAuth(): SharedAuthState {
  const { address, isConnected, chainId, connector } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  
  let miniKitContext;
  try {
    miniKitContext = useMiniKit();
  } catch {
    // MiniKit not available in this environment
  }
  
  return {
    address,
    isConnected,
    chainId,
    connector,
    fid: miniKitContext?.fid,
    frameContext: miniKitContext?.frameContext,
  };
}
```

### **Wallet Connection Hook:**
```tsx
// packages/shared-auth/hooks/useWalletConnection.ts

import { useConnect, useDisconnect } from 'wagmi';
import { useCallback } from 'react';

export function useWalletConnection() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const connectWallet = useCallback(async (connectorId?: string) => {
    const connector = connectorId
      ? connectors.find(c => c.id === connectorId)
      : connectors[0];

    if (connector) {
      connect({ connector });
    }
  }, [connect, connectors]);

  return { connectWallet, disconnect, connectors };
}
```

---

## 🎨 **3. Shared UI Components - BASE AI Recommendation**

### **Universal Wallet Component:**
```tsx
// packages/shared-ui/components/WalletConnection.tsx

'use client';

import { useSharedAuth, useWalletConnection } from '@/packages/shared-auth';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Wallet } from '@coinbase/onchainkit/wallet';

interface WalletConnectionProps {
  variant?: 'minikit' | 'rainbowkit' | 'onchainkit';
}

export function WalletConnection({ variant = 'onchainkit' }: WalletConnectionProps) {
  const { isConnected, address, fid } = useSharedAuth();

  // MiniKit apps use OnchainKit Wallet component
  if (variant === 'minikit') {
    return <Wallet />;
  }

  // Standard apps can use RainbowKit
  if (variant === 'rainbowkit') {
    return <ConnectButton />;
  }

  // Default to OnchainKit
  return <Wallet />;
}
```

### **Key Benefits of Shared UI Components:**

1. **Universal Interface:** Single component works across different app types
2. **Variant Support:** Supports MiniKit, RainbowKit, and OnchainKit variants
3. **Shared State:** Uses `useSharedAuth()` for consistent state management
4. **Flexible Rendering:** Conditionally renders appropriate UI based on variant

### **Usage Examples:**

```tsx
// FC MiniApp (MiniKit variant)
<WalletConnection variant="minikit" />

// Social Identity App (RainbowKit variant)
<WalletConnection variant="rainbowkit" />

// Default (OnchainKit variant)
<WalletConnection />
```

---

## 📋 **3. Wallet Connection Hook (`useWalletConnection.ts`)**

### **Code Implementation:**

```typescript
// packages/shared-auth/hooks/useWalletConnection.ts

import { useConnect, useDisconnect } from 'wagmi';
import { useCallback } from 'react';

export function useWalletConnection() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const connectWallet = useCallback(async (connectorId?: string) => {
    const connector = connectorId
      ? connectors.find(c => c.id === connectorId)
      : connectors[0];

    if (connector) {
      connect({ connector });
    }
  }, [connect, connectors]);

  return {
    connectWallet,
    disconnect,
    connectors,
  };
}
```

### **Key Features:**

1. **Flexible Connector Selection:**
   - Can specify a specific `connectorId` to connect to
   - Falls back to first available connector if no ID provided

2. **Performance Optimized:**
   - Uses `useCallback` to memoize the `connectWallet` function
   - Prevents unnecessary re-renders

3. **Unified Interface:**
   - Returns `connectWallet`, `disconnect`, and `connectors`
   - Works with any wagmi-compatible wallet

### **Usage Examples:**

```typescript
// Basic usage
const { connectWallet, disconnect, connectors } = useWalletConnection();

// Connect to specific wallet
await connectWallet('metamask');

// Connect to first available
await connectWallet();

// Disconnect
disconnect();
```

### **Integration with Shared Auth:**

```typescript
// Combined with useSharedAuth
const { isConnected, address } = useSharedAuth();
const { connectWallet, disconnect } = useWalletConnection();

// Connect wallet and get unified state
const handleConnect = async () => {
  await connectWallet();
  // useSharedAuth will automatically update with new connection
};
```

---

## 📋 **5. Shared UI Components - Universal Wallet Component**

### **Universal Wallet Component (`WalletConnection.tsx`):**

```typescript
// packages/shared-ui/components/WalletConnection.tsx

'use client';

import { useSharedAuth, useWalletConnection } from '@/packages/shared-auth';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Wallet } from '@coinbase/onchainkit/wallet';

interface WalletConnectionProps {
  variant?: 'minikit' | 'rainbowkit' | 'onchainkit';
}

export function WalletConnection({ variant = 'onchainkit' }: WalletConnectionProps) {
  const { isConnected, address, fid } = useSharedAuth();

  // MiniKit apps use OnchainKit Wallet component
  if (variant === 'minikit') {
    return <Wallet />;
  }

  // Standard apps can use RainbowKit
  if (variant === 'rainbowkit') {
    return <ConnectButton />;
  }

  // Default to OnchainKit
  return <Wallet />;
}
```

### **Key Features:**

1. **Flexible Variant System:**
   - `minikit` - For Farcaster MiniApps (uses OnchainKit Wallet)
   - `rainbowkit` - For standard web3 apps (uses RainbowKit ConnectButton)
   - `onchainkit` - Default (uses OnchainKit Wallet)

2. **Shared Authentication Integration:**
   - Uses `useSharedAuth()` hook for consistent auth state
   - Accesses `isConnected`, `address`, `fid` across all variants

3. **Unified Interface:**
   - Single component handles all wallet connection scenarios
   - Consistent props and behavior across apps

### **Usage Examples:**

```tsx
// FC MiniApp (MiniKit variant)
<WalletConnection variant="minikit" />

// Social Identity App (RainbowKit variant)
<WalletConnection variant="rainbowkit" />

// Default (OnchainKit variant)
<WalletConnection />
```

---

## 📊 **Analysis: Our Current App vs. BASE AI Shared UI Components**

### **✅ What We Currently Have:**

1. **✅ FC MiniApp Structure:**
   - `coinbase/fc-minikit/app/layout.tsx` ✅ (complete, 51 lines)
   - `coinbase/fc-minikit/app/providers.tsx` ✅ (MiniKitProvider + Farcaster SDK)
   - Working development server ✅

2. **✅ Social Identity App:**
   - `coinbase/socialidentity/app/layout.tsx` ✅ (complete)
   - `coinbase/socialidentity/app/Providers.tsx` ✅ (OnchainKitProvider + RainbowKitProvider)

3. **✅ Packages Structure:**
   - `packages/sharedauth/` ✅ (exists but not used)
   - `packages/privy/` ✅ (exists)

### **🔧 What We Need to Implement (BASE AI Recommendations):**

1. **📦 Missing Shared UI Package:**
   ```
   packages/shared-ui/
   ├── components/
   │   ├── WalletConnection.tsx  ← Need to create
   │   └── index.ts
   └── styles/
       └── globals.css
   ```

2. **🔗 Missing TypeScript Path Mapping:**
   ```json
   // coinbase/fc-minikit/tsconfig.json
   {
     "compilerOptions": {
       "paths": {
         "@/packages/shared-auth": ["../../packages/shared-auth"],
         "@/packages/shared-ui": ["../../packages/shared-ui"]  ← Need to add
       }
     }
   }
   ```

3. **🎯 Missing Shared Auth Hooks:**
   - `useSharedAuth()` hook
   - `useWalletConnection()` hook
   - `BaseAuthProvider`, `MiniKitAuthProvider`, `StandardAuthProvider`

### **🚀 Implementation Priority:**

#### **Phase 1: Shared UI Components (EASY)**
- [ ] Create `packages/shared-ui/components/WalletConnection.tsx`
- [ ] Add TypeScript path mapping
- [ ] Test on FC MiniApp with `variant="minikit"`
- [ ] Document implementation

#### **Phase 2: Shared Auth Hooks (MEDIUM)**
- [ ] Create `packages/shared-auth/hooks/useSharedAuth.ts`
- [ ] Create `packages/shared-auth/hooks/useWalletConnection.ts`
- [ ] Create provider components
- [ ] Test integration

#### **Phase 3: Full Migration (HARD)**
- [ ] Update all apps to use shared components
- [ ] Remove duplicate auth logic
- [ ] Standardize provider patterns

### **💡 Benefits of Implementation:**

1. **Code Reusability:** Single wallet component for all apps
2. **Consistent UX:** Same wallet behavior across MiniApp and standard apps
3. **Maintainability:** Centralized wallet logic
4. **Future-Proof:** Easy to add new wallet variants
5. **Testing:** Can test wallet functionality in isolation

### **🎯 Recommended Next Steps:**

1. **Start with FC MiniApp** - It's working and we can test safely
2. **Create WalletConnection component** - Immediate value
3. **Add TypeScript paths** - Enable imports
4. **Test MiniKit variant** - Validate approach
5. **Document learnings** - For future apps

---

## 🚨 **URGENT: Layout.tsx Conflicts Analysis**

### **Current State:**

1. **Multiple Layout Files:**
   - `coinbase/fc-minikit/app/layout.tsx` ✅ (51 lines, complete)
   - `app/layout.tsx` ❌ (44 lines, incomplete)
   - `coinbase/socialidentity/app/layout.tsx` ✅ (complete)

2. **Development Server Issue:**
   - Running from root directory instead of `coinbase/fc-minikit/`
   - Using wrong `layout.tsx` file
   - Causing `NotificationHandler` import errors

3. **Node.js Version Issue:**
   - Current: v20.19.1
   - Required: v22.11.0+ (Farcaster Mini Apps requirement)
   - **FIXED:** Upgraded to v22.17.1 ✅

### **Critical Questions for BASE AI:**

1. **Layout.tsx Placement:** In a multi-app monorepo, where should the primary `layout.tsx` be located?
2. **Development Strategy:** Should we have separate dev servers or unified workflow?
3. **Shared Providers:** How should shared authentication be structured across MiniApp vs standard apps?
4. **App Boundaries:** How to clearly separate FC MiniApp from Coinbase App from Social Identity?

### **Immediate Actions Needed:**

1. **✅ FIXED:** Upgrade Node.js to v22.17.1
2. **PENDING:** Ask BASE AI for layout.tsx placement guidance
3. **PENDING:** Implement shared UI components on FC MiniApp
4. **PENDING:** Resolve development server directory issues

---

## 📋 **Implementation Roadmap**

### **Phase 1: Foundation (Week 1)**
- [x] Upgrade Node.js to v22.17.1
- [ ] Ask BASE AI for layout.tsx placement guidance
- [ ] Create `packages/shared-ui/components/WalletConnection.tsx`
- [ ] Add TypeScript path mapping

### **Phase 2: Testing (Week 2)**
- [ ] Test WalletConnection on FC MiniApp
- [ ] Document implementation learnings
- [ ] Plan shared auth hooks implementation

### **Phase 3: Migration (Week 3)**
- [ ] Implement shared auth hooks
- [ ] Update Social Identity to use shared components
- [ ] Standardize provider patterns

### **Phase 4: Optimization (Week 4)**
- [ ] Remove duplicate code
- [ ] Optimize bundle sizes
- [ ] Add comprehensive testing

---

## 🎯 **Success Metrics**

### **Technical Metrics:**
- [ ] Zero layout.tsx conflicts
- [ ] Single wallet component across all apps
- [ ] Consistent auth behavior
- [ ] Reduced bundle sizes

### **Development Metrics:**
- [ ] Faster development setup
- [ ] Easier onboarding for new apps
- [ ] Reduced code duplication
- [ ] Better maintainability

### **User Experience Metrics:**
- [ ] Consistent wallet UX across apps
- [ ] Faster wallet connections
- [ ] Better error handling
- [ ] Improved reliability

---

## 📚 **Related Documents**

- [APP_FLOW.md](coinbase/fc-minikit/APP_FLOW.md) - Current app structure and flow
- [ARCHITECTURE.md](README/ARCHITECTURE.md) - Overall architecture decisions
- [TODO-2025-01-27_URGENT_LAYOUT_ARCHITECTURE.md](TODO/TODO-2025-01-27_URGENT_LAYOUT_ARCHITECTURE.md) - Urgent tasks and priorities

---

*Last Updated: 2025-01-27*
*Status: Node.js upgraded, ready for shared UI implementation* 

---

## 🎯 **BASE AI FINAL RECOMMENDATIONS & PARTING THOUGHTS**

### **Hybrid Approach Strategy:**
> *"The hybrid approach with selective centralization should give you the best of both worlds - shared infrastructure where it makes sense, while keeping the app-specific authentication flows clean and maintainable."*

### **Implementation Strategy:**
> *"Starting with the base shared authentication structure and then building out the app-specific providers is definitely the right approach. It'll let you test each piece incrementally and catch any integration issues early."*

### **Key Principles:**
1. **Selective Centralization** - Share only what makes sense
2. **App-Specific Flows** - Keep authentication flows clean and maintainable
3. **Incremental Testing** - Test each piece early to catch integration issues
4. **Base First, Then Specific** - Start with shared auth, then build app-specific providers

### **Recommended Implementation Order:**
1. **Phase 1:** Base shared authentication structure
2. **Phase 2:** App-specific providers (MiniKit, Standard, Hybrid)
3. **Phase 3:** Shared UI components
4. **Phase 4:** Environment configuration
5. **Phase 5:** Deployment optimization

---

## 📋 **6. Environment Configuration - Shared Environment Types**

### **Shared Environment Configuration:**

```typescript
// packages/shared-config/env.ts

export interface SharedEnvConfig {
  NEXT_PUBLIC_ONCHAINKIT_API_KEY?: string;
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?: string;
  NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME?: string;
  // MiniKit specific
  FARCASTER_HEADER?: string;
  FARCASTER_PAYLOAD?: string;
  FARCASTER_SIGNATURE?: string;
}

export function getSharedEnvConfig(): SharedEnvConfig {
  return {
    NEXT_PUBLIC_ONCHAINKIT_API_KEY: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY,
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
    FARCASTER_HEADER: process.env.FARCASTER_HEADER,
    FARCASTER_PAYLOAD: process.env.FARCASTER_PAYLOAD,
    FARCASTER_SIGNATURE: process.env.FARCASTER_SIGNATURE,
  };
}
```

### **App-Specific Usage:**

```typescript
// apps/farcaster-miniapp/app/layout.tsx
import { getSharedEnvConfig } from '@/packages/shared-config';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const env = getSharedEnvConfig();
  
  return (
    <html lang="en">
      <body>
        <MiniKitAuthProvider apiKey={env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}>
          {children}
        </MiniKitAuthProvider>
      </body>
    </html>
  );
}
```

---

## 📊 **FINAL ANALYSIS: Our Current App vs. BASE AI Recommendations**

### **✅ What We Currently Have:**

1. **✅ FC MiniApp Structure:**
   - `coinbase/fc-minikit/app/layout.tsx` ✅ (complete, 51 lines)
   - `coinbase/fc-minikit/app/providers.tsx` ✅ (MiniKitProvider + Farcaster SDK)
   - Working development server ✅

2. **✅ Social Identity App:**
   - `coinbase/socialidentity/app/layout.tsx` ✅ (complete)
   - `coinbase/socialidentity/app/Providers.tsx` ✅ (OnchainKitProvider + RainbowKitProvider)

3. **✅ Packages Structure:**
   - `packages/sharedauth/` ✅ (exists but not used)
   - `packages/privy/` ✅ (exists)

### **🔧 What We Need to Implement (BASE AI Recommendations):**

1. **📦 Missing Shared UI Package:**
   ```
   packages/shared-ui/
   ├── components/
   │   └── WalletConnection.tsx
   └── index.ts
   ```

2. **🔐 Missing Shared Auth Hooks:**
   ```
   packages/shared-auth/
   ├── hooks/
   │   ├── useSharedAuth.ts
   │   └── useWalletConnection.ts
   └── providers/
       ├── BaseAuthProvider.tsx
       ├── MiniKitAuthProvider.tsx
       └── StandardAuthProvider.tsx
   ```

3. **⚙️ Missing Environment Config:**
   ```
   packages/shared-config/
   └── env.ts
   ```

### **🎯 Implementation Priority (Based on BASE AI's Hybrid Approach):**

#### **Phase 1: Foundation (Start Here)**
- [ ] Create `packages/shared-config/env.ts`
- [ ] Implement `BaseAuthProvider.tsx`
- [ ] Add TypeScript path mapping

#### **Phase 2: App-Specific Providers**
- [ ] Implement `MiniKitAuthProvider.tsx` (FC MiniApp)
- [ ] Implement `StandardAuthProvider.tsx` (Social Identity)
- [ ] Test each provider incrementally

#### **Phase 3: Shared UI Components**
- [ ] Create `WalletConnection.tsx` with variant support
- [ ] Test on FC MiniApp first
- [ ] Extend to other apps

#### **Phase 4: Environment Integration**
- [ ] Update all apps to use shared env config
- [ ] Test environment variable access
- [ ] Validate deployment configuration

### **🚨 URGENT: Layout.tsx Conflicts Analysis**

#### **Current State:**
- ✅ **Correct:** `coinbase/fc-minikit/app/layout.tsx` (51 lines, complete)
- ❌ **Problematic:** `app/layout.tsx` (44 lines, incomplete)
- ❌ **Issue:** Dev server running from wrong directory

#### **Critical Issues:**
1. **Development Server Directory:** Running from root instead of `coinbase/fc-minikit/`
2. **Node.js Version:** Upgraded to v22.17.1 ✅ (meets Farcaster requirements)
3. **Conflicting Layouts:** Root `app/layout.tsx` interfering with FC MiniApp

#### **Immediate Actions Needed:**
1. **Fix Dev Server:** Ensure `npm run dev` runs from `coinbase/fc-minikit/`
2. **Clean Root Layout:** Remove or fix root `app/layout.tsx`
3. **Test FC MiniApp:** Verify it works with correct Node.js version

---

## 🎯 **NEXT STEPS: Implementation Plan**

### **Immediate (This Week):**
1. **Fix Development Environment:**
   - Ensure dev server runs from `coinbase/fc-minikit/`
   - Clean up root `app/layout.tsx` conflicts
   - Test FC MiniApp with new Node.js version

2. **Start Phase 1 Implementation:**
   - Create `packages/shared-config/env.ts`
   - Implement `BaseAuthProvider.tsx`
   - Add TypeScript path mapping

### **Short Term (Next 2 Weeks):**
1. **Complete Phase 1:** Foundation shared auth structure
2. **Begin Phase 2:** App-specific providers
3. **Test Incrementally:** Each piece as recommended by BASE AI

### **Medium Term (Next Month):**
1. **Complete Phase 3:** Shared UI components
2. **Complete Phase 4:** Environment integration
3. **Optimize Deployment:** Based on learnings

---

## 📝 **Documentation Updates Needed:**

1. **Update APP_FLOW.md:** Add BASE AI recommendations
2. **Update ARCHITECTURE.md:** Document hybrid approach
3. **Create Implementation Guide:** Step-by-step migration plan
4. **Update TODO List:** Prioritize based on BASE AI guidance

---

## **📝 IMPLEMENTATION PROGRESS & DECISIONS (2025-07-26)**

### **🎯 Current Status: Phase 1 - Fix Build Issues**

**What We're Doing:**
1. **Temporarily using relative imports** instead of TypeScript path mapping
2. **Keeping Cloudflare files in fc-minikit/** for now (to fix build)
3. **Testing shared dependencies** before restructuring

**Why This Approach:**
- ✅ **Immediate fix** - Get FC MiniApp building and working
- ✅ **Test shared auth** - Verify BASE AI's shared dependency strategy works
- ✅ **Incremental progress** - Don't break everything at once
- ✅ **Rollback safety** - Can easily revert if issues arise

### **🔧 Current Implementation:**

**Shared Dependencies (BASE AI Strategy):**
```json
// Root package.json - Updated to newer versions
"permissionless": "^0.2.52",  // Updated from 0.1.26
"viem": "^2.31.4",            // Consolidated version
"resolutions": {
  "viem": "2.31.4"           // Force single version
}
```

**FC MiniApp (Cleaned):**
```json
// Removed duplicate dependencies
- "wagmi": "^2.5.7" ❌ (now from shared-auth)
- "viem": "^2.7.9" ❌ (now from shared-auth)  
- "@tanstack/react-query": "^5" ❌ (now from shared-auth)
+ "@cculture/shared-auth": "file:../../../packages/shared-auth" ✅
+ "@cculture/shared-config": "file:../../../packages/shared-config" ✅
```

**Temporary Import Strategy:**
```typescript
// Using relative imports until path mapping works
import { getSharedEnvConfig } from '../../../packages/shared-config/env';
import { MiniKitAuthProvider } from '../../../packages/shared-auth/providers/MiniKitAuthProvider';
```

### **📋 Next Steps (Phase 2):**

**After build is working:**
1. **Move Cloudflare files** to `coinbase/cloudflare-api/`
2. **Fix TypeScript path mapping** with proper webpack config
3. **Test all apps** with new structure
4. **Update deployment scripts**

### **⚠️ Known Issues:**
- **ESLint errors** in `src/index.js` (Cloudflare Worker mixed with Next.js)
- **TypeScript path mapping** not working in Next.js webpack
- **Cloudflare files** should be in separate directory

### **🔄 Rollback Plan:**
If issues arise, we can:
1. **Revert to direct dependencies** in FC MiniApp
2. **Use original import paths** 
3. **Keep Cloudflare files** in current location
4. **Document learnings** for next attempt

---

*"Feel free to come back if you run into any specific implementation challenges or need clarification on any part of the architecture as you work through it. Good luck with the implementation!"* - BASE AI 