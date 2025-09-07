'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CDPOnRampProps {
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

export function CDPOnRampIntegration({
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
}: CDPOnRampProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [onRampUrl, setOnRampUrl] = useState<string>('');
  const onRampRef = useRef<HTMLDivElement>(null);

  // Initialize CDP OnRamp when component mounts
  useEffect(() => {
    initializeOnRamp();
  }, [productId, price, currency]);

  const initializeOnRamp = async () => {
    try {
      // Generate session token for secure OnRamp initialization
      const response = await fetch('/api/stablelink/create-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: productName,
          description: description || '',
          price: price,
          currency: currency,
          image: imageUrl || '',
          contractAddress: contractAddress,
          tokenId: tokenId || '',
          mintUrl: mintUrl || ''
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create OnRamp session');
      }

      const data = await response.json();
      setOnRampUrl(data.paymentUrl);

    } catch (error) {
      console.error('Failed to initialize OnRamp:', error);
      onPaymentError?.(error.message);
    }
  };

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      setPaymentStatus('processing');

      // Open OnRamp in new window
      const paymentWindow = window.open(
        onRampUrl,
        'coinbase-onramp',
        'width=600,height=700,scrollbars=yes,resizable=yes'
      );

      if (!paymentWindow) {
        throw new Error('Failed to open payment window. Please allow popups for this site.');
      }

      // Listen for payment completion
      const checkPaymentStatus = setInterval(async () => {
        try {
          if (paymentWindow.closed) {
            clearInterval(checkPaymentStatus);
            
            // Reset to idle when window closes without confirmation
            setPaymentStatus('idle');
            setIsLoading(false);
            console.log('OnRamp window closed - no payment confirmation received');
          }
        } catch (error) {
          clearInterval(checkPaymentStatus);
          setPaymentStatus('error');
          setIsLoading(false);
          onPaymentError?.(error.message);
        }
      }, 1000);

      // Cleanup after 10 minutes
      setTimeout(() => {
        clearInterval(checkPaymentStatus);
        if (isLoading) {
          setIsLoading(false);
          setPaymentStatus('idle');
        }
      }, 600000);

    } catch (error) {
      setIsLoading(false);
      setPaymentStatus('error');
      onPaymentError?.(error.message);
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
    <div className={`w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border ${className}`}>
      <div className="p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          {imageUrl ? (
            <div className="w-16 h-16 rounded-lg overflow-hidden">
              <img 
                src={imageUrl} 
                alt={productName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // If it's a mint URL, try to extract the image or use fallback
                  if (imageUrl.includes('manifold.xyz')) {
                    e.currentTarget.src = '/carmania-splash.png';
                  } else {
                    e.currentTarget.src = '/carmania-splash.png';
                  }
                }}
              />
            </div>
          ) : (
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
              🚗
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold mb-2">{productName}</h2>
        {description && (
          <p className="text-sm text-gray-600 mb-2">{description}</p>
        )}
        {make && make !== 'Nil' && (
          <p className="text-xs text-gray-500 mb-4">{year} {make} {model}</p>
        )}
        <p className="text-xs text-gray-500 mb-4">
          Powered by Coinbase Developer Platform
        </p>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {/* Price Display */}
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">
            {currency === 'ETH' ? `${price} ETH` : `$${price}`}
          </div>
          <div className="text-sm text-gray-500">
            {currency === 'ETH' ? 'Pay with Debit Card, Apple Pay, ACH Transfer' : `${currency} • Debit Card, Apple Pay, ACH Transfer`}
          </div>
        </div>

        {/* NFT Details */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Network:</span>
            <span className="flex items-center gap-1">
              🔵 BASE
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Contract:</span>
            <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded">
              {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
            </span>
          </div>
          {tokenId && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Token ID:</span>
              <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded">
                #{tokenId}
              </span>
            </div>
          )}
        </div>

        {/* Payment Features */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>💳</span>
            <span>Debit Card, Apple Pay, ACH Transfer</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>📱</span>
            <span>Automatic Smart Wallet Creation</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>🛡️</span>
            <span>Secure CDP Processing</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>⚡</span>
            <span>Instant NFT Delivery</span>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          disabled={isLoading || !onRampUrl}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center"
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
              Buy with Debit Card - {currency === 'ETH' ? `${price} ETH` : `$${price}`}
            </>
          )}
        </button>

        {/* Status Messages */}
        {paymentStatus === 'processing' && (
          <div className="text-center text-sm text-blue-600">
            Opening secure CDP payment window...
          </div>
        )}
        
        {paymentStatus === 'success' && (
          <div className="text-center text-sm text-green-600">
            🎉 Your NFT is being minted and will be delivered shortly!
          </div>
        )}
        
        {paymentStatus === 'error' && (
          <div className="text-center text-sm text-red-600">
            Payment failed. Please try again or contact support.
          </div>
        )}

        {/* View on Manifold Button */}
        {mintUrl && (
          <div className="pt-2">
            <a
              href={mintUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center text-sm text-blue-600 hover:text-blue-800 underline"
            >
              View on Manifold →
            </a>
          </div>
        )}

        {/* Security Notice */}
        <div className="text-xs text-gray-500 text-center">
          Powered by Coinbase Developer Platform • Secure payment processing • No crypto knowledge required
        </div>
      </div>
    </div>
  );
}

// Example usage component
export function CDPOnRampExample() {
  const exampleProduct = {
    productId: 'summertime-blues-1',
    productName: 'Summertime Blues NFT',
    price: 0.001, // Real Manifold price in ETH
    currency: 'ETH',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '1'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            CDP OnRamp Integration
          </h1>
          <p className="text-gray-600">
            Real credit card payments powered by Coinbase Developer Platform
          </p>
        </div>
        
        <CDPOnRampIntegration
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
