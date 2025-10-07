// packages/shared-auth/components/SamsungContentCoin.tsx

import React, { useState } from 'react';
import { useBasePay } from '../hooks/useBasePay';
import type { BasePayConfig } from '../types/basePay';

export interface SamsungContentCoinProps {
  contentId: string;
  contentTitle: string;
  contentPrice: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function SamsungContentCoin({
  contentId,
  contentTitle,
  contentPrice,
  onSuccess,
  onError,
  className = '',
  disabled = false,
  children,
}: SamsungContentCoinProps) {
  const { pay, isProcessing, error } = useBasePay();
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleContentPurchase = async () => {
    try {
      const result = await pay({
        amount: contentPrice,
        to: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', // CarCulture revenue wallet
        testnet: false, // Mainnet for Samsung integration
        payerInfo: {
          email: true,
          name: true,
        },
        callbackUrl: `/api/samsung-content/unlock/${contentId}`,
      });
      
      setIsUnlocked(true);
      onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Content purchase failed');
      onError?.(error);
    }
  };

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const buttonClasses = `${baseClasses} bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500 px-6 py-3 text-lg ${className}`;

  const defaultChildren = isProcessing 
    ? 'Unlocking Content...' 
    : isUnlocked
    ? 'Content Unlocked! 🎉'
    : `Unlock ${contentTitle} - $${contentPrice}`;

  return (
    <div className="space-y-2">
      <button
        onClick={handleContentPurchase}
        disabled={disabled || isProcessing || isUnlocked}
        className={buttonClasses}
      >
        {isProcessing && (
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children || defaultChildren}
      </button>
      
      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}
      
      {isUnlocked && (
        <div className="text-green-600 text-sm font-medium">
          ✅ Content unlocked! Access granted to Samsung Galaxy users.
        </div>
      )}
    </div>
  );
}

// Samsung Content Gating Component
export function SamsungContentGate({
  contentId,
  contentTitle,
  contentPrice,
  children,
  className = '',
}: {
  contentId: string;
  contentTitle: string;
  contentPrice: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  if (isUnlocked) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 ${className}`}>
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        
        <h3 className="text-xl font-bold text-white">
          Samsung Galaxy Exclusive Content
        </h3>
        
        <p className="text-gray-300">
          Unlock exclusive {contentTitle} content with Samsung Content Coin
        </p>
        
        <SamsungContentCoin
          contentId={contentId}
          contentTitle={contentTitle}
          contentPrice={contentPrice}
          onSuccess={handleUnlock}
          className="w-full"
        />
        
        <p className="text-xs text-gray-400">
          Powered by Base Pay • Samsung Galaxy Integration
        </p>
      </div>
    </div>
  );
}








