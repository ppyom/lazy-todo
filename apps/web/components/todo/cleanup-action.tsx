'use client';

import { useState } from 'react';

import { Button } from '@/components/ui';

import CleanupModal from './cleanup-modal';

interface Props {
  onConfirm: (confirmed: boolean) => void;
}

export default function CleanupAction({ onConfirm }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className="text-sm" onClick={() => setOpen(true)}>
        정리
      </Button>
      <CleanupModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={onConfirm}
        title="잠시 잊고 지내도 괜찮아요."
      />
    </>
  );
}
