import { useState } from "react";
import { Fund, type FetchOnrampConfig } from "@coinbase/cdp-react";

// Mock functions for backend API calls
// In production, these would call your actual backend endpoints

const fetchOnrampConfig: FetchOnrampConfig = async () => {
  console.log("Fetching onramp config");
  
  // Mock response - CDP expects specific structure
  return {
    supportedAssets: [
      {
        id: "usdc",
        name: "USD Coin",
        symbol: "USDC",
        decimals: 6,
        network: "base",
        contractAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" // Base USDC
      }
    ],
    supportedFiatCurrencies: [
      {
        id: "usd",
        name: "US Dollar",
        symbol: "USD"
      }
    ],
    supportedCountries: [
      {
        id: "US",
        name: "United States",
        subdivisions: [
          {
            id: "NY",
            name: "New York"
          }
        ]
      }
    ],
    paymentMethods: [
      {
        id: "coinbase-account",
        name: "Coinbase Account",
        type: "coinbase_account",
        supportedCountries: ["US"]
      },
      {
        id: "debit-card",
        name: "Debit Card",
        type: "debit_card",
        supportedCountries: ["US"]
      }
    ]
  };
};

const fetchBuyQuote = async (params: {
  fiatCurrency: string;
  cryptoCurrency: string;
  fiatAmount?: number;
  cryptoAmount?: number;
  country: string;
  subdivision?: string;
}) => {
  console.log("Fetching buy quote with params:", params);
  
  // Mock response - CDP expects specific structure
  return {
    quoteId: "mock-quote-" + Date.now(),
    fiatCurrency: params.fiatCurrency,
    cryptoCurrency: params.cryptoCurrency,
    fiatAmount: params.fiatAmount || 100,
    cryptoAmount: params.cryptoAmount || 100,
    network: "base",
    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes
    totalFees: {
      fiatCurrency: params.fiatCurrency,
      amount: "2.50"
    },
    paymentMethods: [
      {
        id: "coinbase-account",
        name: "Coinbase Account",
        type: "coinbase_account"
      },
      {
        id: "debit-card", 
        name: "Debit Card",
        type: "debit_card"
      }
    ]
  };
};

const fetchBuyOptions = async (params: {
  fiatCurrency: string;
  cryptoCurrency: string;
  country: string;
  subdivision?: string;
}) => {
  console.log("Fetching buy options with params:", params);
  
  // Mock response - CDP expects specific structure
  return {
    buyOptions: [
      {
        id: "coinbase-account",
        name: "Coinbase Account",
        description: "Buy with your Coinbase account",
        minAmount: 10,
        maxAmount: 10000,
        fees: {
          percentage: 0.5,
          fixed: 0
        },
        paymentMethods: [
          {
            id: "coinbase-account",
            name: "Coinbase Account",
            type: "coinbase_account"
          }
        ]
      },
      {
        id: "debit-card",
        name: "Debit Card",
        description: "Buy with debit card (guest checkout)",
        minAmount: 25,
        maxAmount: 1000,
        fees: {
          percentage: 3.5,
          fixed: 0
        },
        paymentMethods: [
          {
            id: "debit-card",
            name: "Debit Card",
            type: "debit_card"
          }
        ]
      }
    ]
  };
};

interface USDCOnrampProps {
  onSuccess?: (transactionHash: string) => void;
  onError?: (error: string) => void;
}

function USDCOnramp({ onSuccess, onError }: USDCOnrampProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuySuccess = (transactionHash: string) => {
    console.log("USDC purchase successful:", transactionHash);
    setIsModalOpen(false);
    onSuccess?.(transactionHash);
  };

  const handleBuyError = (error: any) => {
    console.error("USDC purchase failed:", error);
    onError?.(error.message || "Purchase failed");
  };

  return (
    <div className="card">
      <h3>USDC Onramp</h3>
      <p>Fund your wallet with USDC using Coinbase Onramp</p>
      
      <button 
        className="button button--primary"
        onClick={() => setIsModalOpen(true)}
      >
        Buy USDC
      </button>

      {isModalOpen && (
        <Fund
          country="US"
          subdivision="NY"
          cryptoCurrency="usdc"
          fiatCurrency="usd"
          fetchOnrampConfig={fetchOnrampConfig}
          fetchBuyQuote={fetchBuyQuote}
          fetchBuyOptions={fetchBuyOptions}
          network="base"
          onSuccess={handleBuySuccess}
          onError={handleBuyError}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default USDCOnramp;
