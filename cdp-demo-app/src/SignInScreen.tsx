import { AuthButton } from "@coinbase/cdp-react/components/AuthButton";

function SignInScreen() {
  return (
    <main className="main flex-col-container flex-grow">
      <div className="main-inner flex-col-container">
        <div className="card">
          <h1 className="card-title">Welcome to CarCulture CDP Demo</h1>
          <p>Sign in to create your embedded wallet and start exploring!</p>
          <div style={{ marginTop: "2rem" }}>
            <AuthButton />
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignInScreen;






