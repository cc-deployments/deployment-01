'use client';

import React, { useState } from 'react';
import { FundButton } from '@coinbase/onchainkit/fund'; // OnchainKit's built-in OnRamp
import { useBaseAccount } from './BaseAccountProvider';

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
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  
  // Use existing Base Account hook
  const { address: userAddress, isConnected, connect } = useBaseAccount();

  const handlePaymentSuccess = () => {
    setPaymentStatus('success');
    onPaymentSuccess?.(productId, 'onramp-success');
  };

  const handlePaymentError = (error: string) => {
    setPaymentStatus('error');
    onPaymentError?.(error);
  };

  return (
    <div className={`space-y-4 ${className || ''}`}>
      {/* Product Information */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{productName}</h3>
        
        {imageUrl && (
          <div className="mb-4">
            <img 
              src={imageUrl} 
              alt={productName}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
        
        <div className="space-y-2 mb-4">
          <p className="text-gray-700"><strong>Price:</strong> ${price} {currency}</p>
          {description && <p className="text-gray-600">{description}</p>}
          {make && model && year && (
            <p className="text-gray-600"><strong>Vehicle:</strong> {year} {make} {model}</p>
          )}
          <p className="text-gray-600"><strong>Contract:</strong> {contractAddress}</p>
          {tokenId && <p className="text-gray-600"><strong>Token ID:</strong> {tokenId}</p>}
        </div>

        {/* Payment Status */}
        <div className="mb-4">
          {paymentStatus === 'idle' && (
            <div className="text-gray-600">Ready to purchase</div>
          )}
          {paymentStatus === 'processing' && (
            <div className="text-blue-600">Processing payment...</div>
          )}
          {paymentStatus === 'success' && (
            <div className="text-green-600">✅ Payment successful!</div>
          )}
          {paymentStatus === 'error' && (
            <div className="text-red-600">❌ Payment failed</div>
          )}
        </div>

        {/* OnchainKit FundButton for OnRamp */}
        {isConnected ? (
          <FundButton
            className="w-full bg-gradient-to-r from-[#a32428] to-[#8b1e22] hover:from-[#8b1e22] hover:to-[#6b1519] text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            sessionToken="demo-session-token"
          >
            Purchase with OnRamp - ${price} {currency}
          </FundButton>
        ) : (
          <button
            onClick={connect}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            Connect Wallet to Purchase
          </button>
        )}
      </div>
    </div>
  );
}