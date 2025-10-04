'use client';

import React, { useState } from 'react';
import { CDPOnRampIntegration } from './CDPOnRampIntegration';
import { MoonPayIntegration } from './MoonPayIntegration';
import { BasePayIntegration } from './BasePayIntegration';
import { EmbeddedWalletIntegration } from './EmbeddedWalletIntegration';

interface Product {
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
}

interface UnifiedPaymentProps {
  product: Product;
  onSuccess?: (result: any) => void;
  onError?: (error: string) => void;
  className?: string;
}

export function UnifiedPayment({ 
  product, 
  onSuccess, 
  onError, 
  className = '' 
}: UnifiedPaymentProps) {
  const [selectedMethod, setSelectedMethod] = useState<'crypto' | 'debit' | 'credit' | 'embedded'>('embedded');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSuccess = (result: any) => {
    setIsProcessing(false);
    onSuccess?.(result);
  };

  const handleError = (error: string) => {
    setIsProcessing(false);
    onError?.(error);
  };

  const handleMethodChange = (method: 'crypto' | 'debit' | 'credit' | 'embedded') => {
    setSelectedMethod(method);
  };

  return (
    <div className={`unified-payment ${className}`}>
      {/* Product Display */}
      <div className="mb-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
        <div className="flex items-center space-x-6">
          {product.imageUrl && (
            <img 
              src={product.imageUrl} 
              alt={product.productName}
              className="max-w-20 max-h-20 rounded-xl border-2 border-[#a32428]/20"
              style={{ objectFit: 'contain' }}
            />
          )}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>{product.productName}</h3>
            {product.description && (
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            )}
            {product.make && product.model && product.year && (
              <p className="text-xs text-gray-500 mb-3 font-medium">{product.year} {product.make} {product.model}</p>
            )}
            <div className="bg-gradient-to-r from-[#a32428]/10 to-[#8b1e22]/10 rounded-lg p-3 border border-[#a32428]/20">
              <p className="text-2xl font-bold text-[#a32428]" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                {product.price} {product.currency}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Choose Payment Method</h4>
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => handleMethodChange('embedded')}
            className={`p-4 rounded-xl border-2 transition-all transform hover:scale-[1.02] ${
              selectedMethod === 'embedded'
                ? 'border-[#a32428] bg-gradient-to-br from-[#a32428]/10 to-[#8b1e22]/10 shadow-lg'
                : 'border-gray-200 hover:border-[#a32428]/50 hover:shadow-md'
            }`}
          >
            <div className="flex items-center space-x-4">
              <span className="text-3xl">🔷</span>
              <div className="text-left">
                <div className="font-bold text-gray-900">Embedded Wallet (Recommended)</div>
                <div className="text-sm text-gray-600">Email/SMS login - no crypto wallet needed</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleMethodChange('crypto')}
            className={`p-4 rounded-xl border-2 transition-all transform hover:scale-[1.02] ${
              selectedMethod === 'crypto'
                ? 'border-[#a32428] bg-gradient-to-br from-[#a32428]/10 to-[#8b1e22]/10 shadow-lg'
                : 'border-gray-200 hover:border-[#a32428]/50 hover:shadow-md'
            }`}
          >
            <div className="flex items-center space-x-4">
              <span className="text-3xl">🪙</span>
              <div className="text-left">
                <div className="font-bold text-gray-900">Base Pay (USD)</div>
                <div className="text-sm text-gray-600">Pay with USD using Base Pay - instant and secure</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleMethodChange('debit')}
            className={`p-4 rounded-xl border-2 transition-all transform hover:scale-[1.02] ${
              selectedMethod === 'debit'
                ? 'border-[#a32428] bg-gradient-to-br from-[#a32428]/10 to-[#8b1e22]/10 shadow-lg'
                : 'border-gray-200 hover:border-[#a32428]/50 hover:shadow-md'
            }`}
          >
            <div className="flex items-center space-x-4">
              <span className="text-3xl">💳</span>
              <div className="text-left">
                <div className="font-bold text-gray-900">Debit Card / Apple Pay</div>
                <div className="text-sm text-gray-600">Instant fiat-to-crypto conversion</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleMethodChange('credit')}
            className={`p-4 rounded-xl border-2 transition-all transform hover:scale-[1.02] ${
              selectedMethod === 'credit'
                ? 'border-[#a32428] bg-gradient-to-br from-[#a32428]/10 to-[#8b1e22]/10 shadow-lg'
                : 'border-gray-200 hover:border-[#a32428]/50 hover:shadow-md'
            }`}
          >
            <div className="flex items-center space-x-4">
              <span className="text-3xl">💳</span>
              <div className="text-left">
                <div className="font-bold text-gray-900">Credit Card</div>
                <div className="text-sm text-gray-600">Visa, Mastercard, American Express</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Payment Component */}
      <div className="payment-component">
        {selectedMethod === 'embedded' && (
          <EmbeddedWalletIntegration
            productId={product.productId}
            productName={product.productName}
            price={product.price}
            currency={product.currency}
            contractAddress={product.contractAddress}
            tokenId={product.tokenId}
            imageUrl={product.imageUrl}
            description={product.description}
            onPaymentSuccess={handleSuccess}
            onPaymentError={handleError}
          />
        )}

        {selectedMethod === 'crypto' && (
          <BasePayIntegration
            config={{
              productId: product.productId,
              productName: product.productName,
              price: product.price,
              currency: product.currency,
              contractAddress: product.contractAddress,
              tokenId: product.tokenId,
              imageUrl: product.imageUrl,
              description: product.description
            }}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        )}

        {selectedMethod === 'debit' && (
          <CDPOnRampIntegration
            productId={product.productId}
            productName={product.productName}
            price={product.price}
            currency={product.currency}
            contractAddress={product.contractAddress}
            tokenId={product.tokenId}
            imageUrl={product.imageUrl}
            description={product.description}
            onPaymentSuccess={handleSuccess}
            onPaymentError={handleError}
          />
        )}

        {selectedMethod === 'credit' && (
          <MoonPayIntegration
            config={{
              productId: product.productId,
              productName: product.productName,
              price: product.price,
              currency: product.currency,
              contractAddress: product.contractAddress,
              tokenId: product.tokenId,
              imageUrl: product.imageUrl,
              description: product.description
            }}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        )}
      </div>

      {/* Processing State */}
      {isProcessing && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-yellow-800">Processing payment...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default UnifiedPayment;

