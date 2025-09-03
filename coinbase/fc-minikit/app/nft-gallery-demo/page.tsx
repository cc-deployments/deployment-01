'use client';

import React, { useState, useEffect } from 'react';

// Real NFT data from your CarCulture collection
const mockNFTs = [
  {
    id: '1',
    name: 'CarMania Garage Test1',
    description: 'Testing 123 - A test NFT from the CarMania Garage collection showcasing automotive culture and digital art.',
    image: 'https://hlwk6ht7i3v7hnrmrouv4jhwjss4ztuibm5ey7qii6ou7eq2ye5a.arweave.net/OuyvHn9G6_O2LIupXiT2TKXMzogLOkx-CEedT5IawTo',
    price: '0.025',
    currency: 'ETH',
    year: '2025',
    brand: 'CarCulture',
    rarity: 'legendary' as const,
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '1',
    platform: 'cdp' as const,
    platformName: 'Coinbase Developer Platform',
    mintUrl: 'https://hlwk6ht7i3v7hnrmrouv4jhwjss4ztuibm5ey7qii6ou7eq2ye5a.arweave.net/OuyvHn9G6_O2LIupXiT2TKXMzogLOkx-CEedT5IawTo'
  },
  {
    id: '2', 
    name: 'Light Bulb Moment',
    description: 'When I was four-years-old my father put me on his lap and let me drive our Volkswagen Beetle. This was my Light Bulb Moment: I morphed into what I am today the DRIVR.',
    image: '/andy-warhol-bmw-m1-optimized.jpg',
    price: '0.025',
    currency: 'ETH',
    year: '1964',
    brand: 'Volkswagen',
    rarity: 'rare' as const,
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '2',
    platform: 'zora' as const,
    platformName: 'Zora Network',
    mintUrl: 'https://app.manifold.xyz/c/light-bulb-moment'
  },
  {
    id: '3',
    name: 'Barn Fresh',
    description: 'Jaguar fresh from the barn and ready for the highest auto auction bidder.',
    image: '/andy-warhol-bmw-m1-optimized.jpg', 
    price: '0.05',
    currency: 'ETH',
    year: '1953',
    brand: 'Jaguar',
    rarity: 'common' as const,
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '3',
    platform: 'cdp' as const,
    platformName: 'Coinbase Developer Platform',
    mintUrl: 'https://manifold.xyz/@carculture/id/4195533040'
  }
];

const rarityColors = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500', 
  legendary: 'bg-purple-500'
};

const platformColors = {
  cdp: '#2563eb', // Blue for Coinbase Developer Platform
  zora: '#ff6b35' // Orange for Zora Network
};

const platformIcons = {
  cdp: '🟦',
  zora: '🟠'
};

interface NFTCardProps {
  nft: typeof mockNFTs[0];
  onPurchase: (nft: typeof mockNFTs[0]) => void;
}

