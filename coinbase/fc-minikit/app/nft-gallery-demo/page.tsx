'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

// Mock NFT data for testing - matches grid view with correct Manifold URLs
const mockNFTs = [
  {
    id: '1',
    name: 'CarMania Garage Testing 1',
    description: 'The first in our exclusive CarMania Garage Testing series.',
    image: '/preview-images/car_culture__carmania_garage_testing_1_preview.jpg',
    price: '1.00',
    currency: 'USD',
    tokenId: '1',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    mintUrl: 'https://manifold.xyz/@carculture/id/4169111792'
  },
  {
    id: '2',
    name: 'CarMania Garage Testing 2',
    description: 'The second in our exclusive CarMania Garage Testing series.',
    image: '/preview-images/car_culture__carmania_garage_testing_2_preview.jpg',
    price: '1.00',
    currency: 'USD',
    tokenId: '2',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    mintUrl: 'https://manifold.xyz/@carculture/id/4169128176'
  },
  {
    id: '3',
    name: 'CarMania Garage Testing 3',
    description: 'The third in our exclusive CarMania Garage Testing series.',
    image: '/preview-images/car_culture__carmania_garage_testing_3_preview.jpg',
    price: '1.00',
    currency: 'USD',
    tokenId: '3',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    mintUrl: 'https://manifold.xyz/@carculture/id/4169124080'
  },
  {
    id: '4',
    name: 'CarMania Garage Testing 4',
    description: 'The fourth in our exclusive CarMania Garage Testing series.',
    image: '/preview-images/car_culture__carmania_garage_testing_4_preview.jpg',
    price: '1.00',
    currency: 'USD',
    tokenId: '4',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    mintUrl: 'https://manifold.xyz/@carculture/id/4169085168'
  },
  {
    id: '5',
    name: 'CarMania Garage Testing 5',
    description: 'The fifth in our exclusive CarMania Garage Testing series.',
    image: '/preview-images/car_culture__carmania_garage_testing_5_preview.jpg',
    price: '1.00',
    currency: 'USD',
    tokenId: '5',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    mintUrl: 'https://manifold.xyz/@carculture/id/4169081072'
  },
  {
    id: '6',
    name: 'CarMania Garage Testing 6',
    description: 'The sixth in our exclusive CarMania Garage Testing series.',
    image: '/preview-images/car_culture__carmania_garage_testing_6_preview.jpg',
    price: '1.00',
    currency: 'USD',
    tokenId: '6',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    mintUrl: 'https://manifold.xyz/@carculture/id/4169076976'
  },
  {
    id: '7',
    name: 'CarMania Garage Testing 7',
    description: 'The seventh in our exclusive CarMania Garage Testing series.',
    image: '/preview-images/car_culture__carmania_garage_testing_7_preview.jpg',
    price: '1.00',
    currency: 'USD',
    tokenId: '7',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    mintUrl: 'https://manifold.xyz/@carculture/id/4169074928'
  },
  {
    id: '8',
    name: 'CarMania Garage Testing 8',
    description: 'The eighth in our exclusive CarMania Garage Testing series.',
    image: '/preview-images/car_culture__carmania_garage_testing_8_preview.jpg',
    price: '1.00',
    currency: 'USD',
    tokenId: '8',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    mintUrl: 'https://manifold.xyz/@carculture/id/4169103600'
  },
  {
    id: '9',
    name: 'CarMania Garage Testing 9',
    description: 'The ninth and final in our exclusive CarMania Garage Testing series.',
    image: '/preview-images/car_culture__carmania_garage_testing_9_preview.jpg',
    price: '1.00',
    currency: 'USD',
    tokenId: '9',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    mintUrl: 'https://manifold.xyz/@carculture/id/4169097456'
  },
  {
    id: 'summertime',
    name: 'Summertime Blues',
    description: 'A legendary automotive NFT from the CarMania collection, featuring classic summer vibes and car culture nostalgia.',
    image: 'https://ur4re6uytbzkxhvamuzhxaugfrpsfywiukkeabahnvddaumlcama.arweave.net/pHkSepiYcqueoGUye4KGLF8i4siilEAEB21GMFGLEBg',
    price: '5.00',
    currency: 'USD',
    tokenId: '76',
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    mintUrl: 'https://manifold.xyz/@carculture/id/4144040176'
  }
];

interface NFTCardProps {
  nft: typeof mockNFTs[0];
  onPurchase: (nft: typeof mockNFTs[0]) => void;
}

