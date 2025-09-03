'use client';

import React, { useState, useEffect } from 'react';

// Zora $DRIVE token data
const drivePosts = [
  {
    id: '1',
    title: 'Car Culture: The $DRIVE Token',
    description: 'The $DRIVE token represents the future of car culture and automotive community. Join the movement that\'s driving innovation in the automotive NFT space.',
    image: '/andy-warhol-bmw-m1-optimized.jpg',
    price: '0.001',
    currency: 'ETH',
    year: '2025',
    brand: 'CarCulture',
    rarity: 'legendary' as const,
    contractAddress: '0xefd1c2167a386e598e8cd5963b564e0ba60f1396',
    tokenId: '1',
    platform: 'zora' as const,
    platformName: 'Zora Network',
    mintUrl: 'https://zora.co/collect/zora:0xefd1c2167a386e598e8cd5963b564e0ba60f1396/1',
    content: 'The $DRIVE token is more than just a digital asset - it\'s a gateway to the CarCulture community. Holders get exclusive access to automotive content, early NFT drops, and special events.'
  },
  {
    id: '2', 
    title: 'DRIVR Agent: AI-Powered Car Assistant',
    description: 'Meet DRIVR, your AI-powered automotive assistant. Ask questions about cars, get maintenance tips, and discover automotive history.',
    image: '/andy-warhol-bmw-m1-optimized.jpg',
    price: '0.002',
    currency: 'ETH',
    year: '2025',
    brand: 'CarCulture',
    rarity: 'rare' as const,
    contractAddress: '0xefd1c2167a386e598e8cd5963b564e0ba60f1396',
    tokenId: '2',
    platform: 'zora' as const,
    platformName: 'Zora Network',
    mintUrl: 'https://zora.co/collect/zora:0xefd1c2167a386e598e8cd5963b564e0ba60f1396/2',
    content: 'DRIVR is the world\'s first AI agent dedicated to automotive culture. Built on advanced language models, DRIVR can answer questions about any car, provide maintenance advice, and share automotive history.'
  },
  {
    id: '3',
    title: 'CarMania Garage: The Collection',
    description: 'Explore the CarMania Garage - a curated collection of automotive NFTs featuring classic cars, modern supercars, and automotive art.',
    image: '/andy-warhol-bmw-m1-optimized.jpg', 
    price: '0.003',
    currency: 'ETH',
    year: '2025',
    brand: 'CarCulture',
    rarity: 'common' as const,
    contractAddress: '0xefd1c2167a386e598e8cd5963b564e0ba60f1396',
    tokenId: '3',
    platform: 'zora' as const,
    platformName: 'Zora Network',
    mintUrl: 'https://zora.co/collect/zora:0xefd1c2167a386e598e8cd5963b564e0ba60f1396/3',
    content: 'The CarMania Garage is where automotive passion meets digital innovation. Each NFT in this collection tells a story, celebrates automotive history, and connects car enthusiasts worldwide.'
  }
];

const rarityColors = {
  common: '#6b7280',
  rare: '#2563eb', 
  legendary: '#7c3aed'
};

const platformColors = {
  zora: '#ff6b35' // Orange for Zora Network
};

const platformIcons = {
  zora: '🟠'
};

