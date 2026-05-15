'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';

export default function HeroSection(){
    return(
        <section className="hero">

            <div className="hero__bg" />

           <div className="hero__content container">
                <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}>
          <div className="hero__stars">
            {[...Array(5)].map((_,i) => <Star key={i} size={14} fill="var(--gold)" color="var(--gold)" />)}
          </div>
          <h1 className="hero__title">Where Luxury<br /><span className="text-gold">Meets You</span></h1>
          <p className="hero__sub">Experience unparalleled elegance at Auralis. From breathtaking suites to world-class dining, every moment is crafted for extraordinary living.</p>
          <div className="hero__cta">
            <Link href="/rooms" className="btn btn-primary btn-lg">Explore Rooms <ArrowRight size={18} /></Link>
            <Link href="/food" className="btn btn-secondary btn-lg">Fine Dining</Link>
          </div>
        </motion.div>
            </div> 

            <div className="hero__scroll-indicator">
        <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity, duration:1.5 }}>
          <div className="hero__scroll-dot" />
        </motion.div>
      </div>

      <style jsx>{`
        .hero { position:relative; min-height:100vh; display:flex; align-items:center; overflow:hidden; }
        .hero__bg { position:absolute; inset:0; background:url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80') center/cover; }
        .hero__bg::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg, rgba(7,15,29,0.88) 0%, rgba(11,30,58,0.75) 50%, rgba(7,15,29,0.9) 100%); }
        .hero__content { position:relative; z-index:2; max-width:700px; padding-top:80px; }
        .hero__stars { display:flex; gap:4px; margin-bottom:16px; }
        .hero__title { font-size:clamp(2.8rem,6vw,4.5rem); font-weight:700; line-height:1.1; margin-bottom:20px; letter-spacing:-0.02em; }
        .hero__sub { font-size:1.1rem; color:var(--cool-gray); line-height:1.8; margin-bottom:32px; max-width:540px; }
        .hero__cta { display:flex; gap:16px; flex-wrap:wrap; }
        .hero__scroll-indicator { position:absolute; bottom:40px; left:50%; transform:translateX(-50%); z-index:2; }
        .hero__scroll-dot { width:6px; height:6px; border-radius:50%; background:var(--gold); }
      `}</style>
        </section>
    )
}