import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { slugify } from '../utils/slugify';
import ProductService, { Product } from '../services/ProductService';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch products from server on mount
  useEffect(() => {
    ProductService.getAllProducts().then(data => {
      setAllProducts(data);
    });
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const lowerQuery = searchQuery.toLowerCase();
    return allProducts
      .filter(product =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.model?.toLowerCase().includes(lowerQuery) ||
        product.series?.toLowerCase().includes(lowerQuery)
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

  const handleProductClick = (product: Product) => {
    navigate(`/product/${slugify(product.name)}`);
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
    <nav className="sticky top-[88px] z-50 flex items-center justify-center py-4 px-4">
      <div className="max-w-xl w-full relative" ref={dropdownRef}>
        <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => searchQuery && setShowDropdown(true)}
              className="w-full bg-black border border-gray-800 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-blue-500 transition-colors"
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
                        onClick={() => handleProductClick(product)}
                        className="flex items-center gap-3 p-3 border-b border-gray-800 hover:bg-gray-800 cursor-pointer transition-colors last:border-b-0"
                      >
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-sm"
                            onError={(e) => {
                              const img = e.target as HTMLImageElement;
                              img.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80';
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-800 rounded-sm flex items-center justify-center text-gray-500 text-xs">
                            No Img
                          </div>
                        )}
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
        </div>
      </nav>
    );
  };

export default Navigation;
