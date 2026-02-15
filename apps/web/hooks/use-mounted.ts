'use client';

import { useSyncExternalStore } from 'react';

/**
 * 아무것도 구독하지 않는 더미(dummy) 구독 함수
 */
const emptySubscribe = () => () => {};

/**
 * 현재 컴포넌트가 클라이언트 사이드에서 마운트되었는지 여부를 확인합니다.
 * @example
 * const isMounted = useMounted();
 * if (!isMounted) return <Skeleton />;
 * return <ClientOnlyComponent />;
 * @returns {boolean} 마운트되었다면 `true`, 서버 환경이거나 마운트 전이라면 `false`를 반환
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // client
    () => false, // server 에서 false
  );
}
