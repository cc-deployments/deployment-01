import { usePrivy } from '@cculture/privy';
import { useState } from 'react';

export default function PrivyLogin() {
  const { login, logout, user, ready, authenticated, getAccessToken } = usePrivy();
  const [jwt, setJwt] = useState<string | null>(null);

  const handleGetJWT = async () => {
    if (authenticated && getAccessToken) {
      const token = await getAccessToken();
      setJwt(token);
    }
  };

  if (!ready) return <div>Loading...</div>;

  let userLabel = 'Unknown';
  if (user) {
    if (typeof user.email === 'string') {
      userLabel = user.email;
    } else if (user.wallet && typeof user.wallet.address === 'string') {
      userLabel = user.wallet.address;
    }
  }

  return (
    <div style={{ margin: 24, padding: 24, border: '1px solid #eee', borderRadius: 12 }}>
      {!authenticated && <button onClick={login}>Log in with Privy</button>}
      {authenticated && (
        <div>
          <div style={{ marginBottom: 12 }}>
            <strong>Logged in as:</strong> {userLabel}
          </div>
          <button onClick={logout} style={{ marginRight: 12 }}>Log out</button>
          <button onClick={handleGetJWT}>Get JWT</button>
          {jwt && (
            <div style={{ marginTop: 12, wordBreak: 'break-all' }}>
              <strong>JWT:</strong>
              <div style={{ fontSize: 12, background: '#f9f9f9', padding: 8, borderRadius: 6 }}>{jwt}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 