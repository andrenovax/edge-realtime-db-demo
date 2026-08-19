import type { CSSProperties } from "react";
import type { NoteStatus } from "@db/constants";
import { useSignOut } from "@ui/features/auth/hooks/use-sign-out.ts";
import { ChatPanel } from "@ui/features/notes/components/chat-panel.tsx";
import { MobilePanelNav } from "@ui/features/notes/components/controls/mobile-panel-nav.tsx";
import { PanelResizeHandle } from "@ui/features/notes/components/controls/panel-resize-handle.tsx";
import { WorkspaceControls } from "@ui/features/notes/components/controls/workspace-controls.tsx";
import { EditorPanel } from "@ui/features/notes/components/editor/index.ts";
import { NotesSidebar } from "@ui/features/notes/components/sidebar/index.ts";
import { useNoteSelection } from "@ui/features/notes/hooks/use-note-selection.ts";
import { useNotesLayout } from "@ui/features/notes/hooks/use-notes-layout.ts";
import { useNotesModel } from "@ui/features/notes/hooks/use-notes-model.ts";
import styles from "@ui/features/notes/notes-workspace.module.css";
import { useOnline } from "@ui/providers/online-provider.tsx";
import { useCurrentUser } from "../auth/hooks/use-current-user";
import { useSearch } from "@tanstack/react-router";

export function NotesPage() {
  const notes = useNotesModel();
  const isOnline = useOnline();
  const signOut = useSignOut();
  const { note: selectedId } = useSearch({ from: "/_authenticated/" });
  const selection = useNoteSelection({
    activeNotes: notes.activeNotes,
    notes: notes.notes,
    noteId: selectedId,
  });
  const layout = useNotesLayout();
  const { email } = useCurrentUser();

  const openNote = (id: string) => {
    layout.revealNotePanel();
    selection.selectNote(id);
  };
  const startNewNote = () => openNote(notes.createDraft());
  const handleNoteStatusChange = (id: string, status: NoteStatus) => {
    notes.changeNoteStatus(id, status);
    if (selection.selected?.id === id) {
      selection.selectNote(notes.activeNotes.find((note) => note.id !== id)?.id);
    }
  };

  return (
    <div
      className={`${styles.workspace} relative grid h-full min-h-0 overflow-hidden p-0 md:p-3 ${
        layout.panelsReversed ? styles.panelsReversed : ""
      } ${layout.rightPanelOpen ? "" : styles.rightCollapsed} ${isOnline ? "" : styles.offline}`}
      style={
        {
          "--notes-nav-width": layout.sidebarOpen ? `${layout.navWidth}px` : "3rem",
          "--notes-nav-resizer-width": "0.25rem",
          "--notes-editor-resizer-width": "0.25rem",
          "--notes-editor-width": layout.rightPanelOpen ? `${layout.editorWidth}px` : "3rem",
        } as CSSProperties
      }
    >
      <WorkspaceControls
        rightPanelOpen={layout.rightPanelOpen}
        onSwapPanels={layout.swapPanels}
        onToggleRightPanel={layout.toggleRightPanel}
      />

      <NotesSidebar
        activeNotes={notes.activeNotes}
        email={email}
        mobileVisible={layout.mobilePanel === "nav"}
        selectedNoteId={selection.selected?.id}
        sidebarOpen={layout.sidebarOpen}
        onCreateNote={startNewNote}
        onOpenNote={openNote}
        onRenameNote={notes.renameNote}
        onSignOut={signOut}
        onStatusChange={handleNoteStatusChange}
        onToggleSidebar={layout.toggleSidebar}
      />

      <PanelResizeHandle
        label="Resize notes sidebar"
        value={layout.navWidth}
        className={`${styles.navResizer} w-2 justify-self-center ${layout.sidebarOpen ? "hidden md:flex" : "hidden"}`}
        onResize={layout.resizeNav}
      />

      <ChatPanel
        activeNoteId={selection.activeNoteId}
        collapsed={layout.chatPanelCollapsed}
        mobileVisible={layout.mobilePanel === "chat"}
        panelsReversed={layout.panelsReversed}
        onCreateNote={startNewNote}
      />

      <PanelResizeHandle
        label="Resize note editor"
        value={layout.editorWidth}
        className={`${styles.editorResizer} w-2 justify-self-center ${layout.rightPanelOpen ? "hidden xl:flex" : "hidden"}`}
        onResize={layout.resizeVisibleEditor}
      />

      <EditorPanel
        activeNoteId={selection.activeNoteId}
        collapsed={layout.notePanelCollapsed}
        markdown={selection.selected?.text ?? ""}
        mobileVisible={layout.mobilePanel === "note"}
        panelsReversed={layout.panelsReversed}
        onSaveNote={notes.saveNote}
      />

      <MobilePanelNav activePanel={layout.mobilePanel} onSelectPanel={layout.selectMobilePanel} />
    </div>
  );
}
