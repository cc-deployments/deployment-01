'use client';

import { useState, useEffect } from 'react';

interface CarNFT {
  id: string;
  contractAddress: string;
  carName: string;
  date: string;
  imageUrl?: string;
  description?: string;
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
    return null; // Don't render anything if there are no past drops
  }

  return (
    <div className="w-full max-w-5xl mt-24">
      <h2 className="text-3xl font-bold text-white text-center mb-8">
        From the Garage: Past Drops
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pastDrops.map(car => (
          <div key={car.id} className="bg-gray-800 rounded-lg p-4 text-center">
            <h3 className="text-xl font-semibold text-white">{car.carName}</h3>
            <p className="text-sm text-gray-400">Dropped on {new Date(car.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 