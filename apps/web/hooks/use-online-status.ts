'use client';

import { useSyncExternalStore } from 'react';

const subscribe = (callback: () => void) => {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
};

/**
 * 현재 네트워크 온라인 상태를 반환합니다.
 * @example
 * const isOnline = useOnlineStatus();
 * if (!isOnline) return <OfflineBanner />;
 * @returns {boolean} 온라인이면 `true`, 오프라인이면 `false`
 */
export function useOnlineStatus(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine, // client
    () => true, // server (SSR에서는 온라인으로 가정)
  );
}
