'use client';

import { CDPEmbeddedWalletProvider, CDPEmbeddedWalletButton } from '@cculture/shared-auth';

export default function CDPTestPage() {
  return (
    <CDPEmbeddedWalletProvider appName="CarCulture CDP Test">
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            CDP Embedded Wallet Test
          </h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Test Product</h2>
            
            <CDPEmbeddedWalletButton
              productId="test-product-1"
              productName="Test Car Story"
              price={1.0}
              currency="USDC"
              contractAddress="0x0000000000000000000000000000000000000000"
              description="This is a test product to verify CDP embedded wallet functionality"
              onPaymentSuccess={(paymentId, txHash) => {
                console.log('Payment successful:', { paymentId, txHash });
                alert(`Payment successful! Payment ID: ${paymentId}`);
              }}
              onPaymentError={(error) => {
                console.error('Payment failed:', error);
                alert(`Payment failed: ${error}`);
              }}
            />
          </div>
          
          <div className="mt-8 bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Test Status</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>✅ CDP Provider loaded</li>
              <li>✅ CDP Button component loaded</li>
              <li>🔄 Test authentication flow</li>
              <li>🔄 Test payment flow</li>
            </ul>
          </div>
        </div>
      </div>
    </CDPEmbeddedWalletProvider>
  );
}






