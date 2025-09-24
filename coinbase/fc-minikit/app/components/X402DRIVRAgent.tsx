'use client';

import React, { useState, useEffect } from 'react';
import { CDPOnRampIntegration } from './CDPOnRampIntegration';

interface ChatMessage {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    productId?: string;
    price?: number;
    currency?: string;
    contractAddress?: string;
    tokenId?: string;
    paymentRequired?: boolean;
    paymentAmount?: string;
  };
  contentType?: 'text' | 'actions' | 'intent';
  actions?: QuickAction[];
}

interface QuickAction {
  id: string;
  label: string;
  imageUrl?: string;
  style?: 'primary' | 'secondary' | 'danger';
  expiresAt?: string;
}

interface X402DRIVRAgentProps {
  className?: string;
  onPaymentSuccess?: (paymentId: string, transactionHash?: string) => void;
  onPaymentError?: (error: string) => void;
}

export function X402DRIVRAgent({
  className,
  onPaymentSuccess,
  onPaymentError
}: X402DRIVRAgentProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'agent',
      content: `hey, i'm DRIVR. i can help you discover, analyze, and purchase amazing automotive NFTs from the CarMania collection. here's the rundown:

• **discover cars**: find NFTs by style, era, or theme. try "show me summer cars" or "find vintage woodies"
• **get market data**: real-time floor prices, trends, and analytics. try "floor price for summertime" 
• **autonomous payments**: i handle x402 payments automatically for premium data
• **instant purchases**: buy with credit card, Apple Pay, or crypto. try "buy woodie wagon"

what kind of car interests you most?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentRequired, setPaymentRequired] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');

  // Sample NFT products with x402 integration
  const nftProducts = {
    'summertime': {
      productId: 'summertime-blues',
      productName: 'Summertime Blues NFT',
      price: 0.001,
      currency: 'ETH',
      contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
      tokenId: '1',
      description: 'A legendary automotive NFT featuring classic summer vibes and car culture nostalgia. Perfect for collectors who appreciate vintage aesthetics.',
      keywords: ['summer', 'vintage', 'classic', 'nostalgia', 'blues'],
      mintUrl: 'https://manifold.xyz/@carculture/id/4144040176'
    },
    'woodie': {
      productId: 'woodie-wagon',
      productName: 'Woodie Wagon NFT',
      price: 0.002,
      currency: 'ETH',
      contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
      tokenId: '2',
      description: 'An exclusive Woodie Wagon design celebrating surf culture and automotive heritage. Limited edition with premium artistic quality.',
      keywords: ['woodie', 'wagon', 'surf', 'premium', 'limited', 'heritage'],
      mintUrl: 'https://manifold.xyz/@carculture/id/4149840112'
    },
    'premium': {
      productId: 'premium-collector',
      productName: 'Premium Collector Edition NFT',
      price: 0.005,
      currency: 'ETH',
      contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
      tokenId: '3',
      description: 'The ultimate collector piece featuring rare automotive art with exclusive benefits and community access.',
      keywords: ['premium', 'collector', 'exclusive', 'rare', 'vip', 'ultimate'],
      mintUrl: 'https://manifold.xyz/@carculture/id/4169097456'
    }
  };

  const addMessage = (type: 'user' | 'agent' | 'system', content: string, metadata?: any, contentType: 'text' | 'actions' | 'intent' = 'text', actions?: QuickAction[]) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      metadata,
      contentType,
      actions
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addQuickActions = (description: string, actions: QuickAction[]) => {
    addMessage('agent', description, undefined, 'actions', actions);
  };

  const simulateTyping = async (response: string, delay: number = 1000) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, delay));
    addMessage('agent', response);
    setIsTyping(false);
  };

  const findMatchingProduct = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    for (const [key, product] of Object.entries(nftProducts)) {
      if (product.keywords.some(keyword => input.includes(keyword))) {
        return { key, product };
      }
    }
    
    return null;
  };

  const handleX402Payment = async (endpoint: string, productName: string) => {
    try {
      // First request to get payment details
      const response = await fetch(endpoint);
      
      if (response.status === 402) {
        const paymentDetails = await response.json();
        
        // Show payment requirement to user
        addMessage('system', `💰 x402 Payment Required: ${paymentDetails.amount} USDC for ${productName} details. This enables autonomous payment processing.`);
        setPaymentRequired(true);
        setPaymentAmount(paymentDetails.amount);
        
        // In a real implementation, you would:
        // 1. Use the x402 SDK to create and execute payment
        // 2. Retry the request with payment header
        // 3. Return the data to user
        
        return paymentDetails;
      } else if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error('x402 payment error:', error);
      addMessage('system', '❌ x402 payment processing failed. Please try again.');
    }
  };

  const handleQuickAction = async (actionId: string) => {
    // Handle Quick Action selections
    addMessage('user', `Selected: ${actionId}`, undefined, 'intent');
    
    switch (actionId) {
      case 'discover_cars':
        await simulateTyping("let's find some amazing cars! what style interests you?");
        addQuickActions("choose a car style:", [
          { id: 'summer_cars', label: '☀️ Summer Cars', style: 'primary' },
          { id: 'vintage_cars', label: '🏛️ Vintage Cars', style: 'primary' },
          { id: 'surf_cars', label: '🏄 Surf Cars', style: 'secondary' },
          { id: 'premium_cars', label: '👑 Premium Cars', style: 'secondary' }
        ]);
        break;
      case 'market_data':
        await simulateTyping("i'll get you real-time market data using x402 payments!");
        addQuickActions("which collection?", [
          { id: 'summertime_data', label: '☀️ Summertime Blues', style: 'primary' },
          { id: 'woodie_data', label: '🏄 Woodie Wagon', style: 'primary' },
          { id: 'premium_data', label: '👑 Premium Collector', style: 'secondary' }
        ]);
        break;
      case 'buy_nft':
        await simulateTyping("let's find the perfect NFT to buy!");
        addQuickActions("which NFT interests you?", [
          { id: 'buy_summertime', label: '☀️ Summertime Blues', style: 'primary' },
          { id: 'buy_woodie', label: '🏄 Woodie Wagon', style: 'primary' },
          { id: 'buy_premium', label: '👑 Premium Collector', style: 'secondary' }
        ]);
        break;
      case 'x402_demo':
        await simulateTyping("here's how x402 autonomous payments work:");
        addMessage('agent', `🔧 **x402 Demo Features:**

• **autonomous payments** - i pay for premium data automatically
• **pay-as-you-go** - only pay for what you use  
• **instant settlement** - verified on-chain in real-time
• **base network** - fast, cheap transactions

try asking for "floor price for summertime" to see it in action!`);
        break;
      case 'buy_now':
        setShowPayment(true);
        break;
      case 'get_market_data':
        await handleX402Payment(`/api/nft-floor/${selectedProduct?.productId}`, selectedProduct?.productName);
        break;
      default:
        await simulateTyping(`you selected: ${actionId}. let me help you with that!`);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    addMessage('user', userMessage);
    setInputMessage('');

    // Immediate feedback (reaction) as per Base guidelines
    addMessage('agent', '👀', undefined, 'text');
    
    // Simulate AI processing
    setIsTyping(true);
    
    setTimeout(async () => {
      const match = findMatchingProduct(userMessage);
      
      if (match) {
        const { key, product } = match;
        setSelectedProduct(product);
        
        // Check if this is a premium request that requires x402 payment
        if (userMessage.includes('floor price') || userMessage.includes('market data')) {
          await simulateTyping(
            `🔍 I found ${product.productName}! Let me get the latest market data for you...`
          );
          
          // Simulate x402 payment for premium data
          const paymentDetails = await handleX402Payment(`/api/nft-floor/${key}`, product.productName);
          
          if (paymentDetails) {
            await simulateTyping(
              `📊 **${product.productName} Market Data:**\n\n` +
              `💰 Price: ${product.currency === 'ETH' ? `${product.price} ETH` : `$${product.price}`}\n` +
              `🎨 Description: ${product.description}\n` +
              `🔗 Contract: ${product.contractAddress}\n\n` +
              `This data was retrieved using x402 autonomous payments! Would you like to purchase this NFT?`
            );
          }
        } else {
          await simulateTyping(
            `great choice! i found the perfect NFT for you: **${product.productName}**\n\n` +
            `💰 price: ${product.currency === 'ETH' ? `${product.price} ETH` : `$${product.price}`}\n` +
            `🎨 description: ${product.description}`
          );
          
          // Add Quick Actions for product interaction
          addQuickActions("what would you like to do?", [
            {
              id: 'buy_now',
              label: '🛒 Buy Now',
              style: 'primary'
            },
            {
              id: 'get_market_data',
              label: '📊 Market Data',
              style: 'secondary'
            },
            {
              id: 'view_details',
              label: '🔍 View Details',
              style: 'secondary'
            },
            {
              id: 'find_similar',
              label: '🔍 Find Similar',
              style: 'secondary'
            }
          ]);
        }
        
        // Show payment option
        setTimeout(() => {
          addMessage('system', '💳 Payment options available below. Choose your preferred method!');
          setShowPayment(true);
        }, 500);
        
      } else if (userMessage.includes('help') || userMessage.includes('what') || userMessage.includes('show')) {
        await simulateTyping(
          "here's what i can help you with:"
        );
        
        // Add Quick Actions for better engagement
        addQuickActions("choose what interests you most:", [
          {
            id: 'discover_cars',
            label: '🚗 Discover Cars',
            style: 'primary'
          },
          {
            id: 'market_data',
            label: '📊 Market Data',
            style: 'primary'
          },
          {
            id: 'buy_nft',
            label: '🛒 Buy NFT',
            style: 'secondary'
          },
          {
            id: 'x402_demo',
            label: '⚡ x402 Demo',
            style: 'secondary'
          }
        ]);
      } else if (userMessage.includes('x402') || userMessage.includes('payment')) {
        await simulateTyping(
          "🔧 **x402 Payment Protocol Features:**\n\n" +
          "• **Autonomous Payments** - I can pay for premium data automatically\n" +
          "• **Pay-as-you-go** - Only pay for what you use\n" +
          "• **Instant Settlement** - Payments verified on-chain in real-time\n" +
          "• **Base Network** - Built on Base for fast, cheap transactions\n\n" +
          "Try asking for 'floor price' or 'market data' to see x402 in action!"
        );
      } else if (userMessage.includes('price') || userMessage.includes('cost')) {
        await simulateTyping(
          "Our NFT prices range from 0.001 ETH to 0.005 ETH:\n\n" +
          "• **Summertime Blues**: 0.001 ETH - Perfect for casual collectors\n" +
          "• **Woodie Wagon**: 0.002 ETH - Premium artistic quality\n" +
          "• **Premium Collector**: 0.005 ETH - Exclusive VIP benefits\n\n" +
          "💡 **x402 Bonus:** Ask for 'floor price' to get real-time market data with autonomous payments!"
        );
      } else {
        await simulateTyping(
          "I'd love to help you find the perfect automotive NFT! You can ask me about:\n\n" +
          "• Specific car styles or themes\n" +
          "• Pricing and features\n" +
          "• Real-time market data (uses x402 payments)\n" +
          "• How to purchase with credit card\n" +
          "• What makes each NFT special\n\n" +
          "💡 **Pro Tip:** Ask for 'floor price' to see x402 autonomous payments in action!"
        );
      }
    }, 1000);
  };

  const handlePaymentSuccess = (paymentId: string, transactionHash?: string) => {
    addMessage('system', `🎉 Payment successful! Your NFT is being minted and will be delivered shortly. Payment ID: ${paymentId}`);
    setShowPayment(false);
    setPaymentRequired(false);
    onPaymentSuccess?.(paymentId, transactionHash);
  };

  const handlePaymentError = (error: string) => {
    addMessage('system', `❌ Payment failed: ${error}. Please try again or contact support.`);
    onPaymentError?.(error);
  };

  return (
    <div className={`w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg border ${className}`}>
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
            🚗
          </div>
          <div>
            <h2 className="text-lg font-bold">DRIVR - AI Car Expert with x402</h2>
            <p className="text-sm opacity-90">Autonomous payment-enabled automotive NFT assistant</p>
          </div>
        </div>
      </div>

      {/* x402 Status Indicator */}
      {paymentRequired && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                💰 <strong>x402 Payment Required:</strong> {paymentAmount} USDC for premium data access
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            <div
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : message.type === 'system'
                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            {message.contentType === 'actions' && message.actions && (
              <div className="flex flex-wrap gap-2 mt-2 ml-0">
                {message.actions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      action.style === 'primary'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : action.style === 'danger'
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Component */}
      {showPayment && selectedProduct && (
        <div className="border-t p-4 bg-gray-50">
          <CDPOnRampIntegration
            {...selectedProduct}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
            className="max-w-md mx-auto"
          />
        </div>
      )}

      {/* Chat Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me about automotive NFTs or x402 payments..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={isTyping || !inputMessage.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

// Example usage component
export function X402DRIVRAgentExample() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🤖 x402 DRIVR Agent Demo
          </h1>
          <p className="text-gray-600">
            Experience AI-powered NFT sales with autonomous x402 payments
          </p>
        </div>
        
        <X402DRIVRAgent
          onPaymentSuccess={(paymentId, txHash) => {
            console.log('Payment completed:', { paymentId, txHash });
            alert(`🎉 Payment successful! Payment ID: ${paymentId}`);
          }}
          onPaymentError={(error) => {
            console.error('Payment error:', error);
            alert(`❌ Payment failed: ${error}`);
          }}
        />
      </div>
    </div>
  );
}
