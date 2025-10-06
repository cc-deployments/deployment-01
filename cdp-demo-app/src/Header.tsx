import { useState } from "react";
import { useEvmAddress } from "@coinbase/cdp-react";
import { AuthButton } from "@coinbase/cdp-react/components/AuthButton";

function Header() {
  const evmAddress = useEvmAddress();
  const [isCopied, setIsCopied] = useState(false);

  const copyAddress = async () => {
    if (!evmAddress) return;
    await navigator.clipboard.writeText(evmAddress);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <header>
      <h1>CarCulture CDP Demo</h1>
      <div className="user-info">
        {evmAddress && (
          <button onClick={copyAddress}>
            {isCopied ? "✓" : "📋"}
            <span>{evmAddress.slice(0, 6)}...{evmAddress.slice(-4)}</span>
          </button>
        )}
        <AuthButton />
      </div>
    </header>
  );
}

export default Header;
