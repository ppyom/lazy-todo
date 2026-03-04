'use client';

import { useEffect, useRef } from 'react';

import { dayjs } from '@/lib/dayjs';
import { useTodoList } from '@/hooks/use-todo-list';
import { TodoStatus } from '@/types/todo';

interface Props {
  children: React.ReactNode;
}

export default function TodoRecoveryProvider({ children }: Props) {
  const { todoList, handleStatusChange, fetchTodo } = useTodoList();
  const isChecked = useRef(false);

  useEffect(() => {
    if (todoList.length === 0 || isChecked.current) return;

    const checkAndRecoverTodos = async () => {
      isChecked.current = true;

      const startOfToday = dayjs().startOf('day');
      const expiredTodoList = todoList.filter((todo) => {
        if (todo.status !== TodoStatus.DEFERRED || !todo.updatedAt)
          return false;

        const lastUpdate = dayjs(todo.updatedAt).startOf('day');
        return lastUpdate.isBefore(startOfToday);
      });

      if (expiredTodoList.length > 0) {
        await Promise.all(
          expiredTodoList.map((todo) =>
            handleStatusChange(todo.id, TodoStatus.IN_PROGRESS, true),
          ),
        );
        await fetchTodo();

        console.log(
          `🌅 어제 미룬 ${expiredTodoList.length}개의 할 일을 다시 활성화했어요!`,
        );
      }
    };

    checkAndRecoverTodos();
  }, [todoList, handleStatusChange, fetchTodo]);

  return <>{children}</>;
}
