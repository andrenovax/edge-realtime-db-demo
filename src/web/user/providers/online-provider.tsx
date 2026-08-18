import { createStoreContext, useCreateStore, useSelector, type Store } from "@tanstack/react-store";
import { type PropsWithChildren, useEffect, useRef } from "react";

const OFFLINE_GRACE_MS = 3_500;

type OnlineState = {
  isBrowserOnline: boolean;
  isOffline: boolean;
  onlineTransition: number;
};

const { StoreProvider: OnlineStoreProvider, useStoreContext: useOnlineStore } =
  createStoreContext<Store<OnlineState>>();

export function OnlineProvider({ children }: PropsWithChildren) {
  const store = useCreateStore<OnlineState>({
    isBrowserOnline: navigator.onLine,
    isOffline: false,
    onlineTransition: 0,
  });
  const offlineShown = useRef(false);

  useEffect(() => {
    let offlineTimer: ReturnType<typeof setTimeout> | undefined;

    const clearOfflineTimer = () => {
      if (offlineTimer) clearTimeout(offlineTimer);
      offlineTimer = undefined;
    };
    const handleOffline = () => {
      clearOfflineTimer();
      store.setState((state) => ({ ...state, isBrowserOnline: false }));
      offlineTimer = setTimeout(() => {
        if (navigator.onLine) return;
        offlineShown.current = true;
        store.setState((state) => ({ ...state, isOffline: true }));
      }, OFFLINE_GRACE_MS);
    };
    const handleOnline = () => {
      clearOfflineTimer();
      store.setState((state) => ({
        ...state,
        isBrowserOnline: true,
        isOffline: false,
        onlineTransition: offlineShown.current
          ? state.onlineTransition + 1
          : state.onlineTransition,
      }));
      offlineShown.current = false;
    };

    if (!navigator.onLine) handleOffline();
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      clearOfflineTimer();
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [store]);

  return <OnlineStoreProvider value={store}>{children}</OnlineStoreProvider>;
}

export function useOnline() {
  return useSelector(useOnlineStore(), (state) => !state.isOffline);
}

export function useOnlineState() {
  return useSelector(useOnlineStore());
}
