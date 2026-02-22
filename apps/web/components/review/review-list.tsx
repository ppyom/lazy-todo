import type { Review } from '@/types/review';

import ReviewItem from './review-item';

interface Props {
  reviewList: Review[];
  onDelete: (id: string) => void;
}

export default function ReviewList({ reviewList, onDelete }: Props) {
  return (
    <div className="space-y-2">
      {reviewList.map((review) => (
        <ReviewItem key={review.id} review={review} onDelete={onDelete} />
      ))}
    </div>
  );
}
