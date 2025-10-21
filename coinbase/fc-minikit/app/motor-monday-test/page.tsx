'use client';

import React, { useState } from 'react';
import { NFTMintCard } from '@coinbase/onchainkit/nft';
import { NFTMedia } from '@coinbase/onchainkit/nft/view';
import {
  NFTCreator,
  NFTCollectionTitle,
  NFTQuantitySelector,
  NFTAssetCost,
  NFTMintButton,
} from '@coinbase/onchainkit/nft/mint';
import { buildManifoldMintTransaction } from '../utils/manifoldMintTransaction';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';

export default function MotorMondayTest() {
  const [contractAddress, setContractAddress] = useState<string>('');
  const [tokenId, setTokenId] = useState<string>('');
  const [isReady, setIsReady] = useState<boolean>(false);
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  // CarCulture ERC-1155 details from Manifold
  const mercedesContract = '0x1c6d27a76f4f706cccb698acc236c31f886c5421'; // CarCulture ERC-1155 contract
  const mercedesTokenId = '1'; // Start with token ID 1 (first ERC-1155 token)

  // Custom buildMintTransaction function for Manifold contracts
  const customBuildMintTransaction = async (params: { quantity?: number }) => {
    console.log('🔧 Custom buildMintTransaction called with params:', params);
    console.log('🔧 Wallet address:', address);
    console.log('🔧 Contract address:', contractAddress);
    console.log('🔧 Token ID:', tokenId);
    
    if (!address) {
      throw new Error('Wallet not connected');
    }

    if (!contractAddress || !tokenId) {
      throw new Error('Contract address and token ID must be set');
    }

    const result = await buildManifoldMintTransaction({
      contractAddress: contractAddress as `0x${string}`,
      tokenId: tokenId,
      quantity: params.quantity || 1,
      recipient: address,
    });
    
    console.log('🔧 Custom mint transaction result:', result);
    return result;
  };

  const handleStatus = (status: string) => {
    console.log('Mint Status:', status);
  };

  const handleSuccess = (receipt: any) => {
    console.log('Mint Success:', receipt);
    alert('Mercedes NFT minted successfully! 🚗✨');
  };

  const handleError = (error: any) => {
    console.error('Mint Error:', error);
    alert(`Mint failed: ${error.message}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🚗 Motor Monday Mercedes Test
          </h1>
          <p className="text-gray-600 text-lg">
            Testing OnchainKit NFTMintCard with your Mercedes ERC-1155
          </p>
        </div>

        {/* Wallet Connection */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Wallet Connection</h2>
          <div className="flex items-center justify-center">
            {!isConnected ? (
              <button
                onClick={() => connect({ connector: coinbaseWallet({ appName: 'CarCulture: CarMania Garage' }) })}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="text-center">
                <p className="text-green-600 font-medium mb-2">
                  ✅ Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
                <button
                  onClick={() => disconnect()}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Contract Details Input */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contract Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contract Address
              </label>
              <input
                type="text"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Token ID
              </label>
              <input
                type="text"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={() => {
              setContractAddress(mercedesContract);
              setTokenId(mercedesTokenId);
              setIsReady(true);
            }}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Use Mercedes Contract Details
          </button>
        </div>

        {/* NFT Mint Card */}
        {isReady && contractAddress && tokenId && isConnected && address && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">CarCulture ERC-1155 Mint - $1.00</h2>
            <div className="max-w-md mx-auto">
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  🔧 Debug: Custom function ready: {customBuildMintTransaction ? '✅' : '❌'}
                </p>
                <p className="text-sm text-blue-800">
                  🔧 Contract: {contractAddress}
                </p>
                <p className="text-sm text-blue-800">
                  🔧 Token ID: {tokenId}
                </p>
                <p className="text-sm text-blue-800">
                  🔧 Wallet: {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
                <button
                  onClick={async () => {
                    try {
                      console.log('🧪 Testing custom function manually...');
                      const result = await customBuildMintTransaction({ quantity: 1 });
                      console.log('🧪 Manual test result:', result);
                      alert('Custom function works! Check console for details.');
                    } catch (error) {
                      console.error('🧪 Manual test error:', error);
                      alert(`Custom function error: ${error.message}`);
                    }
                  }}
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                >
                  🧪 Test Custom Function
                </button>
              </div>
              <NFTMintCard
                contractAddress={contractAddress as `0x${string}`}
                tokenId={tokenId}
                buildMintTransaction={customBuildMintTransaction}
                onStatus={handleStatus}
                onSuccess={handleSuccess}
                onError={handleError}
              >
                <NFTCreator />
                <NFTMedia />
                <NFTCollectionTitle />
                <NFTQuantitySelector />
                <NFTAssetCost />
                <NFTMintButton />
              </NFTMintCard>
            </div>
          </div>
        )}

        {/* Show message when wallet not connected */}
        {isReady && contractAddress && tokenId && !isConnected && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-800">⚠️ Wallet Required</h2>
            <p className="text-yellow-700">
              Please connect your wallet above to enable minting.
            </p>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            🚀 How to Test
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Contract: <code>0x1c6d27a76f4f706cccb698acc236c31f886c5421</code> (CarCulture ERC-1155)</li>
            <li>Token ID: <code>1</code> (First ERC-1155 Token - $1.00)</li>
            <li>Click "Use Mercedes Contract Details" to auto-fill</li>
            <li>Connect your wallet (Base network)</li>
            <li>Click the mint button to test the ERC-1155 edition flow</li>
          </ol>
        </div>

        {/* Status Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-4">
          <h3 className="text-lg font-semibold text-green-900 mb-3">
            ✅ OnchainKit Status
          </h3>
          <div className="space-y-2 text-green-800">
            <p>• OnchainKit Version: 1.1.0</p>
            <p>• Base Network: Configured</p>
            <p>• NFTMintCard: Ready for ERC-1155</p>
            <p>• Frame-sdk Issue: Resolved in source code</p>
          </div>
        </div>
      </div>
    </div>
  );
}
