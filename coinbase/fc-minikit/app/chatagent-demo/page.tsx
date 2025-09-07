'use client';

import React from 'react';
import { ChatAgentCommerce } from '../components/ChatAgentCommerce';

export default function ChatAgentDemo() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🤖 ChatAgent Commerce Demo
          </h1>
          <p className="text-gray-600">
            Experience AI-powered NFT sales with credit card payments
          </p>
        </div>

        {/* ChatAgent Commerce Component */}
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

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">How ChatAgent Commerce Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">🤖 AI-Powered Discovery</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Natural language conversation</div>
                  <div>• Intelligent product matching</div>
                  <div>• Personalized recommendations</div>
                  <div>• Real-time assistance</div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-3">💳 Seamless Payments</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Credit card, Apple Pay, Google Pay</div>
                  <div>• No crypto knowledge required</div>
                  <div>• Automatic smart wallet creation</div>
                  <div>• Instant NFT delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span>🤖</span>
                <span>AI Chat Interface</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💳</span>
                <span>Credit Card Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎯</span>
                <span>Smart Product Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📱</span>
                <span>Mobile Optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🔒</span>
                <span>Secure Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⚡</span>
                <span>Instant Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🌍</span>
                <span>Global Support</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎨</span>
                <span>Premium NFTs</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🚫</span>
                <span>No Crypto Required</span>
              </div>
            </div>
          </div>
        </div>

        {/* Try It Out */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white text-center">
            <h2 className="text-xl font-bold mb-2">Ready to Try ChatAgent Commerce?</h2>
            <p className="mb-4">
              Start chatting with DRIVR above to discover and purchase automotive NFTs!
            </p>
            <div className="text-sm opacity-90">
              <p>💡 Try saying: "I want something vintage" or "Show me premium options"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
