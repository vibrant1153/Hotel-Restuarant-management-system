"use client";

import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

const Facebook = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Twitter = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const Instagram = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <h3 className="footer__logo">AURALIS</h3>
            <p className="footer__tagline">LUXURY HOTEL & RESORT</p>
            <p className="subtitle" style={{ fontSize: '0.88rem', marginTop: '16px' }}>
              Where every moment becomes an unforgettable memory. Experience the pinnacle of luxury hospitality.
            </p>
            <div className="footer__socials">
              <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
            </div>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Quick Links</h4>
            <Link href="/rooms" className="footer__link">Our Rooms</Link>
            <Link href="/food" className="footer__link">Fine Dining</Link>
            <Link href="/profile" className="footer__link">My Account</Link>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Contact</h4>
            <div className="footer__contact"><MapPin size={15} /> 123 Luxury Avenue, Beverly Hills</div>
            <div className="footer__contact"><Phone size={15} /> +1 (800) AURALIS</div>
            <div className="footer__contact"><Mail size={15} /> hello@auralis.com</div>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Auralis Hotel & Resort. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .footer { background: var(--navy-dark); border-top: 1px solid rgba(212,175,55,0.1); padding: 64px 0 0; margin-top: auto; }
        .footer__grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px; }
        .footer__logo { font-family: var(--font-heading); color: var(--gold); letter-spacing: 6px; font-size: 1.6rem; margin-bottom: 2px; }
        .footer__tagline { font-size: 0.6rem; color: var(--cool-gray); letter-spacing: 3px; }
        .footer__socials { display: flex; gap: 12px; margin-top: 20px; }
        .footer__socials a { color: var(--cool-gray); transition: color 0.25s; }
        .footer__socials a:hover { color: var(--gold); }
        .footer__heading { font-family: var(--font-body); font-size: 0.8rem; font-weight: 600; color: var(--gold); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; }
        .footer__link { display: block; color: var(--cool-gray); font-size: 0.9rem; padding: 6px 0; transition: color 0.2s; }
        .footer__link:hover { color: var(--gold); }
        .footer__contact { display: flex; align-items: center; gap: 10px; color: var(--cool-gray); font-size: 0.88rem; padding: 6px 0; }
        .footer__bottom { margin-top: 48px; padding: 20px 0; border-top: 1px solid rgba(255,255,255,0.06); text-align: center; color: var(--cool-gray); font-size: 0.8rem; }
        @media (max-width: 768px) { .footer__grid { grid-template-columns: 1fr; gap: 32px; } }
      `}</style>
    </footer>
  );
}
