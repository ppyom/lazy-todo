'use client';

import { useEffect, useState } from 'react';

import { useToast } from '@/hooks/use-toast';
import { Button, Input, Modal } from '@/components/ui';
import type { Review, ReviewEmoji } from '@/types/review';

import DraggableEmojiList from './draggable-emoji-list';

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
    null,
  );
  const [content, setContent] = useState<string>('');
  const toast = useToast();

  const handleReset = () => {
    onClose();
    setSelectedEmotion(initialData ? initialData.emoji : null);
    setContent(initialData?.comment || '');
  };
  const handleSave = () => {
    if (!selectedEmotion) {
      toast.show('감정을 선택해주세요!');
      return;
    }

    onSave(selectedEmotion, content);
    toast.show('오늘 하루도 기록했어요 ✏️');
    handleReset();
  };

  useEffect(() => {
    const handleSetupInitialData = () => {
      setSelectedEmotion(initialData ? initialData.emoji : null);
      setContent(initialData?.comment || '');
    };
    handleSetupInitialData();
  }, [initialData]);

  return (
    <Modal open={open} onClose={handleReset}>
      <div className="space-y-4">
        <p className="font-bold text-center">오늘은 어땠나요?</p>
        <p>
          기억해두고 싶은 순간을 적어보세요.
          <br />
          이미 작성했다면 해당 기록을 다시 보여드릴게요.
        </p>
        <DraggableEmojiList
          selectedEmotion={selectedEmotion}
          onEmotionClick={(selected) =>
            setSelectedEmotion(selectedEmotion === selected ? null : selected)
          }
        />
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
