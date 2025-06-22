# MiniKit Integration Setup Guide

## 🚀 What's Been Implemented

✅ **Frontend Integration**
- `useMiniKit` hook for frame readiness
- `useAddFrame` hook for adding to Farcaster
- `useNotification` hook for Duolingo-style notifications
- MiniKitProvider wrapping the entire app

✅ **Backend Infrastructure**
- Notification proxy at `/api/notification`
- Redis dependencies added
- Farcaster.json configuration template

## 🔧 Setup Steps Required

### 1. Install Dependencies
```bash
cd coinbase/carculture-miniapp
npm install
```

### 2. Environment Variables
Copy `env.example` to `.env.local` and fill in your values:

```bash
cp env.example .env.local
```

**Required Variables:**
- `NEXT_PUBLIC_PROJECT_ID`: Get from [Coinbase Wallet Cloud](https://cloud.wallet.coinbase.com/)
- `UPSTASH_REDIS_REST_URL`: Your Upstash Redis URL
- `UPSTASH_REDIS_REST_TOKEN`: Your Upstash Redis token
- `FARCASTER_API_KEY`: Your Farcaster API key
- `NEXT_PUBLIC_APP_URL`: Your deployed domain

### 3. Farcaster Account Association
Update `public/.well-known/farcaster.json`:

1. **Generate Account Association** using MiniKit CLI:
   ```bash
   npx create-onchain --mini
   ```
   This will generate the required `header`, `payload`, and `signature` values.

2. **Update Domain URLs** in the file:
   - Replace `<your-domain>` with your actual domain
   - Update `iconUrl` and `splashImageUrl` paths

### 4. Redis Setup (Upstash)
1. Sign up at [upstash.com](https://upstash.com)
2. Create a new Redis database
3. Copy the REST URL and token to your `.env.local`

### 5. Farcaster API Key
1. Get your API key from [Farcaster API](https://api.farcaster.xyz/)
2. Add it to your `.env.local`

## 🎯 Duolingo-Style Notifications

The app now includes engaging notifications:
- **Mint Success**: "🎉 CarMania NFT Minted!"
- **Daily Reminders**: "🚗 New CarMania Drop Live!"
- **Streak Motivation**: "Don't break your streak!"

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

### Environment Variables in Vercel
Add all variables from `.env.local` to your Vercel project settings.

## 🔍 Testing

1. **Local Development**:
   ```bash
   npm run dev
   ```

2. **Test Notifications**:
   - Mint an NFT
   - Check browser console for notification logs
   - Verify Farcaster integration

3. **Test Frame Addition**:
   - Click "Add App to Farcaster"
   - Verify in Farcaster app

## 📱 MiniKit Features Implemented

- ✅ **Frame Ready Signal**: App properly signals when ready
- ✅ **Add to Farcaster**: Users can add the app to their frames
- ✅ **Notifications**: Duolingo-style engagement notifications
- ✅ **Social Integration**: Seamless Farcaster experience

## 🎨 Customization

### Notification Messages
Edit notification text in `CarMintCard.tsx`:
```typescript
sendNotification({
  title: '🎉 CarMania NFT Minted!',
  body: `You just added ${activeCar?.carName} to your collection!`
});
```

### Frame Configuration
Update `farcaster.json` for:
- App name and branding
- Splash screen appearance
- Icon and preview images

## 🐛 Troubleshooting

### Common Issues:
1. **Notifications not working**: Check Farcaster API key and Redis connection
2. **Frame not adding**: Verify account association in `farcaster.json`
3. **Environment variables**: Ensure all are set in production

### Debug Mode:
Add to `.env.local`:
```
DEBUG=true
```

## 📞 Support

- [MiniKit Documentation](https://docs.base.org/wallet-app/build-with-minikit/overview)
- [Farcaster API Docs](https://api.farcaster.xyz/)
- [Upstash Redis Docs](https://docs.upstash.com/redis)

---

**Next Steps**: Complete the environment setup and deploy to test the full MiniKit integration! 