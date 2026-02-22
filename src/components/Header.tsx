import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, User, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TRENDING_PRODUCTS, SPECIAL_OFFERS } from '../constants';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const { open, setOpen } = useHeaderDrawer() as any;

  return (
    <header className={`sticky top-0 z-50 bg-black flex flex-row items-center justify-between gap-4 py-2 px-4 md:px-10`}>
      <Link to="/" className={`text-2xl md:text-4xl font-black tracking-tighter hover:text-blue-500 transition-colors cursor-pointer text-left`}>
        <img src="/assets/logo.png" alt="AB Textile Logo" className="h-12 md:h-20 object-contain" />
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

      <div className="flex items-center gap-3">
        <HeaderIcons open={open} setOpen={setOpen} />
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-900"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
};

const HeaderIcons: React.FC<{ open: boolean; setOpen: (v: boolean) => void }> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="hidden lg:flex items-center">
        <AdminButton navigate={navigate} />
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-black p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <Link to="/" onClick={() => setOpen(false)}>
                <img src="/assets/logo.png" alt="AB Textile Logo" className="h-10 object-contain" />
              </Link>
              <button onClick={() => setOpen(false)} className="p-2 rounded-md hover:bg-gray-900" aria-label="Close navigation">
                <X size={20} />
              </button>
            </div>

            <nav className="mt-6 flex flex-col space-y-4 text-sm font-bold uppercase">
              <Link to="/" onClick={() => setOpen(false)} className="hover:text-blue-500">Home</Link>
              <Link to="/all-products" onClick={() => setOpen(false)} className="hover:text-blue-500">All Products</Link>
              <Link to="/shop" onClick={() => setOpen(false)} className="hover:text-blue-500">Shop</Link>
              <Link to="/about" onClick={() => setOpen(false)} className="hover:text-blue-500">About</Link>
              <Link to="/contact" onClick={() => setOpen(false)} className="hover:text-blue-500">Contact Us</Link>
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-sm"
              >
                <User size={16} />
                <span>Admin Panel</span>
              </Link>
            </nav>
          </aside>
        </div>
      )}
    </>
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

// Side drawer state for mobile
function useHeaderDrawer() {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
}
 
