import { BlockNoteView } from "@blocknote/ariakit";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect, useRef } from "react";
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
  const saveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (markdown === lastEditorMarkdown.current) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);

    applyingExternal.current = true;
    const blocks = editor.tryParseMarkdownToBlocks(markdown);
    if (blocks.length > 0) editor.replaceBlocks(editor.document, blocks);
    lastEditorMarkdown.current = markdown;
    queueMicrotask(() => {
      applyingExternal.current = false;
    });
  }, [editor, markdown]);

  useEffect(
    () => () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    },
    [],
  );

  const handleChange = () => {
    if (applyingExternal.current) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const nextMarkdown = editor.blocksToMarkdownLossy(editor.document);
      if (nextMarkdown === lastEditorMarkdown.current) return;
      lastEditorMarkdown.current = nextMarkdown;
      onSave(nextMarkdown);
    }, 250);
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
