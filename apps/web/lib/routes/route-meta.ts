import type { LucideIcon } from 'lucide-react';
import { CheckLineIcon, FileTextIcon, HouseIcon, UserIcon } from 'lucide-react';

export interface RouteMeta {
  title: string;
  pageTitle?: string;
  icon?: LucideIcon;
  showInNav?: boolean;
}

export const routes = {
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
} satisfies Record<string, RouteMeta>;

export type RoutePath = keyof typeof routes;

export function getRouteMeta(pathname: string): RouteMeta {
  if (!(pathname in routes)) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(`routes에 정의되지 않은 경로입니다. ${pathname}`);
    }
    return routes['/']; // 또는 기본 메타
  }

  return routes[pathname as RoutePath];
}
