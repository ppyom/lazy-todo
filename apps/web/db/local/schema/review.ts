import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import type { ReviewEmoji } from '@/types/review';

export const review = sqliteTable('review', {
  id: text('id').primaryKey(),
  emoji: text('emoji').$type<ReviewEmoji>().notNull(),
  comment: text('comment'),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  isSynced: integer('is_synced').default(0),
});
