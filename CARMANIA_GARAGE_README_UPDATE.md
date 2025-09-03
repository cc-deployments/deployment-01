# 🚗 CarMania Garage

**CarMania opens the Garage at BASE OnChain Summer 2025**

A hackathon demo showcasing AI-powered automotive analysis, NFT gallery integration, and **revolutionary Base Pay integration** for seamless USDC payments without wallet connections.

## 🏆 Demo Features

* **🧠 AI-Powered Car Recognition** - Trained models analyze NFT images
* **💳 Base Pay Integration** - **NEW!** USDC payments without wallet connection
* **📤 Share Integration** - Native share API + clipboard fallback for Farcaster
* **⚡ OnchainKit Ready** - Prepared for wallet connection
* **🎨 Professional UI** - Built with Next.js 15.3.4, TypeScript, and Tailwind CSS

## 🚀 **NEW: Base Pay Integration**

### **Revolutionary Payment Experience**
- **No Wallet Required**: Purchase NFTs with USDC directly
- **One-Click Payments**: Seamless payment flow on Base network
- **Instant Transactions**: Fast, secure payments without setup
- **Professional UX**: Polished payment interface with error handling

### **Base Pay Components**
- **BasePayButton**: Ready-to-use payment buttons
- **BasePayModal**: Professional payment modal interface
- **BasePayExample**: Complete demo showcasing all features
- **useBasePay Hook**: React hook for payment integration

## 🚀 Quick Start

1. **Install dependencies:**  
   ```bash
   npm install
   ```

2. **Start the development server:**  
   ```bash
   npm run dev
   ```

3. **Open your browser:**  
   Navigate to `http://localhost:3000/base-pay-demo` for Base Pay demo

## 🎯 Demo Flow

### **Base Pay Demo** (`/base-pay-demo`)
1. **Explore Base Pay Features** - See all payment components in action
2. **Test Payment Flow** - Experience seamless USDC payments
3. **View Integration** - See CarMania NFT purchase flow
4. **Error Handling** - Professional error states and feedback

### **Original Hackathon Demo** (`/hackathon-demo`)
1. **Show NFT Gallery** - Click "Show NFT Gallery" to see the car collection
2. **Select a Car** - Click on any car (BMW M1, Ferrari 250 GT, or Porsche 911)
3. **Analyze with ML** - Click "Analyze with ML" to see AI-powered analysis
4. **Share Results** - Use the share buttons to demonstrate functionality

## 🤖 Technical Stack

### **Base Pay Stack**
* **Base Account SDK** - `@base-org/account@^2.0.2`
* **React Components** - BasePayButton, BasePayModal, BasePayExample
* **TypeScript** - Full type safety and intellisense
* **Error Handling** - Comprehensive error states and user feedback
* **Wagmi Integration** - Works alongside existing wallet connections

### **ML Stack**
* FastAPI ML Service (Python)
* Hugging Face Transformers
* BLIP Image Captioning
* Custom Car Recognition Model
* CSV Database Integration

### **Frontend Stack**
* Next.js 15.3.4 + React
* TypeScript
* Tailwind CSS
* Native Share API
* OnchainKit (Ready)

## 💳 **Base Pay Implementation**

### **Key Features**
```typescript
// Simple payment button
<BasePayButton
  config={{
    amount: '5.00',
    to: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    testnet: true,
  }}
  onSuccess={(result) => console.log('Payment successful!')}
  onError={(error) => console.error('Payment failed:', error)}
/>

// React hook integration
const { pay, isProcessing, lastPayment, error } = useBasePay();
```

### **Payment Flow**
1. **User clicks payment button**
2. **Base Pay modal opens** with payment details
3. **User completes USDC payment** without wallet connection
4. **Transaction confirmed** on Base blockchain
5. **NFT ownership transferred** instantly

### **Error Handling**
- **User-friendly error messages**
- **Loading states** with professional indicators
- **Payment status tracking** in real-time
- **Fallback options** for failed payments

## 📱 Demo Screenshots

The demo features:

* **BMW M1 (Andy Warhol)** - Rare supercar with art car significance
* **Ferrari 250 GT** - Legendary Italian grand tourer
* **Porsche 911** - Timeless sports car engineering
* **Base Pay Integration** - Seamless USDC payment experience

## 🔧 OnchainKit Status

Temporarily disabled due to frame-sdk dependency issue (import error: 'frame-sdk' module not found). All components are prepared for reconnection when BASE team releases the fix.

**Base Pay works independently** of OnchainKit and provides a superior payment experience without wallet connections.

## 🎬 About CarMania Garage

CarMania Garage is a comprehensive collection of automotive stories, artwork, movies, and data spanning from 1885 forward. This hackathon demo showcases the AI-powered foundation for preserving automotive knowledge and cultural heritage onchain, now enhanced with **revolutionary Base Pay integration**.

## 🏁 Hackathon Submission

This demo was built for the Onchain Summer Hackathon, demonstrating:

* **Base Pay Integration** - Revolutionary USDC payments without wallet connection
* **AI-powered car recognition** and analysis
* **NFT gallery integration** with seamless purchase flow
* **Share functionality** for social platforms
* **Foundation for onchain automotive provenance**

### **Innovation Highlights**
- **First Base Pay Integration** in automotive NFT space
- **No Wallet Required** payment experience
- **Professional UX** with comprehensive error handling
- **Scalable Architecture** for future payment features
- **Production Ready** implementation

## 🚀 **Live Demo**

### **Base Pay Demo**
- **URL**: `/base-pay-demo`
- **Features**: Complete Base Pay showcase
- **Components**: All Base Pay components demonstrated
- **Integration**: CarMania NFT purchase flow

### **Hackathon Demo**
- **URL**: `/hackathon-demo`
- **Features**: AI-powered car recognition
- **Gallery**: NFT car collection
- **ML Analysis**: AI-powered automotive analysis

---

**Built with ❤️ by Car Culture**

*Drive the Past. Own the Moment. Pay with Base.*
