# CarCulture Architecture (2025-01-XX) - Cross-Domain Authentication & Signup Strategy

## 🚀 **CROSS-DOMAIN AUTHENTICATION ARCHITECTURE** (2025-01-XX)

### **Overview**
Implementation of cross-domain authentication system enabling DRIVR agent access across both `carculture.com` and `carmania.carculture.com` domains with shared embedded wallet authentication.

### **Cross-Domain Authentication Components**

#### **1. Shared Authentication Package** (`packages/shared-auth/`)
```
packages/shared-auth/
├── src/
│   ├── crossDomainAuth.ts          # Core cross-domain utilities
│   ├── components/
│   │   └── CrossDomainDRIVRAgent.tsx # Reusable DRIVR component
│   └── index.ts                    # Package exports
├── config/
│   └── wagmi.ts                    # Shared wagmi configuration
└── services/
    └── basePayService.ts           # Base Pay integration
```

#### **2. Cross-Domain Features**
- **Single Sign-On**: Authentication state shared between domains
- **Real-time Sync**: Changes in one domain instantly reflect in the other
- **Secure Communication**: Uses postMessage API with origin verification
- **Persistent State**: Authentication persists across browser sessions
- **DRIVR Integration**: Agent accessible from both domains

#### **3. Domain Configuration**
```typescript
// Allowed domains for cross-domain communication
export const ALLOWED_DOMAINS = [
  'https://carculture.com',           // Main site with Stablelink gallery
  'https://carmania.carculture.com',  // Car of the day miniapp
  'http://localhost:3000',            // Development - main site
  'http://localhost:3001'             // Development - miniapp
];
```

### **CDP Embedded Wallet Configuration**

#### **Security Configuration** (`coinbase/fc-minikit/lib/security.ts`)
```typescript
export const SECURITY_CONFIG = {
  ALLOWED_ORIGINS: [
    'https://carculture.com',           // Main site with Stablelink gallery
    'https://carmania.carculture.com',  // Car of the day miniapp
    'http://localhost:3000',            // Development - main site
    'http://localhost:3001',            // Development - miniapp
  ],
  CDP_PROJECT_ID: process.env.CDP_PROJECT_ID || '1cceb0e4-e690-40ac-8f3d-7d1f3da1417a',
  CDP_API_KEY: process.env.CDP_API_KEY,
};
```

#### **CDP Portal Configuration Required**
- **Production Domains**: `https://carculture.com`, `https://carmania.carculture.com`
- **Development Domains**: `http://localhost:3000`, `http://localhost:3001`
- **Project ID**: `1cceb0e4-e690-40ac-8f3d-7d1f3da1417a`

---

## 📧 **SIGNUP DATA CAPTURE STRATEGY** (2025-01-XX)

### **Signup Data Architecture**

#### **1. Cloudflare D1 Database Schema**
```sql
-- Signups table for email collection
CREATE TABLE IF NOT EXISTS signups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  source TEXT NOT NULL DEFAULT 'landing_page',
  interests TEXT, -- JSON array of interests
  wallet_address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_address TEXT,
  user_agent TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT DEFAULT 'active'
);

-- User engagement tracking
CREATE TABLE IF NOT EXISTS user_engagement (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  action TEXT NOT NULL, -- 'page_view', 'nft_view', 'wallet_connect', 'purchase'
  details TEXT, -- JSON with action-specific data
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Cross-domain authentication tracking
CREATE TABLE IF NOT EXISTS cross_domain_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT UNIQUE NOT NULL,
  email TEXT,
  wallet_address TEXT,
  domains TEXT, -- JSON array of domains accessed
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_activity DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME
);
```

#### **2. Signup Data Collection Points**

**Primary Collection Points:**
- **carculture.com landing page** - Main signup form
- **carmania.carculture.com** - DRIVR agent integration signup
- **Cross-domain wallet connection** - Automatic signup on wallet connect

**Data Collected:**
```typescript
interface SignupData {
  email: string;                    // Required
  name?: string;                    // Optional
  source: 'landing_page' | 'miniapp' | 'social' | 'referral';
  interests: string[];               // User-selected interests
  wallet_address?: string;          // For exclusive NFT access
  created_at: string;
  ip_address?: string;              // For analytics
  user_agent?: string;              // For analytics
  utm_source?: string;              // Marketing attribution
  utm_medium?: string;              // Marketing attribution
  utm_campaign?: string;            // Marketing attribution
}
```

#### **3. Interest Categories**
```typescript
const interestOptions = [
  'Daily NFT Drops',
  'Automotive Art',
  'Classic Cars',
  'Modern Cars',
  'DRIVR AI Assistant',
  'Community Events',
  'Exclusive Collections',
  'Market Insights'
];
```

### **Signup Integration Points**

#### **1. Landing Page Integration** (`carculture-landing/`)
```
carculture-landing/
├── src/
│   ├── app/
│   │   ├── page.tsx                # Landing page with signup
│   │   ├── layout.tsx              # App layout
│   │   └── api/
│   │       └── signup/
│   │           └── route.ts         # Signup API endpoint
│   ├── components/
│   │   └── SignupForm.tsx          # Reusable signup form
│   └── app/
│       └── globals.css             # Styling
├── database/
│   └── schema.sql                  # D1 database schema
└── package.json
```

#### **2. Cross-Domain Signup Flow**
1. **User visits carculture.com** → Sees signup form
2. **User fills form** → Data stored in Cloudflare D1
3. **User connects wallet** → Cross-domain auth state created
4. **User visits carmania.carculture.com** → Automatic signup recognition
5. **DRIVR agent access** → Based on signup + wallet connection

