
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
  {
    id: 1,
    name: 'Rieter R35',
    model: 'Rieter',
    series: 'R35',
    price: '$200000',
    image: '/assets/shutterstock_1069102985-1920w.jpeg',
    category: 1,
    description: 'High-speed ring spinning frame with advanced automation',
    features: ['High-precision spindles', 'Auto doffing', 'Energy efficient', '24/7 support'],
    sku: 'TM-1-001',
    warranty: '24 Months',
    shipping: '2-5 Business Days'
  },
  {
    id: 2,
    name: 'Sulzer S500',
    model: 'Sulzer',
    series: 'S500',
    price: '$350000',
    image: '/assets/shutterstock_1069102985-1920w.jpeg',
    category: 2,
    description: 'Advanced air-jet weaving machine for high production',
    features: ['High speed', 'Low noise', 'Flexible design', 'Easy maintenance'],
    sku: 'TM-2-001',
    warranty: '24 Months',
    shipping: '2-5 Business Days'
  },
  {
    id: 3,
    name: 'Stoll CMS',
    model: 'Stoll',
    series: 'CMS',
    price: '$150000',
    image: '/assets/shutterstock_1069102985-1920w.jpeg',
    category: 3,
    description: 'Professional knitting machine for textile production',
    features: ['Precision control', 'Multiple gauge options', 'Compact design'],
    sku: 'TM-3-001',
    warranty: '24 Months',
    shipping: '2-5 Business Days'
  },
  {
    id: 4,
    name: 'ALSTOM H300',
    model: 'ALSTOM',
    series: 'H300',
    price: '$280000',
    image: '/assets/shutterstock_1069102985-1920w.jpeg',
    category: 4,
    description: 'Industrial dyeing and processing machine',
    features: ['Temperature control', 'Chemical dosing', 'Eco-friendly', 'Automation ready'],
    sku: 'TM-4-001',
    warranty: '24 Months',
    shipping: '2-5 Business Days'
  }
];

export const SPECIAL_OFFERS = [
  {
    id: 5,
    name: 'Rieter R25',
    model: 'Rieter',
    series: 'R25',
    price: '$180000',
    specialOfferPrice: '$150000',
    discount: '15% OFF',
    image: '/assets/shutterstock_1069102985-1920w.jpeg',
    category: 1,
    isSpecialOffer: true,
    countdown: true,
    description: 'Special promotion on selected spinning frames',
    features: ['High efficiency', 'Low maintenance', 'Durable construction'],
    sku: 'TM-5-001',
    warranty: '24 Months',
    shipping: '2-5 Business Days'
  }
];

export const BRAND_LOGOS = [
  '/assets/shutterstock_1069102985-1920w.jpeg',
  '/assets/shutterstock_1069102985-1920w.jpeg',
  '/assets/shutterstock_1069102985-1920w.jpeg',
  '/assets/shutterstock_1069102985-1920w.jpeg',
  '/assets/shutterstock_1069102985-1920w.jpeg'
];
