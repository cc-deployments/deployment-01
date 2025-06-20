"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CombinedAuth: () => CombinedAuth,
  FarcasterAuthButton: () => FarcasterAuthButton,
  OnchainKitAuth: () => OnchainKitAuth,
  PrivyProvider: () => PrivyProvider,
  SocialIdentityDemo: () => SocialIdentityDemo,
  farcasterConfig: () => farcasterConfig,
  privyConfig: () => privyConfig,
  useFarcasterAuth: () => useFarcasterAuth,
  usePrivyAuth: () => usePrivyAuth
});
module.exports = __toCommonJS(index_exports);

// src/privy/PrivyProvider.tsx
var import_react_auth = require("@privy-io/react-auth");

// src/privy/config.ts
var baseChain = {
  id: 8453,
  name: "Base",
  rpcUrls: {
    default: {
      http: ["https://mainnet.base.org"]
    },
    public: {
      http: ["https://mainnet.base.org"]
    }
  },
  blockExplorer: "https://basescan.org",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  }
};
var privyConfig = {
  appearance: {
    theme: "light",
    accentColor: "#000000",
    logo: "https://your-logo-url.com/logo.png"
    // TODO: Add your logo URL
  },
  loginMethods: ["email", "wallet", "google", "twitter"],
  embeddedWallets: {
    createOnLogin: "all-users",
    noPromptOnSignature: true
  },
  defaultChain: baseChain,
  supportedChains: [baseChain]
};

// src/privy/PrivyProvider.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function PrivyProvider({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react_auth.PrivyProvider,
    {
      config: privyConfig,
      appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
      children
    }
  );
}

// src/privy/usePrivyAuth.ts
var import_react_auth2 = require("@privy-io/react-auth");
function usePrivyAuth() {
  const {
    ready,
    authenticated,
    user,
    login,
    logout,
    linkWallet,
    unlinkWallet
  } = (0, import_react_auth2.usePrivy)();
  const { wallets } = (0, import_react_auth2.useWallets)();
  return {
    ready,
    authenticated,
    user,
    login,
    logout,
    linkWallet,
    unlinkWallet,
    wallets,
    // Helper methods
    isReady: ready,
    isAuthenticated: authenticated,
    getUser: () => user,
    getWallets: () => wallets
  };
}

// src/farcaster/useFarcasterAuth.ts
var import_react = require("react");

// src/farcaster/config.ts
var farcasterConfig = {
  // Your Farcaster details
  userFid: 270170,
  username: "carculture",
  walletAddress: "0xF74FE33d71bF46cDC006FE0F2888783174fE2aA2",
  channelName: "car",
  // Farcaster API configuration
  apiUrl: "https://api.farcaster.xyz",
  // Optional: Add your app's domain for Farcaster auth
  appDomain: "carculture.xyz",
  // TODO: Update with your actual domain
  // Optional: Add your app's name
  appName: "CarCulture",
  // Optional: Add your app's icon
  appIcon: "https://carculture.xyz/icon.png"
  // TODO: Update with your actual icon URL
};

// src/farcaster/useFarcasterAuth.ts
function useFarcasterAuth() {
  const [isLoading, setIsLoading] = (0, import_react.useState)(false);
  const [error, setError] = (0, import_react.useState)(null);
  const [user, setUser] = (0, import_react.useState)(null);
  const login = (0, import_react.useCallback)(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const farcasterUser = {
        fid: farcasterConfig.userFid,
        username: farcasterConfig.username,
        walletAddress: farcasterConfig.walletAddress,
        channelName: farcasterConfig.channelName
      };
      setUser(farcasterUser);
      return farcasterUser;
    } catch (err) {
      const error2 = err instanceof Error ? err : new Error("Farcaster authentication failed");
      setError(error2);
      throw error2;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const logout = (0, import_react.useCallback)(async () => {
    try {
      setIsLoading(true);
      setError(null);
      setUser(null);
    } catch (err) {
      const error2 = err instanceof Error ? err : new Error("Farcaster logout failed");
      setError(error2);
      throw error2;
    } finally {
      setIsLoading(false);
    }
  }, []);
  return {
    user,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated: !!user
  };
}

// src/farcaster/components/FarcasterAuthButton.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function FarcasterAuthButton({
  className = "",
  onSuccess,
  onError
}) {
  const { login, logout, isAuthenticated, isLoading, error } = useFarcasterAuth();
  const handleAuth = async () => {
    try {
      if (isAuthenticated) {
        await logout();
      } else {
        await login();
      }
      onSuccess == null ? void 0 : onSuccess();
    } catch (err) {
      const error2 = err instanceof Error ? err : new Error("Farcaster authentication failed");
      onError == null ? void 0 : onError(error2);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "button",
      {
        onClick: handleAuth,
        disabled: isLoading,
        className: `px-4 py-2 rounded-lg ${isAuthenticated ? "bg-purple-500 hover:bg-purple-600 text-white" : "bg-purple-400 hover:bg-purple-500 text-white"} ${className}`,
        children: isLoading ? "Loading..." : isAuthenticated ? "Disconnect Farcaster" : "Connect Farcaster"
      }
    ),
    error && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-red-500 text-sm", children: error.message })
  ] });
}

// src/components/CombinedAuth.tsx
var import_react2 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
function CombinedAuth({ className = "", onSuccess, onError }) {
  var _a;
  const {
    login: privyLogin,
    logout: privyLogout,
    isAuthenticated: isPrivyAuthenticated,
    isReady: isPrivyReady,
    user: privyUser
  } = usePrivyAuth();
  const {
    login: farcasterLogin,
    logout: farcasterLogout,
    isAuthenticated: isFarcasterAuthenticated,
    user: farcasterUser
  } = useFarcasterAuth();
  const [isLoading, setIsLoading] = (0, import_react2.useState)(false);
  const [error, setError] = (0, import_react2.useState)(null);
  const handlePrivyAuth = async () => {
    try {
      setIsLoading(true);
      setError(null);
      if (isPrivyAuthenticated) {
        await privyLogout();
      } else {
        await privyLogin();
      }
      onSuccess == null ? void 0 : onSuccess();
    } catch (err) {
      const error2 = err instanceof Error ? err : new Error("Privy authentication failed");
      setError(error2);
      onError == null ? void 0 : onError(error2);
    } finally {
      setIsLoading(false);
    }
  };
  const handleFarcasterAuth = async () => {
    try {
      setIsLoading(true);
      setError(null);
      if (isFarcasterAuthenticated) {
        await farcasterLogout();
      } else {
        await farcasterLogin();
      }
      onSuccess == null ? void 0 : onSuccess();
    } catch (err) {
      const error2 = err instanceof Error ? err : new Error("Farcaster authentication failed");
      setError(error2);
      onError == null ? void 0 : onError(error2);
    } finally {
      setIsLoading(false);
    }
  };
  if (!isPrivyReady) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex flex-col gap-4", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "button",
      {
        className: `px-4 py-2 rounded-lg bg-gray-200 text-gray-500 ${className}`,
        disabled: true,
        children: "Loading..."
      }
    ) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "button",
        {
          onClick: handlePrivyAuth,
          disabled: isLoading,
          className: `px-4 py-2 rounded-lg ${isPrivyAuthenticated ? "bg-red-500 hover:bg-red-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"} ${className}`,
          children: isLoading ? "Loading..." : isPrivyAuthenticated ? "Disconnect Wallet" : "Connect Wallet"
        }
      ),
      isPrivyAuthenticated && privyUser && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-sm text-gray-600", children: [
        "Connected: ",
        (_a = privyUser.wallet) == null ? void 0 : _a.address
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "button",
        {
          onClick: handleFarcasterAuth,
          disabled: isLoading,
          className: `px-4 py-2 rounded-lg ${isFarcasterAuthenticated ? "bg-purple-500 hover:bg-purple-600 text-white" : "bg-purple-400 hover:bg-purple-500 text-white"} ${className}`,
          children: isLoading ? "Loading..." : isFarcasterAuthenticated ? "Disconnect Farcaster" : "Connect Farcaster"
        }
      ),
      isFarcasterAuthenticated && farcasterUser && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-sm text-gray-600", children: [
        "Connected: @",
        farcasterUser.username,
        " (FID: ",
        farcasterUser.fid,
        ")"
      ] })
    ] }),
    error && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-red-500 text-sm", children: error.message })
  ] });
}

// src/components/OnchainKitAuth.tsx
var import_react3 = require("react");
var import_wallet = require("@coinbase/onchainkit/wallet");
var import_identity = require("@coinbase/onchainkit/identity");
var import_jsx_runtime4 = require("react/jsx-runtime");
function OnchainKitAuth({
  className = "",
  onSuccess,
  onError,
  showIdentity = true,
  showBadges = true
}) {
  var _a;
  const {
    login: privyLogin,
    logout: privyLogout,
    isAuthenticated: isPrivyAuthenticated,
    isReady: isPrivyReady,
    user: privyUser
  } = usePrivyAuth();
  const {
    login: farcasterLogin,
    logout: farcasterLogout,
    isAuthenticated: isFarcasterAuthenticated,
    user: farcasterUser
  } = useFarcasterAuth();
  const [isLoading, setIsLoading] = (0, import_react3.useState)(false);
  const [error, setError] = (0, import_react3.useState)(null);
  const handlePrivyAuth = async () => {
    try {
      setIsLoading(true);
      setError(null);
      if (isPrivyAuthenticated) {
        await privyLogout();
      } else {
        await privyLogin();
      }
      onSuccess == null ? void 0 : onSuccess();
    } catch (err) {
      const error2 = err instanceof Error ? err : new Error("Privy authentication failed");
      setError(error2);
      onError == null ? void 0 : onError(error2);
    } finally {
      setIsLoading(false);
    }
  };
  const handleFarcasterAuth = async () => {
    try {
      setIsLoading(true);
      setError(null);
      if (isFarcasterAuthenticated) {
        await farcasterLogout();
      } else {
        await farcasterLogin();
      }
      onSuccess == null ? void 0 : onSuccess();
    } catch (err) {
      const error2 = err instanceof Error ? err : new Error("Farcaster authentication failed");
      setError(error2);
      onError == null ? void 0 : onError(error2);
    } finally {
      setIsLoading(false);
    }
  };
  if (!isPrivyReady) {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex flex-col gap-4", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_wallet.ConnectWallet, {}) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_wallet.ConnectWallet, {}),
      isPrivyAuthenticated && showIdentity && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_identity.Identity, {}),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_identity.Address, {}),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_identity.Avatar, {})
      ] }),
      isPrivyAuthenticated && showBadges && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex flex-wrap gap-2", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_identity.Badge, {}) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col gap-4 border-t pt-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { className: "text-sm font-medium text-gray-700", children: "Additional Auth Options" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            onClick: handlePrivyAuth,
            disabled: isLoading,
            className: `px-4 py-2 rounded-lg ${isPrivyAuthenticated ? "bg-red-500 hover:bg-red-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"} ${className}`,
            children: isLoading ? "Loading..." : isPrivyAuthenticated ? "Disconnect Privy" : "Connect Privy"
          }
        ),
        isPrivyAuthenticated && privyUser && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "text-sm text-gray-600", children: [
          "Privy: ",
          (_a = privyUser.wallet) == null ? void 0 : _a.address
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            onClick: handleFarcasterAuth,
            disabled: isLoading,
            className: `px-4 py-2 rounded-lg ${isFarcasterAuthenticated ? "bg-purple-500 hover:bg-purple-600 text-white" : "bg-purple-400 hover:bg-purple-500 text-white"} ${className}`,
            children: isLoading ? "Loading..." : isFarcasterAuthenticated ? "Disconnect Farcaster" : "Connect Farcaster"
          }
        ),
        isFarcasterAuthenticated && farcasterUser && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "text-sm text-gray-600", children: [
          "Farcaster: @",
          farcasterUser.username,
          " (FID: ",
          farcasterUser.fid,
          ")"
        ] })
      ] })
    ] }),
    error && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-red-500 text-sm", children: error.message })
  ] });
}

