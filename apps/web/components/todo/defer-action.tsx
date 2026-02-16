'use client';

import { useState } from 'react';

import { Button } from '@/components/ui';
import type { DeferReason } from '@/types/todo';

import DeferModal from './defer-modal';

interface Props {
  onReason: (reason: DeferReason) => void;
}

export default function DeferAction({ onReason }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className="text-sm" onClick={() => setOpen(true)}>
        미루기
      </Button>
      <DeferModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={onReason}
      />
    </>
  );
}
