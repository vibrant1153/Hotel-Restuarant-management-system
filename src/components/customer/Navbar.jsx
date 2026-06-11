'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';

export default function Navbar() {
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

      <style jsx>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 16px 0;
          transition: all 0.35s var(--ease-out);
          background: transparent;
        }
        .navbar--scrolled {
          background: rgba(11,30,58,0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 10px 0;
          border-bottom: 1px solid rgba(212,175,55,0.1);
        }
        .navbar__inner { display: flex; align-items: center; justify-content: space-between; }
        .navbar__logo { display: flex; flex-direction: column; align-items: flex-start; }
        .navbar__logo-text { font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; color: var(--gold); letter-spacing: 6px; line-height: 1; }
        .navbar__logo-sub { font-size: 0.55rem; color: var(--cool-gray); letter-spacing: 3px; text-transform: uppercase; margin-top: 2px; }
        .navbar__links { display: flex; gap: 32px; align-items: center; }
        .navbar__link { font-size: 0.88rem; font-weight: 500; color: var(--cool-gray); transition: color 0.25s; position: relative; }
        .navbar__link:hover, .navbar__link--active { color: var(--gold); }
        .navbar__link--active::after { content: ''; position: absolute; bottom: -6px; left: 0; right: 0; height: 2px; background: var(--gold); border-radius: 2px; }
        .navbar__right { display: flex; align-items: center; gap: 12px; }
        .navbar__user { position: relative; display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .navbar__avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, var(--gold), var(--gold-dark));
          color: var(--navy-dark); display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 0.85rem;
        }
        .navbar__dropdown {
          position: absolute; top: 100%; right: 0; margin-top: 8px;
          background: var(--navy-light); border: 1px solid rgba(212,175,55,0.15);
          border-radius: var(--radius-lg); min-width: 220px; overflow: hidden;
          animation: fadeInUp 0.2s var(--ease-out);
          box-shadow: var(--shadow-xl);
        }
        .navbar__dropdown-header { padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .navbar__dropdown-item {
          display: flex; align-items: center; gap: 10px; padding: 11px 16px;
          font-size: 0.85rem; color: var(--cool-gray); background: none; border: none; width: 100%; text-align: left;
          transition: all 0.15s; cursor: pointer;
        }
        .navbar__dropdown-item:hover { background: rgba(212,175,55,0.08); color: var(--gold); }
        .navbar__dropdown-item--danger:hover { color: var(--color-error); background: rgba(239,68,68,0.08); }
        .navbar__auth-btns { display: flex; gap: 8px; }
        .navbar__burger { display: none; background: none; border: none; color: var(--warm-white); }
        @media (max-width: 768px) {
          .navbar__links { display: none; position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; gap: 0; background: var(--navy); border-bottom: 1px solid rgba(212,175,55,0.1); }
          .navbar__links--open { display: flex; }
          .navbar__link { padding: 14px 24px; width: 100%; border-bottom: 1px solid rgba(255,255,255,0.04); }
          .navbar__burger { display: block; }
          .navbar__auth-btns { display: none; }
        }
      `}</style>
    </nav>
  );
}
