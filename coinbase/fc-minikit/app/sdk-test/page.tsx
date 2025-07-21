"use client";

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export default function SDKTest() {
  const [results, setResults] = useState<string[]>([]);
  const [isInMiniApp, setIsInMiniApp] = useState(false);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
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
          setIsInMiniApp(baseAppStatus);
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
    <div style={{ padding: '20px', fontFamily: 'monospace', fontSize: '14px' }}>
      <h1>Farcaster Mini App SDK Test</h1>
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '5px',
        maxHeight: '500px',
        overflowY: 'auto'
      }}>
        {results.map((result, index) => (
          <div key={index} style={{ marginBottom: '5px' }}>
            {result}
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Environment Status:</h3>
        <p>Is in Base App: {isInMiniApp ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
} 