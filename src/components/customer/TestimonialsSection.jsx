'use client';
import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  { name: 'Victoria Harrington', role: 'CEO, Harrington Corp', text: 'Auralis redefined my understanding of luxury. The Presidential Suite was beyond magnificent.', rating: 5 },
  { name: 'James Chen', role: 'Travel Blogger', text: 'From the moment I stepped in, every detail whispered elegance. The dining experience was world-class.', rating: 5 },
  { name: 'Sophia Laurent', role: 'Fashion Designer', text: 'The attention to detail is unparalleled. I felt like royalty throughout my entire stay at Auralis.', rating: 5 },
  { name: 'Alexander Reid', role: 'Film Director', text: 'A sanctuary of sophistication. The spa and ocean views made this my most memorable retreat.', rating: 5 },
];