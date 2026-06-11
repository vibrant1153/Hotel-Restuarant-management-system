'use client';
import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  { name: 'Victoria Harrington', role: 'CEO, Harrington Corp', text: 'Auralis redefined my understanding of luxury. The Presidential Suite was beyond magnificent.', rating: 5 },
  { name: 'James Chen', role: 'Travel Blogger', text: 'From the moment I stepped in, every detail whispered elegance. The dining experience was world-class.', rating: 5 },
  { name: 'Sophia Laurent', role: 'Fashion Designer', text: 'The attention to detail is unparalleled. I felt like royalty throughout my entire stay at Auralis.', rating: 5 },
  { name: 'Alexander Reid', role: 'Film Director', text: 'A sanctuary of sophistication. The spa and ocean views made this my most memorable retreat.', rating: 5 },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);
  const t = testimonials[current];

  return (
    <section className="testimonials section">
      <div className="container text-center">
        <span className="label">Guest Experiences</span>
        <h2 style={{ marginTop: 8 }}>What Our Guests Say</h2>
        <div className="divider" style={{ margin: '16px auto 40px' }} />
        <div className="testimonials__card glass" style={{ maxWidth: 640, margin: '0 auto', padding: '40px 32px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 16 }}>
            {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="var(--gold)" color="var(--gold)" />)}
          </div>
          <p style={{ fontSize: '1.1rem', color: 'var(--warm-white)', fontStyle: 'italic', lineHeight: 1.8, marginBottom: 24, fontFamily: 'var(--font-heading)', fontSize: '1.25rem' }}>"{t.text}"</p>
          <p style={{ fontWeight: 600, color: 'var(--gold)' }}>{t.name}</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--cool-gray)' }}>{t.role}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
            <button className="btn-icon" onClick={() => setCurrent(p => (p - 1 + testimonials.length) % testimonials.length)}><ChevronLeft size={18} /></button>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{ width: 8, height: 8, borderRadius: '50%', border: 'none', background: i === current ? 'var(--gold)' : 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.3s' }} />
            ))}
            <button className="btn-icon" onClick={() => setCurrent(p => (p + 1) % testimonials.length)}><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
