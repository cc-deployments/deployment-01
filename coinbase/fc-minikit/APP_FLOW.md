# CarMania App - User Flow & Organization

## 📍 Project Location
**Project Root:** `coinbase/fc-minikit/`

This is the main directory containing your CarMania app. All files and folders mentioned below are relative to this project root.

## 🚀 Deployment & URLs

### **Vercel Deployment**
- **Production URL:** https://web3-social-starter-fc-minikit.vercel.app
- **Manifest URL:** https://web3-social-starter-fc-minikit.vercel.app/.well-known/farcaster.json
- **Build Status:** ✅ Auto-deploys on git push to main branch
- **Environment:** Production environment with environment variables

### **Local Development**
- **Dev Server:** `npm run dev` (runs on http://localhost:3000)
- **Local Manifest:** http://localhost:3000/.well-known/farcaster.json
- **Hot Reload:** Enabled for development

### **Dynamic Manifest System**
**IMPORTANT:** The entire app is driven by a dynamic manifest API. There is NO static manifest file.

- **Manifest API Route:** `app/.well-known/farcaster.json/route.ts`
- **Manifest Endpoint:** `/.well-known/farcaster.json` (served dynamically)
- **Purpose:** All Farcaster embed data, app metadata, and configuration is served dynamically
- **Updates:** Changes to the manifest require updating the API route and redeploying
- **Structure:** Uses proper Farcaster Mini App manifest structure with `miniapp` wrapper
- **Key Fields:** `splashImageUrl`, `iconUrl`, `heroImageUrl`, `screenshotUrls` (not `splash`, `icon`, etc.)

## ✅ EMBED VALIDATION - RESOLVED (2025-07-20)

### **Embed Status: VALID** ✅
- **FC Embed Tool:** https://miniapps.farcaster.xyz/tools/embed
- **Domain:** `web3-social-starter-fc-minikit.vercel.app`
- **Status:** All checks passed (HTTP 200, Embed Present, Embed Valid)
- **Preview:** Shows "CARMANIA" with car image and "Unlock the Ride" button

### **Key Fixes Implemented:**
1. **✅ Corrected Manifest Structure:** Changed from `"frame"` to `"miniapp"` structure
2. **✅ Added Embed Meta Tags:** `fc:miniapp` and `fc:frame` meta tags in HTML head
3. **✅ Removed Duplicate Metadata:** Single source of truth in root layout
4. **✅ Fixed TypeScript Errors:** Removed incorrect JSX usage of FarcasterMetaTags
5. **✅ Cloudflare R2 Integration:** Embed image accessible at `https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png`

### **Embed Meta Tags Configuration:**
```html
<meta name="fc:miniapp" content='{"version":"1","imageUrl":"https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png","button":{"title":"Unlock the Ride","action":{"type":"launch_miniapp","url":"https://web3-social-starter-fc-minikit.vercel.app/gallery-hero","name":"Car Culture: CarMania Garage","splashImageUrl":"https://i.imgur.com/y3PmlLB.jpeg","splashBackgroundColor":"#a32428"}}}' />
<meta name="fc:frame" content='{"version":"1","imageUrl":"https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png","button":{"title":"Unlock the Ride","action":{"type":"launch_frame","url":"https://web3-social-starter-fc-minikit.vercel.app/gallery-hero","name":"Car Culture: CarMania Garage","splashImageUrl":"https://i.imgur.com/y3PmlLB.jpeg","splashBackgroundColor":"#a32428"}}}' />
```

## 🎯 Farcaster Mini App Resources

### **Loading Guide**
- **URL:** https://miniapps.farcaster.xyz/docs/guides/loading
- **Purpose:** How to load and test your Mini App in the Farcaster environment
- **Key Topics:** Development setup, testing procedures, debugging

### **Publishing Guide**
- **URL:** https://miniapps.farcaster.xyz/docs/guides/publishing
- **Purpose:** How to publish your Mini App to the Farcaster ecosystem
- **Key Topics:** Submission process, review guidelines, deployment

### **Embed Tool**
- **URL:** https://miniapps.farcaster.xyz/tools/embed
- **Purpose:** Test embed validation and preview
- **Status:** ✅ Working - All validation checks passed

## 📱 App Pages & Navigation

### **Main Pages & Image Assets:**
1. **Gallery Hero** (`/gallery-hero`) - Main car showcase with swipe navigation
   - **Image:** `/carmania-gallery-hero.png`
2. **Gallery Hero 2** (`/gallery-hero-2`) - Alternative car showcase  
   - **Image:** `/carmania-gallery-hero-2.png`
3. **Text Page** (`/text-page`) - Information page with "Unlock the Ride" button
   - **Image:** `/text-page.png`
4. **Manifold Gallery** (`/manifold-gallery`) - NFT gallery integration
   - **Data Source:** SQL database (`carculture_content_schedule.csv`)
   - **External Link:** https://manifold.xyz/@carculture
5. **Social Identity** (`/socialidentity`) - Wallet connection and identity features

### **Navigation Flow:**
- **Swipe Up:** Navigate to next page
- **Swipe Down:** Navigate to previous page
- **Button Click:** Launch external links (Manifold, etc.)

## 🔧 Technical Implementation

### **SDK Integration:**
- **Farcaster Mini App SDK:** `@farcaster/miniapp-sdk`
- **SDK Initialization:** Automatic in each page component
- **Ready State:** `sdk.actions.ready()` called on page load

### **Responsive Design:**
- **Aspect Ratio:** 1260x2400px maintained across devices
- **Mobile Optimization:** Touch events and swipe detection
- **Desktop Support:** Mouse events and keyboard navigation

### **Image Assets:**
- **Cloudflare R2:** Public bucket for embed images
- **Embed Image:** `https://pub-af4818e955f442b2931c620d7cdee98e.r2.dev/carmania-share.png`
- **Local Images:** Stored in `public/` directory

## 🚀 Next Steps

### **Immediate:**
- ✅ **Embed validation working**
- ✅ **App deployed and functional**
- ✅ **Manifest structure correct**

### **Future Enhancements:**
- [ ] **Test in Farcaster Preview Tool**
- [ ] **Submit to Farcaster Mini App directory**
- [ ] **Add more car showcases**
- [ ] **Enhance wallet integration**

---

**Last Updated:** 2025-07-20  
**Status:** ✅ Embed validation successful - App ready for Farcaster ecosystem