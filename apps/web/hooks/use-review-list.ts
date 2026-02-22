'use client';

import { useMemo } from 'react';

import { dayjs } from '@/lib/dayjs';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { type Review, ReviewEmoji } from '@/types/review';

/**
 * Review List의 비지니스 로직을 관리하는 커스텀 훅
 * @returns review 관련 상태와 핸들러 객체
 */
export function useReviewList() {
  const [reviewList, setReviewList] = useLocalStorage<Review[]>('reviews', []);

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

  const handleSave = (emoji: ReviewEmoji, comment: string) => {
    const now = new Date();

    if (todayReview) {
      // 수정
      setReviewList((prev) =>
        prev.map((review) =>
          review.id === todayReview.id
            ? { ...review, emoji, comment, updatedAt: now }
            : review,
        ),
      );
    } else {
      // 작성
      setReviewList((prev) => [
        ...prev,
        { id: Date.now().toString(), emoji, comment, createdAt: now },
      ]);
    }
  };

  const handleDelete = (id: string) => {
    setReviewList((prev) => prev.filter((review) => review.id !== id));
  };

  return {
    reviewList: sortedReviewList,
    todayReview,
    handleSave,
    handleDelete,
  };
}
