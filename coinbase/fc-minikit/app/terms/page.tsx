export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using CarMania NFT marketplace ("Service"), you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            CarMania is a digital marketplace for automotive-themed NFTs built on the Base blockchain. Users can purchase, trade, and interact with unique digital collectibles.
          </p>

          <h2>3. NFT Purchases</h2>
          <p>
            All NFT purchases are final and non-refundable. NFTs are digital assets that exist on the blockchain and are subject to blockchain network conditions.
          </p>

          <h2>4. Payment Methods</h2>
          <p>
            We accept various payment methods including:
            <ul>
              <li>Cryptocurrency payments (ETH, USDC)</li>
              <li>Credit and debit cards via MoonPay</li>
              <li>Apple Pay and Google Pay via CDP OnRamp</li>
            </ul>
          </p>

          <h2>5. User Responsibilities</h2>
          <p>
            Users are responsible for:
            <ul>
              <li>Maintaining the security of their wallet</li>
              <li>Complying with applicable laws and regulations</li>
              <li>Not engaging in fraudulent or illegal activities</li>
            </ul>
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            All content, trademarks, and intellectual property on this platform are owned by CarCulture or its licensors.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            CarMania shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.
          </p>

          <h2>9. Contact Information</h2>
          <p>
            For questions about these Terms of Service, please contact us at:
            <br />
            Email: legal@carculture.com
            <br />
            Address: [Your Business Address]
          </p>

          <p className="text-sm text-gray-600 mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}


