# Working Container Patterns for Mini App

## 🎯 **Current Working Status (Commit 0f3599d)**
- ✅ **Container sizes**: All pages now have consistent sizing
- ✅ **Arrow navigation**: Works on all 4 pages
- ✅ **Structure**: All pages use the same proven container pattern

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

## 📚 **Reference Commits:**

- **Working Base**: `862380f` - Complete working version
- **Container Fix**: `0f3599d` - Fixed container sizes and navigation
- **Current Status**: All pages working with consistent structure

## 🔄 **Future Updates:**

When making changes:
1. **Test on localhost first**
2. **Make minimal changes**
3. **Update this document**
4. **Commit working changes**
5. **Test on mobile**

---
*Last Updated: Commit 0f3599d - Container sizes fixed, arrow navigation working*
