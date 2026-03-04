'use client';

import { useMounted } from '@/hooks/use-mounted';
import { useReviewList } from '@/hooks/use-review-list';
import { Skeleton } from '@/components/ui';
import {
  AddReviewAction,
  ReviewEmptyState,
  ReviewList,
} from '@/components/review';

function ReviewSkeleton() {
  return (
    <div className="py-4 h-full flex flex-col gap-4">
      <div className="flex-1 px-4 space-y-2">
        <Skeleton className="h-[88px]" />
        <Skeleton className="h-[88px]" />
        <Skeleton className="h-[88px]" />
      </div>
      <div className="px-4">
        <Skeleton className="h-[52px]" />
      </div>
    </div>
  );
}

export default function ReviewPage() {
  const isMounted = useMounted();
  const { reviewList, todayReview, isLoading, handleSave, handleDelete } =
    useReviewList();

  if (!isMounted || isLoading) {
    return <ReviewSkeleton />;
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
