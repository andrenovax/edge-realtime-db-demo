import { useEffect, useRef, useState } from "react";

const OFFLINE_GRACE_MS = 3_500;

export function useDebouncedOffline(graceMs = OFFLINE_GRACE_MS) {
  const [isOffline, setIsOffline] = useState(false);
  const [isBrowserOnline, setIsBrowserOnline] = useState(() => navigator.onLine);
  const [onlineTransition, setOnlineTransition] = useState(0);
  const offlineShown = useRef(false);

  useEffect(() => {
    let offlineTimer: ReturnType<typeof setTimeout> | undefined;

    const clearOfflineTimer = () => {
      if (offlineTimer) clearTimeout(offlineTimer);
      offlineTimer = undefined;
    };
    const handleOffline = () => {
      clearOfflineTimer();
      setIsBrowserOnline(false);
      offlineTimer = setTimeout(() => {
        if (navigator.onLine) return;
        offlineShown.current = true;
        setIsOffline(true);
      }, graceMs);
    };
    const handleOnline = () => {
      clearOfflineTimer();
      setIsBrowserOnline(true);
      if (offlineShown.current) setOnlineTransition((transition) => transition + 1);
      offlineShown.current = false;
      setIsOffline(false);
    };

    if (!navigator.onLine) handleOffline();
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      clearOfflineTimer();
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return { isOffline, isBrowserOnline, onlineTransition };
}