// src/components/SocialIdentityDemo.tsx
var import_onchainkit = require("@coinbase/onchainkit");

// ../../node_modules/viem/_esm/utils/chain/defineChain.js
function defineChain(chain) {
  return __spreadValues({
    formatters: void 0,
    fees: void 0,
    serializers: void 0
  }, chain);
}

// ../../node_modules/viem/_esm/errors/version.js
var version = "2.30.5";

// ../../node_modules/viem/_esm/errors/base.js
var errorConfig = {
  getDocsUrl: ({ docsBaseUrl, docsPath = "", docsSlug }) => docsPath ? `${docsBaseUrl != null ? docsBaseUrl : "https://viem.sh"}${docsPath}${docsSlug ? `#${docsSlug}` : ""}` : void 0,
  version: `viem@${version}`
};
var BaseError = class _BaseError extends Error {
  constructor(shortMessage, args = {}) {
    var _a, _b;
    const details = (() => {
      var _a2;
      if (args.cause instanceof _BaseError)
        return args.cause.details;
      if ((_a2 = args.cause) == null ? void 0 : _a2.message)
        return args.cause.message;
      return args.details;
    })();
    const docsPath = (() => {
      if (args.cause instanceof _BaseError)
        return args.cause.docsPath || args.docsPath;
      return args.docsPath;
    })();
    const docsUrl = (_a = errorConfig.getDocsUrl) == null ? void 0 : _a.call(errorConfig, __spreadProps(__spreadValues({}, args), { docsPath }));
    const message = [
      shortMessage || "An error occurred.",
      "",
      ...args.metaMessages ? [...args.metaMessages, ""] : [],
      ...docsUrl ? [`Docs: ${docsUrl}`] : [],
      ...details ? [`Details: ${details}`] : [],
      ...errorConfig.version ? [`Version: ${errorConfig.version}`] : []
    ].join("\n");
    super(message, args.cause ? { cause: args.cause } : void 0);
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "metaMessages", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "version", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BaseError"
    });
    this.details = details;
    this.docsPath = docsPath;
    this.metaMessages = args.metaMessages;
    this.name = (_b = args.name) != null ? _b : this.name;
    this.shortMessage = shortMessage;
    this.version = version;
  }
  walk(fn) {
    return walk(this, fn);
  }
};
function walk(err, fn) {
  if (fn == null ? void 0 : fn(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause !== void 0)
    return walk(err.cause, fn);
  return fn ? null : err;
}

// ../../node_modules/viem/_esm/errors/encoding.js
var IntegerOutOfRangeError = class extends BaseError {
  constructor({ max, min, signed, size: size2, value }) {
    super(`Number "${value}" is not in safe ${size2 ? `${size2 * 8}-bit ${signed ? "signed" : "unsigned"} ` : ""}integer range ${max ? `(${min} to ${max})` : `(above ${min})`}`, { name: "IntegerOutOfRangeError" });
  }
};
var SizeOverflowError = class extends BaseError {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`, { name: "SizeOverflowError" });
  }
};

// ../../node_modules/viem/_esm/utils/data/isHex.js
function isHex(value, { strict = true } = {}) {
  if (!value)
    return false;
  if (typeof value !== "string")
    return false;
  return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith("0x");
}

// ../../node_modules/viem/_esm/utils/data/size.js
function size(value) {
  if (isHex(value, { strict: false }))
    return Math.ceil((value.length - 2) / 2);
  return value.length;
}

// ../../node_modules/viem/_esm/utils/data/trim.js
function trim(hexOrBytes, { dir = "left" } = {}) {
  let data = typeof hexOrBytes === "string" ? hexOrBytes.replace("0x", "") : hexOrBytes;
  let sliceLength = 0;
  for (let i = 0; i < data.length - 1; i++) {
    if (data[dir === "left" ? i : data.length - i - 1].toString() === "0")
      sliceLength++;
    else
      break;
  }
  data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
  if (typeof hexOrBytes === "string") {
    if (data.length === 1 && dir === "right")
      data = `${data}0`;
    return `0x${data.length % 2 === 1 ? `0${data}` : data}`;
  }
  return data;
}

// ../../node_modules/viem/_esm/errors/data.js
var SliceOffsetOutOfBoundsError = class extends BaseError {
  constructor({ offset, position, size: size2 }) {
    super(`Slice ${position === "start" ? "starting" : "ending"} at offset "${offset}" is out-of-bounds (size: ${size2}).`, { name: "SliceOffsetOutOfBoundsError" });
  }
};
var SizeExceedsPaddingSizeError = class extends BaseError {
  constructor({ size: size2, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (${size2}) exceeds padding size (${targetSize}).`, { name: "SizeExceedsPaddingSizeError" });
  }
};

// ../../node_modules/viem/_esm/utils/data/pad.js
function pad(hexOrBytes, { dir, size: size2 = 32 } = {}) {
  if (typeof hexOrBytes === "string")
    return padHex(hexOrBytes, { dir, size: size2 });
  return padBytes(hexOrBytes, { dir, size: size2 });
}
function padHex(hex_, { dir, size: size2 = 32 } = {}) {
  if (size2 === null)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size2 * 2)
    throw new SizeExceedsPaddingSizeError({
      size: Math.ceil(hex.length / 2),
      targetSize: size2,
      type: "hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size2 * 2, "0")}`;
}
function padBytes(bytes, { dir, size: size2 = 32 } = {}) {
  if (size2 === null)
    return bytes;
  if (bytes.length > size2)
    throw new SizeExceedsPaddingSizeError({
      size: bytes.length,
      targetSize: size2,
      type: "bytes"
    });
  const paddedBytes = new Uint8Array(size2);
  for (let i = 0; i < size2; i++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i : size2 - i - 1] = bytes[padEnd ? i : bytes.length - i - 1];
  }
  return paddedBytes;
}

// ../../node_modules/viem/_esm/utils/encoding/toHex.js
var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
function toHex(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToHex(value, opts);
  if (typeof value === "string") {
    return stringToHex(value, opts);
  }
  if (typeof value === "boolean")
    return boolToHex(value, opts);
  return bytesToHex(value, opts);
}
function boolToHex(value, opts = {}) {
  const hex = `0x${Number(value)}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { size: opts.size });
  }
  return hex;
}
function bytesToHex(value, opts = {}) {
  let string = "";
  for (let i = 0; i < value.length; i++) {
    string += hexes[value[i]];
  }
  const hex = `0x${string}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { dir: "right", size: opts.size });
  }
  return hex;
}
function numberToHex(value_, opts = {}) {
  const { signed, size: size2 } = opts;
  const value = BigInt(value_);
  let maxValue;
  if (size2) {
    if (signed)
      maxValue = (/* @__PURE__ */ BigInt("1") << BigInt(size2) * /* @__PURE__ */ BigInt("8") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
    else
      maxValue = /* @__PURE__ */ BigInt("2") ** (BigInt(size2) * /* @__PURE__ */ BigInt("8")) - /* @__PURE__ */ BigInt("1");
  } else if (typeof value_ === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - /* @__PURE__ */ BigInt("1") : 0;
  if (maxValue && value > maxValue || value < minValue) {
    const suffix = typeof value_ === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size2,
      value: `${value_}${suffix}`
    });
  }
  const hex = `0x${(signed && value < 0 ? (/* @__PURE__ */ BigInt("1") << BigInt(size2 * 8)) + BigInt(value) : value).toString(16)}`;
  if (size2)
    return pad(hex, { size: size2 });
  return hex;
}
var encoder = /* @__PURE__ */ new TextEncoder();
function stringToHex(value_, opts = {}) {
  const value = encoder.encode(value_);
  return bytesToHex(value, opts);
}

