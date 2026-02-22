'use client';

import { useState } from 'react';

import { reviewEmojiMap } from '@/lib/review';
import { Button, Input, Modal } from '@/components/ui';
import type { Review, ReviewEmoji } from '@/types/review';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (emotion: ReviewEmoji, content: string) => void;
  initialData?: Review;
}

export default function AddReviewModal({
  open,
  onClose,
  onSave,
  initialData,
}: Props) {
  const [selectedEmotion, setSelectedEmotion] = useState<ReviewEmoji | null>(
    initialData ? initialData.emoji : null,
  );
  const [content, setContent] = useState<string>(initialData?.comment || '');

  const handleReset = () => {
    onClose();
    setSelectedEmotion(initialData ? initialData.emoji : null);
    setContent(initialData?.comment || '');
  };
  const handleSave = () => {
    if (!selectedEmotion) {
      // 오늘의 감정을 선택해주세요.
      return;
    }

    onSave(selectedEmotion, content);
    // 저장되었습니다.
    handleReset();
  };

  return (
    <Modal open={open} onClose={handleReset}>
      <div className="space-y-4">
        <p className="font-bold text-center">오늘은 어땠나요?</p>
        <p>
          기억해두고 싶은 순간을 적어보세요.
          <br />
          이미 작성했다면 해당 기록을 다시 보여드릴게요.
        </p>
        <div className="py-1 overflow-x-auto flex gap-1">
          {Object.keys(reviewEmojiMap).map((key) => {
            const currentKey = key as ReviewEmoji;
            const currentEmotion = reviewEmojiMap[currentKey];
            return (
              <Button
                key={key}
                variant={
                  selectedEmotion === currentKey ? 'default' : 'secondary'
                }
                className="rounded-full shrink-0 duration-100"
                title={currentEmotion.label}
                onClick={() =>
                  setSelectedEmotion(
                    selectedEmotion === currentKey ? null : currentKey,
                  )
                }
              >
                {currentEmotion.emoji}
              </Button>
            );
          })}
        </div>
        <Input
          className="w-full border border-muted"
          placeholder="오늘의 순간을 적어보세요! (선택)"
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
        <div className="flex gap-2">
          <Button
            className="flex-1 text-sm"
            variant="accent"
            onClick={handleSave}
          >
            저장
          </Button>
          <Button
            className="flex-1 text-sm"
            variant="secondary"
            onClick={handleReset}
          >
            취소
          </Button>
        </div>
      </div>
    </Modal>
  );
}
