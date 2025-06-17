import React from 'react';
import { NFTMintCard } from '@coinbase/onchainkit/nft';

interface CustomNFTCardProps {
  imageUrl: string;
  title: string;
  description: string;
  contractAddress: string;
  layout?: 'square' | 'horizontal' | 'vertical';
}

const layoutStyles = {
  square: 'flex flex-col items-center w-full max-w-[16px] sm:max-w-xs md:max-w-sm lg:max-w-lg mx-auto p-0 sm:p-0.5 text-center',
  vertical: 'flex flex-col items-center w-full max-w-[16px] sm:max-w-xs mx-auto p-0 sm:p-0.5 text-center',
  horizontal: 'flex flex-row items-center w-full max-w-xs sm:max-w-2xl mx-auto p-0 sm:p-0.5 text-center',
};

export default function CustomNFTCard({ imageUrl, title, description, contractAddress, layout = 'square' }: CustomNFTCardProps) {
  return (
    <div className={`bg-yellow-300 border-4 border-red-500 rounded-xl shadow-lg w-[16px] sm:w-auto ${layoutStyles[layout]} overflow-hidden`}>
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-[8px] sm:h-auto object-cover rounded-t-xl"
      />
      <div className="flex flex-col items-center w-full px-6 py-4">
        <h3 className="text-[2px] sm:text-base md:text-xl font-bold text-white mt-0 mb-0 w-full text-center">{title}</h3>
        <p className="text-[1px] sm:text-xs md:text-base text-gray-400 mb-0 w-full text-center">{description}</p>
        <NFTMintCard contractAddress={contractAddress as `0x${string}`} />
      </div>
    </div>
  );
} 