'use client';

import { useSyncExternalStore } from 'react';

function subscribe() {
  return () => {};
}

export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true, // client
    () => false, // server 에서 false
  );
}
