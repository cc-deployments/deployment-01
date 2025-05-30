import { usePrivy } from '@privy-io/react-auth';

export default function PrivyLogin() {
  const { login, logout, user, ready, authenticated } = usePrivy();

  if (!ready) return <div>Loading...</div>;

  if (!authenticated) {
    return <button onClick={login}>Log in with Privy</button>;
  }

  return (
    <div>
      <p>
        Welcome, {user?.email ||
          (user?.linkedAccounts?.[0] && 'address' in user.linkedAccounts[0]
            ? user.linkedAccounts[0].address
            : undefined) ||
          'User'}
        !
      </p>
      <button onClick={logout}>Log out</button>
    </div>
  );
}