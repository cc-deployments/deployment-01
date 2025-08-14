"use client";

import React from 'react';
import { useEffect, useState } from 'react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';
import { 
  getTokenDetails, 
  getMintDetails, 
  type TokenDetails, 
  type GetTokenDetailsResponse,
  type GetMintDetailsResponse,
  type MintDetails
} from '@coinbase/onchainkit/api';
import { StoreHeader } from './StoreHeader';
import { ContractTypeFilter } from './ContractTypeFilter';
import { MiniAppNFT } from './MiniAppNFT';

interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  contractType: 'ERC721' | 'ERC1155';
  network: 'Base' | 'CarCulture';
  contractAddress: string;
  tokenId: string;
  year?: string;
  brand?: string;
  rarity?: 'common' | 'rare' | 'legendary';
}

type ContractType = 'ALL' | 'BASE_ERC721' | 'BASE_ERC1155' | 'CARCULTURE_ERC721' | 'CARCULTURE_ERC1155';

function isTokenDetails(response: GetTokenDetailsResponse): response is TokenDetails {
  return 'metadata' in response;
}

function isMintDetails(response: GetMintDetailsResponse): response is MintDetails {
  return 'price' in response && 'currency' in response;
}

export default function CarManiaStore() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContract, setSelectedContract] = useState<ContractType>('ALL');
  const [paymentMethod, setPaymentMethod] = useState<'CRYPTO' | 'USDC'>('CRYPTO');
  const [carOfTheDay, setCarOfTheDay] = useState<NFT | null>(null);
  const { address } = useAccount();

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const contracts = {
          BASE_ERC721: process.env.NEXT_PUBLIC_BASE_ERC721_CONTRACT as `0x${string}`,
          BASE_ERC1155: process.env.NEXT_PUBLIC_BASE_ERC1155_CONTRACT as `0x${string}`,
          CARCULTURE_ERC721: process.env.NEXT_PUBLIC_CARMANIA_ERC721_CONTRACT as `0x${string}`,
          CARCULTURE_ERC1155: process.env.NEXT_PUBLIC_CARMANIA_ERC1155_CONTRACT as `0x${string}`,
        };

        const nftList: NFT[] = [];

        // Fetch NFTs from each contract
        for (const [key, contractAddress] of Object.entries(contracts)) {
          if (!contractAddress) continue;

          const tokenDetails = await getTokenDetails({
            contractAddress
          });

          if (isTokenDetails(tokenDetails)) {
            const mintDetails = await getMintDetails({
              contractAddress
            });

            // TODO: Fix metadata access when TokenDetails type is properly defined
            // const metadata = tokenDetails.metadata;
            // const attributes = metadata.attributes || [];

            // TODO: Fix NFT creation when metadata is properly defined
            // const nft: NFT = {
            //   id: `${contractAddress}-${metadata.tokenId}`,
            //   name: metadata.name,
            //   description: metadata.description,
            //   image: metadata.image,
            //   price: isMintDetails(mintDetails) ? mintDetails.price : '0',
            //   contractType: key.includes('ERC721') ? 'ERC721' : 'ERC1155',
            //   network: key.includes('BASE') ? 'Base' : 'CarCulture',
            //   contractAddress,
            //   tokenId: metadata.tokenId,
            //   year: attributes.find(a => a.trait_type === 'Year')?.value,
            //   brand: attributes.find(a => a.trait_type === 'Brand')?.value,
            //   rarity: attributes.find(a => a.trait_type === 'Rarity')?.value as 'common' | 'rare' | 'legendary'
            // };

            // TODO: Fix car of the day logic when metadata is properly defined
            // if (attributes.find(a => a.trait_type === 'CarOfTheDay')?.value === 'true') {
            //   setCarOfTheDay(nft);
            // } else {
            //   nftList.push(nft);
            // }
          }
        }

        setNfts(nftList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  const filteredNFTs = nfts.filter((nft) => {
    if (selectedContract === 'ALL') return true;
    const contractMapping = {
      BASE_ERC721: nft.network === 'Base' && nft.contractType === 'ERC721',
      BASE_ERC1155: nft.network === 'Base' && nft.contractType === 'ERC1155',
      CARCULTURE_ERC721: nft.network === 'CarCulture' && nft.contractType === 'ERC721',
      CARCULTURE_ERC1155: nft.network === 'CarCulture' && nft.contractType === 'ERC1155',
    };
    return contractMapping[selectedContract as keyof typeof contractMapping];
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <StoreHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">CarMania Collection</h1>
          <ConnectWallet />
        </div>

        {/* Car of the Day Section */}
        {carOfTheDay && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Car of the Day</h2>
            <MiniAppNFT
              tokenId={carOfTheDay.tokenId}
              contractAddress={carOfTheDay.contractAddress}
              network={carOfTheDay.network.toLowerCase() as 'ethereum' | 'base'}
              contractType={carOfTheDay.contractType.toLowerCase() as 'erc721' | 'erc1155'}
              price={carOfTheDay.price}
              currency={paymentMethod === 'USDC' ? 'USDC' : 'ETH'}
              title={carOfTheDay.name}
              description={carOfTheDay.description}
              imageUrl={carOfTheDay.image}
              year={carOfTheDay.year}
              brand={carOfTheDay.brand}
              rarity={carOfTheDay.rarity}
            />
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <ContractTypeFilter
            selectedType={selectedContract}
            onChange={setSelectedContract}
          />
          <div className="flex gap-4">
            <button
              onClick={() => setPaymentMethod('CRYPTO')}
              className={`px-4 py-2 rounded-lg ${
                paymentMethod === 'CRYPTO'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Pay with Crypto
            </button>
            <button
              onClick={() => setPaymentMethod('USDC')}
              className={`px-4 py-2 rounded-lg ${
                paymentMethod === 'USDC'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Pay with USDC
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading CarMania NFTs...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNFTs.map((nft) => (
              <NFTCard 
                key={`${nft.contractAddress}-${nft.tokenId}`} 
                nft={nft} 
                paymentMethod={paymentMethod}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 