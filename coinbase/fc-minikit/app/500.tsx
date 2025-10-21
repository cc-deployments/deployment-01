'use client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Custom500() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            500 - Server Error
          </h1>
          <p className="text-gray-600 mb-6">
            Something went wrong on our end. Please try again later.
          </p>
          <a
            href="/"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}

