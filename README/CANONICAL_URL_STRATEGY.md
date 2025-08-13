# Canonical URL Strategy for CarCulture: CarMania Garage

## 🎯 **Current Situation**
- **App**: CarCulture: CarMania Garage Mini App
- **Current Hosting**: Vercel (requires Pro plan for private repos)
- **Security Issue**: Public GitHub exposure via `flatout` organization
- **Goal**: Private deployment with secure canonical URL

## 🚀 **Hosting Decision: Cloudflare**

### **Why Cloudflare Over Vercel:**
- **Free tier** supports private repositories
- **BASE approved** for Mini App hosting
- **Dynamic app support** (Redis/Upstash integration)
- **Professional domains** available
- **No $20/month Pro plan requirement**

### **BASE Confirmation:**
- Cloudflare deployment with canonical URL is acceptable
- Mini Apps can be hosted on any platform
- Dynamic functionality preserved

## 🔒 **Security Migration Status**

### **Completed:**
- ✅ Created `cc-deployments` private GitHub organization
- ✅ Created `deployment-01` generic repository name
- ✅ Migrated working codebase to private repo
- ✅ Removed public exposure of `flatout/web3-social-starter`

### **Pending:**
- ⏳ Deploy to Cloudflare
- ⏳ Update Farcaster manifest with new canonical URL
- ⏳ Remove hardcoded Vercel URLs from manifest

## 🌐 **Canonical URL Strategy**

### **Target Structure:**
```
carculture.com (main site - Shopify)
├── miniapp.carculture.com (Mini App - Cloudflare)
├── shop.carculture.com (e-commerce - Shopify)
└── newsletter.carculture.com (Paragraph.xyz)
```

### **Mini App Domain Options:**
1. **miniapp.carculture.com** (recommended)
2. **carmania.carculture.com** (brand specific)
3. **garage.carculture.com** (thematic)

## 📱 **Farcaster Manifest Updates Needed**

### **Current Hardcoded URLs (to be updated):**
- `homeUrl`: Vercel deployment
- `iconUrl`: Vercel assets
- `splashImageUrl`: Vercel assets
- `screenshotUrls`: Vercel assets
- `castShareUrl`: Vercel deployment

### **New URLs (after Cloudflare deployment):**
- All URLs should point to Cloudflare domain
- Maintain same asset structure
- Ensure proper Mini App recognition

## 🎯 **Next Steps**
1. **Deploy to Cloudflare** using private repository
2. **Update manifest** with new canonical URL
3. **Test Mini App** functionality on new domain
4. **Verify Farcaster recognition** and button functionality
5. **Launch publicly** with secure, private deployment

## 🔍 **Testing Requirements**
- ✅ Mini App loads in Coinbase Wallet
- ✅ Navigation (swipes) work properly
- ✅ Buttons function correctly
- ✅ Frame ready state achieved
- ✅ No console errors
- ✅ Proper Mini App recognition

---
*Last Updated: August 12, 2025*
*Status: Ready for Cloudflare deployment*


