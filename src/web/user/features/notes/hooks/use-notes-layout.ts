import { useState } from "react";
import type { MobilePanel } from "../notes.types.ts";

export function useNotesLayout(isOffline: boolean) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>("chat");
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [panelsReversed, setPanelsReversed] = useState(false);
  const [navWidth, setNavWidth] = useState(260);
  const [editorWidth, setEditorWidth] = useState(() =>
    typeof window === "undefined"
      ? 520
      : Math.max(420, Math.round((window.innerWidth - 276) * 0.425)),
  );

  const notePanelCollapsed = !rightPanelOpen && !panelsReversed;
  const chatPanelCollapsed = !rightPanelOpen && panelsReversed;

  const revealNotePanel = () => {
    if (isOffline) {
      setPanelsReversed(true);
      setRightPanelOpen(true);
    }
    setMobilePanel("note");
  };
  const toggleSidebar = () => setSidebarOpen((open) => !open);
  const toggleRightPanel = () => setRightPanelOpen((open) => !open);
  const swapPanels = () => setPanelsReversed((reversed) => !reversed);
  const selectMobilePanel = (panel: MobilePanel) => {
    if (panel === "nav") setSidebarOpen(true);
    setMobilePanel(panel);
  };
  const resizeNav = (delta: number) => {
    setNavWidth((width) => {
      const availableWidth = typeof window === "undefined" ? 1280 : window.innerWidth;
      const editorSpace = availableWidth >= 1280 ? editorWidth + 420 + 16 : 360 + 8;
      const maximum = Math.max(200, Math.min(380, availableWidth - editorSpace));
      return Math.min(maximum, Math.max(200, width + delta));
    });
  };
  const resizeEditor = (delta: number) => {
    setEditorWidth((width) => {
      const availableWidth = typeof window === "undefined" ? 1280 : window.innerWidth;
      const sidebarWidth = sidebarOpen ? navWidth : 48;
      const maximum = Math.max(420, availableWidth - sidebarWidth - 420 - 16);
      return Math.min(maximum, Math.max(420, width - delta));
    });
  };
  const resizeVisibleEditor = (delta: number) => {
    resizeEditor(panelsReversed ? -delta : delta);
  };

  return {
    chatPanelCollapsed,
    editorWidth,
    mobilePanel,
    navWidth,
    notePanelCollapsed,
    panelsReversed,
    resizeNav,
    resizeVisibleEditor,
    revealNotePanel,
    rightPanelOpen,
    selectMobilePanel,
    sidebarOpen,
    swapPanels,
    toggleRightPanel,
    toggleSidebar,
  };
}
