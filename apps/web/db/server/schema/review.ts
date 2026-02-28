import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { ReviewEmoji } from '@/types/review';

export const review = pgTable('review', {
  id: text('id').primaryKey(),
  emoji: text('emoji').$type<ReviewEmoji>().notNull(),
  comment: text('comment'),
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
