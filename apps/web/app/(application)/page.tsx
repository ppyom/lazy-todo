'use client';

import { useMounted } from '@/hooks/use-mounted';
import { useTodoList } from '@/hooks/use-todo-list';
import { NewTodoInput, TodoEmptyState, TodoList } from '@/components/todo';
import { TodoStatus } from '@/types/todo';

export default function Page() {
  const isMounted = useMounted();
  const {
    todoList,
    handleAdd,
    handleDelete,
    handleDefer,
    handleCleanup,
    handleStatusChange,
  } = useTodoList();
  const inProgressTodoList = todoList.filter(
    (t) => t.status === TodoStatus.IN_PROGRESS,
  );

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className="py-4 h-full flex flex-col gap-4"
      style={{ overflowAnchor: 'none' }}
    >
      <div className="flex-1 px-4 overflow-y-auto">
        {inProgressTodoList.length > 0 ? (
          <TodoList
            todos={inProgressTodoList}
            onStatusChange={handleStatusChange}
            onDefer={handleDefer}
            onCleanup={handleCleanup}
            onDelete={handleDelete}
          />
        ) : (
          <TodoEmptyState />
        )}
      </div>
      <div className="px-4">
        <NewTodoInput onAdd={handleAdd} />
      </div>
    </div>
  );
}
