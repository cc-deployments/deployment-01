'use client';

import { useAccount } from 'wagmi';
import WalletAuth from '../../shared/identity/WalletAuth';

interface ProtectedContentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ProtectedContent({ children, fallback }: ProtectedContentProps) {
  const { isConnected } = useAccount();

  // If user is not connected, show wallet authentication
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Connect Your Wallet</h2>
          <p className="text-gray-300 max-w-md">
            Connect your wallet to access exclusive content and features. 
            This ensures secure, cryptographic authentication with persistent sessions.
          </p>
        </div>
        <WalletAuth />
        {fallback && (
          <div className="mt-8">
            {fallback}
          </div>
        )}
      </div>
    );
  }

  // User is authenticated, show protected content
  return <>{children}</>;
} 