'use client';

import React from 'react';

export default function SimpleTest() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🚗 Simple Test Page
          </h1>
          <p className="text-gray-600 text-lg">
            Testing basic page load without OnchainKit
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Basic Test</h2>
          <p className="text-gray-600">
            If you can see this page, the basic Next.js setup is working.
          </p>
          
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">✅ Status</h3>
            <p className="text-green-800">
              Page loaded successfully! Ready to test OnchainKit components.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
