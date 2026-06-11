'use client';
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function FoodCard({ item, quantity = 0, onAdd, onRemove }) {
  return (
    <div className={`food-card ${!item.available ? 'food-card--off' : ''}`}>
      <div className="food-card__img">
        <Image src={item.image || 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400'} alt={item.name} fill sizes="25vw" style={{ objectFit: 'cover' }} />
        {!item.available && <div className="food-card__sold">Unavailable</div>}
      </div>
      <div className="food-card__body">
        <h4 className="food-card__name">{item.name}</h4>
        <p className="food-card__desc">{item.description}</p>
        <div className="food-card__foot">
          <span className="food-card__price">{formatCurrency(item.price)}</span>
          {item.available && (
            <div className="food-card__qty">
              {quantity > 0 && (
                <>
                  <button className="qty-btn" onClick={() => onRemove(item.id)}><Minus size={14} /></button>
                  <span className="qty-num">{quantity}</span>
                </>
              )}
              <button className="qty-btn qty-btn--add" onClick={() => onAdd(item)}><Plus size={14} /></button>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .food-card { background:var(--surface-card); border:1px solid rgba(212,175,55,0.08); border-radius:var(--radius-lg); overflow:hidden; transition:all 0.3s var(--ease-out); height:100%; }
        .food-card:hover { border-color:rgba(212,175,55,0.2); transform:translateY(-3px); }
        .food-card--off { opacity:0.5; pointer-events:none; }
        .food-card__img { position:relative; height:160px; overflow:hidden; }
        .food-card__sold { position:absolute; inset:0; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; color:var(--color-error); font-weight:600; font-size:0.85rem; text-transform:uppercase; letter-spacing:0.1em; }
        .food-card__body { padding:16px; }
        .food-card__name { font-family:var(--font-heading); font-size:1.1rem; color:var(--warm-white); margin-bottom:6px; }
        .food-card__desc { font-size:0.8rem; color:var(--cool-gray); line-height:1.5; margin-bottom:12px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .food-card__foot { display:flex; align-items:center; justify-content:space-between; }
        .food-card__price { font-family:var(--font-heading); font-size:1.2rem; font-weight:700; color:var(--gold); }
        .food-card__qty { display:flex; align-items:center; gap:8px; }
        .qty-btn { width:30px; height:30px; border-radius:50%; border:1px solid rgba(212,175,55,0.3); background:rgba(212,175,55,0.08); color:var(--gold); display:flex; align-items:center; justify-content:center; transition:all 0.2s; }
        .qty-btn:hover { background:rgba(212,175,55,0.2); }
        .qty-btn--add { background:linear-gradient(135deg,var(--gold),var(--gold-dark)); color:var(--navy-dark); border:none; }
        .qty-num { font-weight:700; color:var(--warm-white); min-width:20px; text-align:center; }
      `}</style>
    </div>
  );
}
