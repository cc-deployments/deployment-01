'use client';

import Image from 'next/image';

export default function TitleBar() {
  return (
    <div className="flex items-center space-x-3">
      {/* Enhanced Logo Container */}
      <div className="relative flex items-center space-x-3">
        {/* CarCulture Logo */}
        <div className="relative w-8 h-8 md:w-10 md:h-10">
          <Image
            src="/logo-white.svg"
            alt="CarCulture Logo"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
        </div>

        {/* Title with enhanced styling */}
        <div className="flex flex-col">
          <h1 className="text-lg md:text-xl font-bold text-white tracking-wide">
            CarCulture
          </h1>
          <p className="text-xs text-gray-400 hidden sm:block">
            CarMania NFTs
          </p>
        </div>
      </div>
    </div>
  );
} 