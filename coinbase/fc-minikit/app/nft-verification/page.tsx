'use client';

import React, { useState } from 'react';

export default function NFTVerification() {
  const [walletAddress, setWalletAddress] = useState('0x048a22DAB92f2c1e7Deb3847Ca151B888aAb0F1C'); // Your smart wallet (l3ldrivr.base.eth)
  const [contractAddress, setContractAddress] = useState('0x1c6d27a76f4f706cccb698acc236c31f886c5421'); // CarMania.cb.id contract
  const [tokenId, setTokenId] = useState('11'); // Token ID 11
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const verifyNFTOwnership = async () => {
    if (!walletAddress || !contractAddress || !tokenId) {
      alert('Please fill in all fields');
      return;
    }
    
    console.log('Verifying NFT ownership for:');
    console.log('Wallet Address:', walletAddress);
    console.log('Contract Address:', contractAddress);
    console.log('Token ID:', tokenId);

    setIsLoading(true);
    try {
      // Check if wallet is connected
      if (!window.ethereum) {
        throw new Error('Please install a compatible wallet');
      }

      // Get the current chain ID
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      console.log('Current chain ID:', chainId);

      // For ERC-1155, we need to check balanceOf instead of ownerOf
      const balanceResult = await window.ethereum.request({
        method: 'eth_call',
        params: [{
          to: contractAddress,
          data: `0x00fdd58e${walletAddress.slice(2).padStart(64, '0')}${tokenId.padStart(64, '0')}` // balanceOf(account, id) function
        }]
      });

      // Parse the balance result
      const balance = parseInt(balanceResult, 16);
      const isOwner = balance > 0;

      setVerificationResult({
        isOwner,
        balance,
        tokenId,
        contractAddress,
        walletAddress
      });

    } catch (error) {
      console.error('Verification failed:', error);
      setVerificationResult({
        error: error.message,
        isOwner: false
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          NFT Ownership Verification
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Verify NFT Ownership</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wallet Address
              </label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={42}
              />
              <p className="text-xs text-gray-500 mt-1">
                Full address: {walletAddress} ({walletAddress.length} characters)
              </p>
            </div>
            
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
                maxLength={42}
              />
              <p className="text-xs text-gray-500 mt-1">
                Full address: {contractAddress} ({contractAddress.length} characters)
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Token ID
              </label>
              <input
                type="text"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                placeholder="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <button
              onClick={verifyNFTOwnership}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Verify Ownership'}
            </button>
          </div>
        </div>

        {verificationResult && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Verification Result</h3>
            
            {verificationResult.error ? (
              <div className="text-red-600">
                <p><strong>Error:</strong> {verificationResult.error}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className={`text-lg font-semibold ${verificationResult.isOwner ? 'text-green-600' : 'text-red-600'}`}>
                  {verificationResult.isOwner ? '✅ You own this NFT!' : '❌ You do not own this NFT'}
                </p>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Wallet Address:</strong> {verificationResult.walletAddress}</p>
                  <p><strong>Contract Address:</strong> {verificationResult.contractAddress}</p>
                  <p><strong>Token ID:</strong> {verificationResult.tokenId}</p>
                  <p><strong>Balance:</strong> {verificationResult.balance} tokens</p>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Troubleshooting Tips
          </h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• <strong>Smart Wallet Issue:</strong> Smart wallets (l3ldrivr.base.eth) cannot be accessed via browser extensions</li>
            <li>• <strong>Alternative:</strong> Check BaseScan directly: <a href="https://basescan.org/address/0x048a22DAB92f2c1e7Deb3847Ca151B888aAb0F1C#tokentxns" target="_blank" className="text-blue-600 underline">View on BaseScan</a></li>
            <li>• Make sure you're connected to Base mainnet</li>
            <li>• Wait a few minutes for blockchain indexing</li>
            <li>• Try refreshing your wallet's collectibles section</li>
            <li>• Check BaseScan for transaction confirmation</li>
            <li>• Verify the contract address and token ID are correct</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