export default function ZoraDriveDemo() {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'crypto'>('credit');
  const [dailyPost, setDailyPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use daily post if available, otherwise fall back to mock data
  const currentPost = dailyPost || drivePosts[currentPostIndex];

  // Fetch today's $DRIVE post
  useEffect(() => {
    const fetchDailyPost = async () => {
      try {
        const response = await fetch('/api/daily-drive-post');
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setDailyPost(result.data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch daily post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDailyPost();
  }, []);

  const handlePurchase = async (post: typeof drivePosts[0]) => {
    // Redirect to Zora mint page
    if (post.mintUrl) {
      console.log('🔓 Redirecting to Zora mint URL:', post.mintUrl);
      window.open(post.mintUrl, '_blank');
    } else {
      // Fallback to Zora collection
      console.log('🔓 Redirecting to Zora collection');
      window.open(`https://zora.co/collect/zora:${post.contractAddress}`, '_blank');
    }
  };

  const nextPost = () => {
    setCurrentPostIndex((prev) => (prev + 1) % drivePosts.length);
  };

  const prevPost = () => {
    setCurrentPostIndex((prev) => (prev - 1 + drivePosts.length) % drivePosts.length);
  };

  if (isLoading) {
    return (
      <div style={{
        position: 'relative',
        backgroundColor: '#000',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🟠</div>
          <div>Loading today's $DRIVE post...</div>
        </div>
      </div>
    );
  }

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
          top: '3%',
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
          }}>Zora $DRIVE Token</h1>
          <p style={{
            color: '#ff6b35',
            fontSize: '1rem'
          }}>CarCulture Community Token - Zora Network</p>
        </div>

        {/* Main Content Display - Single Column Layout for Posts */}
        <div style={{
          position: 'absolute',
          top: '12%',
          left: '5%',
          right: '5%',
          bottom: '20%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          padding: '1rem',
        }}>
          
          {/* Creator Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '2rem',
              height: '2rem',
              backgroundColor: '#ff6b35',
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
              <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>0xefd1...1396</div>
            </div>
          </div>

          {/* Post Title */}
          <div>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: '0.5rem',
              lineHeight: '1.1'
            }}>{currentPost.title}</h2>
            <p style={{ color: '#ff6b35', fontSize: '1.125rem' }}>$DRIVE Token Series</p>
            <p style={{ color: '#d1d5db', marginTop: '0.5rem' }}>Drive the Future. Own the Culture.</p>
          </div>

          {/* Post Image */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '300px',
            background: 'linear-gradient(135deg, #ff6b35, #111827)',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
          }}>
            <img 
              src={currentPost.image} 
              alt={currentPost.title}
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
              top: '1rem',
              right: '1rem',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              color: '#fff',
              fontSize: '0.875rem',
              fontWeight: '600',
              backgroundColor: rarityColors[currentPost.rarity]
            }}>
              {currentPost.rarity.charAt(0).toUpperCase() + currentPost.rarity.slice(1)}
            </div>

            {/* Zora Badge */}
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1rem',
              color: '#fff',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
            }}>
              🟠 Zora $DRIVE
            </div>
          </div>

          {/* Post Content */}
          <div style={{
            backgroundColor: 'rgba(31, 41, 55, 0.5)',
            borderRadius: '0.5rem',
            padding: '1.5rem',
          }}>
            <h3 style={{
              color: '#fff',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>About This Post</h3>
            <p style={{
              color: '#d1d5db',
              lineHeight: '1.6',
              fontSize: '1rem',
              marginBottom: '1rem'
            }}>
              {currentPost.description}
            </p>
            <p style={{
              color: '#9ca3af',
              lineHeight: '1.6',
              fontSize: '0.9rem'
            }}>
              {currentPost.content}
            </p>
          </div>

          {/* Price and Purchase */}
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
              }}>{currentPost.price} {currentPost.currency}</span>
              <span style={{
                backgroundColor: '#ff6b35',
                color: '#fff',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.875rem'
              }}>Zora</span>
              <span style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#fff',
                padding: '0.25rem 0.5rem',
                borderRadius: '9999px',
                fontSize: '0.75rem'
              }}>{platformIcons.zora} {currentPost.platformName}</span>
            </div>
            
            <button
              onClick={() => handlePurchase(currentPost)}
              style={{
                width: '100%',
                backgroundColor: '#ff6b35',
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
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e55a2b'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ff6b35'}
            >
              {paymentMethod === 'credit' ? '💳 MINT WITH SPARKS' : '⚡ MINT WITH SPARKS'}
            </button>

            {/* Token Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: '#9ca3af' }}>Contract:</span>
                <span style={{ color: '#fff', fontFamily: 'monospace' }}>0xefd1...1396</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: '#9ca3af' }}>Network:</span>
                <span style={{ color: '#ff6b35' }}>Zora Network</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: '#9ca3af' }}>Token ID:</span>
                <span style={{ color: '#fff' }}>{currentPost.tokenId}</span>
              </div>
            </div>
          </div>

          {/* View Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#ff6b35',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}>
              <span>VIEW ON ZORA</span>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#ff6b35',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}>
              <span>VIEW $DRIVE COLLECTION</span>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
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
            onClick={prevPost}
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
            {drivePosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPostIndex(index)}
                style={{
                  width: '0.75rem',
                  height: '0.75rem',
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: index === currentPostIndex ? '#ff6b35' : '#6b7280',
                  transition: 'background-color 0.2s'
                }}
              />
            ))}
          </div>

          <button
            onClick={nextPost}
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
              backgroundColor: paymentMethod === 'credit' ? '#ff6b35' : 'transparent',
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
            💳 SPARKS
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
              backgroundColor: paymentMethod === 'crypto' ? '#ff6b35' : 'transparent',
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
            ⚡ SPARKS
          </button>
        </div>
      </div>
    </div>
  );
}
