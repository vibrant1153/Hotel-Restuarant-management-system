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
        </section>
    )
}