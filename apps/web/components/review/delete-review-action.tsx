'use client';

import { useState } from 'react';
import { Trash2Icon } from 'lucide-react';

import { DeleteModal } from '@/components/common';

interface Props {
  onDelete: () => void;
}

export default function DeleteReviewAction({ onDelete }: Props) {
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
      <button
        className="p-2 rounded-full text-muted-foreground/80 active:bg-secondary/20 active:text-muted-foreground transition-colors duration-300"
        onClick={() => setOpen(true)}
      >
        <Trash2Icon size={16} />
      </button>
      <DeleteModal open={open} onClose={handleClose} onDelete={handleDelete} />
    </>
  );
}
