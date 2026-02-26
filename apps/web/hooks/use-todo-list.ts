'use client';

import { useEffect, useMemo, useState } from 'react';
import { eq, sql } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';

import { useDb } from '@/components/providers/database-provider';
import { todo } from '@/db/local/schema';
import { type Todo, TodoStatus } from '@/types/todo';

/**
 * Todo List의 비지니스 로직을 관리하는 커스텀 훅
 * @returns todo 관련 상태와 핸들러 객체
 */
export function useTodoList() {
  const db = useDb();
  const [todoList, setTodoList] = useState<(typeof todo.$inferSelect)[]>([]);

  const fetchTodo = async () => {
    const result = await db.select().from(todo);
    setTodoList(result);
  };

  const sortedTodoList = useMemo<(typeof todo.$inferSelect)[]>(() => {
    return [...todoList].sort((a, b) => {
      // 1. 상태 우선순위
      const statusPriority: Record<TodoStatus, number> = {
        [TodoStatus.IN_PROGRESS]: 1,
        [TodoStatus.DEFERRED]: 2,
        [TodoStatus.ARCHIVED]: 3,
        [TodoStatus.COMPLETED]: 4,
      };

      // 2. 상태 우선순위가 다르면 즉시 반환
      if (statusPriority[a.status] !== statusPriority[b.status]) {
        return statusPriority[a.status] - statusPriority[b.status];
      }

      // 3. 상태가 같을 때: 날짜 비교
      const dateA = a.updatedAt || a.createdAt || '';
      const dateB = b.updatedAt || b.createdAt || '';

      // 내림차순 (최신순): B가 A보다 크면(최신이면) 앞으로 보냄
      return dateB.localeCompare(dateA);
    });
  }, [todoList]);

  const handleStatusChange = async (id: string, status: Todo['status']) => {
    await db
      .update(todo)
      .set({
        status,
        deferReason: null,
        deferCount: 0,
      })
      .where(eq(todo.id, id));
    await fetchTodo();
  };
  const handleDefer = async (id: string, reason: Todo['deferReason']) => {
    await db
      .update(todo)
      .set({
        status: TodoStatus.DEFERRED,
        deferReason: reason,
        deferCount: sql`${todo.deferCount} + 1`,
      })
      .where(eq(todo.id, id));
    await fetchTodo();
  };
  const handleCleanup = async (id: string) => {
    await db
      .update(todo)
      .set({
        status: TodoStatus.ARCHIVED,
        deferReason: null,
        deferCount: 0,
      })
      .where(eq(todo.id, id));
    await fetchTodo();
  };
  const handleDelete = async (id: string) => {
    await db.delete(todo).where(eq(todo.id, id));
    await fetchTodo();
  };
  const handleAdd = async (content: string) => {
    await db.insert(todo).values({
      id: uuid(),
      content,
    });
    await fetchTodo();
  };

  useEffect(() => {
    (async () => fetchTodo())();
  }, []);

  return {
    todoList: sortedTodoList,
    allTodoList: todoList,
    handleAdd,
    handleDelete,
    handleDefer,
    handleCleanup,
    handleStatusChange,
  };
}
