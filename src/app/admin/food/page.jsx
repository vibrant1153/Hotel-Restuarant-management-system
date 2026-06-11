'use client';
import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { formatCurrency, getFoodCategoryLabel } from '@/lib/utils';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function AdminFoodPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  
  const emptyForm = { name: '', description: '', price: '', category: 'BREAKFAST', image: '', available: true };
  const [form, setForm] = useState(emptyForm);

  const categories = ['ALL', 'BREAKFAST', 'LUNCH', 'DINNER', 'SNACKS', 'DRINKS'];

  const fetchItems = () => {
    fetch('/api/food').then(r => r.json()).then(d => { setItems(d); setLoading(false); });
  };
  useEffect(() => { fetchItems(); }, []);

  const filteredItems = activeCategory === 'ALL' ? items : items.filter(i => i.category === activeCategory);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (item) => { setEditing(item); setForm({ ...item, price: item.price.toString() }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: parseFloat(form.price) };
    const url = editing ? `/api/food/${editing.id}` : '/api/food';
    const res = await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (res.ok) { toast.success(editing ? 'Item updated' : 'Item created'); setShowModal(false); fetchItems(); }
    else { const d = await res.json(); toast.error(d.error); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return;
    const res = await fetch(`/api/food/${id}`, { method: 'DELETE' });
    if (res.ok) { toast.success('Item deleted'); fetchItems(); } else toast.error('Failed to delete');
  };

  const toggleAvailable = async (item) => {
    await fetch(`/api/food/${item.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ available: !item.available }) });
    fetchItems();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div><h2>Food Menu</h2><p className="subtitle">Manage dining options</p></div>
        <button className="btn btn-primary" onClick={openCreate}><Plus size={18} /> Add Item</button>
      </div>

      <div className="glass" style={{ padding: '16px 20px', marginBottom: 24, display: 'flex', gap: 8, overflowX: 'auto' }}>
        {categories.map(c => (
          <button key={c} className={`btn ${activeCategory === c ? 'btn-primary' : 'btn-ghost'} btn-sm`} onClick={() => setActiveCategory(c)} style={{ whiteSpace: 'nowrap' }}>
            {c === 'ALL' ? 'All Items' : getFoodCategoryLabel(c)}
          </button>
        ))}
      </div>

      {loading ? <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner" /></div> : (
        <div className="glass" style={{ overflow: 'hidden' }}>
          <table className="data-table">
            <thead><tr><th>Item</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', overflow: 'hidden', position: 'relative', background: 'rgba(255,255,255,0.05)' }}>
                        {item.image ? <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} /> : <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--cool-gray)' }}><ImageIcon size={16} /></div>}
                      </div>
                      <div>
                        <p style={{ fontWeight: 500 }}>{item.name}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--cool-gray)', maxWidth: 200 }} className="truncate">{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-gray">{getFoodCategoryLabel(item.category)}</span></td>
                  <td style={{ color: 'var(--gold)', fontWeight: 600 }}>{formatCurrency(item.price)}</td>
                  <td>
                    <button className={`badge ${item.available ? 'badge-green' : 'badge-red'}`} onClick={() => toggleAvailable(item)} style={{ cursor: 'pointer', border: 'none' }}>
                      {item.available ? 'Available' : 'Unavailable'}
                    </button>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn-icon" onClick={() => openEdit(item)}><Pencil size={15} /></button>
                      <button className="btn-icon" onClick={() => handleDelete(item.id)} style={{ color: 'var(--color-error)' }}><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredItems.length === 0 && <p style={{ textAlign: 'center', padding: 40, color: 'var(--cool-gray)' }}>No items found.</p>}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <div className="modal-header"><h3>{editing ? 'Edit Food Item' : 'Add Food Item'}</h3><button className="btn-icon" onClick={() => setShowModal(false)}><X size={18} /></button></div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="input-group"><label>Name</label><input className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
              <div className="input-group"><label>Description</label><textarea className="input" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="input-group">
                  <label>Category</label>
                  <select className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {categories.filter(c => c !== 'ALL').map(c => <option key={c} value={c}>{getFoodCategoryLabel(c)}</option>)}
                  </select>
                </div>
                <div className="input-group"><label>Price</label><input className="input" type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required /></div>
              </div>
              <div className="input-group"><label>Image URL</label><input className="input" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." /></div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.9rem', color: 'var(--warm-white)', marginTop: 8 }}>
                <input type="checkbox" checked={form.available} onChange={e => setForm({ ...form, available: e.target.checked })} style={{ width: 16, height: 16, accentColor: 'var(--gold)' }} />
                Item is currently available
              </label>
              <button type="submit" className="btn btn-primary" style={{ marginTop: 16 }}>{editing ? 'Update Item' : 'Create Item'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
