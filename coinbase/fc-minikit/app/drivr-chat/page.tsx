'use client';

import { DRIVRChatInterface } from '../components/DRIVRChatInterface';
import { DRIVRNotification } from '../../../../packages/shared-xmtp/src/types';
import { CrossDomainDRIVRAgent, useCrossDomainAuth } from '@shared/auth';

export default function DRIVRChatPage() {
  const { authState, isAuthenticated } = useCrossDomainAuth();

  const handlePaymentRequest = (amount: string, description: string) => {
    console.log('Payment requested:', { amount, description });
    // TODO: Integrate with payment system
    alert(`Payment Request: ${amount} - ${description}`);
  };

  const handleNotification = (notification: DRIVRNotification) => {
    console.log('DRIVR notification:', notification);
    // TODO: Show notification toast
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Chat with DRIVR
            </h1>
            <p className="text-gray-600">
              Your AI assistant for automotive NFTs and CarCulture collections
            </p>
            
            {/* Cross-domain auth status */}
            <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                isAuthenticated ? 'bg-green-500' : 'bg-gray-400'
              }`} />
              {isAuthenticated ? 'Cross-domain connected' : 'Cross-domain disconnected'}
            </div>
          </div>

          {/* Cross-domain DRIVR Agent Status */}
          <div className="mb-6">
            <CrossDomainDRIVRAgent 
              onAuthStateChange={(state) => {
                console.log('DRIVR auth state changed:', state);
              }}
              className="max-w-md mx-auto"
            />
          </div>

          {/* Chat Interface */}
          <div className="bg-white rounded-lg shadow-lg">
            <DRIVRChatInterface
              onPaymentRequest={handlePaymentRequest}
              onNotification={handleNotification}
              className="h-96"
            />
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-blue-600 text-2xl mb-3">🤖</div>
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-gray-600 text-sm">
                Intelligent responses about automotive NFTs and market data
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-green-600 text-2xl mb-3">💬</div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-time Chat</h3>
              <p className="text-gray-600 text-sm">
                Instant messaging with DRIVR using XMTP protocol
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-purple-600 text-2xl mb-3">💰</div>
              <h3 className="font-semibold text-gray-900 mb-2">x402 Payments</h3>
              <p className="text-gray-600 text-sm">
                Seamless payments for premium features and NFT purchases
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-3">How to Use DRIVR</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p>• <strong>Browse NFTs:</strong> Ask "Show me available NFTs" to see collections</p>
              <p>• <strong>Check Prices:</strong> Say "Check current prices" for floor prices</p>
              <p>• <strong>Find Specific Cars:</strong> Ask "Find Woodie Wagon NFTs" for specific models</p>
              <p>• <strong>Purchase NFTs:</strong> Say "Buy [NFT name]" to start a purchase</p>
              <p>• <strong>Set Alerts:</strong> Ask "Set price alerts" for notifications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

















