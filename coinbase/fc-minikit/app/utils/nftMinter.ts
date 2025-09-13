// NFT minting utility for Manifold editions
export async function mintNFTToWallet(
  sdk: any, // Base Account SDK instance
  nftContractAddress: string,
  buyerAddress: string,
  tokenId: string
) {
  try {
    console.log('Starting Manifold edition minting process...', {
      nftContractAddress,
      buyerAddress,
      tokenId
    });

    // Get the Manifold mint URL for this token
    const mintUrl = getManifoldMintUrl(tokenId);
    
    if (!mintUrl) {
      throw new Error(`No Manifold mint URL found for token ${tokenId}`);
    }

    // For testing: Use Rainbow wallet address
    const testWalletAddress = '0x72995D007d4eCE7c6495baC448d7A57A0e2DC2D2';
    
    // Add wallet address parameter to Manifold URL for testing
    const mintUrlWithWallet = `${mintUrl}?wallet=${testWalletAddress}`;
    
    console.log(`Redirecting to Manifold mint page with test wallet: ${mintUrlWithWallet}`);
    console.log(`🎯 TESTING: NFT will be delivered to Rainbow wallet: ${testWalletAddress}`);

    // Open Manifold mint page in new window/tab
    const mintWindow = window.open(
      mintUrlWithWallet,
      'manifold-mint',
      'width=800,height=700,scrollbars=yes,resizable=yes'
    );

    if (!mintWindow) {
      throw new Error('Failed to open Manifold mint window. Please allow popups for this site.');
    }

    // Return success with the mint URL
    return {
      success: true,
      transactionHash: 'manifold-redirect',
      tokenId,
      buyerAddress: testWalletAddress, // Use test wallet address
      contractAddress: nftContractAddress,
      message: 'Redirected to Manifold mint page with test wallet',
      mintUrl: mintUrlWithWallet
    };

  } catch (error) {
    console.error('Manifold minting process failed:', error);
    throw error;
  }
}

// Get Manifold mint URL for specific token IDs
function getManifoldMintUrl(tokenId: string): string | null {
  const mintUrls: { [key: string]: string } = {
    '4149840112': 'https://manifold.xyz/@carculture/id/4149840112', // Low Tide
    '4149807344': 'https://manifold.xyz/@carculture/id/4149807344', // Flat Sea
    '4144040176': 'https://manifold.xyz/@carculture/id/4144040176', // Summertime Blues
    '4169097456': 'https://manifold.xyz/@carculture/id/4169097456', // Test 9
  };

  return mintUrls[tokenId] || null;
}

// Alternative: Transfer existing NFT
export async function transferNFTToWallet(
  provider: any,
  nftContractAddress: string,
  fromAddress: string,
  buyerAddress: string,
  tokenId: string
) {
  try {
    console.log('Starting NFT transfer process...', {
      nftContractAddress,
      fromAddress,
      buyerAddress,
      tokenId
    });

    // For Manifold editions, we redirect to the mint page instead
    const mintUrl = getManifoldMintUrl(tokenId);
    
    if (mintUrl) {
      window.open(mintUrl, '_blank');
      return {
        success: true,
        transactionHash: 'manifold-redirect',
        tokenId,
        buyerAddress,
        contractAddress: nftContractAddress,
        message: 'Redirected to Manifold mint page for transfer'
      };
    }

    throw new Error(`No Manifold mint URL found for token ${tokenId}`);
    
  } catch (error) {
    console.error('NFT transfer failed:', error);
    throw error;
  }
}
