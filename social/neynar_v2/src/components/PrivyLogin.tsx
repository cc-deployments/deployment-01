import { usePrivy } from '@privy-io/react-auth';

export default function PrivyLogin() {
  const { login, logout, user, ready, authenticated } = usePrivy();

  if (!ready) return <div>Loading...</div>;

  if (!authenticated) {
    return <button onClick={login}>Log in with Privy</button>;
  }

  // Safely extract a string for the welcome message
  let welcomeName = 'User';
  if (user?.email) {
    if (typeof user.email === 'string') {
      welcomeName = user.email;
    } else if (typeof user.email === 'object' && user.email !== null && 'address' in user.email) {
      // @ts-ignore
      welcomeName = user.email.address;
    }
  }

  return (
    <div>
      <p>
        Welcome, {welcomeName}!
      </p>
      <button onClick={logout}>Log out</button>
    </div>
  );
}