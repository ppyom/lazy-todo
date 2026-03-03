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
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%S.000Z', 'now'))`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%S.000Z', 'now'))`)
    .notNull()
    .$onUpdateFn(() => sql`(strftime('%Y-%m-%dT%H:%M:%S.000Z', 'now'))`),
  deletedAt: text('deleted_at'),
  isSynced: integer('is_synced').default(0),
});
