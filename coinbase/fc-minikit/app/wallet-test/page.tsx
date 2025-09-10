"use client";

import { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { base } from 'viem/chains';

export default function WalletTest() {
  const { address, isConnected, chainId } = useAccount();
  const [balance, setBalance] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(false);

  const { data: balanceData, refetch } = useBalance({
    address: address as `0x${string}`,
    chainId: base.id,
  });

  useEffect(() => {
    if (balanceData) {
      setBalance(balanceData.formatted);
    }
  }, [balanceData]);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await refetch();
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Smart Wallet Test</h1>
        
        <div className="space-y-4">
          <div className="border p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Connection Status</h2>
            <p><strong>Connected:</strong> {isConnected ? 'Yes' : 'No'}</p>
            <p><strong>Address:</strong> {address || 'Not connected'}</p>
            <p><strong>Chain ID:</strong> {chainId || 'Not connected'}</p>
            <p><strong>Expected Chain:</strong> {base.id} (Base)</p>
          </div>

          <div className="border p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Balance Information</h2>
            <p><strong>ETH Balance:</strong> {balance} ETH</p>
            <p><strong>Raw Balance:</strong> {balanceData?.value?.toString() || 'N/A'}</p>
            <p><strong>Decimals:</strong> {balanceData?.decimals || 'N/A'}</p>
            <p><strong>Symbol:</strong> {balanceData?.symbol || 'N/A'}</p>
            
            <button 
              onClick={handleRefresh}
              disabled={isLoading}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Refreshing...' : 'Refresh Balance'}
            </button>
          </div>

          <div className="border p-4 rounded-lg bg-yellow-50">
            <h2 className="text-lg font-semibold mb-2">Debug Information</h2>
            <p><strong>User Agent:</strong> {typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A'}</p>
            <p><strong>Window Location:</strong> {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
            <p><strong>Timestamp:</strong> {new Date().toISOString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
