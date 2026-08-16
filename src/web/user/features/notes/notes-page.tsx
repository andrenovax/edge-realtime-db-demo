import { useNavigate, useSearch } from "@tanstack/react-router";
import { Effect, Fiber, Stream } from "effect";
import {
  Archive,
  ArrowLeftRight,
  ArrowUp,
  Check,
  Circle,
  Ellipsis,
  FileText,
  LogOut,
  LoaderCircle,
  MessageCircle,
  PanelLeft,
  PanelRightClose,
  PanelRightOpen,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { OfflineIllustration } from "../../components/offline-illustration.tsx";
import { events, tables, useCurrentUserLiveStore } from "../../lib/livestore.tsx";
import { AgentPanel } from "../agent/agent-panel.tsx";
import styles from "./notes-page.module.css";

const OFFLINE_GRACE_MS = 3_500;

type TrackableEvent = ReturnType<(typeof events)[keyof typeof events]>;

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value === null || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .toSorted(([left], [right]) => left.localeCompare(right))
      .map(([key, entry]) => [key, canonicalize(entry)]),
  );
}

function eventSignature(event: TrackableEvent) {
  return JSON.stringify([event.name, canonicalize(event.args)]);
}

function useDebouncedOffline() {
  const [isOffline, setIsOffline] = useState(false);
  const [isBrowserOnline, setIsBrowserOnline] = useState(() => navigator.onLine);
  const [onlineTransition, setOnlineTransition] = useState(0);
  const offlineShown = useRef(false);

  useEffect(() => {
    let offlineTimer: ReturnType<typeof setTimeout> | undefined;

    const clearOfflineTimer = () => {
      if (offlineTimer) clearTimeout(offlineTimer);
      offlineTimer = undefined;
    };
    const handleOffline = () => {
      clearOfflineTimer();
      setIsBrowserOnline(false);
      offlineTimer = setTimeout(() => {
        if (navigator.onLine) return;
        offlineShown.current = true;
        setIsOffline(true);
      }, OFFLINE_GRACE_MS);
    };
    const handleOnline = () => {
      clearOfflineTimer();
      setIsBrowserOnline(true);
      if (offlineShown.current) setOnlineTransition((transition) => transition + 1);
      offlineShown.current = false;
      setIsOffline(false);
    };

    if (!navigator.onLine) handleOffline();
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      clearOfflineTimer();
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return { isOffline, isBrowserOnline, onlineTransition };
}

const NoteEditor = lazy(() =>
  import("./note-editor.tsx").then((module) => ({ default: module.NoteEditor })),
);

function noteTitle(note: { title: string; text: string }) {
  if (note.title.trim()) return note.title.trim();
  const firstLine = note.text
    .split("\n")
    .map((line) => line.trim())
    .find(Boolean);
  return (
    firstLine
      ?.replace(/^#{1,6}\s+/, "")
      .replace(/^[-*+]\s+/, "")
      .slice(0, 70) || "Untitled note"
  );
}

type NotesPageProps = {
  userId: string;
  email: string;
  onSignOut: () => Promise<void>;
};

type PanelResizeHandleProps = {
  label: string;
  value: number;
  className: string;
  onResize: (delta: number) => void;
};

function PanelResizeHandle({ label, value, className, onResize }: PanelResizeHandleProps) {
  const lastX = useRef<number | undefined>(undefined);

  const finishResize = (element: HTMLDivElement, pointerId: number) => {
    if (element.hasPointerCapture(pointerId)) element.releasePointerCapture(pointerId);
    lastX.current = undefined;
    document.body.style.removeProperty("cursor");
    document.body.style.removeProperty("user-select");
  };

  return (
    <div
      role="separator"
      aria-label={label}
      aria-orientation="vertical"
      aria-valuemin={200}
      aria-valuemax={900}
      aria-valuenow={Math.round(value)}
      tabIndex={0}
      className={`${className} group/resize relative z-20 cursor-col-resize touch-none items-stretch justify-center outline-none`}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        lastX.current = event.clientX;
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
      }}
      onPointerMove={(event) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId) || lastX.current === undefined)
          return;
        const delta = event.clientX - lastX.current;
        lastX.current = event.clientX;
        onResize(delta);
      }}
      onPointerUp={(event) => finishResize(event.currentTarget, event.pointerId)}
      onPointerCancel={(event) => finishResize(event.currentTarget, event.pointerId)}
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        onResize(event.key === "ArrowRight" ? 16 : -16);
      }}
    >
      <span className="w-px bg-transparent transition-colors group-focus/resize:bg-accent/30 group-hover/resize:bg-accent/30" />
    </div>
  );
}

