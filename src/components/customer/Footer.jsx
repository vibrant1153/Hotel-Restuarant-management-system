'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';

export default function Navbar(){
     const { data: session } = useSession();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/rooms', label: 'Rooms' },
    { href: '/food', label: 'Dining' },
  ];

  return (
  <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
    <div className="navbar__inner container">
         <Link href="/" className="navbar__logo">
          <span className="navbar__logo-text">AURALIS</span>
          <span className="navbar__logo-sub">LUXURY HOTEL & RESORT</span>
        </Link>

         <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {links.map(l => (
            <Link key={l.href} href={l.href} className={`navbar__link ${pathname === l.href ? 'navbar__link--active' : ''}`} onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
          {session && (
            <Link href="/profile" className={`navbar__link ${pathname === '/profile' ? 'navbar__link--active' : ''}`} onClick={() => setMenuOpen(false)}>
              My Profile
            </Link>
          )}
        </div>

         <div className="navbar__right">
          {session ? (
            <div className="navbar__user" onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <div className="navbar__avatar">{session.user?.name?.[0] || 'U'}</div>
              <ChevronDown size={14} style={{ color: 'var(--cool-gray)', transition: 'transform 0.2s', transform: userMenuOpen ? 'rotate(180deg)' : 'none' }} />
              {userMenuOpen && (
                <div className="navbar__dropdown">
                  <div className="navbar__dropdown-header">
                    <p style={{ fontWeight: 600, color: 'var(--warm-white)' }}>{session.user?.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--cool-gray)' }}>{session.user?.email}</p>
                  </div>
                  <Link href="/profile" className="navbar__dropdown-item" onClick={() => setUserMenuOpen(false)}><User size={15} /> Profile</Link>
                  {session.user?.role === 'ADMIN' && (
                    <Link href="/admin" className="navbar__dropdown-item" onClick={() => setUserMenuOpen(false)}><LayoutDashboard size={15} /> Admin Dashboard</Link>
                  )}
                  <button className="navbar__dropdown-item navbar__dropdown-item--danger" onClick={() => signOut({ callbackUrl: '/' })}><LogOut size={15} /> Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar__auth-btns">
              <Link href="/login" className="btn btn-ghost btn-sm">Sign In</Link>
              <Link href="/register" className="btn btn-primary btn-sm">Register</Link>
            </div>
          )}
          <button className="navbar__burger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

    </div>
  </nav>
  )
}