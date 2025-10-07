function UserBalance({ balance }: { balance?: string }) {
  return (
    <>
      <h2 className="card-title">Available Balance</h2>
      <p className="user-balance">
        {balance === undefined ? (
          <div className="loading-skeleton" />
        ) : (
          <span className="flex-row-container">
            <span>Ξ</span>
            <span>{balance}</span>
          </span>
        )}
      </p>
      <p>
        Get testnet ETH from{" "}
        <a 
          href="https://portal.cdp.coinbase.com/products/faucet" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: "var(--cdp-example-accent-color)" }}
        >
          Base Sepolia Faucet
        </a>
      </p>
    </>
  );
}

export default UserBalance;






