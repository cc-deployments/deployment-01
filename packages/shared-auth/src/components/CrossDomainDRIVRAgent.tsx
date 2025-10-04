// packages/shared-auth/src/components/CrossDomainDRIVRAgent.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { 
  getCrossDomainAuthState, 
  setCrossDomainAuthState, 
  listenForCrossDomainAuthUpdates,
  getDRIVRAgentConfig,
  CrossDomainAuthState 
} from '../crossDomainAuth';

interface CrossDomainDRIVRAgentProps {
  onAuthStateChange?: (state: CrossDomainAuthState) => void;
  className?: string;
}

export function CrossDomainDRIVRAgent({ 
  onAuthStateChange, 
  className = '' 
}: CrossDomainDRIVRAgentProps) {
  const [authState, setAuthState] = useState<CrossDomainAuthState>(getCrossDomainAuthState());
  const [isConnected, setIsConnected] = useState(false);
  const [agentConfig] = useState(getDRIVRAgentConfig());

  useEffect(() => {
    // Listen for cross-domain auth updates
    const cleanup = listenForCrossDomainAuthUpdates((newState) => {
      setAuthState(newState);
      setIsConnected(newState.isAuthenticated);
      onAuthStateChange?.(newState);
    });

    // Set initial state
    setIsConnected(authState.isAuthenticated);
    onAuthStateChange?.(authState);

    return cleanup;
  }, [onAuthStateChange]);

  const handleConnect = () => {
    // Simulate wallet connection
    const mockWalletAddress = '0x' + Math.random().toString(16).substr(2, 40);
    
    setCrossDomainAuthState({
      isAuthenticated: true,
      walletAddress: mockWalletAddress
    });
  };

  const handleDisconnect = () => {
    setCrossDomainAuthState({
      isAuthenticated: false,
      walletAddress: undefined
    });
  };

  return (
    <div className={`p-4 border rounded-lg bg-white ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">DRIVR Agent</h3>
          <p className="text-sm text-gray-600">
            Cross-domain authentication: {authState.isAuthenticated ? 'Connected' : 'Disconnected'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            isConnected ? 'bg-green-500' : 'bg-gray-400'
          }`} />
          <span className="text-sm text-gray-600">
            {isConnected ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      {authState.walletAddress && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Connected Wallet:</p>
          <p className="font-mono text-sm text-gray-900">
            {authState.walletAddress.slice(0, 6)}...{authState.walletAddress.slice(-4)}
          </p>
        </div>
      )}

      <div className="space-y-2">
        {!isConnected ? (
          <button
            onClick={handleConnect}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Connect to DRIVR Agent
          </button>
        ) : (
          <button
            onClick={handleDisconnect}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Disconnect
          </button>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 space-y-1">
          <p><strong>Agent Address:</strong> {agentConfig.agentAddress}</p>
          <p><strong>Basename:</strong> {agentConfig.basename}</p>
          <p><strong>XMTP Env:</strong> {agentConfig.xmtpEnv}</p>
          <p><strong>Current Domain:</strong> {authState.domain}</p>
        </div>
      </div>
    </div>
  );
}

// Hook for using cross-domain auth state
export function useCrossDomainAuth() {
  const [authState, setAuthState] = useState<CrossDomainAuthState>(getCrossDomainAuthState());

  useEffect(() => {
    const cleanup = listenForCrossDomainAuthUpdates(setAuthState);
    return cleanup;
  }, []);

  return {
    authState,
    isAuthenticated: authState.isAuthenticated,
    walletAddress: authState.walletAddress,
    domain: authState.domain
  };
}

