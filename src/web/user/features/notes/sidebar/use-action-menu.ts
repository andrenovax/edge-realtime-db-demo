import { useEffect, useRef, useState } from "react";

export function useActionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutsidePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("pointerdown", handleOutsidePointerDown);
    return () => document.removeEventListener("pointerdown", handleOutsidePointerDown);
  }, [isOpen]);

  const closeDropdown = () => setIsOpen(false);
  const toggleDropdown = () => setIsOpen((open) => !open);

  return {
    closeDropdown,
    containerRef,
    isOpen,
    toggleDropdown,
  };
}
