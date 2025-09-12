export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you:
            <ul>
              <li>Create an account or profile</li>
              <li>Make purchases or transactions</li>
              <li>Contact us for support</li>
              <li>Participate in our services</li>
            </ul>
          </p>

          <h2>2. Types of Information</h2>
          <p>
            <strong>Personal Information:</strong>
            <ul>
              <li>Email address and contact information</li>
              <li>Wallet addresses and transaction data</li>
              <li>Payment information (processed securely by third parties)</li>
            </ul>
          </p>

          <p>
            <strong>Usage Information:</strong>
            <ul>
              <li>Device information and IP address</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent on our service</li>
            </ul>
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze usage patterns</li>
            </ul>
          </p>

          <h2>4. Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties except:
            <ul>
              <li>With payment processors (MoonPay, CDP OnRamp) for transaction processing</li>
              <li>When required by law or to protect our rights</li>
              <li>With your explicit consent</li>
            </ul>
          </p>

          <h2>5. Blockchain and Public Information</h2>
          <p>
            Please note that blockchain transactions are public and permanent. Wallet addresses and transaction data may be visible on the blockchain.
          </p>

          <h2>6. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>7. Third-Party Services</h2>
          <p>
            Our service integrates with third-party payment providers:
            <ul>
              <li><strong>MoonPay:</strong> For credit card payments - see their privacy policy</li>
              <li><strong>CDP OnRamp:</strong> For fiat-to-crypto conversions - see Coinbase's privacy policy</li>
              <li><strong>Base Network:</strong> For blockchain transactions</li>
            </ul>
          </p>

          <h2>8. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to enhance your experience and analyze usage patterns. You can control cookie settings through your browser.
          </p>

          <h2>9. Your Rights</h2>
          <p>
            You have the right to:
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of certain communications</li>
            </ul>
          </p>

          <h2>10. Children's Privacy</h2>
          <p>
            Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13.
          </p>

          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            Email: privacy@carculture.com
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


