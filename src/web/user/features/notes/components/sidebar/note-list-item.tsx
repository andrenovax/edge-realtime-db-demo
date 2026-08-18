import type { NoteStatus } from "@db/constants";
import type { NoteEventArgs } from "@db/livestore";
import { Archive, Ellipsis, Pencil, Trash2 } from "lucide-react";
import { useNoteRename } from "@ui/features/notes/components/sidebar/use-note-rename.ts";
import { useActionMenu } from "@ui/hooks/use-action-menu.ts";

export function getNoteTitle(note: Pick<NoteEventArgs, "title">) {
  return note.title || "Untitled note";
}

type NoteListItemProps = {
  note: NoteEventArgs;
  selected: boolean;
  onOpen: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onStatusChange: (id: string, status: NoteStatus) => void;
};

export function NoteListItem({
  note,
  selected,
  onOpen,
  onRename,
  onStatusChange,
}: NoteListItemProps) {
  const title = getNoteTitle(note);
  const {
    closeDropdown,
    containerRef: actionsRef,
    isOpen: actionsOpen,
    toggleDropdown: handleToggleActions,
  } = useActionMenu();

  const {
    handleRenameBlur,
    handleRenameChange,
    handleRenameKeyDown,
    isRenaming: renaming,
    renameDraft,
    startRenaming,
  } = useNoteRename({ id: note.id, title, onRename });

  const handleStartRename = () => {
    startRenaming();
    closeDropdown();
  };

  const handleOpen = () => onOpen(note.id);
  const handleArchive = () => onStatusChange(note.id, "archived");
  const handleDelete = () => onStatusChange(note.id, "deleted");

  return (
    <div
      ref={actionsRef}
      className={`group/note relative flex h-9 items-center rounded-xl text-sm hover:bg-default/60 ${
        selected ? "bg-accent/10 font-medium text-accent" : ""
      }`}
    >
      {renaming ? (
        <input
          autoFocus
          aria-label="Rename note"
          className="mx-2 min-w-0 flex-1 rounded border border-[#bdbdbd] bg-white px-1.5 py-0.5 text-sm font-normal outline-none focus:border-[#777]"
          value={renameDraft}
          onChange={handleRenameChange}
          onBlur={handleRenameBlur}
          onKeyDown={handleRenameKeyDown}
        />
      ) : (
        <button
          type="button"
          onClick={handleOpen}
          className="min-w-0 flex-1 truncate self-stretch pl-3 pr-1 text-left"
        >
          {title}
        </button>
      )}

      {!renaming && (
        <button
          type="button"
          aria-label={`Actions for ${title}`}
          title="Note actions"
          onClick={handleToggleActions}
          className={`mr-1 flex size-7 shrink-0 items-center justify-center rounded-md hover:bg-black/[0.07] ${
            selected || actionsOpen
              ? "opacity-100"
              : "opacity-0 group-hover/note:opacity-100 focus:opacity-100"
          }`}
        >
          <Ellipsis className="size-4" />
        </button>
      )}

      {actionsOpen && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.25rem)] z-40 w-40 rounded-xl border border-border bg-overlay p-1.5 font-normal shadow-xl backdrop-blur-xl"
        >
          <button
            type="button"
            role="menuitem"
            onClick={handleStartRename}
            className="flex h-9 w-full items-center gap-2.5 rounded-lg px-2.5 text-left text-sm hover:bg-[#f2f2f2]"
          >
            <Pencil className="size-4" /> Rename
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={handleArchive}
            className="flex h-9 w-full items-center gap-2.5 rounded-lg px-2.5 text-left text-sm hover:bg-[#f2f2f2]"
          >
            <Archive className="size-4" /> Archive
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={handleDelete}
            className="flex h-9 w-full items-center gap-2.5 rounded-lg px-2.5 text-left text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 className="size-4" /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
