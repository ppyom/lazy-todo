'use client';

import { useState } from 'react';

import { isCleanupRequired } from '@/lib/todo';
import { Button } from '@/components/ui';
import type { DeferReason, Todo } from '@/types/todo';

import CleanupModal from './cleanup-modal';
import DeferModal from './defer-modal';

interface Props {
  todo: Todo;
  onReason: (reason: DeferReason) => void;
  onCleanup: (confirmed: boolean) => void;
}

export default function DeferAction({ todo, onReason, onCleanup }: Props) {
  const [openDeferred, setOpenDeferred] = useState(false);
  const [openCleanup, setOpenCleanup] = useState(false);
  const [pendingReason, setPendingReason] = useState<DeferReason | null>(null);

  const handleSelectReason = (reason: DeferReason) => {
    if (isCleanupRequired(todo.deferCount + 1)) {
      // 3회차 미루기부터
      setPendingReason(reason);
      setOpenCleanup(true);
    } else {
      // 1, 2회차
      onReason(reason);
    }
  };

  const handleCleanup = (confirmed: boolean) => {
    if (confirmed) {
      // 정리
      onCleanup(true);
    } else {
      // 그대로 (미루기)
      if (pendingReason) onReason(pendingReason);
    }
    setPendingReason(null);
  };

  return (
    <>
      <Button className="text-sm" onClick={() => setOpenDeferred(true)}>
        미루기
      </Button>
      <DeferModal
        open={openDeferred}
        onClose={() => setOpenDeferred(false)}
        onSave={handleSelectReason}
      />
      <CleanupModal
        open={openCleanup}
        onClose={() => setOpenCleanup(false)}
        onSave={handleCleanup}
      />
    </>
  );
}
