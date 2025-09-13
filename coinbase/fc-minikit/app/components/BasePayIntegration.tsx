'use client';

import React, { useState } from 'react';
import { pay, getPaymentStatus } from '@base-org/account';
import { mintNFTToWallet } from '../utils/nftMinter';

// Real NFT minting function using Base Account SDK
async function mintNFTToBuyer(
  buyerAddress: string, 
  nftContractAddress: string, 
  tokenId: string,
  sdk: any
) {
  try {
    console.log('Minting NFT:', {
      buyerAddress,
      nftContractAddress,
      tokenId
    });

    // Pass the SDK directly instead of the provider
    const result = await mintNFTToWallet(
      sdk,
      nftContractAddress,
      buyerAddress,
      tokenId
    );
    
    console.log(`NFT ${tokenId} successfully minted to ${buyerAddress}`);
    return result;
    
  } catch (error) {
    console.error('NFT minting error:', error);
    throw error;
  }
}

interface BasePayIntegrationProps {
  productId: string;
  productName: string;
  price: number;
  currency: string;
  contractAddress: string;
  tokenId?: string;
  imageUrl?: string;
  description?: string;
  make?: string;
  model?: string;
  year?: string;
  onPaymentSuccess?: (paymentId: string, transactionHash?: string) => void;
  onPaymentError?: (error: string) => void;
  className?: string;
}

export function BasePayIntegration({
  productId,
  productName,
  price,
  currency,
  contractAddress,
  tokenId,
  imageUrl,
  description,
  make,
  model,
  year,
  onPaymentSuccess,
  onPaymentError,
  className = ''
}: BasePayIntegrationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      setPaymentStatus('processing');

      console.log('Initiating Base Pay payment:', {
        amount: price.toString(),
        to: contractAddress,
        productName
      });

      // Use Base Pay for USD payments (converts to USDC internally)
      const payment = await pay({
        amount: price.toString(), // USD amount (converted to USDC internally)
        to: contractAddress,      // Your merchant address
        testnet: false            // Set true for Base Sepolia testing
      });

      console.log('Base Pay payment successful:', payment);
      
      // Log the buyer's wallet address for NFT delivery tracking
      console.log('🎯 TESTING: NFT will be delivered to Rainbow wallet (0x72995D007d4eCE7c6495baC448d7A57A0e2DC2D2)');
      console.log('📱 Check your Rainbow wallet for the NFT after completing mint on Manifold');
      console.log('🔍 Testing with Rainbow wallet for NFT display verification');
      
      // After successful payment, redirect to Manifold mint page
      try {
        console.log('Initiating NFT minting/transfer...');
        await mintNFTToWallet(null, contractAddress, '', tokenId);
        console.log('NFT minting process initiated');
      } catch (nftError) {
        console.error('NFT minting failed:', nftError);
        // Payment succeeded but NFT failed - still show success but log the issue
        console.warn('Payment completed but NFT delivery failed. Manual intervention may be required.');
      }
      
      setPaymentStatus('success');
      // payment.id is the transaction hash according to PaymentSuccess interface
      onPaymentSuccess?.(payment.id, payment.id);
      
    } catch (error) {
      console.error('Base Pay payment failed:', error);
      setPaymentStatus('error');
      onPaymentError?.(error.message || 'Payment failed');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className={`base-pay-integration ${className}`}>
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {/* Product Info Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt={productName}
                className="w-16 h-16 rounded-lg object-cover"
              />
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{productName}</h3>
              {description && (
                <p className="text-sm text-gray-600">{description}</p>
              )}
              {(make || model || year) && (
                <p className="text-xs text-gray-500">
                  {[make, model, year].filter(Boolean).join(' ')}
                </p>
              )}
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</div>
              <div className="text-sm text-gray-500">USD</div>
            </div>
          </div>
        </div>

        {/* Base Pay Integration */}
        <div className="p-6">
          <div className="mb-4">
            <h4 className="text-md font-medium text-gray-900 mb-2">
              Pay with Base Pay
            </h4>
            <p className="text-sm text-gray-600">
              Secure, fast payment using USDC on Base network
            </p>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={isLoading || paymentStatus === 'success'}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing Payment...
              </>
            ) : paymentStatus === 'success' ? (
              '✅ Payment Successful!'
            ) : paymentStatus === 'error' ? (
              '❌ Payment Failed - Try Again'
            ) : (
              <>
                <span className="mr-2">💳</span>
                Pay ${price.toFixed(2)} with Base Pay
              </>
            )}
          </button>

          {/* Status Messages */}
          {paymentStatus === 'processing' && (
            <div className="mt-4 text-center text-sm text-blue-600">
              Processing secure payment...
            </div>
          )}
          
                      {paymentStatus === 'success' && (
                        <div className="mt-4 text-center text-sm text-green-600">
                          Payment completed successfully! Complete your NFT mint on Manifold.
                          <br />
                          <span className="text-xs text-gray-500">A new window should open with the Manifold mint page.</span>
                          <br />
                          <span className="text-xs text-blue-600 font-semibold">NFT will be delivered to your connected wallet address</span>
                        </div>
                      )}

          {paymentStatus === 'error' && (
            <div className="mt-4 text-center text-sm text-red-600">
              Payment failed. Please try again.
            </div>
          )}
        </div>

        {/* Payment Features */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>⚡</span>
              <span>Fast Settlement</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔵</span>
              <span>Base Network</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🛡️</span>
              <span>Secure USDC</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💳</span>
              <span>Credit Card Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasePayIntegration;