'use client';

import { useState } from 'react';

import { Button } from '@/components/ui';
import { type Review, ReviewEmoji } from '@/types/review';

import AddReviewModal from './add-review-modal';

interface Props {
  onSave: (emoji: ReviewEmoji, comment: string) => void;
  initialData?: Review;
}

export default function AddReviewAction({ onSave, initialData }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button className="w-full text-sm" onClick={() => setOpen(true)}>
        ✏️ 기록하기
      </Button>
      <AddReviewModal
        key={initialData?.id || 'new-review'}
        open={open}
        onClose={() => setOpen(false)}
        onSave={onSave}
        initialData={initialData}
      />
    </>
  );
}
