import type { MapDetail } from '@/types/common';
import type { DeferReason, TodoStatus } from '@/types/todo';

const CLEANUP_THRESHOLD = 3;

export const statusMap: Record<TodoStatus, MapDetail> = {
  IN_PROGRESS: { label: '진행중', emoji: '🌱' },
  DEFERRED: { label: '미뤄둠', emoji: '⌛' },
  ARCHIVED: { label: '정리함', emoji: '🧹' },
  COMPLETED: { label: '완료', emoji: '🌟' },
} as const;

export const defferReasonMap: Record<DeferReason, MapDetail> = {
  LOW_ENERGY: { label: '에너지 부족', emoji: '🪫' },
  LACK_OF_TIME: { label: '시간 부족', emoji: '⌛' },
  DISTRACTED: { label: '정신없음', emoji: '🌀' },
  JUST_CANT: { label: '그냥 하기 싫음', emoji: '🫥' },
  OTHER: { label: '다른 이유', emoji: '💬' },
} as const;

/**
 * Task의 Status나 DefferReason을 받아 `emoji + label` 형태의 문자열 반환
 * @param detail 표시할 데이터 객체
 * @returns {string} 변환된 문자열 (ex. "🪫 에너지 부족")
 */
export const getEmojiLabel = (detail: MapDetail): string =>
  `${detail.emoji} ${detail.label}`;

/**
 * 특정 할 일이 정리 대상인지 확인하는 함수
 * @param count 할 일을 미룬 횟수
 * @returns {boolean} 정리 제안 필요 여부
 */
export const isCleanupRequired = (count: number): boolean =>
  count >= CLEANUP_THRESHOLD;
