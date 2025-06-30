# Force new deployment
# Trigger Vercel deployment Mon Jun 30 02:14:01 EDT 2025
# Trigger Vercel deployment Mon Jun 30 02:23:09 EDT 2025

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
