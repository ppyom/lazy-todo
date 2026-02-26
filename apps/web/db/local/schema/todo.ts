import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { DeferReason, TodoStatus } from '@/types/todo';

export const todo = sqliteTable('todo', {
  id: text('id').primaryKey(),
  content: text('content').notNull(),
  status: text('status')
    .$type<TodoStatus>()
    .default(TodoStatus.IN_PROGRESS)
    .notNull(),
  deferCount: integer('defer_count').default(0).notNull(),
  deferReason: text('defer_reason').$type<DeferReason>(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  isSynced: integer('is_synced').default(0),
});
