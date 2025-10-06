'use client';

import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

export default function MotorMondayWorking() {
  const [quantity, setQuantity] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  
  // CarCulture ERC-1155 details
  const contractAddress = '0x1c6d27a76f4f706cccb698acc236c31f886c5421';
  const tokenId = 0; // First token in the edition
  const pricePerToken = parseEther('1.0'); // 1 USDC equivalent in ETH for testing
  
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleMint = async () => {
    if (!isConnected) {
      connect({ connector: connectors[0] });
      return;
    }

    setIsMinting(true);
    try {
      // For ERC-1155, we need to call the contract's mint function
      // This is a simplified version - you may need to adjust based on your contract's ABI
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: [
          {
            name: 'mint',
            type: 'function',
            stateMutability: 'payable',
            inputs: [
              { name: 'to', type: 'address' },
              { name: 'id', type: 'uint256' },
              { name: 'amount', type: 'uint256' },
              { name: 'data', type: 'bytes' }
            ],
            outputs: []
          }
        ],
        functionName: 'mint',
        args: [address!, BigInt(tokenId), BigInt(quantity), '0x'],
        value: pricePerToken * BigInt(quantity)
      });
    } catch (err) {
      console.error('Mint error:', err);
    } finally {
      setIsMinting(false);
    }
  };

  const handleConnect = () => {
    connect({ connector: connectors[0] });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🚗 Motor Monday Working Mint
          </h1>
          <p className="text-gray-600 text-lg">
            Custom ERC-1155 mint component without OnchainKit
          </p>
        </div>

        {/* Contract Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contract Information</h2>
          <div className="space-y-3">
            <div>
              <strong>Contract:</strong> 
              <code className="bg-gray-100 px-2 py-1 rounded ml-2 text-sm">
                {contractAddress}
              </code>
            </div>
            <div>
              <strong>Token ID:</strong> 
              <code className="bg-gray-100 px-2 py-1 rounded ml-2">{tokenId}</code>
            </div>
            <div>
              <strong>Price:</strong> $1.00 per token
            </div>
            <div>
              <strong>Type:</strong> ERC-1155 Edition
            </div>
            <div>
              <strong>Supply:</strong> 100 tokens available
            </div>
          </div>
        </div>

        {/* Mint Interface */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Mint Your NFT</h2>
          
          {/* NFT Preview Placeholder */}
          <div className="mb-6">
            <div className="w-full h-64 bg-gradient-to-br from-pink-400 to-purple-600 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-2">🚗</div>
                <div className="text-xl font-semibold">Car Culture: CarMania Garage</div>
                <div className="text-sm opacity-80">Test 2 Edition</div>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center border border-gray-300 rounded-md px-3 py-2"
                min="1"
                max="10"
              />
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
          </div>

          {/* Wallet Connection */}
          {!isConnected ? (
            <button
              onClick={handleConnect}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Connect Wallet to Mint
            </button>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-green-800 font-medium">
                    Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
                  </span>
                </div>
              </div>
              
              <button
                onClick={handleMint}
                disabled={isPending || isConfirming || isMinting}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending || isConfirming || isMinting ? 'Minting...' : `Mint ${quantity} NFT${quantity > 1 ? 's' : ''} for $${quantity}.00`}
              </button>
            </div>
          )}

          {/* Transaction Status */}
          {hash && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm">
                <strong>Transaction Hash:</strong>
                <br />
                <code className="text-xs break-all">{hash}</code>
              </div>
              {isConfirming && (
                <div className="mt-2 text-blue-600">
                  ⏳ Confirming transaction...
                </div>
              )}
              {isSuccess && (
                <div className="mt-2 text-green-600">
                  ✅ Mint successful! Check your wallet.
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-red-600">
                <strong>Error:</strong> {error.message}
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            🚀 How to Test
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Click "Connect Wallet to Mint"</li>
            <li>Select your Coinbase Wallet</li>
            <li>Choose quantity (1-10 tokens)</li>
            <li>Click "Mint X NFTs for $X.00"</li>
            <li>Confirm the transaction in your wallet</li>
            <li>Wait for confirmation</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
