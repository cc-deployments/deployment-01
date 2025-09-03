"use client";

import { useEffect, useState } from 'react';

export default function TestDirectSDK() {
  const [sdkStatus, setSdkStatus] = useState<string>('Testing...');
  const [sdkInfo, setSdkInfo] = useState<any>(null);

  useEffect(() => {
    const testSDK = async () => {
      try {
        // Test direct import of Farcaster SDK
        const { sdk } = await import('@farcaster/miniapp-sdk');
        
        setSdkStatus('✅ SDK Import Successful!');
        setSdkInfo({
          version: '0.1.9',
          isInMiniApp: sdk.isInMiniApp(), // Use the correct SDK method
          capabilities: await sdk.getCapabilities(),
          context: sdk.context
        });

        console.log('🎉 Direct Farcaster SDK working in Mini App!');
        console.log('SDK:', sdk);
        
      } catch (error) {
        setSdkStatus(`❌ SDK Import Failed: ${error.message}`);
        console.error('Direct SDK import failed:', error);
      }
    };

    testSDK();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Direct Farcaster SDK Test</h1>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">Test Results:</h2>
        <p className="text-sm">{sdkStatus}</p>
      </div>

      {sdkInfo && (
        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">SDK Information:</h2>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(sdkInfo, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-100 rounded-lg">
        <h3 className="font-semibold mb-2">What This Means:</h3>
        <ul className="text-sm space-y-1">
          <li>• Direct Farcaster SDK import works ✅</li>
          <li>• OnchainKit has the dependency issue ❌</li>
          <li>• We may have a workaround option 🎯</li>
        </ul>
      </div>
    </div>
  );
}

