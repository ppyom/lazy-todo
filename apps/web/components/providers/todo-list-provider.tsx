'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { todoService } from '@/services/todo';
import { useDb } from '@/hooks/use-db';
import { useSync } from '@/hooks/use-sync';
import { DeferReason, type Todo, TodoStatus } from '@/types/todo';

type TodoListContextValue = {
  todoList: Todo[];
  allTodoList: Todo[];
  isLoading: boolean;
  handleAdd: (content: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleDefer: (id: string, reason: DeferReason) => Promise<void>;
  handleCleanup: (id: string) => Promise<void>;
  handleStatusChange: (
    id: string,
    status: TodoStatus,
    keepDeferCount?: boolean,
  ) => Promise<void>;
  fetchTodo: () => Promise<void>;
};

export const TodoListContext = createContext<TodoListContextValue | null>(null);

export function TodoListProvider({ children }: { children: React.ReactNode }) {
  const db = useDb();
  const { sync, syncStatus } = useSync();
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTodo = useCallback(async () => {
    const result = await todoService.getAllTodo(db);
    setTodoList(result);
    setIsLoading(false);
  }, [db]);

  const sortedTodoList = useMemo<Todo[]>(() => {
    return [...todoList].sort((a, b) => {
      const statusPriority: Record<TodoStatus, number> = {
        [TodoStatus.IN_PROGRESS]: 1,
        [TodoStatus.DEFERRED]: 2,
        [TodoStatus.ARCHIVED]: 3,
        [TodoStatus.COMPLETED]: 4,
      };

      if (statusPriority[a.status] !== statusPriority[b.status]) {
        return statusPriority[a.status] - statusPriority[b.status];
      }

      const dateA = a.updatedAt || a.createdAt || '';
      const dateB = b.updatedAt || b.createdAt || '';
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
    await sync();
  };

  const handleDefer = async (id: string, reason: DeferReason) => {
    await todoService.updateDeferStatus(db, { id, reason });
    await fetchTodo();
    await sync();
  };

  const handleCleanup = async (id: string) => {
    await todoService.updateStatus(db, { id, status: TodoStatus.ARCHIVED });
    await fetchTodo();
    await sync();
  };

  const handleDelete = async (id: string) => {
    await todoService.deleteTodo(db, id);
    await fetchTodo();
    await sync();
  };

  const handleAdd = async (content: string) => {
    await todoService.createTodo(db, { content });
    await fetchTodo();
    await sync();
  };

  useEffect(() => {
    if (syncStatus !== 'success') return;
    (() => fetchTodo())();
  }, [syncStatus, fetchTodo]);

  return (
    <TodoListContext.Provider
      value={{
        todoList: sortedTodoList,
        allTodoList: todoList,
        isLoading,
        handleAdd,
        handleDelete,
        handleDefer,
        handleCleanup,
        handleStatusChange,
        fetchTodo,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
}
