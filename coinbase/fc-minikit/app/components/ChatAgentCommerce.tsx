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
  };
}

interface ChatAgentCommerceProps {
  className?: string;
  onPaymentSuccess?: (paymentId: string, transactionHash?: string) => void;
  onPaymentError?: (error: string) => void;
}

export function ChatAgentCommerce({
  className,
  onPaymentSuccess,
  onPaymentError
}: ChatAgentCommerceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'agent',
      content: "Hi! I'm DRIVR, your AI car expert. I can help you discover and purchase amazing automotive NFTs from the CarMania collection. What kind of car are you interested in?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showPayment, setShowPayment] = useState(false);

  // Sample NFT products
  const nftProducts = {
    'summertime': {
      productId: 'summertime-blues-1',
      productName: 'Summertime Blues NFT',
      price: 0.001, // Real Manifold price
      currency: 'ETH',
      contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
      tokenId: '1',
      description: 'A legendary automotive NFT featuring classic summer vibes and car culture nostalgia. Perfect for collectors who appreciate vintage aesthetics.',
      keywords: ['summer', 'vintage', 'classic', 'nostalgia', 'blues']
    },
    'woodie': {
      productId: 'woodie-wagon-1',
      productName: 'Woodie Wagon NFT',
      price: 0.002, // Example price - update with real Manifold price
      currency: 'ETH',
      contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
      tokenId: '2',
      description: 'An exclusive Woodie Wagon design celebrating surf culture and automotive heritage. Limited edition with premium artistic quality.',
      keywords: ['woodie', 'wagon', 'surf', 'premium', 'limited', 'heritage']
    },
    'premium': {
      productId: 'premium-collector-1',
      productName: 'Premium Collector Edition NFT',
      price: 0.005, // Example price - update with real Manifold price
      currency: 'ETH',
      contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
      tokenId: '3',
      description: 'The ultimate collector piece featuring rare automotive art with exclusive benefits and community access.',
      keywords: ['premium', 'collector', 'exclusive', 'rare', 'vip', 'ultimate']
    }
  };

  const addMessage = (type: 'user' | 'agent' | 'system', content: string, metadata?: any) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      metadata
    };
    setMessages(prev => [...prev, newMessage]);
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

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    addMessage('user', userMessage);
    setInputMessage('');

    // Simulate AI processing
    setIsTyping(true);
    
    setTimeout(async () => {
      const match = findMatchingProduct(userMessage);
      
      if (match) {
        const { key, product } = match;
        setSelectedProduct(product);
        
        await simulateTyping(
          `Great choice! I found the perfect NFT for you: **${product.productName}**\n\n` +
          `💰 Price: ${product.currency === 'ETH' ? `${product.price} ETH` : `$${product.price}`}\n` +
          `🎨 Description: ${product.description}\n\n` +
          `This is a premium automotive NFT with unique artistic value. Would you like to purchase it with your credit card? No crypto knowledge required!`
        );
        
        // Show payment option
        setTimeout(() => {
          addMessage('system', '💳 Payment option available below. Click to buy with credit card, Apple Pay, or Google Pay!');
          setShowPayment(true);
        }, 500);
        
      } else if (userMessage.includes('help') || userMessage.includes('what') || userMessage.includes('show')) {
        await simulateTyping(
          "I can help you find the perfect automotive NFT! Here are some options:\n\n" +
          "🚗 **Summertime Blues** - Classic summer vibes (0.001 ETH)\n" +
          "🏄 **Woodie Wagon** - Surf culture heritage (0.002 ETH)\n" +
          "👑 **Premium Collector** - Exclusive VIP edition (0.005 ETH)\n\n" +
          "Just tell me what style you're interested in, or ask about any specific car type!"
        );
      } else if (userMessage.includes('price') || userMessage.includes('cost')) {
        await simulateTyping(
          "Our NFT prices range from 0.001 ETH to 0.005 ETH:\n\n" +
          "• **Summertime Blues**: 0.001 ETH - Perfect for casual collectors\n" +
          "• **Woodie Wagon**: 0.002 ETH - Premium artistic quality\n" +
          "• **Premium Collector**: 0.005 ETH - Exclusive VIP benefits\n\n" +
          "All payments are processed securely with credit cards - no crypto knowledge required!"
        );
      } else {
        await simulateTyping(
          "I'd love to help you find the perfect automotive NFT! You can ask me about:\n\n" +
          "• Specific car styles or themes\n" +
          "• Pricing and features\n" +
          "• How to purchase with credit card\n" +
          "• What makes each NFT special\n\n" +
          "What kind of car or style interests you most?"
        );
      }
    }, 1000);
  };

  const handlePaymentSuccess = (paymentId: string, transactionHash?: string) => {
    addMessage('system', `🎉 Payment successful! Your NFT is being minted and will be delivered shortly. Payment ID: ${paymentId}`);
    setShowPayment(false);
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
            <h2 className="text-lg font-bold">DRIVR - AI Car Expert</h2>
            <p className="text-sm opacity-90">Your personal automotive NFT assistant</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
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
            placeholder="Ask me about automotive NFTs..."
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
export function ChatAgentCommerceExample() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🤖 ChatAgent Commerce Demo
          </h1>
          <p className="text-gray-600">
            Experience AI-powered NFT sales with credit card payments
          </p>
        </div>
        
        <ChatAgentCommerce
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
