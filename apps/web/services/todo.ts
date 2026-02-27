import { eq, sql } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';

import { todo } from '@/db/local/schema';
import type { DbInstance } from '@/types/database';
import { DeferReason, TodoStatus } from '@/types/todo';

export interface CreateTodoParams {
  content: string;
}
export interface UpdateTodoStatusParams {
  id: string;
  status: TodoStatus;
  keepDeferCount?: boolean;
}
export interface DeferTodoParams {
  id: string;
  reason: DeferReason;
}

export const todoService = {
  getAllTodo: (db: DbInstance) => db.select().from(todo),
  createTodo: (db: DbInstance, { content }: CreateTodoParams) =>
    db.insert(todo).values({
      id: uuid(),
      content,
    }),
  updateStatus: (
    db: DbInstance,
    { id, status, keepDeferCount }: UpdateTodoStatusParams,
  ) =>
    db
      .update(todo)
      .set({
        status,
        deferReason: null,
        deferCount: keepDeferCount ? undefined : 0,
      })
      .where(eq(todo.id, id)),
  updateDeferStatus: (db: DbInstance, { id, reason }: DeferTodoParams) =>
    db
      .update(todo)
      .set({
        status: TodoStatus.DEFERRED,
        deferReason: reason,
        deferCount: sql`${todo.deferCount} + 1`,
      })
      .where(eq(todo.id, id)),
  deleteTodo: (db: DbInstance, id: string) =>
    db.delete(todo).where(eq(todo.id, id)),
};
