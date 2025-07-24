"use client";

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export default function SDKTest() {
  const [results, setResults] = useState<string[]>([]);
  const [environmentStatus, setEnvironmentStatus] = useState<string>('Unknown');
  const [simulatedClientFid, setSimulatedClientFid] = useState<string>('');

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // Manual environment simulation
  const simulateEnvironment = (clientFid: string) => {
    setSimulatedClientFid(clientFid);
    const isBaseApp = clientFid === '309857';
    const isCBW = clientFid === '270170';
    
    addResult(`🧪 Simulating environment with clientFid: ${clientFid}`);
    addResult(`📍 Base App (309857): ${isBaseApp ? '✅ YES' : '❌ NO'}`);
    addResult(`📍 CBW (270170): ${isCBW ? '✅ YES' : '❌ NO'}`);
    addResult(`📍 CBW Compatibility: ${isBaseApp || isCBW ? '✅ Compatible' : '❌ Unknown Client'}`);
  };

  useEffect(() => {
    const runTests = async () => {
      addResult('Starting SDK tests...');
      
      try {
        // Test 1: SDK ready
        addResult('Testing sdk.actions.ready()...');
        try {
          await sdk.actions.ready();
          addResult('✅ sdk.actions.ready() called successfully');
        } catch (error) {
          addResult(`❌ sdk.actions.ready() error: ${error}`);
        }

        // Test 2: Get context
        addResult('Testing sdk.context...');
        try {
          const context = await sdk.context;
          addResult(`✅ sdk.context: ${JSON.stringify(context, null, 2)}`);
          
          // Test environment detection using Base App method
          const baseAppStatus = context?.client?.clientFid === 309857;
          setEnvironmentStatus(baseAppStatus ? 'Base App' : 'Web Browser');
          addResult(`✅ Environment detection: ${baseAppStatus ? 'Base App' : 'Web Browser'}`);
        } catch (error) {
          addResult(`❌ sdk.context error: ${error}`);
        }

        // Test 3: Get capabilities
        addResult('Testing sdk.getCapabilities()...');
        try {
          const capabilities = await sdk.getCapabilities();
          addResult(`✅ Capabilities: ${JSON.stringify(capabilities)}`);
        } catch (error) {
          addResult(`❌ sdk.getCapabilities() error: ${error}`);
        }

        addResult('✅ All tests completed!');
        
      } catch (error) {
        addResult(`❌ Test suite error: ${error}`);
      }
    };

    runTests();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Farcaster Mini App SDK Test</h1>
      
      {/* Environment Simulation */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">🧪 Environment Simulation</h2>
        <p className="text-sm text-gray-300 mb-3">
          Test different client environments to verify CBW compatibility:
        </p>
        <div className="flex gap-2 mb-3">
          <button 
            onClick={() => simulateEnvironment('309857')}
            className="px-3 py-1 bg-blue-600 rounded text-sm hover:bg-blue-700"
          >
            Test Base App (309857)
          </button>
          <button 
            onClick={() => simulateEnvironment('270170')}
            className="px-3 py-1 bg-green-600 rounded text-sm hover:bg-green-700"
          >
            Test CBW (270170)
          </button>
          <button 
            onClick={() => simulateEnvironment('999999')}
            className="px-3 py-1 bg-red-600 rounded text-sm hover:bg-red-700"
          >
            Test Unknown Client
          </button>
        </div>
        {simulatedClientFid && (
          <div className="text-sm text-gray-300">
            <p>🎯 Simulated Client FID: {simulatedClientFid}</p>
            <p>📍 Would use: {simulatedClientFid === '309857' ? 'Base App detection' : 'CBW detection'}</p>
          </div>
        )}
      </div>

      {/* Environment Status */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Environment Status:</h2>
        <p>Environment: {environmentStatus}</p>
        <p>CBW Compatibility: ✅ Using direct context checking</p>
      </div>

      {/* Test Results */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Test Results:</h2>
        <div className="bg-gray-900 p-4 rounded-lg max-h-96 overflow-y-auto">
          {results.map((result, index) => (
            <div key={index} className="text-sm font-mono mb-1">
              {result}
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-sm text-gray-400">
        <h3 className="font-semibold mb-2">Testing Instructions:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>✅ <strong>Localhost</strong>: Tests web browser environment</li>
          <li>🧪 <strong>Simulation</strong>: Test different client FIDs above</li>
          <li>🔗 <strong>Farcaster Dev Tools</strong>: https://miniapps.farcaster.xyz/tools/embed</li>
          <li>📱 <strong>Warpcast</strong>: Test in actual Warpcast app</li>
        </ul>
      </div>
    </div>
  );
} 