'use client';

import { useState } from 'react';

import { DeleteModal } from '@/components/common';

import MenuItem from './menu-item';

interface Props {
  onReset: () => void;
}

export default function ResetAction({ onReset }: Props) {
  const [open, setOpen] = useState(false);

  const handleReset = () => {
    onReset();
    setOpen(false);
    // 초기화 완료
  };

  return (
    <>
      <MenuItem
        label="데이터 초기화"
        description="이 기기에 저장된 기록이 모두 삭제돼요."
        onClick={() => setOpen(true)}
      />
      <DeleteModal
        open={open}
        title="데이터를 초기화할까요?"
        message="이 기기에 저장된 모든 기록이 삭제되지만 서버에 저장된 기록은 유지돼요."
        onClose={() => setOpen(false)}
        onDelete={handleReset}
      />
    </>
  );
}
