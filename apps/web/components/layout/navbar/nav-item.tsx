'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

interface Props {
  icon: LucideIcon;
  title: string;
  href: string;
}

export default function NavItem({ icon, title, href }: Props) {
  const pathname = usePathname();
  const IconComponent = icon;

  return (
    <Link
      href={href}
      className={cn(
        'flex-1 py-3',
        'flex flex-col gap-1 justify-center items-center',
        pathname === href ? 'text-primary' : 'text-foreground/50',
        pathname !== href && 'hover:text-primary/50',
      )}
    >
      <IconComponent size={24} />
      <span className="text-[10px]">{title}</span>
    </Link>
  );
}
