'use client';

import { motion } from 'motion/react';

import { dayjs } from '@/lib/dayjs';
import { reviewEmojiMap } from '@/lib/review';
import type { Review } from '@/types/review';

import DeleteReviewAction from './delete-review-action';

interface Props {
  review: Review;
  onDelete: (id: string) => void;
}

export default function ReviewItem({ review, onDelete }: Props) {
  const { id, emoji, comment, createdAt } = review;

  return (
    <motion.div
      className="bg-card rounded-2xl p-4 space-y-2"
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        x: -20, // 왼쪽으로 살짝 밀리면서
        height: 0, // 높이가 0이 되어 아래 아이템들이 슥 올라오게 함
        marginTop: 0, // 간격 조절
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        transition: {
          opacity: { duration: 0.2 },
          height: { duration: 0.3, delay: 0.1 }, // 높이는 살짝 나중에 줄어들어야 자연스러움
          x: { duration: 0.2 },
        },
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="inline-flex items-center justify-center size-8 bg-foreground/90 rounded-full select-none"
          title={reviewEmojiMap[emoji].label}
        >
          {reviewEmojiMap[emoji].emoji}
        </span>
        <DeleteReviewAction onDelete={() => onDelete(id)} />
      </div>
      {comment && <p>{comment}</p>}
      <p className="text-muted-foreground text-sm text-right">
        {dayjs(createdAt).format('YYYY-MM-DD')}
      </p>
    </motion.div>
  );
}
