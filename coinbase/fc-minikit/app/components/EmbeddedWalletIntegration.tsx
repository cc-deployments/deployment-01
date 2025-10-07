'use client';

import React, { useState, useEffect } from 'react';
import {
  useSignInWithEmail,
  useVerifyEmailOTP,
  useCurrentUser,
  useSignOut,
  useIsInitialized,
  useEvmAddress,
} from '@coinbase/cdp-hooks';
import { Loader2, Mail, Shield, Copy, CheckCircle2, AlertCircle } from 'lucide-react';

interface EmbeddedWalletIntegrationProps {
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

export function EmbeddedWalletIntegration(props: EmbeddedWalletIntegrationProps) {
  const isInitialized = useIsInitialized();
  const currentUser = useCurrentUser();
  const evmAddress = useEvmAddress();
  const signInWithEmail = useSignInWithEmail();
  const verifyEmailOTP = useVerifyEmailOTP();
  const signOut = useSignOut();

  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [flowId, setFlowId] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Wait for client-side mounting and SDK initialization
  if (!isMounted || !isInitialized) {
    return (
      <div className="w-full max-w-md mx-auto bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-600" />
        <p className="text-gray-600">Initializing embedded wallet...</p>
      </div>
    );
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      const { flowId } = await signInWithEmail({ email });
      setFlowId(flowId);
      console.log('Email verification sent, flowId:', flowId);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign in failed';
      setAuthError(errorMessage);
      console.error('Email sign-in error:', error);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flowId) return;

    setAuthLoading(true);
    setAuthError(null);

    try {
      await verifyEmailOTP({ flowId, otp });
      setFlowId(null);
      setOtp('');
      setEmail('');
      console.log('OTP verification successful');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Verification failed';
      setAuthError(errorMessage);
      console.error('OTP verification error:', error);
    } finally {
      setAuthLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!evmAddress) {
      props.onPaymentError?.('No wallet address available');
      return;
    }

    setPaymentLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful payment
      const mockPaymentId = `payment_${Date.now()}`;
      const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      props.onPaymentSuccess?.(mockPaymentId, mockTxHash);
      console.log('Payment successful:', { mockPaymentId, mockTxHash });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment failed';
      props.onPaymentError?.(errorMessage);
      console.error('Payment error:', error);
    } finally {
      setPaymentLoading(false);
    }
  };

  // OTP verification state
  if (flowId) {
    return (
      <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-xl p-6">
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-blue-50">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Enter Verification Code</h3>
          <p className="mt-2 text-sm text-gray-600">
            We sent a 6-digit code to <span className="font-medium">{email}</span>
          </p>
        </div>

        {authError && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
            <div className="flex items-center">
              <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
              <span className="text-sm text-red-700">{authError}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="000000"
              className="w-full px-4 py-3 text-center text-2xl font-mono rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              maxLength={6}
              disabled={authLoading}
              required
              autoComplete="one-time-code"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={authLoading || otp.length !== 6} 
            className="w-full py-3 px-4 rounded-xl font-medium bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            {authLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Verifying...
              </div>
            ) : (
              "Verify Code"
            )}
          </button>
        </form>
      </div>
    );
  }

  // Authenticated state - show payment interface
  if (currentUser && evmAddress) {
    return (
      <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-xl p-6">
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-green-50">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Wallet Connected</h3>
        </div>

        <div className="space-y-4 mb-6">
          <div className="rounded-xl p-4 bg-gray-50">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <p className="font-medium text-gray-900">{currentUser?.email || 'User'}</p>
          </div>
          
          <div className="rounded-xl p-4 bg-gray-50">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Wallet Address
            </label>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-gray-900">
                {`${evmAddress.slice(0, 6)}...${evmAddress.slice(-4)}`}
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(evmAddress)}
                className="ml-2 p-1 rounded hover:bg-gray-200 transition-colors"
                title="Copy full address"
              >
                <Copy className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-blue-50 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">{props.productName}</h4>
            <p className="text-lg font-bold text-blue-900">
              {props.currency === 'ETH' ? `${props.price} ETH` : `$${props.price}`}
            </p>
          </div>
        </div>

        <button 
          onClick={handlePayment}
          disabled={paymentLoading}
          className="w-full py-3 px-4 rounded-xl font-medium bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
        >
          {paymentLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Processing Payment...
            </div>
          ) : (
            "Complete Purchase"
          )}
        </button>
      </div>
    );
  }

  // Email sign-in state
  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-xl p-6">
      <div className="text-center mb-6">
        <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-blue-50">
          <Mail className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Connect Your Wallet</h3>
        <p className="mt-2 text-sm text-gray-600">
          Sign in with your email to create a wallet
        </p>
      </div>

      {authError && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
          <div className="flex items-center">
            <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
            <span className="text-sm text-red-700">{authError}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={authLoading}
            required
          />
        </div>
        
        <button 
          type="submit" 
          disabled={authLoading || !email} 
          className="w-full py-3 px-4 rounded-xl font-medium bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          {authLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Sending...
            </div>
          ) : (
            "Sign-in / Sign-up"
          )}
        </button>
      </form>
      
      <p className="text-center text-xs mt-6 text-gray-500">
        Powered by <strong>Coinbase Developer Platform</strong>
      </p>
    </div>
  );
}

// Example usage component
export function EmbeddedWalletExample() {
  const exampleProduct = {
    productId: 'summertime-blues-1',
    productName: 'Summertime Blues NFT',
    price: 0.001,
    currency: 'ETH',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '1'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            CarMania Embedded Wallets Demo
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Web2 users can buy NFTs with email/SMS login - no crypto wallet needed!
          </p>
        </div>
        
        <EmbeddedWalletIntegration
          {...exampleProduct}
          onPaymentSuccess={(paymentId, txHash) => {
            console.log('Embedded Wallet payment completed:', { paymentId, txHash });
            alert(`Payment successful! Payment ID: ${paymentId}`);
          }}
          onPaymentError={(error) => {
            console.error('Embedded Wallet payment error:', error);
            alert(`Payment failed: ${error}`);
          }}
        />
      </div>
    </div>
  );
}