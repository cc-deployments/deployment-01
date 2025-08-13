# Force new deployment
# Trigger Vercel deployment Mon Jun 30 02:14:01 EDT 2025
# Trigger Vercel deployment Mon Jun 30 02:23:09 EDT 2025
# Test Cloudflare deployment - Token updated 2025-07-26
# Test Cloudflare deployment - Token permissions updated with Memberships 2025-07-26

# Deployment & Troubleshooting Notes (2025-06-30)

## Vercel Deployment
- The app is deployed at:
  - https://web3-social-starter-carculture-mini.vercel.app/
- If you see a 404 or blank preview, check that your `app` or `pages` directory exists and is correctly configured.
- Make sure all required environment variables (like `NEXT_PUBLIC_PRIVY_APP_ID`) are set in the Vercel dashboard under **Settings → Environment Variables**.

## Dependencies
- All dependencies must be listed in `package.json` for Vercel to install them.
- If you add a new package locally, always run `npm install` and commit the updated `package.json` (and `package-lock.json` if present).

## Component Paths
- Place all shared components in `cb-minikit/components/`.
- Double-check import paths if you move files or refactor folders.

## Common Errors
- **404 on deploy:** Usually means missing or misconfigured `app` or `pages` directory.
- **Module not found:** Check that the file exists and the import path is correct.
- **Privy App ID error:** Set `NEXT_PUBLIC_PRIVY_APP_ID` in Vercel environment variables.

## APP Dev

### Local Setup
1. `npm install`
2. `npm run dev` (default port: 3000)

### Folder Structure
- `app/components/` – Shared React components (e.g., ShareArrow, PrivyLogin)
- `app/gallery-hero/` – Hero page and related UI
- `app/gallery-hero-2/`, `app/text-page/` – Gallery navigation flow
- `packages/sharedauth/` – Shared authentication logic

### Development Workflow
- Use feature branches for new work.
- Commit early and often; keep commit messages descriptive.
- Run locally and test navigation, wallet connection, and gallery flows before pushing.

### Common Issues
- **Wallet not connecting:** Check Privy and wagmi integration in `providers.tsx`.
- **OnchainKit name resolution:** Requires API key with Identity/Profile permissions.
- **Port conflicts:** If `npm run dev` fails, try another port (e.g., `PORT=3002 npm run dev`).

### Deployment
- Deploys via Vercel. See `vercel.json` for config.
- Set all required environment variables in the Vercel dashboard.

### TODOs & Roadmap
- [ ] Add visual indicators for gestures
- [ ] Clean up console warnings
- [ ] Test all wallet types and navigation flows

### Issues: ENS Display & Privy in SharedAuth (2025-07-12)

1. **ENS/Basename Not Displaying**
   - OnchainKit `<Name />` always showed “(none found)” for ENS or Basename, even when the connected wallet owned a name.
   - Tried multiple API keys (with “View” permission only); wallet address was correct.
   - Suspected cause: OnchainKit API key likely needs “Identity” or “Profile” permissions, not just “View.” Awaiting CDP support.

2. **Privy & wagmi State Sync Issues**
   - After Privy sign-in, `wagmi`’s `useAccount().isConnected` was `false`, even though the wallet address was present.
   - Updated Providers to use Privy’s wagmi connector; address available but connection state not syncing.
   - Impact: UI (including ENS display) was gated on `isConnected`, so profile/name never showed.

3. **SharedAuth Integration**
   - Shared authentication logic in `packages/sharedauth/` was not consistently syncing Privy and wagmi state across the app.
   - Ensured all auth libraries were imported only from the shared package; checked for duplicate/conflicting providers.
   - Impact: Inconsistent wallet connection state and unreliable ENS/name resolution.

4. **API Key Permissions Unclear**
   - OnchainKit API keys from dashboard only had “View” permission.
   - Opened support ticket with CDP to clarify required permissions for name resolution; “Identity” or “Profile” likely needed.
   - Blocked on resolving name display until correct API key permissions are granted.

## Auth Pattern: Shared Only

- All authentication libraries (e.g., @privy-io/react-auth) must be imported only from the shared package (@cculture/privy).
- Direct imports of auth libraries in app packages are forbidden and enforced by ESLint (see .eslintrc).
- This ensures consistency and prevents dependency duplication across the monorepo.

---

# TODO (2025-06-30)

- [ ] Build a Farcaster (FC) Mini App using Minikit:
    - Use the [Minikit starter](https://v0-minikit.vercel.app/) as a template.
    - Deploy to Vercel.
    - Set all required environment variables (`NEXT_PUBLIC_URL`, etc.).
    - Create a Farcaster manifest and verify with your custody wallet.
    - Test in Warpcast dev tools and share!

---

Rest well! You made huge progress today.
# Testing Vercel auto-detection without overrides
# Testing Vercel auto-detection after cache purge
