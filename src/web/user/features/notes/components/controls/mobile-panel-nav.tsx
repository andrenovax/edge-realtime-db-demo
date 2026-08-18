import { FileText, MessageCircle, PanelLeft } from "lucide-react";
import type { MobilePanel } from "@ui/features/notes/notes.types.ts";

type MobilePanelNavProps = {
  activePanel: MobilePanel;
  onSelectPanel: (panel: MobilePanel) => void;
};

export function MobilePanelNav({ activePanel, onSelectPanel }: MobilePanelNavProps) {
  return (
    <nav
      aria-label="Mobile panels"
      role="tablist"
      className="absolute bottom-3 left-1/2 z-50 flex -translate-x-1/2 items-center gap-0.5 rounded-2xl border border-border bg-overlay/90 p-1 shadow-xl backdrop-blur-2xl md:hidden"
    >
      <MobilePanelButton
        panel="nav"
        label="Notes"
        activePanel={activePanel}
        onSelect={onSelectPanel}
      />
      <MobilePanelButton
        panel="chat"
        label="Chat"
        activePanel={activePanel}
        onSelect={onSelectPanel}
      />
      <MobilePanelButton
        panel="note"
        label="Note"
        activePanel={activePanel}
        onSelect={onSelectPanel}
      />
    </nav>
  );
}

type MobilePanelButtonProps = {
  activePanel: MobilePanel;
  label: string;
  panel: MobilePanel;
  onSelect: (panel: MobilePanel) => void;
};

function MobilePanelButton({ activePanel, label, panel, onSelect }: MobilePanelButtonProps) {
  const Icon = panel === "nav" ? PanelLeft : panel === "chat" ? MessageCircle : FileText;
  const handleClick = () => onSelect(panel);

  return (
    <button
      type="button"
      role="tab"
      aria-controls={`mobile-panel-${panel}`}
      aria-selected={activePanel === panel}
      aria-label={label}
      title={label}
      onClick={handleClick}
      className={`flex size-10 items-center justify-center rounded-xl transition-colors ${
        activePanel === panel
          ? "bg-accent text-accent-foreground shadow-sm"
          : "text-muted hover:bg-default"
      }`}
    >
      <Icon className="size-[1.125rem]" />
      <span className="sr-only">{label}</span>
    </button>
  );
}
