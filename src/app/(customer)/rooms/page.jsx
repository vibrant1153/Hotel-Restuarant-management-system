'use client';
import { useState, useEffect } from 'react';
import RoomCard from '@/components/customer/RoomCard';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (typeFilter) params.set('type', typeFilter);
    if (statusFilter) params.set('status', statusFilter);
    if (search) params.set('search', search);
    const timeout = setTimeout(() => {
      fetch(`/api/rooms?${params}`).then(r => r.json()).then(d => { setRooms(d); setLoading(false); });
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, typeFilter, statusFilter]);

  return (
    <div style={{ paddingTop: 100 }}>
      <section style={{ background: 'var(--navy)', padding: '48px 0' }}>
        <div className="container text-center">
          <span className="label">Accommodation</span>
          <h1 style={{ marginTop: 8 }}>Our Rooms & Suites</h1>
          <div className="divider" style={{ margin: '16px auto' }} />
          <p className="subtitle" style={{ maxWidth: 560, margin: '0 auto' }}>Find your perfect retreat from our collection of luxury rooms.</p>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--navy-dark)' }}>
        <div className="container">
          <div className="rooms-filters glass" style={{ padding: '20px 24px', marginBottom: 32, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
              <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--cool-gray)' }} />
              <input className="input" placeholder="Search rooms..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 40, width: '100%' }} />
            </div>
            <select className="input" value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ minWidth: 160 }}>
              <option value="">All Types</option>
              <option value="STANDARD">Standard</option>
              <option value="DELUXE">Deluxe</option>
              <option value="SUITE">Suite</option>
              <option value="PRESIDENTIAL">Presidential</option>
            </select>
            <select className="input" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ minWidth: 160 }}>
              <option value="">All Status</option>
              <option value="AVAILABLE">Available</option>
              <option value="OCCUPIED">Occupied</option>
              <option value="MAINTENANCE">Maintenance</option>
            </select>
          </div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner" /></div>
          ) : rooms.length === 0 ? (
            <div className="text-center" style={{ padding: 80, color: 'var(--cool-gray)' }}><p>No rooms found matching your criteria.</p></div>
          ) : (
            <div className="grid-3">{rooms.map((room, i) => <RoomCard key={room.id} room={room} index={i} />)}</div>
          )}
        </div>
      </section>
    </div>
  );
}
