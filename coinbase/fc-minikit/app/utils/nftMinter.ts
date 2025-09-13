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

    // Get the actual Base Smart Wallet address from the SDK
    let smartWalletAddress = null;
    if (sdk && sdk.getProvider) {
      try {
        const provider = sdk.getProvider();
        const accounts = await provider.request({ method: 'eth_accounts' }) as string[];
        if (accounts && accounts.length > 0) {
          smartWalletAddress = accounts[0];
          console.log('✅ Base Smart Wallet address found:', smartWalletAddress);
        } else {
          console.log('⚠️ No accounts found in Base Smart Wallet');
        }
      } catch (error) {
        console.warn('Could not get smart wallet address:', error);
      }
    } else {
      console.warn('No SDK provided for wallet address lookup');
    }
    
    // If no smart wallet address, don't add wallet parameter to URL
    if (!smartWalletAddress) {
      console.log('⚠️ No wallet address available, opening Manifold without pre-filled wallet');
      const mintWindow = window.open(mintUrl, 'manifold-mint', 'width=800,height=700,scrollbars=yes,resizable=yes');
      if (!mintWindow) {
        window.location.href = mintUrl;
      }
      return {
        success: true,
        transactionHash: 'manifold-redirect',
        tokenId,
        buyerAddress: 'user-will-connect-wallet',
        contractAddress: nftContractAddress,
        message: 'Opened Manifold - user will connect their own wallet',
        mintUrl: mintUrl
      };
    }
    
    // Add wallet address parameter to Manifold URL for testing
    const mintUrlWithWallet = `${mintUrl}?wallet=${smartWalletAddress}`;
    
    console.log(`Redirecting to Manifold mint page with Base Smart Wallet: ${mintUrlWithWallet}`);
    console.log(`🎯 TESTING: NFT will be delivered to Base Smart Wallet: ${smartWalletAddress}`);

    // Try to open Manifold mint page in new window/tab
    const mintWindow = window.open(
      mintUrlWithWallet,
      'manifold-mint',
      'width=800,height=700,scrollbars=yes,resizable=yes'
    );

    if (!mintWindow) {
      // Fallback: redirect current window to Manifold
      console.warn('Popup blocked, redirecting current window to Manifold');
      window.location.href = mintUrlWithWallet;
    }

    // Return success with the mint URL
    return {
      success: true,
      transactionHash: 'manifold-redirect',
      tokenId,
      buyerAddress: buyerAddress, // Use provided buyer address
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
