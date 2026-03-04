'use client';

import { useEffect } from 'react';

/**
 * `Esc`가 눌렸을 때 실행할 핸들러를 등록합니다.
 * @param {() => void} onKeyDown 키가 눌렸을 때 실행할 콜백 함수
 * @param {boolean} isEnabled 리스너 활성화 여부
 */
export function useEscapeKey(onKeyDown: () => void, isEnabled: boolean = true) {
  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onKeyDown();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEnabled, onKeyDown]);
}
