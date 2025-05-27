'use client';

import { CombinedAuth } from '@cculture/auth';
import { useState } from 'react';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">CarCulture Neynar</h1>
        
        <div className="mb-8">
          <CombinedAuth 
            onSuccess={() => setIsAuthenticated(true)}
            onError={(error) => console.error('Auth error:', error)}
          />
        </div>

        {isAuthenticated && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Welcome to CarCulture!</h2>
            <p className="text-gray-600">
              You are now authenticated with both Privy and Farcaster.
              Neynar integration coming soon...
            </p>
          </div>
        )}
      </div>
    </main>
  );
} 