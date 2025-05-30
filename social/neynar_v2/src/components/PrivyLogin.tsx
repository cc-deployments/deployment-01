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
        Welcome, {user?.email?.address || user?.email || 'User'}!
      </p>
      <button onClick={logout}>Log out</button>
    </div>
  );
}