import { type Hex } from 'viem';

export interface ManifoldMintTransaction {
  to: Hex;
  data: Hex;
  value: bigint;
}

export interface ManifoldMintParams {
  contractAddress: Hex;
  tokenId: string;
  quantity: number;
  recipient: Hex;
}

/**
 * Custom buildMintTransaction function for Manifold ERC-1155 contracts
 * This function creates the transaction data needed to mint from a Manifold contract
 */
export async function buildManifoldMintTransaction(
  params: ManifoldMintParams
): Promise<ManifoldMintTransaction> {
  const { contractAddress, tokenId, quantity, recipient } = params;

  // For Manifold ERC-1155 contracts, we need to call the `mint` function
  // The function signature is: mint(address to, uint256 tokenId, uint256 amount)
  // Function selector: 0x731133e9 (first 4 bytes of keccak256("mint(address,uint256,uint256)"))
  
  const functionSelector = '0x731133e9';
  
  // Encode the parameters:
  // - to: address (32 bytes, padded)
  // - tokenId: uint256 (32 bytes)
  // - amount: uint256 (32 bytes)
  
  const paddedRecipient = recipient.slice(2).padStart(64, '0');
  const paddedTokenId = BigInt(tokenId).toString(16).padStart(64, '0');
  const paddedQuantity = BigInt(quantity).toString(16).padStart(64, '0');
  
  const data = `${functionSelector}${paddedRecipient}${paddedTokenId}${paddedQuantity}` as Hex;

  return {
    to: contractAddress,
    data,
    value: BigInt(0), // Manifold contracts typically don't require ETH payment
  };
}