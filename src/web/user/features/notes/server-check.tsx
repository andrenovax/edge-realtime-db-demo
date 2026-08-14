import { Button } from "@heroui/react";
import { useState } from "react";
import { rpc } from "../../lib/rpc.ts";

// The talk beat: three dependent calls — viewer(), the user() capability,
// and listNotes() on that unresolved capability — pipeline into ONE HTTP
// round trip via capnweb promise pipelining.
export function ServerCheck({ token }: { token: string }) {
  const [result, setResult] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const check = async () => {
    setBusy(true);
    try {
      const api = rpc(token);
      const viewer = api.viewer();
      const notes = api.user().listNotes();
      const [v, n] = await Promise.all([viewer, notes]);
      setResult(`${v.email ?? v.id}: ${n.length} notes server-side (1 request)`);
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
