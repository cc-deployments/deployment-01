'use client';

import React from 'react';

export default function SimpleTest() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Simple Test Page
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">
            This is a simple test page to verify the basic setup is working.
          </p>
        </div>
      </div>
    </div>
  );
}
