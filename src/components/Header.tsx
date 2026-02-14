import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Heart, ShoppingCart, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TRENDING_PRODUCTS, SPECIAL_OFFERS } from '../constants';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allProducts = useMemo(() => [...TRENDING_PRODUCTS, ...SPECIAL_OFFERS], []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const lowerQuery = searchQuery.toLowerCase();
    return allProducts
      .filter(product =>
        product.name.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 6);
  }, [searchQuery, allProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowDropdown(false);
    }
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
    setSearchQuery('');
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-6 bg-black py-8 px-4 md:px-10">
      <Link to="/" className="text-4xl font-black tracking-tighter hover:text-blue-500 transition-colors cursor-pointer">
        AUTIMA
      </Link>

      <SearchBar
        onSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        searchResults={searchResults}
        onProductClick={handleProductClick}
        dropdownRef={dropdownRef}
      />

      <HeaderIcons />
    </header>
  );
};


interface SearchBarProps {
  onSearch: (e: React.FormEvent) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  searchResults: any[];
  onProductClick: (productId: number) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  searchQuery,
  setSearchQuery,
  showDropdown,
  setShowDropdown,
  searchResults,
  onProductClick,
  dropdownRef,
}) => (
  <form onSubmit={onSearch} className="flex-1 max-w-2xl w-full relative" ref={dropdownRef}>
    <input
      type="text"
      placeholder="Search products..."
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        setShowDropdown(true);
      }}
      onFocus={() => searchQuery && setShowDropdown(true)}
      className="w-full bg-[#111111] border border-gray-800 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-blue-500 transition-colors"
    />
    <button
      type="submit"
      className="absolute right-0 top-0 bottom-0 bg-blue-600 hover:bg-blue-700 px-8 rounded-full flex items-center gap-2 text-sm font-bold transition-all uppercase"
    >
      <Search size={18} />
      Search
    </button>

    {/* DROPDOWN SUGGESTIONS */}
    {showDropdown && searchQuery.trim() && (
      <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-sm shadow-xl z-50">
        {searchResults.length > 0 ? (
          <div className="max-h-96 overflow-y-auto">
            {searchResults.map((product) => (
              <div
                key={product.id}
                onClick={() => onProductClick(product.id)}
                className="flex items-center gap-3 p-3 border-b border-gray-800 hover:bg-gray-800 cursor-pointer transition-colors last:border-b-0"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{product.name}</p>
                  <p className="text-xs text-blue-500 font-bold">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-400 text-sm">
            No products found for "{searchQuery}"
          </div>
        )}
      </div>
    )}
  </form>
);


const HeaderIcons: React.FC = () => (
  <div className="flex items-center space-x-8">
    <WishlistIcon />
    <CartIcon />
  </div>
);


const WishlistIcon: React.FC = () => (
  <div className="flex items-center gap-3 cursor-pointer group">
    <div className="relative">
      <Heart size={24} className="group-hover:text-blue-500 transition-colors" />
      <span className="absolute -top-2 -right-2 bg-blue-600 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
        0
      </span>
    </div>
    <span className="hidden lg:block text-xs uppercase font-bold text-gray-400 group-hover:text-white transition-colors">
      Wishlist
    </span>
  </div>
);


const CartIcon: React.FC = () => (
  <div className="flex items-center gap-3 cursor-pointer group">
    <div className="relative">
      <ShoppingCart size={24} className="group-hover:text-blue-500 transition-colors" />
      <span className="absolute -top-2 -right-2 bg-blue-600 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
        0
      </span>
    </div>
    <div className="hidden lg:flex flex-col">
      <span className="text-xs uppercase font-bold text-gray-400 group-hover:text-white transition-colors">
        Cart
      </span>
      <span className="text-sm font-bold">$0.00</span>
    </div>
  </div>
);

export default Header;
