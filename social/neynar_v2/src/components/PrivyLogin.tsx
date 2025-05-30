import { usePrivy } from '@privy-io/react-auth';

export default function PrivyLogin() {
  const { login, logout, user, ready, authenticated } = usePrivy();

  if (!ready) return <div>Loading...</div>;

  if (!authenticated) {
    return <button onClick={login}>Log in with Privy</button>;
  }

  // Safely extract email as string if present
  const email =
    typeof user?.email === 'string'
      ? user.email
      : user?.email?.address || undefined;

  return (
    <div>
      <p>
        Welcome, {email || 'User'}!
      </p>
      <button onClick={logout}>Log out</button>
    </div>
  );
}