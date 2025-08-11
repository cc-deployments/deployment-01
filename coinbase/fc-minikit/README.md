# CarMania Farcaster Mini App

A Farcaster Mini App built with Next.js 14/15 and MiniKit for Base App compatibility.

## Features

- **Farcaster Mini App**: Compatible with Base App and Farcaster ecosystem
- **MiniKit Integration**: Uses `@coinbase/onchainkit/minikit` hooks for optimal compatibility
- **Responsive Design**: Mobile-first design with proper safe area handling
- **Swipe Navigation**: Intuitive gesture-based navigation between pages
- **Universal Sharing**: Cross-platform sharing functionality

## Environment Variables

### Production URL:
**Current Vercel Deployment:** `https://web3-social-starter-fc-minikit.vercel.app/`

### Required for Production (Vercel):

#### Core App Configuration:
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY` - OnchainKit API key for CBW integration
- `NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME` - Project name displayed in CBW
- `NEXT_PUBLIC_URL` - Production URL for the app
- `NEXT_PUBLIC_ICON_URL` - App icon URL for CBW display

#### Authentication & Wallets:
- `NEXT_PUBLIC_PRIVY_APP_ID` - Privy authentication service
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - WalletConnect integration
- `NEXT_PUBLIC_WC_PROJECT_ID` - WalletConnect project ID (duplicate of above)

#### External Services:
- `NEYNAR_API_KEY` - Farcaster notifications and API access
- `REDIS_URL` - Redis connection for caching
- `REDIS_TOKEN` - Redis authentication token

#### Farcaster Integration:
- `FARCASTER_HEADER` - Farcaster authentication headers
- `FARCASTER_PAYLOAD` - Farcaster request payloads
- `FARCASTER_SIGNATURE` - Farcaster request signing

#### Upcoming Integrations (BASE PAY/Rainbow):
- `COINBASE_API_KEY` - BASE PAY integration (coming this week)
- `COINBASE_CLIENT_ID` - OAuth flows for wallet connections
- `COINBASE_CLIENT_SECRET` - OAuth flows for wallet connections
- `COINBASE_REDIRECT_URI` - OAuth redirects for wallet auth

### Local Development:
Create a `.env.local` file in the `coinbase/fc-minikit/` directory with the same variables for local testing.

### Shared Auth Package:
Some API keys are centralized in `packages/shared-auth/config/index.ts`:
- `NEYNAR_API_KEY` - Centralized Neynar API key
- `PRIVY_APP_ID` - Centralized Privy App ID

## MiniKit Hooks Implementation

### Navigation & URL Opening
- **`useOpenUrl()`**: Used for external links and page navigation
- **Example**: `openUrl('https://app.manifold.xyz/c/light-bulb-moment')`

### Universal Sharing
- **`useComposeCast()`**: The correct MiniKit hook for universal sharing across all environments
- **Works on**: Desktop, mobile, and Farcaster Frame environments
- **Implementation**:
  ```tsx
  import { useComposeCast } from '@coinbase/onchainkit/minikit';
  
  export default function ShareButton() {
    const { composeCast } = useComposeCast();
  
    const handleShare = () => {
      composeCast({
        text: 'Check out this awesome content!',
        embeds: ['https://your-app-url.com'], // Optional
      });
    };
  
    return (
      <button onClick={handleShare}>
        Share
      </button>
    );
  }
  ```

**Key Points:**
- `useComposeCast` works universally across desktop, mobile, and Farcaster Frame environments
- Opens the Farcaster compose interface with pre-filled content
- Can include text and optional embeds (URLs)
- Recommended approach over custom sharing implementations
- Official SDK function ensures best user experience across all supported clients

## Mobile Compatibility

### Touch Gesture Conflicts
Mobile devices can experience touch gesture conflicts where native gestures (swipes, taps) interfere with app interactions. This is resolved using:

```tsx
setFrameReady({ disableNativeGestures: true });
```

**Implementation Locations:**
- `app/gallery-hero/page.tsx`
- `app/text-page/page.tsx` 
- `app/gallery-hero-2/page.tsx`

**Why This Works:**
Mini Apps run in modal containers where native gestures can automatically close the app. When your app uses similar touch gestures, they conflict with these native dismissal behaviors. `disableNativeGestures: true` prevents these conflicts.

## Project Structure

```
app/
├── gallery-hero/          # Main landing page
├── text-page/            # Information page
├── gallery-hero-2/       # Additional gallery page
├── share/                # Share functionality
└── components/           # Reusable components
```

## Development

```bash
npm run dev
```

Visit `http://localhost:3000/gallery-hero` to see the app.

## Deployment

The app is deployed on Vercel and configured for Farcaster Mini App compatibility.
# Force Vercel deployment
# Force Vercel rebuild - Tue Jul 29 11:56:21 EDT 2025
# Force Vercel rebuild - Tue Jul 29 12:31:47 EDT 2025
