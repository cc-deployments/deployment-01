"use client";

import { Name, Address, Avatar, Identity } from '@coinbase/onchainkit/identity';
import { useAccount } from 'wagmi';
import { base } from 'wagmi/chains';
import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { useSwipeable } from 'react-swipeable';

export default function SocialIdentityPage() {
  const { address, isConnected } = useAccount();
  const [isInBaseApp, setIsInBaseApp] = useState(false);

  useEffect(() => {
    const checkEnvironment = async () => {
      try {
        // Use recommended Base App detection method
        const context = await sdk.context;
        const baseAppStatus = context?.client?.clientFid === 309857;
        setIsInBaseApp(baseAppStatus);
        console.log('📍 Is in Base App:', baseAppStatus);
        
        if (baseAppStatus) {
          // In Base App environment, try to get wallet address from Base App's EIP-1193 provider
          try {
            // Note: getEthereumProvider() is not supported in Base App according to docs
            // We'll use the context to check if we're in a Base App environment
            console.log('📍 Base App environment detected');
          } catch (providerError) {
            console.log('⚠️ Could not get Base App provider:', providerError);
          }
        }
      } catch (error) {
        console.error('❌ Error checking environment:', error);
      }
    };
    
    checkEnvironment();
  }, []);

  // Add navigation handlers
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      console.log('⬆️ Keyboard navigation: Swipe up');
      window.location.href = '/gallery-hero';
    } else if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S') {
      console.log('⬇️ Keyboard navigation: Swipe down');
      window.location.href = '/manifold-gallery';
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handlers = useSwipeable({
    onSwipedUp: () => {
      console.log('⬆️ Swipe up detected');
      window.location.href = '/gallery-hero';
    },
    onSwipedDown: () => {
      console.log('⬇️ Swipe down detected');
      window.location.href = '/manifold-gallery';
    },
    trackMouse: true,
    delta: 5, // Lower delta for more sensitive detection
    swipeDuration: 300, // Shorter duration for more responsive feel
    preventScrollOnSwipe: true, // Prevent scroll interference
  });

  // Use wagmi address for now since Base App provider access is limited
  const displayAddress = address;
  const isConnectedInMiniApp = isConnected;

  if (!isConnectedInMiniApp || !displayAddress) {
    return (
      <div 
        {...handlers}
        className="min-h-screen bg-gray-50 flex items-center justify-center"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Social Identity</h1>
          
          {/* TEST NAVIGATION BUTTONS - FOR DEBUGGING */}
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 2000,
            display: 'flex',
            gap: '10px',
            flexDirection: 'column'
          }}>
            <button
              onClick={() => {
                console.log('🧪 Test: Navigate to gallery-hero');
                window.location.href = '/gallery-hero';
              }}
              style={{
                background: 'rgba(255, 0, 0, 0.8)',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Test: → gallery-hero
            </button>
            <button
              onClick={() => {
                console.log('🧪 Test: Navigate to manifold-gallery');
                window.location.href = '/manifold-gallery';
              }}
              style={{
                background: 'rgba(0, 255, 0, 0.8)',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Test: → manifold-gallery
            </button>
          </div>
          <p className="text-gray-600 mb-6">
            {isInBaseApp 
              ? "Please connect your wallet in Base App to view your social identity."
              : "Please connect your wallet to view your social identity."
            }
          </p>
          
          {/* Mini App-specific wallet connection */}
          <div className="mb-6">
            {isInBaseApp ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Base App Environment:</strong><br />
                  You&apos;re in a Mini App within Base App.<br />
                  Wallet connection is handled by Base App.
                </p>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Web Environment:</strong><br />
                  You&apos;re viewing this in a web browser.<br />
                  Wallet connection requires browser extension.
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>Debug Info:</strong><br />
              Environment: {isInBaseApp ? 'Base App' : 'Web Browser'}<br />
              Connected: {isConnectedInMiniApp ? 'Yes' : 'No'}<br />
              Address: {displayAddress || 'None'}<br />
              Chain: {base.name}<br />
              Base App Address: {'Not available'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      {...handlers}
      className="min-h-screen bg-gray-50 flex items-center justify-center"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Social Identity</h1>
        
        {/* Following BASE/Coinbase's exact Identity component pattern */}
        <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
          <Avatar />
          <Name address={displayAddress} />
          <Address address={displayAddress} />
        </Identity>

        {/* Debug info */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>Debug Info:</strong><br />
            Environment: {isInBaseApp ? 'Base App' : 'Web Browser'}<br />
            Connected: {isConnectedInMiniApp ? 'Yes' : 'No'}<br />
            Address: {displayAddress}<br />
            Chain: {base.name}<br />
            Network: Base Mainnet<br />
            Base App Address: {'Not available'}
          </p>
        </div>
      </div>
    </div>
  );
} 