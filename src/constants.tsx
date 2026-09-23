
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
    icon: '/assets/C Sulzer.png',
    subCategories: ['Weaving Machines', 'Parts', 'Accessories']
  },
  {
    id: 2,
    name: 'Air-Jet Weaving Machine',
    icon: '/assets/C  Air Jet.png',
    subCategories: ['Air-Jet Looms', 'Components', 'Upgrades']
  },
  {
    id: 3,
    name: 'Rapier Weaving Machine',
    icon: '/assets/C Rapier weawing.png',
    subCategories: ['Rapier Looms', 'Components', 'Upgrades']
  },
  {
    id: 4,
    name: 'OE Machine',
    icon: '/assets/C Oe machine.png',
    subCategories: ['Original Equipment', 'OE Parts', 'Accessories']
  },
  {
    id: 5,
    name: 'Sulzer Spares',
    icon: '/assets/C Sulzar spare.jpg',
    subCategories: ['Spindles', 'Rollers', 'Needles', 'Modules']
  },
  {
    id: 6,
    name: 'Airjet Spares',
    icon: '/assets/C Airjet spare.jpg',
    subCategories: ['Nozzles', 'Channels', 'Sensors', 'Modules']
  },
  {
    id: 7,
    name: 'Scrap',
    icon: '/assets/C scarap.jpg',
    subCategories: ['Metal Scrap', 'Machine Scrap', 'Waste Materials']
  }
];

export const BRAND_LOGOS = [
  '/assets/shutterstock_1069102985-1920w.jpeg',
  '/assets/shutterstock_1069102985-1920w.jpeg',
  '/assets/shutterstock_1069102985-1920w.jpeg',
  '/assets/shutterstock_1069102985-1920w.jpeg',
  '/assets/shutterstock_1069102985-1920w.jpeg'
];
