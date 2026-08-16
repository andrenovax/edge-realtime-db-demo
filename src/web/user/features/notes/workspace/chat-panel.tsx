import { ArrowUp, Plus } from "lucide-react";
import { OfflineIllustration } from "../../../components/offline-illustration.tsx";
import { AgentPanel } from "../../agent/agent-panel.tsx";
import styles from "../notes-workspace.module.css";

type ChatPanelProps = {
  activeNoteId: string | undefined;
  collapsed: boolean;
  isOffline: boolean;
  mobileVisible: boolean;
  panelsReversed: boolean;
  onCreateNote: () => void;
};

export function ChatPanel({
  activeNoteId,
  collapsed,
  isOffline,
  mobileVisible,
  panelsReversed,
  onCreateNote,
}: ChatPanelProps) {
  return (
    <section
      id="mobile-panel-chat"
      className={`${styles.chat} relative min-h-0 min-w-0 overflow-hidden rounded-none bg-surface backdrop-blur-2xl md:rounded-l-md md:rounded-r-xl ${mobileVisible ? "block" : "hidden"} md:block ${panelsReversed ? "xl:rounded-l-md xl:rounded-r-xl" : "xl:rounded-md"}`}
    >
      <div className={`h-full min-h-0 ${collapsed ? "invisible pointer-events-none" : ""}`}>
        {activeNoteId ? (
          <AgentPanel key={activeNoteId} noteId={activeNoteId} isOffline={isOffline} />
        ) : isOffline ? (
          <OfflineChatEmptyState onCreateNote={onCreateNote} />
        ) : (
          <OnlineChatEmptyState onCreateNote={onCreateNote} />
        )}
      </div>
    </section>
  );
}

function OfflineChatEmptyState({ onCreateNote }: { onCreateNote: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 pb-[10vh]">
      <div className="flex w-full max-w-3xl flex-col items-stretch gap-5 text-center">
        <OfflineIllustration />
        <div>
          <h1 className="text-2xl font-normal">You're offline</h1>
          <p className="mt-2 text-sm text-[#6f6f6f]">
            Chat needs a connection, but you can still create and edit notes.
          </p>
        </div>
        <div className="flex h-14 items-center rounded-[28px] border border-[#e7e7e7] bg-[#f7f7f7] px-4 text-left text-sm text-[#8e8e8e]">
          <span className="min-w-0 flex-1 truncate">Chat is unavailable while you're offline</span>
          <button
            type="button"
            disabled
            aria-label="Send"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#0d0d0d] text-white opacity-30"
          >
            <ArrowUp className="size-5" />
          </button>
        </div>
        <button
          type="button"
          onClick={onCreateNote}
          className="mx-auto flex h-10 items-center gap-2 rounded-full bg-[#0d0d0d] px-5 text-sm font-medium text-white"
        >
          <Plus className="size-4" />
          Create a note offline
        </button>
      </div>
    </div>
  );
}

function OnlineChatEmptyState({ onCreateNote }: { onCreateNote: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-4 pb-[16vh]">
      <h1 className="text-center text-2xl font-normal">Where should we begin?</h1>
      <button
        type="button"
        onClick={onCreateNote}
        className="flex h-14 w-full max-w-3xl items-center gap-3 rounded-[28px] border border-border bg-surface px-4 text-left text-muted shadow-lg backdrop-blur-xl"
      >
        <Plus className="size-5" />
        Create a note to start
      </button>
    </div>
  );
}
