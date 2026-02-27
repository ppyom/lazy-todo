'use client';

import { useContext } from 'react';

import { DatabaseContext } from '@/components/providers/database-provider';
import type { DbInstance } from '@/types/database';

/**
 * 로컬 SQLite DB 인스턴스를 반환하는 훅
 * @example
 * const db = useDb();
 * const todos = await todoService.getAllTodo(db);
 * @returns {DbInstance} Drizzle DB 인스턴스
 */
export function useDb(): DbInstance {
  const context = useContext(DatabaseContext);
  if (!context) throw new Error('useDb must be used within a DatabaseProvider');
  return context;
}
