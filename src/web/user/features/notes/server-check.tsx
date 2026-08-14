import { Button } from "@heroui/react";
import { useState } from "react";
import { rpc } from "../../lib/rpc.ts";

// Lightweight check that the authenticated user RPC is reachable.
export function ServerCheck({ token }: { token: string }) {
  const [result, setResult] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const check = async () => {
    setBusy(true);
    try {
      const viewer = await rpc(token).viewer();
      setResult(`${viewer.email ?? viewer.id}: authenticated`);
    } catch (error) {
      setResult(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-1">
      <Button
        fullWidth
        size="sm"
        variant="secondary"
        isDisabled={busy}
        onPress={() => void check()}
      >
        Verify via RPC
      </Button>
      {result && <p className="text-xs opacity-70">{result}</p>}
    </div>
  );
}
