'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BedDouble, CalendarDays, Users, UtensilsCrossed, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/rooms', label: 'Rooms', icon: BedDouble },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarDays },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/food', label: 'Food Menu', icon: UtensilsCrossed },
  { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar__header">
        {!collapsed && (
          <Link href="/" className="sidebar__brand">
            <span className="sidebar__logo">AURALIS</span>
            <span className="sidebar__sub">ADMIN PANEL</span>
          </Link>
        )}
        <button className="sidebar__toggle" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      <nav className="sidebar__nav">
        {links.map(l => {
          const Icon = l.icon;
          const active = pathname === l.href;
          return (
            <Link key={l.href} href={l.href} className={`sidebar__link ${active ? 'sidebar__link--active' : ''}`} title={l.label}>
              <Icon size={20} />
              {!collapsed && <span>{l.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
