'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Maximize, BedDouble } from 'lucide-react';
import { formatCurrency, getRoomTypeLabel } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function RoomCard({ room, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/rooms/${room.id}`} className="room-card-link">
        <div className="room-card">
          <div className="room-card__img-wrap">
            <Image src={room.images?.[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'} alt={room.name} fill sizes="(max-width:768px)100vw,33vw" style={{ objectFit: 'cover' }} />
            <div className="room-card__overlay" />
            <span className={`room-card__badge badge ${room.status === 'AVAILABLE' ? 'badge-green' : room.status === 'OCCUPIED' ? 'badge-gold' : 'badge-red'}`}>
              {room.status}
            </span>
          </div>
          <div className="room-card__body">
            <span className="label">{getRoomTypeLabel(room.type)}</span>
            <h3 className="room-card__name">{room.name}</h3>
            <p className="room-card__desc">{room.description?.slice(0, 90)}...</p>
            <div className="room-card__meta">
              <span><Users size={14} /> {room.capacity} Guests</span>
              <span><BedDouble size={14} /> {room.bedType}</span>
              {room.size && <span><Maximize size={14} /> {room.size}m²</span>}
            </div>
            <div className="room-card__footer">
              <div className="room-card__price">
                <span className="room-card__amount">{formatCurrency(room.price)}</span>
                <span className="room-card__per">/ night</span>
              </div>
              <span className="btn btn-primary btn-sm">View Details</span>
            </div>
          </div>
        </div>

        <style jsx>{`
          .room-card {
            background: var(--surface-card); border: 1px solid rgba(212,175,55,0.08);
            border-radius: var(--radius-lg); overflow: hidden;
            transition: all 0.4s var(--ease-out); height: 100%;
          }
          .room-card:hover { border-color: rgba(212,175,55,0.2); box-shadow: var(--shadow-gold); transform: translateY(-6px); }
          .room-card__img-wrap { position: relative; height: 220px; overflow: hidden; }
          .room-card:hover .room-card__img-wrap img { transform: scale(1.08); }
          .room-card__img-wrap img { transition: transform 0.6s var(--ease-out) !important; }
          .room-card__overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(11,30,58,0.7), transparent); }
          .room-card__badge { position: absolute; top: 12px; right: 12px; }
          .room-card__body { padding: 20px; }
          .room-card__name { font-family: var(--font-heading); font-size: 1.25rem; margin: 6px 0 8px; color: var(--warm-white); }
          .room-card__desc { font-size: 0.85rem; color: var(--cool-gray); line-height: 1.5; margin-bottom: 14px; }
          .room-card__meta { display: flex; flex-wrap: wrap; gap: 14px; font-size: 0.78rem; color: var(--cool-gray); margin-bottom: 16px; }
          .room-card__meta span { display: flex; align-items: center; gap: 5px; }
          .room-card__footer { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.06); }
          .room-card__amount { font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700; color: var(--gold); }
          .room-card__per { font-size: 0.78rem; color: var(--cool-gray); }
        `}</style>
      </Link>
    </motion.div>
  );
}
