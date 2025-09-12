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

      console.log('Opening OnRamp URL:', onRampUrl);

      // Open OnRamp in new window
      const paymentWindow = window.open(
        onRampUrl,
        'coinbase-onramp',
        'width=600,height=700,scrollbars=yes,resizable=yes'
      );

      if (!paymentWindow) {
        throw new Error('Failed to open payment window. Please allow popups for this site.');
      }

      // Add debugging for window events
      paymentWindow.addEventListener('load', () => {
        console.log('OnRamp window loaded');
      });

      paymentWindow.addEventListener('error', (error) => {
        console.error('OnRamp window error:', error);
      });

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
          Powered by Coinbase Developer Platform
        </p>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {/* Price Display */}
        <div className="text-center bg-gradient-to-r from-[#a32428]/5 to-[#8b1e22]/5 rounded-xl p-4 border border-[#a32428]/10">
          <div className="text-4xl font-bold text-[#a32428] mb-2" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            {currency === 'ETH' ? `${price} ETH` : `$${price}`}
          </div>
          <div className="text-sm text-gray-600 font-medium mb-2">
            {currency === 'ETH' ? 'Pay with Debit Card, Apple Pay, ACH Transfer' : `${currency} • Debit Card, Apple Pay, ACH Transfer`}
          </div>
          <div className="text-xs text-gray-500 bg-white rounded-lg p-2 border border-gray-200">
            💡 <strong>What happens next:</strong> We'll create a smart wallet for you, buy the ETH, and deliver your NFT automatically!
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

        {/* Payment Features */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-700 bg-white rounded-lg p-3 border border-gray-200">
            <span className="text-lg">💳</span>
            <span className="font-medium">Debit Card, Apple Pay, ACH Transfer</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700 bg-white rounded-lg p-3 border border-gray-200">
            <span className="text-lg">📱</span>
            <span className="font-medium">Automatic Smart Wallet Creation</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700 bg-white rounded-lg p-3 border border-gray-200">
            <span className="text-lg">🛡️</span>
            <span className="font-medium">Secure CDP Processing</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700 bg-white rounded-lg p-3 border border-gray-200">
            <span className="text-lg">⚡</span>
            <span className="font-medium">Instant NFT Delivery</span>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          disabled={isLoading || !onRampUrl}
          className="w-full bg-gradient-to-r from-[#a32428] to-[#8b1e22] hover:from-[#8b1e22] hover:to-[#6b1519] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing Payment...
            </>
          ) : paymentStatus === 'success' ? (
            '✅ Payment Successful!'
          ) : paymentStatus === 'error' ? (
            '❌ Payment Failed - Try Again'
          ) : (
            <>
              <span className="mr-3 text-xl">💳</span>
              Buy with Debit Card - {currency === 'ETH' ? `${price} ETH` : `$${price}`}
            </>
          )}
        </button>

        {/* Status Messages */}
        {paymentStatus === 'processing' && (
          <div className="text-center text-sm text-[#a32428] bg-[#a32428]/10 rounded-lg p-3 border border-[#a32428]/20">
            Opening secure CDP payment window...
          </div>
        )}
        
        {paymentStatus === 'success' && (
          <div className="text-center text-sm text-green-700 bg-green-50 rounded-lg p-3 border border-green-200">
            🎉 Your NFT is being minted and will be delivered shortly!
          </div>
        )}
        
        {paymentStatus === 'error' && (
          <div className="text-center text-sm text-red-700 bg-red-50 rounded-lg p-3 border border-red-200">
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
              className="block w-full text-center text-sm text-[#a32428] hover:text-[#8b1e22] font-medium underline hover:no-underline transition-colors"
            >
              View on Manifold →
            </a>
          </div>
        )}

        {/* Security Notice */}
        <div className="text-xs text-gray-600 text-center bg-gray-50 rounded-lg p-3 border border-gray-200">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            CarMania Payment Integration
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Real credit card payments powered by Coinbase Developer Platform
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-[#a32428] text-white px-4 py-2 rounded-full text-sm font-semibold">
            <span>🚗</span>
            <span>Drive the Past. Own the Moment</span>
          </div>
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
