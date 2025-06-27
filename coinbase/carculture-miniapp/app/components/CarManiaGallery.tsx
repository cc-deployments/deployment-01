'use client';

import React from 'react';
import { useState } from 'react';
import Image from "next/image";
import { useAccount } from 'wagmi';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';

export default function CarManiaGallery() {
  const [imageError, setImageError] = useState(false);
  const { address } = useAccount();

  return (
    <div className="min-h-screen bg-black">
      {/* Header Image */}
      <div className="w-full mb-12 relative h-[500px]">
        {!imageError ? (
          <div className="relative w-full h-full">
            <Image
              src="/carmania-header.jpg"
              alt="CARMANIA"
              fill
              priority
              quality={75}
              sizes="100vw"
              onError={(event) => {
                // Log the full error details
                console.error('Image failed to load:', {
                  src: event.currentTarget.src,
                  error: event
                });
                setImageError(true);
              }}
              style={{
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <p className="text-gray-400">Unable to load header image</p>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          <ConnectWallet />
          {address && (
            <p className="text-white">Connected with: {address}</p>
          )}
          <div className="text-white text-sm mt-4">
            <p>Debug Info:</p>
            <p>Connected Address: {address || 'Not connected'}</p>
            <p>Image Status: {imageError ? 'Error loading' : 'Loaded'}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 