'use client';
import { useState, useEffect } from 'react';
import StatsCard from '@/components/admin/StatsCard';
import { BedDouble, Users, UtensilsCrossed, TrendingUp, Activity } from 'lucide-react';
import { formatCurrency, formatDateShort } from '@/lib/utils';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports').then(r => r.json()).then(d => { setStats(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner" /></div>;

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h2>Dashboard Overview</h2>
        <p className="subtitle">Monitor your hotel performance at a glance.</p>
      </div>

      <div className="grid-4" style={{ marginBottom: 32 }}>
        <StatsCard title="Total Rooms" value={stats?.totalRooms || 0} icon={BedDouble} color="var(--gold)" index={0} />
        <StatsCard title="Customers" value={stats?.totalCustomers || 0} icon={Users} color="var(--electric)" index={1} />
        <StatsCard title="Food Orders" value={stats?.totalFoodOrders || 0} icon={UtensilsCrossed} color="var(--color-success)" index={2} />
        <StatsCard title="Occupancy" value={`${stats?.occupancyRate || 0}%`} icon={TrendingUp} color="var(--color-warning)" index={3} />
      </div>

      <div className="grid-2">
        {/* Room Status */}
        <div className="glass" style={{ padding: 24 }}>
          <h4 style={{ marginBottom: 16 }}>Room Status</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--cool-gray)' }}>Available</span>
              <span className="badge badge-green">{stats?.availableRooms || 0}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--cool-gray)' }}>Occupied</span>
              <span className="badge badge-gold">{stats?.occupiedRooms || 0}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--cool-gray)' }}>Maintenance</span>
              <span className="badge badge-red">{(stats?.totalRooms || 0) - (stats?.availableRooms || 0) - (stats?.occupiedRooms || 0)}</span>
            </div>
          </div>
        </div>

        {/* Revenue by Type */}
        <div className="glass" style={{ padding: 24 }}>
          <h4 style={{ marginBottom: 16 }}>Revenue by Room Type</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(stats?.revenueByType || []).map(r => (
              <div key={r.type} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--cool-gray)' }}>{r.type}</span>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span className="badge badge-blue">{r.count} rooms</span>
                  <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Avg {formatCurrency(r.avgPrice)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="glass" style={{ padding: 24, marginTop: 24 }}>
        <h4 style={{ marginBottom: 16 }}>Recent Food Orders</h4>
        {(stats?.recentOrders || []).length === 0 ? (
          <p style={{ color: 'var(--cool-gray)', textAlign: 'center', padding: 24 }}>No orders yet.</p>
        ) : (
          <table className="data-table">
            <thead><tr><th>Order ID</th><th>Customer</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {(stats?.recentOrders || []).map(o => (
                <tr key={o.id}>
                  <td style={{ fontWeight: 500 }}>#{o.id.slice(0, 8).toUpperCase()}</td>
                  <td>{o.user?.name || 'Unknown'}</td>
                  <td style={{ color: 'var(--gold)' }}>{formatCurrency(o.totalAmount)}</td>
                  <td><span className={`badge ${o.status === 'DELIVERED' ? 'badge-green' : o.status === 'PENDING' ? 'badge-gold' : 'badge-blue'}`}>{o.status}</span></td>
                  <td style={{ color: 'var(--cool-gray)' }}>{formatDateShort(o.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
