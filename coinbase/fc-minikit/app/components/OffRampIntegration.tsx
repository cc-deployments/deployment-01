'use client';

import React, { useState, useEffect } from 'react';
import { useOffRamp } from '@cculture/shared-auth';
import { useAccount, useConnect } from 'wagmi';

interface OffRampIntegrationProps {
  className?: string;
  onSuccess?: (transactionId: string) => void;
  onError?: (error: string) => void;
}

export function OffRampIntegration({ 
  className = '', 
  onSuccess, 
  onError 
}: OffRampIntegrationProps) {
  const [mounted, setMounted] = useState(false);
  
  // CDP hooks - safe after mounted check
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { 
    isProcessing, 
    offRampUrl, 
    sessionToken, 
    transactionStatus, 
    config, 
    error,
    createOffRampSession,
    getTransactionStatus,
    getConfig,
    reset
  } = useOffRamp();

  const [selectedAsset, setSelectedAsset] = useState('ETH');
  const [selectedAmount, setSelectedAmount] = useState('0.1');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [partnerUserId, setPartnerUserId] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything during SSR
  if (!mounted) return null;

  // Generate partner user ID on component mount
  useEffect(() => {
    if (address && !partnerUserId) {
      setPartnerUserId(`user_${address.slice(2, 8)}_${Date.now()}`);
    }
  }, [address, partnerUserId]);

  // Load offramp config on mount
  useEffect(() => {
    getConfig().catch(console.error);
  }, [getConfig]);

  const handleCreateOffRamp = async () => {
    if (!address || !partnerUserId) {
      onError?.('Wallet not connected or user ID not generated');
      return;
    }

    try {
      const result = await createOffRampSession({
        partnerUserId,
        redirectUrl: `${window.location.origin}/offramp-success`,
        addresses: [address],
        asset: selectedAsset,
        network: 'base',
        amount: selectedAmount,
      });

      // Open offramp URL in new window
      if (result.offRampUrl) {
        window.open(result.offRampUrl, '_blank', 'width=600,height=700');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create offramp session';
      onError?.(errorMessage);
    }
  };

  const handleCheckStatus = async () => {
    if (!partnerUserId) return;
    
    try {
      await getTransactionStatus(partnerUserId);
    } catch (err) {
      console.error('Failed to check transaction status:', err);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          CarCulture OffRamp - Sell Crypto for Fiat
        </h2>
        <p className="text-gray-600">
          Convert your crypto assets to fiat currency
        </p>
      </div>

      {/* Wallet Status */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-medium">Wallet Status:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isConnected ? 'Connected' : 'Not Connected'}
          </span>
        </div>
        {isConnected && address && (
          <div className="mt-2">
            <span className="text-gray-600 text-sm">Address: </span>
            <span className="font-mono text-sm bg-white border border-gray-300 px-2 py-1 rounded">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          </div>
        )}
      </div>

      {/* Wallet Connection Button */}
      {!isConnected && (
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Connect Your Wallet</h3>
          <p className="text-blue-700 text-sm mb-4">
            You need to connect a wallet with crypto assets to use OffRamp.
          </p>
          <button
            onClick={() => {
              if (connectors.length > 0) {
                connect({ connector: connectors[0] });
              }
            }}
            style={{
              width: '100%',
              background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
              color: 'white',
              fontWeight: 'bold',
              padding: '12px 16px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease',
              transform: 'scale(1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, #1d4ed8, #1e40af)';
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, #2563eb, #1d4ed8)';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            }}
          >
            <span className="mr-2">🔗</span>
            Connect Wallet
          </button>
        </div>
      )}

      {/* OffRamp Configuration */}
      {isConnected && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Sell Configuration</h3>
          
          {/* Asset Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Crypto Asset
            </label>
            <select
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {config?.assets.map((asset) => (
                <option key={asset} value={asset}>{asset}</option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount to Sell
            </label>
            <input
              type="number"
              step="0.001"
              value={selectedAmount}
              onChange={(e) => setSelectedAmount(e.target.value)}
              placeholder="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Currency Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Receive Currency
            </label>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {config?.currencies.map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>

          {/* Create OffRamp Button */}
          <button
            onClick={handleCreateOffRamp}
            disabled={isProcessing || !isConnected}
            style={{
              width: '100%',
              background: 'linear-gradient(to right, #9333ea, #7c3aed)',
              color: 'white',
              fontWeight: 'bold',
              padding: '12px 16px',
              borderRadius: '12px',
              border: 'none',
              cursor: isProcessing || !isConnected ? 'not-allowed' : 'pointer',
              opacity: isProcessing || !isConnected ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease',
              transform: 'scale(1)',
            }}
            onMouseEnter={(e) => {
              if (!isProcessing && isConnected) {
                e.currentTarget.style.background = 'linear-gradient(to right, #7c3aed, #6d28d9)';
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isProcessing && isConnected) {
                e.currentTarget.style.background = 'linear-gradient(to right, #9333ea, #7c3aed)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              }
            }}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating OffRamp Session...
              </>
            ) : (
              <>
                <span className="mr-2">💰</span>
                Sell {selectedAmount} {selectedAsset} for {selectedCurrency}
              </>
            )}
          </button>
        </div>
      )}

      {/* Transaction Status */}
      {transactionStatus && (
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Transaction Status</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-700">Status:</span>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                transactionStatus.status === 'completed' ? 'bg-green-100 text-green-800' :
                transactionStatus.status === 'failed' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {transactionStatus.status.toUpperCase()}
              </span>
            </div>
            {transactionStatus.sellAmount && (
              <div className="flex justify-between">
                <span className="text-blue-700">Amount:</span>
                <span className="text-blue-900">{transactionStatus.sellAmount} {transactionStatus.asset}</span>
              </div>
            )}
            {transactionStatus.network && (
              <div className="flex justify-between">
                <span className="text-blue-700">Network:</span>
                <span className="text-blue-900">{transactionStatus.network}</span>
              </div>
            )}
          </div>
          
          <button
            onClick={handleCheckStatus}
            className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Refresh Status
          </button>
        </div>
      )}

      {/* OffRamp URL Display */}
      {offRampUrl && (
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-900 mb-2">OffRamp Session Created</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
            <p className="text-blue-800 text-sm font-medium">
              ✅ Using proper OffRamp with session token
            </p>
            <p className="text-blue-700 text-xs mt-1">
              Session token generated via server-side API route for secure CDP integration.
            </p>
          </div>
          <p className="text-green-700 text-sm mb-2">
            Session Token: {sessionToken}
          </p>
          <p className="text-green-700 text-sm mb-3">
            Complete your transaction in the opened window.
          </p>
          <button
            onClick={() => window.open(offRampUrl, '_blank')}
            className="text-green-600 hover:text-green-800 text-sm font-medium"
          >
            Open Payment Window
          </button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Error</h3>
          <p className="text-red-700">{error}</p>
          <button
            onClick={reset}
            className="mt-3 text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Reset
          </button>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">How OffRamp Works</h3>
        <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
          <li>Connect your wallet with crypto assets</li>
          <li>Select the asset and amount you want to sell</li>
          <li>Choose your preferred fiat currency</li>
          <li>Complete the transaction in the Coinbase widget</li>
          <li>Receive fiat in your bank account or Coinbase account</li>
        </ol>
      </div>
    </div>
  );
}
