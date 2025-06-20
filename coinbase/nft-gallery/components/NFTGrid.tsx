import React from 'react';
import { useContractRead, useContractReads } from 'wagmi';
import { erc721Abi } from 'viem';
import { useEffect, useState } from 'react';

type NFTData = {
  tokenId: bigint;
  uri: string;
  image?: string;
  name?: string;
};

export function NFTGrid() {
  const [nftData, setNftData] = useState<NFTData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  const contractAddress = process.env.NEXT_PUBLIC_BASE_ERC721_CONTRACT_ADDRESS;

  // Add debug info
  useEffect(() => {
    setDebugInfo(`Contract Address: ${contractAddress || 'Not set'}`);
  }, [contractAddress]);

  // Get total supply of NFTs
  const { data: totalSupply, isLoading: isSupplyLoading, error: supplyError } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: erc721Abi,
    functionName: 'totalSupply',
  });

  // Log any errors
  useEffect(() => {
    if (supplyError) {
      console.error('Total supply error:', supplyError);
      setError(`Failed to fetch total supply: ${supplyError.message}`);
    }
  }, [supplyError]);

  // Get token URIs for all NFTs
  const { data: tokenUriData, isLoading: isTokenUriLoading, error: uriError } = useContractReads({
    contracts: totalSupply && !supplyError
      ? Array.from({ length: Number(totalSupply) }).map((_, i) => ({
          address: contractAddress as `0x${string}`,
          abi: erc721Abi,
          functionName: 'tokenURI',
          args: [BigInt(i)],
        }))
      : [],
    query: {
      enabled: !!totalSupply && !supplyError,
    }
  });

  useEffect(() => {
    const fetchMetadata = async () => {
      if (!tokenUriData || supplyError || uriError) return;

      setIsLoading(true);
      setError(null);

      try {
        const nfts: NFTData[] = [];
        for (let i = 0; i < tokenUriData.length; i++) {
          const tokenId = BigInt(i);
          if (tokenUriData[i].status === 'failure') {
            console.error(`Failed to fetch URI for token ${tokenId}:`, tokenUriData[i].error);
            continue;
          }
          
          const uri = tokenUriData[i].result as string;
          try {
            const response = await fetch(uri);
            if (!response.ok) {
              throw new Error(`Failed to fetch metadata for token ${tokenId}`);
            }
            const metadata = await response.json();
            nfts.push({
              tokenId,
              uri,
              image: metadata.image,
              name: metadata.name,
            });
          } catch (error) {
            console.error('Error fetching metadata:', error);
          }
        }
        setNftData(nfts);
      } catch (error) {
        setError('Failed to load NFT metadata');
        console.error('Error loading NFTs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [tokenUriData, supplyError, uriError]);

  const isLoadingState = isSupplyLoading || isTokenUriLoading || isLoading;

  return (
    <div className="space-y-6">
      <div className="bg-[#1a1a1a] rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">CarMania NFT Collection</h2>
        
        {debugInfo && (
          <div className="mb-4 p-4 bg-gray-800 rounded-lg">
            <pre className="text-xs text-gray-400">{debugInfo}</pre>
          </div>
        )}

        {(supplyError || uriError) && (
          <div className="mb-4 p-4 bg-red-900/50 rounded-lg">
            <p className="text-red-400 text-sm">
              {supplyError?.message || uriError?.message}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {isLoadingState ? (
            <div className="col-span-full flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--app-accent)]" />
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-8">
              <p className="text-red-500">{error}</p>
            </div>
          ) : nftData.length > 0 ? (
            nftData.map((nft) => (
              <div
                key={nft.tokenId.toString()}
                className="rounded-lg overflow-hidden border border-[var(--app-card-border)] p-4 hover:border-[var(--app-accent)] transition-colors bg-[#2a2a2a]"
              >
                {nft.image ? (
                  <img
                    src={nft.image}
                    alt={nft.name || `NFT #${nft.tokenId.toString()}`}
                    className="aspect-square object-cover rounded-lg mb-2"
                  />
                ) : (
                  <div className="aspect-square bg-[var(--app-gray)] rounded-lg mb-2" />
                )}
                <p className="text-[var(--app-foreground-muted)]">
                  {nft.name || `NFT #${nft.tokenId.toString()}`}
                </p>
              </div>
            ))
          ) : (
            <p className="text-[var(--app-foreground-muted)] col-span-full text-center py-8">
              No NFTs found in the collection
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 