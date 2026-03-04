'use client';

import { useEffect, useRef } from 'react';

/**
 * 컴포넌트가 언마운트되거나 비활성화될 때 활성화 직전의 요소로 포커스를 되돌립니다.
 * @param {boolean} isActive 활성화 상태
 */
export function useFocusRestore(isActive: boolean) {
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isActive) {
      // 컴포넌트가 열릴 때 현재 포커스된 요소를 기억
      previousFocus.current = document.activeElement as HTMLElement;
    } else {
      // 컴포넌트가 닫힐 때 기억해둔 요소로 포커스
      if (previousFocus.current) {
        previousFocus.current.focus();
      }
    }
  }, [isActive]);
}