function NFTCard({ nft, onPurchase }: NFTCardProps) {
  const handlePurchase = () => {
    onPurchase(nft);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto">
      <div className="relative">
        <Image
          src={nft.image}
          alt={nft.name}
          width={400}
          height={400}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          {nft.price} {nft.currency}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{nft.name}</h3>
        <p className="text-gray-600 mb-4">{nft.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Token ID: {nft.tokenId}</span>
          <button
            onClick={handlePurchase}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

function NFTGalleryDemoContent() {
  const [currentNFTIndex, setCurrentNFTIndex] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'crypto'>('credit');
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentNFT = mockNFTs[currentNFTIndex];

  // Handle URL parameters to set the correct NFT
  useEffect(() => {
    const nftId = searchParams?.get('nft');
    if (nftId) {
      const nftIndex = mockNFTs.findIndex(nft => nft.id === nftId);
      if (nftIndex !== -1) {
        setCurrentNFTIndex(nftIndex);
      }
    }
  }, [searchParams]);



  const nextNFT = () => {
    const newIndex = (currentNFTIndex + 1) % mockNFTs.length;
    setCurrentNFTIndex(newIndex);
    router.push(`/nft-gallery-demo?nft=${mockNFTs[newIndex].id}`, { scroll: false });
  };

  const prevNFT = () => {
    const newIndex = currentNFTIndex === 0 ? mockNFTs.length - 1 : currentNFTIndex - 1;
    setCurrentNFTIndex(newIndex);
    router.push(`/nft-gallery-demo?nft=${mockNFTs[newIndex].id}`, { scroll: false });
  };

  const goToNFT = (index: number) => {
    setCurrentNFTIndex(index);
    router.push(`/nft-gallery-demo?nft=${mockNFTs[index].id}`, { scroll: false });
  };

  const backToGallery = () => {
    router.push('/nft-gallery-grid');
  };

  const handlePurchase = async (nft: typeof mockNFTs[0]) => {
    try {
      // For now, redirect directly to the mint URL
      window.location.href = nft.mintUrl;
    } catch (error) {
      console.error('Purchase failed:', error);
      // Fallback to direct redirect
      window.location.href = nft.mintUrl;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header with Back to Gallery button */}
      <div className="relative">
        <div style={{
          position: 'absolute',
          top: '-3rem',
          left: '-50%',
          transform: 'translateX(-50%)',
        }}>
          <button
            onClick={backToGallery}
            style={{
              backgroundColor: '#2563eb',
              color: '#fff',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#1d4ed8';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Gallery
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">CarMania NFT Gallery</h1>
          <p className="text-lg text-gray-600">Discover and collect unique automotive NFTs</p>
        </div>

        {/* NFT Display */}
        <div className="flex justify-center mb-8">
          <NFTCard nft={currentNFT} onPurchase={handlePurchase} />
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          <button
            onClick={prevNFT}
            style={{
              backgroundColor: 'rgba(37, 99, 235, 0.9)',
              color: '#fff',
              padding: '1rem',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(29, 78, 216, 0.9)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.9)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ←
          </button>

          {/* Pagination Dots */}
          <div className="flex space-x-2">
            {mockNFTs.map((_, index) => (
              <button
                key={index}
                onClick={() => goToNFT(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: index === currentNFTIndex ? '#2563eb' : 'rgba(156, 163, 175, 0.5)',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  if (index !== currentNFTIndex) {
                    e.currentTarget.style.backgroundColor = 'rgba(156, 163, 175, 0.8)';
                    e.currentTarget.style.transform = 'scale(1.2)';
                  }
                }}
                onMouseOut={(e) => {
                  if (index !== currentNFTIndex) {
                    e.currentTarget.style.backgroundColor = 'rgba(156, 163, 175, 0.5)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              />
            ))}
          </div>

          <button
            onClick={nextNFT}
            style={{
              backgroundColor: 'rgba(37, 99, 235, 0.9)',
              color: '#fff',
              padding: '1rem',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(29, 78, 216, 0.9)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.9)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            →
          </button>
        </div>

        {/* Payment Method Selection */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setPaymentMethod('credit')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                paymentMethod === 'credit'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              💳 Credit Card
            </button>
            <button
              onClick={() => setPaymentMethod('crypto')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                paymentMethod === 'crypto'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ₿ Crypto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NFTGalleryDemo() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NFTGalleryDemoContent />
    </Suspense>
  );
}
