// carculture-landing/src/components/SignupForm.tsx

'use client';

import { useState } from 'react';

interface SignupFormProps {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  className?: string;
}

export function SignupForm({ onSuccess, onError, className = '' }: SignupFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    interests: [] as string[],
    wallet_address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const interestOptions = [
    'Daily NFT Drops',
    'Automotive Art',
    'Classic Cars',
    'Modern Cars',
    'DRIVR AI Assistant',
    'Community Events',
    'Exclusive Collections',
    'Market Insights'
  ];

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmData = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign')
      };

      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ...utmData
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        onSuccess?.(result);
        
        // Track signup event
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'signup', {
            event_category: 'engagement',
            event_label: 'email_signup'
          });
        }
      } else {
        throw new Error(result.error || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      onError?.(error instanceof Error ? error.message : 'Signup failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={`p-6 bg-green-50 border border-green-200 rounded-lg ${className}`}>
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-green-900 mb-2">Welcome to CarCulture!</h3>
          <p className="text-green-700">
            You're now part of our community. Check your email for updates and exclusive content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Enter your email"
        />
      </div>

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name (Optional)
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Your name"
        />
      </div>

      {/* Wallet Address Field */}
      <div>
        <label htmlFor="wallet" className="block text-sm font-medium text-gray-700 mb-2">
          Wallet Address (Optional)
        </label>
        <input
          type="text"
          id="wallet"
          value={formData.wallet_address}
          onChange={(e) => setFormData(prev => ({ ...prev, wallet_address: e.target.value }))}
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="0x... (for exclusive NFT access)"
        />
        <p className="text-xs text-gray-400 mt-1">
          Connect your wallet for exclusive NFT drops and DRIVR agent access
        </p>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          What interests you? (Select all that apply)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {interestOptions.map((interest) => (
            <label key={interest} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.interests.includes(interest)}
                onChange={() => handleInterestChange(interest)}
                className="w-4 h-4 text-red-600 bg-white/10 border-white/20 rounded focus:ring-red-500"
              />
              <span className="text-sm text-gray-300">{interest}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !formData.email}
        className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Joining...' : 'Join the Community'}
      </button>

      {/* Privacy Notice */}
      <p className="text-xs text-gray-400 text-center">
        We respect your privacy. Unsubscribe at any time. No spam, just car culture.
      </p>
    </form>
  );
}

