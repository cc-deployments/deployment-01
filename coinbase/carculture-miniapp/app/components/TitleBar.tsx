'use client';

import Image from 'next/image';

export default function TitleBar() {
  return (
    <div className="w-full bg-[#8B0000] text-white">
      <div className="max-w-screen-xl mx-auto px-4 py-2">
        {/* Logo and Title Container */}
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-4">
            {/* CarCulture Logo */}
            <div className="relative w-32">
              <Image
                src="/logo-white.svg"
                alt="CarCulture Logo"
                width={120}
                height={40}
                className="object-contain transform-none"
                priority
              />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'system-ui, sans-serif' }}>
              CarCulture
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
} 