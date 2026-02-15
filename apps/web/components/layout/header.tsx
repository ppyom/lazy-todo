'use client';

import { usePathname } from 'next/navigation';

import { getRouteMeta } from '@/lib/routes/route-meta';
import { cn } from '@/lib/utils/cn';

interface Props {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export default function Header({ left, right }: Props) {
  const pathname = usePathname();
  const meta = getRouteMeta(pathname);

  return (
    <header className={cn('p-4 bg-card', 'flex justify-between')}>
      <div className="size-6">{left}</div>
      <h1>{meta.pageTitle || meta.title}</h1>
      <div className="size-6">{right}</div>
    </header>
  );
}
