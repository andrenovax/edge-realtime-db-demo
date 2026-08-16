import type { CSSProperties } from "react";
import { EditorPanel } from "./editor/editor-panel.tsx";
import { useNoteSelection } from "./hooks/use-note-selection.ts";
import { useNotesLayout } from "./hooks/use-notes-layout.ts";
import { useNotesModel } from "./hooks/use-notes-model.ts";
import { useNotesSync } from "./hooks/use-notes-sync.ts";
import styles from "./notes-workspace.module.css";
import type { NoteStatus } from "./notes.types.ts";
import { NotesSidebar } from "./sidebar/notes-sidebar.tsx";
import { ChatPanel } from "./workspace/chat-panel.tsx";
import { MobilePanelNav } from "./workspace/mobile-panel-nav.tsx";
import { PanelResizeHandle } from "./workspace/panel-resize-handle.tsx";
import { WorkspaceControls } from "./workspace/workspace-controls.tsx";

type NotesPageProps = {
  userId: string;
  email: string;
  onSignOut: () => Promise<void>;
};

export function NotesPage({ email, onSignOut }: NotesPageProps) {
  const notes = useNotesModel();
  const { isOffline, syncDisplay } = useNotesSync(notes.store);
  const selection = useNoteSelection({ activeNotes: notes.activeNotes, notes: notes.notes });
  const layout = useNotesLayout(isOffline);

  const openNote = (id: string) => {
    layout.revealNotePanel();
    selection.selectNote(id);
  };
  const startNewNote = () => openNote(notes.createNote());
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
      } ${layout.rightPanelOpen ? "" : styles.rightCollapsed} ${isOffline ? styles.offline : ""}`}
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
        isOffline={isOffline}
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
        sync={syncDisplay}
        onCreateNote={startNewNote}
        onOpenNote={openNote}
        onRenameNote={notes.renameNote}
        onSignOut={onSignOut}
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
        isOffline={isOffline}
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
