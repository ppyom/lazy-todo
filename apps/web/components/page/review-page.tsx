'use client';

import { useMounted } from '@/hooks/use-mounted';
import { useReviewList } from '@/hooks/use-review-list';
import {
  AddReviewAction,
  ReviewEmptyState,
  ReviewList,
} from '@/components/review';

export default function ReviewPage() {
  const isMounted = useMounted();
  const { reviewList, todayReview, handleSave, handleDelete } = useReviewList();

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className="py-4 h-full flex flex-col gap-4"
      style={{ overflowAnchor: 'none' }}
    >
      <div className="px-4 flex-1 overflow-y-auto">
        {reviewList.length > 0 ? (
          <ReviewList reviewList={reviewList} onDelete={handleDelete} />
        ) : (
          <ReviewEmptyState />
        )}
      </div>
      <div className="px-4">
        <AddReviewAction onSave={handleSave} initialData={todayReview} />
      </div>
    </div>
  );
}
