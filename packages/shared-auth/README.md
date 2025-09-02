# Shared Auth Package

A comprehensive authentication and payment solution for CCulture applications, including Base Pay integration.

## Features

- **Multi-Provider Authentication**: Support for Wagmi, Privy, and MiniKit
- **Base Pay Integration**: Accept USDC payments with Base Pay
- **Shared Components**: Reusable UI components for authentication and payments
- **TypeScript Support**: Full type safety across all components

## Base Pay Integration

Base Pay allows you to accept USDC payments without requiring users to connect a wallet. It works seamlessly alongside your existing Wagmi setup.

### Quick Start

```tsx
import { BasePayButton, useBasePay } from '@cculture/shared-auth';

function CheckoutPage() {
  const { pay, isProcessing, lastPayment } = useBasePay();

  const handlePayment = async () => {
    try {
      const result = await pay({
        amount: '5.00',
        to: '0xYourAddress',
        testnet: true, // Set to false for mainnet
        payerInfo: {
          email: true,
          name: true,
        },
      });
      console.log('Payment successful:', result);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <BasePayButton
      config={{
        amount: '5.00',
        to: '0xYourAddress',
        testnet: true,
      }}
      onSuccess={(result) => console.log('Success:', result)}
      onError={(error) => console.error('Error:', error)}
    />
  );
}
```

### Components

#### BasePayButton

A ready-to-use button component for Base Pay payments.

```tsx
<BasePayButton
  config={{
    amount: '10.00',
    to: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    testnet: true,
  }}
  onSuccess={(result) => {
    // Handle successful payment
  }}
  onError={(error) => {
    // Handle payment error
  }}
  variant="primary" // 'primary' | 'secondary' | 'outline'
  size="md" // 'sm' | 'md' | 'lg'
/>
```

#### BasePayModal

A modal component for more complex payment flows.

```tsx
<BasePayModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  config={{
    amount: '25.00',
    to: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    testnet: true,
  }}
  title="Complete Your Purchase"
  description="This payment will be processed securely using Base Pay."
/>
```

#### BasePayExample

A complete example component showing all Base Pay features.

```tsx
<BasePayExample
  recipientAddress="0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"
  defaultAmount="5.00"
  testnet={true}
/>
```

### Hooks

#### useBasePay

The main hook for Base Pay functionality.

```tsx
const {
  pay,           // Function to initiate payment
  getPaymentStatus, // Function to check payment status
  reset,         // Function to reset state
  isProcessing,  // Boolean indicating if payment is in progress
  lastPayment,   // Last payment result
  error,         // Any error that occurred
} = useBasePay();
```

### Configuration

#### BasePayConfig

```tsx
interface BasePayConfig {
  amount: string;        // Amount in USDC (e.g., "5.00")
  to: string;           // Recipient address
  testnet?: boolean;    // Use testnet (default: true)
  payerInfo?: {         // Optional user information collection
    email?: boolean;
    phone?: boolean;
    name?: boolean;
  };
  callbackUrl?: string; // Optional callback URL for server-side validation
}
```

#### BasePayResult

```tsx
interface BasePayResult {
  id: string;                    // Payment ID
  status: 'pending' | 'completed' | 'failed';
  amount: string;                // Amount paid
  to: string;                   // Recipient address
  transactionHash?: string;     // Blockchain transaction hash
  error?: string;               // Error message if failed
}
```

### Integration with Wagmi

Base Pay works independently of wallet connections, but you can display wallet information alongside payments:

```tsx
import { useAccount } from 'wagmi';
import { BasePayButton } from '@cculture/shared-auth';

function PaymentPage() {
  const { address, isConnected } = useAccount();

  return (
    <div>
      {isConnected && (
        <p>Connected wallet: {address}</p>
      )}
      
      <BasePayButton
        config={{
          amount: '10.00',
          to: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
          testnet: true,
        }}
      />
    </div>
  );
}
```

### Error Handling

```tsx
const { pay, error } = useBasePay();

const handlePayment = async () => {
  try {
    const result = await pay(config);
    // Handle success
  } catch (error) {
    if (error.message.includes('User cancelled')) {
      // User cancelled the payment
    } else if (error.message.includes('Insufficient funds')) {
      // Insufficient USDC balance
    } else {
      // Other error
    }
  }
};
```

### Styling

All components use Tailwind CSS classes and can be customized:

```tsx
<BasePayButton
  config={config}
  className="w-full bg-green-600 hover:bg-green-700"
  variant="primary"
  size="lg"
/>
```

### Best Practices

1. **Always use testnet for development**: Set `testnet: true` during development
2. **Handle errors gracefully**: Always provide error handling for payment failures
3. **Collect user information when needed**: Use `payerInfo` to collect email/phone for receipts
4. **Validate payments server-side**: Use `callbackUrl` for server-side payment validation
5. **Follow brand guidelines**: When using Base Pay, follow the official brand guidelines

### Dependencies

- `@base-org/account`: Base Account SDK for payment processing
- `wagmi`: For wallet connection (optional)
- `react`: React hooks and components
- `tailwindcss`: For styling (optional)

## Installation

```bash
npm install @cculture/shared-auth
```

## License

MIT
