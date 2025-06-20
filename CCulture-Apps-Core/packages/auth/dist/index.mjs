// src/components/OnchainKitAuth.tsx
import { ConnectWallet } from "@coinbase/onchainkit/wallet";
import { Identity, Address, Avatar } from "@coinbase/onchainkit/identity";
import { useAccount } from "wagmi";
import { jsx, jsxs } from "react/jsx-runtime";
function OnchainKitAuth() {
  const { isConnected } = useAccount();
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsx(ConnectWallet, {}),
    isConnected && /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-col items-center gap-3 p-4 border rounded-lg", children: /* @__PURE__ */ jsxs(Identity, { children: [
      /* @__PURE__ */ jsx(Avatar, {}),
      /* @__PURE__ */ jsx(Address, {})
    ] }) })
  ] });
}
export {
  OnchainKitAuth
};
