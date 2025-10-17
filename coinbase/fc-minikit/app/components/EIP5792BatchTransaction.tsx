'use client';

import React, { useState, useEffect } from 'react';

interface BatchCall {
  to: string;
  data: string;
  value?: string;
}

interface EIP5792BatchTransactionProps {
  calls: BatchCall[];
  onSuccess?: (result: any) => void;
  onError?: (error: string) => void;
  className?: string;
}

export function EIP5792BatchTransaction({
  calls,
  onSuccess,
  onError,
  className
}: EIP5792BatchTransactionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [walletCapabilities, setWalletCapabilities] = useState<string[]>([]);

  // Check wallet capabilities on mount
  useEffect(() => {
    checkWalletCapabilities();
  }, []);

  const checkWalletCapabilities = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        // Check if wallet supports EIP5792
        const capabilities = await window.ethereum.request({
          method: 'wallet_getCapabilities'
        });
        
        if (capabilities) {
          setWalletCapabilities(Object.keys(capabilities));
        }
      }
    } catch (error) {
      console.log('Wallet capabilities check failed:', error);
    }
  };

  const executeBatchTransaction = async () => {
    try {
      setIsLoading(true);
      setTransactionStatus('pending');

      if (!window.ethereum) {
        throw new Error('No wallet detected. Please install a compatible wallet.');
      }

      // Check if wallet supports EIP5792
      if (!walletCapabilities.includes('wallet_sendCalls')) {
        throw new Error('Your wallet does not support batch transactions (EIP5792). Please use a compatible wallet.');
      }

      // Prepare batch calls
      const batchCalls = calls.map(call => ({
        to: call.to,
        data: call.data,
        value: call.value || '0x0'
      }));

      // Execute batch transaction using EIP5792
      const result = await window.ethereum.request({
        method: 'wallet_sendCalls',
        params: [{
          version: '1.0',
          chainId: '0x2105', // Base mainnet
          calls: batchCalls,
          capabilities: {
            paymasterService: {
              url: 'https://paymaster.base.org' // BASE paymaster service
            }
          }
        }]
      });

      console.log('Batch transaction submitted:', result);

      // Monitor transaction status
      const monitorTransaction = async () => {
        try {
          const status = await window.ethereum?.request({
            method: 'wallet_getCallsStatus',
            params: [result.sessionId]
          });

          if (status.status === 'CONFIRMED') {
            setTransactionStatus('success');
            setIsLoading(false);
            onSuccess?.(result);
          } else if (status.status === 'FAILED') {
            setTransactionStatus('error');
            setIsLoading(false);
            onError?.(status.error || 'Transaction failed');
          } else {
            // Still pending, check again
            setTimeout(monitorTransaction, 2000);
          }
        } catch (error) {
          setTransactionStatus('error');
          setIsLoading(false);
          onError?.(error.message);
        }
      };

      // Start monitoring
      monitorTransaction();

    } catch (error) {
      setTransactionStatus('error');
      setIsLoading(false);
      onError?.(error.message);
    }
  };

  const getStatusIcon = () => {
    switch (transactionStatus) {
      case 'pending': return '⏳';
      case 'success': return '✅';
      case 'error': return '❌';
      default: return '🚀';
    }
  };

  const getStatusText = () => {
    switch (transactionStatus) {
      case 'pending': return 'Processing batch transaction...';
      case 'success': return 'All transactions completed successfully!';
      case 'error': return 'Transaction failed. Please try again.';
      default: return 'Execute batch transaction';
    }
  };

  const isEIP5792Supported = walletCapabilities.includes('wallet_sendCalls');

  return (
    <div className={`w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border ${className}`}>
      <div className="p-6">
        <div className="text-center mb-4">
          <div className="text-2xl mb-2">{getStatusIcon()}</div>
          <h3 className="text-lg font-semibold">EIP5792 Batch Transaction</h3>
          <p className="text-sm text-gray-600">
            Execute multiple operations atomically
          </p>
        </div>

        {/* Wallet Capabilities */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium mb-2">Wallet Capabilities:</div>
          <div className="text-xs text-gray-600">
            {isEIP5792Supported ? (
              <span className="text-green-600">✅ EIP5792 Supported</span>
            ) : (
              <span className="text-red-600">❌ EIP5792 Not Supported</span>
            )}
          </div>
          {walletCapabilities.length > 0 && (
            <div className="mt-1 text-xs text-gray-500">
              Available: {walletCapabilities.join(', ')}
            </div>
          )}
        </div>

        {/* Transaction Details */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-sm font-medium mb-2">Batch Operations:</div>
          <div className="text-xs text-gray-600">
            {calls.length} transaction{calls.length !== 1 ? 's' : ''} will be executed atomically
          </div>
          <div className="mt-2 space-y-1">
            {calls.map((call, index) => (
              <div key={index} className="text-xs text-gray-500">
                {index + 1}. {call.to.slice(0, 6)}...{call.to.slice(-4)}
              </div>
            ))}
          </div>
        </div>

        {/* Execute Button */}
        <button
          onClick={executeBatchTransaction}
          disabled={isLoading || !isEIP5792Supported || transactionStatus === 'success'}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {getStatusText()}
            </>
          ) : (
            getStatusText()
          )}
        </button>

        {/* Status Messages */}
        {transactionStatus === 'error' && (
          <div className="mt-3 text-center text-sm text-red-600">
            Please try again or use a different wallet.
          </div>
        )}

        {transactionStatus === 'success' && (
          <div className="mt-3 text-center text-sm text-green-600">
            🎉 All operations completed successfully!
          </div>
        )}

        {/* EIP5792 Benefits */}
        <div className="mt-4 text-xs text-gray-500">
          <div className="font-medium mb-1">EIP5792 Benefits:</div>
          <div>• Atomic execution (all succeed or all fail)</div>
          <div>• Reduced gas costs</div>
          <div>• Better user experience</div>
        </div>
      </div>
    </div>
  );
}

