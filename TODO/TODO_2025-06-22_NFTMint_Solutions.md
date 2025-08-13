# TODO: NFTMint Solutions - June 22, 2025

## 🎯 Project Overview
**Goal**: Build a MiniKit app with NFTMint card functionality for daily car NFT distribution across multiple channels.

## 📋 Key Decisions Made

### **OnchainKit Components Analysis**
- **NFTCard**: For displaying/viewing already minted NFTs
- **NFTMintCard**: For minting new NFTs (our primary focus)
- **Decision**: Using `NFTMintCardDefault` for simplified implementation

### **App Architecture**
- **Location**: `coinbase/car-of-the-day/`
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with CarCulture branding
- **Blockchain**: Base Network (L2)
- **Provider**: OnchainKit with Base chain configuration

## ✅ Completed Features

### **1. Core App Structure**
- [x] Next.js 14 setup with TypeScript
- [x] OnchainKit integration with Base network
- [x] Tailwind CSS configuration
- [x] Environment variable setup
- [x] Package.json with dependencies

### **2. UI Components**
- [x] **Splash Page**: Sticker-style social media aesthetic
  - CARMANIA branding with vibrant colors
  - Sticker elements (⚡ INSTANT MINT, 💎 COLLECTIBLE, 🎯 DAILY DROP)
  - Social media optimized design
- [x] **NFTMint Card**: Clean, professional minting interface
  - CarCulture logo only (no stickers)
  - OnchainKit NFTMintCardDefault integration
  - Dynamic contract address loading
- [x] **Admin Panel**: No-code daily management
  - Add new car NFTs with contract addresses
  - Activate/deactivate cars
  - Historical car tracking
  - LocalStorage persistence

### **3. Multi-Channel Distribution Workflow**
- [x] **Content Creation**: Adobe Express sticker-style art
- [x] **Social Media**: Instagram, Facebook, X optimization
- [x] **Farcaster**: MiniApp casting strategy
- [x] **Admin Workflow**: 2-minute daily setup process

### **4. Agent Kit Integration (Simulated)**
- [x] **Chat Interface**: Post-mint AI conversation
- [x] **Car Knowledge**: Simulated responses about cars
- [x] **Mobile Optimization**: Responsive chat experience
- [x] **Future Ready**: Structure for real Agent Kit integration

## 🔄 Pending Decisions

### **Coinbase Wallet Integration Options**
**Option 1: NFTCard**
- **Use Case**: Display already minted NFTs
- **Pros**: Good for showcasing collections, secondary market
- **Cons**: Not for minting new NFTs
- **Best For**: Gallery views, selling existing NFTs

**Option 2: NFTMintCard**
- **Use Case**: Mint new NFTs
- **Pros**: Direct minting, daily drops, user engagement
- **Cons**: Requires daily contract creation
- **Best For**: Daily car drops, user minting experience

### **NEW: MiniKit vs OnchainKit Decision**
**Option 1: Current OnchainKit Approach**
- **Use Case**: Basic NFT minting functionality
- **Pros**: Simple implementation, works standalone
- **Cons**: No Farcaster integration, limited social features
- **Best For**: Basic minting apps

**Option 2: MiniKit Integration (BASE AI Recommended)**
- **Use Case**: Full Farcaster Mini App with social features
- **Pros**: Native Farcaster integration, notifications, social features
- **Cons**: More complex setup, requires backend infrastructure
- **Best For**: Social NFT apps, community engagement

### **Decision Needed**: 
- [ ] Choose between NFTCard vs NFTMintCard for primary use case
- [ ] **NEW**: Decide between OnchainKit vs MiniKit approach
- [ ] Consider hybrid approach (mint + display)
- [ ] Evaluate Manifold Studios integration for secondary market

## 🚀 Implementation Status

### **Current Setup (OnchainKit)**
```
coinbase/car-of-the-day/
├── app/
│   ├── components/
│   │   ├── SplashPage.tsx (sticker-style)
│   │   ├── CarMintCard.tsx (clean minting)
│   │   ├── TitleBar.tsx (branding)
│   │   └── Footer.tsx (social buttons)
│   ├── admin/
│   │   └── page.tsx (daily management)
│   ├── layout.tsx (OnchainKit provider)
│   ├── page.tsx (main app)
│   └── globals.css (Tailwind)
├── public/
│   └── logo-white.svg (CarCulture logo)
├── package.json (dependencies)
├── next.config.js
├── tailwind.config.js
└── README.md (documentation)
```

### **NEW: Required MiniKit Setup**
```
coinbase/car-of-the-day/
├── app/
│   ├── components/ (existing)
│   ├── layout.tsx (MiniKitProvider)
│   ├── page.tsx (with MiniKit hooks)
│   └── globals.css
├── api/
│   ├── notification/
│   │   └── route.ts (notification proxy)
│   └── webhooks/
│       └── route.ts (frame events)
├── public/
│   └── logo-white.svg
├── package.json (with MiniKit dependencies)
├── next.config.js
├── tailwind.config.js
└── README.md
```

### **Dependencies Installed**
- [x] @coinbase/onchainkit: ^0.35.2
- [x] Next.js 14 with App Router
- [x] Tailwind CSS for styling
- [x] TypeScript for type safety
- [x] Base network configuration

### **NEW: Missing MiniKit Dependencies**
- [ ] **MiniKit Provider**: Replace OnchainKitProvider
- [ ] **MiniKit Hooks**: useMiniKit, useAddFrame, useNotification, etc.
- [ ] **Backend Infrastructure**: Redis database, webhooks
- [ ] **Farcaster Integration**: Account association, frame manifest
- [ ] **Notification System**: Proxy routes and handlers

