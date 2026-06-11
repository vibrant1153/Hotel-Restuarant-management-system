'use client';
import { motion } from 'framer-motion';

export default function StatsCard({ title, value, icon: Icon, color = 'var(--gold)', trend, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="stats-card"
    >
      <div className="stats-card__icon" style={{ background: `${color}15`, color }}>
        {Icon && <Icon size={22} />}
      </div>
      <div>
        <p className="stats-card__label">{title}</p>
        <p className="stats-card__value">{value}</p>
        {trend && <p className="stats-card__trend" style={{ color: trend > 0 ? 'var(--color-success)' : 'var(--color-error)' }}>{trend > 0 ? '+' : ''}{trend}%</p>}
      </div>
      <style jsx>{`
        .stats-card { display:flex; align-items:center; gap:16px; padding:24px; background:var(--surface-card); border:1px solid rgba(212,175,55,0.08); border-radius:var(--radius-lg); transition:all 0.3s var(--ease-out); }
        .stats-card:hover { border-color:rgba(212,175,55,0.2); transform:translateY(-2px); }
        .stats-card__icon { width:48px; height:48px; border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .stats-card__label { font-size:0.78rem; color:var(--cool-gray); text-transform:uppercase; letter-spacing:0.08em; font-weight:500; }
        .stats-card__value { font-family:var(--font-heading); font-size:1.8rem; font-weight:700; color:var(--warm-white); margin-top:2px; }
        .stats-card__trend { font-size:0.78rem; font-weight:600; margin-top:2px; }
      `}</style>
    </motion.div>
  );
}
