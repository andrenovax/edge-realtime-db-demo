import { Button, Card, TextArea } from "@heroui/react";
import { nanoid } from "@livestore/livestore";
import { useStore } from "@livestore/react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { events, tables, userStoreOptions } from "../../lib/store.ts";
import { AgentPanel } from "../agent/agent-panel.tsx";
import { ServerCheck } from "./server-check.tsx";

// Reads are local: useQuery hits the in-browser SQLite, kept converged
// with the user's SyncBackendDO event log. Writes are events — one
// writer per user, no optimistic-locking dance.
export function NotesPage({ userId, token }: { userId: string; token: string }) {
  const store = useStore(userStoreOptions(userId, token));
  const notes = store.useQuery(tables.notes.orderBy("updatedAt", "desc"));
  const { note: selectedId } = useSearch({ from: "/" });
  const navigate = useNavigate();
  const selected = notes.find((n) => n.id === selectedId);

  const select = (id: string | undefined) =>
    void navigate({ to: "/", search: id ? { note: id } : {} });

  const createNote = () => {
    const id = nanoid();
    store.commit(events.noteCreated({ id, text: "", updatedAt: Date.now() }));
    select(id);
  };

  return (
    <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[16rem_1fr_24rem]">
      <Card className="flex flex-col">
        <Card.Header className="flex items-center justify-between">
          <Card.Title>Notes</Card.Title>
          <Button size="sm" onPress={createNote}>
            New
          </Button>
        </Card.Header>
        <Card.Content className="flex-1 space-y-1 overflow-y-auto">
          {notes.length === 0 && <p className="text-sm opacity-60">No notes yet.</p>}
          {notes.map((note) => (
            <button
              key={note.id}
              type="button"
              onClick={() => select(note.id)}
              className={`block w-full truncate rounded-md px-2 py-1.5 text-left text-sm ${
                note.id === selectedId ? "bg-blue-500/15" : "hover:bg-neutral-500/10"
              }`}
            >
              {note.text.trim().split("\n")[0] || "Untitled"}
            </button>
          ))}
        </Card.Content>
        <Card.Footer>
          <ServerCheck token={token} />
        </Card.Footer>
      </Card>

      <Card className="flex flex-col">
        <Card.Content className="flex-1">
          {selected ? (
            <TextArea
              fullWidth
              aria-label="Note text"
              className="h-full min-h-64"
              placeholder="Write…"
              value={selected.text}
              onChange={(e) =>
                store.commit(
                  events.noteUpdated({
                    id: selected.id,
                    text: e.target.value,
                    updatedAt: Date.now(),
                  }),
                )
              }
            />
          ) : (
            <p className="p-4 text-sm opacity-60">Select or create a note.</p>
          )}
        </Card.Content>
      </Card>

      <AgentPanel userId={userId} token={token} />
    </div>
  );
}
