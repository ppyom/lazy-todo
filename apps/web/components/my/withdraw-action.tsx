'use client';

import { useState } from 'react';

import { DeleteModal } from '@/components/common';

import MenuItem from './menu-item';

interface Props {
  onWithdraw: () => void;
  disabled?: boolean;
}

export default function WithdrawAction({ onWithdraw, disabled }: Props) {
  const [open, setOpen] = useState(false);

  const handleWithdraw = () => {
    onWithdraw();
    setOpen(false);
  };

  return (
    <>
      <MenuItem
        label="회원탈퇴"
        description="탈퇴 시 서버에 저장된 모든 기록이 완전히 삭제돼요."
        onClick={() => setOpen(true)}
        disabled={disabled}
      />
      <DeleteModal
        open={open}
        title="정말 탈퇴할까요?"
        message="탈퇴 시 서버에 저장된 모든 기록이 완전히 삭제되며 복구할 수 없어요."
        onClose={() => setOpen(false)}
        onDelete={handleWithdraw}
        deleteButtonText="탈퇴"
      />
    </>
  );
}