---

## 🏗️ **UPDATED MONOREPO ARCHITECTURE** (2025-01-XX)

### **Current Structure**
```
CCulture-Apps-New/
├── packages/
│   ├── shared-auth/                 # ✅ Cross-domain authentication
│   │   ├── src/
│   │   │   ├── crossDomainAuth.ts   # ✅ Cross-domain utilities
│   │   │   ├── components/
│   │   │   │   └── CrossDomainDRIVRAgent.tsx # ✅ DRIVR component
│   │   │   └── index.ts            # ✅ Package exports
│   │   ├── config/
│   │   │   └── wagmi.ts            # ✅ Shared wagmi config
│   │   └── services/
│   │       └── basePayService.ts   # ✅ Base Pay integration
│   ├── shared-ui/                  # ✅ Shared UI components
│   ├── shared-xmtp/                # ✅ XMTP integration
│   └── privy/                      # ✅ Legacy Privy package
├── carculture-app/                 # ✅ Main CarCulture app
│   ├── src/
│   │   ├── app/
│   │   │   └── page.tsx           # ✅ Updated with DRIVR integration
│   │   └── components/
│   │       └── BaseAccountProvider.tsx # ✅ Base Account integration
├── carculture-landing/             # 🆕 Landing page with signup
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx           # 🆕 Landing page
│   │   │   ├── layout.tsx         # 🆕 App layout
│   │   │   └── api/
│   │   │       └── signup/
│   │   │           └── route.ts    # 🆕 Signup API
│   │   └── components/
│   │       └── SignupForm.tsx      # 🆕 Signup form component
│   ├── database/
│   │   └── schema.sql             # 🆕 D1 database schema
│   └── package.json               # 🆕 Landing page package
├── coinbase/
│   ├── fc-minikit/                # ✅ Farcaster MiniApp
│   │   ├── app/
│   │   │   └── drivr-chat/
│   │   │       └── page.tsx       # ✅ Updated with cross-domain auth
│   │   ├── lib/
│   │   │   └── security.ts        # ✅ Updated CORS configuration
│   │   └── components/
│   │       └── EmbeddedWalletIntegration.tsx # ✅ Embedded wallet
│   ├── socialidentity/            # ✅ Social Identity app
│   ├── nft-gallery/               # ✅ NFT Gallery app
│   └── cloudflare-api/            # ✅ Cloudflare Workers
├── agents/                         # ✅ DRIVR agent system
│   ├── carculture-drivr-agent/    # ✅ DRIVR agent
│   └── src/
│       ├── drivr-agent.ts         # ✅ Main agent
│       └── services/
│           └── drivr-xmtp-service.ts # ✅ XMTP service
└── smart-contracts/                # ✅ Smart contracts
    └── carmania/                   # ✅ CarMania contracts
```

### **Domain Strategy**
```
carculture.com (main site - Cloudflare Pages)
├── Landing page with signup form
├── Stablelink gallery integration
├── Blog/articles section
└── Cross-domain DRIVR agent access

carmania.carculture.com (miniapp - Cloudflare Pages)
├── Car of the day functionality
├── NFT gallery and minting
├── DRIVR chat interface
└── Cross-domain authentication
```

---

## 🔧 **IMPLEMENTATION STATUS** (2025-01-XX)

### **✅ Completed**
- [x] Cross-domain authentication package (`packages/shared-auth/`)
- [x] DRIVR agent cross-domain component
- [x] Updated security configuration for both domains
- [x] Landing page with signup form (`carculture-landing/`)
- [x] Cloudflare D1 database schema for signups
- [x] Signup API endpoint with UTM tracking
- [x] Integration in both CarCulture app and FC minikit

### **🔄 In Progress**
- [ ] Deploy carculture.com to Cloudflare Pages
- [ ] Configure CDP domains in Coinbase Developer Portal
- [ ] Test cross-domain authentication flow
- [ ] Set up email service integration (SendGrid/Mailgun)

### **📋 Next Steps**
1. **Deploy carculture.com** to Cloudflare Pages
2. **Configure CDP domains** in Coinbase Developer Portal
3. **Test cross-domain flow** between domains
4. **Set up email service** for welcome emails
5. **Implement analytics tracking** for signup conversion

---

## 🎯 **BENEFITS OF NEW ARCHITECTURE**

### **Cross-Domain Authentication**
- ✅ **Single Sign-On**: Users authenticate once, access both domains
- ✅ **DRIVR Agent Access**: Agent available from both carculture.com and carmania.carculture.com
- ✅ **Shared Wallet State**: Wallet connection persists across domains
- ✅ **Real-time Sync**: Authentication changes sync instantly

### **Signup Data Capture**
- ✅ **Comprehensive Data**: Email, interests, wallet address, UTM tracking
- ✅ **Cross-Domain Recognition**: Signup recognized across all domains
- ✅ **Engagement Tracking**: User actions tracked across platform
- ✅ **Marketing Attribution**: UTM parameters captured for analytics

### **Technical Benefits**
- ✅ **Scalable Architecture**: Easy to add new domains
- ✅ **Secure Communication**: PostMessage API with origin verification
- ✅ **Persistent Storage**: Cloudflare D1 for reliable data storage
- ✅ **Performance Optimized**: Minimal overhead for cross-domain communication

---

*Last Updated: 2025-01-XX*
*Status: Cross-domain authentication and signup strategy implemented*
*Next Action: Deploy carculture.com and configure CDP domains*
