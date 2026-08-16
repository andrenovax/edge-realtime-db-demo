import { ArrowLeftRight, PanelRightClose, PanelRightOpen } from "lucide-react";

type WorkspaceControlsProps = {
  isOffline: boolean;
  rightPanelOpen: boolean;
  onSwapPanels: () => void;
  onToggleRightPanel: () => void;
};

export function WorkspaceControls({
  isOffline,
  rightPanelOpen,
  onSwapPanels,
  onToggleRightPanel,
}: WorkspaceControlsProps) {
  return (
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
          onClick={onSwapPanels}
          className="flex size-8 items-center justify-center rounded-lg text-muted hover:bg-default"
        >
          <ArrowLeftRight className="size-4" />
        </button>
      )}
      <button
        type="button"
        aria-label={rightPanelOpen ? "Collapse right panel" : "Expand right panel"}
        title={rightPanelOpen ? "Collapse right panel" : "Expand right panel"}
        onClick={onToggleRightPanel}
        className="flex size-8 items-center justify-center rounded-lg text-muted hover:bg-default"
      >
        {rightPanelOpen ? (
          <PanelRightClose className="size-4" />
        ) : (
          <PanelRightOpen className="size-4" />
        )}
      </button>
    </div>
  );
}