// ../../node_modules/viem/_esm/utils/encoding/toBytes.js
var encoder2 = /* @__PURE__ */ new TextEncoder();
function toBytes(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToBytes(value, opts);
  if (typeof value === "boolean")
    return boolToBytes(value, opts);
  if (isHex(value))
    return hexToBytes(value, opts);
  return stringToBytes(value, opts);
}
function boolToBytes(value, opts = {}) {
  const bytes = new Uint8Array(1);
  bytes[0] = Number(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { size: opts.size });
  }
  return bytes;
}
var charCodeMap = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function charCodeToBase16(char) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine)
    return char - charCodeMap.zero;
  if (char >= charCodeMap.A && char <= charCodeMap.F)
    return char - (charCodeMap.A - 10);
  if (char >= charCodeMap.a && char <= charCodeMap.f)
    return char - (charCodeMap.a - 10);
  return void 0;
}
function hexToBytes(hex_, opts = {}) {
  let hex = hex_;
  if (opts.size) {
    assertSize(hex, { size: opts.size });
    hex = pad(hex, { dir: "right", size: opts.size });
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length = hexString.length / 2;
  const bytes = new Uint8Array(length);
  for (let index = 0, j = 0; index < length; index++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
    }
    bytes[index] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function numberToBytes(value, opts) {
  const hex = numberToHex(value, opts);
  return hexToBytes(hex);
}
function stringToBytes(value, opts = {}) {
  const bytes = encoder2.encode(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { dir: "right", size: opts.size });
  }
  return bytes;
}

// ../../node_modules/viem/_esm/utils/encoding/fromHex.js
function assertSize(hexOrBytes, { size: size2 }) {
  if (size(hexOrBytes) > size2)
    throw new SizeOverflowError({
      givenSize: size(hexOrBytes),
      maxSize: size2
    });
}
function hexToBigInt(hex, opts = {}) {
  const { signed } = opts;
  if (opts.size)
    assertSize(hex, { size: opts.size });
  const value = BigInt(hex);
  if (!signed)
    return value;
  const size2 = (hex.length - 2) / 2;
  const max = (/* @__PURE__ */ BigInt("1") << BigInt(size2) * /* @__PURE__ */ BigInt("8") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
  if (value <= max)
    return value;
  return value - BigInt(`0x${"f".padStart(size2 * 2, "f")}`) - /* @__PURE__ */ BigInt("1");
}
function hexToNumber(hex, opts = {}) {
  return Number(hexToBigInt(hex, opts));
}

// ../../node_modules/viem/_esm/utils/formatters/formatter.js
function defineFormatter(type, format) {
  return ({ exclude, format: overrides }) => {
    return {
      exclude,
      format: (args) => {
        const formatted = format(args);
        if (exclude) {
          for (const key of exclude) {
            delete formatted[key];
          }
        }
        return __spreadValues(__spreadValues({}, formatted), overrides(args));
      },
      type
    };
  };
}

// ../../node_modules/viem/_esm/utils/formatters/transaction.js
var transactionType = {
  "0x0": "legacy",
  "0x1": "eip2930",
  "0x2": "eip1559",
  "0x3": "eip4844",
  "0x4": "eip7702"
};
function formatTransaction(transaction) {
  const transaction_ = __spreadProps(__spreadValues({}, transaction), {
    blockHash: transaction.blockHash ? transaction.blockHash : null,
    blockNumber: transaction.blockNumber ? BigInt(transaction.blockNumber) : null,
    chainId: transaction.chainId ? hexToNumber(transaction.chainId) : void 0,
    gas: transaction.gas ? BigInt(transaction.gas) : void 0,
    gasPrice: transaction.gasPrice ? BigInt(transaction.gasPrice) : void 0,
    maxFeePerBlobGas: transaction.maxFeePerBlobGas ? BigInt(transaction.maxFeePerBlobGas) : void 0,
    maxFeePerGas: transaction.maxFeePerGas ? BigInt(transaction.maxFeePerGas) : void 0,
    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas ? BigInt(transaction.maxPriorityFeePerGas) : void 0,
    nonce: transaction.nonce ? hexToNumber(transaction.nonce) : void 0,
    to: transaction.to ? transaction.to : null,
    transactionIndex: transaction.transactionIndex ? Number(transaction.transactionIndex) : null,
    type: transaction.type ? transactionType[transaction.type] : void 0,
    typeHex: transaction.type ? transaction.type : void 0,
    value: transaction.value ? BigInt(transaction.value) : void 0,
    v: transaction.v ? BigInt(transaction.v) : void 0
  });
  if (transaction.authorizationList)
    transaction_.authorizationList = formatAuthorizationList(transaction.authorizationList);
  transaction_.yParity = (() => {
    if (transaction.yParity)
      return Number(transaction.yParity);
    if (typeof transaction_.v === "bigint") {
      if (transaction_.v === /* @__PURE__ */ BigInt("0") || transaction_.v === /* @__PURE__ */ BigInt("27"))
        return 0;
      if (transaction_.v === /* @__PURE__ */ BigInt("1") || transaction_.v === /* @__PURE__ */ BigInt("28"))
        return 1;
      if (transaction_.v >= /* @__PURE__ */ BigInt("35"))
        return transaction_.v % /* @__PURE__ */ BigInt("2") === /* @__PURE__ */ BigInt("0") ? 1 : 0;
    }
    return void 0;
  })();
  if (transaction_.type === "legacy") {
    delete transaction_.accessList;
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
    delete transaction_.yParity;
  }
  if (transaction_.type === "eip2930") {
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
  }
  if (transaction_.type === "eip1559") {
    delete transaction_.maxFeePerBlobGas;
  }
  return transaction_;
}
var defineTransaction = /* @__PURE__ */ defineFormatter("transaction", formatTransaction);
function formatAuthorizationList(authorizationList) {
  return authorizationList.map((authorization) => ({
    address: authorization.address,
    chainId: Number(authorization.chainId),
    nonce: Number(authorization.nonce),
    r: authorization.r,
    s: authorization.s,
    yParity: Number(authorization.yParity)
  }));
}

// ../../node_modules/viem/_esm/utils/formatters/block.js
function formatBlock(block) {
  var _a;
  const transactions = ((_a = block.transactions) != null ? _a : []).map((transaction) => {
    if (typeof transaction === "string")
      return transaction;
    return formatTransaction(transaction);
  });
  return __spreadProps(__spreadValues({}, block), {
    baseFeePerGas: block.baseFeePerGas ? BigInt(block.baseFeePerGas) : null,
    blobGasUsed: block.blobGasUsed ? BigInt(block.blobGasUsed) : void 0,
    difficulty: block.difficulty ? BigInt(block.difficulty) : void 0,
    excessBlobGas: block.excessBlobGas ? BigInt(block.excessBlobGas) : void 0,
    gasLimit: block.gasLimit ? BigInt(block.gasLimit) : void 0,
    gasUsed: block.gasUsed ? BigInt(block.gasUsed) : void 0,
    hash: block.hash ? block.hash : null,
    logsBloom: block.logsBloom ? block.logsBloom : null,
    nonce: block.nonce ? block.nonce : null,
    number: block.number ? BigInt(block.number) : null,
    size: block.size ? BigInt(block.size) : void 0,
    timestamp: block.timestamp ? BigInt(block.timestamp) : void 0,
    transactions,
    totalDifficulty: block.totalDifficulty ? BigInt(block.totalDifficulty) : null
  });
}
var defineBlock = /* @__PURE__ */ defineFormatter("block", formatBlock);

// ../../node_modules/viem/_esm/utils/formatters/log.js
function formatLog(log, { args, eventName } = {}) {
  return __spreadValues(__spreadProps(__spreadValues({}, log), {
    blockHash: log.blockHash ? log.blockHash : null,
    blockNumber: log.blockNumber ? BigInt(log.blockNumber) : null,
    logIndex: log.logIndex ? Number(log.logIndex) : null,
    transactionHash: log.transactionHash ? log.transactionHash : null,
    transactionIndex: log.transactionIndex ? Number(log.transactionIndex) : null
  }), eventName ? { args, eventName } : {});
}

// ../../node_modules/viem/_esm/utils/formatters/transactionReceipt.js
var receiptStatuses = {
  "0x0": "reverted",
  "0x1": "success"
};
function formatTransactionReceipt(transactionReceipt) {
  const receipt = __spreadProps(__spreadValues({}, transactionReceipt), {
    blockNumber: transactionReceipt.blockNumber ? BigInt(transactionReceipt.blockNumber) : null,
    contractAddress: transactionReceipt.contractAddress ? transactionReceipt.contractAddress : null,
    cumulativeGasUsed: transactionReceipt.cumulativeGasUsed ? BigInt(transactionReceipt.cumulativeGasUsed) : null,
    effectiveGasPrice: transactionReceipt.effectiveGasPrice ? BigInt(transactionReceipt.effectiveGasPrice) : null,
    gasUsed: transactionReceipt.gasUsed ? BigInt(transactionReceipt.gasUsed) : null,
    logs: transactionReceipt.logs ? transactionReceipt.logs.map((log) => formatLog(log)) : null,
    to: transactionReceipt.to ? transactionReceipt.to : null,
    transactionIndex: transactionReceipt.transactionIndex ? hexToNumber(transactionReceipt.transactionIndex) : null,
    status: transactionReceipt.status ? receiptStatuses[transactionReceipt.status] : null,
    type: transactionReceipt.type ? transactionType[transactionReceipt.type] || transactionReceipt.type : null
  });
  if (transactionReceipt.blobGasPrice)
    receipt.blobGasPrice = BigInt(transactionReceipt.blobGasPrice);
  if (transactionReceipt.blobGasUsed)
    receipt.blobGasUsed = BigInt(transactionReceipt.blobGasUsed);
  return receipt;
}
var defineTransactionReceipt = /* @__PURE__ */ defineFormatter("transactionReceipt", formatTransactionReceipt);

// ../../node_modules/viem/_esm/constants/number.js
var maxInt8 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("8") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt16 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("16") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt24 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("24") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt32 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("32") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt40 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("40") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt48 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("48") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt56 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("56") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt64 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("64") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt72 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("72") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt80 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("80") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt88 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("88") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt96 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("96") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt104 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("104") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt112 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("112") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt120 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("120") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt128 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("128") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt136 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("136") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt144 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("144") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt152 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("152") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt160 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("160") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt168 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("168") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt176 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("176") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt184 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("184") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt192 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("192") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt200 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("200") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt208 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("208") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt216 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("216") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt224 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("224") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt232 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("232") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt240 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("240") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt248 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("248") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var maxInt256 = /* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("256") - /* @__PURE__ */ BigInt("1")) - /* @__PURE__ */ BigInt("1");
var minInt8 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("8") - /* @__PURE__ */ BigInt("1")));
var minInt16 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("16") - /* @__PURE__ */ BigInt("1")));
var minInt24 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("24") - /* @__PURE__ */ BigInt("1")));
var minInt32 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("32") - /* @__PURE__ */ BigInt("1")));
var minInt40 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("40") - /* @__PURE__ */ BigInt("1")));
var minInt48 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("48") - /* @__PURE__ */ BigInt("1")));
var minInt56 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("56") - /* @__PURE__ */ BigInt("1")));
var minInt64 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("64") - /* @__PURE__ */ BigInt("1")));
var minInt72 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("72") - /* @__PURE__ */ BigInt("1")));
var minInt80 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("80") - /* @__PURE__ */ BigInt("1")));
var minInt88 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("88") - /* @__PURE__ */ BigInt("1")));
var minInt96 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("96") - /* @__PURE__ */ BigInt("1")));
var minInt104 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("104") - /* @__PURE__ */ BigInt("1")));
var minInt112 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("112") - /* @__PURE__ */ BigInt("1")));
var minInt120 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("120") - /* @__PURE__ */ BigInt("1")));
var minInt128 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("128") - /* @__PURE__ */ BigInt("1")));
var minInt136 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("136") - /* @__PURE__ */ BigInt("1")));
var minInt144 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("144") - /* @__PURE__ */ BigInt("1")));
var minInt152 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("152") - /* @__PURE__ */ BigInt("1")));
var minInt160 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("160") - /* @__PURE__ */ BigInt("1")));
var minInt168 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("168") - /* @__PURE__ */ BigInt("1")));
var minInt176 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("176") - /* @__PURE__ */ BigInt("1")));
var minInt184 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("184") - /* @__PURE__ */ BigInt("1")));
var minInt192 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("192") - /* @__PURE__ */ BigInt("1")));
var minInt200 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("200") - /* @__PURE__ */ BigInt("1")));
var minInt208 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("208") - /* @__PURE__ */ BigInt("1")));
var minInt216 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("216") - /* @__PURE__ */ BigInt("1")));
var minInt224 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("224") - /* @__PURE__ */ BigInt("1")));
var minInt232 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("232") - /* @__PURE__ */ BigInt("1")));
var minInt240 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("240") - /* @__PURE__ */ BigInt("1")));
var minInt248 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("248") - /* @__PURE__ */ BigInt("1")));
var minInt256 = -(/* @__PURE__ */ BigInt("2") ** (/* @__PURE__ */ BigInt("256") - /* @__PURE__ */ BigInt("1")));
var maxUint8 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("8") - /* @__PURE__ */ BigInt("1");
var maxUint16 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("16") - /* @__PURE__ */ BigInt("1");
var maxUint24 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("24") - /* @__PURE__ */ BigInt("1");
var maxUint32 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("32") - /* @__PURE__ */ BigInt("1");
var maxUint40 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("40") - /* @__PURE__ */ BigInt("1");
var maxUint48 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("48") - /* @__PURE__ */ BigInt("1");
var maxUint56 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("56") - /* @__PURE__ */ BigInt("1");
var maxUint64 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("64") - /* @__PURE__ */ BigInt("1");
var maxUint72 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("72") - /* @__PURE__ */ BigInt("1");
var maxUint80 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("80") - /* @__PURE__ */ BigInt("1");
var maxUint88 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("88") - /* @__PURE__ */ BigInt("1");
var maxUint96 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("96") - /* @__PURE__ */ BigInt("1");
var maxUint104 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("104") - /* @__PURE__ */ BigInt("1");
var maxUint112 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("112") - /* @__PURE__ */ BigInt("1");
var maxUint120 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("120") - /* @__PURE__ */ BigInt("1");
var maxUint128 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("128") - /* @__PURE__ */ BigInt("1");
var maxUint136 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("136") - /* @__PURE__ */ BigInt("1");
var maxUint144 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("144") - /* @__PURE__ */ BigInt("1");
var maxUint152 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("152") - /* @__PURE__ */ BigInt("1");
var maxUint160 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("160") - /* @__PURE__ */ BigInt("1");
var maxUint168 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("168") - /* @__PURE__ */ BigInt("1");
var maxUint176 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("176") - /* @__PURE__ */ BigInt("1");
var maxUint184 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("184") - /* @__PURE__ */ BigInt("1");
var maxUint192 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("192") - /* @__PURE__ */ BigInt("1");
var maxUint200 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("200") - /* @__PURE__ */ BigInt("1");
var maxUint208 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("208") - /* @__PURE__ */ BigInt("1");
var maxUint216 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("216") - /* @__PURE__ */ BigInt("1");
var maxUint224 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("224") - /* @__PURE__ */ BigInt("1");
var maxUint232 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("232") - /* @__PURE__ */ BigInt("1");
var maxUint240 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("240") - /* @__PURE__ */ BigInt("1");
var maxUint248 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("248") - /* @__PURE__ */ BigInt("1");
var maxUint256 = /* @__PURE__ */ BigInt("2") ** /* @__PURE__ */ BigInt("256") - /* @__PURE__ */ BigInt("1");

