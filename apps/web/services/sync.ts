import { eq, sql } from 'drizzle-orm';

import { review as localReview, todo as localTodo } from '@/db/local/schema';
import type { DbInstance } from '@/types/database';
import type { Review } from '@/types/review';
import type { Todo } from '@/types/todo';

// ----------------------------------------
// Push: 로컬 → 서버
// ----------------------------------------

const pushTodo = async (db: DbInstance): Promise<void> => {
  // is_synced: 0 인 데이터만 추출
  const unsynced = await db
    .select()
    .from(localTodo)
    .where(eq(localTodo.isSynced, 0));

  if (!unsynced.length) return;

  const res = await fetch('/api/sync/todo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: unsynced }),
  });

  if (!res.ok) throw new Error('Todo Push 실패');

  // 서버 전송 완료 → is_synced: 1 업데이트
  await db
    .update(localTodo)
    .set({ isSynced: 1 })
    .where(eq(localTodo.isSynced, 0));
};

const pushReview = async (db: DbInstance): Promise<void> => {
  const unsynced = await db
    .select()
    .from(localReview)
    .where(eq(localReview.isSynced, 0));

  if (!unsynced.length) return;

  const res = await fetch('/api/sync/review', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: unsynced }),
  });

  if (!res.ok) throw new Error('Review Push 실패');

  await db
    .update(localReview)
    .set({ isSynced: 1 })
    .where(eq(localReview.isSynced, 0));
};

// ----------------------------------------
// Pull: 서버 → 로컬 (Upsert)
// ----------------------------------------

const pullTodo = async (db: DbInstance): Promise<void> => {
  const res = await fetch('/api/sync/todo');
  if (!res.ok) throw new Error('Todo Pull 실패');

  const { items }: { items: Todo[] } = await res.json();
  if (!items.length) return;

  await db
    .insert(localTodo)
    .values(
      items.map((item) => ({
        ...item,
        // 서버의 Date 객체 → 로컬 SQLite text 형식으로 변환
        createdAt: new Date(item.createdAt).toISOString(),
        updatedAt: new Date(item.updatedAt).toISOString(),
        deletedAt: item.deletedAt
          ? new Date(item.deletedAt).toISOString()
          : null,
        isSynced: 1,
      })),
    )
    .onConflictDoUpdate({
      target: localTodo.id,
      // Conflict Resolution: updated_at 기준 최신 데이터 우선
      set: {
        content: sql`excluded.content`,
        status: sql`excluded.status`,
        deferCount: sql`excluded.defer_count`,
        deferReason: sql`excluded.defer_reason`,
        updatedAt: sql`excluded.updated_at`,
        deletedAt: sql`excluded.deleted_at`,
        isSynced: 1,
      },
      setWhere: sql`excluded.updated_at > ${localTodo.updatedAt}`,
    });
};

const pullReview = async (db: DbInstance): Promise<void> => {
  const res = await fetch('/api/sync/review');
  if (!res.ok) throw new Error('Review Pull 실패');

  const { items }: { items: Review[] } = await res.json();
  if (!items.length) return;

  await db
    .insert(localReview)
    .values(
      items.map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt).toISOString(),
        updatedAt: new Date(item.updatedAt).toISOString(),
        deletedAt: item.deletedAt
          ? new Date(item.deletedAt).toISOString()
          : null,
        isSynced: 1,
      })),
    )
    .onConflictDoUpdate({
      target: localReview.id,
      set: {
        emoji: sql`excluded.emoji`,
        comment: sql`excluded.comment`,
        updatedAt: sql`excluded.updated_at`,
        deletedAt: sql`excluded.deleted_at`,
        isSynced: 1,
      },
      setWhere: sql`excluded.updated_at > ${localReview.updatedAt}`,
    });
};

// ----------------------------------------
// sync: push → pull 순서로 실행
// ----------------------------------------

export const syncService = {
  /**
   * Push 후 Pull 순서로 동기화
   * - Push 먼저: 로컬 변경사항을 서버에 반영한 뒤
   * - Pull: 서버 최신 상태를 로컬에 반영 (다른 기기 변경사항 포함)
   */
  sync: async (db: DbInstance): Promise<void> => {
    await pushTodo(db);
    await pushReview(db);
    await pullTodo(db);
    await pullReview(db);
  },
};
