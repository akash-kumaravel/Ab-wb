import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, User } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TRENDING_PRODUCTS, SPECIAL_OFFERS } from '../constants';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 flex flex-col md:flex-row items-center justify-between gap-6 bg-black py-8 px-4 md:px-10">
      <Link to="/" className="text-4xl font-black tracking-tighter hover:text-blue-500 transition-colors cursor-pointer">
        AUTIMA
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
          to="/shop"
          className={`transition-colors ${isActive('/shop') ? 'text-blue-500' : 'hover:text-blue-500'}`}
        >
          Shop
        </Link>
        <Link
          to="/blog"
          className={`transition-colors ${isActive('/blog') ? 'text-blue-500' : 'hover:text-blue-500'}`}
        >
          Blog
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
    <div className="flex items-center space-x-8">
      <AdminIcon navigate={navigate} />
    </div>
  );
};


const AdminIcon: React.FC<{ navigate: any }> = ({ navigate }) => (
  <div 
    className="flex items-center gap-3 cursor-pointer group"
    onClick={() => navigate('/admin')}
  >
    <div className="relative">
      <User size={24} className="group-hover:text-blue-500 transition-colors" />
    </div>
    <span className="hidden lg:block text-xs uppercase font-bold text-gray-400 group-hover:text-white transition-colors">
      Admin
    </span>
  </div>
);

export default Header;
