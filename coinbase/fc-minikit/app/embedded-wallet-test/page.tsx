'use client';

import React from 'react';
import { EmbeddedWalletTest } from '../components/EmbeddedWalletTest';

export default function EmbeddedWalletTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Myriad Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            Base Account SDK Integration
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Embedded wallet functionality powered by Base Account SDK
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-[#a32428] text-white px-4 py-2 rounded-full text-sm font-semibold">
            <span>🔵</span>
            <span>Drive the Past. Own the Moment</span>
          </div>
        </div>
        
        <EmbeddedWalletTest />
      </div>
    </div>
  );
}