'use client';

import { useState } from 'react';

import { defferReasonMap } from '@/lib/todo';
import { Button, Modal } from '@/components/ui';
import type { DeferReason } from '@/types/todo';

import ModalOptionButton from './modal-option-button';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (reason: DeferReason) => void;
}

export default function DeferModal({ open, onClose, onSave }: Props) {
  const [selectedReason, setSelectedReason] = useState<DeferReason | null>(
    null,
  );
  const handleReset = () => {
    onClose();
    setSelectedReason(null);
  };

  const handleSave = () => {
    if (!selectedReason) {
      // 이유를 선택해주세요!
      return;
    }

    onSave(selectedReason);
    // 저장되었습니다.
    handleReset();
  };

  return (
    <Modal open={open} onClose={handleReset}>
      <div className="flex flex-col gap-4">
        <p className="font-bold text-center">이건 조금 미뤄둘게요.</p>
        <p>왜 그런지 살짝만 알려주세요.</p>
        <div className="space-y-2 p-2 bg-background rounded-2xl">
          {Object.entries(defferReasonMap).map(([key, value]) => (
            <ModalOptionButton
              key={key}
              emoji={value.emoji}
              label={value.label}
              onClick={() => setSelectedReason(key as DeferReason)}
              active={selectedReason === key}
            />
          ))}
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
