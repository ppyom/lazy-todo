'use client';

import { useMemo } from 'react';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { type Todo, TodoStatus } from '@/types/todo';

/**
 * Todo List의 비지니스 로직을 관리하는 커스텀 훅
 * @returns todo 관련 상태와 핸들러 객체
 */
export function useTodoList() {
  const [todoList, setTodoList] = useLocalStorage<Todo[]>('todos', []);
  const sortedTodoList = useMemo<Todo[]>(() => {
    return [...todoList].sort((a, b) => {
      // 1. 상태 우선순위 설정
      const statusPriority: Record<TodoStatus, number> = {
        [TodoStatus.IN_PROGRESS]: 1,
        [TodoStatus.DEFERRED]: 2,
        [TodoStatus.ARCHIVED]: 3,
        [TodoStatus.COMPLETED]: 4,
      };

      // 2. 상태가 다르면 상태 우선순위대로 정렬 (진행중이 가장 위)
      if (statusPriority[a.status] !== statusPriority[b.status]) {
        return statusPriority[a.status] - statusPriority[b.status];
      }

      // 3. 상태가 같으면(예: 둘 다 진행중) 최신순으로 정렬
      // 저장된 날짜 문자열을 숫자로 바꿔서 비교 (더 큰 숫자 = 더 최근 시간)
      const timeA = new Date(a.updatedAt || a.createdAt).getTime();
      const timeB = new Date(b.updatedAt || b.createdAt).getTime();

      return timeB - timeA; // 내림차순 정렬: 최신 아이템이 위로!
    });
  }, [todoList]);

  const handleStatusChange = (id: string, status: Todo['status']) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status, deferReason: undefined, updatedAt: new Date() }
          : item,
      ),
    );
  };
  const handleDefer = (id: string, reason: Todo['deferReason']) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: TodoStatus.DEFERRED,
              deferReason: reason,
              deferCount: item.deferCount + 1,
              updatedAt: new Date(),
            }
          : item,
      ),
    );
  };
  const handleCleanup = (id: string) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: TodoStatus.ARCHIVED,
              deferReason: undefined,
              updatedAt: new Date(),
            }
          : item,
      ),
    );
  };
  const handleDelete = (id: string) => {
    setTodoList((prev) => prev.filter((item) => item.id !== id));
  };
  const handleAdd = (content: string) => {
    setTodoList((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content,
        status: TodoStatus.IN_PROGRESS,
        deferCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  };

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
