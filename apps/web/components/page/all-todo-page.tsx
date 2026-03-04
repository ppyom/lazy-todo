'use client';

import { useMemo } from 'react';

import { useMounted } from '@/hooks/use-mounted';
import { useTodoFilter } from '@/hooks/use-todo-filter';
import { useTodoList } from '@/hooks/use-todo-list';
import { Skeleton } from '@/components/ui';
import {
  NewTodoInput,
  SearchTodoInput,
  TodoEmptyState,
  TodoList,
  TodoStatusFilter,
} from '@/components/todo';

function AllTodoSkeleton() {
  return (
    <div className="py-4 h-full flex flex-col gap-4">
      <div className="px-4 space-y-2">
        <Skeleton className="h-[48px]" />
        <div className="flex gap-2">
          <Skeleton className="h-[36px] w-16" />
          <Skeleton className="h-[36px] w-16" />
          <Skeleton className="h-[36px] w-16" />
        </div>
      </div>
      <div className="flex-1 px-4 space-y-2">
        <Skeleton className="h-[58px]" />
        <Skeleton className="h-[58px]" />
        <Skeleton className="h-[58px]" />
        <Skeleton className="h-[58px]" />
      </div>
      <div className="px-4">
        <Skeleton className="h-[52px]" />
      </div>
    </div>
  );
}

export default function AllTodoPage() {
  const isMounted = useMounted();
  const {
    todoList,
    isLoading,
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
      const matchedStatus = !selectedStatus || todo.status === selectedStatus;
      return matchedKeyword && matchedStatus;
    });
  }, [todoList, searchQuery, selectedStatus]);

  if (!isMounted || isLoading) {
    return <AllTodoSkeleton />;
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
          onStatusChange={(status) => setFilters({ q: searchQuery, status })}
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
