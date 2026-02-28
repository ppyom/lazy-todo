import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { DeferReason, TodoStatus } from '@/types/todo';

export const todo = pgTable('todo', {
  id: text('id').primaryKey(),
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
  // 추후 인증 도입 시 활성화
  // userId: text('user_id').notNull(),
});
