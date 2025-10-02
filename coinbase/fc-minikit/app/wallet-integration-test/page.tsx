'use client';

import React from 'react';
import { FundCardIntegration } from '../components/FundCardIntegration';

export default function WalletIntegrationTest() {
  const mockProduct = {
    productId: 'test-nft-1',
    productName: 'Test Car NFT',
    price: 0.01,
    currency: 'ETH',
    contractAddress: '0x1234567890123456789012345678901234567890',
    tokenId: '1',
    imageUrl: 'https://carmania.carculture.com/carmania-share.png',
    description: 'A test NFT for wallet integration testing',
    make: 'Test',
    model: 'Car',
    year: 2024,
  };

  const handlePaymentSuccess = (paymentId: string, transactionHash: string) => {
    console.log('Payment successful:', { paymentId, transactionHash });
    alert(`Payment successful! Transaction: ${transactionHash}`);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    alert(`Payment error: ${error}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Wallet Integration Test</h1>
        
        {/* Test Description */}
        <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test Wallet Integration</h2>
          <p className="text-gray-600 mb-4">
            This page tests the OnchainKit wallet integration with the FundCardIntegration component.
            Try connecting different wallets to see how the integration works.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Test Scenarios:</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Connect with MetaMask</li>
                <li>• Connect with Coinbase Wallet</li>
                <li>• Create new smart wallet</li>
                <li>• Test mobile responsiveness</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Expected Behavior:</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Wallet modal opens</li>
                <li>• Multiple wallet options</li>
                <li>• Smart wallet creation</li>
                <li>• Connected state display</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FundCardIntegration Test */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">FundCardIntegration with OnchainKit Wallet</h2>
          <p className="text-gray-600 mb-6">
            This component now uses the OnchainKit wallet modal instead of the old Base Account connection.
          </p>
          
          <FundCardIntegration
            productId={mockProduct.productId}
            productName={mockProduct.productName}
            price={mockProduct.price}
            currency={mockProduct.currency}
            contractAddress={mockProduct.contractAddress}
            tokenId={mockProduct.tokenId}
            imageUrl={mockProduct.imageUrl}
            description={mockProduct.description}
            make={mockProduct.make}
            model={mockProduct.model}
            year={mockProduct.year}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
            className="max-w-md mx-auto"
          />
        </div>

        {/* Testing Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Testing Instructions</h3>
          <div className="space-y-2 text-blue-700">
            <p><strong>1. Test Smart Wallet Creation:</strong> Click "Connect Wallet" → Choose "Create new wallet" → Enter email/phone</p>
            <p><strong>2. Test Existing Wallet:</strong> Click "Connect Wallet" → Choose MetaMask/Coinbase Wallet</p>
            <p><strong>3. Test Mobile:</strong> Open on mobile device and test wallet connection</p>
            <p><strong>4. Test Disconnect:</strong> After connecting, test the disconnect functionality</p>
          </div>
        </div>
      </div>
    </div>
  );
}

