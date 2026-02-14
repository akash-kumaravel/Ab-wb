import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="flex items-center justify-center py-4 bg-[#111111] border-y border-gray-800">
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
    </nav>
  );
};

export default Navigation;
