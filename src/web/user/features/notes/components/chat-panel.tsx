import { ArrowUp, Plus } from "lucide-react";
import { OfflineIllustration } from "@ui/components/offline-illustration.tsx";
import { AgentPanel } from "@ui/features/agent/agent-panel.tsx";
import { AgentChatShell } from "@ui/features/agent/agent-chat-shell";
import styles from "@ui/features/notes/notes-workspace.module.css";
import { useOnline } from "@ui/providers/online-provider.tsx";

type ChatPanelProps = {
  activeNoteId: string | undefined;
  collapsed: boolean;
  mobileVisible: boolean;
  panelsReversed: boolean;
  onCreateNote: () => void;
};

export function ChatPanel({
  activeNoteId,
  collapsed,
  mobileVisible,
  panelsReversed,
  onCreateNote,
}: ChatPanelProps) {
  const isOnline = useOnline();

  return (
    <section
      id="mobile-panel-chat"
      className={`${styles.chat} relative min-h-0 min-w-0 overflow-hidden rounded-none bg-surface backdrop-blur-2xl md:rounded-l-md md:rounded-r-xl ${mobileVisible ? "block" : "hidden"} md:block ${panelsReversed ? "xl:rounded-l-md xl:rounded-r-xl" : "xl:rounded-md"}`}
    >
      <div className={`h-full min-h-0 ${collapsed ? "invisible pointer-events-none" : ""}`}>
        {activeNoteId ? (
          <AgentPanel key={activeNoteId} noteId={activeNoteId} />
        ) : isOnline ? (
          <OnlineChatEmptyState onCreateNote={onCreateNote} />
        ) : (
          <OfflineChatEmptyState onCreateNote={onCreateNote} />
        )}
      </div>
    </section>
  );
}

// Same box model as AgentComposer so the input never jumps when the real
// composer takes over.
function ComposerPlaceholder({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={`flex w-full flex-col rounded-[28px] border border-border bg-surface px-2 py-2 shadow-lg backdrop-blur-xl ${disabled ? "opacity-75" : ""}`}
    >
      <div className="flex items-end gap-1">
        <button
          type="button"
          aria-label="Add attachment"
          disabled
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-[#5d5d5d] disabled:cursor-not-allowed disabled:opacity-35"
        >
          <Plus className="size-5" />
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={onClick}
          className="min-h-9 flex-1 truncate py-1.5 pl-1 pr-2 text-left text-base text-[#8e8e8e] outline-none disabled:cursor-not-allowed"
        >
          {label}
        </button>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            disabled
            aria-label="Send"
            className="flex size-9 items-center justify-center rounded-full bg-[#0d0d0d] text-white opacity-30"
          >
            <ArrowUp className="size-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

function OfflineChatEmptyState({ onCreateNote }: { onCreateNote: () => void }) {
  return (
    <AgentChatShell
      input={<ComposerPlaceholder label="Chat is unavailable while you're offline" disabled />}
    >
      <div className="flex grow flex-col items-center justify-center px-4">
        <div className="flex w-full max-w-3xl flex-col items-center gap-5 text-center">
          <OfflineIllustration />
          <div>
            <h1 className="text-2xl font-normal">You're offline</h1>
            <p className="mt-2 text-sm text-[#6f6f6f]">
              Chat needs a connection, but you can still create and edit notes.
            </p>
          </div>
          <button
            type="button"
            onClick={onCreateNote}
            className="flex h-10 items-center gap-2 rounded-full bg-[#0d0d0d] px-5 text-sm font-medium text-white"
          >
            <Plus className="size-4" />
            Create a note offline
          </button>
        </div>
      </div>
    </AgentChatShell>
  );
}

function OnlineChatEmptyState({ onCreateNote }: { onCreateNote: () => void }) {
  return (
    <AgentChatShell
      input={<ComposerPlaceholder label="Create a note to start" onClick={onCreateNote} />}
    >
      <div className="flex grow flex-col items-center justify-center px-4">
        <h1 className="text-center text-2xl font-normal leading-7">Where should we begin?</h1>
      </div>
    </AgentChatShell>
  );
}
