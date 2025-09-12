// MOONPAY SUCCESS PAGE - COMMENTED OUT
// This page is not currently used since we switched to Base Pay
// Keeping for future reference if MoonPay integration is needed

export default function MoonPaySuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Page Not Available</h1>
        <p className="text-gray-600 mb-4">This page is temporarily disabled.</p>
        <p className="text-sm text-gray-500">We've switched to Base Pay for payments.</p>
      </div>
    </div>
  );
}


