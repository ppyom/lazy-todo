import type { LucideIcon } from 'lucide-react';
import { CheckLineIcon, FileTextIcon, HouseIcon, UserIcon } from 'lucide-react';

export interface RouteMeta {
  title: string;
  pageTitle?: string;
  icon?: LucideIcon;
  showInNav?: boolean;
}

export const routes: Record<string, RouteMeta> = {
  '/': {
    title: '홈',
    pageTitle: '오늘의 할 일',
    icon: HouseIcon,
    showInNav: true,
  },
  '/todo': {
    title: 'Todo',
    pageTitle: '전체 할 일',
    icon: CheckLineIcon,
    showInNav: true,
  },
  '/review': { title: '기록', icon: FileTextIcon, showInNav: true },
  '/my': {
    title: 'My',
    pageTitle: '마이 페이지',
    icon: UserIcon,
    showInNav: true,
  },
  '/login': {
    title: '로그인',
  },
  '/signup': {
    title: '회원가입',
  },
};
