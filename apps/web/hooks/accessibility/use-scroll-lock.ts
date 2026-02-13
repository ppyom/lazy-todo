'use client';

import { useEffect } from 'react';

/**
 * 특정 조건에 따라 body 스크롤을 활성화/비활성화합니다.
 * @param {boolean} isLocked 스크롤을 막을지 여부
 */
export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLocked]);
}
