'use client';

import { useMemo } from 'react';
import { CoffeeIcon, SearchXIcon } from 'lucide-react';

import { statusMap } from '@/lib/todo';
import { useMounted } from '@/hooks/use-mounted';
import { useTodoFilter } from '@/hooks/use-todo-filter';
import { useTodoList } from '@/hooks/use-todo-list';
import { Button } from '@/components/ui';
import EmptyState from '@/components/ui/empty-state';
import {
  NewTodoInput,
  SearchTodoInput,
  TodoList,
  TodoStatusFilter,
} from '@/components/todo';

import TodoEmptyState from '../../../components/todo/todo-empty-state';

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
  const { searchQuery, selectedStatus, setFilters, clearFilters } =
    useTodoFilter();

  const filteredTodoList = useMemo(() => {
    return todoList.filter((todo) => {
      const matchedKeyword = todo.content
        .toLowerCase()
        .includes(searchQuery?.toLowerCase() || '');
      const matchedStatus =
        selectedStatus === 'ALL' || todo.status === selectedStatus;
      return matchedKeyword && matchedStatus;
    });
  }, [todoList, searchQuery, selectedStatus]);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className="py-4 h-full flex flex-col gap-4"
      style={{ overflowAnchor: 'none' }}
    >
      <div className="px-4 space-y-2">
        <SearchTodoInput
          defaultValue={searchQuery || undefined}
          onSearch={(keyword) =>
            setFilters({ q: keyword, status: selectedStatus })
          }
        />
        <TodoStatusFilter
          selectedStatus={selectedStatus}
          onStatusChange={(status) =>
            setFilters({ q: searchQuery, status: status || 'ALL' })
          }
        />
      </div>
      <div className="flex-1 px-4 overflow-y-auto">
        {filteredTodoList.length > 0 ? (
          <TodoList
            todos={filteredTodoList}
            onStatusChange={handleStatusChange}
            onDefer={handleDefer}
            onCleanup={handleCleanup}
            onDelete={handleDelete}
          />
        ) : (
          <TodoEmptyState
            selectedStatus={selectedStatus}
            searchQuery={searchQuery}
            onClear={clearFilters}
          />
        )}
      </div>
      <div className="px-4">
        <NewTodoInput
          onAdd={(content) => {
            handleAdd(content);
            clearFilters();
          }}
        />
      </div>
    </div>
  );
}
