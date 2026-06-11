import HeroSection from '@/components/customer/HeroSection';
import TestimonialsSection from '@/components/customer/TestimonialsSection';
import RoomCard from '@/components/customer/RoomCard';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Wifi, Car, Dumbbell, Waves, UtensilsCrossed, SpadeIcon as Spa, ArrowRight } from 'lucide-react';

const amenities = [
  { icon: '🏊', title: 'Infinity Pool', desc: 'Rooftop pool with panoramic views' },
  { icon: '🍽️', title: 'Fine Dining', desc: 'World-class culinary experiences' },
  { icon: '💆', title: 'Luxury Spa', desc: 'Rejuvenating treatments & therapies' },
  { icon: '📶', title: 'High-Speed WiFi', desc: 'Complimentary throughout the hotel' },
  { icon: '🚗', title: 'Valet Parking', desc: 'Complimentary luxury valet service' },
  { icon: '💪', title: 'Fitness Center', desc: '24/7 state-of-the-art gym' },
];

export default async function HomePage() {
  const featuredRooms = await prisma.room.findMany({ take: 6, orderBy: { price: 'desc' } });

  return (
    <>
      <HeroSection />

      {/* Featured Rooms */}
      <section className="section" style={{ background: 'var(--navy-dark)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <span className="label">Accommodation</span>
            <h2 style={{ marginTop: 8 }}>Featured Rooms & Suites</h2>
            <div className="divider" style={{ margin: '16px auto' }} />
            <p className="subtitle" style={{ maxWidth: 560, margin: '0 auto' }}>Discover our handpicked selection of the finest rooms and suites.</p>
          </div>
          <div className="grid-3">
            {featuredRooms.map((room, i) => (
              <RoomCard key={room.id} room={room} index={i} />
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 40 }}>
            <Link href="/rooms" className="btn btn-secondary btn-lg">View All Rooms <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="section" style={{ background: 'var(--navy)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <span className="label">World-Class</span>
            <h2 style={{ marginTop: 8 }}>Hotel Amenities</h2>
            <div className="divider" style={{ margin: '16px auto' }} />
          </div>
          <div className="grid-3">
            {amenities.map((a, i) => (
              <div key={i} className="card text-center" style={{ padding: '32px 24px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>{a.icon}</div>
                <h4 style={{ color: 'var(--gold)', marginBottom: 8 }}>{a.title}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--cool-gray)' }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* CTA Section */}
      <section style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <span className="label">Begin Your Journey</span>
          <h2 style={{ marginTop: 8, marginBottom: 16 }}>Ready to Experience <span className="text-gold">Auralis</span>?</h2>
          <p className="subtitle" style={{ maxWidth: 500, margin: '0 auto 32px' }}>Book your stay today and discover why Auralis is the world&apos;s premier luxury destination.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/rooms" className="btn btn-primary btn-lg">Browse Rooms</Link>
            <Link href="/food" className="btn btn-secondary btn-lg">Explore Dining</Link>
          </div>
        </div>
      </section>
    </>
  );
}
