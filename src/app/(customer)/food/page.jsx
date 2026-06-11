'use client';
import { useState, useEffect } from 'react';
import FoodCard from '@/components/customer/FoodCard';
import { ShoppingBag, X, Minus, Plus, Send } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';

const categories = ['ALL', 'BREAKFAST', 'LUNCH', 'DINNER', 'SNACKS', 'DRINKS'];

export default function FoodPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    fetch('/api/food').then(r => r.json()).then(d => { setItems(d); setLoading(false); });
  }, []);

  const filtered = activeCategory === 'ALL' ? items : items.filter(i => i.category === activeCategory);
  const getQty = (id) => cart.find(c => c.id === id)?.qty || 0;
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
  };
  const removeFromCart = (id) => {
    setCart(prev => prev.map(c => c.id === id ? { ...c, qty: c.qty - 1 } : c).filter(c => c.qty > 0));
  };
  const placeOrder = async () => {
    setOrdering(true);
    const res = await fetch('/api/food-orders', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, totalAmount: total }),
    });
    setOrdering(false);
    if (res.ok) { toast.success('Order placed successfully!'); setCart([]); setCartOpen(false); }
    else { const d = await res.json(); toast.error(d.error || 'Failed to place order'); }
  };

  return (
    <div style={{ paddingTop: 100 }}>
      <section style={{ background: 'var(--navy)', padding: '48px 0' }}>
        <div className="container text-center">
          <span className="label">Culinary Excellence</span>
          <h1 style={{ marginTop: 8 }}>Fine Dining Menu</h1>
          <div className="divider" style={{ margin: '16px auto' }} />
          <p className="subtitle" style={{ maxWidth: 500, margin: '0 auto' }}>Order from our world-class kitchen, delivered to your room.</p>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--navy-dark)' }}>
        <div className="container">
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map(c => (
              <button key={c} className={`btn ${activeCategory === c ? 'btn-primary' : 'btn-ghost'} btn-sm`} onClick={() => setActiveCategory(c)}>
                {c === 'ALL' ? 'All' : c.charAt(0) + c.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner" /></div>
          ) : (
            <div className="grid-4">{filtered.map((item, i) => (
              <FoodCard key={item.id} item={item} quantity={getQty(item.id)} onAdd={addToCart} onRemove={removeFromCart} index={i} />
            ))}</div>
          )}
        </div>
      </section>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <button onClick={() => setCartOpen(true)} style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 90, background: 'linear-gradient(135deg,var(--gold),var(--gold-dark))', color: 'var(--navy-dark)', width: 56, height: 56, borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-gold)', cursor: 'pointer' }}>
          <ShoppingBag size={22} />
          <span style={{ position: 'absolute', top: -4, right: -4, background: 'var(--color-error)', color: '#fff', width: 22, height: 22, borderRadius: '50%', fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cart.reduce((s, c) => s + c.qty, 0)}</span>
        </button>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="modal-overlay" onClick={() => setCartOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '100%', maxWidth: 400, background: 'var(--navy-light)', borderLeft: '1px solid rgba(212,175,55,0.12)', padding: 24, overflowY: 'auto', animation: 'slideInRight 0.3s var(--ease-out)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3>Your Order</h3>
              <button className="btn-icon" onClick={() => setCartOpen(false)}><X size={18} /></button>
            </div>
            {cart.map(c => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div><p style={{ fontWeight: 500 }}>{c.name}</p><p style={{ fontSize: '0.8rem', color: 'var(--cool-gray)' }}>{formatCurrency(c.price)} each</p></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button className="btn-icon" style={{ width: 28, height: 28 }} onClick={() => removeFromCart(c.id)}><Minus size={12} /></button>
                  <span style={{ fontWeight: 600, minWidth: 20, textAlign: 'center' }}>{c.qty}</span>
                  <button className="btn-icon" style={{ width: 28, height: 28 }} onClick={() => addToCart(c)}><Plus size={12} /></button>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 24, padding: '16px 0', borderTop: '1px solid rgba(212,175,55,0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ color: 'var(--cool-gray)' }}>Total</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--gold)' }}>{formatCurrency(total)}</span>
              </div>
              <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={placeOrder} disabled={ordering}>
                {ordering ? <span className="spinner spinner-sm" /> : <><Send size={16} /> Place Order</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
