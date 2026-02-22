'use client';

import { useState } from 'react';

import { Button } from '@/components/ui';
import { DeleteModal } from '@/components/common';

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
      <DeleteModal open={open} onClose={handleClose} onDelete={handleDelete} />
    </>
  );
}
