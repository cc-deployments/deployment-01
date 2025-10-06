import { useState, useEffect, useCallback } from "react";
import { useEvmAddress } from "@coinbase/cdp-hooks";
import Header from "./Header.tsx";
import UserBalance from "./UserBalance.tsx";
import Transaction from "./Transaction.tsx";

function SignedInScreen() {
  const evmAddress = useEvmAddress();
  const [balance, setBalance] = useState<string | undefined>();

  const getBalance = useCallback(async () => {
    if (!evmAddress) return;

    try {
      const response = await fetch(
        `https://api.cdp.coinbase.com/v1/evm/balance?address=${evmAddress}&network=base-sepolia`
      );
      const data = await response.json();
      const ethBalance = (Number(data.balance) / 1e18).toFixed(6);
      setBalance(ethBalance);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  }, [evmAddress]);

  useEffect(() => {
    getBalance();
    const interval = setInterval(getBalance, 5000);
    return () => clearInterval(interval);
  }, [getBalance]);

  return (
    <>
      <Header />
      <main className="main flex-col-container flex-grow">
        <div className="main-inner flex-col-container">
          <div className="card card--user-balance">
            <UserBalance balance={balance} />
          </div>
          <div className="card card--transaction">
            {evmAddress && (
              <Transaction 
                balance={balance} 
                onSuccess={getBalance}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default SignedInScreen;
