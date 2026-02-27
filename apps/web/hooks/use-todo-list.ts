'use client';

import { useEffect, useMemo, useState } from 'react';

import { todoService } from '@/services/todo';
import { useDb } from '@/components/providers/database-provider';
import { DeferReason, type Todo, TodoStatus } from '@/types/todo';

/**
 * Todo List의 비지니스 로직을 관리하는 커스텀 훅
 * @returns todo 관련 상태와 핸들러 객체
 */
export function useTodoList() {
  const db = useDb();
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const fetchTodo = async () => {
    const result = await todoService.getAllTodo(db);
    setTodoList(result);
  };

  const sortedTodoList = useMemo<Todo[]>(() => {
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

  const handleStatusChange = async (
    id: string,
    status: TodoStatus,
    keepDeferCount?: boolean,
  ) => {
    await todoService.updateStatus(db, { id, status, keepDeferCount });
    await fetchTodo();
  };
  const handleDefer = async (id: string, reason: DeferReason) => {
    await todoService.updateDeferStatus(db, { id, reason });
    await fetchTodo();
  };
  const handleCleanup = async (id: string) => {
    await todoService.updateStatus(db, { id, status: TodoStatus.ARCHIVED });
    await fetchTodo();
  };
  const handleDelete = async (id: string) => {
    await todoService.deleteTodo(db, id);
    await fetchTodo();
  };
  const handleAdd = async (content: string) => {
    await todoService.createTodo(db, { content });
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
