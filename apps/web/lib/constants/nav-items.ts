import { routes } from '@/lib/constants/route-meta';

export const navItems = Object.entries(routes)
  .filter(([, value]) => value.showInNav)
  .map(([href, value]) => ({ href, ...value }));
