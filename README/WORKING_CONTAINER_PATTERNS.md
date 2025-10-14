# Working Container Patterns for Mini App

## 🎯 **Current Working Status (RESTORED)**
- ✅ **Container sizes**: All 4 pages have consistent sizing
- ✅ **Arrow navigation**: Should work on all 4 pages (restored)
- ✅ **gallery-hero-2**: Reference container size (no buttons, no padding)
- ✅ **manifold-gallery**: Correct container size (redirects to external)
- ✅ **gallery-hero**: RESTORED from commit c466f32 (had working buttons)
- ✅ **text-page**: RESTORED from commit 708e00a (had working buttons)
- ✅ **Structure**: Both pages restored to their last known working state

## 🚨 **CRITICAL: Buttons WERE Working Before**
- ✅ **Commit c466f32**: gallery-hero had working UNLOCK and SHARE buttons
- ✅ **Commit 708e00a**: text-page had working UNLOCK button and navigation
- ✅ **Both commits**: Had proper button/nav area separation and swipe functionality
- ❌ **Lesson learned**: Don't make incremental changes to working code - restore from known working commits

## 🚨 **CRITICAL LESSON LEARNED**
- ✅ **When something breaks**: Restore from the last known working commit
- ❌ **Don't guess**: Don't try to rebuild working functionality piece by piece
- ✅ **Use git checkout**: `git checkout <commit> -- <file>` to restore working files
- ✅ **Test immediately**: Verify the restored files work before making any changes

## 📱 **Container Sizes - All 4 Pages (EXACT SAME SIZE)**

### **Standard Container Size (Used by ALL pages):**
```tsx
style={{
  position: 'relative',
  backgroundColor: '#000',
  width: '100vw',        // ← ALL pages use this
  height: '100vh',       // ← ALL pages use this
  overflow: 'hidden',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  WebkitTouchCallout: 'none',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  touchAction: 'manipulation',
}}
```

### **Page-by-Page Container Status:**
1. **gallery-hero-2** ✅ Reference size: `100vw` x `100vh` (no padding, no buttons)
2. **manifold-gallery** ✅ Correct size: `100vw` x `100vh` (redirects to external)
3. **gallery-hero** ✅ Correct size: `100vw` x `100vh` + buttons + separate swipe areas
4. **text-page** ✅ Correct size: `100vw` x `100vh` + buttons + separate swipe areas

### **Key Point: NO safeArea padding on main container**
- ❌ Don't add `paddingTop: safeArea.top` etc. to main container
- ✅ This padding changes effective container size
- ✅ Apply padding only to inner content if needed

### **Button Event Handler Pattern (CRITICAL)**
- ✅ **DO**: Put `onClick` handler on the `<button>` element itself
- ❌ **DON'T**: Put `onTouchEnd` on wrapper div AND `onClick` on button (causes conflicts)
- ✅ **DO**: Use `onTouchStart` and `onTouchEnd` on button for mobile compatibility
- ✅ **DO**: Keep separate areas for swipe detection vs button areas

### **Working Button Structure (Copy This EXACT Pattern)**
```tsx
<button
  onClick={async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Your API call logic here
  }}
  onTouchStart={(e) => {
    e.preventDefault();
    e.stopPropagation();
  }}
  onTouchEnd={(e) => {
    e.preventDefault();
    e.stopPropagation();
  }}
  style={{
    // Button styling
  }}
>
  UNLOCK the Ride
</button>
```

**Key Points:**
- ✅ **onClick**: Main button functionality
- ✅ **onTouchStart/onTouchEnd**: Mobile touch compatibility
- ✅ **preventDefault/stopPropagation**: Prevents conflicts with swipe handlers

### **Working Button Positions (DIFFERENT for each page)**
- **gallery-hero**: UNLOCK button at `top: '75%'` (75% from top)
- **text-page**: UNLOCK button at `top: '63%'` (63% from top)
- **Note**: These are NOT the same structure - each page has its own button positioning

### **Working Structure from Commit 708e00a (text-page only)**
```tsx
// This structure had WORKING buttons and navigation on text-page:
return (
  <div 
    {...swipeHandlers}  // ← Swipe handlers on main container
    style={{
      width: '100vw',
      height: '100vh',
      // ... other styles
    }}
  >
    {/* Swipe Area - EXCLUDES button areas for proper gesture detection */}
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '70%', // ← Exclude button areas to prevent conflicts
        pointerEvents: 'auto',
        zIndex: 1,
      }}
    />
    
    {/* Image container */}
    <div>...</div>
    
    {/* UNLOCK Button - COMPLETELY SEPARATE from swipe detection */}
    <div style={{ top: '63%' }}>  {/* ← text-page specific height */}
      <button onClick={...}>UNLOCK the Ride</button>
    </div>
  </div>
);
```

