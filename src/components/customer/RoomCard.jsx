'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Maximize, BedDouble } from 'lucide-react';
import { formatCurrency, getRoomTypeLabel } from '@/lib/utils';
import { motion } from 'framer-motion';

export default RoomCard({room,index = 0}){
    return(
        <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    ></motion.div>
    )
}