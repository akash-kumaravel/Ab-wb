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
      setLoading(false);
    };

    fetchProducts();
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
const TrendingProducts: React.FC<{ navigate: any; products: Product[]; loading: boolean }> = ({ navigate, products, loading }) => (
  <section className="mt-20">
    <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 border-b border-gray-800 pb-4">
      <h2 className="text-2xl font-bold tracking-tight">
        Trending <span className="font-light">Products</span>
      </h2>
      <div className="flex space-x-8 text-sm mt-4 md:mt-0">
        <span className="pb-4 font-bold text-blue-500 border-b-2 border-blue-500 cursor-pointer">
          Best Sellers
        </span>
        <span className="pb-4 text-gray-500 hover:text-white transition-colors cursor-pointer">
          New Arrivals
        </span>
        <span className="pb-4 text-gray-500 hover:text-white transition-colors cursor-pointer">
          Special Offers
        </span>
      </div>
    </div>
    {loading ? (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px border border-gray-800 bg-gray-800 min-h-[250px] flex items-center justify-center">
        <p className="text-gray-400">Loading products...</p>
      </div>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px border border-gray-800 bg-gray-800">
        {products.slice(0, 5).map((product) => (
          <div key={product.id} onClick={() => navigate(`/product/${product.id}`)} className="cursor-pointer">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    )}
  </section>
);


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
const SpecialOffers: React.FC<{ navigate: any; products: Product[]; loading: boolean }> = ({ navigate, products, loading }) => (
  <section className="mt-24">
    <h2 className="mb-8 border-b border-gray-800 pb-4 text-2xl font-bold">
      Special <span className="font-light">Offers</span>
    </h2>
    {loading ? (
      <div className="text-center py-8 text-gray-400">
        Loading products...
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px border border-gray-800 bg-gray-800">
        {products.slice(0, 4).map((product) => (
          <div key={product.id} onClick={() => navigate(`/product/${product.id}`)} className="cursor-pointer">
            <ProductCard
              product={product}
            />
          </div>
        ))}
      </div>
    )}
  </section>
);


// CATEGORY MINI LISTS SECTION
const CategoryMiniListsSection: React.FC<{ navigate: any; products: Product[] }> = ({ navigate, products }) => (
  <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
    <CategoryMiniList
      title="Spinning Machinery"
      products={products.length > 0 ? products.slice(0, 3) : TRENDING_PRODUCTS.slice(0, 3)}
      navigate={navigate}
    />
    <CategoryMiniList
      title="Weaving Equipment"
      products={products.length > 3 ? products.slice(3, 6) : SPECIAL_OFFERS.slice(0, 3)}
      navigate={navigate}
    />
    <CategoryMiniList
      title="Finishing Systems"
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
      <div className={`relative flex items-center justify-center ${imageContainerClass}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {product.outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
        <p className="mt-2 text-lg font-black text-blue-500">{product.price}</p>
      </div>

      {!horizontal && (
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
          <div className="p-2 bg-blue-600 rounded-full cursor-pointer hover:bg-white hover:text-blue-600 transition-all shadow-xl">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 4H3z" />
            </svg>
          </div>
          <div className="p-2 bg-[#111111] rounded-full cursor-pointer hover:bg-blue-600 transition-all shadow-xl">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          </div>
        </div>
      )}
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
      <img
        src={category.icon}
        alt={category.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
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
              <img
                src={p.image}
                className="w-full h-full object-cover"
                alt={p.name}
              />
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
