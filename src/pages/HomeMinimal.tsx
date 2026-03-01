import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { slugify } from '../utils/slugify';
import { Product } from '../types';
import { Truck, Headset, RefreshCcw, ShieldCheck, Factory, Zap, Wind, Cog, Wrench, Package } from 'lucide-react';
import ProductService from '../services/ProductService';
import WhatsAppButton from '../components/WhatsAppButton';

const HomeMinimal: React.FC = () => {
  const navigate = useNavigate();
  // show categories instead of individual products on this minimal home
  const categories = CATEGORIES.slice(0, 6);

  // dynamic layout heights removed to simplify flow
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

  // Fetch all products on mount
  useEffect(() => {
    ProductService.getAllProducts().then((data) => {
      setAllProducts(data || []);
    });
  }, []);

  // When a category is selected, filter products
  useEffect(() => {
    if (selectedCategory) {
      const filtered = allProducts.filter((p) => p.category === selectedCategory);
      setCategoryProducts(filtered);
    } else {
      setCategoryProducts([]);
    }
  }, [selectedCategory, allProducts]);


  return (
    <div className="w-full overflow-hidden bg-black text-white">
      <div className="flex flex-col">
        {!selectedCategory && (
          <>
            {/* HERO: use same hero layout/text as main Home page */}
            <section className="relative w-full">
              <div className="relative flex items-center w-full h-[50vh] bg-[#111111]">
                <video
                  src="/assets/hero.mp4"
                  poster="/assets/hero.jpg"
                  autoPlay
                  loop
                  muted
                  className="absolute inset-0 w-full h-full object-cover opacity-60 bg-black"
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 px-8 lg:px-16 space-y-4 max-w-3xl">
                  <p className="text-blue-500 italic text-xl font-medium">Premium Industrial Grade</p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                    Advanced Textile Machinery Solutions
                  </h1>
                  <button
                    onClick={() => navigate('/shop')}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-sm uppercase text-sm font-bold transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </section>
            {/* small content (restored) */}
            <div className="flex-none flex items-center justify-center px-4 sm:px-6 py-4">
              <p className="text-center text-sm lg:text-base text-gray-300 max-w-2xl">
                Trusted by industry leaders — fast delivery, genuine spares, and expert support.
              </p>
            </div>

            {/* heading (restored) */}
            <div className="flex-none flex items-center justify-start px-4 sm:px-6 py-4">
              <div>
                <h2 className="text-base sm:text-lg lg:text-2xl font-bold">Products</h2>
                <h3 className="text-xs sm:text-sm text-gray-400 mt-1">ALL TYPE OF WEAVING MACHINE AVAILABLE</h3>
              </div>
            </div>
          </>
        )}

        {/* categories grid (exact trust-badges style) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 px-2 sm:px-6">
          {selectedCategory ? (
            // Show filtered products for selected category
            <div className="col-span-full h-full overflow-y-auto flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                <h2 className="text-lg font-bold">Products</h2>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-sm transition-colors"
                >
                  ← Back
                </button>
              </div>
              {categoryProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-4">
                  {categoryProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => navigate(`/product/${slugify(p.name)}`)}
                      className="flex flex-col items-center bg-[#080808] p-2 sm:p-3 border border-gray-800 rounded-sm cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-full h-16 object-cover rounded-sm mb-2" />
                      ) : (
                        <div className="w-full h-16 bg-gray-800 rounded-sm mb-2 flex items-center justify-center text-gray-500 text-xs">No Image</div>
                      )}
                      <h4 className="text-xs sm:text-xs font-bold text-center line-clamp-2">{p.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">{p.price}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">No products in this category</div>
              )}
            </div>
          ) : (
            // Show category buttons
            categories.map((cat, idx) => {
              const icons = [Factory, Zap, Wind, Cog, Wrench, Package];
              const Icon = icons[idx % icons.length];
              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="flex flex-col items-center justify-center gap-2 sm:gap-3 p-2 sm:p-4 bg-[#080808] border border-gray-800 rounded-sm group hover:border-blue-500 transition-colors cursor-pointer h-full"
                >
                  <Icon className="text-blue-500 w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-xs sm:text-sm font-bold uppercase text-center">{cat.name}</h3>
                </div>
              );
            })
          )}
        </section>

      </div>
      <WhatsAppButton />
    </div>
  );
};

export default HomeMinimal;
