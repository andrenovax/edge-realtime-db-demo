export const demoUsers = {
  admin: {
    id: "demo-admin",
    email: "demo-admin@local.test",
    password: "demo-password-123",
  },
  user: {
    id: "demo-user",
    email: "demo-user@local.test",
    password: "demo-password-123",
  },
} as const;

export async function signInDemoUser(
  origin: string,
  credentials: { email: string; password: string } = demoUsers.admin,
) {
  const login = await fetch(`${origin}/api/auth/sign-in/email`, {
    method: "POST",
    headers: { "content-type": "application/json", origin },
    body: JSON.stringify(credentials),
  });
  if (!login.ok) throw new Error(`login failed: ${login.status} ${await login.text()}`);

  const cookie = login.headers.get("set-cookie")?.split(";")[0];
  if (!cookie) throw new Error("login did not return a session cookie");

  const tokenResponse = await fetch(`${origin}/api/auth/token`, { headers: { cookie } });
  if (!tokenResponse.ok) {
    throw new Error(`token failed: ${tokenResponse.status} ${await tokenResponse.text()}`);
  }
  const { token } = (await tokenResponse.json()) as { token: string };
  const userId = JSON.parse(atob(token.split(".")[1])).sub as string;

  return { cookie, token, userId };
}
