'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';

import { syncService } from '@/services/sync';
import { useDb } from '@/hooks/use-db';
import { useOnlineStatus } from '@/hooks/use-online-status';

export type SyncStatus = 'idle' | 'syncing' | 'success' | 'error';

/**
 * 동기화 상태를 관리하고 트리거를 제공하는 훅
 * - 로그인한 유저만 동기화 실행
 * - 최초 로그인 시 모든 로컬 데이터 isSynced: 0으로 초기화 후 전체 Push
 * - 트리거 1: 데이터 변경 직후 (sync 함수를 직접 호출)
 * - 트리거 2: 네트워크 복구 시 (온라인 전환 감지 → 자동 실행)
 * @example
 * const { sync, syncStatus } = useSync();
 * // 데이터 변경 후 동기화
 * await handleAdd(content);
 * sync();
 * @returns sync 함수와 현재 동기화 상태
 */
export function useSync() {
  const db = useDb();
  const { status } = useSession();
  const isOnline = useOnlineStatus();
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const prevIsOnline = useRef<boolean>(isOnline);
  const hasInitialized = useRef(false);

  const sync = useCallback(async () => {
    if (status !== 'authenticated') return; // 로그인하지 않은 유저는 동기화 스킵
    if (!isOnline) return;
    if (syncStatus === 'syncing') return;

    try {
      setSyncStatus('syncing');
      await syncService.sync(db);
      setSyncStatus('success');
    } catch (error) {
      console.error('❌ 동기화 실패:', error);
      setSyncStatus('error');
    } finally {
      // 3초 후 idle로 복귀
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  }, [db, status, isOnline, syncStatus]);

  // 최초 로그인 시 모든 로컬 데이터 isSynced: 0으로 초기화 후 전체 Push
  useEffect(() => {
    if (status !== 'authenticated' || hasInitialized.current) return;

    hasInitialized.current = true;

    const initialize = async () => {
      await sync();
    };

    initialize();
  }, [status]);

  // 트리거 2: 오프라인 → 온라인 전환 시 자동 동기화
  useEffect(() => {
    const wasOffline = !prevIsOnline.current;

    if (wasOffline && isOnline) {
      sync();
    }

    prevIsOnline.current = isOnline;
  }, [isOnline]);

  return { sync, syncStatus, isOnline };
}
