import { type KeyboardEvent, type PointerEvent, useRef } from "react";

type PanelResizeHandleProps = {
  label: string;
  value: number;
  className: string;
  onResize: (delta: number) => void;
};

export function PanelResizeHandle({ label, value, className, onResize }: PanelResizeHandleProps) {
  const lastX = useRef<number | undefined>(undefined);

  const finishResize = (element: HTMLDivElement, pointerId: number) => {
    if (element.hasPointerCapture(pointerId)) element.releasePointerCapture(pointerId);
    lastX.current = undefined;
    document.body.style.removeProperty("cursor");
    document.body.style.removeProperty("user-select");
  };
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    lastX.current = event.clientX;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId) || lastX.current === undefined)
      return;
    const delta = event.clientX - lastX.current;
    lastX.current = event.clientX;
    onResize(delta);
  };
  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    finishResize(event.currentTarget, event.pointerId);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    onResize(event.key === "ArrowRight" ? 16 : -16);
  };

  return (
    <div
      role="separator"
      aria-label={label}
      aria-orientation="vertical"
      aria-valuemin={200}
      aria-valuemax={900}
      aria-valuenow={Math.round(value)}
      tabIndex={0}
      className={`${className} group/resize relative z-20 cursor-col-resize touch-none items-stretch justify-center outline-none`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
    >
      <span className="w-px bg-transparent transition-colors group-focus/resize:bg-accent/30 group-hover/resize:bg-accent/30" />
    </div>
  );
}
