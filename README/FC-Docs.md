# Farcaster MiniApp Docs & Key References

## Official Farcaster MiniApp Documentation
- [Farcaster MiniApps Overview](https://miniapps.farcaster.xyz/docs/)

## Key Guides
- [Share Extension Guide](https://miniapps.farcaster.xyz/docs/guides/share-extension)
- [Loading Your App Guide](https://miniapps.farcaster.xyz/docs/guides/loading)

## SDK Documentation
- [SDK Context & Safe Area Insets](https://miniapps.farcaster.xyz/docs/sdk/context#using-safeareainsets)

## Quick Reference

### Share Extensions
- Add a `castShareUrl` to your manifest to enable your MiniApp to receive shared casts from the Farcaster share sheet.
- Your app will receive cast info via URL parameters and SDK context.

### Loading & Splash Screen
- Configure your splash screen in the manifest.
- Call `sdk.actions.ready()` as soon as your interface is ready to hide the splash screen.

### Safe Area Insets (Critical for Mobile)
- **Purpose**: Mobile devices render navigation elements that obscure the view of an app
- **Usage**: Use `safeAreaInsets` to render content in the safe area that won't be obstructed
- **Structure**:
  ```typescript
  export type SafeAreaInsets = {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  ```
- **Implementation**:
  ```jsx
  <div style={{
    marginTop: context.client.safeAreaInsets.top,
    marginBottom: context.client.safeAreaInsets.bottom,
    marginLeft: context.client.safeAreaInsets.left,
    marginRight: context.client.safeAreaInsets.right,
  }}>
    ...your app view
  </div>
  ```
- **Button Positioning**: Critical for ensuring buttons don't get hidden behind mobile navigation elements

---

Add more Farcaster MiniApp resources and notes here as you build! 