// packages/shared-auth/components/BasePayButton.tsx

import React from 'react';
import { useBasePay } from '../hooks/useBasePay';
import type { BasePayConfig } from '../types/basePay';

export interface BasePayButtonProps {
  config: BasePayConfig;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function BasePayButton({
  config,
  onSuccess,
  onError,
  className = '',
  disabled = false,
  children,
  variant = 'primary',
  size = 'md',
}: BasePayButtonProps) {
  const { pay, isProcessing, error } = useBasePay();

  const handlePayment = async () => {
    try {
      const result = await pay(config);
      onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Payment failed');
      onError?.(error);
    }
  };

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const defaultChildren = isProcessing 
    ? 'Processing...' 
    : `Pay $${config.amount} with Base Pay`;

  return (
    <div className="space-y-2">
      <button
        onClick={handlePayment}
        disabled={disabled || isProcessing}
        className={buttonClasses}
      >
        {isProcessing && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
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
    </div>
  );
}
