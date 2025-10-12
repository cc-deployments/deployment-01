'use client';

import React, { useEffect, useState } from 'react';

export default function ManifoldWidgetTest() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    // Check if wallet is connected
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setIsWalletConnected(true);
            setWalletAddress(accounts[0]);
          }
        })
        .catch(console.error);

      // Check network
      window.ethereum.request({ method: 'eth_chainId' })
        .then((chainId: string) => {
          console.log('Current chain ID:', chainId);
          if (chainId === '0x2105') {
            console.log('Connected to Base network');
          } else {
            console.log('Not on Base network, current chain:', chainId);
          }
        })
        .catch(console.error);
    }

    // Force initialize Manifold widgets
    const initWidgets = () => {
      if (typeof window !== 'undefined' && (window as any).Manifold) {
        console.log('Manifold scripts loaded, initializing widgets...');
        // Force widget initialization
        const widgets = document.querySelectorAll('[data-manifold-widget]');
        widgets.forEach(widget => {
          console.log('Found widget:', widget);
        });
      } else {
        console.log('Manifold scripts not loaded yet, retrying...');
        setTimeout(initWidgets, 1000);
      }
    };

    // Start initialization
    setTimeout(initWidgets, 2000);
  }, []);

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setIsWalletConnected(true);
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error('Wallet connection failed:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Manifold Widget Test</h1>
        
        {/* Wallet Connection Status */}
        <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Wallet Connection Status</h2>
          {isWalletConnected ? (
            <div className="text-green-600">
              <p>✅ Wallet Connected: {walletAddress}</p>
              <p>Network: {typeof window !== 'undefined' && (window.ethereum as any)?.chainId === '0x2105' ? 'Base' : `Unknown (${(window.ethereum as any)?.chainId || 'No chain ID'})`}</p>
            </div>
          ) : (
            <div className="text-red-600">
              <p>❌ No Wallet Connected</p>
              <button 
                onClick={connectWallet}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Connect Wallet
              </button>
              <p className="mt-2 text-sm text-gray-600">
                Note: Widgets may not work without wallet connection
              </p>
            </div>
          )}
        </div>

        {/* Debug Info */}
        <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Debug Information:</h3>
          <ul className="text-yellow-700 space-y-1 text-sm">
            <li>• Window.ethereum available: {typeof window !== 'undefined' && window.ethereum ? 'Yes' : 'No'}</li>
            <li>• Manifold scripts loaded: {typeof window !== 'undefined' && (window as any).Manifold ? 'Yes' : 'No'}</li>
            <li>• ClaimComplete widget: {typeof window !== 'undefined' && (window as any).Manifold?.claimComplete ? 'Yes' : 'No'}</li>
            <li>• Marketplace widget: {typeof window !== 'undefined' && (window as any).Manifold?.marketplace ? 'Yes' : 'No'}</li>
            <li>• Connect widget: {typeof window !== 'undefined' && (window as any).Manifold?.connect ? 'Yes' : 'No'}</li>
            <li>• Current URL: {typeof window !== 'undefined' ? window.location.href : 'N/A'}</li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Test 1: Direct Manifold Link */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Direct Manifold Link Test</h2>
            <p className="text-gray-600 mb-4">Testing direct link to your Summertime Blues NFT</p>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Title: CarMania Garage Testing 2<br/>
                Manifold ID: 4169128176<br/>
                Username: @carculture
              </p>
              
              <a 
                href="https://manifold.xyz/@carculture/id/4169128176"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Open in Manifold
              </a>
            </div>
          </div>

          {/* Test 2: Manifold Iframe */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Manifold Iframe Test</h2>
            <p className="text-gray-600 mb-4">Testing Manifold iframe embedding</p>
            
            <div className="w-full h-96 border rounded-lg overflow-hidden">
              <iframe
                src="https://manifold.xyz/@carculture/id/4169128176"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Manifold NFT"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Test 3: Simple Buy Button */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Simple Buy Button Test</h2>
            <p className="text-gray-600 mb-4">Testing simple purchase flow</p>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold">Flat Sea</h3>
                <p className="text-sm text-gray-600">Price: 0.015 ETH</p>
                <p className="text-sm text-gray-600">Network: Base</p>
                <p className="text-sm text-gray-600">Minted: 0/10</p>
              </div>
              
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  const url = 'https://manifold.xyz/@carculture/id/4169128176';
                  console.log('Opening Manifold URL:', url);
                  window.open(url, '_blank', 'noopener,noreferrer');
                }}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Buy Now (0.015 ETH)
              </button>
            </div>
          </div>

          {/* Test 4: Wallet Connection Test */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Wallet Connection Test</h2>
            <p className="text-gray-600 mb-4">Testing wallet connection for purchases</p>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-100 rounded-lg">
                <p className="text-green-800">✅ Wallet Connected</p>
                <p className="text-sm text-green-600">{walletAddress}</p>
              </div>
              
              <button 
                onClick={connectWallet}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Reconnect Wallet
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Testing Instructions:</h3>
          <ul className="text-blue-700 space-y-2">
            <li>• Check if widgets load properly</li>
            <li>• Test wallet connection</li>
            <li>• Check if pricing shows ETH or USD</li>
            <li>• Test purchase flow</li>
            <li>• Verify Base network connection</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
