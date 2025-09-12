'use client';

import React, { useState } from 'react';
import { BasePayIntegration } from './BasePayIntegration';
import { CDPOnRampIntegration } from './CDPOnRampIntegration';
import { MoonPayIntegration } from './MoonPayIntegration';

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
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSuccess = (result: any) => {
    setIsProcessing(false);
    onSuccess?.(result);
  };

  const handleError = (error: string) => {
    setIsProcessing(false);
    onError?.(error);
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

      {/* Direct Checkout - No Payment Method Selection Needed */}

      {/* Base Pay Integration - Corrected USD payment solution */}
      <div className="payment-component">
        <BasePayIntegration
          productId={product.productId}
          productName={product.productName}
          price={product.price}
          currency={product.currency}
          contractAddress={product.contractAddress}
          tokenId={product.tokenId}
          imageUrl={product.imageUrl}
          description={product.description}
          make={product.make}
          model={product.model}
          year={product.year}
          onPaymentSuccess={handleSuccess}
          onPaymentError={handleError}
        />
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

