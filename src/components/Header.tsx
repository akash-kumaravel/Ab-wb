import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, User } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TRENDING_PRODUCTS, SPECIAL_OFFERS } from '../constants';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 bg-black flex flex-row items-center justify-between gap-4 py-4 px-4 md:px-10`}>
      <Link to="/" className={`flex-1 text-2xl md:text-4xl font-black tracking-tighter hover:text-blue-500 transition-colors cursor-pointer text-left`}>
        <span className="block">AB TEXTILE<br/>MACHINARY</span>
      </Link>

      {/* NAVIGATION LINKS */}
      <div className="hidden lg:flex items-center space-x-10 text-sm font-bold uppercase tracking-wider">
        <Link
          to="/"
          className={`transition-colors ${isActive('/') ? 'text-blue-500' : 'hover:text-blue-500'}`}
        >
          Home
        </Link>
        <Link
          to="/all-products"
          className={`transition-colors ${isActive('/all-products') ? 'text-blue-500' : 'hover:text-blue-500'}`}
        >
          All Products
        </Link>
        <Link
          to="/shop"
          className={`transition-colors ${isActive('/shop') ? 'text-blue-500' : 'hover:text-blue-500'}`}
        >
          Shop
        </Link>
        <Link
          to="/about"
          className={`transition-colors ${isActive('/about') ? 'text-blue-500' : 'hover:text-blue-500'}`}
        >
          About
        </Link>
        <Link
          to="/contact"
          className={`transition-colors ${isActive('/contact') ? 'text-blue-500' : 'hover:text-blue-500'}`}
        >
          Contact Us
        </Link>
      </div>

      <HeaderIcons />
    </header>
  );
};

const HeaderIcons: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center">
      <AdminButton navigate={navigate} />
    </div>
  );
};


const AdminButton: React.FC<{ navigate: any }> = ({ navigate }) => (
  <button
    onClick={() => navigate('/admin')}
    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-sm border border-blue-700 text-xs font-bold transition-all"
    aria-label="Admin"
  >
    <User size={14} />
    <span className="hidden sm:inline">Admin</span>
  </button>
);

export default Header;
