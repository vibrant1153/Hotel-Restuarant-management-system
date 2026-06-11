'use client';
import { CalendarDays, Clock, Sparkles } from 'lucide-react';

export default function AdminBookingsPage() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}><h2>Booking Overview</h2><p className="subtitle">Manage hotel reservations</p></div>

      {/* Coming Soon Banner */}
      <div className="glass" style={{ padding: '32px 40px', marginBottom: 32, borderLeft: '4px solid var(--electric)', display: 'flex', alignItems: 'center', gap: 20 }}>
        <Sparkles size={32} style={{ color: 'var(--electric)', flexShrink: 0 }} />
        <div>
          <h4 style={{ color: 'var(--electric)', marginBottom: 4 }}>Booking Engine Coming Soon</h4>
          <p className="subtitle" style={{ margin: 0 }}>The full booking management system with calendar views, check-in/out flows, and payment integration is being developed.</p>
        </div>
      </div>

      {/* Skeleton UI */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {['Today\'s Check-ins', 'Today\'s Check-outs', 'Active Bookings', 'Revenue'].map((label, i) => (
          <div key={i} className="glass" style={{ padding: 24 }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--cool-gray)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{label}</p>
            <div className="skeleton" style={{ height: 36, width: 80, marginBottom: 4 }} />
            <div className="skeleton" style={{ height: 14, width: 60 }} />
          </div>
        ))}
      </div>

      <div className="glass" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4>Recent Bookings</h4>
          <div className="skeleton" style={{ height: 36, width: 120, borderRadius: 'var(--radius-md)' }} />
        </div>
        <table className="data-table">
          <thead><tr><th>Guest</th><th>Room</th><th>Check-in</th><th>Check-out</th><th>Status</th><th>Amount</th></tr></thead>
          <tbody>
            {[1, 2, 3, 4, 5].map(i => (
              <tr key={i}>
                {[120, 140, 100, 100, 80, 70].map((w, j) => (
                  <td key={j}><div className="skeleton" style={{ height: 18, width: w }} /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="glass" style={{ marginTop: 24, padding: 32, textAlign: 'center' }}>
        <CalendarDays size={48} style={{ color: 'var(--electric)', margin: '0 auto 16px' }} />
        <h3 style={{ marginBottom: 8 }}>Calendar View</h3>
        <p className="subtitle">An interactive calendar with drag-and-drop booking management will be available here.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6, marginTop: 24, maxWidth: 500, margin: '24px auto 0' }}>
          {[...Array(28)].map((_, i) => <div key={i} className="skeleton" style={{ height: 40, borderRadius: 'var(--radius-sm)' }} />)}
        </div>
      </div>
    </div>
  );
}
