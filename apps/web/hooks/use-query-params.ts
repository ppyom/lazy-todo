'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

/**
 * URL 쿼리 파라미터를 직관적으로 다룰 수 있게 돕는 유틸리티 훅
 * @returns URL 쿼리 조작을 위한 메서드
 * @example
 * const { getQuery, setQueries } = useQueryParams();
 * const searchTerm = getQuery('q');
 * // 쿼리 업데이트
 * setQueries({ q: '검색어', status: 'COMPLETED' });
 * // 특정 쿼리 제거
 * setQueries({ q: null });
 */
export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getQuery = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams],
  );

  const setQueries = useCallback(
    (params: Record<string, string | null | undefined>) => {
      const newParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });

      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return { getQuery, setQueries, searchParams };
}
