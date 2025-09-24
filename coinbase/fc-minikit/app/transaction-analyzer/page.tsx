'use client';

import React, { useState } from 'react';

export default function TransactionAnalyzer() {
  const [txHash, setTxHash] = useState('0x71565627ded8696fe443d61d0b188bc7c0ab3a5a15a1ed31efbcdea3c3ef6651');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeTransaction = async () => {
    if (!txHash) return;
    
    setIsLoading(true);
    try {
      // Check if wallet is connected
      if (!window.ethereum) {
        throw new Error('Please install a compatible wallet');
      }

      // Get transaction details
      const txDetails = await window.ethereum.request({
        method: 'eth_getTransactionByHash',
        params: [txHash]
      });

      if (!txDetails) {
        throw new Error('Transaction not found');
      }

      // Get transaction receipt
      const txReceipt = await window.ethereum.request({
        method: 'eth_getTransactionReceipt',
        params: [txHash]
      });

      // Analyze the transaction
      const result = {
        hash: txHash,
        from: txDetails.from,
        to: txDetails.to,
        value: txDetails.value,
        gasUsed: txReceipt?.gasUsed,
        status: txReceipt?.status,
        blockNumber: txReceipt?.blockNumber,
        logs: txReceipt?.logs || [],
        input: txDetails.input
      };

      // Look for Transfer events in logs
      const transferEvents = result.logs.filter(log => {
        // ERC-721 Transfer event signature: 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
        return log.topics[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
      });

      // Extract token information from Transfer events
      const tokenTransfers = transferEvents.map(log => {
        const from = '0x' + log.topics[1].slice(-40);
        const to = '0x' + log.topics[2].slice(-40);
        const tokenId = parseInt(log.topics[3], 16).toString();
        const contractAddress = log.address;
        
        return {
          contractAddress,
          tokenId,
          from,
          to,
          isNFT: true
        };
      });

      setAnalysis({
        ...result,
        tokenTransfers,
        hasNFTTransfers: tokenTransfers.length > 0
      });

    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysis({
        error: error instanceof Error ? error.message : 'Failed to analyze transaction'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Transaction Analyzer
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Analyze Transaction</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Hash
              </label>
              <input
                type="text"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                placeholder="0x..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <button
              onClick={analyzeTransaction}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Transaction'}
            </button>
          </div>
        </div>

        {analysis && (
          <div className="space-y-6">
            {/* Transaction Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Transaction Details</h3>
              
              {analysis.error ? (
                <div className="text-red-600">
                  <p><strong>Error:</strong> {analysis.error}</p>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <p><strong>Hash:</strong> {analysis.hash}</p>
                  <p><strong>From:</strong> {analysis.from}</p>
                  <p><strong>To:</strong> {analysis.to}</p>
                  <p><strong>Value:</strong> {parseInt(analysis.value, 16) / 1e18} ETH</p>
                  <p><strong>Status:</strong> {analysis.status === '0x1' ? '✅ Success' : '❌ Failed'}</p>
                  <p><strong>Block Number:</strong> {parseInt(analysis.blockNumber, 16)}</p>
                  <p><strong>Gas Used:</strong> {parseInt(analysis.gasUsed, 16)}</p>
                </div>
              )}
            </div>

            {/* NFT Transfers */}
            {analysis.hasNFTTransfers && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">NFT Transfers</h3>
                
                <div className="space-y-4">
                  {analysis.tokenTransfers.map((transfer: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <h4 className="font-semibold text-green-600 mb-2">
                        NFT Transfer #{index + 1}
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Contract:</strong> {transfer.contractAddress}</p>
                        <p><strong>Token ID:</strong> {transfer.tokenId}</p>
                        <p><strong>From:</strong> {transfer.from}</p>
                        <p><strong>To:</strong> {transfer.to}</p>
                      </div>
                      
                      <div className="mt-4">
                        <a
                          href={`https://basescan.org/token/${transfer.contractAddress}?a=${transfer.tokenId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          View on BaseScan →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Raw Logs */}
            {analysis.logs && analysis.logs.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Transaction Logs</h3>
                <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <pre className="text-xs">
                    {JSON.stringify(analysis.logs, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            How to Use
          </h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• Enter the transaction hash from BaseScan</li>
            <li>• Click "Analyze Transaction" to get detailed information</li>
            <li>• Look for "NFT Transfers" section to see which tokens were transferred</li>
            <li>• Use the BaseScan links to view tokens on the blockchain</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


