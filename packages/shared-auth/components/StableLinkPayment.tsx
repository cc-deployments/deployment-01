'use client';

import React, { useState, useEffect } from 'react';
import { useBasePay } from '../hooks/useBasePay';
import { useSharedAuth } from '../hooks/useSharedAuth';
import type { BasePayConfig } from '../types/basePay';

interface StableLinkPaymentProps {
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
  testnet?: boolean;
}

export function StableLinkPayment({
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
  className,
  testnet = true
}: StableLinkPaymentProps) {
  const { pay, isProcessing, error, lastPayment } = useBasePay();
  const { address, isConnected } = useSharedAuth();
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'debit_card' | 'auto'>('debit_card');
  const [paymentWindow, setPaymentWindow] = useState<Window | null>(null);

  // Handle payment completion
  useEffect(() => {
    if (lastPayment?.status === 'completed') {
      onPaymentSuccess?.(lastPayment.id, lastPayment.transactionHash);
    } else if (lastPayment?.status === 'failed') {
      onPaymentError?.(lastPayment.error || 'Payment failed');
    }
  }, [lastPayment, onPaymentSuccess, onPaymentError]);

  const handlePayment = async () => {
    try {
      const config: BasePayConfig = {
        amount: price.toString(),
        to: contractAddress,
        testnet,
        paymentMethod: paymentMethod === 'debit_card' ? 'credit_card' : paymentMethod,
        productName,
        productDescription: description,
        productImage: imageUrl,
        contractAddress,
        tokenId,
        mintUrl,
        payerInfo: {
          email: true,
          name: true
        }
      };

      const result = await pay(config);

      // If credit card payment, open OnRamp window
      if (result.paymentMethod === 'credit_card' && result.onRampUrl) {
        const window = globalThis.open(
          result.onRampUrl,
          'coinbase-onramp',
          'width=600,height=700,scrollbars=yes,resizable=yes'
        );
        
        if (window) {
          setPaymentWindow(window);
          
          // Monitor window for completion
          const checkWindow = setInterval(() => {
            if (window.closed) {
              clearInterval(checkWindow);
              setPaymentWindow(null);
              // Payment status will be updated via webhook or polling
            }
          }, 1000);
        }
      }
    } catch (error) {
      onPaymentError?.(error instanceof Error ? error.message : 'Payment failed');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'text-blue-600';
      case 'completed': return 'text-green-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getButtonText = () => {
    if (isProcessing) return 'Processing Payment...';
    if (lastPayment?.status === 'completed') return '✅ Payment Successful!';
    if (lastPayment?.status === 'failed') return '❌ Payment Failed - Try Again';
    
    if (paymentMethod === 'debit_card') {
      return `💳 Buy with Debit Card / Apple Pay / Google Pay - ${currency === 'ETH' ? `${price} ETH` : `$${price}`}`;
    } else if (paymentMethod === 'crypto') {
      return `⚡ Pay with Crypto - ${currency === 'ETH' ? `${price} ETH` : `$${price}`}`;
    } else {
      return `🛒 Buy Now - ${currency === 'ETH' ? `${price} ETH` : `$${price}`}`;
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
        <h2 className="text-2xl font-bold mb-2 text-gray-900" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>{productName}</h2>
        {description && (
          <p className="text-sm text-gray-600 mb-2">{description}</p>
        )}
        {make && make !== 'Nil' && (
          <p className="text-xs text-gray-500 mb-4 font-medium">{year} {make} {model}</p>
        )}
        <p className="text-xs text-[#a32428] mb-4 font-semibold">
          Powered by StableLink + Base Pay
        </p>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {/* Price Display */}
        <div className="text-center bg-gradient-to-r from-[#a32428]/5 to-[#8b1e22]/5 rounded-xl p-4 border border-[#a32428]/10">
          <div className="text-4xl font-bold text-[#a32428] mb-2" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            {currency === 'ETH' ? `${price} ETH` : `$${price}`}
          </div>
          <div className="text-sm text-gray-600 font-medium">
            {paymentMethod === 'debit_card' 
              ? 'Pay with Debit Card, Apple Pay, Google Pay, ACH Transfer'
              : paymentMethod === 'crypto'
              ? 'Pay with your connected wallet'
              : 'Choose your payment method below'
            }
          </div>
        </div>

        {/* Payment Method Selection */}
        {paymentMethod === 'auto' && (
          <div className="space-y-3">
            <div className="text-sm font-bold text-gray-800">Choose Payment Method:</div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentMethod('debit_card')}
                className="p-4 border-2 border-gray-300 rounded-xl hover:border-[#a32428] hover:bg-[#a32428]/5 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <div className="text-2xl mb-2">💳</div>
                <div className="text-sm font-bold text-gray-800">Debit Card / Apple Pay / Google Pay</div>
                <div className="text-xs text-gray-600">No crypto needed</div>
              </button>
              <button
                onClick={() => setPaymentMethod('crypto')}
                className="p-4 border-2 border-gray-300 rounded-xl hover:border-[#a32428] hover:bg-[#a32428]/5 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-sm font-bold text-gray-800">Crypto</div>
                <div className="text-xs text-gray-600">Use wallet</div>
              </button>
            </div>
          </div>
        )}

        {/* NFT Details */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 space-y-3 border border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700 font-medium">Network:</span>
            <span className="flex items-center gap-2 bg-[#a32428] text-white px-3 py-1 rounded-full text-xs font-semibold">
              🔵 BASE {testnet ? '(Testnet)' : ''}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700 font-medium">Contract:</span>
            <span className="font-mono text-xs bg-white border border-gray-300 px-3 py-1 rounded-lg text-gray-800">
              {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
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

        {/* Payment Features */}
        <div className="space-y-3">
          {paymentMethod === 'debit_card' ? (
            <>
              <div className="flex items-center gap-3 text-sm text-gray-700 bg-white rounded-lg p-3 border border-gray-200">
                <span className="text-lg">💳</span>
                <span className="font-medium">Debit Card, Apple Pay, Google Pay, ACH Transfer</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700 bg-white rounded-lg p-3 border border-gray-200">
                <span className="text-lg">📱</span>
                <span className="font-medium">Automatic Smart Wallet Creation</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700 bg-white rounded-lg p-3 border border-gray-200">
                <span className="text-lg">🛡️</span>
                <span className="font-medium">Secure CDP Processing</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 text-sm text-gray-700 bg-white rounded-lg p-3 border border-gray-200">
                <span className="text-lg">⚡</span>
                <span className="font-medium">Instant Crypto Payment</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700 bg-white rounded-lg p-3 border border-gray-200">
                <span className="text-lg">🔗</span>
                <span className="font-medium">Connected to {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'your wallet'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700 bg-white rounded-lg p-3 border border-gray-200">
                <span className="text-lg">🛡️</span>
                <span className="font-medium">Secure Base Pay Processing</span>
              </div>
            </>
          )}
          <div className="flex items-center gap-3 text-sm text-gray-700 bg-white rounded-lg p-3 border border-gray-200">
            <span className="text-lg">⚡</span>
            <span className="font-medium">Instant NFT Delivery</span>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          disabled={isProcessing || (paymentMethod === 'crypto' && !isConnected)}
          className="w-full bg-gradient-to-r from-[#a32428] to-[#8b1e22] hover:from-[#8b1e22] hover:to-[#6b1519] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing Payment...
            </>
          ) : (
            getButtonText()
          )}
        </button>

        {/* Status Messages */}
        {isProcessing && (
          <div className="text-center text-sm text-[#a32428] bg-[#a32428]/10 rounded-lg p-3 border border-[#a32428]/20">
            {paymentMethod === 'debit_card' 
              ? 'Opening secure CDP payment window...'
              : 'Processing crypto payment...'
            }
          </div>
        )}
        
        {lastPayment?.status === 'completed' && (
          <div className="text-center text-sm text-green-700 bg-green-50 rounded-lg p-3 border border-green-200">
            🎉 Your NFT is being minted and will be delivered shortly!
          </div>
        )}
        
        {error && (
          <div className="text-center text-sm text-red-700 bg-red-50 rounded-lg p-3 border border-red-200">
            {error}
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

        {/* Security Notice */}
        <div className="text-xs text-gray-600 text-center bg-gray-50 rounded-lg p-3 border border-gray-200">
          Powered by StableLink + Base Pay • Secure payment processing • {paymentMethod === 'debit_card' ? 'No crypto knowledge required' : 'Crypto payments supported'}
        </div>
      </div>
    </div>
  );
}

// Example usage component
export function StableLinkPaymentExample() {
  const exampleProduct = {
    productId: 'summertime-blues-1',
    productName: 'Summertime Blues NFT',
    price: 0.001,
    currency: 'ETH',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '1',
    imageUrl: '/preview-images/summertime_blues_preview.png',
    description: 'Post-modern Surfing Wagon',
    make: 'Chevrolet',
    model: 'Suburban',
    year: '1970'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            CarMania Payment Integration
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Unified crypto and credit card payments powered by Base Pay + CDP OnRamp
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-[#a32428] text-white px-4 py-2 rounded-full text-sm font-semibold">
            <span>🚗</span>
            <span>Drive the Past. Own the Moment</span>
          </div>
        </div>
        
        <StableLinkPayment
          {...exampleProduct}
          onPaymentSuccess={(paymentId, txHash) => {
            console.log('Payment completed:', { paymentId, txHash });
            alert(`Payment successful! Payment ID: ${paymentId}`);
          }}
          onPaymentError={(error) => {
            console.error('Payment error:', error);
            alert(`Payment failed: ${error}`);
          }}
        />
      </div>
    </div>
  );
}

