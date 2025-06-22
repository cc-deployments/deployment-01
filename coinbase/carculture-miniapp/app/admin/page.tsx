'use client';

import { useState, useEffect } from 'react';
import TitleBar from '../components/TitleBar';
import Footer from '../components/Footer';

interface CarNFT {
  id: string;
  contractAddress: string;
  carName: string;
  date: string;
  imageUrl?: string;
  description?: string;
  isActive: boolean;
}

export default function AdminPage() {
  const [cars, setCars] = useState<CarNFT[]>([]);
  const [newCar, setNewCar] = useState({
    contractAddress: '',
    carName: '',
    imageUrl: '',
    description: ''
  });

  // Load existing cars from localStorage (in production, this would be a database)
  useEffect(() => {
    const savedCars = localStorage.getItem('carNFTs');
    if (savedCars) {
      setCars(JSON.parse(savedCars));
    }
  }, []);

  const saveCars = (updatedCars: CarNFT[]) => {
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
      imageUrl: newCar.imageUrl,
      description: newCar.description,
      isActive: true
    };

    // Deactivate all other cars
    const updatedCars = cars.map(c => ({ ...c, isActive: false }));
    updatedCars.push(car);
    
    saveCars(updatedCars);
    setNewCar({ contractAddress: '', carName: '', imageUrl: '', description: '' });
  };

  const toggleCarActive = (id: string) => {
    const updatedCars = cars.map(car => ({
      ...car,
      isActive: car.id === id ? !car.isActive : false
    }));
    saveCars(updatedCars);
  };

  const deleteCar = (id: string) => {
    const updatedCars = cars.filter(car => car.id !== id);
    saveCars(updatedCars);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <TitleBar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Car of the Day - Admin</h1>
        
        {/* Add New Car Form */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Add New Car NFT</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Contract Address *</label>
              <input
                type="text"
                value={newCar.contractAddress}
                onChange={(e) => setNewCar({...newCar, contractAddress: e.target.value})}
                placeholder="0x..."
                className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Car Name *</label>
              <input
                type="text"
                value={newCar.carName}
                onChange={(e) => setNewCar({...newCar, carName: e.target.value})}
                placeholder="e.g., 1967 Ford Mustang"
                className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Image URL</label>
              <input
                type="url"
                value={newCar.imageUrl}
                onChange={(e) => setNewCar({...newCar, imageUrl: e.target.value})}
                placeholder="https://..."
                className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Description</label>
              <input
                type="text"
                value={newCar.description}
                onChange={(e) => setNewCar({...newCar, description: e.target.value})}
                placeholder="Brief description..."
                className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600"
              />
            </div>
          </div>
          
          <button
            onClick={addNewCar}
            className="mt-4 bg-car-red hover:bg-red-800 text-white font-bold py-3 px-6 rounded transition-colors"
          >
            Add New Car NFT
          </button>
        </div>

        {/* Existing Cars List */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Manage Car NFTs</h2>
          
          {cars.length === 0 ? (
            <p className="text-gray-400">No cars added yet. Add your first car above!</p>
          ) : (
            <div className="space-y-4">
              {cars.map((car) => (
                <div key={car.id} className={`p-4 rounded border ${car.isActive ? 'border-green-500 bg-green-900/20' : 'border-gray-600 bg-gray-700'}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{car.carName}</h3>
                      <p className="text-gray-400 text-sm">{car.date}</p>
                      <p className="text-gray-300 text-xs font-mono mt-1">{car.contractAddress}</p>
                      {car.description && (
                        <p className="text-gray-400 mt-2">{car.description}</p>
                      )}
                      {car.isActive && (
                        <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded mt-2">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleCarActive(car.id)}
                        className={`px-3 py-1 rounded text-sm ${
                          car.isActive 
                            ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        {car.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => deleteCar(car.id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-900/20 border border-blue-600 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">Daily Workflow:</h3>
          <ol className="text-gray-300 space-y-1">
            <li>1. Create a new NFT using Coinbase Wallet's "create a Mint flow"</li>
            <li>2. Copy the contract address from the URL</li>
            <li>3. Add the new car above with the contract address</li>
            <li>4. Activate the new car (this will deactivate the previous one)</li>
            <li>5. Your app will automatically show the new car!</li>
          </ol>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 