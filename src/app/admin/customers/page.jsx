'use client';
import { useState, useEffect } from 'react';
import { Search, Eye, Trash2, Shield } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const fetchCustomers = () => {
    fetch(`/api/customers?search=${search}`).then(r => r.json()).then(d => { setCustomers(Array.isArray(d) ? d : []); setLoading(false); });
  };
  useEffect(() => { const t = setTimeout(fetchCustomers, 300); return () => clearTimeout(t); }, [search]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this customer?')) return;
    const res = await fetch(`/api/customers/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('Customer deleted'); fetchCustomers(); setSelected(null); }
    else toast.error('Failed to delete');
  };

  const handlePromote = async (id) => {
    if (!confirm('Promote to admin?')) return;
    const res = await fetch(`/api/customers/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role: 'ADMIN' }) });
    if (res.ok) { toast.success('User promoted to admin'); fetchCustomers(); }
    else toast.error('Failed to promote');
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}><h2>Customer Management</h2><p className="subtitle">View and manage registered guests</p></div>
      <div className="glass" style={{ padding: 20, marginBottom: 24 }}>
        <div style={{ position: 'relative', maxWidth: 320 }}>
          <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--cool-gray)' }} />
          <input className="input" placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 40, width: '100%' }} />
        </div>
      </div>
      {loading ? <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner" /></div> : (
        <div className="glass" style={{ overflow: 'hidden' }}>
          <table className="data-table">
            <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Bookings</th><th>Orders</th><th>Joined</th><th>Actions</th></tr></thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 500 }}>{c.name || 'N/A'}</td>
                  <td style={{ color: 'var(--cool-gray)' }}>{c.email}</td>
                  <td style={{ color: 'var(--cool-gray)' }}>{c.phone || '—'}</td>
                  <td><span className="badge badge-blue">{c._count?.bookings || 0}</span></td>
                  <td><span className="badge badge-gold">{c._count?.foodOrders || 0}</span></td>
                  <td style={{ color: 'var(--cool-gray)', fontSize: '0.85rem' }}>{formatDate(c.createdAt)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn-icon" onClick={() => handlePromote(c.id)} title="Promote to Admin"><Shield size={15} /></button>
                      <button className="btn-icon" onClick={() => handleDelete(c.id)} style={{ color: 'var(--color-error)' }} title="Delete"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {customers.length === 0 && <p style={{ textAlign: 'center', padding: 40, color: 'var(--cool-gray)' }}>No customers found.</p>}
        </div>
      )}
    </div>
  );
}
