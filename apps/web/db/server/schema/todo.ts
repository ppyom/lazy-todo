import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { DeferReason, TodoStatus } from '@/types/todo';

import { user } from './user';

export const todo = pgTable('todo', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  status: text('status')
    .$type<TodoStatus>()
    .default(TodoStatus.IN_PROGRESS)
    .notNull(),
  deferCount: integer('defer_count').default(0).notNull(),
  deferReason: text('defer_reason').$type<DeferReason>(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});
