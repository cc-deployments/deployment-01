# Question for BASE AI: Proper Preview Workflow for Mini Apps

## The Situation
We've successfully migrated our Mini App to MiniKit-only architecture and deployed to Vercel. When testing in Farcaster's Preview Tool:

1. **App opens** - Mini App loads in the preview window
2. **Gray page** - Instead of showing our car gallery content
3. **No content visible** - Just a gray screen with three dots menu

## What We're Seeing
- **Preview Tool URL**: `https://farcaster.xyz/~/developers/mini-apps/preview?url=https%3A//web3-social-starter-fc-minikit.vercel.app/gallery-hero`
- **App loads** - No errors, app initializes successfully
- **Gray screen** - No content visible, just gray background
- **Three dots menu** - Shows "Reload page" and "Switch wallet" options

## Our Questions

### 1. **What should we expect from Farcaster's Preview Tool?**
- Is the gray page normal behavior?
- Should we see our actual app content?
- Is this just a basic "does it load" test?
- Are there known limitations of the Preview Tool?

### 2. **What's the proper preview workflow?**
- Should we test in the actual Farcaster app instead?
- Is Preview Tool just for basic loading validation?
- What's the recommended testing approach for Mini Apps?

### 3. **What does "success" look like in Preview Tool?**
- Just that the app opens without crashing?
- Should we see our actual UI and be able to interact?
- Can we test navigation and swipe gestures?

### 4. **Is this a configuration issue or a Preview Tool limitation?**
- Our app works perfectly in localhost
- Vercel deployment is successful
- Manifest and embed metadata are valid
- But Preview Tool shows gray page

## Context
- **MiniKit-only architecture** (as recommended by Base documentation)
- **App works in localhost** - Full functionality, swipe navigation, buttons
- **Vercel deployment successful** - No build errors, app loads
- **Manifest validated** - Passes all Farcaster checks
- **Embed metadata correct** - Proper meta tags present

## What should we expect from Farcaster's Preview Tool, and what's the proper testing workflow for Mini Apps?

---

**Goal**: Understand whether the gray page is expected behavior or if we need to fix something in our implementation. 