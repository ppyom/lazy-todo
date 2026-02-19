'use client';

import { useMounted } from '@/hooks/use-mounted';
import { useTodoList } from '@/hooks/use-todo-list';
import { NewTodoInput, TodoList } from '@/components/todo';
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
      className="relative p-4 h-full flex flex-col gap-4 overflow-y-auto"
      style={{ overflowAnchor: 'none' }}
    >
      <div className="flex-1">
        <TodoList
          todos={inProgressTodoList}
          onStatusChange={handleStatusChange}
          onDefer={handleDefer}
          onCleanup={handleCleanup}
          onDelete={handleDelete}
        />
      </div>
      <div className="sticky bottom-0 left-4 right-4">
        <NewTodoInput onAdd={handleAdd} />
      </div>
    </div>
  );
}
