'use client';
import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react';
import { formatCurrency, getRoomTypeLabel } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const emptyForm = { name: '', type: 'STANDARD', price: '', description: '', images: [''], amenities: [''], status: 'AVAILABLE', capacity: 2, floor: 1, bedType: 'King Bed', size: '' };
  const [form, setForm] = useState(emptyForm);

  const fetchRooms = () => { fetch(`/api/rooms?search=${search}`).then(r => r.json()).then(d => { setRooms(d); setLoading(false); }); };
  useEffect(() => { const t = setTimeout(fetchRooms, 300); return () => clearTimeout(t); }, [search]);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (room) => { setEditing(room); setForm({ ...room, images: room.images || [''], amenities: room.amenities || [''], price: room.price.toString(), size: room.size?.toString() || '', capacity: room.capacity, floor: room.floor }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: parseFloat(form.price), size: form.size ? parseFloat(form.size) : null, capacity: parseInt(form.capacity), floor: parseInt(form.floor), images: form.images.filter(Boolean), amenities: form.amenities.filter(Boolean) };
    const url = editing ? `/api/rooms/${editing.id}` : '/api/rooms';
    const res = await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (res.ok) { toast.success(editing ? 'Room updated!' : 'Room created!'); setShowModal(false); fetchRooms(); }
    else { const d = await res.json(); toast.error(d.error); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this room?')) return;
    const res = await fetch(`/api/rooms/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('Room deleted'); fetchRooms(); } else toast.error('Failed to delete');
  };

  const handleStatusToggle = async (room) => {
    const statuses = ['AVAILABLE', 'OCCUPIED', 'MAINTENANCE'];
    const next = statuses[(statuses.indexOf(room.status) + 1) % statuses.length];
    await fetch(`/api/rooms/${room.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: next }) });
    fetchRooms();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div><h2>Room Management</h2><p className="subtitle">Manage all hotel rooms</p></div>
        <button className="btn btn-primary" onClick={openCreate}><Plus size={18} /> Add Room</button>
      </div>
      <div className="glass" style={{ padding: 20, marginBottom: 24 }}>
        <div style={{ position: 'relative', maxWidth: 320 }}>
          <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--cool-gray)' }} />
          <input className="input" placeholder="Search rooms..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 40, width: '100%' }} />
        </div>
      </div>
      {loading ? <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner" /></div> : (
        <div className="glass" style={{ overflow: 'hidden' }}>
          <table className="data-table">
            <thead><tr><th>Room</th><th>Type</th><th>Price</th><th>Status</th><th>Capacity</th><th>Floor</th><th>Actions</th></tr></thead>
            <tbody>
              {rooms.map(r => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 500 }}>{r.name}</td>
                  <td><span className="badge badge-blue">{getRoomTypeLabel(r.type)}</span></td>
                  <td style={{ color: 'var(--gold)', fontWeight: 600 }}>{formatCurrency(r.price)}</td>
                  <td><button className={`badge ${r.status === 'AVAILABLE' ? 'badge-green' : r.status === 'OCCUPIED' ? 'badge-gold' : 'badge-red'}`} onClick={() => handleStatusToggle(r)} style={{ cursor: 'pointer', border: 'none' }}>{r.status}</button></td>
                  <td>{r.capacity}</td>
                  <td>{r.floor}</td>
                  <td><div style={{ display: 'flex', gap: 8 }}><button className="btn-icon" onClick={() => openEdit(r)}><Pencil size={15} /></button><button className="btn-icon" onClick={() => handleDelete(r.id)} style={{ color: 'var(--color-error)' }}><Trash2 size={15} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 600 }}>
            <div className="modal-header"><h3>{editing ? 'Edit Room' : 'Add Room'}</h3><button className="btn-icon" onClick={() => setShowModal(false)}><X size={18} /></button></div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="input-group"><label>Name</label><input className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="input-group"><label>Type</label><select className="input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option value="STANDARD">Standard</option><option value="DELUXE">Deluxe</option><option value="SUITE">Suite</option><option value="PRESIDENTIAL">Presidential</option></select></div>
                <div className="input-group"><label>Price / night</label><input className="input" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required /></div>
              </div>
              <div className="input-group"><label>Description</label><textarea className="input" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div className="input-group"><label>Capacity</label><input className="input" type="number" value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} /></div>
                <div className="input-group"><label>Floor</label><input className="input" type="number" value={form.floor} onChange={e => setForm({ ...form, floor: e.target.value })} /></div>
                <div className="input-group"><label>Size (m²)</label><input className="input" type="number" value={form.size} onChange={e => setForm({ ...form, size: e.target.value })} /></div>
              </div>
              <div className="input-group"><label>Bed Type</label><input className="input" value={form.bedType} onChange={e => setForm({ ...form, bedType: e.target.value })} /></div>
              <div className="input-group"><label>Image URL</label><input className="input" value={form.images[0]} onChange={e => setForm({ ...form, images: [e.target.value] })} placeholder="https://..." /></div>
              <div className="input-group"><label>Amenities (comma-separated)</label><input className="input" value={form.amenities.join(', ')} onChange={e => setForm({ ...form, amenities: e.target.value.split(',').map(s => s.trim()) })} /></div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }}>{editing ? 'Update Room' : 'Create Room'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
