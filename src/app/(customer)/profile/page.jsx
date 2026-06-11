'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { User, Package, UtensilsCrossed } from 'lucide-react';
import { formatCurrency, formatDate, getOrderStatusColor } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [tab, setTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '' });

  useEffect(() => {
    if (session?.user) setForm({ name: session.user.name || '', phone: '', address: '' });
  }, [session]);

  useEffect(() => {
    if (tab === 'orders') { setLoading(true); fetch('/api/food-orders').then(r => r.json()).then(d => { setOrders(Array.isArray(d) ? d : []); setLoading(false); }); }
  }, [tab]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'bookings', label: 'Bookings', icon: Package },
    { id: 'orders', label: 'Food Orders', icon: UtensilsCrossed },
  ];

  return (
    <div style={{ paddingTop: 100 }}>
      <section style={{ background: 'var(--navy)', padding: '48px 0' }}>
        <div className="container text-center">
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,var(--gold),var(--gold-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '2rem', fontWeight: 700, color: 'var(--navy-dark)' }}>
            {session?.user?.name?.[0] || 'U'}
          </div>
          <h2>{session?.user?.name}</h2>
          <p className="subtitle">{session?.user?.email}</p>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--navy-dark)' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 32, justifyContent: 'center' }}>
            {tabs.map(t => { const Icon = t.icon; return (
              <button key={t.id} className={`btn ${tab === t.id ? 'btn-primary' : 'btn-ghost'} btn-sm`} onClick={() => setTab(t.id)}>
                <Icon size={16} /> {t.label}
              </button>
            ); })}
          </div>

          {tab === 'profile' && (
            <div className="glass" style={{ padding: 32 }}>
              <h3 style={{ marginBottom: 24 }}>Personal Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="input-group"><label>Full Name</label><input className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div className="input-group"><label>Email</label><input className="input" value={session?.user?.email || ''} disabled style={{ opacity: 0.6 }} /></div>
                <div className="input-group"><label>Phone</label><input className="input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+1 234 567 8900" /></div>
                <div className="input-group"><label>Address</label><textarea className="input" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Your address" /></div>
                <button className="btn btn-primary" onClick={() => toast.success('Profile updated!')}>Save Changes</button>
              </div>
            </div>
          )}

          {tab === 'bookings' && (
            <div className="glass" style={{ padding: 32, textAlign: 'center' }}>
              <div style={{ padding: 40 }}>
                <Package size={48} style={{ color: 'var(--electric)', marginBottom: 16 }} />
                <h3 style={{ marginBottom: 8 }}>Booking History</h3>
                <p className="subtitle">Your booking history will appear here once the booking engine is integrated.</p>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 20 }}>
                  {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 60, borderRadius: 'var(--radius-md)', flex: 1 }} />)}
                </div>
              </div>
            </div>
          )}

          {tab === 'orders' && (
            <div className="glass" style={{ padding: 32 }}>
              <h3 style={{ marginBottom: 24 }}>My Food Orders</h3>
              {loading ? <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}><div className="spinner" /></div> :
                orders.length === 0 ? <p style={{ color: 'var(--cool-gray)', textAlign: 'center', padding: 40 }}>No orders yet.</p> :
                orders.map(o => (
                  <div key={o.id} className="card" style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontWeight: 600 }}>Order #{o.id.slice(0, 8).toUpperCase()}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--cool-gray)' }}>{formatDate(o.createdAt)}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--cool-gray)' }}>{Array.isArray(o.items) ? o.items.length : 0} items</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className="badge" style={{ background: `${getOrderStatusColor(o.status)}20`, color: getOrderStatusColor(o.status) }}>{o.status}</span>
                      <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold)', marginTop: 4 }}>{formatCurrency(o.totalAmount)}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
