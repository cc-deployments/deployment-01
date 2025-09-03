'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Same NFT data as the single-card gallery, but optimized for grid display
const mockNFTs = [
  {
    id: '1',
    name: 'CarMania Garage Testing 1',
    description: 'The first in our exclusive CarMania Garage Testing series.',
    image: '/preview-images/car_culture__carmania_garage_testing_1_preview.jpg',
    thumbnail: '/thumbnail-images/car_culture__carmania_garage_testing_1_thumbnail.jpg',
    price: '1.00',
    currency: 'USD',
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
    name: 'CarMania Garage Testing 2',
    description: 'The second in our exclusive CarMania Garage Testing series.',
    image: '/preview-images/car_culture__carmania_garage_testing_2_preview.jpg',
    thumbnail: '/thumbnail-images/car_culture__carmania_garage_testing_2_thumbnail.jpg',
    price: '1.00',
    currency: 'USD',
    year: '2025',
    brand: 'CarCulture',
    rarity: 'legendary' as const,
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '2',
    platform: 'cdp' as const,
    platformName: 'Coinbase Developer Platform',
    mintUrl: 'https://56k43jlbc26cs47a6lg6srqv77epwa2uibctqtg5jmedtrg6gfoq.arweave.net/75XNpWEWvClz4PLN6UYV_8j7A1RARThM3UsIOcTeMV0'
  },
  {
    id: '3',
    name: 'CarMania Garage Testing 3',
    description: 'The third in our exclusive CarMania Garage Testing series.',
    image: '/preview-images/car_culture__carmania_garage_testing_3_preview.jpg',
    thumbnail: '/thumbnail-images/car_culture__carmania_garage_testing_3_thumbnail.jpg',
    price: '1.00',
    currency: 'USD',
    year: '2025',
    brand: 'CarCulture',
    rarity: 'legendary' as const,
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '3',
    platform: 'cdp' as const,
    platformName: 'Coinbase Developer Platform',
    mintUrl: 'https://kl5lgl3bvujomrzo5noe35jw6yxws5whnw53zogrhbaz73edu6kq.arweave.net/UvqzL2GtEuZHLutcTfU29i9pdsdtu7y40ThBn-yDp5U'
  },
  {
    id: '4',
    name: 'CarMania Garage Testing 4',
    description: 'The fourth in our exclusive CarMania Garage Testing series.',
    image: '/preview-images/car_culture__carmania_garage_testing_4_preview.jpg',
    thumbnail: '/thumbnail-images/car_culture__carmania_garage_testing_4_thumbnail.jpg',
    price: '1.00',
    currency: 'USD',
    year: '2025',
    brand: 'CarCulture',
    rarity: 'legendary' as const,
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '4',
    platform: 'cdp' as const,
    platformName: 'Coinbase Developer Platform',
    mintUrl: 'https://iragqon5jdtmlmb64usi3ec3du4fdgxodx3zqw3r5ctdsc3ej7xa.arweave.net/REBoOb1I5sWwPuUkjZBbHThRmu4d95hbceimOQtkT-4'
  },
  {
    id: '5',
    name: 'CarMania Garage Testing 5',
    description: 'The fifth in our exclusive CarMania Garage Testing series.',
    image: '/preview-images/car_culture__carmania_garage_testing_5_preview.jpg',
    thumbnail: '/thumbnail-images/car_culture__carmania_garage_testing_5_thumbnail.jpg',
    price: '1.00',
    currency: 'USD',
    year: '2025',
    brand: 'CarCulture',
    rarity: 'legendary' as const,
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '5',
    platform: 'cdp' as const,
    platformName: 'Coinbase Developer Platform',
    mintUrl: 'https://f5d2zie2k6s545nphdhdnpmdufvfccbevim2bu4ziewakwsmm6wa.arweave.net/L0esoJpXpd51rzjONr2DoWpRCCSqGaDTmUEsBVpMZ6w'
  },
  {
    id: '6',
    name: 'CarMania Garage Testing 6',
    description: 'The sixth in our exclusive CarMania Garage Testing series.',
    image: '/preview-images/car_culture__carmania_garage_testing_6_preview.jpg',
    thumbnail: '/thumbnail-images/car_culture__carmania_garage_testing_6_thumbnail.jpg',
    price: '1.00',
    currency: 'USD',
    year: '2025',
    brand: 'CarCulture',
    rarity: 'legendary' as const,
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '6',
    platform: 'cdp' as const,
    platformName: 'Coinbase Developer Platform',
    mintUrl: 'https://3yqpmriehuvnvqi3j7br7u2y37o6eh4siieto2aljd2qvcv4fxxa.arweave.net/3iD2RQQ9KtrBG0_DH9NY393iH5JCCTdoC0j1Coq8Le4'
  },
  {
    id: '7',
    name: 'CarMania Garage Testing 7',
    description: 'The seventh in our exclusive CarMania Garage Testing series.',
    image: '/preview-images/car_culture__carmania_garage_testing_7_preview.jpg',
    thumbnail: '/thumbnail-images/car_culture__carmania_garage_testing_7_thumbnail.jpg',
    price: '1.00',
    currency: 'USD',
    year: '2025',
    brand: 'CarCulture',
    rarity: 'legendary' as const,
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '7',
    platform: 'cdp' as const,
    platformName: 'Coinbase Developer Platform',
    mintUrl: 'https://3z23cykd5cjsmvt3ion3ubfsqpmkrhslmg3cx3e4gzlnjjmswknq.arweave.net/3nWxYUPokyZWe0ObugSyg9ionkthtivsnDZW1KWSsps'
  },
  {
    id: '8',
    name: 'CarMania Garage Testing 8',
    description: 'The eighth in our exclusive CarMania Garage Testing series.',
    image: '/preview-images/car_culture__carmania_garage_testing_8_preview.jpg',
    thumbnail: '/thumbnail-images/car_culture__carmania_garage_testing_8_thumbnail.jpg',
    price: '1.00',
    currency: 'USD',
    year: '2025',
    brand: 'CarCulture',
    rarity: 'legendary' as const,
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '8',
    platform: 'cdp' as const,
    platformName: 'Coinbase Developer Platform',
    mintUrl: 'https://s7427qxzu2ggghmvczxiftg44ew4j2fjisfh3yq47yucx5y32rna.arweave.net/l_mvwvmmjGMdlRZugszc4S3E6KlEin3iHP4oK_cb1Fo'
  },
  {
    id: '9',
    name: 'CarMania Garage Testing 9',
    description: 'The ninth and final in our exclusive CarMania Garage Testing series.',
    image: '/preview-images/car_culture__carmania_garage_testing_9_preview.jpg',
    thumbnail: '/thumbnail-images/car_culture__carmania_garage_testing_9_thumbnail.jpg',
    price: '1.00',
    currency: 'USD',
    year: '2025',
    brand: 'CarCulture',
    rarity: 'legendary' as const,
    contractAddress: '0x8ef0772347e0caed0119937175d7ef9636ae1aa0',
    tokenId: '9',
    platform: 'cdp' as const,
    platformName: 'Coinbase Developer Platform',
    mintUrl: 'https://bzf6clfbkqqztyf5wscbtktorbzpq5syuoq4sdtzlpwpudqkk3nq.arweave.net/DkvhLKFUIZngvbSEGapuiHL4dlijockOeVvs-g4KVts'
  }
];

