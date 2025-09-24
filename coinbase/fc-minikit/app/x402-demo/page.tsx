'use client';

import { X402DRIVRAgent } from '../components/X402DRIVRAgent';

export default function X402Demo() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚗 CarCulture DRIVR Agent Demo
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Experience the future of autonomous payment agents
          </p>
          <p className="text-lg text-blue-600 font-medium mb-6">
            Message: drivr.base.eth
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold text-blue-900 mb-3">
              🔧 x402 Protocol Features
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div>
                <h3 className="font-medium text-blue-800 mb-2">Autonomous Payments</h3>
                <p className="text-sm text-blue-700">
                  DRIVR can automatically pay for premium data and services using x402 protocol
                </p>
              </div>
              <div>
                <h3 className="font-medium text-blue-800 mb-2">Pay-as-you-go</h3>
                <p className="text-sm text-blue-700">
                  Only pay for what you use - no subscriptions or API keys required
                </p>
              </div>
              <div>
                <h3 className="font-medium text-blue-800 mb-2">Instant Settlement</h3>
                <p className="text-sm text-blue-700">
                  Payments are verified on-chain in real-time using Base network
                </p>
              </div>
              <div>
                <h3 className="font-medium text-blue-800 mb-2">HTTP 402 Integration</h3>
                <p className="text-sm text-blue-700">
                  Seamless integration with existing HTTP infrastructure
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
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

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🧪 Try These Commands
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Basic Queries</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• "Show me summer cars"</li>
                <li>• "What NFTs do you have?"</li>
                <li>• "Help me find a woodie wagon"</li>
                <li>• "Tell me about premium collectors"</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">x402 Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• "What's the floor price for summertime?"</li>
                <li>• "Get market data for woodie wagon"</li>
                <li>• "Show me x402 payment features"</li>
                <li>• "How does autonomous payment work?"</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">
            🚀 Built with Base & x402 Foundation
          </h2>
          <p className="text-lg mb-4">
            This CarCulture DRIVR agent showcases the power of autonomous payment agents using the x402 protocol 
            developed by Coinbase and Cloudflare.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://docs.base.org/base-app/agents/x402-agents" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              📚 x402 Agents Docs
            </a>
            <a 
              href="https://docs.base.org/base-app/agents/getting-started" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              🚀 Getting Started
            </a>
            <a 
              href="https://x402.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              🌐 x402.org
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
