import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import ProductService from '../services/ProductService';
import { slugify } from '../utils/slugify';

// ============================================
// SEARCH RESULTS PAGE
// ============================================

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await ProductService.getAllProducts();
      setAllProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Re-fetch products when page becomes visible to get newly added items
  useEffect(() => {
    const handleVisibility = () => {
      if (!document.hidden) {
        ProductService.getAllProducts().then(data => {
          if (data.length > 0) {
            setAllProducts(data);
          }
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    return allProducts.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.price.toLowerCase().includes(lowerQuery)
    );
  }, [query, allProducts]);

  const ProductCardSearch: React.FC<{ product: Product }> = ({ product }) => (
    <div
      onClick={() => navigate(`/product/${slugify(product.name)}`)}
      className="group cursor-pointer"
    >
      <div className="relative w-full aspect-square bg-gray-900 rounded-sm overflow-hidden mb-4 border border-gray-800 hover:border-blue-500 transition-colors flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <h3 className="text-sm font-bold text-gray-300 group-hover:text-blue-500 transition-colors line-clamp-2 mb-2">
        {product.name}
      </h3>
      {product.model || product.series ? (
        <div className="text-xs text-gray-500 space-y-0.5 mb-2">
          {product.model && <p>Model: {product.model}</p>}
          {product.series && <p>Series: {product.series}</p>}
        </div>
      ) : null}
      <p className="text-blue-500 font-black">{product.price}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* PAGE HEADER */}
      <section className="bg-gradient-to-b from-blue-600/20 to-transparent py-20 px-4">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4">Search Results</h1>
          <p className="text-gray-400 text-lg">
            {results.length > 0
              ? `Found ${results.length} product${results.length !== 1 ? 's' : ''} matching "${query}"`
              : `No products found for "${query}"`}
          </p>
        </div>
      </section>

      {/* RESULTS */}
      <section className="max-w-[1400px] mx-auto px-4 py-12">
        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map(product => (
              <ProductCardSearch key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-6">No products match your search. Try different keywords.</p>
            <button
              onClick={() => navigate('/shop')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-sm transition-colors"
            >
              Browse All Products
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchResults;