const rarityColors = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500', 
  legendary: 'bg-purple-500'
};

interface NFTGridCardProps {
  nft: typeof mockNFTs[0];
  onPurchase: (nft: typeof mockNFTs[0]) => void;
  onViewDetails: (nft: typeof mockNFTs[0]) => void;
}

function NFTGridCard({ nft, onPurchase, onViewDetails }: NFTGridCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on the purchase button
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onViewDetails(nft);
  };

  return (
    <div 
      className="group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image 
          src={nft.thumbnail} 
          alt={nft.name}
          width={400}
          height={400}
          className="w-full h-full object-cover"
          quality={85}
        />
        
        {/* Minimal Price Badge - Only on Hover */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {nft.price} {nft.currency}
          </div>
        </div>
        
        {/* Hover Overlay with Purchase Button */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={() => onPurchase(nft)}
            className="opacity-0 group-hover:opacity-100 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
          >
            Buy with Credit Card
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NFTGalleryGrid() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePurchase = async (nft: typeof mockNFTs[0]) => {
    setIsLoading(true);
    
    try {
      // Create StableLink product using your existing API
      const response = await fetch('/api/stablelink/create-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nft.name,
          description: nft.description,
          price: nft.price,
          currency: nft.currency,
          image: nft.image,
          contractAddress: nft.contractAddress,
          tokenId: nft.tokenId,
          mintUrl: nft.mintUrl
        }),
      });

      const data = await response.json();
      
      if (data.paymentUrl) {
        // Redirect to payment page (either CDP or direct mint)
        console.log('Opening payment URL:', data.paymentUrl);
        // Use window.location.href to avoid popup blockers
        window.location.href = data.paymentUrl;
      } else {
        // Fallback to direct mint URL
        console.log('Fallback to direct mint URL:', nft.mintUrl);
        window.location.href = nft.mintUrl;
      }
    } catch (error) {
      console.error('StableLink integration error:', error);
      // Fallback to direct mint URL
      window.location.href = nft.mintUrl;
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (nft: typeof mockNFTs[0]) => {
    // Navigate to single-card view with NFT ID as parameter
    router.push(`/nft-gallery-demo?nft=${nft.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Minimal Header */}
      <div style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <img 
              src="/carculture-wing-bl-logo.png" 
              alt="CarCulture Logo"
              style={{ width: '4rem', height: '4rem', objectFit: 'contain' }}
            />
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', margin: '0' }}>CarMania NFT Gallery</h1>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem',
          width: '100%'
        }}>
          {mockNFTs.map((nft) => (
            <NFTGridCard
              key={nft.id}
              nft={nft}
              onPurchase={handlePurchase}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-semibold">Creating payment link...</span>
          </div>
        </div>
      )}
    </div>
  );
}
