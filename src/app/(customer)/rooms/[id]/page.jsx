import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency, getRoomTypeLabel } from '@/lib/utils';
import { Users, BedDouble, Maximize, MapPin, Wifi, Wind, Tv, Coffee, ArrowLeft } from 'lucide-react';

export default async function RoomDetailPage({ params }) {
  const { id } = await params;
  const room = await prisma.room.findUnique({ where: { id } });
  if (!room) notFound();

  return (
    <div style={{ paddingTop: 80 }}>
      <section className="section" style={{ background: 'var(--navy-dark)' }}>
        <div className="container">
          <Link href="/rooms" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--gold)', marginBottom: 24, fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Rooms
          </Link>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32 }}>
            {/* Images */}
            <div>
              <div style={{ position: 'relative', height: 420, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <Image src={room.images?.[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'} alt={room.name} fill style={{ objectFit: 'cover' }} />
              </div>
              {room.images?.length > 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(room.images.length - 1, 3)}, 1fr)`, gap: 12, marginTop: 12 }}>
                  {room.images.slice(1, 4).map((img, i) => (
                    <div key={i} style={{ position: 'relative', height: 120, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                      <Image src={img} alt={`${room.name} ${i + 2}`} fill style={{ objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Details */}
            <div>
              <span className="label">{getRoomTypeLabel(room.type)}</span>
              <h1 style={{ marginTop: 8, fontSize: 'clamp(1.6rem,3vw,2.4rem)' }}>{room.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <span className={`badge ${room.status === 'AVAILABLE' ? 'badge-green' : room.status === 'OCCUPIED' ? 'badge-gold' : 'badge-red'}`}>{room.status}</span>
                <span style={{ color: 'var(--cool-gray)', fontSize: '0.85rem' }}>Floor {room.floor}</span>
              </div>
              <p style={{ color: 'var(--cool-gray)', lineHeight: 1.8, margin: '20px 0' }}>{room.description}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 24 }}>
                <div className="card" style={{ padding: 16, textAlign: 'center' }}>
                  <Users size={20} style={{ color: 'var(--gold)', marginBottom: 6 }} />
                  <p style={{ fontSize: '0.75rem', color: 'var(--cool-gray)' }}>Capacity</p>
                  <p style={{ fontWeight: 600 }}>{room.capacity} Guests</p>
                </div>
                <div className="card" style={{ padding: 16, textAlign: 'center' }}>
                  <BedDouble size={20} style={{ color: 'var(--gold)', marginBottom: 6 }} />
                  <p style={{ fontSize: '0.75rem', color: 'var(--cool-gray)' }}>Bed Type</p>
                  <p style={{ fontWeight: 600 }}>{room.bedType}</p>
                </div>
                <div className="card" style={{ padding: 16, textAlign: 'center' }}>
                  <Maximize size={20} style={{ color: 'var(--gold)', marginBottom: 6 }} />
                  <p style={{ fontSize: '0.75rem', color: 'var(--cool-gray)' }}>Size</p>
                  <p style={{ fontWeight: 600 }}>{room.size || '—'} m²</p>
                </div>
              </div>
              <h4 style={{ color: 'var(--gold)', marginBottom: 12 }}>Amenities</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                {room.amenities?.map((a, i) => <span key={i} className="badge badge-blue">{a}</span>)}
              </div>
              <div className="glass" style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: 'var(--gold)' }}>{formatCurrency(room.price)}</span>
                  <span style={{ color: 'var(--cool-gray)', fontSize: '0.85rem' }}> / night</span>
                </div>
                <button className="btn btn-primary btn-lg" disabled={room.status !== 'AVAILABLE'}>
                  {room.status === 'AVAILABLE' ? 'Reserve This Room' : 'Not Available'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