**Key Points:**
- ✅ **useSafeArea hook**: Was working, don't remove
- ✅ **Loading state**: Was working, don't remove  
- ✅ **Separate swipe area div**: Was working, don't remove
- ✅ **Swipe handlers on main container**: Was working, don't change

## 📱 **Working Container Structure (Copy This Pattern)**

### **Main Container Pattern (Used by gallery-hero-2 and text-page):**
```tsx
return (
  <div
    {...swipeHandlers}
    style={{
      position: 'relative',
      backgroundColor: '#000',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      WebkitTouchCallout: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      // Ensure MiniKit gestures work by not blocking touch events
      touchAction: 'manipulation',
      paddingTop: safeArea.top,
      paddingBottom: safeArea.bottom,
      paddingLeft: safeArea.left,
      paddingRight: safeArea.right,
    }}
  >
    {/* Image Container */}
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#000',
      position: 'relative',
      pointerEvents: 'auto',
      touchAction: 'manipulation',
    }}>
      <Image
        src="/page-image.png"
        alt="Page Description"
        width={1260}
        height={2400}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          pointerEvents: 'auto',
          touchAction: 'manipulation',
        }}
        priority
        unoptimized={true}
      />
    </div>

    {/* Buttons go here */}
  </div>
);
```

## 🔧 **Key Changes Made:**

### **1. Container Structure (What Works):**
- `{...swipeHandlers}` on main container
- `width: '100vw', height: '100vh'` for full viewport
- `display: 'flex', flexDirection: 'column'` for centering
- `justifyContent: 'center', alignItems: 'center'` for content centering

### **2. What We Tried (Don't Use):**
- ❌ Complex scaling with CSS transforms
- ❌ Fixed pixel dimensions (1260px x 2400px)
- ❌ Multiple wrapper divs
- ❌ Complex conditional rendering patterns

### **3. What We Kept (Working):**
- ✅ Simple image container structure
- ✅ `objectFit: 'cover'` for image scaling
- ✅ `touchAction: 'manipulation'` for MiniKit compatibility
- ✅ Safe area padding for mobile devices

## 🎯 **Button Positioning & Swipe Area Separation (CRITICAL)**

### **gallery-hero (WORKING - Copy This EXACT Pattern):**
```tsx
return (
  <div className="min-h-screen bg-black text-white relative overflow-hidden">
    {/* Main Content */}
    <div className="relative z-10">
      {/* Swipe Area - EXCLUDES button areas for proper gesture detection */}
      <div 
        {...swipeHandlers}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '70%', // Exclude button areas to prevent conflicts
          pointerEvents: 'auto',
          zIndex: 1,
        }}
      />
      
      {/* Image Container */}
      <div style={{ /* image styles */ }}>
        <Image src="/carmania-gallery-hero.png" />
      </div>
      
      {/* Buttons - COMPLETELY SEPARATE from swipe detection */}
      <div style={{
        position: 'absolute',
        top: '75%', // UNLOCK button position
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        pointerEvents: 'auto',
      }}>
        <button>UNLOCK the Ride</button>
      </div>
      
      <div style={{
        position: 'absolute',
        top: '76%', // SHARE button position
        right: '10%',
        zIndex: 1000,
        pointerEvents: 'auto',
      }}>
        <button>Share</button>
      </div>
    </div>
  </div>
);
```

### **Button Positions (EXACT):**
- **gallery-hero UNLOCK**: `top: '75%'` (75% from top)
- **gallery-hero SHARE**: `top: '76%', right: '10%`
- **text-page UNLOCK**: `top: '75%'` (should match gallery-hero)

### **Swipe Area Separation (WHY gallery-hero WORKS):**
1. **Swipe area**: `height: '70%'` - stops at 70% of screen
2. **Button areas**: Start at 75% - completely separate from swipe detection
3. **No conflicts**: Swipes don't interfere with button touches

## 🚫 **text-page Problem (WHY button doesn't work):**
- **Missing**: EXACT same structure as gallery-hero
- **Current**: Has swipeHandlers on main container but no separate swipe area
- **Result**: Button touches conflict with swipe detection