// ../../node_modules/viem/_esm/utils/data/concat.js
function concatHex(values) {
  return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
}

// ../../node_modules/viem/_esm/errors/cursor.js
var NegativeOffsetError = class extends BaseError {
  constructor({ offset }) {
    super(`Offset \`${offset}\` cannot be negative.`, {
      name: "NegativeOffsetError"
    });
  }
};
var PositionOutOfBoundsError = class extends BaseError {
  constructor({ length, position }) {
    super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`, { name: "PositionOutOfBoundsError" });
  }
};
var RecursiveReadLimitExceededError = class extends BaseError {
  constructor({ count, limit }) {
    super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`, { name: "RecursiveReadLimitExceededError" });
  }
};

// ../../node_modules/viem/_esm/utils/cursor.js
var staticCursor = {
  bytes: new Uint8Array(),
  dataView: new DataView(new ArrayBuffer(0)),
  position: 0,
  positionReadCount: /* @__PURE__ */ new Map(),
  recursiveReadCount: 0,
  recursiveReadLimit: Number.POSITIVE_INFINITY,
  assertReadLimit() {
    if (this.recursiveReadCount >= this.recursiveReadLimit)
      throw new RecursiveReadLimitExceededError({
        count: this.recursiveReadCount + 1,
        limit: this.recursiveReadLimit
      });
  },
  assertPosition(position) {
    if (position < 0 || position > this.bytes.length - 1)
      throw new PositionOutOfBoundsError({
        length: this.bytes.length,
        position
      });
  },
  decrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position - offset;
    this.assertPosition(position);
    this.position = position;
  },
  getReadCount(position) {
    return this.positionReadCount.get(position || this.position) || 0;
  },
  incrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position + offset;
    this.assertPosition(position);
    this.position = position;
  },
  inspectByte(position_) {
    const position = position_ != null ? position_ : this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectBytes(length, position_) {
    const position = position_ != null ? position_ : this.position;
    this.assertPosition(position + length - 1);
    return this.bytes.subarray(position, position + length);
  },
  inspectUint8(position_) {
    const position = position_ != null ? position_ : this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectUint16(position_) {
    const position = position_ != null ? position_ : this.position;
    this.assertPosition(position + 1);
    return this.dataView.getUint16(position);
  },
  inspectUint24(position_) {
    const position = position_ != null ? position_ : this.position;
    this.assertPosition(position + 2);
    return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
  },
  inspectUint32(position_) {
    const position = position_ != null ? position_ : this.position;
    this.assertPosition(position + 3);
    return this.dataView.getUint32(position);
  },
  pushByte(byte) {
    this.assertPosition(this.position);
    this.bytes[this.position] = byte;
    this.position++;
  },
  pushBytes(bytes) {
    this.assertPosition(this.position + bytes.length - 1);
    this.bytes.set(bytes, this.position);
    this.position += bytes.length;
  },
  pushUint8(value) {
    this.assertPosition(this.position);
    this.bytes[this.position] = value;
    this.position++;
  },
  pushUint16(value) {
    this.assertPosition(this.position + 1);
    this.dataView.setUint16(this.position, value);
    this.position += 2;
  },
  pushUint24(value) {
    this.assertPosition(this.position + 2);
    this.dataView.setUint16(this.position, value >> 8);
    this.dataView.setUint8(this.position + 2, value & ~4294967040);
    this.position += 3;
  },
  pushUint32(value) {
    this.assertPosition(this.position + 3);
    this.dataView.setUint32(this.position, value);
    this.position += 4;
  },
  readByte() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectByte();
    this.position++;
    return value;
  },
  readBytes(length, size2) {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectBytes(length);
    this.position += size2 != null ? size2 : length;
    return value;
  },
  readUint8() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint8();
    this.position += 1;
    return value;
  },
  readUint16() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint16();
    this.position += 2;
    return value;
  },
  readUint24() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint24();
    this.position += 3;
    return value;
  },
  readUint32() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint32();
    this.position += 4;
    return value;
  },
  get remaining() {
    return this.bytes.length - this.position;
  },
  setPosition(position) {
    const oldPosition = this.position;
    this.assertPosition(position);
    this.position = position;
    return () => this.position = oldPosition;
  },
  _touch() {
    if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
      return;
    const count = this.getReadCount();
    this.positionReadCount.set(this.position, count + 1);
    if (count > 0)
      this.recursiveReadCount++;
  }
};
function createCursor(bytes, { recursiveReadLimit = 8192 } = {}) {
  const cursor = Object.create(staticCursor);
  cursor.bytes = bytes;
  cursor.dataView = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  cursor.positionReadCount = /* @__PURE__ */ new Map();
  cursor.recursiveReadLimit = recursiveReadLimit;
  return cursor;
}

// ../../node_modules/viem/_esm/utils/encoding/toRlp.js
function toRlp(bytes, to = "hex") {
  const encodable = getEncodable(bytes);
  const cursor = createCursor(new Uint8Array(encodable.length));
  encodable.encode(cursor);
  if (to === "hex")
    return bytesToHex(cursor.bytes);
  return cursor.bytes;
}
function getEncodable(bytes) {
  if (Array.isArray(bytes))
    return getEncodableList(bytes.map((x) => getEncodable(x)));
  return getEncodableBytes(bytes);
}
function getEncodableList(list) {
  const bodyLength = list.reduce((acc, x) => acc + x.length, 0);
  const sizeOfBodyLength = getSizeOfLength(bodyLength);
  const length = (() => {
    if (bodyLength <= 55)
      return 1 + bodyLength;
    return 1 + sizeOfBodyLength + bodyLength;
  })();
  return {
    length,
    encode(cursor) {
      if (bodyLength <= 55) {
        cursor.pushByte(192 + bodyLength);
      } else {
        cursor.pushByte(192 + 55 + sizeOfBodyLength);
        if (sizeOfBodyLength === 1)
          cursor.pushUint8(bodyLength);
        else if (sizeOfBodyLength === 2)
          cursor.pushUint16(bodyLength);
        else if (sizeOfBodyLength === 3)
          cursor.pushUint24(bodyLength);
        else
          cursor.pushUint32(bodyLength);
      }
      for (const { encode } of list) {
        encode(cursor);
      }
    }
  };
}
function getEncodableBytes(bytesOrHex) {
  const bytes = typeof bytesOrHex === "string" ? hexToBytes(bytesOrHex) : bytesOrHex;
  const sizeOfBytesLength = getSizeOfLength(bytes.length);
  const length = (() => {
    if (bytes.length === 1 && bytes[0] < 128)
      return 1;
    if (bytes.length <= 55)
      return 1 + bytes.length;
    return 1 + sizeOfBytesLength + bytes.length;
  })();
  return {
    length,
    encode(cursor) {
      if (bytes.length === 1 && bytes[0] < 128) {
        cursor.pushBytes(bytes);
      } else if (bytes.length <= 55) {
        cursor.pushByte(128 + bytes.length);
        cursor.pushBytes(bytes);
      } else {
        cursor.pushByte(128 + 55 + sizeOfBytesLength);
        if (sizeOfBytesLength === 1)
          cursor.pushUint8(bytes.length);
        else if (sizeOfBytesLength === 2)
          cursor.pushUint16(bytes.length);
        else if (sizeOfBytesLength === 3)
          cursor.pushUint24(bytes.length);
        else
          cursor.pushUint32(bytes.length);
        cursor.pushBytes(bytes);
      }
    }
  };
}
function getSizeOfLength(length) {
  if (length < 2 ** 8)
    return 1;
  if (length < 2 ** 16)
    return 2;
  if (length < 2 ** 24)
    return 3;
  if (length < 2 ** 32)
    return 4;
  throw new BaseError("Length is too large.");
}