function NFTCard({ nft, onPurchase }: NFTCardProps) {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <img 
          src={nft.image} 
          alt={nft.name}
          className="w-full h-64 object-cover"
        />
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm font-semibold ${rarityColors[nft.rarity]}`}>
          {nft.rarity.charAt(0).toUpperCase() + nft.rarity.slice(1)}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-bold">{nft.name}</h2>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-blue-600">{nft.price} {nft.currency}</span>
            <span className="text-sm text-gray-500">on Base</span>
          </div>
        </div>

        <div className="flex gap-4 mb-3 text-sm text-gray-600">
          <span>{nft.brand}</span>
          <span>•</span>
          <span>{nft.year}</span>
        </div>
        
        <p className="text-gray-600 mb-6">{nft.description}</p>
        
        <div className="flex gap-3">
          <button
            onClick={() => onPurchase(nft)}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Buy with Credit Card
          </button>
          <button
            onClick={() => onPurchase(nft)}
            className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Buy with Crypto
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NFTGalleryDemo() {
  const [currentNFTIndex, setCurrentNFTIndex] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'crypto'>('credit');
  const currentNFT = mockNFTs[currentNFTIndex];

  const handlePurchase = async (nft: typeof mockNFTs[0]) => {
    // For now, redirect directly to your actual Manifold mint URLs
    // This provides immediate functionality while we build out the CDP/Zora integration
    if (nft.mintUrl) {
      console.log('🔓 Redirecting to mint URL:', nft.mintUrl);
      window.open(nft.mintUrl, '_blank');
    } else {
      // Fallback to your main Manifold profile
      console.log('🔓 Redirecting to CarCulture profile');
      window.open('https://manifold.xyz/@carculture', '_blank');
    }
  };

  const nextNFT = () => {
    setCurrentNFTIndex((prev) => (prev + 1) % mockNFTs.length);
  };

  const prevNFT = () => {
    setCurrentNFTIndex((prev) => (prev - 1 + mockNFTs.length) % mockNFTs.length);
  };

  return (
    <div 
      style={{
        position: 'relative',
        backgroundColor: '#000',
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        touchAction: 'manipulation',
      }}
    >
      {/* Main Content Container - 1260x2400 aspect ratio */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          maxWidth: '1260px',
          maxHeight: '2400px',
          backgroundColor: '#000',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          textAlign: 'center',
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: '0.5rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
          }}>CarMania NFT Gallery</h1>
          <p style={{
            color: '#93c5fd',
            fontSize: '1rem'
          }}>Exclusive Car NFT Collection - Demo Version</p>
        </div>

        {/* Main NFT Display - Two Column Layout */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          right: '5%',
          bottom: '20%',
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
        }}>
          
          {/* Left Panel - NFT Details (40% width) */}
          <div style={{
            width: '40%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '1.5rem',
            padding: '1rem',
          }}>
            {/* Creator Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '2rem',
                height: '2rem',
                backgroundColor: '#2563eb',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '0.875rem'
              }}>CC</div>
              <div>
                <div style={{ color: '#fff', fontWeight: '600' }}>CarCulture</div>
                <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>0x48c1...e699</div>
              </div>
            </div>

            {/* Title */}
            <div>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: '0.5rem',
                lineHeight: '1.1'
              }}>{currentNFT.name}</h2>
              <p style={{ color: '#93c5fd', fontSize: '1.125rem' }}>CarMania: Classic Series</p>
              <p style={{ color: '#d1d5db', marginTop: '0.5rem' }}>Collect the Classics. Cruise the Future.</p>
            </div>

            {/* Description */}
            <div style={{
              backgroundColor: 'rgba(31, 41, 55, 0.5)',
              borderRadius: '0.5rem',
              padding: '1rem',
            }}>
              <p style={{
                color: '#d1d5db',
                lineHeight: '1.6',
                fontSize: '0.9rem'
              }}>
                {currentNFT.description} This limited edition {currentNFT.brand} is part of the CarCulture: CarMania Garage collection. Each NFT provides exclusive access to our AI chat system where you can ask questions about your specific car.
              </p>
            </div>

            {/* Price and Minting */}
            <div style={{
              backgroundColor: 'rgba(31, 41, 55, 0.5)',
              borderRadius: '0.5rem',
              padding: '1.5rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#fff'
                }}>{currentNFT.price} ETH</span>
                <span style={{
                  backgroundColor: platformColors[currentNFT.platform],
                  color: '#fff',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem'
                }}>{currentNFT.platform === 'cdp' ? 'Base' : 'Zora'}</span>
                <span style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem'
                }}>{platformIcons[currentNFT.platform]} {currentNFT.platformName}</span>
              </div>
              <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>+ MANIFOLD FEE</div>
              
              <button
                onClick={() => handlePurchase(currentNFT)}
                style={{
                  width: '100%',
                  backgroundColor: '#2563eb',
                  color: '#fff',
                  fontWeight: 'bold',
                  padding: '1rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  marginBottom: '1rem',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              >
                {paymentMethod === 'credit' ? '💳 MINT WITH CREDIT CARD' : '₿ MINT WITH CRYPTO'}
              </button>

              {/* Minting Progress */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: '#9ca3af' }}>0 minted</span>
                  <span style={{ color: '#9ca3af' }}>10 remaining</span>
                </div>
                <div style={{
                  width: '100%',
                  backgroundColor: '#374151',
                  borderRadius: '9999px',
                  height: '0.5rem'
                }}>
                  <div style={{
                    backgroundColor: '#2563eb',
                    height: '0.5rem',
                    borderRadius: '9999px',
                    width: '0%'
                  }}></div>
                </div>
                <div style={{
                  textAlign: 'center',
                  color: '#9ca3af',
                  fontSize: '0.875rem'
                }}>
                  Ends in 28D : 23H : 47M : 58S
                </div>
              </div>
            </div>

            {/* View Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#60a5fa',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}>
                <span>VIEW DETAILS</span>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#60a5fa',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}>
                <span>VIEW ON MANIFOLD GALLERY</span>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Panel - Large NFT Image (60% width) */}
          <div style={{
            width: '60%',
            height: '100%',
            position: 'relative',
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #1e3a8a, #111827)',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
            }}>
              <img 
                src={currentNFT.image} 
                alt={currentNFT.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)'
              }}></div>
              
              {/* Rarity Badge */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                color: '#fff',
                fontSize: '0.875rem',
                fontWeight: '600',
                backgroundColor: currentNFT.rarity === 'legendary' ? '#7c3aed' : 
                               currentNFT.rarity === 'rare' ? '#2563eb' : '#6b7280'
              }}>
                {currentNFT.rarity.charAt(0).toUpperCase() + currentNFT.rarity.slice(1)}
              </div>

              {/* Car Culture Branding */}
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                color: '#fff',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
              }}>
                Car Culture
              </div>

              {/* Fullscreen Button */}
              <button style={{
                position: 'absolute',
                bottom: '1.5rem',
                right: '1.5rem',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: '#fff',
                padding: '0.75rem',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation - Bottom Center */}
        <div style={{
          position: 'absolute',
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          zIndex: 10
        }}>
          <button
            onClick={prevNFT}
            style={{
              backgroundColor: '#374151',
              color: '#fff',
              padding: '0.75rem',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#374151'}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {mockNFTs.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentNFTIndex(index)}
                style={{
                  width: '0.75rem',
                  height: '0.75rem',
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: index === currentNFTIndex ? '#2563eb' : '#6b7280',
                  transition: 'background-color 0.2s'
                }}
              />
            ))}
          </div>

          <button
            onClick={nextNFT}
            style={{
              backgroundColor: '#374151',
              color: '#fff',
              padding: '0.75rem',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#374151'}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Payment Method Toggle - Bottom */}
        <div style={{
          position: 'absolute',
          bottom: '3%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          backgroundColor: '#374151',
          borderRadius: '0.5rem',
          padding: '0.25rem',
          zIndex: 10
        }}>
          <button
            onClick={() => setPaymentMethod('credit')}
            style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              transition: 'all 0.2s',
              backgroundColor: paymentMethod === 'credit' ? '#2563eb' : 'transparent',
              color: paymentMethod === 'credit' ? '#fff' : '#9ca3af'
            }}
            onMouseOver={(e) => {
              if (paymentMethod !== 'credit') {
                e.currentTarget.style.color = '#fff';
              }
            }}
            onMouseOut={(e) => {
              if (paymentMethod !== 'credit') {
                e.currentTarget.style.color = '#9ca3af';
              }
            }}
          >
            💳 Credit Card
          </button>
          <button
            onClick={() => setPaymentMethod('crypto')}
            style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              transition: 'all 0.2s',
              backgroundColor: paymentMethod === 'crypto' ? '#2563eb' : 'transparent',
              color: paymentMethod === 'crypto' ? '#fff' : '#9ca3af'
            }}
            onMouseOver={(e) => {
              if (paymentMethod !== 'crypto') {
                e.currentTarget.style.color = '#fff';
              }
            }}
            onMouseOut={(e) => {
              if (paymentMethod !== 'crypto') {
                e.currentTarget.style.color = '#9ca3af';
              }
            }}
          >
            ₿ Crypto
          </button>
        </div>
      </div>
    </div>
  );
}
