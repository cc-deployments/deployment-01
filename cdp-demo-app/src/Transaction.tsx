import { useState, useCallback, type MouseEvent } from "react";
import { useEvmAddress, useSendEvmTransaction } from "@coinbase/cdp-react";

interface TransactionProps {
  balance?: string;
  onSuccess?: () => void;
}

function Transaction({ balance, onSuccess }: TransactionProps) {
  const evmAddress = useEvmAddress();
  const { sendEvmTransaction } = useSendEvmTransaction();
  const [isPending, setIsPending] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const hasBalance = balance && parseFloat(balance) > 0;

  const handleSendTransaction = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      if (!evmAddress) return;

      e.preventDefault();
      setIsPending(true);

      try {
        const { transactionHash } = await sendEvmTransaction({
          transaction: {
            to: evmAddress,
            value: 1000000000000n, // 0.000001 ETH in wei
            gas: 21000n,
            chainId: 84532, // Base Sepolia
            type: "eip1559",
          },
          evmAccount: evmAddress,
          network: "base-sepolia",
        });

        setTransactionHash(transactionHash);
        onSuccess?.();
      } catch (error) {
        console.error("Transaction failed:", error);
      } finally {
        setIsPending(false);
      }
    },
    [evmAddress, sendEvmTransaction, onSuccess],
  );

  return (
    <>
      <h2 className="card-title">Send Transaction</h2>
      {transactionHash ? (
        <>
          <p>Transaction sent successfully!</p>
          <a 
            href={`https://sepolia.basescan.org/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--cdp-example-accent-color)" }}
          >
            View on BaseScan: {transactionHash.slice(0, 6)}...{transactionHash.slice(-4)}
          </a>
          <button 
            onClick={() => setTransactionHash(null)}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "var(--cdp-example-accent-color)",
              color: "var(--cdp-example-accent-foreground-color)",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer"
            }}
          >
            Send Another Transaction
          </button>
        </>
      ) : (
        <>
          {hasBalance ? (
            <button 
              onClick={handleSendTransaction} 
              disabled={isPending}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: isPending ? "var(--cdp-example-text-secondary-color)" : "var(--cdp-example-accent-color)",
                color: "var(--cdp-example-accent-foreground-color)",
                border: "none",
                borderRadius: "0.5rem",
                cursor: isPending ? "not-allowed" : "pointer",
                fontSize: "1rem",
                fontWeight: "600"
              }}
            >
              {isPending ? "Sending..." : "Send 0.000001 ETH to Yourself"}
            </button>
          ) : (
            <p>Get testnet ETH from the faucet first!</p>
          )}
        </>
      )}
    </>
  );
}

export default Transaction;
