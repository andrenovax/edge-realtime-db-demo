import { Button, Card, Input, Label, TextField } from "@heroui/react";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { authClient } from "../../lib/auth.ts";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const run = async (mode: "in" | "up") => {
    setBusy(true);
    setError(null);
    const result =
      mode === "in"
        ? await authClient.signIn.email({ email, password })
        : await authClient.signUp.email({ email, password, name: email.split("@")[0] });
    if (result.error) setError(result.error.message ?? "auth failed");
    setBusy(false);
  };

  return (
    <div className="flex min-h-dvh items-center justify-center p-4">
      <Card className="w-full max-w-sm border border-border bg-surface shadow-xl backdrop-blur-2xl">
        <Card.Header>
          <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg">
            <Sparkles className="size-5" />
          </div>
          <Card.Title>Your notes, at the edge</Card.Title>
          <Card.Description>A calm space for notes, ideas, and conversations.</Card.Description>
        </Card.Header>
        <Card.Content className="space-y-3">
          <TextField>
            <Label>Email</Label>
            <Input
              fullWidth
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </TextField>
          <TextField>
            <Label>Password</Label>
            <Input
              fullWidth
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </TextField>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </Card.Content>
        <Card.Footer className="flex gap-2">
          <Button
            fullWidth
            isDisabled={busy}
            onPress={() => void run("in")}
            className="bg-accent text-accent-foreground"
          >
            Sign in
          </Button>
          <Button fullWidth variant="secondary" isDisabled={busy} onPress={() => void run("up")}>
            Sign up
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
