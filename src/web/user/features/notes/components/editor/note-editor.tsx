import { BlockNoteView } from "@blocknote/ariakit";
import { useCreateBlockNote } from "@blocknote/react";
import { useCallback, useEffect, useRef } from "react";
import styles from "@ui/features/notes/components/editor/note-editor.module.css";

type NoteEditorProps = {
  noteId: string;
  markdown: string;
  onSave: (markdown: string) => void;
};

export function NoteEditor({ noteId, markdown, onSave }: NoteEditorProps) {
  const editor = useCreateBlockNote(
    {
      tables: {
        splitCells: true,
        cellBackgroundColor: true,
        cellTextColor: true,
        headers: true,
      },
    },
    [noteId],
  );
  const applyingExternal = useRef(false);
  const lastEditorMarkdown = useRef<string | undefined>(undefined);
  const onSaveRef = useRef(onSave);
  const pendingSave = useRef(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  onSaveRef.current = onSave;

  const flushPendingSave = useCallback(() => {
    if (!pendingSave.current) return;

    pendingSave.current = false;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = undefined;

    const nextMarkdown = editor.blocksToMarkdownLossy(editor.document);
    if (nextMarkdown === lastEditorMarkdown.current) return;
    lastEditorMarkdown.current = nextMarkdown;
    onSaveRef.current(nextMarkdown);
  }, [editor]);

  useEffect(() => {
    if (markdown === lastEditorMarkdown.current) return;
    flushPendingSave();

    applyingExternal.current = true;
    const blocks = editor.tryParseMarkdownToBlocks(markdown);
    if (blocks.length > 0) editor.replaceBlocks(editor.document, blocks);
    lastEditorMarkdown.current = markdown;
    queueMicrotask(() => {
      applyingExternal.current = false;
    });
  }, [editor, flushPendingSave, markdown]);

  useEffect(() => () => flushPendingSave(), [flushPendingSave]);

  const handleChange = () => {
    if (applyingExternal.current) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    pendingSave.current = true;
    saveTimer.current = setTimeout(flushPendingSave, 250);
  };

  return (
    <div className={`${styles.root} flex h-full min-h-0 flex-col overflow-hidden`}>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <BlockNoteView
          className="min-h-full"
          editor={editor}
          theme="light"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
