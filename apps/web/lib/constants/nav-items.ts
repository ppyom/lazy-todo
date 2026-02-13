import type { LucideIcon } from 'lucide-react';
import { CheckLineIcon, FileTextIcon, HouseIcon, UserIcon } from 'lucide-react';

export interface NavItemType {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItemType[] = [
  { title: '홈', href: '/', icon: HouseIcon },
  { title: 'Todo', href: '/todo', icon: CheckLineIcon },
  { title: '기록', href: '/review', icon: FileTextIcon },
  { title: 'My', href: '/my', icon: UserIcon },
];
