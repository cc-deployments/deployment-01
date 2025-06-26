import { useAuthenticate } from '@coinbase/onchainkit/minikit';

export default function SecureAuth() {
  const { signIn } = useAuthenticate();
  
  const handleSecureSignIn = async () => {
    const result = await signIn({
      siweUri: 'https://your-domain.com/login'
    });
    
    if (result) {
      // User successfully authenticated
      // Store session securely
      console.log('Authenticated:', result);
    }
  };
  
  return (
    <button onClick={handleSecureSignIn}>
      Secure Sign In
    </button>
  );
} 