// ../../node_modules/viem/_esm/constants/unit.js
var gweiUnits = {
  ether: -9,
  wei: 9
};

// ../../node_modules/viem/_esm/utils/unit/formatUnits.js
function formatUnits(value, decimals) {
  let display = value.toString();
  const negative = display.startsWith("-");
  if (negative)
    display = display.slice(1);
  display = display.padStart(decimals, "0");
  let [integer, fraction] = [
    display.slice(0, display.length - decimals),
    display.slice(display.length - decimals)
  ];
  fraction = fraction.replace(/(0+)$/, "");
  return `${negative ? "-" : ""}${integer || "0"}${fraction ? `.${fraction}` : ""}`;
}

// ../../node_modules/viem/_esm/utils/unit/formatGwei.js
function formatGwei(wei, unit = "wei") {
  return formatUnits(wei, gweiUnits[unit]);
}

// ../../node_modules/viem/_esm/errors/transaction.js
function prettyPrint(args) {
  const entries = Object.entries(args).map(([key, value]) => {
    if (value === void 0 || value === false)
      return null;
    return [key, value];
  }).filter(Boolean);
  const maxLength = entries.reduce((acc, [key]) => Math.max(acc, key.length), 0);
  return entries.map(([key, value]) => `  ${`${key}:`.padEnd(maxLength + 1)}  ${value}`).join("\n");
}
var InvalidLegacyVError = class extends BaseError {
  constructor({ v }) {
    super(`Invalid \`v\` value "${v}". Expected 27 or 28.`, {
      name: "InvalidLegacyVError"
    });
  }
};
var InvalidSerializableTransactionError = class extends BaseError {
  constructor({ transaction }) {
    super("Cannot infer a transaction type from provided transaction.", {
      metaMessages: [
        "Provided Transaction:",
        "{",
        prettyPrint(transaction),
        "}",
        "",
        "To infer the type, either provide:",
        "- a `type` to the Transaction, or",
        "- an EIP-1559 Transaction with `maxFeePerGas`, or",
        "- an EIP-2930 Transaction with `gasPrice` & `accessList`, or",
        "- an EIP-4844 Transaction with `blobs`, `blobVersionedHashes`, `sidecars`, or",
        "- an EIP-7702 Transaction with `authorizationList`, or",
        "- a Legacy Transaction with `gasPrice`"
      ],
      name: "InvalidSerializableTransactionError"
    });
  }
};
var InvalidStorageKeySizeError = class extends BaseError {
  constructor({ storageKey }) {
    super(`Size for storage key "${storageKey}" is invalid. Expected 32 bytes. Got ${Math.floor((storageKey.length - 2) / 2)} bytes.`, { name: "InvalidStorageKeySizeError" });
  }
};

// ../../node_modules/viem/_esm/utils/authorization/serializeAuthorizationList.js
function serializeAuthorizationList(authorizationList) {
  if (!authorizationList || authorizationList.length === 0)
    return [];
  const serializedAuthorizationList = [];
  for (const authorization of authorizationList) {
    const _a = authorization, { chainId, nonce } = _a, signature = __objRest(_a, ["chainId", "nonce"]);
    const contractAddress = authorization.address;
    serializedAuthorizationList.push([
      chainId ? toHex(chainId) : "0x",
      contractAddress,
      nonce ? toHex(nonce) : "0x",
      ...toYParitySignatureArray({}, signature)
    ]);
  }
  return serializedAuthorizationList;
}

// ../../node_modules/viem/_esm/utils/blob/blobsToCommitments.js
function blobsToCommitments(parameters) {
  var _a;
  const { kzg } = parameters;
  const to = (_a = parameters.to) != null ? _a : typeof parameters.blobs[0] === "string" ? "hex" : "bytes";
  const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes(x)) : parameters.blobs;
  const commitments = [];
  for (const blob of blobs)
    commitments.push(Uint8Array.from(kzg.blobToKzgCommitment(blob)));
  return to === "bytes" ? commitments : commitments.map((x) => bytesToHex(x));
}

// ../../node_modules/viem/_esm/utils/blob/blobsToProofs.js
function blobsToProofs(parameters) {
  var _a;
  const { kzg } = parameters;
  const to = (_a = parameters.to) != null ? _a : typeof parameters.blobs[0] === "string" ? "hex" : "bytes";
  const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes(x)) : parameters.blobs;
  const commitments = typeof parameters.commitments[0] === "string" ? parameters.commitments.map((x) => hexToBytes(x)) : parameters.commitments;
  const proofs = [];
  for (let i = 0; i < blobs.length; i++) {
    const blob = blobs[i];
    const commitment = commitments[i];
    proofs.push(Uint8Array.from(kzg.computeBlobKzgProof(blob, commitment)));
  }
  return to === "bytes" ? proofs : proofs.map((x) => bytesToHex(x));
}

// ../../node_modules/@noble/hashes/esm/utils.js
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function anumber(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function abytes(b, ...lengths) {
  if (!isBytes(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
  return word << 32 - shift | word >>> shift;
}
var isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
function byteSwap(word) {
  return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
function byteSwap32(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = byteSwap(arr[i]);
  }
  return arr;
}
var swap32IfBE = isLE ? (u) => u : byteSwap32;
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes2(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  abytes(data);
  return data;
}
var Hash = class {
};
function createHasher(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes2(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}

// ../../node_modules/@noble/hashes/esm/_md.js
function setBigUint64(view, byteOffset, value, isLE2) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE2);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE2 ? 4 : 0;
  const l = isLE2 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE2);
  view.setUint32(byteOffset + l, wl, isLE2);
}
function Chi(a, b, c) {
  return a & b ^ ~a & c;
}
function Maj(a, b, c) {
  return a & b ^ a & c ^ b & c;
}
var HashMD = class extends Hash {
  constructor(blockLen, outputLen, padOffset, isLE2) {
    super();
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE2;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    aexists(this);
    data = toBytes2(data);
    abytes(data);
    const { view, buffer, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE2 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    clean(this.buffer.subarray(pos));
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i = pos; i < blockLen; i++)
      buffer[i] = 0;
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i = 0; i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE2);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor());
    to.set(...this.get());
    const { blockLen, buffer, length, finished, destroyed, pos } = this;
    to.destroyed = destroyed;
    to.finished = finished;
    to.length = length;
    to.pos = pos;
    if (length % blockLen)
      to.buffer.set(buffer);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
};
var SHA256_IV = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);

