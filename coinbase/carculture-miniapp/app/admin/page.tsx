'use client';

import { useState, useEffect } from 'react';
import TitleBar from '../components/TitleBar';

interface CarNFT {
  id: string;
  contractAddress: string;
  carName: string;
  date: string;
  splashImageUrl?: string;
  mintImageUrl?: string;
  description?: string;
  mintType: 'ERC-721' | 'ERC-1155';
  duration: number; // in days
  isActive: boolean;
}

export default function AdminPage() {
  const [cars, setCars] = useState<CarNFT[]>([]);
  const [newCar, setNewCar] = useState<Omit<CarNFT, 'id' | 'date' | 'isActive'>>({
    contractAddress: '',
    carName: '',
    splashImageUrl: '',
    mintImageUrl: '',
    description: '',
    mintType: 'ERC-1155',
    duration: 7
  });

  // Load existing cars from localStorage (in production, this would be a database)
  useEffect(() => {
    const savedCars = localStorage.getItem('carNFTs');
    if (savedCars) {
      setCars(JSON.parse(savedCars));
    }
  }, []);

  const saveCars = (updater: (prevCars: CarNFT[]) => CarNFT[]) => {
    const updatedCars = updater(cars);
    localStorage.setItem('carNFTs', JSON.stringify(updatedCars));
    setCars(updatedCars);
  };

  const addNewCar = () => {
    if (!newCar.contractAddress || !newCar.carName) {
      alert('Please fill in contract address and car name');
      return;
    }

    const car: CarNFT = {
      id: Date.now().toString(),
      contractAddress: newCar.contractAddress,
      carName: newCar.carName,
      date: new Date().toISOString().split('T')[0],
      splashImageUrl: newCar.splashImageUrl,
      mintImageUrl: newCar.mintImageUrl,
      description: newCar.description,
      mintType: newCar.mintType,
      duration: newCar.duration,
      isActive: true
    };

    saveCars(prevCars => {
      const updatedCars = prevCars.map(c => ({ ...c, isActive: false }));
      return [...updatedCars, car];
    });

    // Reset form
    setNewCar({
      contractAddress: '',
      carName: '',
      splashImageUrl: '',
      mintImageUrl: '',
      description: '',
      mintType: 'ERC-1155',
      duration: 7
    });
  };

  const toggleCarActive = (id: string) => {
    saveCars(prevCars => 
      prevCars.map(car => ({
        ...car,
        isActive: car.id === id
      }))
    );
  };

  const deleteCar = (id: string) => {
    saveCars(prevCars => prevCars.filter(car => car.id !== id));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <TitleBar />
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Car NFT</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contract Address *
              </label>
              <input
                type="text"
                value={newCar.contractAddress}
                onChange={(e) => setNewCar({...newCar, contractAddress: e.target.value})}
                placeholder="0x..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Car Name *
              </label>
              <input
                type="text"
                value={newCar.carName}
                onChange={(e) => setNewCar({...newCar, carName: e.target.value})}
                placeholder="e.g., Curb Service Cruiser"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mint Type
              </label>
              <select
                value={newCar.mintType}
                onChange={(e) => setNewCar({...newCar, mintType: e.target.value as 'ERC-721' | 'ERC-1155'})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ERC-1155">ERC-1155 (Lower gas, multiple tokens)</option>
                <option value="ERC-721">ERC-721 (Unique, single token)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (days)
              </label>
              <select
                value={newCar.duration}
                onChange={(e) => setNewCar({...newCar, duration: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={3}>3 days</option>
                <option value={7}>7 days</option>
                <option value={14}>14 days</option>
                <option value={30}>30 days</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Splash Image URL (for social sharing)
              </label>
              <input
                type="text"
                value={newCar.splashImageUrl}
                onChange={(e) => setNewCar({...newCar, splashImageUrl: e.target.value})}
                placeholder="https://... or /CurbService.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">The promotional image with branding/stickers</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mint Image URL (actual NFT artwork)
              </label>
              <input
                type="text"
                value={newCar.mintImageUrl}
                onChange={(e) => setNewCar({...newCar, mintImageUrl: e.target.value})}
                placeholder="https://arweave.net/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">The clean artwork that gets minted</p>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description/Caption
            </label>
            <textarea
              value={newCar.description}
              onChange={(e) => setNewCar({...newCar, description: e.target.value})}
              placeholder="Tell the story of this car..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={addNewCar}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add New Car NFT
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Car NFTs</h2>
          
          {cars.length === 0 ? (
            <p className="text-gray-500">No cars added yet. Add your first car above!</p>
          ) : (
            <div className="space-y-4">
              {cars.map((car) => (
                <div key={car.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{car.carName}</h3>
                    <div className="flex items-center space-x-2">
                      {car.isActive && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          ACTIVE
                        </span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        car.mintType === 'ERC-1155' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {car.mintType}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                    <div>
                      <strong>Contract:</strong> {car.contractAddress.slice(0, 8)}...{car.contractAddress.slice(-6)}
                    </div>
                    <div>
                      <strong>Date:</strong> {car.date}
                    </div>
                    <div>
                      <strong>Duration:</strong> {car.duration} days
                    </div>
                  </div>
                  
                  {car.description && (
                    <p className="text-sm text-gray-600 mb-3">{car.description}</p>
                  )}
                  
                  <div className="flex space-x-2">
                    {!car.isActive && (
                      <button
                        onClick={() => toggleCarActive(car.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        Make Active
                      </button>
                    )}
                    <button
                      onClick={() => deleteCar(car.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-blue-50 rounded-xl p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">How It Works</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Fill out the form above with your NFT details</li>
            <li>Click "Add New Car NFT" to save it</li>
            <li>The new car automatically becomes the active drop</li>
            <li>Previous cars move to the "Past Drops" gallery</li>
            <li>Your app will automatically show the new car!</li>
          </ol>
        </div>
      </div>
    </main>
  );
} 