'use client';

import { Button, Modal } from '@/components/ui';

interface Props {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  message?: string;
  deleteButtonText?: string;
}

export default function DeleteModal({
  open,
  onClose,
  onDelete,
  title = '정말 삭제할까요?',
  message = '이 기록은 영구적으로 사라지며, 다시 복구할 수 없어요.',
  deleteButtonText = '삭제',
}: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <p className="font-bold text-center">{title}</p>
        <p>{message}</p>
        <div className="flex gap-2">
          <Button
            variant="accent"
            className="flex-1 text-sm"
            onClick={onDelete}
          >
            {deleteButtonText}
          </Button>
          <Button
            variant="secondary"
            className="flex-1 text-sm"
            onClick={onClose}
          >
            취소
          </Button>
        </div>
      </div>
    </Modal>
  );
}
