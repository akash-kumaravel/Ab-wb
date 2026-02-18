import React, { useState, useEffect } from 'react';
import { Facebook, Github, Instagram, Twitter, Youtube } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  TRUST_BADGES,
  CATEGORIES,
  TRENDING_PRODUCTS,
  SPECIAL_OFFERS,
} from '../constants';
import { Product, Category } from '../types';
import ProductService from '../services/ProductService';

// ============================================
// PAGE CONSTANTS
// ============================================

const SOCIAL_ICONS = [Facebook, Twitter, Instagram, Github, Youtube];

const COUNTDOWN_ITEMS = [
  { value: '12', label: 'Days' },
  { value: '05', label: 'Hrs' },
  { value: '48', label: 'Min' },
  { value: '21', label: 'Sec' },
];

const EXHAUST_PRODUCTS = [
  {
    id: 50,
    name: 'Bleaching & Singeing Machine BS-1800',
    price: '$19,500.00',
    image: '/assets/shutterstock_1069102985-1920w.jpeg',
  },
  {
    id: 51,
    name: 'Reeling & Sizing Equipment RS-2500',
    price: '$14,200.00',
    image: '/assets/shutterstock_1069102985-1920w.jpeg',
  },
  {
    id: 52,
    name: 'Brushing & Sueding Machine BS-3000',
    price: '$16,800.00',
    image: '/assets/shutterstock_1069102985-1920w.jpeg',
  },
];


// ============================================
// HOME PAGE COMPONENT
// ============================================

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await ProductService.getAllProducts();
      // If no products from API, use fallback constants

      // If no products from API, we can still use fallback constants or just show API products.
      // For now, let's prioritize API products but fall back if empty to keep the site looking populated for the demo.
      // Ideally, we should just use data.
      if (data.length > 0) {
        setProducts(data);
      } else {
        setProducts([...TRENDING_PRODUCTS, ...SPECIAL_OFFERS]);
      }
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
            setProducts(data);
          }
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <>
      <HeroSection />

      <TrustBadges />
      <TrendingProducts navigate={navigate} products={products} loading={loading} />
      <PopularCategories navigate={navigate} />
      <PromotionalBanners />
      <SpecialOffers navigate={navigate} products={products} loading={loading} />
      <CategoryMiniListsSection navigate={navigate} products={products} />
    </>
  );
};


// ============================================
// PAGE SECTIONS
// ============================================

// HERO SECTION
const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const navigate = useNavigate();

  const heroSlides = [
    {
      image: '/assets/shutterstock_1069102985-1920w.jpeg',
      label: 'Premium Industrial Grade',
      title: 'Advanced Textile Machinery Solutions',
      buttonText: 'Shop Now'
    },
    {
      image: '/assets/shutterstock_581092810-1920w.jpeg',
      label: 'Cutting-Edge Technology',
      title: 'Spinning & Yarn Production Systems',
      buttonText: 'Explore Collection'
    },
    {
      image: '/assets/shutterstock_2635629613-1920w.jpeg',
      label: 'Industrial Excellence',
      title: 'Weaving & Processing Equipment',
      buttonText: 'View Products'
    }
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex-1 relative overflow-hidden rounded-sm">
      <div className="relative flex items-center w-full h-full aspect-[21/9] lg:aspect-[16/6] bg-[#111111]">
        {/* SLIDES */}
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
          </div>
        ))}

        {/* CONTENT */}
        <div className="relative z-10 px-8 lg:px-16 space-y-4 transition-all duration-500">
          <p className="text-blue-500 italic text-xl font-medium">{heroSlides[currentSlide].label}</p>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight max-w-md">
            {heroSlides[currentSlide].title}
          </h1>
          <button
            onClick={() => navigate('/shop')}
            className="mt-8 bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-sm uppercase text-sm font-bold transition-all transform hover:-translate-y-1 cursor-pointer"
          >
            {heroSlides[currentSlide].buttonText}
          </button>
        </div>

        {/* INDICATORS */}
        <div className="absolute bottom-6 right-10 flex gap-2">
          {heroSlides.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${idx === currentSlide ? 'bg-blue-600 w-8' : 'bg-gray-600 hover:bg-gray-500'
                }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};


// TRUST BADGES SECTION
const TrustBadges: React.FC = () => (
  <section className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {TRUST_BADGES.map((badge) => (
      <div
        key={badge.id}
        className="flex items-center gap-6 p-6 bg-[#080808] border border-gray-800 rounded-sm group hover:border-blue-500 transition-colors"
      >
        <div className="transition-transform duration-300 group-hover:scale-110">
          {badge.icon}
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase">{badge.title}</h3>
          <p className="mt-1 text-xs text-gray-500">{badge.description}</p>
        </div>
      </div>
    ))}
  </section>
);


