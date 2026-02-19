'use client';

import { useState } from 'react';

import { Button, Modal } from '@/components/ui';

import ModalOptionButton from './modal-option-button';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (confirmed: boolean) => void;
  title?: string;
}

export default function CleanupModal({
  open,
  onClose,
  onSave,
  title = '3번 이상 미뤄졌어요.',
}: Props) {
  const [confirmed, setConfirmed] = useState<boolean | null>(null);

  const handleReset = () => {
    onClose();
    setConfirmed(null);
  };

  const handleSave = () => {
    if (confirmed === null) {
      // 이유를 선택해주세요!
      return;
    }

    onSave(confirmed);
    // 저장되었습니다.
    handleReset();
  };

  return (
    <Modal open={open} onClose={handleReset}>
      <div className="flex flex-col gap-4">
        <p className="font-bold text-center">{title}</p>
        <p>정말 해야 하는 일인지, 한 번만 더 생각해볼까요?</p>
        <div className="space-y-2 p-2 bg-background rounded-2xl">
          <ModalOptionButton
            emoji="🧸"
            label="그대로 둘게요"
            onClick={() => setConfirmed(false)}
            active={confirmed === false}
          />
          <ModalOptionButton
            emoji="🧹️"
            label="정리할게요"
            onClick={() => setConfirmed(true)}
            active={confirmed === true}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="accent"
            className="flex-1 text-sm"
            onClick={handleSave}
          >
            저장
          </Button>
          <Button
            variant="secondary"
            className="flex-1 text-sm"
            onClick={handleReset}
          >
            취소
          </Button>
        </div>
      </div>
    </Modal>
  );
}
