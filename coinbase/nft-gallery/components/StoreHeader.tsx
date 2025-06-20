import React from 'react';
export function StoreHeader() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">CarMania</h1>
            <p className="text-blue-200">Exclusive Car NFT Collection</p>
          </div>
          
          <nav className="flex gap-6">
            <a 
              href="https://carculture.eth" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-blue-200 transition-colors duration-200"
            >
              CarCulture.eth
            </a>
            <a 
              href="/about" 
              className="text-white hover:text-blue-200 transition-colors duration-200"
            >
              About
            </a>
            <a 
              href="/faq" 
              className="text-white hover:text-blue-200 transition-colors duration-200"
            >
              FAQ
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
} 