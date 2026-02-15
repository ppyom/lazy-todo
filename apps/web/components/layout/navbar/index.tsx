'use client';

import { navItems } from '@/lib/routes/nav-items';

import NavItem from './nav-item';

export default function Navbar() {
  return (
    <nav className="flex bg-card">
      {navItems.map((item) => (
        <NavItem key={item.href} {...item} />
      ))}
    </nav>
  );
}
