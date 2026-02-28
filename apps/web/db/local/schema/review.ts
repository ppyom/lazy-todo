import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import type { ReviewEmoji } from '@/types/review';

export const review = sqliteTable('review', {
  id: text('id').primaryKey(),
  emoji: text('emoji').$type<ReviewEmoji>().notNull(),
  comment: text('comment'),
  createdAt: text('created_at')
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%S.000Z', 'now'))`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%S.000Z', 'now'))`)
    .notNull()
    .$onUpdateFn(() => sql`(strftime('%Y-%m-%dT%H:%M:%S.000Z', 'now'))`),
  deletedAt: text('deleted_at'),
  isSynced: integer('is_synced')
    .default(0)
    .$onUpdateFn(() => 0),
});