## 📋 **Testing Checklist:**

### **Localhost Testing (Do First):**
1. ✅ Container sizes consistent across all pages
2. ✅ Arrow navigation works (up/down)
3. ✅ Buttons render and are clickable
4. ✅ Images load properly
5. ✅ No console errors

### **Mobile Testing (Do Second):**
1. ✅ MiniKit initializes (`Frame context available: true`)
2. ✅ Swipe navigation works
3. ✅ Buttons respond to touch
4. ✅ Container fits mobile viewport

## 🚫 **Common Mistakes to Avoid:**

1. **Don't over-engineer** - simple patterns work better
2. **Don't copy from broken pages** - always copy from working ones
3. **Don't change multiple things at once** - one fix at a time
4. **Don't ignore the working commit** - 862380f is our reference point
5. **Don't put swipeHandlers on entire container** - separate swipe areas from button areas
6. **Don't mix patterns** - use EXACT same structure as working pages

## 📚 **Reference Commits:**

- **Working Base**: `862380f` - Complete working version
- **Container Fix**: `0f3599d` - Fixed container sizes and navigation
- **Button API Fix**: `a1dea1b` - Fixed UNLOCK button API calls
- **Current Status**: gallery-hero working, text-page needs EXACT same structure

## 🔄 **Next Fix Needed:**

**text-page needs EXACT same structure as gallery-hero:**
1. **Main container**: `className="min-h-screen bg-black text-white relative overflow-hidden"`
2. **Main content wrapper**: `<div className="relative z-10">`
3. **Separate swipe area**: `<div {...swipeHandlers} style={{height: '70%'}}>`
4. **Button areas**: Completely separate from swipe detection
5. **Test UNLOCK button functionality**

## 📖 **EXACT Structure to Copy:**

**Copy the ENTIRE return section from gallery-hero to text-page:**
- Keep the same className and structure
- Keep the same swipe area separation
- Keep the same button positioning
- Only change the image src and button text

---
*Last Updated: Commit 708e00a - Container sizes fixed, text-page needs EXACT gallery-hero structure*

## 🔑 **MiniKit Initialization Pattern (DEPRECATED - USE FARCASTER SDK)**

**NOTE: OnchainKit MiniKit has been replaced with Farcaster MiniApp SDK**

```tsx
import { sdk } from '@farcaster/miniapp-sdk';

export default function YourComponent() {
  useEffect(() => {
    // Call ready when the app loads in Farcaster
    sdk.actions.ready();
  }, []);

  // Your buttons should work after SDK is ready
  return (
    <div>
      <button onClick={handleClick}>
        Your Button
      </button>
    </div>
  );
}
```

**Key Points:**
1. **SDK Ready**: Call `sdk.actions.ready()` in useEffect
2. **useEffect Hook**: Initialize Farcaster SDK only once
3. **Button Dependencies**: Buttons work after SDK is ready
4. **No Infinite Loops**: Simple useEffect with empty dependency array

**Why This Matters:**
- Buttons work properly with Farcaster SDK
- Prevents gesture conflicts between navigation and buttons
- Ensures proper touch event handling on mobile
- This is the BASE AI recommended pattern

**Current Status**: gallery-hero now has this pattern, text-page needs it too

## 🚫 **NAVIGATION - Let MiniKit Handle It Natively (CRITICAL)**

**DO NOT add custom `swipeHandlers` - MiniKit handles navigation automatically:**

```tsx
// ❌ WRONG - Don't do this
<div {...swipeHandlers}>  // This blocks MiniKit's native navigation

// ✅ CORRECT - Let MiniKit handle navigation
<div>  // No custom swipe handlers
```

**Why This Matters:**
- **MiniKit has built-in navigation** that automatically handles swipe up/down between pages
- **Custom `swipeHandlers` override MiniKit's native gestures** and break navigation
- **`disableNativeGestures: true`** only prevents app dismissal, NOT page navigation
- **Navigation works automatically** when you let MiniKit handle it

**What We Learned:**
- ✅ **UNLOCK button works** when MiniKit is ready (`isFrameReady`)
- ❌ **Navigation breaks** when we add custom `swipeHandlers`
- ✅ **Let MiniKit handle navigation** - it knows how to navigate between your pages

**Current Fix Applied:**
- **Removed `{...swipeHandlers}`** from gallery-hero main container
- **Let MiniKit handle navigation** natively
- **Navigation should now work** with swipe up/down gestures