## 📱 Daily Workflow (15 minutes)

### **Phase 1: Content Creation (5-10 min)**
- [ ] Create sticker-style art in Adobe Express
- [ ] Export for Instagram (1080x1080), Facebook (1200x630), X (1200x675)
- [ ] Include "CARMANIA Car of the Day" branding

### **Phase 2: Social Distribution (5 min)**
- [ ] Post to Instagram, Facebook, X via Adobe Express
- [ ] Use optimized captions with mint links
- [ ] Engage with community

### **Phase 3: Farcaster Casting (3 min)**
- [ ] Download optimized image to mobile
- [ ] Cast to Farcaster with mint link
- [ ] Engage with Web3 community

### **Phase 4: Admin Setup (2 min)**
- [ ] Create NFT contract in Coinbase Wallet
- [ ] Update admin panel with new car
- [ ] Activate for immediate minting

## 🔧 Technical TODOs

### **Immediate Tasks**
- [ ] **Get OnchainKit API Key**: Required for NFTMintCard functionality
- [ ] **Test App**: Run `cd coinbase/car-of-the-day && npm run dev`
- [ ] **Create Test NFT**: Use Coinbase Wallet "create a Mint flow"
- [ ] **Add Test Car**: Use admin panel at `/admin`
- [ ] **Verify Minting**: Test complete user flow

### **NEW: MiniKit Integration Tasks**
- [ ] **Decide Approach**: OnchainKit vs MiniKit (BASE AI recommendation)
- [ ] **If MiniKit**: Install MiniKit dependencies
- [ ] **Replace Provider**: OnchainKitProvider → MiniKitProvider
- [ ] **Add MiniKit Hooks**: useMiniKit, useAddFrame, useNotification
- [ ] **Setup Backend**: Redis database, notification proxy
- [ ] **Farcaster Config**: .well-known/farcaster.json
- [ ] **Frame Manifest**: Account association generation
- [ ] **Webhook Handlers**: Frame events and notifications
- [ ] **Social Features**: Add frame, notifications, authentication

### **Future Enhancements**
- [ ] **Database Integration**: Replace localStorage with proper database
- [ ] **Real Agent Kit**: Integrate actual Agent Kit API
- [ ] **Manifold Studios**: Secondary market for minted NFTs
- [ ] **Analytics Dashboard**: Track minting and engagement metrics
- [ ] **Automated Social Media**: Schedule posts across platforms
- [ ] **Community Features**: User galleries and collections

## 📊 Success Metrics

### **Key Performance Indicators**
- [ ] **Social Media**: Engagement rates, click-through rates
- [ ] **Minting**: Daily mint counts, conversion rates
- [ ] **Agent Chat**: User engagement, question types
- [ ] **Community**: Farcaster engagement, community growth

## 🎨 Design Decisions

### **Two-Page Strategy**
1. **Splash Page (`/`)**: Sticker-style social media aesthetic
2. **Mint Page (`/` → "Get Started")**: Clean, professional minting interface

### **Branding Consistency**
- **CARMANIA**: Primary brand identity
- **CarCulture**: Technical/logistical branding
- **Color Scheme**: Red (#8B0000) primary, dark theme
- **Typography**: System fonts for readability

## 📚 Documentation Created

- [x] **README.md**: Complete setup and usage guide
- [x] **MULTI-CHANNEL-WORKFLOW.md**: Detailed distribution strategy
- [x] **Admin Interface Guide**: Daily management instructions
- [x] **Agent Kit Integration**: AI chat features documentation

## 🔗 Resources & References

### **Documentation**
- [OnchainKit NFTMintCard](https://docs.base.org/onchainkit/mint/nft-mint-card)
- [MiniKit Documentation](https://www.base.org/builders/minikit)
- [Base Network](https://base.org)
- [Coinbase Wallet Mint Flow](https://wallet.coinbase.com/)

### **Key Decisions**
- **OnchainKit Provider**: Configured with Base network
- **NFTMintCardDefault**: Simplified implementation approach
- **LocalStorage**: Temporary data persistence (upgrade to database later)
- **Agent Kit**: Simulated responses (ready for real integration)

## 🎯 Next Steps

### **Immediate (This Week)**
1. [ ] **NEW**: Decide between OnchainKit vs MiniKit approach
2. [ ] **If MiniKit**: Start MiniKit integration process
3. [ ] **If OnchainKit**: Continue with current approach
4. [ ] Get OnchainKit API key
5. [ ] Test complete app functionality
6. [ ] Create first test car NFT
7. [ ] Validate multi-channel workflow

### **Short Term (Next 2 Weeks)**
1. [ ] **If MiniKit**: Complete MiniKit integration
2. [ ] **If MiniKit**: Setup Farcaster account association
3. [ ] **If MiniKit**: Implement notification system
4. [ ] Deploy to production environment
5. [ ] Set up proper database
6. [ ] Integrate real Agent Kit
7. [ ] Launch first daily car drop
8. [ ] Monitor and optimize performance

### **Long Term (Next Month)**
1. [ ] Manifold Studios integration
2. [ ] Advanced analytics dashboard
3. [ ] Community features
4. [ ] Automated social media posting
5. [ ] Multi-language support

---

**Created**: June 22, 2025  
**Status**: Core implementation complete, pending Coinbase Wallet component decision  
**Priority**: High - Ready for testing and deployment 