// ../../node_modules/@noble/hashes/esm/_u64.js
var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
var _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  const len = lst.length;
  let Ah = new Uint32Array(len);
  let Al = new Uint32Array(len);
  for (let i = 0; i < len; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;

// ../../node_modules/@noble/hashes/esm/sha2.js
var SHA256_K = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
var SHA256 = class extends HashMD {
  constructor(outputLen = 32) {
    super(64, outputLen, 8, false);
    this.A = SHA256_IV[0] | 0;
    this.B = SHA256_IV[1] | 0;
    this.C = SHA256_IV[2] | 0;
    this.D = SHA256_IV[3] | 0;
    this.E = SHA256_IV[4] | 0;
    this.F = SHA256_IV[5] | 0;
    this.G = SHA256_IV[6] | 0;
    this.H = SHA256_IV[7] | 0;
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  // prettier-ignore
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SHA256_W[i] = view.getUint32(offset, false);
    for (let i = 16; i < 64; i++) {
      const W15 = SHA256_W[i - 15];
      const W2 = SHA256_W[i - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let i = 0; i < 64; i++) {
      const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
      const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
      const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
      const T2 = sigma0 + Maj(A, B, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    clean(SHA256_W);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    clean(this.buffer);
  }
};
var sha256 = /* @__PURE__ */ createHasher(() => new SHA256());

// ../../node_modules/@noble/hashes/esm/sha256.js
var sha2562 = sha256;

// ../../node_modules/viem/_esm/utils/hash/sha256.js
function sha2563(value, to_) {
  const to = to_ || "hex";
  const bytes = sha2562(isHex(value, { strict: false }) ? toBytes(value) : value);
  if (to === "bytes")
    return bytes;
  return toHex(bytes);
}

// ../../node_modules/viem/_esm/utils/blob/commitmentToVersionedHash.js
function commitmentToVersionedHash(parameters) {
  var _a;
  const { commitment, version: version2 = 1 } = parameters;
  const to = (_a = parameters.to) != null ? _a : typeof commitment === "string" ? "hex" : "bytes";
  const versionedHash = sha2563(commitment, "bytes");
  versionedHash.set([version2], 0);
  return to === "bytes" ? versionedHash : bytesToHex(versionedHash);
}

// ../../node_modules/viem/_esm/utils/blob/commitmentsToVersionedHashes.js
function commitmentsToVersionedHashes(parameters) {
  var _a;
  const { commitments, version: version2 } = parameters;
  const to = (_a = parameters.to) != null ? _a : typeof commitments[0] === "string" ? "hex" : "bytes";
  const hashes = [];
  for (const commitment of commitments) {
    hashes.push(commitmentToVersionedHash({
      commitment,
      to,
      version: version2
    }));
  }
  return hashes;
}

// ../../node_modules/viem/_esm/constants/blob.js
var blobsPerTransaction = 6;
var bytesPerFieldElement = 32;
var fieldElementsPerBlob = 4096;
var bytesPerBlob = bytesPerFieldElement * fieldElementsPerBlob;
var maxBytesPerTransaction = bytesPerBlob * blobsPerTransaction - // terminator byte (0x80).
1 - // zero byte (0x00) appended to each field element.
1 * fieldElementsPerBlob * blobsPerTransaction;

// ../../node_modules/viem/_esm/constants/kzg.js
var versionedHashVersionKzg = 1;

// ../../node_modules/viem/_esm/errors/blob.js
var BlobSizeTooLargeError = class extends BaseError {
  constructor({ maxSize, size: size2 }) {
    super("Blob size is too large.", {
      metaMessages: [`Max: ${maxSize} bytes`, `Given: ${size2} bytes`],
      name: "BlobSizeTooLargeError"
    });
  }
};
var EmptyBlobError = class extends BaseError {
  constructor() {
    super("Blob data must not be empty.", { name: "EmptyBlobError" });
  }
};
var InvalidVersionedHashSizeError = class extends BaseError {
  constructor({ hash, size: size2 }) {
    super(`Versioned hash "${hash}" size is invalid.`, {
      metaMessages: ["Expected: 32", `Received: ${size2}`],
      name: "InvalidVersionedHashSizeError"
    });
  }
};
var InvalidVersionedHashVersionError = class extends BaseError {
  constructor({ hash, version: version2 }) {
    super(`Versioned hash "${hash}" version is invalid.`, {
      metaMessages: [
        `Expected: ${versionedHashVersionKzg}`,
        `Received: ${version2}`
      ],
      name: "InvalidVersionedHashVersionError"
    });
  }
};

// ../../node_modules/viem/_esm/utils/blob/toBlobs.js
function toBlobs(parameters) {
  var _a;
  const to = (_a = parameters.to) != null ? _a : typeof parameters.data === "string" ? "hex" : "bytes";
  const data = typeof parameters.data === "string" ? hexToBytes(parameters.data) : parameters.data;
  const size_ = size(data);
  if (!size_)
    throw new EmptyBlobError();
  if (size_ > maxBytesPerTransaction)
    throw new BlobSizeTooLargeError({
      maxSize: maxBytesPerTransaction,
      size: size_
    });
  const blobs = [];
  let active = true;
  let position = 0;
  while (active) {
    const blob = createCursor(new Uint8Array(bytesPerBlob));
    let size2 = 0;
    while (size2 < fieldElementsPerBlob) {
      const bytes = data.slice(position, position + (bytesPerFieldElement - 1));
      blob.pushByte(0);
      blob.pushBytes(bytes);
      if (bytes.length < 31) {
        blob.pushByte(128);
        active = false;
        break;
      }
      size2++;
      position += 31;
    }
    blobs.push(blob);
  }
  return to === "bytes" ? blobs.map((x) => x.bytes) : blobs.map((x) => bytesToHex(x.bytes));
}

// ../../node_modules/viem/_esm/utils/blob/toBlobSidecars.js
function toBlobSidecars(parameters) {
  var _a, _b, _c;
  const { data, kzg, to } = parameters;
  const blobs = (_a = parameters.blobs) != null ? _a : toBlobs({ data, to });
  const commitments = (_b = parameters.commitments) != null ? _b : blobsToCommitments({ blobs, kzg, to });
  const proofs = (_c = parameters.proofs) != null ? _c : blobsToProofs({ blobs, commitments, kzg, to });
  const sidecars = [];
  for (let i = 0; i < blobs.length; i++)
    sidecars.push({
      blob: blobs[i],
      commitment: commitments[i],
      proof: proofs[i]
    });
  return sidecars;
}

// ../../node_modules/viem/_esm/errors/address.js
var InvalidAddressError = class extends BaseError {
  constructor({ address }) {
    super(`Address "${address}" is invalid.`, {
      metaMessages: [
        "- Address must be a hex value of 20 bytes (40 hex characters).",
        "- Address must match its checksum counterpart."
      ],
      name: "InvalidAddressError"
    });
  }
};

// ../../node_modules/viem/_esm/errors/chain.js
var InvalidChainIdError = class extends BaseError {
  constructor({ chainId }) {
    super(typeof chainId === "number" ? `Chain ID "${chainId}" is invalid.` : "Chain ID is invalid.", { name: "InvalidChainIdError" });
  }
};

// ../../node_modules/viem/_esm/errors/node.js
var ExecutionRevertedError = class extends BaseError {
  constructor({ cause, message } = {}) {
    var _a;
    const reason = (_a = message == null ? void 0 : message.replace("execution reverted: ", "")) == null ? void 0 : _a.replace("execution reverted", "");
    super(`Execution reverted ${reason ? `with reason: ${reason}` : "for an unknown reason"}.`, {
      cause,
      name: "ExecutionRevertedError"
    });
  }
};
Object.defineProperty(ExecutionRevertedError, "code", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: 3
});
Object.defineProperty(ExecutionRevertedError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /execution reverted/
});
var FeeCapTooHighError = class extends BaseError {
  constructor({ cause, maxFeePerGas } = {}) {
    super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`, {
      cause,
      name: "FeeCapTooHighError"
    });
  }
};
Object.defineProperty(FeeCapTooHighError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/
});
var FeeCapTooLowError = class extends BaseError {
  constructor({ cause, maxFeePerGas } = {}) {
    super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)}` : ""} gwei) cannot be lower than the block base fee.`, {
      cause,
      name: "FeeCapTooLowError"
    });
  }
};
Object.defineProperty(FeeCapTooLowError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/
});
var NonceTooHighError = class extends BaseError {
  constructor({ cause, nonce } = {}) {
    super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is higher than the next one expected.`, { cause, name: "NonceTooHighError" });
  }
};
Object.defineProperty(NonceTooHighError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /nonce too high/
});
var NonceTooLowError = class extends BaseError {
  constructor({ cause, nonce } = {}) {
    super([
      `Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is lower than the current nonce of the account.`,
      "Try increasing the nonce or find the latest nonce with `getTransactionCount`."
    ].join("\n"), { cause, name: "NonceTooLowError" });
  }
};
Object.defineProperty(NonceTooLowError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /nonce too low|transaction already imported|already known/
});
var NonceMaxValueError = class extends BaseError {
  constructor({ cause, nonce } = {}) {
    super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}exceeds the maximum allowed nonce.`, { cause, name: "NonceMaxValueError" });
  }
};
Object.defineProperty(NonceMaxValueError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /nonce has max value/
});
var InsufficientFundsError = class extends BaseError {
  constructor({ cause } = {}) {
    super([
      "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account."
    ].join("\n"), {
      cause,
      metaMessages: [
        "This error could arise when the account does not have enough funds to:",
        " - pay for the total gas fee,",
        " - pay for the value to send.",
        " ",
        "The cost of the transaction is calculated as `gas * gas fee + value`, where:",
        " - `gas` is the amount of gas needed for transaction to execute,",
        " - `gas fee` is the gas fee,",
        " - `value` is the amount of ether to send to the recipient."
      ],
      name: "InsufficientFundsError"
    });
  }
};
Object.defineProperty(InsufficientFundsError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /insufficient funds|exceeds transaction sender account balance/
});
var IntrinsicGasTooHighError = class extends BaseError {
  constructor({ cause, gas } = {}) {
    super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`, {
      cause,
      name: "IntrinsicGasTooHighError"
    });
  }
};
Object.defineProperty(IntrinsicGasTooHighError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /intrinsic gas too high|gas limit reached/
});
var IntrinsicGasTooLowError = class extends BaseError {
  constructor({ cause, gas } = {}) {
    super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction is too low.`, {
      cause,
      name: "IntrinsicGasTooLowError"
    });
  }
};
Object.defineProperty(IntrinsicGasTooLowError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /intrinsic gas too low/
});
var TransactionTypeNotSupportedError = class extends BaseError {
  constructor({ cause }) {
    super("The transaction type is not supported for this chain.", {
      cause,
      name: "TransactionTypeNotSupportedError"
    });
  }
};
Object.defineProperty(TransactionTypeNotSupportedError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /transaction type not valid/
});
var TipAboveFeeCapError = class extends BaseError {
  constructor({ cause, maxPriorityFeePerGas, maxFeePerGas } = {}) {
    super([
      `The provided tip (\`maxPriorityFeePerGas\`${maxPriorityFeePerGas ? ` = ${formatGwei(maxPriorityFeePerGas)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}).`
    ].join("\n"), {
      cause,
      name: "TipAboveFeeCapError"
    });
  }
};
Object.defineProperty(TipAboveFeeCapError, "nodeMessage", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /max priority fee per gas higher than max fee per gas|tip higher than fee cap/
});

// ../../node_modules/viem/_esm/utils/lru.js
var LruMap = class extends Map {
  constructor(size2) {
    super();
    Object.defineProperty(this, "maxSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxSize = size2;
  }
  get(key) {
    const value = super.get(key);
    if (super.has(key) && value !== void 0) {
      this.delete(key);
      super.set(key, value);
    }
    return value;
  }
  set(key, value) {
    super.set(key, value);
    if (this.maxSize && this.size > this.maxSize) {
      const firstKey = this.keys().next().value;
      if (firstKey)
        this.delete(firstKey);
    }
    return this;
  }
};

// ../../node_modules/@noble/hashes/esm/sha3.js
var _0n = BigInt(0);
var _1n = BigInt(1);
var _2n = BigInt(2);
var _7n = BigInt(7);
var _256n = BigInt(256);
var _0x71n = BigInt(113);
var SHA3_PI = [];
var SHA3_ROTL = [];
var _SHA3_IOTA = [];
for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
  [x, y] = [y, (2 * x + 3 * y) % 5];
  SHA3_PI.push(2 * (5 * y + x));
  SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
  let t = _0n;
  for (let j = 0; j < 7; j++) {
    R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
    if (R & _2n)
      t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
  }
  _SHA3_IOTA.push(t);
}
var IOTAS = split(_SHA3_IOTA, true);
var SHA3_IOTA_H = IOTAS[0];
var SHA3_IOTA_L = IOTAS[1];
var rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
var rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
function keccakP(s, rounds = 24) {
  const B = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x = 0; x < 10; x++)
      B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
    for (let x = 0; x < 10; x += 2) {
      const idx1 = (x + 8) % 10;
      const idx0 = (x + 2) % 10;
      const B0 = B[idx0];
      const B1 = B[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
      for (let y = 0; y < 50; y += 10) {
        s[x + y] ^= Th;
        s[x + y + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y = 0; y < 50; y += 10) {
      for (let x = 0; x < 10; x++)
        B[x] = s[y + x];
      for (let x = 0; x < 10; x++)
        s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  clean(B);
}
var Keccak = class _Keccak extends Hash {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    super();
    this.pos = 0;
    this.posOut = 0;
    this.finished = false;
    this.destroyed = false;
    this.enableXOF = false;
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.rounds = rounds;
    anumber(outputLen);
    if (!(0 < blockLen && blockLen < 200))
      throw new Error("only keccak-f1600 function is supported");
    this.state = new Uint8Array(200);
    this.state32 = u32(this.state);
  }
  clone() {
    return this._cloneInto();
  }
  keccak() {
    swap32IfBE(this.state32);
    keccakP(this.state32, this.rounds);
    swap32IfBE(this.state32);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data) {
    aexists(this);
    data = toBytes2(data);
    abytes(data);
    const { blockLen, state } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i = 0; i < take; i++)
        state[this.pos++] ^= data[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out) {
    aexists(this, false);
    abytes(out);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out.length; pos < len; ) {
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes) {
    anumber(bytes);
    return this.xofInto(new Uint8Array(bytes));
  }
  digestInto(out) {
    aoutput(out, this);
    if (this.finished)
      throw new Error("digest() was already called");
    this.writeInto(out);
    this.destroy();
    return out;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true;
    clean(this.state);
  }
  _cloneInto(to) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
    to.state32.set(this.state32);
    to.pos = this.pos;
    to.posOut = this.posOut;
    to.finished = this.finished;
    to.rounds = rounds;
    to.suffix = suffix;
    to.outputLen = outputLen;
    to.enableXOF = enableXOF;
    to.destroyed = this.destroyed;
    return to;
  }
};
var gen = (suffix, blockLen, outputLen) => createHasher(() => new Keccak(blockLen, suffix, outputLen));
var keccak_256 = /* @__PURE__ */ (() => gen(1, 136, 256 / 8))();

// ../../node_modules/viem/_esm/utils/hash/keccak256.js
function keccak256(value, to_) {
  const to = to_ || "hex";
  const bytes = keccak_256(isHex(value, { strict: false }) ? toBytes(value) : value);
  if (to === "bytes")
    return bytes;
  return toHex(bytes);
}

// ../../node_modules/viem/_esm/utils/address/getAddress.js
var checksumAddressCache = /* @__PURE__ */ new LruMap(8192);
function checksumAddress(address_, chainId) {
  if (checksumAddressCache.has(`${address_}.${chainId}`))
    return checksumAddressCache.get(`${address_}.${chainId}`);
  const hexAddress = chainId ? `${chainId}${address_.toLowerCase()}` : address_.substring(2).toLowerCase();
  const hash = keccak256(stringToBytes(hexAddress), "bytes");
  const address = (chainId ? hexAddress.substring(`${chainId}0x`.length) : hexAddress).split("");
  for (let i = 0; i < 40; i += 2) {
    if (hash[i >> 1] >> 4 >= 8 && address[i]) {
      address[i] = address[i].toUpperCase();
    }
    if ((hash[i >> 1] & 15) >= 8 && address[i + 1]) {
      address[i + 1] = address[i + 1].toUpperCase();
    }
  }
  const result = `0x${address.join("")}`;
  checksumAddressCache.set(`${address_}.${chainId}`, result);
  return result;
}

// ../../node_modules/viem/_esm/utils/address/isAddress.js
var addressRegex = /^0x[a-fA-F0-9]{40}$/;
var isAddressCache = /* @__PURE__ */ new LruMap(8192);
function isAddress(address, options) {
  const { strict = true } = options != null ? options : {};
  const cacheKey = `${address}.${strict}`;
  if (isAddressCache.has(cacheKey))
    return isAddressCache.get(cacheKey);
  const result = (() => {
    if (!addressRegex.test(address))
      return false;
    if (address.toLowerCase() === address)
      return true;
    if (strict)
      return checksumAddress(address) === address;
    return true;
  })();
  isAddressCache.set(cacheKey, result);
  return result;
}

// ../../node_modules/viem/_esm/utils/data/slice.js
function slice(value, start, end, { strict } = {}) {
  if (isHex(value, { strict: false }))
    return sliceHex(value, start, end, {
      strict
    });
  return sliceBytes(value, start, end, {
    strict
  });
}
function assertStartOffset(value, start) {
  if (typeof start === "number" && start > 0 && start > size(value) - 1)
    throw new SliceOffsetOutOfBoundsError({
      offset: start,
      position: "start",
      size: size(value)
    });
}
function assertEndOffset(value, start, end) {
  if (typeof start === "number" && typeof end === "number" && size(value) !== end - start) {
    throw new SliceOffsetOutOfBoundsError({
      offset: end,
      position: "end",
      size: size(value)
    });
  }
}
function sliceBytes(value_, start, end, { strict } = {}) {
  assertStartOffset(value_, start);
  const value = value_.slice(start, end);
  if (strict)
    assertEndOffset(value, start, end);
  return value;
}
function sliceHex(value_, start, end, { strict } = {}) {
  assertStartOffset(value_, start);
  const value = `0x${value_.replace("0x", "").slice((start != null ? start : 0) * 2, (end != null ? end : value_.length) * 2)}`;
  if (strict)
    assertEndOffset(value, start, end);
  return value;
}

// ../../node_modules/viem/_esm/utils/transaction/assertTransaction.js
function assertTransactionEIP7702(transaction) {
  const { authorizationList } = transaction;
  if (authorizationList) {
    for (const authorization of authorizationList) {
      const { chainId } = authorization;
      const address = authorization.address;
      if (!isAddress(address))
        throw new InvalidAddressError({ address });
      if (chainId < 0)
        throw new InvalidChainIdError({ chainId });
    }
  }
  assertTransactionEIP1559(transaction);
}
function assertTransactionEIP4844(transaction) {
  const { blobVersionedHashes } = transaction;
  if (blobVersionedHashes) {
    if (blobVersionedHashes.length === 0)
      throw new EmptyBlobError();
    for (const hash of blobVersionedHashes) {
      const size_ = size(hash);
      const version2 = hexToNumber(slice(hash, 0, 1));
      if (size_ !== 32)
        throw new InvalidVersionedHashSizeError({ hash, size: size_ });
      if (version2 !== versionedHashVersionKzg)
        throw new InvalidVersionedHashVersionError({
          hash,
          version: version2
        });
    }
  }
  assertTransactionEIP1559(transaction);
}
function assertTransactionEIP1559(transaction) {
  const { chainId, maxPriorityFeePerGas, maxFeePerGas, to } = transaction;
  if (chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
  if (maxFeePerGas && maxFeePerGas > maxUint256)
    throw new FeeCapTooHighError({ maxFeePerGas });
  if (maxPriorityFeePerGas && maxFeePerGas && maxPriorityFeePerGas > maxFeePerGas)
    throw new TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
}
function assertTransactionEIP2930(transaction) {
  const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to } = transaction;
  if (chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
  if (maxPriorityFeePerGas || maxFeePerGas)
    throw new BaseError("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid EIP-2930 Transaction attribute.");
  if (gasPrice && gasPrice > maxUint256)
    throw new FeeCapTooHighError({ maxFeePerGas: gasPrice });
}
function assertTransactionLegacy(transaction) {
  const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to } = transaction;
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
  if (typeof chainId !== "undefined" && chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (maxPriorityFeePerGas || maxFeePerGas)
    throw new BaseError("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid Legacy Transaction attribute.");
  if (gasPrice && gasPrice > maxUint256)
    throw new FeeCapTooHighError({ maxFeePerGas: gasPrice });
}

// ../../node_modules/viem/_esm/utils/transaction/getTransactionType.js
function getTransactionType(transaction) {
  if (transaction.type)
    return transaction.type;
  if (typeof transaction.authorizationList !== "undefined")
    return "eip7702";
  if (typeof transaction.blobs !== "undefined" || typeof transaction.blobVersionedHashes !== "undefined" || typeof transaction.maxFeePerBlobGas !== "undefined" || typeof transaction.sidecars !== "undefined")
    return "eip4844";
  if (typeof transaction.maxFeePerGas !== "undefined" || typeof transaction.maxPriorityFeePerGas !== "undefined") {
    return "eip1559";
  }
  if (typeof transaction.gasPrice !== "undefined") {
    if (typeof transaction.accessList !== "undefined")
      return "eip2930";
    return "legacy";
  }
  throw new InvalidSerializableTransactionError({ transaction });
}

// ../../node_modules/viem/_esm/utils/transaction/serializeAccessList.js
function serializeAccessList(accessList) {
  if (!accessList || accessList.length === 0)
    return [];
  const serializedAccessList = [];
  for (let i = 0; i < accessList.length; i++) {
    const { address, storageKeys } = accessList[i];
    for (let j = 0; j < storageKeys.length; j++) {
      if (storageKeys[j].length - 2 !== 64) {
        throw new InvalidStorageKeySizeError({ storageKey: storageKeys[j] });
      }
    }
    if (!isAddress(address, { strict: false })) {
      throw new InvalidAddressError({ address });
    }
    serializedAccessList.push([address, storageKeys]);
  }
  return serializedAccessList;
}

// ../../node_modules/viem/_esm/utils/transaction/serializeTransaction.js
function serializeTransaction(transaction, signature) {
  const type = getTransactionType(transaction);
  if (type === "eip1559")
    return serializeTransactionEIP1559(transaction, signature);
  if (type === "eip2930")
    return serializeTransactionEIP2930(transaction, signature);
  if (type === "eip4844")
    return serializeTransactionEIP4844(transaction, signature);
  if (type === "eip7702")
    return serializeTransactionEIP7702(transaction, signature);
  return serializeTransactionLegacy(transaction, signature);
}
function serializeTransactionEIP7702(transaction, signature) {
  const { authorizationList, chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
  assertTransactionEIP7702(transaction);
  const serializedAccessList = serializeAccessList(accessList);
  const serializedAuthorizationList = serializeAuthorizationList(authorizationList);
  return concatHex([
    "0x04",
    toRlp([
      toHex(chainId),
      nonce ? toHex(nonce) : "0x",
      maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : "0x",
      maxFeePerGas ? toHex(maxFeePerGas) : "0x",
      gas ? toHex(gas) : "0x",
      to != null ? to : "0x",
      value ? toHex(value) : "0x",
      data != null ? data : "0x",
      serializedAccessList,
      serializedAuthorizationList,
      ...toYParitySignatureArray(transaction, signature)
    ])
  ]);
}
function serializeTransactionEIP4844(transaction, signature) {
  const { chainId, gas, nonce, to, value, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
  assertTransactionEIP4844(transaction);
  let blobVersionedHashes = transaction.blobVersionedHashes;
  let sidecars = transaction.sidecars;
  if (transaction.blobs && (typeof blobVersionedHashes === "undefined" || typeof sidecars === "undefined")) {
    const blobs2 = typeof transaction.blobs[0] === "string" ? transaction.blobs : transaction.blobs.map((x) => bytesToHex(x));
    const kzg = transaction.kzg;
    const commitments2 = blobsToCommitments({
      blobs: blobs2,
      kzg
    });
    if (typeof blobVersionedHashes === "undefined")
      blobVersionedHashes = commitmentsToVersionedHashes({
        commitments: commitments2
      });
    if (typeof sidecars === "undefined") {
      const proofs2 = blobsToProofs({ blobs: blobs2, commitments: commitments2, kzg });
      sidecars = toBlobSidecars({ blobs: blobs2, commitments: commitments2, proofs: proofs2 });
    }
  }
  const serializedAccessList = serializeAccessList(accessList);
  const serializedTransaction = [
    toHex(chainId),
    nonce ? toHex(nonce) : "0x",
    maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? toHex(maxFeePerGas) : "0x",
    gas ? toHex(gas) : "0x",
    to != null ? to : "0x",
    value ? toHex(value) : "0x",
    data != null ? data : "0x",
    serializedAccessList,
    maxFeePerBlobGas ? toHex(maxFeePerBlobGas) : "0x",
    blobVersionedHashes != null ? blobVersionedHashes : [],
    ...toYParitySignatureArray(transaction, signature)
  ];
  const blobs = [];
  const commitments = [];
  const proofs = [];
  if (sidecars)
    for (let i = 0; i < sidecars.length; i++) {
      const { blob, commitment, proof } = sidecars[i];
      blobs.push(blob);
      commitments.push(commitment);
      proofs.push(proof);
    }
  return concatHex([
    "0x03",
    sidecars ? (
      // If sidecars are enabled, envelope turns into a "wrapper":
      toRlp([serializedTransaction, blobs, commitments, proofs])
    ) : (
      // If sidecars are disabled, standard envelope is used:
      toRlp(serializedTransaction)
    )
  ]);
}
function serializeTransactionEIP1559(transaction, signature) {
  const { chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
  assertTransactionEIP1559(transaction);
  const serializedAccessList = serializeAccessList(accessList);
  const serializedTransaction = [
    toHex(chainId),
    nonce ? toHex(nonce) : "0x",
    maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? toHex(maxFeePerGas) : "0x",
    gas ? toHex(gas) : "0x",
    to != null ? to : "0x",
    value ? toHex(value) : "0x",
    data != null ? data : "0x",
    serializedAccessList,
    ...toYParitySignatureArray(transaction, signature)
  ];
  return concatHex([
    "0x02",
    toRlp(serializedTransaction)
  ]);
}
function serializeTransactionEIP2930(transaction, signature) {
  const { chainId, gas, data, nonce, to, value, accessList, gasPrice } = transaction;
  assertTransactionEIP2930(transaction);
  const serializedAccessList = serializeAccessList(accessList);
  const serializedTransaction = [
    toHex(chainId),
    nonce ? toHex(nonce) : "0x",
    gasPrice ? toHex(gasPrice) : "0x",
    gas ? toHex(gas) : "0x",
    to != null ? to : "0x",
    value ? toHex(value) : "0x",
    data != null ? data : "0x",
    serializedAccessList,
    ...toYParitySignatureArray(transaction, signature)
  ];
  return concatHex([
    "0x01",
    toRlp(serializedTransaction)
  ]);
}
function serializeTransactionLegacy(transaction, signature) {
  const { chainId = 0, gas, data, nonce, to, value, gasPrice } = transaction;
  assertTransactionLegacy(transaction);
  let serializedTransaction = [
    nonce ? toHex(nonce) : "0x",
    gasPrice ? toHex(gasPrice) : "0x",
    gas ? toHex(gas) : "0x",
    to != null ? to : "0x",
    value ? toHex(value) : "0x",
    data != null ? data : "0x"
  ];
  if (signature) {
    const v = (() => {
      if (signature.v >= /* @__PURE__ */ BigInt("35")) {
        const inferredChainId = (signature.v - /* @__PURE__ */ BigInt("35")) / /* @__PURE__ */ BigInt("2");
        if (inferredChainId > 0)
          return signature.v;
        return /* @__PURE__ */ BigInt("27") + (signature.v === /* @__PURE__ */ BigInt("35") ? /* @__PURE__ */ BigInt("0") : /* @__PURE__ */ BigInt("1"));
      }
      if (chainId > 0)
        return BigInt(chainId * 2) + BigInt(/* @__PURE__ */ BigInt("35") + signature.v - /* @__PURE__ */ BigInt("27"));
      const v2 = /* @__PURE__ */ BigInt("27") + (signature.v === /* @__PURE__ */ BigInt("27") ? /* @__PURE__ */ BigInt("0") : /* @__PURE__ */ BigInt("1"));
      if (signature.v !== v2)
        throw new InvalidLegacyVError({ v: signature.v });
      return v2;
    })();
    const r = trim(signature.r);
    const s = trim(signature.s);
    serializedTransaction = [
      ...serializedTransaction,
      toHex(v),
      r === "0x00" ? "0x" : r,
      s === "0x00" ? "0x" : s
    ];
  } else if (chainId > 0) {
    serializedTransaction = [
      ...serializedTransaction,
      toHex(chainId),
      "0x",
      "0x"
    ];
  }
  return toRlp(serializedTransaction);
}
function toYParitySignatureArray(transaction, signature_) {
  const signature = signature_ != null ? signature_ : transaction;
  const { v, yParity } = signature;
  if (typeof signature.r === "undefined")
    return [];
  if (typeof signature.s === "undefined")
    return [];
  if (typeof v === "undefined" && typeof yParity === "undefined")
    return [];
  const r = trim(signature.r);
  const s = trim(signature.s);
  const yParity_ = (() => {
    if (typeof yParity === "number")
      return yParity ? toHex(1) : "0x";
    if (v === /* @__PURE__ */ BigInt("0"))
      return "0x";
    if (v === /* @__PURE__ */ BigInt("1"))
      return toHex(1);
    return v === /* @__PURE__ */ BigInt("27") ? "0x" : toHex(1);
  })();
  return [yParity_, r === "0x00" ? "0x" : r, s === "0x00" ? "0x" : s];
}

// ../../node_modules/viem/_esm/op-stack/contracts.js
var contracts = {
  gasPriceOracle: { address: "0x420000000000000000000000000000000000000F" },
  l1Block: { address: "0x4200000000000000000000000000000000000015" },
  l2CrossDomainMessenger: {
    address: "0x4200000000000000000000000000000000000007"
  },
  l2Erc721Bridge: { address: "0x4200000000000000000000000000000000000014" },
  l2StandardBridge: { address: "0x4200000000000000000000000000000000000010" },
  l2ToL1MessagePasser: {
    address: "0x4200000000000000000000000000000000000016"
  }
};

// ../../node_modules/viem/_esm/op-stack/formatters.js
var formatters = {
  block: /* @__PURE__ */ defineBlock({
    format(args) {
      var _a;
      const transactions = (_a = args.transactions) == null ? void 0 : _a.map((transaction) => {
        if (typeof transaction === "string")
          return transaction;
        const formatted = formatTransaction(transaction);
        if (formatted.typeHex === "0x7e") {
          formatted.isSystemTx = transaction.isSystemTx;
          formatted.mint = transaction.mint ? hexToBigInt(transaction.mint) : void 0;
          formatted.sourceHash = transaction.sourceHash;
          formatted.type = "deposit";
        }
        return formatted;
      });
      return {
        transactions,
        stateRoot: args.stateRoot
      };
    }
  }),
  transaction: /* @__PURE__ */ defineTransaction({
    format(args) {
      const transaction = {};
      if (args.type === "0x7e") {
        transaction.isSystemTx = args.isSystemTx;
        transaction.mint = args.mint ? hexToBigInt(args.mint) : void 0;
        transaction.sourceHash = args.sourceHash;
        transaction.type = "deposit";
      }
      return transaction;
    }
  }),
  transactionReceipt: /* @__PURE__ */ defineTransactionReceipt({
    format(args) {
      return {
        l1GasPrice: args.l1GasPrice ? hexToBigInt(args.l1GasPrice) : null,
        l1GasUsed: args.l1GasUsed ? hexToBigInt(args.l1GasUsed) : null,
        l1Fee: args.l1Fee ? hexToBigInt(args.l1Fee) : null,
        l1FeeScalar: args.l1FeeScalar ? Number(args.l1FeeScalar) : null
      };
    }
  })
};

// ../../node_modules/viem/_esm/op-stack/serializers.js
function serializeTransaction2(transaction, signature) {
  if (isDeposit(transaction))
    return serializeTransactionDeposit(transaction);
  return serializeTransaction(transaction, signature);
}
var serializers = {
  transaction: serializeTransaction2
};
function serializeTransactionDeposit(transaction) {
  assertTransactionDeposit(transaction);
  const { sourceHash, data, from, gas, isSystemTx, mint, to, value } = transaction;
  const serializedTransaction = [
    sourceHash,
    from,
    to != null ? to : "0x",
    mint ? toHex(mint) : "0x",
    value ? toHex(value) : "0x",
    gas ? toHex(gas) : "0x",
    isSystemTx ? "0x1" : "0x",
    data != null ? data : "0x"
  ];
  return concatHex([
    "0x7e",
    toRlp(serializedTransaction)
  ]);
}
function isDeposit(transaction) {
  if (transaction.type === "deposit")
    return true;
  if (typeof transaction.sourceHash !== "undefined")
    return true;
  return false;
}
function assertTransactionDeposit(transaction) {
  const { from, to } = transaction;
  if (from && !isAddress(from))
    throw new InvalidAddressError({ address: from });
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
}

// ../../node_modules/viem/_esm/op-stack/chainConfig.js
var chainConfig = {
  contracts,
  formatters,
  serializers
};

// ../../node_modules/viem/_esm/chains/definitions/base.js
var sourceId = 1;
var base = /* @__PURE__ */ defineChain(__spreadProps(__spreadValues({}, chainConfig), {
  id: 8453,
  name: "Base",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.base.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://basescan.org",
      apiUrl: "https://api.basescan.org/api"
    }
  },
  contracts: __spreadProps(__spreadValues({}, chainConfig.contracts), {
    disputeGameFactory: {
      [sourceId]: {
        address: "0x43edB88C4B80fDD2AdFF2412A7BebF9dF42cB40e"
      }
    },
    l2OutputOracle: {
      [sourceId]: {
        address: "0x56315b90c40730925ec5485cf004d835058518A0"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 5022
    },
    portal: {
      [sourceId]: {
        address: "0x49048044D57e1C92A77f79988d21Fa8fAF74E97e",
        blockCreated: 17482143
      }
    },
    l1StandardBridge: {
      [sourceId]: {
        address: "0x3154Cf16ccdb4C6d922629664174b904d80F2C35",
        blockCreated: 17482143
      }
    }
  }),
  sourceId
}));

// src/components/SocialIdentityDemo.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
function SocialIdentityDemo({ className = "" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_onchainkit.OnchainKitProvider, { chain: base, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: `max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg ${className}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h2", { className: "text-2xl font-bold mb-6 text-center", children: "CarCulture Social Identity" }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      OnchainKitAuth,
      {
        onSuccess: () => console.log("Authentication successful!"),
        onError: (error) => console.error("Authentication error:", error),
        showIdentity: true,
        showBadges: true
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "mt-6 text-sm text-gray-500 text-center", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: "Connect your wallet and social accounts to get started with CarCulture" }) })
  ] }) });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CombinedAuth,
  FarcasterAuthButton,
  OnchainKitAuth,
  PrivyProvider,
  SocialIdentityDemo,
  farcasterConfig,
  privyConfig,
  useFarcasterAuth,
  usePrivyAuth
});
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
