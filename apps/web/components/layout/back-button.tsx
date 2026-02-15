'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();
  return (
    <button className="cursor-pointer" onClick={router.back}>
      <ArrowLeftIcon />
    </button>
  );
}
