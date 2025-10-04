// carculture-landing/src/app/nft-mint/page.tsx

import { CarCultureNFTMint } from '@/components/CarCultureNFTMint';
import { OnchainKitProvider } from '@coinbase/onchainkit';

export default function NFTMintPage() {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain="base"
      appName="CarCulture"
    >
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              CarCulture NFT Collection
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mint exclusive automotive NFTs and join the CarCulture community. 
              Each NFT grants access to DRIVR AI agent and exclusive content.
            </p>
          </div>

          {/* NFT Mint Component */}
          <div className="max-w-md mx-auto">
            <CarCultureNFTMint
              contractAddress="0x8ef0772347e0caed0119937175d7ef9636e1aa0" // Your CarMania contract
              price="0.01"
              maxSupply={100}
            />
          </div>

          {/* Collection Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚗</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Exclusive Artwork</h3>
              <p className="text-gray-600">
                Unique automotive designs created by CarCulture artists
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">DRIVR Access</h3>
              <p className="text-gray-600">
                Connect with your AI assistant for automotive insights
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Future Benefits</h3>
              <p className="text-gray-600">
                Airdrops, exclusive content, and community perks
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Connect Wallet</h3>
                <p className="text-sm text-gray-600">
                  Connect your crypto wallet to get started
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Mint NFT</h3>
                <p className="text-sm text-gray-600">
                  Click mint to create your exclusive NFT
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Get Access</h3>
                <p className="text-sm text-gray-600">
                  Unlock DRIVR AI and community features
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  4
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Enjoy Benefits</h3>
                <p className="text-sm text-gray-600">
                  Access exclusive content and future airdrops
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OnchainKitProvider>
  );
}

