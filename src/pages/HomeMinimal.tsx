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

  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const [heroH, setHeroH] = useState<number | null>(null);
  const [smallH, setSmallH] = useState<number | null>(null);
  const [headingH, setHeadingH] = useState<number | null>(null);
  const [categoriesH, setCategoriesH] = useState<number | null>(null);
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

  useEffect(() => {
    const compute = () => {
      const headerEl = document.querySelector('header');
      const navEl = document.querySelector('nav');
      // if header is absolute (overlay on root) don't subtract its height
      let headerH = 0;
      if (headerEl) {
        try {
          const isAbsolute = headerEl.classList.contains('absolute');
          headerH = isAbsolute ? 0 : headerEl.getBoundingClientRect().height;
        } catch (e) {
          headerH = headerEl.getBoundingClientRect().height || 0;
        }
      }
      const navH = navEl ? navEl.getBoundingClientRect().height : 0;
      const available = Math.max(0, window.innerHeight - headerH - navH);

      // compute viewport width early
      const ww = window.innerWidth;

      // On small screens let the layout flow naturally (avoid forced heights)
      if (ww <= 640) {
        setContainerHeight(null);
        setHeroH(null);
        setSmallH(null);
        setHeadingH(null);
        setCategoriesH(null);
        return;
      }
      setContainerHeight(available);
      // allocate proportions but clamp for very small screens
      let hHeroRatio = 0.28;
      let hSmallRatio = 0.08;
      let hHeadingRatio = 0.05;

      // on very narrow screens give more space to the hero to make it larger
      if (ww <= 420) {
        hHeroRatio = 0.38;
        hSmallRatio = 0.05;
        hHeadingRatio = 0.035;
      } else if (ww <= 640) {
        hHeroRatio = 0.34;
        hSmallRatio = 0.06;
        hHeadingRatio = 0.045;
      }

      const hHero = Math.round(available * hHeroRatio);
      const hSmall = Math.round(available * hSmallRatio);
      const hHeading = Math.round(available * hHeadingRatio);
      // ensure hero has a sensible minimum height on very small viewports
      const minHero = ww <= 420 ? 220 : ww <= 640 ? 180 : 160;
      const heroFinal = Math.max(hHero, minHero);
      const hCats = Math.max(120, available - heroFinal - hSmall - hHeading);
      setHeroH(heroFinal);
      setSmallH(hSmall);
      setHeadingH(hHeading);
      setCategoriesH(hCats);
    };

    compute();
    window.addEventListener('resize', compute);

    const ResizeObserverCtor = (window as any).ResizeObserver;
    const ro: any = ResizeObserverCtor ? new ResizeObserverCtor(() => compute()) : null;
    const headerEl = document.querySelector('header');
    const navEl = document.querySelector('nav');
    if (ro) {
      if (headerEl) ro.observe(headerEl);
      if (navEl) ro.observe(navEl);
    }

    return () => {
      window.removeEventListener('resize', compute);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <div
      className="w-full overflow-hidden bg-black text-white"
      style={containerHeight ? { height: `${containerHeight}px` } : undefined}
    >
      <div className="flex flex-col h-full">
        {!selectedCategory && (
          <>
            {/* HERO: ~40-45% of viewport */}
            <header className="flex-none relative" style={heroH ? { height: `${heroH}px` } : undefined}>
              <video
                src="/assets/hero.mp4"
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </header>

            {/* small content */}
            <div className="flex-none flex items-center justify-center px-4 sm:px-6" style={smallH ? { height: `${smallH}px` } : undefined}>
              <p className="text-center text-sm lg:text-base text-gray-300 max-w-2xl">
                Trusted by industry leaders — fast delivery, genuine spares, and expert support.
              </p>
            </div>

            {/* heading */}
            <div className="flex-none flex items-center justify-start px-4 sm:px-6" style={headingH ? { height: `${headingH}px` } : undefined}>
              <div>
                <h2 className="text-base sm:text-lg lg:text-2xl font-bold">Products</h2>
                <h3 className="text-xs sm:text-sm text-gray-400 mt-1">ALL TYPE OF WEAVING MACHINE AVAILABLE</h3>
              </div>
            </div>
          </>
        )}

        {/* categories grid (exact trust-badges style) */}
        <section className={`${selectedCategory ? 'mt-0' : 'mt-3 sm:mt-6'} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 px-2 sm:px-6 h-full`} style={selectedCategory || categoriesH ? { height: selectedCategory ? '100%' : `${categoriesH}px` } : undefined}>
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
