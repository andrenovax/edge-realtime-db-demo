import { type ChangeEvent, type KeyboardEvent, useRef, useState } from "react";

type UseNoteRenameOptions = {
  id: string;
  title: string;
  onRename: (id: string, title: string) => void;
};

export function useNoteRename({ id, title, onRename }: UseNoteRenameOptions) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameDraft, setRenameDraft] = useState("");
  const cancelRenameRef = useRef(false);

  const startRenaming = () => {
    cancelRenameRef.current = false;
    setRenameDraft(title);
    setIsRenaming(true);
  };
  const handleRenameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRenameDraft(event.target.value);
  };
  const handleRenameBlur = () => {
    setIsRenaming(false);
    if (cancelRenameRef.current) {
      cancelRenameRef.current = false;
      return;
    }
    onRename(id, renameDraft);
  };
  const handleRenameKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.currentTarget.blur();
    } else if (event.key === "Escape") {
      event.preventDefault();
      cancelRenameRef.current = true;
      event.currentTarget.blur();
    }
  };

  return {
    handleRenameBlur,
    handleRenameChange,
    handleRenameKeyDown,
    isRenaming,
    renameDraft,
    startRenaming,
  };
}
