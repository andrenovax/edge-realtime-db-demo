import { Cloud, WifiOff } from "lucide-react";

export function OfflineIllustration() {
  return (
    <div
      role="img"
      aria-label="Offline"
      className="relative mx-auto flex size-24 items-center justify-center rounded-[2rem] border border-border bg-surface text-muted shadow-lg backdrop-blur-xl"
    >
      <Cloud className="size-12 stroke-[1.35]" />
      <span className="absolute bottom-4 right-3 flex size-9 items-center justify-center rounded-full border-4 border-[#f4f4f4] bg-white text-red-500">
        <WifiOff className="size-5 stroke-[2.2]" />
      </span>
    </div>
  );
}
