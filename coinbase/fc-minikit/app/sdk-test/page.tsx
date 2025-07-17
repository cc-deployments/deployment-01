"use client";
import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export default function SDKTest() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    const runSDKTests = async () => {
      try {
        addResult('Starting SDK tests...');
        
        // Test 1: Check if SDK is available
        addResult('Testing SDK availability...');
        if (sdk) {
          addResult('✅ SDK is available');
        } else {
          addResult('❌ SDK is not available');
          return;
        }

        // Test 2: Check if in Mini App environment
        addResult('Testing isInMiniApp()...');
        try {
          const isInMiniApp = await sdk.isInMiniApp();
          addResult(`✅ isInMiniApp(): ${isInMiniApp}`);
        } catch (error) {
          addResult(`❌ isInMiniApp() error: ${error}`);
        }

        // Test 3: Check SDK context
        addResult('Testing SDK context...');
        try {
          const context = await sdk.context;
          addResult(`✅ SDK context: ${JSON.stringify(context, null, 2)}`);
        } catch (error) {
          addResult(`❌ SDK context error: ${error}`);
        }

        // Test 4: Check capabilities
        addResult('Testing getCapabilities()...');
        try {
          const capabilities = await sdk.getCapabilities();
          addResult(`✅ Capabilities: ${JSON.stringify(capabilities, null, 2)}`);
        } catch (error) {
          addResult(`❌ getCapabilities() error: ${error}`);
        }

        // Test 5: Try ready() call
        addResult('Testing sdk.actions.ready()...');
        try {
          await sdk.actions.ready();
          addResult('✅ sdk.actions.ready() called successfully');
        } catch (error) {
          addResult(`❌ sdk.actions.ready() error: ${error}`);
        }

        // Test 6: Check wallet provider
        addResult('Testing wallet provider...');
        try {
          const ethProvider = await sdk.wallet.getEthereumProvider();
          addResult(`✅ Ethereum provider: ${ethProvider ? 'Available' : 'Not available'}`);
        } catch (error) {
          addResult(`❌ Wallet provider error: ${error}`);
        }

        addResult('🎉 All SDK tests completed!');

      } catch (error) {
        addResult(`❌ General error: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    runSDKTests();
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'monospace', 
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1>Farcaster Mini App SDK Test</h1>
      
      {isLoading && (
        <div style={{ color: '#666', marginBottom: '20px' }}>
          Running SDK tests...
        </div>
      )}

      <div style={{ 
        backgroundColor: '#fff', 
        padding: '20px', 
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <h3>Test Results:</h3>
        {testResults.map((result, index) => (
          <div key={index} style={{ 
            marginBottom: '8px', 
            padding: '4px 0',
            borderBottom: '1px solid #eee'
          }}>
            {result}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Run Tests Again
        </button>
      </div>
    </div>
  );
} 