'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useBaseAccount } from './BaseAccountProvider';

interface CardData {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  type: 'story' | 'visual' | 'collection';
  isTokenGated?: boolean;
  price?: string;
  arweaveHash?: string;
  manifoldUrl?: string;
  contractAddress?: string;
  tokenId?: string;
  auctionEnds?: string; // ISO timestamp for 24-hour auction
}

export function CardFeed() {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});
  const [layout, setLayout] = useState<'grid' | 'stream'>('grid');
  const { address, isConnected, connect, disconnect } = useBaseAccount();

  // Fetch Manifold card data
  useEffect(() => {
    const fetchManifoldCards = async () => {
      try {
        // Try to fetch the actual Manifold card data
        let manifoldCard: CardData = {
          id: 'manifold-1',
          title: 'Man Driving Car',
          description: 'Let your hair blow back!',
          image: '/placeholder-card.jpg', // We'll add a placeholder image
          date: '2024-09-29',
          type: 'story',
          isTokenGated: true,
          price: '$1.00 USDC',
          manifoldUrl: 'https://app.manifold.xyz/c/man-driving-car',
          contractAddress: 'CarMania.cb.id',
          tokenId: '4249233648',
          auctionEnds: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
        };

        // Try to fetch the actual image from Manifold
        try {
          const response = await fetch('https://api.manifold.xyz/v1/contract/CarMania.cb.id');
          if (response.ok) {
            const data = await response.json();
            if (data.image) {
              manifoldCard.image = data.image;
            }
          }
        } catch (apiError) {
          console.log('Could not fetch from Manifold API, using fallback image');
        }

        // Combine with sample data for now
        const sampleCards: CardData[] = [
          {
            id: '1',
            title: 'Surfing at Del Mar',
            description: 'A classic woody wagon on the California coast, capturing the essence of surf culture and automotive heritage.',
            image: '/car-cards/Surfing at Del Mar.png',
            date: '2024-09-29',
            type: 'story',
            isTokenGated: true,
            price: '$1.00 USDC',
            arweaveHash: 'arweave-hash-1',
            auctionEnds: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
          },
          {
            id: '2',
            title: 'Shoot the Curl',
            description: 'The iconic VW bus that defined a generation of beach culture and freedom on the open road.',
            image: '/car-cards/Shoot the Curl ©CarCulture.png',
            date: '2024-09-28',
            type: 'story',
            isTokenGated: true,
            price: '$1.00 USDC',
            arweaveHash: 'arweave-hash-2'
          },
          {
            id: '3',
            title: 'Thunderbird',
            description: 'Greetings from The Lone Cypress - a legendary ride along California\'s most scenic coastal drive.',
            image: '/car-cards/Thunderbird-Lone-Cypress.PNG',
            date: '2024-09-27',
            type: 'story',
            isTokenGated: true,
            price: '$1.00 USDC',
            arweaveHash: 'arweave-hash-3'
          },
          {
            id: '4',
            title: 'Finned Beast',
            description: 'Raw power meets classic design in this muscle car that defined American automotive excellence.',
            image: '/car-cards/Finned Beast.png',
            date: '2024-09-26',
            type: 'story',
            isTokenGated: true,
            price: '$1.00 USDC',
            arweaveHash: 'arweave-hash-4'
          },
          {
            id: '5',
            title: 'Fintastic',
            description: 'The art of automotive design reaches its peak with these iconic tailfins that defined an era.',
            image: '/car-cards/Fintastic.png',
            date: '2024-09-25',
            type: 'visual',
            isTokenGated: false
          },
          {
            id: '9',
            title: 'Sunset Drive',
            description: 'Just a beautiful car at sunset. No story needed.',
            image: '/placeholder-card.jpg',
            date: '2024-09-21',
            type: 'visual',
            isTokenGated: false
          },
          {
            id: '10',
            title: 'Classic Lines',
            description: 'Pure automotive art.',
            image: '/placeholder-card.jpg',
            date: '2024-09-20',
            type: 'visual',
            isTokenGated: false
          },
          {
            id: '6',
            title: 'Summertime Blues',
            description: 'A blue station wagon that captures the nostalgia of endless summer days and family road trips.',
            image: '/car-cards/Summertime Blues.png',
            date: '2024-09-24',
            type: 'story',
            isTokenGated: true,
            price: '$1.00 USDC',
            arweaveHash: 'arweave-hash-6'
          },
          {
            id: '7',
            title: 'Low Tide',
            description: 'Beach vibes and automotive dreams collide in this coastal car culture moment.',
            image: '/car-cards/Low Tide-1-MiniApp_Share-V.png',
            date: '2024-09-23',
            type: 'story',
            isTokenGated: true,
            price: '$1.00 USDC',
            arweaveHash: 'arweave-hash-7'
          },
          {
            id: '8',
            title: 'Low Tide',
            description: 'Beach vibes and automotive dreams collide in this coastal car culture moment.',
            image: '/placeholder-card.jpg',
            date: '2024-09-22',
            type: 'visual',
            isTokenGated: false
          }
        ];

        // Put Manifold card first, then sample cards
        setCards([manifoldCard, ...sampleCards]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Manifold cards:', error);
        setLoading(false);
      }
    };

    fetchManifoldCards();
  }, []);

  // Countdown timer for auctions
  useEffect(() => {
    const updateCountdowns = () => {
      const newTimeLeft: { [key: string]: string } = {};
      
      cards.forEach(card => {
        if (card.auctionEnds) {
          const now = new Date().getTime();
          const endTime = new Date(card.auctionEnds).getTime();
          const timeDiff = endTime - now;
          
          if (timeDiff > 0) {
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            
            newTimeLeft[card.id] = `${hours}h ${minutes}m ${seconds}s`;
          } else {
            newTimeLeft[card.id] = 'Auction ended';
          }
        }
      });
      
      setTimeLeft(newTimeLeft);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    
    return () => clearInterval(interval);
  }, [cards]);

  const handleCardClick = (card: CardData) => {
    if (card.manifoldUrl) {
      // Open Manifold page for minted cards
      window.open(card.manifoldUrl, '_blank');
    } else if (card.isTokenGated) {
      setSelectedCard(card);
    } else {
      // Direct link to content
      window.open(`/story/${card.id}`, '_blank');
    }
  };

  const handleLike = (card: CardData, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Liked:', card.title);
    // TODO: Implement actual like functionality
    alert(`Liked "${card.title}"! ❤️`);
  };

  const handleShare = (card: CardData, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Sharing:', card.title);
    
    if (navigator.share) {
      navigator.share({
        title: card.title,
        text: card.description,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${card.title} - ${card.description}\n${window.location.href}`);
      alert(`Copied "${card.title}" to clipboard! 📋`);
    }
  };

  const handleUnlockStory = async (card: CardData) => {
    console.log('Unlocking story:', card.title);
    
    try {
      // BasePay handles wallet creation and payment automatically
      console.log('Processing Collect with BasePay...');
      console.log('Opening bid: $1.00 USDC');
      console.log('BasePay will create wallet and process payment...');
      
      // TODO: Integrate actual BasePayButton component
      // For now, simulate successful collection
      alert(`Collection successful! You now own "${card.title}".\n\nOpening bid: $1.00 USDC\nBasePay created your wallet automatically!\n\nYou'll be notified if someone bids higher!`);
      
      setSelectedCard(null);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-gray-900">CarCulture</h1>
              <span className="text-sm text-gray-500">Daily Car Stories</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setLayout('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    layout === 'grid' 
                      ? 'bg-[#a32428] text-white' 
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setLayout('stream')}
                  className={`p-2 rounded-lg transition-colors ${
                    layout === 'stream' 
                      ? 'bg-[#a32428] text-white' 
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <Link
                href="https://carmania.carculture.com"
                className="bg-[#a32428] text-white px-4 py-2 rounded-lg hover:bg-[#8b1e22] transition-colors"
              >
                Car of the Day
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Card Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-lg text-gray-600">Loading car stories...</div>
          </div>
        ) : (
          <div className={layout === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "max-w-4xl mx-auto space-y-6"
          }>
            {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden"
              onClick={() => handleCardClick(card)}
            >
              <div className={`relative ${layout === 'stream' ? 'h-[500px] w-full flex-shrink-0' : 'h-[400px] w-full'}`}>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  priority={card.manifoldUrl ? true : false}
                  sizes={layout === 'stream' 
                    ? "(max-width: 768px) 100vw, 384px" 
                    : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  }
                  quality={card.manifoldUrl ? 75 : 90}
                />
                {card.isTokenGated && (
                  <div className="absolute top-4 right-4 bg-[#a32428] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Collect
                  </div>
                )}
                {card.auctionEnds && timeLeft[card.id] && (
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {timeLeft[card.id]}
                  </div>
                )}
              </div>
              
            </div>
          ))}
          </div>
        )}
      </div>

      {/* Unlock Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Unlock {selectedCard.title}
              </h3>
              <p className="text-gray-600 mb-6">
                Access the full story and unlock this car's complete history.
              </p>
              
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <div className="text-3xl font-bold text-[#a32428] mb-2">
                  Opening Bid: $1.00 USDC
                </div>
                <div className="text-sm text-gray-600">
                  24-hour auction • BasePay • Instant collect
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  You'll be notified if someone bids higher
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUnlockStory(selectedCard)}
                  className="flex-1 bg-[#a32428] text-white py-3 rounded-lg hover:bg-[#8b1e22] transition-colors font-semibold"
                >
                  Collect with BasePay
                </button>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardFeed;

