'use client';
import { useSession, signOut } from 'next-auth/react';
import { Bell, LogOut, Home } from 'lucide-react';
import Link from 'next/link';

export default function AdminHeader() {
  const { data: session } = useSession();
  return (
    <header className="admin-header">
      <div className="admin-header__left">
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem' }}>Welcome back, <span className="text-gold">{session?.user?.name?.split(' ')[0] || 'Admin'}</span></h2>
      </div>
      <div className="admin-header__right">
        <Link href="/" className="btn-icon" title="View Site"><Home size={18} /></Link>
        <button className="btn-icon" title="Notifications"><Bell size={18} /></button>
        <div className="admin-header__user">
          <div className="admin-header__avatar">{session?.user?.name?.[0] || 'A'}</div>
          <div>
            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--warm-white)' }}>{session?.user?.name}</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--cool-gray)' }}>Administrator</p>
          </div>
        </div>
        <button className="btn-icon" title="Sign Out" onClick={() => signOut({ callbackUrl: '/' })}><LogOut size={18} /></button>
      </div>
      <style jsx>{`
        .admin-header { display:flex; align-items:center; justify-content:space-between; padding:16px 32px; background:var(--navy); border-bottom:1px solid rgba(212,175,55,0.08); }
        .admin-header__right { display:flex; align-items:center; gap:12px; }
        .admin-header__user { display:flex; align-items:center; gap:10px; padding:0 8px; }
        .admin-header__avatar { width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg,var(--gold),var(--gold-dark)); color:var(--navy-dark); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.85rem; }
      `}</style>
    </header>
  );
}
