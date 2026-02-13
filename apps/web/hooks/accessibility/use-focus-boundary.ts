'use client';

import { useEffect, useRef } from 'react';

/**
 * 지정된 요소 내부에서만 포커스가 이동하도록 제한합니다.
 * @param {boolean} isEnabled 경계 활성화 여부
 * @returns {React.RefObject} 포커스를 가둘 컨테이너의 Ref
 */
export function useFocusBoundary<T extends HTMLElement>(
  isEnabled: boolean,
): React.RefObject<T | null> {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!isEnabled || !containerRef.current) return;

    const container = containerRef.current;

    // 포커스 가능한 모든 요소 선택
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [isEnabled]);

  return containerRef;
}
