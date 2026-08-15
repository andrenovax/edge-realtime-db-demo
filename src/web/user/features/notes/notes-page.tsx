import { useStore } from "@livestore/react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Archive,
  ArrowLeftRight,
  ArrowUp,
  Check,
  Circle,
  Ellipsis,
  LogOut,
  LoaderCircle,
  PanelLeft,
  PanelRightClose,
  PanelRightOpen,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { events, tables, userStoreOptions } from "../../lib/store.ts";
import { AgentPanel, OfflineIllustration } from "../agent/agent-panel.tsx";
import styles from "./notes-page.module.css";

const OFFLINE_GRACE_MS = 3_500;

type TrackableEvent = ReturnType<(typeof events)[keyof typeof events]>;

function eventSignature(event: TrackableEvent) {
  const canonicalize = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(canonicalize);
    if (value === null || typeof value !== "object") return value;
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, entry]) => [key, canonicalize(entry)]),
    );
  };

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
  token: string;
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
      <span className="w-px bg-[#e5e5e5] transition-colors group-focus/resize:bg-[#a3a3a3] group-hover/resize:bg-[#a3a3a3]" />
    </div>
  );
}

// Reads are local: useQuery hits the in-browser SQLite, kept converged
// with the user's SyncBackendDO event log. Writes are LiveStore events.
export function NotesPage({ userId, token, email, onSignOut }: NotesPageProps) {
  const store = useStore(userStoreOptions(userId, token));
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
  const [completedReconnectTransition, setCompletedReconnectTransition] = useState(0);
  const [lastSyncedAt, setLastSyncedAt] = useState(() => Date.now());
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
  const { note: selectedId } = useSearch({ from: "/" });
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
  const isReconnectSyncing =
    isBrowserOnline && onlineTransition > completedReconnectTransition && pendingChangeCount > 0;
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
    : isReconnectSyncing
      ? "Syncing changes"
      : "Everything is synced";

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
      while (active) {
        iterator = store.events()[Symbol.asyncIterator]() as AsyncIterator<TrackableEvent>;
        try {
          while (active) {
            const result = await iterator.next();
            if (result.done || !active) return;
            const signature = eventSignature(result.value);
            const matchingCount = pendingChanges.current.get(signature) ?? 0;
            if (matchingCount === 0) continue;

            if (matchingCount === 1) pendingChanges.current.delete(signature);
            else pendingChanges.current.set(signature, matchingCount - 1);
            setPendingChangeCount((count) => Math.max(0, count - 1));
            setLastSyncedAt(Date.now());
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
      className={`${styles.workspace} relative grid h-full min-h-0 overflow-hidden ${
        panelsReversed ? styles.panelsReversed : ""
      } ${rightPanelOpen ? "" : styles.rightCollapsed} ${isOffline ? styles.offline : ""}`}
      style={
        {
          "--notes-nav-width": sidebarOpen ? `${navWidth}px` : "3rem",
          "--notes-nav-resizer-width": sidebarOpen ? "0.5rem" : "0px",
          "--notes-editor-resizer-width": rightPanelOpen ? "0.5rem" : "0px",
          "--notes-editor-width": rightPanelOpen ? `${editorWidth}px` : "3rem",
        } as React.CSSProperties
      }
    >
      <div
        className={`absolute right-2 top-2 z-50 flex items-center gap-1 ${
          rightPanelOpen ? "flex-row" : "flex-col-reverse"
        }`}
      >
        {!isOffline && (
          <button
            type="button"
            aria-label="Swap chat and note panels"
            title="Swap chat and note panels"
            onClick={() => setPanelsReversed((reversed) => !reversed)}
            className="flex size-8 items-center justify-center rounded-lg bg-transparent text-[#5d5d5d] hover:bg-black/[0.06]"
          >
            <ArrowLeftRight className="size-4" />
          </button>
        )}
        <button
          type="button"
          aria-label={rightPanelOpen ? "Collapse right panel" : "Expand right panel"}
          title={rightPanelOpen ? "Collapse right panel" : "Expand right panel"}
          onClick={() => setRightPanelOpen((open) => !open)}
          className="flex size-8 items-center justify-center rounded-lg bg-transparent text-[#5d5d5d] hover:bg-black/[0.06]"
        >
          {rightPanelOpen ? (
            <PanelRightClose className="size-4" />
          ) : (
            <PanelRightOpen className="size-4" />
          )}
        </button>
      </div>

      <aside
        className={`${styles.nav} hidden min-h-0 overflow-hidden bg-[#f9f9f9] md:flex md:flex-col ${sidebarOpen ? "" : "border-r border-[#e5e5e5]"}`}
      >
        <div className="flex h-12 shrink-0 items-center px-2">
          <button
            type="button"
            aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
            title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
            onClick={() => setSidebarOpen((open) => !open)}
            className="flex size-8 items-center justify-center rounded-lg hover:bg-black/[0.06]"
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
            className={`flex h-8 items-center overflow-hidden rounded-lg bg-transparent text-left text-sm font-medium hover:bg-black/[0.04] ${
              sidebarOpen ? "w-full gap-3 px-3" : "w-8 gap-0 px-2"
            }`}
          >
            <Plus className="size-4 shrink-0 stroke-[1.8]" />
            {sidebarOpen && <span>New note</span>}
          </button>

          {sidebarOpen && (
            <>
              <label className="mt-2 flex h-8 items-center gap-2 rounded-lg border border-[#dedede] bg-white px-3 text-[#5d5d5d] focus-within:border-[#c5c5c5]">
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
                      className={`group/note relative flex h-8 items-center rounded-lg text-sm ${
                        selectedNote ? "bg-[#e7e7e7] font-medium" : "hover:bg-[#ededed]"
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
                          className="absolute right-0 top-[calc(100%+0.25rem)] z-40 w-40 rounded-xl border border-[#dedede] bg-white p-1.5 font-normal shadow-[0_12px_32px_rgba(0,0,0,0.14)]"
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
          <div className="border-t border-[#e5e5e5] p-3">
            <div className="flex items-center gap-2 rounded-xl px-2 py-2">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#0d0d0d] text-xs font-semibold text-white">
                {email.slice(0, 1).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-[#5d5d5d]">{email}</p>
                <div
                  key={
                    isOffline
                      ? "offline"
                      : `online-${onlineTransition}-${isReconnectSyncing ? "syncing" : "synced"}`
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
        className={`${styles.navResizer} ${sidebarOpen ? "hidden md:flex" : "hidden"}`}
        onResize={resizeNav}
      />

      <section
        className={`${styles.chat} relative min-h-0 min-w-0 overflow-hidden ${
          chatPanelCollapsed ? "border-l border-[#e5e5e5] bg-[#f9f9f9]" : "bg-white"
        }`}
      >
        <div
          className={`h-full min-h-0 ${chatPanelCollapsed ? "invisible pointer-events-none" : ""}`}
        >
          {activeNoteId ? (
            <AgentPanel
              key={activeNoteId}
              token={token}
              noteId={activeNoteId}
              conversationExists={conversations.some(({ id }) => id === activeNoteId)}
              isOffline={isOffline}
            />
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
                className="flex h-14 w-full max-w-3xl items-center gap-3 rounded-[28px] border border-[#e5e5e5] px-4 text-left text-[#8e8e8e] shadow-[0_2px_6px_-2px_rgba(0,0,0,0.05)]"
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
        className={`${styles.editorResizer} ${rightPanelOpen ? "hidden xl:flex" : "hidden"}`}
        onResize={(delta) => resizeEditor(panelsReversed ? -delta : delta)}
      />

      <section
        className={`${styles.editor} relative hidden min-h-0 min-w-0 overflow-hidden xl:block ${
          notePanelCollapsed ? "border-l border-[#e5e5e5] bg-[#f9f9f9]" : "bg-white"
        }`}
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
    </div>
  );
}
