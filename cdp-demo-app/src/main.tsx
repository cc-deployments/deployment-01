import { type Config, CDPReactProvider } from "@coinbase/cdp-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { CDP_CONFIG } from "./config.ts";
import { theme } from "./theme.ts";
import "./index.css";

const config: Config = {
  ...CDP_CONFIG,
  appName: "CarCulture CDP Demo", // Your app's display name
  theme,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CDPReactProvider config={config}>
      <App />
    </CDPReactProvider>
  </StrictMode>,
);
