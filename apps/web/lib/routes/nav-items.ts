import type { LucideIcon } from 'lucide-react';

import { type RouteMeta, routes } from '@/lib/routes/route-meta';

interface NavItemType extends RouteMeta {
  icon: LucideIcon;
  showInNav: true;
}

function isNavRoute(
  entry: [string, RouteMeta],
): entry is [string, NavItemType] {
  return !!entry[1].showInNav;
}

export const navItems = Object.entries(routes)
  .filter(isNavRoute)
  .map(([href, value]) => ({ href, title: value.title, icon: value.icon }));
