# CarMania App - User Flow & Organization

## 📍 Project Location
**Project Root:** `coinbase/fc-minikit/`

This is the main directory containing your CarMania app. All files and folders mentioned below are relative to this project root.

## 🚀 Farcaster Mini App Resources

### **Loading Guide**
- **URL:** https://miniapps.farcaster.xyz/docs/guides/loading
- **Purpose:** How to load and test your Mini App in the Farcaster environment
- **Key Topics:** Development setup, testing procedures, debugging

### **Publishing Guide**
- **URL:** https://miniapps.farcaster.xyz/docs/guides/publishing
- **Purpose:** How to publish your Mini App to the Farcaster ecosystem
- **Key Topics:** Submission process, review guidelines, deployment

## 📱 How Users Navigate Through Your App

### **Page 1: Landing Page** (`/`)
- **File:** `app/page.tsx`
- **Image:** `carmania-gallery-hero.png`
- **What users see:** Main CarMania hero image with share button
- **User action:** Swipe up to go to gallery-hero
- **Purpose:** Welcome users to the app

### **Page 2: Gallery Hero** (`/gallery-hero`)
- **File:** `app/gallery-hero/page.tsx`
- **Image:** `carmania-gallery-hero.png`
- **What users see:** CarMania gallery image with "Unlock the Ride" button and share arrow
- **User action:** 
  - Tap "Unlock the Ride" → Opens Manifold mint page
  - Swipe up → Goes to gallery-hero-2
  - Tap share arrow → Shares the app
- **Purpose:** Main gallery entry point with mint functionality

### **Page 3: Gallery Hero 2** (`/gallery-hero-2`)
- **File:** `app/gallery-hero-2/page.tsx`
- **Image:** `carmania-gallery-hero-2.png`
- **What users see:** Second gallery image (full screen)
- **User action:** 
  - Tap anywhere → Opens Manifold mint page
  - Swipe up → Goes to text-page
- **Purpose:** Additional gallery content with mint access

### **Page 4: Text Page** (`/text-page`)
- **File:** `app/text-page/page.tsx`
- **Image:** `text-page.png` (1260×2400px)
- **What users see:** Text content with invisible "Unlock the Ride" button overlay
- **User action:** 
  - Tap invisible button area (300px wide) → Opens Manifold mint page
  - Swipe up → Opens CarCulture Manifold profile
- **Debug features:** Toggle button for overlay visualization, container bounds display
- **Purpose:** Final content page with mint and profile links

## 🔄 Navigation Flow Summary

```
Landing Page (/) 
    ↓ (swipe up)
Gallery Hero (/gallery-hero)
    ↓ (swipe up)
Gallery Hero 2 (/gallery-hero-2)
    ↓ (swipe up)
Text Page (/text-page)
    ↓ (swipe up)
Manifold Profile (external)
```

## 🎯 Key User Actions

1. **Minting:** Users can mint at multiple points:
   - Gallery Hero page ("Unlock the Ride" button)
   - Gallery Hero 2 page (tap anywhere)
   - Text Page (invisible "Unlock the Ride" button overlay - 300px wide interactive area)

2. **Sharing:** Share arrow appears on:
   - Landing page
   - Gallery Hero page

3. **Social Identity:** Button appears on:
   - Gallery Hero page (top right)

4. **Debug Features:** Available on all pages:
   - Debug toggle button (top-left corner)
   - Container bounds visualization (red border)
   - Button position overlays (yellow/cyan highlights)

## 📁 File Organization

```
coinbase/fc-minikit/
├── app/
│   ├── page.tsx              # Landing page (/)
│   ├── gallery-hero/
│   │   └── page.tsx         # Gallery Hero page (/gallery-hero)
│   ├── gallery-hero-2/
│   │   └── page.tsx         # Gallery Hero 2 page (/gallery-hero-2)
│   ├── text-page/
│   │   └── page.tsx         # Text page (/text-page)
│   ├── components/
│   │   └── ShareArrow.tsx   # Reusable share component
│   └── layout.tsx           # App-wide layout
├── public/
│   ├── carmania-gallery-hero.png
│   ├── carmania-gallery-hero-2.png
│   ├── text-page.png
│   └── splash.png
└── APP_FLOW.md              # This documentation file
```

## 🖼️ Image Mapping

- **Landing Page:** `carmania-gallery-hero.png`
- **Gallery Hero:** `carmania-gallery-hero.png`
- **Gallery Hero 2:** `carmania-gallery-hero-2.png`
- **Text Page:** `text-page.png`
- **Farcaster Splash:** `splash.png` (handled by Farcaster SDK)

## 🎨 Design Consistency

- **Size:** All pages use 1260px width × 2400px height
- **Images:** 1260px × 2400px full container coverage
- **Buttons:** Consistent red theme (#a32428, #ae262a)
- **Navigation:** Swipe up to advance, buttons for specific actions
- **Debug Mode:** Consistent debug overlays across all pages
- **Interactive Areas:** Optimized button sizes for better user experience

## 🔧 For Developers

- Each page is a separate folder with its own `page.tsx`
- Navigation uses Next.js router (`useRouter`)
- Swipe gestures use `react-swipeable`
- Images are optimized with Next.js `Image` component
- External links open in new tabs (`target="_blank"`)
- Debug overlays use absolute positioning with z-index layering
- Button coordinates are calculated for 1260×2400px container system

---

**Note:** This app is designed for Farcaster Mini Apps, so it's optimized for mobile viewing and swipe gestures. 