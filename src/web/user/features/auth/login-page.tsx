import { useForm } from "@tanstack/react-form";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { type FormEvent, useState } from "react";
import * as v from "valibot";
import { GOOGLE_AUTH_ENABLED } from "../../config.ts";
import { useGoogleSignin } from "@ui/features/auth/hooks/use-google-signin.ts";
import styles from "@ui/features/auth/login-page.module.css";
import { useRootRouteContext } from "@ui/routes.context";

type AuthMode = "in" | "up";

const CredentialsSchema = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty("Enter your email address."),
    v.email("Enter a valid email address."),
  ),
  password: v.pipe(
    v.string(),
    v.nonEmpty("Enter your password."),
    v.minLength(8, "Password must be at least 8 characters."),
  ),
});

function getFormErrorMessage({
  searchError,
  submitError,
  googleError,
}: {
  searchError: string | undefined;
  submitError: unknown;
  googleError: Error | null;
}) {
  if (googleError) return googleError.message;
  if (typeof submitError === "string") return submitError;
  if (searchError === "account_not_linked") {
    return "This email is registered with a password. Sign in with your email and password instead.";
  }
  return searchError ? "Google sign-in failed. Please try again." : null;
}

export function LoginPage() {
  const { auth } = useRootRouteContext();
  const { error: oauthError } = useSearch({ from: "/sign-in" });
  const navigate = useNavigate({ from: "/sign-in" });

  const [mode, setMode] = useState<AuthMode>("in");
  const [showPassword, setShowPassword] = useState(false);

  const googleSignIn = useGoogleSignin();
  const clearOAuthError = () =>
    oauthError
      ? navigate({
          search: (previous) => ({ ...previous, error: undefined }),
          replace: true,
        })
      : Promise.resolve();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: CredentialsSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      const result =
        mode === "in"
          ? await auth.signIn.email({ email: value.email, password: value.password })
          : await auth.signUp.email({
              email: value.email,
              password: value.password,
              name: value.email.split("@")[0],
            });
      if (result.error) {
        formApi.setErrorMap({
          onSubmit: {
            form: result.error.message ?? "Authentication failed. Please try again.",
            fields: {},
          },
        });
        return;
      }

      await navigate({ to: "/", replace: true });
    },
  });

  const selectMode = (nextMode: AuthMode) => {
    googleSignIn.reset();
    form.setErrorMap({ onSubmit: undefined });
    setMode(nextMode);
    setShowPassword(false);
    void clearOAuthError();
  };

  const handleCredentialsSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (googleSignIn.isPending) return;

    void clearOAuthError().then(() => {
      googleSignIn.reset();
      return form.handleSubmit();
    });
  };

  const handleGoogleSignIn = () => {
    if (form.state.isSubmitting) return;

    void clearOAuthError().then(() => {
      form.setErrorMap({ onSubmit: undefined });
      googleSignIn.mutate();
    });
  };

  return (
    <form.Subscribe selector={(state) => [state.isSubmitting, state.errors[0]] as const}>
      {([formBusy, submissionError]) => {
        const isSignIn = mode === "in";
        const busy = formBusy || googleSignIn.isPending;
        const displayedError = getFormErrorMessage({
          searchError: oauthError,
          submitError: submissionError,
          googleError: googleSignIn.error,
        });

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

                <form noValidate className={styles.form} onSubmit={handleCredentialsSubmit}>
                  <form.Field name="email">
                    {(field) => {
                      const fieldError = field.state.meta.errors[0];

                      return (
                        <label className={styles.field} htmlFor="auth-email">
                          <span>Email</span>
                          <span className={styles.inputShell}>
                            <Mail aria-hidden="true" />
                            <input
                              id="auth-email"
                              type="email"
                              autoComplete="email"
                              placeholder="Enter your email"
                              value={field.state.value}
                              aria-invalid={Boolean(fieldError)}
                              aria-describedby={fieldError ? "auth-email-error" : undefined}
                              onBlur={field.handleBlur}
                              onChange={(event) => field.handleChange(event.target.value)}
                            />
                          </span>
                          {fieldError && (
                            <span id="auth-email-error" role="alert" className={styles.fieldError}>
                              {fieldError.message}
                            </span>
                          )}
                        </label>
                      );
                    }}
                  </form.Field>
                  <form.Field name="password">
                    {(field) => {
                      const fieldError = field.state.meta.errors[0];

                      return (
                        <label className={styles.field} htmlFor="auth-password">
                          <span>Password</span>
                          <span className={styles.inputShell}>
                            <LockKeyhole aria-hidden="true" />
                            <input
                              id="auth-password"
                              type={showPassword ? "text" : "password"}
                              autoComplete={isSignIn ? "current-password" : "new-password"}
                              placeholder="Enter your password"
                              value={field.state.value}
                              aria-invalid={Boolean(fieldError)}
                              aria-describedby={fieldError ? "auth-password-error" : undefined}
                              onBlur={field.handleBlur}
                              onChange={(event) => field.handleChange(event.target.value)}
                            />
                            <button
                              type="button"
                              className={styles.passwordToggle}
                              aria-label={showPassword ? "Hide password" : "Show password"}
                              onClick={() => setShowPassword((visible) => !visible)}
                            >
                              {showPassword ? (
                                <EyeOff aria-hidden="true" />
                              ) : (
                                <Eye aria-hidden="true" />
                              )}
                            </button>
                          </span>
                          {fieldError && (
                            <span
                              id="auth-password-error"
                              role="alert"
                              className={styles.fieldError}
                            >
                              {fieldError.message}
                            </span>
                          )}
                        </label>
                      );
                    }}
                  </form.Field>
                  {displayedError && (
                    <p role="alert" className={styles.error}>
                      {displayedError}
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
                      onClick={handleGoogleSignIn}
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
      }}
    </form.Subscribe>
  );
}

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
