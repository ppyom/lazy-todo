'use client';

import { useEffect, useMemo, useState } from 'react';
import { eq, sql } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';

import { dayjs } from '@/lib/dayjs';
import { useDb } from '@/components/providers/database-provider';
import { review } from '@/db/local/schema';
import { ReviewEmoji } from '@/types/review';

/**
 * Review List의 비지니스 로직을 관리하는 커스텀 훅
 * @returns review 관련 상태와 핸들러 객체
 */
export function useReviewList() {
  const db = useDb();
  const [reviewList, setReviewList] = useState<(typeof review.$inferSelect)[]>(
    [],
  );

  const fetchReview = async () => {
    const result = await db.select().from(review);
    setReviewList(result);
  };

  const sortedReviewList = useMemo(() => {
    return [...reviewList].sort(
      (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf(),
    );
  }, [reviewList]);

  const todayReview = useMemo(() => {
    return reviewList.find((review) =>
      dayjs().isSame(dayjs(review.createdAt), 'day'),
    );
  }, [reviewList]);

  const handleSave = async (emoji: ReviewEmoji, comment: string) => {
    if (todayReview) {
      // 수정
      await db
        .update(review)
        .set({
          emoji,
          comment,
        })
        .where(
          eq(sql`date(${review.createdAt})`, sql`date('now', 'localtime')`),
        );
    } else {
      // 작성
      await db.insert(review).values({
        id: uuid(),
        emoji,
        comment,
      });
    }
    await fetchReview();
  };

  const handleDelete = async (id: string) => {
    await db.delete(review).where(eq(review.id, id));
    await fetchReview();
  };

  useEffect(() => {
    (async () => fetchReview())();
  }, []);

  return {
    reviewList: sortedReviewList,
    todayReview,
    handleSave,
    handleDelete,
  };
}
