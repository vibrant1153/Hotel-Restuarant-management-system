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
      <style jsx>{`
        .sidebar { width:260px; min-height:100vh; background:var(--navy); border-right:1px solid rgba(212,175,55,0.08); display:flex; flex-direction:column; transition:width 0.3s var(--ease-out); position:fixed; left:0; top:0; z-index:50; }
        .sidebar--collapsed { width:72px; }
        .sidebar__header { padding:20px 16px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.06); }
        .sidebar__brand { display:flex; flex-direction:column; }
        .sidebar__logo { font-family:var(--font-heading); font-size:1.3rem; font-weight:700; color:var(--gold); letter-spacing:5px; }
        .sidebar__sub { font-size:0.5rem; color:var(--cool-gray); letter-spacing:2px; }
        .sidebar__toggle { width:28px; height:28px; border-radius:50%; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.05); color:var(--cool-gray); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.2s; }
        .sidebar__toggle:hover { background:rgba(212,175,55,0.1); color:var(--gold); }
        .sidebar__nav { padding:16px 8px; display:flex; flex-direction:column; gap:4px; flex:1; }
        .sidebar__link { display:flex; align-items:center; gap:12px; padding:11px 14px; border-radius:var(--radius-md); color:var(--cool-gray); font-size:0.88rem; font-weight:500; transition:all 0.2s; text-decoration:none; }
        .sidebar__link:hover { background:rgba(212,175,55,0.06); color:var(--warm-white); }
        .sidebar__link--active { background:rgba(212,175,55,0.12); color:var(--gold); border:1px solid rgba(212,175,55,0.15); }
      `}</style>
    </aside>
  );
}
