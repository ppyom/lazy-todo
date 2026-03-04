'use client';

import { useEffect, useMemo, useState } from 'react';

import { reviewService } from '@/services/review';
import { dayjs } from '@/lib/dayjs';
import { useDb } from '@/hooks/use-db';
import { useSync } from '@/hooks/use-sync';
import { type Review, ReviewEmoji } from '@/types/review';

/**
 * Review List의 비지니스 로직을 관리하는 커스텀 훅
 * @returns review 관련 상태와 핸들러 객체
 */
export function useReviewList() {
  const db = useDb();
  const { sync, syncStatus } = useSync();
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReview = async () => {
    const result = await reviewService.getAllReview(db);
    setReviewList(result);
    setIsLoading(false);
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
      await reviewService.updateReview(db, { emoji, comment });
    } else {
      await reviewService.createReview(db, { emoji, comment });
    }
    await fetchReview();
    await sync();
  };

  const handleDelete = async (id: string) => {
    await reviewService.deleteReview(db, id);
    await fetchReview();
    await sync();
  };

  useEffect(() => {
    if (syncStatus !== 'success') return;
    (async () => fetchReview())();
  }, [syncStatus]);

  return {
    reviewList: sortedReviewList,
    todayReview,
    isLoading,
    handleSave,
    handleDelete,
  };
}
