"use client";

import { useState, useEffect } from 'react';

interface MintPageData {
  imageUrl: string;
  title: string;
  description: string;
  price: string;
  collection: string;
  externalUrls: {
    manifold: string;
    editions: string;
  };
}

interface MintPageGeneratorProps {
  imageUrl: string;
  collection: string;
  title?: string;
  description?: string;
  price?: string;
}

export default function MintPageGenerator({
  imageUrl,
  collection,
  title = 'CarMania NFT',
  description = 'Exclusive CarMania NFT from CarCulture',
  price = '0.01 ETH'
}: MintPageGeneratorProps) {
  const [mintPageData, setMintPageData] = useState<MintPageData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (imageUrl && collection) {
      generateMintPages();
    }
  }, [imageUrl, collection]);

  const generateMintPages = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-mint-pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl,
          title,
          description,
          price,
          collection,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate mint pages');
      }

      const data = await response.json();
      setMintPageData(data.mintPageData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
          <p className="text-white">Generating mint pages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900 text-white p-4 rounded-lg">
        <p className="font-bold">Error:</p>
        <p>{error}</p>
        <button
          onClick={generateMintPages}
          className="mt-2 px-4 py-2 bg-red-700 rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!mintPageData) {
    return null;
  }

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Generated Mint Pages</h3>
      
      {/* Image Preview */}
      <div className="mb-4">
        <img
          src={mintPageData.imageUrl}
          alt={mintPageData.title}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      {/* Mint Page Info */}
      <div className="mb-4">
        <h4 className="font-semibold text-lg mb-2">{mintPageData.title}</h4>
        <p className="text-gray-300 text-sm mb-2">{mintPageData.description}</p>
        <p className="text-green-400 font-bold">{mintPageData.price}</p>
        <p className="text-blue-400 text-sm">Collection: {mintPageData.collection}</p>
      </div>

      {/* Mint Page Links */}
      <div className="space-y-3">
        <a
          href={mintPageData.externalUrls.manifold}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg font-semibold transition-colors"
        >
          🎨 Mint on Manifold
        </a>
        
        <a
          href={mintPageData.externalUrls.editions}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 px-4 rounded-lg font-semibold transition-colors"
        >
          🚀 Mint on Editions
        </a>
      </div>

      {/* Regenerate Button */}
      <button
        onClick={generateMintPages}
        className="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
      >
        Regenerate Pages
      </button>
    </div>
  );
}






















