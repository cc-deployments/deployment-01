'use client';

import React, { useState } from 'react';
import { createBaseAccountSDK } from '@base-org/account';

interface BasePayBrandCompliantProps {
  config: {
    productId: string;
    productName: string;
    price: number;
    currency: string;
    contractAddress: string;
    tokenId: string;
    imageUrl: string;
    description: string;
    make?: string;
    model?: string;
    year?: string;
  };
  onSuccess?: (result: any) => void;
  onError?: (error: string) => void;
  className?: string;
}

export function BasePayBrandCompliant({
  config,
  onSuccess,
  onError,
  className = ''
}: BasePayBrandCompliantProps) {
  const {
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
    year
  } = config;
  
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

      // Initialize Base Account SDK
      const sdk = createBaseAccountSDK({
        appName: 'CarCulture: CarMania Garage',
        appIcon: 'https://carmania.carculture.com/favicon.png',
        appUrl: 'https://carmania.carculture.com',
      });

      // Create payment request
      const paymentRequest = {
        to: contractAddress,
        value: BigInt(Math.floor(price * 1e6)), // Convert to USDC (6 decimals)
        currency: 'USDC',
        description: `Purchase: ${productName} - ${description}`,
        metadata: {
          productId,
          productName,
          make,
          model,
          year,
          imageUrl,
          tokenId
        }
      };

      // Process payment using Base Pay
      const result = await sdk.pay(paymentRequest);
      
      console.log('✅ Base Pay payment successful:', result);
      
      setPaymentStatus('success');
      onSuccess?.(result);

    } catch (error) {
      console.error('❌ Base Pay payment failed:', error);
      setPaymentStatus('error');
      onError?.(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`base-pay-integration ${className}`}>
      {/* Product Info */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-4">
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt={productName}
              className="w-16 h-16 object-cover rounded-lg"
            />
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{productName}</h3>
            {make && model && year && (
              <p className="text-sm text-gray-600">{year} {make} {model}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-gray-900">${price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{currency}</p>
          </div>
        </div>
      </div>

      {/* Base Pay Button - Brand Compliant */}
      <div className="space-y-4">
        <div className="text-center">
          <h4 className="text-md font-medium text-gray-900 mb-2">
            Secure Payment
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            One-click checkout with Base Pay
          </p>
        </div>

        {/* Brand Compliant Base Pay Button */}
        <div className="flex justify-center">
          <button
            onClick={handlePayment}
            disabled={isLoading || paymentStatus === 'success'}
            className="base-pay-button bg-white border-2 border-gray-300 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center min-h-[56px]"
            style={{ minWidth: '240px' }}
          >
            {/* Base Pay Combination Mark - Official styling */}
            <div className="flex items-center space-x-3">
              {/* Base Square Logo - Always #0000FF */}
              <div 
                className="w-6 h-6 rounded-sm flex-shrink-0"
                style={{ backgroundColor: '#0000FF' }}
              />
              {/* Base Pay Text - Using official styling */}
              <span className="text-gray-900 font-semibold text-base">
                Base Pay
              </span>
            </div>
          </button>
        </div>

        {/* Status Messages */}
        {paymentStatus === 'processing' && (
          <div className="text-center text-sm text-blue-600">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Processing secure payment...</span>
            </div>
          </div>
        )}
        
        {paymentStatus === 'success' && (
          <div className="text-center text-sm text-green-600">
            <div className="flex items-center justify-center space-x-2">
              <span>✅</span>
              <span>Payment successful! NFT will be minted to your wallet.</span>
            </div>
          </div>
        )}
        
        {paymentStatus === 'error' && (
          <div className="text-center text-sm text-red-600">
            <div className="flex items-center justify-center space-x-2">
              <span>❌</span>
              <span>Payment failed. Please try again.</span>
            </div>
          </div>
        )}
      </div>

      {/* Base Pay Benefits */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h5 className="text-sm font-medium text-blue-900 mb-2">Why Base Pay?</h5>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Secure, one-click checkout</li>
          <li>• No gas fees for you</li>
          <li>• Instant confirmation</li>
          <li>• Works with any Base wallet</li>
        </ul>
      </div>
    </div>
  );
}