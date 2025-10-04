// carculture-landing/src/app/page.tsx

import { CrossDomainDRIVRAgent } from '@shared/auth';

export default function CarCultureLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-white mb-4">
                Car<span className="text-red-500">Culture</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Where Cars Meet Culture - Discover automotive NFTs, daily drops, and exclusive collections
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a 
                href="https://carmania.carculture.com"
                className="px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Explore CarMania NFTs
              </a>
              <a 
                href="#signup"
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
              >
                Join the Community
              </a>
            </div>

            {/* DRIVR Agent Preview */}
            <div className="max-w-md mx-auto mb-12">
              <CrossDomainDRIVRAgent 
                onAuthStateChange={(state) => {
                  console.log('Landing page auth state:', state);
                }}
                className="bg-white/10 backdrop-blur-sm border border-white/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What Makes CarCulture Special?</h2>
            <p className="text-gray-300">Discover the future of automotive collectibles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚗</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Daily Car Drops</h3>
              <p className="text-gray-300">Fresh automotive NFTs every day featuring classic and modern cars</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Assistant</h3>
              <p className="text-gray-300">Chat with DRIVR, your AI assistant for automotive NFTs and market insights</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Exclusive Collections</h3>
              <p className="text-gray-300">Access to rare and limited edition automotive artwork and collectibles</p>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Section */}
      <div id="signup" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-8">
            Get notified about new drops, exclusive releases, and community events
          </p>

          <div className="max-w-md mx-auto">
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Join the Community
              </button>
            </form>
            
            <p className="text-sm text-gray-400 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400">
              © 2025 CarCulture. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="https://carmania.carculture.com" className="text-gray-400 hover:text-white transition-colors">
                CarMania
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                About
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

