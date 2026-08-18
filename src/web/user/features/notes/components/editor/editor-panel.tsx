import { lazy, Suspense } from "react";
import styles from "@ui/features/notes/notes-workspace.module.css";

const NoteEditor = lazy(() =>
  import("@ui/features/notes/components/editor/note-editor.tsx").then((module) => ({
    default: module.NoteEditor,
  })),
);

type EditorPanelProps = {
  activeNoteId: string | undefined;
  collapsed: boolean;
  markdown: string;
  mobileVisible: boolean;
  panelsReversed: boolean;
  onSaveNote: (id: string, text: string) => void;
};

export function EditorPanel({
  activeNoteId,
  collapsed,
  markdown,
  mobileVisible,
  panelsReversed,
  onSaveNote,
}: EditorPanelProps) {
  const handleSave = (text: string) => {
    if (activeNoteId) onSaveNote(activeNoteId, text);
  };

  return (
    <section
      id="mobile-panel-note"
      className={`${styles.editor} relative min-h-0 min-w-0 overflow-hidden rounded-none bg-surface backdrop-blur-2xl md:rounded-l-md md:rounded-r-xl ${mobileVisible ? "block" : "hidden"} md:hidden xl:block ${panelsReversed ? "xl:rounded-md" : "xl:rounded-l-md xl:rounded-r-xl"}`}
    >
      <div className={`h-full min-h-0 ${collapsed ? "invisible pointer-events-none" : ""}`}>
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
              markdown={markdown}
              onSave={handleSave}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[#8e8e8e]">
              Your note will appear here.
            </div>
          )}
        </Suspense>
      </div>
    </section>
  );
}
