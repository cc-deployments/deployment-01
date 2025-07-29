# CarMania Farcaster Mini App

A Farcaster Mini App built with Next.js 14/15 and MiniKit for Base App compatibility.

## Features

- **Farcaster Mini App**: Compatible with Base App and Farcaster ecosystem
- **MiniKit Integration**: Uses `@coinbase/onchainkit/minikit` hooks for optimal compatibility
- **Responsive Design**: Mobile-first design with proper safe area handling
- **Swipe Navigation**: Intuitive gesture-based navigation between pages
- **Universal Sharing**: Cross-platform sharing functionality

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
