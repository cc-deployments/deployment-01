import { useIsSignedIn } from "@coinbase/cdp-react";
import SignInScreen from "./SignInScreen.tsx";
import SignedInScreen from "./SignedInScreen.tsx";

function App() {
  const { isSignedIn } = useIsSignedIn();

  return isSignedIn ? <SignedInScreen /> : <SignInScreen />;
}

export default App;
