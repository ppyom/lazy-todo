import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { ReviewEmoji } from '@/types/review';

import { user } from './user';

export const review = pgTable('review', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  emoji: text('emoji').$type<ReviewEmoji>().notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});
