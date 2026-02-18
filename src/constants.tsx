
import React from 'react';
import { Truck, ShieldCheck, RefreshCcw, Headset } from 'lucide-react';

export const BLUE_ACCENT = '#3b82f6';

export const TRUST_BADGES = [
  {
    id: 1,
    title: 'Fast Delivery',
    description: 'Quick shipping on machinery orders',
    icon: <Truck className="text-blue-500 w-8 h-8" />
  },
  {
    id: 2,
    title: 'Expert Support',
    description: 'Technical support 24/7',
    icon: <Headset className="text-blue-500 w-8 h-8" />
  },
  {
    id: 3,
    title: 'High Quality',
    description: 'Premium textile machinery',
    icon: <RefreshCcw className="text-blue-500 w-8 h-8" />
  },
  {
    id: 4,
    title: 'Secure Payments',
    description: 'Safe & verified transactions',
    icon: <ShieldCheck className="text-blue-500 w-8 h-8" />
  }
];

export const CATEGORIES = [
  {
    id: 1,
    name: 'Sulzer Weaving Machine',
    icon: '/assets/shutterstock_1069102985-1920w.jpeg',
    subCategories: ['Weaving Machines', 'Parts', 'Accessories']
  },
  {
    id: 2,
    name: 'Air-Jet Weaving Machine',
    icon: '/assets/shutterstock_1069102985-1920w.jpeg',
    subCategories: ['Air-Jet Looms', 'Components', 'Upgrades']
  },
  {
    id: 3,
    name: 'OE',
    icon: '/assets/shutterstock_1069102985-1920w.jpeg',
    subCategories: ['Original Equipment', 'OE Parts', 'Accessories']
  },
  {
    id: 4,
    name: 'Spares & Parts',
    icon: '/assets/shutterstock_1069102985-1920w.jpeg',
    subCategories: ['Spindles', 'Rollers', 'Needles', 'Modules']
  },
  {
    id: 5,
    name: 'Scrap',
    icon: '/assets/shutterstock_1069102985-1920w.jpeg',
    subCategories: ['Metal Scrap', 'Machine Scrap', 'Waste Materials']
  }
];

export const TRENDING_PRODUCTS = [
  { id: 1, name: 'Ring Spinning Frame RS-8000', price: '$12,500.00', category: 1, image: '/assets/shutterstock_1069102985-1920w.jpeg' },
  { id: 2, name: 'Rapier Loom - Premium Series', price: '$45,000.00', category: 2, image: '/assets/shutterstock_1069102985-1920w.jpeg' },
  { id: 3, name: 'Circular Knitting Machine CK-2000', price: '$8,900.00', category: 3, image: '/assets/shutterstock_1069102985-1920w.jpeg' },
  { id: 4, name: 'Carding Machine CM-500', price: '$9,200.00', category: 4, image: '/assets/shutterstock_1069102985-1920w.jpeg' },
  { id: 5, name: 'Warping Machine WM-3000', price: '$15,800.00', category: 1, image: '/assets/shutterstock_1069102985-1920w.jpeg' }
];

export const SPECIAL_OFFERS = [
  { id: 10, name: 'Bleaching Machine BL-1500', price: '$18,900.00', category: 4, image: '/assets/shutterstock_1069102985-1920w.jpeg' },
  { id: 11, name: 'Singeing Machine SG-2000', price: '$16,500.00', category: 2, image: '/assets/shutterstock_1069102985-1920w.jpeg', countdown: true },
  { id: 12, name: 'Winding Machine WD-1000', price: '$7,500.00', category: 1, image: '/assets/shutterstock_1069102985-1920w.jpeg', outOfStock: false },
  { id: 13, name: 'Comber Machine CB-600', price: '$11,200.00', category: 3, image: '/assets/shutterstock_1069102985-1920w.jpeg' }
];

export const BRAND_LOGOS = [
  '/assets/shutterstock_1069102985-1920w.jpeg',
  '/assets/shutterstock_1069102985-1920w.jpeg',
  '/assets/shutterstock_1069102985-1920w.jpeg',
  '/assets/shutterstock_1069102985-1920w.jpeg',
  '/assets/shutterstock_1069102985-1920w.jpeg'
];
