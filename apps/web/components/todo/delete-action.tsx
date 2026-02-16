'use client';

import { useState } from 'react';

import { Button, Modal } from '@/components/ui';

interface Props {
  onDelete: () => void;
}

export default function DeleteAction({ onDelete }: Props) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    handleClose();
  };

  return (
    <>
      <Button className="text-sm" onClick={() => setOpen(true)}>
        삭제
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-center">정말 삭제할까요?</p>
          <p>이 기록은 영구적으로 사라지며, 다시 복구할 수 없어요.</p>
          <div className="flex gap-2">
            <Button
              variant="accent"
              className="flex-1 text-sm"
              onClick={handleDelete}
            >
              삭제
            </Button>
            <Button
              variant="secondary"
              className="flex-1 text-sm"
              onClick={handleClose}
            >
              취소
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
