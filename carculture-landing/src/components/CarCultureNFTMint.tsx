// carculture-landing/src/components/CarCultureNFTMint.tsx

'use client';

import { 
  ConnectButton, 
  NFTMintCard,
  useActiveAccount,
  useReadContract,
  useWriteContract
} from '@coinbase/onchainkit';
import { useState } from 'react';

interface CarCultureNFTMintProps {
  contractAddress: string;
  tokenId?: string;
  price?: string;
  maxSupply?: number;
  className?: string;
}

export function CarCultureNFTMint({
  contractAddress,
  tokenId,
  price = "0.01",
  maxSupply = 100,
  className = ''
}: CarCultureNFTMintProps) {
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const account = useActiveAccount();

  // Read contract data
  const { data: totalSupply } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: 'totalSupply'
  });

  const { data: maxSupplyData } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        "inputs": [],
        "name": "maxSupply",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    functionName: 'maxSupply'
  });

  // Write contract for minting
  const { writeContract } = useWriteContract();

  const handleMint = async () => {
    if (!account) return;

    try {
      setIsMinting(true);
      
      // Mint NFT
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: [
          {
            "inputs": [{"internalType": "address", "name": "to", "type": "address"}],
            "name": "mint",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ],
        functionName: 'mint',
        args: [account.address]
      });

      setMintSuccess(true);
    } catch (error) {
      console.error('Mint error:', error);
    } finally {
      setIsMinting(false);
    }
  };

  const remainingSupply = maxSupplyData ? Number(maxSupplyData) - Number(totalSupply || 0) : 0;
  const isSoldOut = remainingSupply <= 0;

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          CarCulture NFT Collection
        </h3>
        <p className="text-gray-600">
          Mint your exclusive automotive NFT
        </p>
      </div>

      {/* Supply Info */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Remaining Supply</span>
          <span className="font-semibold text-gray-900">
            {remainingSupply} / {maxSupply}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-red-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((maxSupply - remainingSupply) / maxSupply) * 100}%` }}
          />
        </div>
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-gray-900">
          {price} ETH
        </div>
        <div className="text-sm text-gray-600">
          + Gas fees
        </div>
      </div>

      {/* Wallet Connection */}
      {!account ? (
        <div className="text-center">
          <ConnectButton />
          <p className="text-sm text-gray-600 mt-2">
            Connect your wallet to mint
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Mint Button */}
          <button
            onClick={handleMint}
            disabled={isMinting || isSoldOut}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
              isSoldOut
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : isMinting
                ? 'bg-blue-300 text-blue-700 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {isSoldOut
              ? 'Sold Out'
              : isMinting
              ? 'Minting...'
              : 'Mint NFT'
            }
          </button>

          {/* Success Message */}
          {mintSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-800 font-medium">
                  NFT minted successfully!
                </span>
              </div>
            </div>
          )}

          {/* Wallet Info */}
          <div className="text-center text-sm text-gray-600">
            Connected: {account.address.slice(0, 6)}...{account.address.slice(-4)}
          </div>
        </div>
      )}

      {/* Features */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">What you get:</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center">
            <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Exclusive automotive artwork
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            DRIVR AI agent access
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Community membership
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Future airdrops
          </li>
        </ul>
      </div>
    </div>
  );
}

