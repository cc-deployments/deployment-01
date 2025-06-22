# CarCulture MiniApp

A MiniKit app for the CarCulture community, built with OnchainKit. It allows users to mint CarMania NFT series on the Base network, featuring an admin interface for easy daily content management and a multi-channel distribution workflow.

## Features

- 🚗 **CarMania NFT Series**: Mint daily and curated cars as NFTs.
- 💎 **NFT Collection**: Build your digital car collection.
- ⚡ **Instant Mint**: One-click minting on Base network
- 🎨 **Beautiful UI**: Modern, responsive design with CarCulture branding.
- 🔧 **Admin Interface**: Easy daily content management for CarMania drops.
- 📱 **Multi-Channel Distribution**: Optimized for social media and Farcaster.
- 🤖 **Agent Kit Integration**: Chat with the CarCulture AI about CarMania cars after minting.

## Setup

### 1. Install Dependencies

```bash
cd coinbase/carculture-miniapp
npm install --legacy-peer-deps
```

### 2. Environment Variables

Create a `.env.local` file in the `coinbase/carculture-miniapp` directory:

```env
# OnchainKit API Key
# Get your API key from: https://docs.base.org/onchainkit/getting-started
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Daily Workflow (No Coding Required!)

### **Your Daily Process:**

1. **Create NFT in Coinbase Wallet**
   - Go to Coinbase Wallet's "create a Mint flow"
   - Set up your car NFT with image, name, and description
   - Copy the contract address from the URL

2. **Add to Admin Panel**
   - Visit `http://localhost:3000/admin`
   - Fill in the contract address and car details
   - Click "Add New Car NFT"
   - Activate the new car (automatically deactivates the previous one)

3. **Done!** 
   - Your app automatically shows the new car
   - Users can immediately start minting
   - No code changes or deployments needed

### **Admin Interface Features:**
- ✅ Add new car NFTs with contract addresses
- ✅ Activate/deactivate cars
- ✅ View all historical cars
- ✅ Delete cars if needed
- ✅ Automatic date tracking
- ✅ No technical knowledge required

## Multi-Channel Distribution Workflow

### **Complete Daily Process (15 minutes):**

1. **Content Creation (5-10 min)**
   - Create sticker-style art in Adobe Express for the daily CarMania drop.
   - Export for Instagram, Facebook, X, Farcaster.
   - Include "CarMania Car of the Day" branding.

2. **Social Media Distribution (5 min)**
   - Post to Instagram, Facebook, X via Adobe Express
   - Use optimized captions with mint links
   - Engage with community

3. **Farcaster Casting (3 min)**
   - Download optimized image to mobile
   - Cast to Farcaster with mint link
   - Engage with Web3 community

4. **Admin Setup (2 min)**
   - Create NFT contract in Coinbase Wallet
   - Update admin panel with new CarMania car
   - Activate for immediate minting

### **User Journey:**
1. **Discovery**: Social media post → Click link
2. **Splash Page**: Sticker-style CARMANIA branding
3. **Mint Page**: Clean NFTMint card with logo only
4. **Minting**: One-click via OnchainKit
5. **Post-Mint**: Agent Kit chat about the car

## App Structure

- **Splash Page** (`/`): Sticker-style social media aesthetic for CarMania.
- **NFT Mint Card** (`/` → "Get Started"): Clean OnchainKit minting interface for a CarMania NFT.
- **Admin Panel** (`/admin`): Daily car management interface for CarMania drops.
- **Agent Chat**: Post-mint AI conversation about CarMania cars.
- **TitleBar**: CarCulture branding and navigation
- **Footer**: Social interaction buttons

## Technologies Used

- **OnchainKit**: NFT minting functionality
- **Next.js 14**: React framework with App Router
- **Tailwind CSS**: Styling
- **Base Network**: L2 blockchain for minting
- **TypeScript**: Type safety
- **LocalStorage**: Simple data persistence (can be upgraded to database)
- **Agent Kit**: CarCulture AI chat integration (simulated, ready for real integration)

## MiniKit Integration

This app follows the MiniKit pattern from Base.org, providing:
- Unified SDK for decentralized platforms
- Simplified user onboarding
- Pre-configured connectors
- Built-in utility features

## Agent Kit Integration

The CarCulture AI Agent is a core feature of the platform.

### Current Features:
- 🤖 Simulated AI responses about CarMania cars.
- 💬 Interactive chat interface
- 🚗 Car-specific knowledge base
- 📱 Mobile-optimized chat experience

### Future Roadmap:
1. **Phase 1**: Real Agent Kit integration
2. **Phase 2**: Advanced car knowledge base
3. **Phase 3**: Community-driven responses
4. **Phase 4**: Multi-language support

## Future Enhancements

- **Database Integration**: Replace localStorage with proper database
- **Manifold Studios Integration**: For selling already minted NFTs
- **Gallery View**: Show all minted car NFTs
- **Social Features**: Sharing and community features
- **Multiple Collections**: Different car categories
- **Analytics**: Track minting statistics
- **Automated Social Media**: Schedule posts across platforms
- **Advanced Agent Kit**: Real AI with car expertise

## Documentation

- **[Multi-Channel Workflow Guide](MULTI-CHANNEL-WORKFLOW.md)**: Complete distribution strategy for CarMania.
- **[Admin Interface Guide](README.md#admin-interface)**: Daily management instructions
- **[Agent Kit Integration](README.md#agent-kit-integration)**: AI chat features

## Resources

- [OnchainKit Documentation](https://docs.base.org/onchainkit/mint/nft-mint-card)
- [MiniKit Documentation](https://www.base.org/builders/minikit)
- [Base Network](https://base.org)
- [Coinbase Wallet Mint Flow](https://wallet.coinbase.com/) (for creating NFTs)
- [Agent Kit Documentation](https://docs.base.org/agentkit) (for future integration)

[ ] Test App**: Run `cd coinbase/carculture-miniapp && npm run dev` 