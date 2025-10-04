'use client';

import React, { useState, useEffect } from 'react';
import { 
  CDPReactProvider, 
  AuthButton,
  SendEvmTransactionButton 
} from '@coinbase/cdp-react';
import { 
  useIsSignedIn, 
  useEvmAddress
} from '@coinbase/cdp-hooks';

interface EmbeddedWalletIntegrationProps {
  productId: string;
  productName: string;
  price: number;
  currency: string;
  contractAddress: string;
  tokenId?: string;
  mintUrl?: string;
  imageUrl?: string;
  description?: string;
  make?: string;
  model?: string;
  year?: string;
  onPaymentSuccess?: (paymentId: string, transactionHash?: string) => void;
  onPaymentError?: (error: string) => void;
  className?: string;
}

// CDP Configuration
const CDP_CONFIG = {
  projectId: process.env.NEXT_PUBLIC_CDP_PROJECT_ID || '1cceb0e4-e690-40ac-8f3d-7d1f3da1417a',
  ethereum: { createOnLogin: 'eoa' },
  appName: 'CarMania NFT Marketplace'
};

// Main Embedded Wallet Component
function EmbeddedWalletPurchase({
  productId,
  productName,
  price,
  currency,
  contractAddress,
  tokenId,
  mintUrl,
  imageUrl,
  description,
  make,
  model,
  year,
  onPaymentSuccess,
  onPaymentError,
  className
}: EmbeddedWalletIntegrationProps) {
  const { isSignedIn } = useIsSignedIn();
  const { evmAddress } = useEvmAddress();
  // Mock balance for now - useEvmBalance not available in current CDP version
  const evmBalance = { formatted: '0.0', symbol: 'ETH' };
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  // Convert price to wei for transaction
  const priceInWei = BigInt(Math.floor(price * 1e18));

  const handleNFTPurchase = async () => {
    try {
      setIsProcessing(true);
      setPaymentStatus('processing');

      // For now, we'll simulate the NFT purchase
      // In a real implementation, you'd interact with your NFT contract
      console.log('🎯 Embedded Wallet NFT Purchase:', {
        productId,
        productName,
        price,
        currency,
        contractAddress,
        tokenId,
        buyerAddress: evmAddress
      });

      // Simulate successful purchase
      setTimeout(() => {
        setPaymentStatus('success');
        setIsProcessing(false);
        onPaymentSuccess?.(`embedded_${Date.now()}`, '0x123...');
      }, 2000);

    } catch (error) {
      console.error('❌ Embedded Wallet purchase error:', error);
      setPaymentStatus('error');
      setIsProcessing(false);
      onPaymentError?.(error instanceof Error ? error.message : 'Purchase failed');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'text-blue-600';
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto bg-white rounded-xl shadow-xl border border-gray-200 ${className}`}>
      <div className="p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          {imageUrl ? (
            <div className="max-w-20 max-h-20 rounded-xl border-2 border-[#a32428]/20 flex items-center justify-center">
              <img 
                src={imageUrl} 
                alt={productName}
                className="max-w-full max-h-full rounded-xl"
                style={{ objectFit: 'contain' }}
                onError={(e) => {
                  e.currentTarget.src = '/carmania-splash.png';
                }}
              />
            </div>
          ) : (
            <div className="w-20 h-20 bg-gradient-to-br from-[#a32428] to-[#8b1e22] rounded-xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              🚗
            </div>
          )}
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-gray-900" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          {productName}
        </h2>
        
        {description && (
          <p className="text-sm text-gray-600 mb-2">{description}</p>
        )}
        
        {make && make !== 'Nil' && (
          <p className="text-xs text-gray-500 mb-4 font-medium">{year} {make} {model}</p>
        )}
        
        <p className="text-xs text-[#a32428] mb-4 font-semibold">
          Powered by Coinbase Embedded Wallets
        </p>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {/* Authentication Section */}
        {!isSignedIn ? (
          <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Sign In to Purchase</h3>
            <p className="text-sm text-blue-700 mb-4">
              Create a wallet instantly with your email or social login. No crypto knowledge required!
            </p>
            <AuthButton 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            />
            <div className="mt-3 text-xs text-blue-600">
              ✅ Instant wallet creation • ✅ No seed phrases • ✅ Email/SMS login
            </div>
          </div>
        ) : (
          <>
            {/* Wallet Info */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-700 font-medium">Your Wallet:</span>
                <span className="font-mono text-xs bg-white border border-green-300 px-3 py-1 rounded-lg text-green-800">
                  {evmAddress ? `${evmAddress.slice(0, 6)}...${evmAddress.slice(-4)}` : 'Loading...'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-green-700 font-medium">Balance:</span>
                <span className="text-green-800 font-semibold">
                  {evmBalance ? `${evmBalance.formatted} ${evmBalance.symbol}` : 'Loading...'}
                </span>
              </div>
            </div>

            {/* Price Display */}
            <div className="text-center bg-gradient-to-r from-[#a32428]/5 to-[#8b1e22]/5 rounded-xl p-4 border border-[#a32428]/10">
              <div className="text-4xl font-bold text-[#a32428] mb-2" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                {currency === 'ETH' ? `${price} ETH` : `$${price}`}
              </div>
              <div className="text-sm text-gray-600 font-medium mb-2">
                {currency === 'ETH' ? 'Pay with Embedded Wallet' : `${currency} • Embedded Wallet Payment`}
              </div>
              <div className="text-xs text-gray-500 bg-white rounded-lg p-2 border border-gray-200">
                💡 <strong>What happens next:</strong> Your embedded wallet will handle the payment and deliver your NFT automatically!
              </div>
            </div>

            {/* NFT Details */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 space-y-3 border border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700 font-medium">Network:</span>
                <span className="flex items-center gap-2 bg-[#a32428] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  🔵 BASE
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700 font-medium">Contract:</span>
                <span className="font-mono text-xs bg-white border border-gray-300 px-3 py-1 rounded-lg text-gray-800">
                  {contractAddress ? `${contractAddress.slice(0, 6)}...${contractAddress.slice(-4)}` : 'N/A'}
                </span>
              </div>
              {tokenId && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-medium">Token ID:</span>
                  <span className="font-mono text-xs bg-white border border-gray-300 px-3 py-1 rounded-lg text-gray-800">
                    #{tokenId}
                  </span>
                </div>
              )}
            </div>

            {/* Payment Button */}
            <button
              onClick={handleNFTPurchase}
              disabled={isProcessing || !evmAddress}
              className="w-full bg-gradient-to-r from-[#a32428] to-[#8b1e22] hover:from-[#8b1e22] hover:to-[#6b1519] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing Purchase...
                </>
              ) : paymentStatus === 'success' ? (
                '✅ Purchase Successful!'
              ) : paymentStatus === 'error' ? (
                '❌ Purchase Failed - Try Again'
              ) : (
                <>
                  <span className="mr-3 text-xl">🚗</span>
                  Buy NFT - {currency === 'ETH' ? `${price} ETH` : `$${price}`}
                </>
              )}
            </button>

            {/* Status Messages */}
            {paymentStatus === 'processing' && (
              <div className="text-center text-sm text-[#a32428] bg-[#a32428]/10 rounded-lg p-3 border border-[#a32428]/20">
                Processing your NFT purchase...
              </div>
            )}
            
            {paymentStatus === 'success' && (
              <div className="text-center text-sm text-green-700 bg-green-50 rounded-lg p-3 border border-green-200">
                🎉 Your NFT has been purchased and will be delivered shortly!
              </div>
            )}
            
            {paymentStatus === 'error' && (
              <div className="text-center text-sm text-red-700 bg-red-50 rounded-lg p-3 border border-red-200">
                Purchase failed. Please try again or contact support.
              </div>
            )}

            {/* View on Manifold Button */}
            {mintUrl && (
              <div className="pt-2">
                <a
                  href={mintUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center text-sm text-[#a32428] hover:text-[#8b1e22] font-medium underline hover:no-underline transition-colors"
                >
                  View on Manifold →
                </a>
              </div>
            )}
          </>
        )}

        {/* Security Notice */}
        <div className="text-xs text-gray-600 text-center bg-gray-50 rounded-lg p-3 border border-gray-200">
          Powered by Coinbase Embedded Wallets • Secure payment processing • No crypto knowledge required
        </div>
      </div>
    </div>
  );
}

// Main Export with CDP Provider
export function EmbeddedWalletIntegration(props: EmbeddedWalletIntegrationProps) {
  return (
    <CDPReactProvider config={CDP_CONFIG}>
      <EmbeddedWalletPurchase {...props} />
    </CDPReactProvider>
  );
}

// Example usage component
export function EmbeddedWalletExample() {
  const exampleProduct = {
    productId: 'summertime-blues-1',
    productName: 'Summertime Blues NFT',
    price: 0.001, // Real Manifold price in ETH
    currency: 'ETH',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '1'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            CarMania Embedded Wallets Demo
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Web2 users can buy NFTs with email/SMS login - no crypto wallet needed!
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-[#a32428] text-white px-4 py-2 rounded-full text-sm font-semibold">
            <span>🚗</span>
            <span>Drive the Past. Own the Moment</span>
          </div>
        </div>
        
        <EmbeddedWalletIntegration
          {...exampleProduct}
          onPaymentSuccess={(paymentId, txHash) => {
            console.log('Embedded Wallet payment completed:', { paymentId, txHash });
            alert(`Payment successful! Payment ID: ${paymentId}`);
          }}
          onPaymentError={(error) => {
            console.error('Embedded Wallet payment error:', error);
            alert(`Payment failed: ${error}`);
          }}
        />
      </div>
    </div>
  );
}

