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
  <nav>
    <div>
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
    </div>
  </nav>
  )
}