// Reads are local: useQuery hits the in-browser SQLite, kept converged
// with the user's SyncBackendDO event log. Writes are LiveStore events.
export function NotesPage({ email, onSignOut }: NotesPageProps) {
  const store = useCurrentUserLiveStore();
  const notes = store.useQuery(tables.notes.orderBy("updatedAt", "desc"));
  const syncedConversations = store.useQuery(
    tables.agentConversations.orderBy("updatedAt", "desc"),
  );
  const conversations = syncedConversations.filter(
    (conversation) => conversation.status === "active",
  );
  const { isOffline, isBrowserOnline, onlineTransition } = useDebouncedOffline();
  const pendingChanges = useRef(new Map<string, number>());
  const [pendingChangeCount, setPendingChangeCount] = useState(0);
  const [syncConnected, setSyncConnected] = useState<boolean>();
  const [completedReconnectTransition, setCompletedReconnectTransition] = useState(0);
  const [lastSyncedAt, setLastSyncedAt] = useState(() => Date.now());
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobilePanel, setMobilePanel] = useState<"nav" | "chat" | "note">("chat");
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [panelsReversed, setPanelsReversed] = useState(false);
  const [actionNoteId, setActionNoteId] = useState<string>();
  const [renamingNoteId, setRenamingNoteId] = useState<string>();
  const [renameDraft, setRenameDraft] = useState("");
  const actionsRef = useRef<HTMLDivElement>(null);
  const cancelRenameRef = useRef(false);
  const [navWidth, setNavWidth] = useState(260);
  const [editorWidth, setEditorWidth] = useState(() =>
    typeof window === "undefined"
      ? 520
      : Math.max(420, Math.round((window.innerWidth - 276) * 0.425)),
  );
  const { note: selectedId } = useSearch({ from: "/_authenticated/" });
  const navigate = useNavigate();
  const activeNotes = useMemo(() => notes.filter((note) => note.status === "active"), [notes]);
  const selected = selectedId ? activeNotes.find((note) => note.id === selectedId) : activeNotes[0];
  const draftId =
    selectedId && !notes.some((note) => note.id === selectedId) ? selectedId : undefined;
  const activeNoteId = selected?.id ?? draftId;
  const filteredNotes = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return query
      ? activeNotes.filter((note) => noteTitle(note).toLocaleLowerCase().includes(query))
      : activeNotes;
  }, [activeNotes, search]);
  const unsavedChangeCount = pendingChangeCount;
  const isSyncDisconnected = isBrowserOnline && syncConnected === false;
  const isReconnectSyncing =
    isSyncDisconnected ||
    (isBrowserOnline && onlineTransition > completedReconnectTransition && pendingChangeCount > 0);
  const lastSyncedLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
      }).format(lastSyncedAt),
    [lastSyncedAt],
  );
  const syncTooltip = isOffline
    ? unsavedChangeCount > 0
      ? `Offline — ${unsavedChangeCount} unsaved ${unsavedChangeCount === 1 ? "change" : "changes"}`
      : "Offline — everything is saved locally"
    : isSyncDisconnected
      ? unsavedChangeCount > 0
        ? `Reconnecting — ${unsavedChangeCount} ${unsavedChangeCount === 1 ? "change is" : "changes are"} waiting to sync`
        : "Reconnecting to sync"
      : isReconnectSyncing
        ? "Syncing changes"
        : "Everything is synced";

  useEffect(() => {
    let active = true;
    const fiber = Effect.runFork(
      Effect.gen(function* () {
        const initial = yield* store.networkStatus;
        if (active) setSyncConnected(initial.isConnected);
        yield* store.networkStatus.changes.pipe(
          Stream.runForEach((status) =>
            Effect.sync(() => {
              if (active) setSyncConnected(status.isConnected);
            }),
          ),
        );
      }).pipe(Effect.scoped),
    );

    return () => {
      active = false;
      Effect.runFork(Fiber.interrupt(fiber));
    };
  }, [store]);

  useEffect(() => {
    if (onlineTransition > completedReconnectTransition && pendingChangeCount === 0) {
      setCompletedReconnectTransition(onlineTransition);
    }
  }, [completedReconnectTransition, onlineTransition, pendingChangeCount]);

  useEffect(() => {
    let active = true;
    let iterator: AsyncIterator<TrackableEvent> | undefined;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    // This stream only yields events after the sync backend confirms them.
    // Matching the original commit keeps the UI honest across reconnects.
    const listenForConfirmations = async () => {
      for (;;) {
        if (!active) return;
        iterator = store.events()[Symbol.asyncIterator]() as AsyncIterator<TrackableEvent>;
        try {
          for (;;) {
            const result = await iterator.next();
            if (result.done || !active) return;
            setLastSyncedAt(Date.now());
            const signature = eventSignature(result.value);
            const matchingCount = pendingChanges.current.get(signature) ?? 0;
            if (matchingCount === 0) continue;

            if (matchingCount === 1) pendingChanges.current.delete(signature);
            else pendingChanges.current.set(signature, matchingCount - 1);
            setPendingChangeCount((count) => Math.max(0, count - 1));
          }
        } catch {
          if (!active) return;
          await new Promise<void>((resolve) => {
            retryTimer = setTimeout(resolve, 1_000);
          });
        }
      }
    };

    void listenForConfirmations();
    return () => {
      active = false;
      if (retryTimer) clearTimeout(retryTimer);
      void iterator?.return?.();
    };
  }, [store]);

  useEffect(() => {
    if (!actionNoteId) return;
    const closeActions = (event: PointerEvent) => {
      if (!actionsRef.current?.contains(event.target as Node)) setActionNoteId(undefined);
    };
    document.addEventListener("pointerdown", closeActions);
    return () => document.removeEventListener("pointerdown", closeActions);
  }, [actionNoteId]);

  const selectNote = (id: string | undefined) =>
    void navigate({
      to: "/",
      search: id ? { note: id } : {},
    });

  const commitTrackedChange = (event: TrackableEvent) => {
    const signature = eventSignature(event);
    pendingChanges.current.set(signature, (pendingChanges.current.get(signature) ?? 0) + 1);
    setPendingChangeCount((count) => count + 1);
    try {
      store.commit(event);
    } catch (error) {
      const matchingCount = pendingChanges.current.get(signature) ?? 0;
      if (matchingCount <= 1) pendingChanges.current.delete(signature);
      else pendingChanges.current.set(signature, matchingCount - 1);
      setPendingChangeCount((count) => Math.max(0, count - 1));
      throw error;
    }
  };

  const openNote = (id: string) => {
    if (isOffline) {
      setPanelsReversed(true);
      setRightPanelOpen(true);
    }
    setMobilePanel("note");
    selectNote(id);
  };

  const startNewNote = () => {
    const id = crypto.randomUUID();
    commitTrackedChange(events.noteCreated({ id, text: "", updatedAt: Date.now() }));
    openNote(id);
  };

  const renameNote = (id: string) => {
    const title = renameDraft.trim().slice(0, 70);
    setRenamingNoteId(undefined);
    if (!title) return;
    const updatedAt = Date.now();
    commitTrackedChange(events.noteRenamed({ id, title, updatedAt }));
    const conversation = conversations.find((item) => item.id === id);
    if (conversation) {
      commitTrackedChange(events.agentConversationUpdated({ ...conversation, title, updatedAt }));
    }
  };

  const changeNoteStatus = (id: string, status: "archived" | "deleted") => {
    const updatedAt = Date.now();
    commitTrackedChange(events.noteStatusChanged({ id, status, updatedAt }));
    const conversation = conversations.find((item) => item.id === id);
    if (conversation) {
      commitTrackedChange(
        events.agentConversationUpdated({
          ...conversation,
          status: "archived",
          updatedAt,
        }),
      );
    }
    setActionNoteId(undefined);
    if (selected?.id === id) selectNote(activeNotes.find((note) => note.id !== id)?.id);
  };

  const resizeNav = (delta: number) => {
    setNavWidth((width) => {
      const availableWidth = typeof window === "undefined" ? 1280 : window.innerWidth;
      const editorSpace = availableWidth >= 1280 ? editorWidth + 420 + 16 : 360 + 8;
      const maximum = Math.max(200, Math.min(380, availableWidth - editorSpace));
      return Math.min(maximum, Math.max(200, width + delta));
    });
  };

  const resizeEditor = (delta: number) => {
    setEditorWidth((width) => {
      const availableWidth = typeof window === "undefined" ? 1280 : window.innerWidth;
      const sidebarWidth = sidebarOpen ? navWidth : 48;
      const maximum = Math.max(420, availableWidth - sidebarWidth - 420 - 16);
      return Math.min(maximum, Math.max(420, width - delta));
    });
  };
  const notePanelCollapsed = !rightPanelOpen && !panelsReversed;
  const chatPanelCollapsed = !rightPanelOpen && panelsReversed;

  return (
    <div
      className={`${styles.workspace} relative grid h-full min-h-0 overflow-hidden p-0 md:p-3 ${
        panelsReversed ? styles.panelsReversed : ""
      } ${rightPanelOpen ? "" : styles.rightCollapsed} ${isOffline ? styles.offline : ""}`}
      style={
        {
          "--notes-nav-width": sidebarOpen ? `${navWidth}px` : "3rem",
          "--notes-nav-resizer-width": "0.25rem",
          "--notes-editor-resizer-width": "0.25rem",
          "--notes-editor-width": rightPanelOpen ? `${editorWidth}px` : "3rem",
        } as React.CSSProperties
      }
    >
      <div
        className={`absolute top-6 z-50 hidden items-center gap-1 md:flex ${
          rightPanelOpen ? "right-6 flex-row" : "right-5 flex-col-reverse"
        }`}
      >
        {!isOffline && rightPanelOpen && (
          <button
            type="button"
            aria-label="Swap chat and note panels"
            title="Swap chat and note panels"
            onClick={() => setPanelsReversed((reversed) => !reversed)}
            className="flex size-8 items-center justify-center rounded-lg text-muted hover:bg-default"
          >
            <ArrowLeftRight className="size-4" />
          </button>
        )}
        <button
          type="button"
          aria-label={rightPanelOpen ? "Collapse right panel" : "Expand right panel"}
          title={rightPanelOpen ? "Collapse right panel" : "Expand right panel"}
          onClick={() => setRightPanelOpen((open) => !open)}
          className="flex size-8 items-center justify-center rounded-lg text-muted hover:bg-default"
        >
          {rightPanelOpen ? (
            <PanelRightClose className="size-4" />
          ) : (
            <PanelRightOpen className="size-4" />
          )}
        </button>
      </div>

      <aside
        id="mobile-panel-nav"
        className={`${styles.nav} min-h-0 flex-col overflow-hidden rounded-none bg-surface pb-16 backdrop-blur-2xl md:rounded-l-xl md:rounded-r-md md:pb-0 ${mobilePanel === "nav" ? "flex" : "hidden"} md:flex`}
      >
        <div
          className={`flex h-14 shrink-0 items-center ${sidebarOpen ? "border-b border-separator px-3" : "px-2"}`}
        >
          <button
            type="button"
            aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
            title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
            onClick={() => setSidebarOpen((open) => !open)}
            className="hidden size-8 items-center justify-center rounded-lg text-muted hover:bg-default md:flex"
          >
            <PanelLeft className="size-4 stroke-[1.8]" />
          </button>
          {sidebarOpen && (
            <span className="ml-2 truncate text-sm font-medium text-[#0d0d0d]">
              Durable Object Demo
            </span>
          )}
        </div>

        <div
          className={`min-h-0 flex-1 ${
            sidebarOpen ? "overflow-y-auto p-3" : "w-12 overflow-hidden px-2 pt-1"
          }`}
        >
          <button
            type="button"
            onClick={startNewNote}
            aria-label="New note"
            title={sidebarOpen ? undefined : "New note"}
            className={`flex h-9 items-center overflow-hidden rounded-xl bg-default/70 text-left text-sm font-medium hover:bg-default ${
              sidebarOpen ? "w-full gap-3 px-3" : "w-8 gap-0 px-2"
            }`}
          >
            <Plus className="size-4 shrink-0 stroke-[1.8]" />
            {sidebarOpen && <span>New note</span>}
          </button>

          {sidebarOpen && (
            <>
              <label className="mt-2 flex h-9 items-center gap-2 rounded-xl border border-border bg-field px-3 text-muted focus-within:ring-2 focus-within:ring-accent/20">
                <Search className="size-4 shrink-0 stroke-[1.8]" />
                <input
                  aria-label="Search notes"
                  className="min-w-0 flex-1 bg-transparent text-sm text-[#0d0d0d] outline-none placeholder:text-[#8e8e8e]"
                  placeholder="Search notes"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>

              <p className="px-3 pb-1.5 pt-5 text-xs font-medium text-[#6f6f6f]">Today</p>
              <nav aria-label="Notes" className="space-y-0.5">
                {filteredNotes.length === 0 && (
                  <p className="px-3 py-2 text-sm text-[#8e8e8e]">
                    {activeNotes.length === 0 ? "No notes yet" : "No matching notes"}
                  </p>
                )}
                {filteredNotes.map((note) => {
                  const selectedNote = note.id === selected?.id;
                  const actionsOpen = note.id === actionNoteId;
                  return (
                    <div
                      key={note.id}
                      className={`group/note relative flex h-9 items-center rounded-xl text-sm hover:bg-default/60 ${
                        selectedNote ? "bg-accent/10 font-medium text-accent" : ""
                      }`}
                    >
                      {renamingNoteId === note.id ? (
                        <input
                          autoFocus
                          aria-label="Rename note"
                          className="mx-2 min-w-0 flex-1 rounded border border-[#bdbdbd] bg-white px-1.5 py-0.5 text-sm font-normal outline-none focus:border-[#777]"
                          value={renameDraft}
                          onChange={(event) => setRenameDraft(event.target.value)}
                          onBlur={() => {
                            if (cancelRenameRef.current) {
                              cancelRenameRef.current = false;
                              setRenamingNoteId(undefined);
                              return;
                            }
                            renameNote(note.id);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              event.currentTarget.blur();
                            }
                            if (event.key === "Escape") {
                              event.preventDefault();
                              cancelRenameRef.current = true;
                              event.currentTarget.blur();
                            }
                          }}
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => openNote(note.id)}
                          className="min-w-0 flex-1 truncate self-stretch pl-3 pr-1 text-left"
                        >
                          {noteTitle(note)}
                        </button>
                      )}
                      {renamingNoteId !== note.id && (
                        <button
                          type="button"
                          aria-label={`Actions for ${noteTitle(note)}`}
                          title="Note actions"
                          onClick={() => setActionNoteId(actionsOpen ? undefined : note.id)}
                          className={`mr-1 flex size-7 shrink-0 items-center justify-center rounded-md hover:bg-black/[0.07] ${
                            selectedNote || actionsOpen
                              ? "opacity-100"
                              : "opacity-0 group-hover/note:opacity-100 focus:opacity-100"
                          }`}
                        >
                          <Ellipsis className="size-4" />
                        </button>
                      )}
                      {actionsOpen && (
                        <div
                          ref={actionsRef}
                          role="menu"
                          className="absolute right-0 top-[calc(100%+0.25rem)] z-40 w-40 rounded-xl border border-border bg-overlay p-1.5 font-normal shadow-xl backdrop-blur-xl"
                        >
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              cancelRenameRef.current = false;
                              setRenameDraft(noteTitle(note));
                              setRenamingNoteId(note.id);
                              setActionNoteId(undefined);
                            }}
                            className="flex h-9 w-full items-center gap-2.5 rounded-lg px-2.5 text-left text-sm hover:bg-[#f2f2f2]"
                          >
                            <Pencil className="size-4" /> Rename
                          </button>
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => changeNoteStatus(note.id, "archived")}
                            className="flex h-9 w-full items-center gap-2.5 rounded-lg px-2.5 text-left text-sm hover:bg-[#f2f2f2]"
                          >
                            <Archive className="size-4" /> Archive
                          </button>
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => changeNoteStatus(note.id, "deleted")}
                            className="flex h-9 w-full items-center gap-2.5 rounded-lg px-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="size-4" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </>
          )}
        </div>

        {sidebarOpen && (
          <div className="border-t border-separator p-3">
            <div className="flex items-center gap-2 rounded-xl px-2 py-2">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground shadow-md">
                {email.slice(0, 1).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-[#5d5d5d]">{email}</p>
                <div
                  key={
                    isOffline
                      ? "offline"
                      : `online-${onlineTransition}-${isSyncDisconnected ? "reconnecting" : isReconnectSyncing ? "syncing" : "synced"}`
                  }
                  aria-live="polite"
                  className="mt-1 flex min-w-0 items-center gap-1.5 text-[11px] font-normal leading-4 text-[#777]"
                >
                  <span
                    tabIndex={0}
                    aria-label={syncTooltip}
                    className="group/status relative flex size-4 shrink-0 items-center justify-center rounded outline-none focus-visible:ring-2 focus-visible:ring-[#bdbdbd]"
                  >
                    {isOffline ? (
                      <Circle className="size-2 fill-red-500 text-red-500" />
                    ) : isReconnectSyncing ? (
                      <LoaderCircle className="size-3.5 animate-spin text-[#8e8e8e]" />
                    ) : (
                      <Check className="size-3.5 text-[#8e8e8e]" />
                    )}
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute bottom-[calc(100%+0.375rem)] left-0 z-50 w-max max-w-52 rounded-md bg-[#222] px-2 py-1.5 text-[11px] leading-4 text-white opacity-0 shadow-lg transition-opacity group-focus/status:opacity-100 group-hover/status:opacity-100"
                    >
                      {syncTooltip}
                    </span>
                  </span>
                  <span className="min-w-0 flex-1 truncate">
                    {isOffline && unsavedChangeCount > 0
                      ? `${unsavedChangeCount} unsaved ${unsavedChangeCount === 1 ? "change" : "changes"} · Last synced at ${lastSyncedLabel}`
                      : isSyncDisconnected && unsavedChangeCount > 0
                        ? `${unsavedChangeCount} waiting to sync · Last synced at ${lastSyncedLabel}`
                        : isSyncDisconnected
                          ? `Reconnecting · Last synced at ${lastSyncedLabel}`
                          : `Last synced at ${lastSyncedLabel}`}
                  </span>
                </div>
              </div>
              <button
                type="button"
                aria-label="Sign out"
                title="Sign out"
                onClick={() => void onSignOut()}
                className="flex size-8 items-center justify-center rounded-lg text-[#5d5d5d] hover:bg-black/[0.07]"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          </div>
        )}
      </aside>

      <PanelResizeHandle
        label="Resize notes sidebar"
        value={navWidth}
        className={`${styles.navResizer} w-2 justify-self-center ${sidebarOpen ? "hidden md:flex" : "hidden"}`}
        onResize={resizeNav}
      />

      <section
        id="mobile-panel-chat"
        className={`${styles.chat} relative min-h-0 min-w-0 overflow-hidden rounded-none bg-surface backdrop-blur-2xl md:rounded-l-md md:rounded-r-xl ${mobilePanel === "chat" ? "block" : "hidden"} md:block ${panelsReversed ? "xl:rounded-l-md xl:rounded-r-xl" : "xl:rounded-md"}`}
      >
        <div
          className={`h-full min-h-0 ${chatPanelCollapsed ? "invisible pointer-events-none" : ""}`}
        >
          {activeNoteId ? (
            <AgentPanel key={activeNoteId} noteId={activeNoteId} isOffline={isOffline} />
          ) : isOffline ? (
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
                  <span className="min-w-0 flex-1 truncate">
                    Chat is unavailable while you're offline
                  </span>
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
                  onClick={startNewNote}
                  className="mx-auto flex h-10 items-center gap-2 rounded-full bg-[#0d0d0d] px-5 text-sm font-medium text-white"
                >
                  <Plus className="size-4" />
                  Create a note offline
                </button>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-6 px-4 pb-[16vh]">
              <h1 className="text-center text-2xl font-normal">Where should we begin?</h1>
              <button
                type="button"
                onClick={startNewNote}
                className="flex h-14 w-full max-w-3xl items-center gap-3 rounded-[28px] border border-border bg-surface px-4 text-left text-muted shadow-lg backdrop-blur-xl"
              >
                <Plus className="size-5" />
                Create a note to start
              </button>
            </div>
          )}
        </div>
      </section>

      <PanelResizeHandle
        label="Resize note editor"
        value={editorWidth}
        className={`${styles.editorResizer} w-2 justify-self-center ${rightPanelOpen ? "hidden xl:flex" : "hidden"}`}
        onResize={(delta) => resizeEditor(panelsReversed ? -delta : delta)}
      />

      <section
        id="mobile-panel-note"
        className={`${styles.editor} relative min-h-0 min-w-0 overflow-hidden rounded-none bg-surface backdrop-blur-2xl md:rounded-l-md md:rounded-r-xl ${mobilePanel === "note" ? "block" : "hidden"} md:hidden xl:block ${panelsReversed ? "xl:rounded-md" : "xl:rounded-l-md xl:rounded-r-xl"}`}
      >
        <div
          className={`h-full min-h-0 ${notePanelCollapsed ? "invisible pointer-events-none" : ""}`}
        >
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-sm text-[#8e8e8e]">
                Loading editor…
              </div>
            }
          >
            {activeNoteId ? (
              <NoteEditor
                key={activeNoteId}
                noteId={activeNoteId}
                markdown={selected?.text ?? ""}
                onSave={(text) => {
                  if (selected) {
                    commitTrackedChange(
                      events.noteUpdated({ id: selected.id, text, updatedAt: Date.now() }),
                    );
                    return;
                  }
                  if (text.trim()) {
                    commitTrackedChange(
                      events.noteCreated({ id: activeNoteId, text, updatedAt: Date.now() }),
                    );
                  }
                }}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-[#8e8e8e]">
                Your note will appear here.
              </div>
            )}
          </Suspense>
        </div>
      </section>

      <nav
        aria-label="Mobile panels"
        role="tablist"
        className="absolute bottom-3 left-1/2 z-50 flex -translate-x-1/2 items-center gap-0.5 rounded-2xl border border-border bg-overlay/90 p-1 shadow-xl backdrop-blur-2xl md:hidden"
      >
        {(
          [
            { id: "nav", label: "Notes", icon: PanelLeft },
            { id: "chat", label: "Chat", icon: MessageCircle },
            { id: "note", label: "Note", icon: FileText },
          ] as const
        ).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-controls={`mobile-panel-${id}`}
            aria-selected={mobilePanel === id}
            aria-label={label}
            title={label}
            onClick={() => {
              if (id === "nav") setSidebarOpen(true);
              setMobilePanel(id);
            }}
            className={`flex size-10 items-center justify-center rounded-xl transition-colors ${
              mobilePanel === id
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted hover:bg-default"
            }`}
          >
            <Icon className="size-[1.125rem]" />
            <span className="sr-only">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
