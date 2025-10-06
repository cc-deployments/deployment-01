// coinbase/fc-minikit/app/samsung-content-demo/page.tsx

'use client';

import React, { useState } from 'react';
import { SamsungContentCoin, SamsungContentGate } from '../../../../packages/shared-auth/components/SamsungContentCoin';

export default function SamsungContentDemo() {
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  const samsungContent = [
    {
      id: 'galaxy-ar-showcase',
      title: 'Galaxy AR Showcase',
      price: '5.00',
      description: 'Exclusive Samsung Galaxy AR experience featuring CarCulture PFPs',
      image: '/images/galaxy-ar-preview.jpg',
      type: 'AR Experience'
    },
    {
      id: 'pokemon-style-cards',
      title: 'Pokemon-Style Car Cards',
      price: '3.00',
      description: 'Collectible car cards with Pokemon-style rarity system',
      image: '/images/pokemon-cards-preview.jpg',
      type: 'Digital Collectibles'
    },
    {
      id: 'galaxy-exclusive-nft',
      title: 'Galaxy Exclusive NFT',
      price: '10.00',
      description: 'Limited edition NFT available only to Samsung Galaxy users',
      image: '/images/galaxy-exclusive-nft.jpg',
      type: 'NFT'
    },
    {
      id: '3d-car-models',
      title: '3D Car Models',
      price: '7.50',
      description: 'High-quality 3D models of CarCulture vehicles for AR/VR',
      image: '/images/3d-models-preview.jpg',
      type: '3D Assets'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Samsung Galaxy Content Coin Demo
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Exclusive content for 75M Samsung Galaxy users
          </p>
          <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            Powered by Base Pay
          </div>
        </div>

        {/* Samsung Partnership Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Samsung-Coinbase Partnership
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Partnership Details</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• 75M Galaxy device users</li>
                <li>• Coinbase One integration</li>
                <li>• Zero trading fees</li>
                <li>• Samsung Pay crypto integration</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-2">CarCulture Opportunity</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Pokemon-like rarity structure</li>
                <li>• 3D rendering capability</li>
                <li>• Daily social momentum</li>
                <li>• Base Pay integration ready</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {samsungContent.map((content) => (
            <div key={content.id} className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/20 transition-all duration-300">
              <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <p className="text-sm font-medium">{content.type}</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white mb-2">{content.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{content.description}</p>
                <SamsungContentCoin
                  contentId={content.id}
                  contentTitle={content.title}
                  contentPrice={content.price}
                  onSuccess={() => setSelectedContent(content.id)}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Content Gate Demo */}
        {selectedContent && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Content Gate Demo
            </h2>
            <p className="text-gray-300 mb-6">
              This is how Samsung Galaxy users would access gated content:
            </p>
            
            <SamsungContentGate
              contentId="demo-content"
              contentTitle="Exclusive CarCulture Content"
              contentPrice="5.00"
            >
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">🎉 Content Unlocked!</h3>
                <p>Welcome to the exclusive Samsung Galaxy CarCulture experience!</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">AR Features</h4>
                    <p className="text-sm">3D car models in your environment</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded">
                    <h4 className="font-semibold">Collectibles</h4>
                    <p className="text-sm">Pokemon-style rarity system</p>
                  </div>
                </div>
              </div>
            </SamsungContentGate>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready for Samsung Partnership?
          </h2>
          <p className="text-gray-300 mb-6">
            Contact Jesse at Coinbase to explore the Samsung Galaxy opportunity
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
              Contact Jesse
            </button>
            <button className="border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">
              View Promo Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




