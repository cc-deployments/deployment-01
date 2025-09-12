'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function MoonPaySuccessPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const productId = searchParams.get('productId');
    const transactionId = searchParams.get('transactionId');
    const status = searchParams.get('status');

    if (status === 'completed' || transactionId) {
      setStatus('success');
      setMessage(`Payment completed successfully! Product: ${productId}`);
      
      // Notify parent window if opened in popup
      if (window.opener) {
        window.opener.postMessage({
          type: 'moonpay-success',
          productId,
          transactionId,
          status: 'completed'
        }, window.location.origin);
        window.close();
      }
    } else if (status === 'failed') {
      setStatus('error');
      setMessage('Payment failed. Please try again.');
      
      // Notify parent window if opened in popup
      if (window.opener) {
        window.opener.postMessage({
          type: 'moonpay-error',
          productId,
          status: 'failed'
        }, window.location.origin);
        window.close();
      }
    } else {
      setStatus('error');
      setMessage('Payment status unknown. Please check your transaction.');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        {status === 'loading' && (
          <div className="p-8">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Processing Payment</h1>
            <p className="text-gray-600">Please wait while we verify your transaction...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h1 className="text-xl font-semibold text-green-800 mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">This window will close automatically.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">❌</span>
            </div>
            <h1 className="text-xl font-semibold text-red-800 mb-2">Payment Failed</h1>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
              onClick={() => window.close()}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