// TRENDING PRODUCTS SECTION
const TrendingProducts: React.FC<{ navigate: any; products: Product[]; loading: boolean }> = ({ navigate, products, loading }) => {
  const [showMore, setShowMore] = React.useState(false);
  const initialCount = 4;

  // Filter out products that are special offers
  const trendingProducts = products.filter(p => !p.isSpecialOffer);
  const displayedProducts = showMore ? trendingProducts : trendingProducts.slice(0, initialCount);
  const hasMoreProducts = trendingProducts.length > initialCount;

  return (
    <section className="mt-20">
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 border-b border-gray-800 pb-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Trending <span className="font-light">Products</span>
        </h2>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-400">Loading products...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <div key={product.id} onClick={() => navigate(`/product/${product.id}`)} className="cursor-pointer">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-center py-8">No products available</p>
            )}
          </div>

          {hasMoreProducts && (
            <div className="flex items-center justify-center mt-12">
              <button
                onClick={() => setShowMore(!showMore)}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-sm transition-colors flex items-center gap-2"
              >
                {showMore ? (
                  <>
                    <span>Show Less</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>See More ({trendingProducts.length - initialCount} more)</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};


// CATEGORIES SECTION
const PopularCategories: React.FC<{ navigate: any }> = ({ navigate }) => (
  <section className="mt-24">
    <h2 className="mb-10 border-b border-gray-800 pb-4 text-2xl font-bold">
      <span className="font-light">Categories</span>
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {CATEGORIES.map((cat) => (
        <CategoryCard key={cat.id} category={cat} navigate={navigate} />
      ))}
    </div>
  </section>
);


// PROMOTIONAL BANNERS SECTION
const PromotionalBanners: React.FC = () => (
  <section className="mt-24 grid grid-cols-1 md:grid-cols-2">
    <PromoBanner
      label="Spinning Solutions"
      title="High-Speed Yarn"
      subtitle="Production Systems"
      image="/assets/shutterstock_1069102985-1920w.jpeg"
      alt="Spinning Equipment Banner"
      buttonText="Shop Now"
    />
    <PromoBanner
      label="Weaving Technology"
      title="Advanced Rapier"
      subtitle="Loom Systems"
      image="/assets/shutterstock_1069102985-1920w.jpeg"
      alt="Weaving Equipment Banner"
      buttonText="Explore Now"
    />
  </section>
);


// SPECIAL OFFERS SECTION
const SpecialOffers: React.FC<{ navigate: any; products: Product[]; loading: boolean }> = ({ navigate, products, loading }) => {
  // Filter to show only special offer products
  const specialOfferProducts = products.filter(p => p.isSpecialOffer);

  return (
    <section className="mt-24 bg-gradient-to-r from-blue-950/30 via-black to-blue-950/30 border border-blue-900/50 rounded-sm p-8">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-blue-900/50">
        <div className="px-3 py-1 bg-blue-600 text-white text-xs font-black uppercase rounded-sm">
          Limited Time
        </div>
        <h2 className="text-2xl font-bold">
          Special <span className="font-light">Offers</span>
        </h2>
      </div>
      {loading ? (
        <div className="text-center py-8 text-gray-400">
          Loading products...
        </div>
      ) : specialOfferProducts.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No special offers available at this time.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialOfferProducts.slice(0, 4).map((product) => (
            <div 
              key={product.id} 
              onClick={() => navigate(`/product/${product.id}`)} 
              className="cursor-pointer relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-sm opacity-0 group-hover:opacity-20 blur transition-all duration-300 -z-10"></div>
              <ProductCard product={product} />
              <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-sm text-xs font-bold">
                Hot Deal
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};


// CATEGORY MINI LISTS SECTION
const CategoryMiniListsSection: React.FC<{ navigate: any; products: Product[] }> = ({ navigate, products }) => (
  <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
    <CategoryMiniList
      title="Sulzer Weaving Machine"
      products={products.length > 0 ? products.slice(0, 3) : TRENDING_PRODUCTS.slice(0, 3)}
      navigate={navigate}
    />
    <CategoryMiniList
      title="Air-Jet Weaving Machine"
      products={products.length > 3 ? products.slice(3, 6) : SPECIAL_OFFERS.slice(0, 3)}
      navigate={navigate}
    />
    <CategoryMiniList
      title="OE"
      products={products.length > 6 ? products.slice(6, 9) : EXHAUST_PRODUCTS}
      navigate={navigate}
    />
  </section>
);





// ============================================
// REUSABLE COMPONENTS
// ============================================

// PROMOTIONAL BANNER COMPONENT
interface PromoBannerProps {
  label: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  buttonText: string;
}

const PromoBanner: React.FC<PromoBannerProps> = ({
  label,
  title,
  subtitle,
  image,
  alt,
  buttonText,
}) => (
  <div className="relative flex overflow-hidden bg-black group">
    <img src={image} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 flex flex-col justify-center px-12 pointer-events-none">
      <span className="text-blue-500 text-sm font-bold uppercase tracking-widest">{label}</span>
      <h3 className="mt-2 text-3xl font-bold text-white drop-shadow-lg">
        {title}
        <br />
        {subtitle}
      </h3>
      <div className="mt-6">
        <span className="bg-white text-black px-8 py-3 text-xs font-bold uppercase pointer-events-auto hover:bg-blue-600 hover:text-white transition-all cursor-pointer inline-block">
          {buttonText}
        </span>
      </div>
    </div>
  </div>
);


// PRODUCT CARD COMPONENT
interface ProductCardProps {
  product: Product;
  horizontal?: boolean;
  showCountdown?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  horizontal,
  showCountdown,
}) => {
  const containerClass = horizontal
    ? 'flex items-center gap-4 p-4'
    : 'flex flex-col h-full p-6';

  const imageContainerClass = horizontal
    ? 'w-24 h-24 flex-shrink-0'
    : 'w-full aspect-square mb-6';

  return (
    <div
      className={`relative bg-black border-gray-800 transition-all duration-300 group hover:z-20 ${containerClass}`}
    >
      <div className={`relative flex items-center justify-center bg-gray-900 rounded-sm ${imageContainerClass}`}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-sm"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        {product.outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none rounded-sm">
            <span className="bg-red-600 text-white font-black px-3 py-1 text-[10px] uppercase rounded-sm shadow-lg">
              Out of Stock
            </span>
          </div>
        )}

        {showCountdown && (
          <div className="absolute bottom-[-10px] left-0 right-0 flex justify-around bg-blue-600 p-2 border border-blue-400 rounded-sm shadow-lg">
            {COUNTDOWN_ITEMS.map((item, i) => (
              <div key={i} className="text-center">
                <p className="text-xs font-black">{item.value}</p>
                <p className="text-[7px] font-bold uppercase text-blue-100">{item.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 mt-2">
        <h3 className="text-sm font-medium text-gray-300 group-hover:text-blue-500 transition-colors cursor-pointer line-clamp-2 leading-snug">
          {product.name}
        </h3>
        {product.isSpecialOffer && product.specialOfferPrice ? (
          <div className="mt-2 flex items-center gap-2">
            <p className="text-sm text-gray-500 line-through">{product.price}</p>
            <p className="text-lg font-black text-green-500">{product.specialOfferPrice}</p>
          </div>
        ) : (
          <p className="mt-2 text-lg font-black text-blue-500">{product.price}</p>
        )}
      </div>
    </div>
  );
};


// CATEGORY CARD COMPONENT
const CategoryCard: React.FC<{ category: Category; navigate: any }> = ({ category, navigate }) => (
  <div
    onClick={() => navigate(`/shop?category=${category.id}`)}
    className="flex gap-6 p-6 bg-[#050505] border border-transparent rounded-sm group cursor-pointer hover:border-blue-500 transition-all transform hover:-translate-y-1"
  >
    <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center bg-[#0c0c0c] rounded-sm overflow-hidden">
      {category.icon ? (
        <img
          src={category.icon}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80';
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
          No Image
        </div>
      )}
    </div>

    <div>
      <h3 className="text-lg font-bold uppercase tracking-tight group-hover:text-blue-500 transition-colors">
        {category.name}
      </h3>
      <p className="mt-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
        Click to view products
      </p>
    </div>
  </div>
);


// CATEGORY MINI LIST COMPONENT
interface CategoryMiniListProps {
  title: string;
  products: Product[];
  navigate: any;
}

const CategoryMiniList: React.FC<CategoryMiniListProps> = ({ title, products, navigate }) => {
  const [firstWord, ...restWords] = title.split(' ');

  return (
    <div className="space-y-8">
      <div className="relative pb-4 border-b border-gray-800">
        <h2 className="text-xl font-bold uppercase tracking-tighter">
          {firstWord} <span className="font-light">{restWords.join(' ')}</span>
        </h2>
        <span className="absolute bottom-[-1px] left-0 w-16 h-[2px] bg-blue-500"></span>
      </div>

      <div className="space-y-6">
        {products.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/product/${p.id}`)}
            className="flex items-center gap-4 cursor-pointer group"
          >
            <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center bg-[#080808] border border-gray-800 rounded-sm group-hover:border-blue-500 transition-colors">
              {p.image ? (
                <img
                  src={p.image}
                  className="w-full h-full object-cover rounded-sm"
                  alt={p.name}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs rounded-sm">
                  No Image
                </div>
              )}
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase leading-tight line-clamp-2 text-gray-400 group-hover:text-blue-500 transition-colors">
                {p.name}
              </h4>
              <p className="mt-1 font-black text-blue-500">{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Home;
