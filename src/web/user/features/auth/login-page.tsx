import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import { GOOGLE_AUTH_ENABLED } from "../../config.ts";
import { authClient } from "../../lib/auth.ts";
import styles from "./login-page.module.css";

type AuthMode = "in" | "up";

const oauthErrorFromLocation = () => {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("error");
};

const oauthErrorMessage = (code: string | null) => {
  if (code === "account_not_linked") {
    return "This email already has a password account. Sign in with your password once to securely connect Google.";
  }
  return code ? "Google sign-in failed. Please try again." : null;
};

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="size-5 shrink-0" viewBox="0 0 18 18">
      <path
        fill="#4285F4"
        d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.797 2.715v2.258h2.909c1.702-1.567 2.684-3.874 2.684-6.613Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.468-.806 5.956-2.182l-2.909-2.258c-.806.54-1.835.859-3.047.859-2.344 0-4.328-1.585-5.037-3.714H.956v2.332A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.963 10.705A5.42 5.42 0 0 1 3.682 9c0-.592.102-1.168.281-1.705V4.963H.956A9 9 0 0 0 0 9c0 1.452.347 2.827.956 4.037l3.007-2.332Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.322 0 2.508.454 3.442 1.345l2.582-2.582C13.464.891 11.427 0 9 0A9 9 0 0 0 .956 4.963l3.007 2.332C4.672 5.166 6.656 3.58 9 3.58Z"
      />
    </svg>
  );
}

export function LoginPage() {
  const [oauthError] = useState(oauthErrorFromLocation);
  const [mode, setMode] = useState<AuthMode>("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(() => oauthErrorMessage(oauthError));
  const [busy, setBusy] = useState(false);
  const shouldLinkGoogle = oauthError === "account_not_linked";

  const runGoogle = async () => {
    setBusy(true);
    setError(null);
    const result = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      errorCallbackURL: "/",
    });
    if (result.error) {
      setError(result.error.message ?? "Google sign-in failed");
      setBusy(false);
    }
  };

  const run = async () => {
    setBusy(true);
    setError(null);
    const result =
      mode === "in"
        ? await authClient.signIn.email({ email, password })
        : await authClient.signUp.email({ email, password, name: email.split("@")[0] });
    if (result.error) {
      setError(result.error.message ?? "auth failed");
      setBusy(false);
      return;
    }
    if (mode === "in" && shouldLinkGoogle && GOOGLE_AUTH_ENABLED) {
      const linkResult = await authClient.linkSocial({
        provider: "google",
        callbackURL: "/",
        errorCallbackURL: "/",
      });
      if (linkResult.error) {
        setError(linkResult.error.message ?? "Unable to connect Google");
      }
    }
    setBusy(false);
  };

  const selectMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setError(null);
    setShowPassword(false);
  };

  const isSignIn = mode === "in";

  return (
    <div className={styles.page}>
      <div aria-hidden="true" className={styles.ambientLight} />
      <main className={styles.panel}>
        <div aria-hidden="true" className={styles.panelGlow} />
        <div className={styles.content}>
          <header className={styles.header}>
            <div className={styles.brand}>
              <span className={styles.brandMark}>
                <Sparkles aria-hidden="true" />
              </span>
              <span>Durable Notes</span>
            </div>
            <h1>{isSignIn ? "Welcome back" : "Create your account"}</h1>
            <p>
              {isSignIn
                ? "Sign in and continue where you left off."
                : "Start a calm space for your notes and ideas."}
            </p>
          </header>

          <form
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault();
              void run();
            }}
          >
            <label className={styles.field} htmlFor="auth-email">
              <span>Email</span>
              <span className={styles.inputShell}>
                <Mail aria-hidden="true" />
                <input
                  id="auth-email"
                  required
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>
            </label>
            <label className={styles.field} htmlFor="auth-password">
              <span>Password</span>
              <span className={styles.inputShell}>
                <LockKeyhole aria-hidden="true" />
                <input
                  id="auth-password"
                  required
                  type={showPassword ? "text" : "password"}
                  autoComplete={isSignIn ? "current-password" : "new-password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                </button>
              </span>
            </label>
            {error && (
              <p role="alert" className={styles.error}>
                {error}
              </p>
            )}
            <button type="submit" disabled={busy} className={styles.primaryAction}>
              <span>{busy ? "Please wait…" : isSignIn ? "Sign in" : "Create account"}</span>
              <ArrowRight aria-hidden="true" />
            </button>
          </form>

          {GOOGLE_AUTH_ENABLED && (
            <>
              <div className={styles.divider}>
                <span />
                <span>Or continue with</span>
                <span />
              </div>
              <button
                type="button"
                disabled={busy}
                onClick={() => void runGoogle()}
                className={styles.googleAction}
              >
                <GoogleIcon />
                <span>Continue with Google</span>
              </button>
            </>
          )}

          <p className={styles.modeSwitch}>
            {isSignIn ? "New here?" : "Already have an account?"}{" "}
            <button
              type="button"
              disabled={busy}
              onClick={() => selectMode(isSignIn ? "up" : "in")}
            >
              {isSignIn ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
