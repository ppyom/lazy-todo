'use client';

import { useQueryParams } from '@/hooks/use-query-params';
import type { TodoStatus } from '@/types/todo';

/**
 * Todo 도메인 전용 필터링 및 검색 상태를 관리하는 커스텀 훅
 * @returns 할 일 필터 관련 상태 및 제어 함수
 * @example
 * const { searchQuery, selectedStatus, setFilters } = useTodoFilter();
 * // 검색어 변경 시
 * setFilters({ q: '공부' });
 * // 상태 변경 시
 * setFilters({ status: TodoStatus.IN_PROGRESS });
 */
export function useTodoFilter() {
  const { getQuery, setQueries } = useQueryParams();

  return {
    searchQuery: getQuery('q'),
    selectedStatus: (getQuery('status') as TodoStatus | 'ALL') || 'ALL',
    /**
     * 특정 필터 항목을 선택적으로 업데이트합니다.
     * @param {Object} params - 업데이트할 필터 항목
     * @param {string | null} [params.q] - 검색어
     * @param {TodoStatus | 'ALL' | null} [params.status] - 할 일 상태
     */
    setFilters: ({
      q,
      status,
    }: {
      q?: string | null;
      status?: TodoStatus | 'ALL' | null;
    }) => setQueries({ q, status }),
    clearFilters: () => setQueries({ q: null, status: null }),
  };
}
