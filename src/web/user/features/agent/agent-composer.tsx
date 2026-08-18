import { AuiIf, ComposerPrimitive } from "@assistant-ui/react";
import {
  ArrowUp,
  // AudioLines,
  // Mic,
  Plus,
  Square,
} from "lucide-react";
import { useOnline } from "@ui/providers/online-provider.tsx";

type AgentComposerProps = {
  error?: string;
};

export function AgentComposer({ error }: AgentComposerProps) {
  const isOnline = useOnline();
  const isOffline = !isOnline;

  return (
    <div className="w-full">
      {error && <p className="mb-2 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>}
      <ComposerPrimitive.Root
        className={`group/composer flex w-full flex-col rounded-[28px] border border-border bg-surface px-2 py-2 shadow-lg backdrop-blur-xl focus-within:ring-2 focus-within:ring-accent/20 ${isOffline ? "opacity-75" : ""}`}
      >
        <div className="flex items-end gap-1">
          <button
            type="button"
            aria-label="Add attachment"
            title="Add photos & files"
            disabled={isOffline}
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-[#5d5d5d] transition-colors hover:bg-black/[0.07] disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Plus className="size-5" />
          </button>
          <ComposerPrimitive.Input
            autoFocus={!isOffline}
            aria-label="Message the note assistant"
            disabled={isOffline}
            className="max-h-52 min-h-9 flex-1 resize-none bg-transparent py-1.5 pl-1 pr-2 text-base text-[#0d0d0d] outline-none placeholder:text-[#8e8e8e] disabled:cursor-not-allowed disabled:text-[#8e8e8e]"
            placeholder={isOffline ? "Chat is unavailable while you're offline" : "Ask anything"}
            rows={1}
          />
          <div className="flex shrink-0 items-center gap-1">
            <AuiIf condition={(state) => state.thread.isRunning}>
              <ComposerPrimitive.Cancel
                aria-label="Stop"
                title="Stop"
                className="flex size-9 items-center justify-center rounded-full bg-[#0d0d0d] text-white"
              >
                <Square className="size-3 fill-current" />
              </ComposerPrimitive.Cancel>
            </AuiIf>
            <AuiIf condition={(state) => !state.thread.isRunning && !state.composer.isEmpty}>
              <ComposerPrimitive.Send
                aria-label="Send"
                title="Send"
                disabled={isOffline}
                className="flex size-9 items-center justify-center rounded-full bg-[#0d0d0d] text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowUp className="size-6" />
              </ComposerPrimitive.Send>
            </AuiIf>
            {/* Audio input is not supported yet. Keep this UI ready for when it is.
            <AuiIf condition={(state) => !state.thread.isRunning && state.composer.isEmpty}>
              <ComposerPrimitive.Dictate asChild>
                <button
                  type="button"
                  aria-label="Dictate"
                  title="Dictate"
                  disabled={isOffline}
                  className="flex size-9 items-center justify-center rounded-full text-[#5d5d5d] transition-colors hover:bg-black/[0.07] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <Mic className="size-5" />
                </button>
              </ComposerPrimitive.Dictate>
              <button
                type="button"
                aria-label="Use voice mode"
                title="Use voice mode"
                disabled={isOffline}
                className="flex size-9 items-center justify-center rounded-full bg-[#0d0d0d] text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <AudioLines className="size-5" />
              </button>
            </AuiIf>
            */}
          </div>
        </div>
      </ComposerPrimitive.Root>
    </div>
  );
}
