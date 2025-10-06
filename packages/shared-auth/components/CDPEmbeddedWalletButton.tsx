'use client';

import React, { useState } from "react";
// import { AuthButton } from "@coinbase/cdp-react";
// import { useIsSignedIn, useEvmAddress } from "@coinbase/cdp-hooks";
// import { SendEvmTransactionButton } from "@coinbase/cdp-react";

interface CDPEmbeddedWalletButtonProps {
  productId: string;
  productName: string;
  price: number;
  currency: string;
  contractAddress: string;
  tokenId?: string;
  mintUrl?: string;
  imageUrl?: string;
  description?: string;
  onPaymentSuccess?: (paymentId: string, transactionHash?: string) => void;
  onPaymentError?: (error: string) => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function CDPEmbeddedWalletButton(props: CDPEmbeddedWalletButtonProps) {
  // const { isSignedIn } = useIsSignedIn();
  // const { evmAddress } = useEvmAddress();
  const isSignedIn = false; // Placeholder
  const evmAddress = null; // Placeholder
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTransactionSuccess = (hash: string) => {
    console.log('CDP Transaction successful:', hash);
    setIsProcessing(false);
    props.onPaymentSuccess?.(`cdp_${Date.now()}`, hash);
  };

  const handleTransactionError = (error: any) => {
    console.error('CDP Transaction failed:', error);
    setIsProcessing(false);
    props.onPaymentError?.(error.message || 'Transaction failed');
  };

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-[#a32428] text-white hover:bg-[#8b1e22] focus:ring-[#a32428]',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-[#a32428]',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const buttonClasses = `${baseClasses} ${variantClasses[props.variant || 'primary']} ${sizeClasses[props.size || 'md']} ${props.className || ''}`;

  if (!isSignedIn) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {props.productName}
          </h3>
          <p className="text-xl font-bold text-gray-900 mb-2">
            {props.currency === 'ETH' ? `${props.price} ETH` : `$${props.price}`}
          </p>
          {props.description && (
            <p className="text-sm text-gray-600 mb-4">{props.description}</p>
          )}
        </div>
        
        <div className="space-y-3">
          <h4 className="text-base font-medium text-gray-700 text-center">
            Sign in to purchase with embedded wallet
          </h4>
          <div className="bg-gray-200 text-gray-600 py-3 px-4 rounded-lg text-center">
            CDP integration temporarily disabled
          </div>
          <p className="text-xs text-gray-500 text-center">
            No crypto wallet needed - sign in with email or phone
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {props.productName}
        </h3>
        <p className="text-xl font-bold text-gray-900 mb-2">
          {props.currency === 'ETH' ? `${props.price} ETH` : `$${props.price}`}
        </p>
        {props.description && (
          <p className="text-sm text-gray-600 mb-4">{props.description}</p>
        )}
      </div>

      <div className="space-y-3">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-600">Wallet Address</span>
            <span className="text-xs text-gray-500">EVM EOA</span>
          </div>
          <div className="font-mono text-sm text-gray-800 break-all">
            {evmAddress ? `${evmAddress.slice(0, 6)}...${evmAddress.slice(-4)}` : 'Loading...'}
          </div>
        </div>

        {evmAddress && (
          <div className="bg-gray-200 text-gray-600 py-3 px-4 rounded-lg text-center">
            CDP transaction functionality temporarily disabled
          </div>
        )}

        {props.mintUrl && (
          <a
            href={props.mintUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center text-sm text-blue-600 hover:text-blue-800 underline py-2"
          >
            View on Manifold →
          </a>
        )}
      </div>
    </div>
  );
}