// Helper function to create NFT purchase batch calls
export function createNFTPurchaseBatchCalls(
  nftContract: string,
  tokenId: string,
  price: string,
  buyerAddress: string
): BatchCall[] {
  // Helper function to pad hex values
  const padHex = (value: string, length: number = 64) => {
    const hex = value.startsWith('0x') ? value.slice(2) : value;
    return '0x' + hex.padStart(length, '0');
  };

  // Helper function to encode uint256
  const encodeUint256 = (value: string) => {
    const hex = BigInt(value).toString(16);
    return hex.padStart(64, '0');
  };

  // For Manifold contracts, we need to call the purchase function
  // Function signature: purchase(uint256 tokenId)
  // Function selector: 0x693ec85e (first 4 bytes of keccak256 hash)
  const functionSelector = '0x693ec85e';
  const encodedTokenId = encodeUint256(tokenId);
  
  return [
    // Single call to purchase NFT from Manifold contract
    {
      to: nftContract,
      data: `${functionSelector}${encodedTokenId}`,
      value: padHex(price) // Send ETH/USDC as payment
    }
  ];
}

// Example usage component
export function EIP5792Example() {
  const [calls, setCalls] = useState<BatchCall[]>([]);

  useEffect(() => {
    // Example: Create batch calls for NFT purchase
    const exampleCalls = createNFTPurchaseBatchCalls(
      '0x8ef0772347e0caed0119937175d7ef9636ae1aa0', // NFT contract
      '1', // Token ID
      '1000000000000000000', // 1 ETH in wei
      '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6' // Buyer address
    );
    setCalls(exampleCalls);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            EIP5792 Batch Transactions
          </h1>
          <p className="text-gray-600">
            Execute multiple operations atomically with improved UX
          </p>
        </div>
        
        <EIP5792BatchTransaction
          calls={calls}
          onSuccess={(result) => {
            console.log('Batch transaction successful:', result);
          }}
          onError={(error) => {
            console.error('Batch transaction failed:', error);
          }}
        />
      </div>
    </div>
  );
}


