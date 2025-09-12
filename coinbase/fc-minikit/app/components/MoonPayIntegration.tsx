'use client';

import React, { useState, useEffect } from 'react';

interface MoonPayConfig {
  productId: string;
  productName: string;
  price: number;
  currency: string;
  contractAddress: string;
  tokenId?: string;
  imageUrl?: string;
  description?: string;
}

interface MoonPayIntegrationProps {
  config: MoonPayConfig;
  onSuccess?: (result: any) => void;
  onError?: (error: string) => void;
  className?: string;
}

export function MoonPayIntegration({ 
  config, 
  onSuccess, 
  onError, 
  className = '' 
}: MoonPayIntegrationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMoonPayPayment = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // MoonPay configuration - using URL approach
      const apiKey = process.env.NEXT_PUBLIC_MOONPAY_API_KEY || 'pk_test_...';
      const environment = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';
      
      // Create MoonPay URL with parameters
      const moonPayUrl = new URL('https://buy.moonpay.com');
      moonPayUrl.searchParams.set('apiKey', apiKey);
      moonPayUrl.searchParams.set('currencyCode', 'eth');
      moonPayUrl.searchParams.set('baseCurrencyAmount', config.price.toString());
      moonPayUrl.searchParams.set('walletAddress', config.contractAddress);
      moonPayUrl.searchParams.set('redirectURL', `${window.location.origin}/moonpay-success?productId=${config.productId}`);
      moonPayUrl.searchParams.set('theme', 'light');
      moonPayUrl.searchParams.set('showWalletAddressForm', 'false');
      moonPayUrl.searchParams.set('showCurrencySelect', 'false');
      moonPayUrl.searchParams.set('lockAmount', 'true');
      moonPayUrl.searchParams.set('lockCurrency', 'true');
      moonPayUrl.searchParams.set('lockWalletAddress', 'true');
      
      // Open MoonPay in popup
      const popup = window.open(
        moonPayUrl.toString(),
        'moonpay',
        'width=500,height=700,scrollbars=yes,resizable=yes'
      );

      if (!popup) {
        throw new Error('Failed to open MoonPay popup. Please allow popups for this site.');
      }

      // Listen for messages from popup
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'moonpay-success') {
          clearInterval(checkClosed);
          setIsOpen(false);
          setIsLoading(false);
          onSuccess?.(event.data);
        } else if (event.data.type === 'moonpay-error') {
          clearInterval(checkClosed);
          setIsOpen(false);
          setIsLoading(false);
          onError?.(event.data.message || 'Payment failed');
        }
      };

      window.addEventListener('message', handleMessage);

      // Monitor popup
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
          setIsOpen(false);
          setIsLoading(false);
        }
      }, 1000);

      setIsOpen(true);

    } catch (error) {
      console.error('MoonPay integration error:', error);
      setError(error instanceof Error ? error.message : 'Payment failed');
      setIsLoading(false);
      onError?.(error instanceof Error ? error.message : 'Payment failed');
    }
  };

  // No script loading needed for URL-based integration

  return (
    <div className={`moonpay-integration ${className}`}>
      <button
        onClick={handleMoonPayPayment}
        disabled={isLoading}
        className={`
          w-full px-6 py-3 rounded-lg font-medium transition-all duration-200
          ${isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          }
          text-white shadow-lg hover:shadow-xl
        `}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <span>💳</span>
            <span>Buy with Credit Card</span>
          </div>
        )}
      </button>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Processing Payment</h3>
            <p className="text-gray-600 mb-4">
              Please complete your payment in the MoonPay window that opened.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MoonPayIntegration;
