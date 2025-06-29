'use client';

import { useState, useEffect } from 'react';

interface CarNFT {
  id: string;
  contractAddress: string;
  carName: string;
  date: string;
  splashImageUrl?: string;
  mintImageUrl?: string;
  description?: string;
  mintType: 'ERC-721' | 'ERC-1155';
  duration: number;
  isActive: boolean;
}

export default function PastDropsGallery() {
  const [pastDrops, setPastDrops] = useState<CarNFT[]>([]);

  useEffect(() => {
    const savedCars = localStorage.getItem('carNFTs');
    if (savedCars) {
      const allCars: CarNFT[] = JSON.parse(savedCars);
      // Filter out the active car and reverse the list to show newest first
      const olderDrops = allCars.filter(car => !car.isActive).reverse();
      setPastDrops(olderDrops);
    }
  }, []);

  if (pastDrops.length === 0) {
    return null; // Don't render anything if no past drops
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white text-center mb-8">
        From the Garage: Past Drops
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pastDrops.map((car) => (
          <div key={car.id} className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl shadow-lg overflow-hidden border border-zinc-700 hover:border-zinc-600 transition-all duration-200">
            {/* Image */}
            {(car.mintImageUrl || car.splashImageUrl) && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={car.mintImageUrl || car.splashImageUrl} 
                  alt={car.carName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-white">{car.carName}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  car.mintType === 'ERC-1155' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {car.mintType}
                </span>
              </div>
              
              <p className="text-gray-400 text-sm mb-3">
                {new Date(car.date).toLocaleDateString()} • {car.duration} days
              </p>
              
              {car.description && (
                <p className="text-gray-300 text-sm mb-4">{car.description}</p>
              )}
              
              <div className="text-xs text-gray-500 font-mono">
                {car.contractAddress.slice(0, 8)}...{car.contractAddress.slice(-6)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 