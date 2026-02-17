import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TRENDING_PRODUCTS, SPECIAL_OFFERS, CATEGORIES } from '../constants';
import { Product } from '../types';
import ProductService from '../services/ProductService';

// ============================================
// SHOP PAGE
// ============================================

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    searchParams.get('category') ? parseInt(searchParams.get('category') || '0') : null
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await ProductService.getAllProducts();
      // If no products from API, use fallback constants
      setProducts(data.length > 0 ? data : [...TRENDING_PRODUCTS, ...SPECIAL_OFFERS]);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(p => {
        // Simple category filtering based on product ID mapped to category ID
        const categoryId = (p.id % CATEGORIES.length) + 1;
        return categoryId === selectedCategory;
      })
    : products;

  const ProductCardShop: React.FC<{ product: Product }> = ({ product }) => (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer"
    >
      <div className="relative w-full aspect-square bg-gray-900 rounded-sm overflow-hidden mb-4 border border-gray-800 hover:border-blue-500 transition-colors">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="text-sm font-bold text-gray-300 group-hover:text-blue-500 transition-colors line-clamp-2 mb-2">
        {product.name}
      </h3>
      <p className="text-blue-500 font-black">{product.price}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* PAGE HEADER */}
      <section className="bg-gradient-to-b from-blue-600/20 to-transparent py-20 px-4">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4">Shop Textile Machinery</h1>
          <p className="text-gray-400 text-lg">
            Discover our comprehensive collection of premium textile machinery and equipment
          </p>
        </div>
      </section>

      {/* FILTERS AND PRODUCTS */}
      <section className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* SIDEBAR FILTERS */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 p-6 rounded-sm border border-gray-800 sticky top-4">
              <h3 className="text-lg font-bold text-white mb-6">Categories</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-4 py-2 rounded-sm transition-colors ${
                    selectedCategory === null
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  All Products ({allProducts.length})
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-4 py-2 rounded-sm transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* PRODUCTS GRID */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-400">
                Showing <span className="text-white font-bold">{filteredProducts.length}</span> products
              </p>
              <select className="bg-gray-900 text-white px-4 py-2 rounded-sm border border-gray-800 focus:border-blue-500 outline-none">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCardShop key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-400 text-lg">No products found in this category</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
