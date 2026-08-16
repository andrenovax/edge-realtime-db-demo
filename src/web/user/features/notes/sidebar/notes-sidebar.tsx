import type { NoteEventArgs } from "@db/schema/user";
import { LogOut, PanelLeft, Plus, Search } from "lucide-react";
import { type ChangeEvent, useMemo, useState } from "react";
import styles from "../notes-workspace.module.css";
import type { NotesSyncDisplay, NoteStatus } from "../notes.types.ts";
import { getNoteTitle, NoteListItem } from "./note-list-item.tsx";
import { SyncStatus } from "./sync-status.tsx";

type NotesSidebarProps = {
  activeNotes: readonly NoteEventArgs[];
  email: string;
  mobileVisible: boolean;
  selectedNoteId: string | undefined;
  sidebarOpen: boolean;
  sync: NotesSyncDisplay;
  onCreateNote: () => void;
  onOpenNote: (id: string) => void;
  onRenameNote: (id: string, title: string) => void;
  onSignOut: () => Promise<void>;
  onStatusChange: (id: string, status: NoteStatus) => void;
  onToggleSidebar: () => void;
};

export function NotesSidebar({
  activeNotes,
  email,
  mobileVisible,
  selectedNoteId,
  sidebarOpen,
  sync,
  onCreateNote,
  onOpenNote,
  onRenameNote,
  onSignOut,
  onStatusChange,
  onToggleSidebar,
}: NotesSidebarProps) {
  const [search, setSearch] = useState("");
  const filteredNotes = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return query
      ? activeNotes.filter((note) => getNoteTitle(note).toLocaleLowerCase().includes(query))
      : activeNotes;
  }, [activeNotes, search]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const renderNote = (note: NoteEventArgs) => (
    <NoteListItem
      key={note.id}
      note={note}
      selected={note.id === selectedNoteId}
      onOpen={onOpenNote}
      onRename={onRenameNote}
      onStatusChange={onStatusChange}
    />
  );

  return (
    <aside
      id="mobile-panel-nav"
      className={`${styles.nav} min-h-0 flex-col overflow-hidden rounded-none bg-surface pb-16 backdrop-blur-2xl md:rounded-l-xl md:rounded-r-md md:pb-0 ${mobileVisible ? "flex" : "hidden"} md:flex`}
    >
      <div
        className={`flex h-14 shrink-0 items-center ${sidebarOpen ? "border-b border-separator px-3" : "px-2"}`}
      >
        <button
          type="button"
          aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
          title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
          onClick={onToggleSidebar}
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
          onClick={onCreateNote}
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
                onChange={handleSearchChange}
              />
            </label>

            <p className="px-3 pb-1.5 pt-5 text-xs font-medium text-[#6f6f6f]">Today</p>
            <nav aria-label="Notes" className="space-y-0.5">
              {filteredNotes.length === 0 && (
                <p className="px-3 py-2 text-sm text-[#8e8e8e]">
                  {activeNotes.length === 0 ? "No notes yet" : "No matching notes"}
                </p>
              )}
              {filteredNotes.map(renderNote)}
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
              <SyncStatus sync={sync} />
            </div>
            <button
              type="button"
              aria-label="Sign out"
              title="Sign out"
              onClick={onSignOut}
              className="flex size-8 items-center justify-center rounded-lg text-[#5d5d5d] hover:bg-black/[0.07]"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
