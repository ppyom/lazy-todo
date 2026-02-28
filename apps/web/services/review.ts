import { eq, isNull, sql } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';

import { review } from '@/db/local/schema';
import type { DbInstance } from '@/types/database';
import type { ReviewEmoji } from '@/types/review';

export interface CreateAndUpdateReviewParams {
  emoji: ReviewEmoji;
  comment: string;
}

export const reviewService = {
  getAllReview: (db: DbInstance) =>
    db.select().from(review).where(isNull(review.deletedAt)),
  createReview: (
    db: DbInstance,
    { emoji, comment }: CreateAndUpdateReviewParams,
  ) =>
    db.insert(review).values({
      id: uuid(),
      emoji,
      comment,
    }),
  updateReview: (
    db: DbInstance,
    { emoji, comment }: CreateAndUpdateReviewParams,
  ) =>
    db
      .update(review)
      .set({
        emoji,
        comment,
      })
      .where(eq(sql`date(${review.createdAt})`, sql`date('now', 'localtime')`)),
  deleteReview: (db: DbInstance, id: string) =>
    db
      .update(review)
      .set({ deletedAt: sql`CURRENT_TIMESTAMP`, isSynced: 0 })
      .where(eq(review.id, id)),
};
