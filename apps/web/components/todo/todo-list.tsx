import type { Todo } from '@/types/todo';

import TodoItem from './todo-item';

interface Props {
  todos: Todo[];

  onStatusChange?: (id: string, status: Todo['status']) => void;
  onDefer?: (id: string, reason: Todo['deferReason']) => void;
  onCleanup?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function TodoList({
  todos,
  onStatusChange,
  onDefer,
  onCleanup,
  onDelete,
}: Props) {
  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          showBadge
          onStatusChange={onStatusChange}
          onDefer={onDefer}
          onCleanup={onCleanup}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
