'use client';

import { useState } from 'react';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui';
import { DeleteModal } from '@/components/common';

interface Props {
  onDelete: () => void;
}

export default function DeleteAction({ onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const toast = useToast();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    handleClose();
    toast.show('삭제되었습니다 🗑️');
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
