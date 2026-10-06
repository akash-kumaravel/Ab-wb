import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';

const businessSlides = [
  {
    name: 'RJ Textile Machinery',
    tagline: 'Weave a Better Tomorrow',
    description: 'Complete solutions for the textile weaving industry, from Sulzer, airjet and rapier machines to spares for all brands.',
    supportingText: 'Trusted by industry leaders — fast delivery, genuine spares, and expert support.',
    productSubtitle: 'ALL TYPE OF WEAVING MACHINE AVAILABLE',
    products: null,
    image: '/assets/machine cover.jpg',
    video: '/assets/hero.mp4',
    href: '/shop',
    action: 'Explore Machinery',
  },
  {
    name: 'RJ Steels and Traders',
    tagline: 'Global Steel Sourcing Partner',
    description: 'Steel trading, sourcing and supply for construction, manufacturing, infrastructure and shipbuilding.',
    supportingText: 'Premium quality · Global sourcing · Trusted partnership · Competitive pricing.',
    productSubtitle: 'STEEL PRODUCTS AND INDUSTRIAL SOLUTIONS',
    products: [
      { name: 'Coils & Sheets', details: 'HR · CR · GI · GL', image: '/assets/coil and sheet.jpg' },
      { name: 'Pipes & Tubes', details: 'MS · GI · SS · ERW', image: '/assets/pipes and tubes.jpg' },
      { name: 'Structural Steel', details: 'Beams · Angles · Channels', image: '/assets/Structural Steel.jpg' },
      { name: 'Bars & Rods', details: 'TMT · MS · Alloy', image: '/assets/Bars & Rods.png' },
      { name: 'Plates', details: 'MS · HSLA · Boiler', image: '/assets/steel plates.jpg' },
    ],
    image: '/assets/steel.png',
    href: '/rj-steels-traders',
    action: 'Explore Steel',
  },
  {
    name: 'RJ Enterprises',
    tagline: 'Business Beyond Borders',
    description: 'International import, export and textile consulting, connecting businesses with global suppliers and partners.',
    supportingText: 'Global network · Reliable partnership · Customized trade solutions.',
    productSubtitle: 'IMPORT, EXPORT, SOURCING, TRADING AND BUSINESS SUPPORT',
    products: [
      { name: 'Import', details: 'Explore products and procurement opportunities from international suppliers.', image: '/assets/import.png' },
      { name: 'Export', details: 'Connect products and businesses with buyers in international markets.', image: '/assets/export.png' },
      { name: 'Global Sourcing', details: 'Find suppliers and products that match your business requirements.', image: '/assets/global sourcing.png' },
      { name: 'Machine Sourcing', details: 'Source machinery that matches production requirements, specifications and delivery needs.', image: '/assets/machine sourcing.png' },
      { name: 'International Trading', details: 'Build buyer and seller connections across markets.', image: '/assets/International Trading.jpg' },
      { name: 'Business Support', details: 'Coordinate trade requirements from initial discussions through next steps.', image: '/assets/business support.png' },
    ],
    image: '/assets/steels and trades.jpeg',
    href: '/rj-enterprises',
    action: 'Explore RJ Enterprises',
  },
];

const HomeMinimal: React.FC = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const slide = businessSlides[activeSlide];
  const categories = CATEGORIES.slice(0, 6);
  const productCards = slide.products
    ? slide.products.map((product) => ({ ...product, href: slide.href }))
    : categories.map((category) => ({
      name: category.name,
      details: category.subCategories.join(' · '),
      image: category.icon,
      href: `/shop?category=${category.id}`,
    }));

  const changeSlide = (direction: number) => {
    setActiveSlide((current) => (current + direction + businessSlides.length) % businessSlides.length);
  };


  return (
    <div className="w-full overflow-hidden bg-black text-white">
      <div className="flex flex-col">
        <section className="relative w-full">
          <div
            className="relative flex h-[50vh] min-h-[420px] w-full items-center overflow-hidden bg-[#111111] touch-pan-y"
            onTouchStart={(event) => { touchStartX.current = event.changedTouches[0].clientX; }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return;
              const distance = event.changedTouches[0].clientX - touchStartX.current;
              if (Math.abs(distance) > 40) changeSlide(distance < 0 ? 1 : -1);
              touchStartX.current = null;
            }}
            onTouchCancel={() => { touchStartX.current = null; }}
          >
            {businessSlides.map((item, index) => (
              item.video ? (
                <video
                  key={item.image}
                  src={item.video}
                  poster={item.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${activeSlide === index ? 'opacity-100' : 'opacity-0'}`}
                />
              ) : (
                <img
                  key={item.image}
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${activeSlide === index ? 'opacity-100' : 'opacity-0'}`}
                />
              )
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/20" />
            <div key={slide.name} className="relative z-10 max-w-3xl space-y-4 px-8 pb-10 lg:px-16">
              <p className="text-blue-400 text-sm font-bold uppercase tracking-[0.2em]">RJ Group</p>
              <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{slide.name}</h1>
              <h2 className="text-xl font-semibold text-blue-400 sm:text-2xl">{slide.tagline}</h2>
              <p className="max-w-2xl text-sm leading-relaxed text-gray-100 sm:text-base">{slide.description}</p>
              <button
                onClick={() => navigate(slide.href)}
                className="mt-2 bg-blue-600 px-6 py-3 text-sm font-bold uppercase transition-colors hover:bg-blue-700"
              >
                {slide.action}
              </button>
            </div>

            <button
              type="button"
              onClick={() => changeSlide(-1)}
              aria-label="Previous business"
              className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/80 backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/20 hover:text-white sm:left-6"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => changeSlide(1)}
              aria-label="Next business"
              className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/80 backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/20 hover:text-white sm:right-6"
            >
              <ArrowRight size={20} />
            </button>
            <span className="absolute bottom-4 right-6 z-20 text-sm font-semibold tabular-nums text-white" aria-live="polite">
              {String(activeSlide + 1).padStart(2, '0')} / {String(businessSlides.length).padStart(2, '0')}
            </span>
          </div>
        </section>

        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-center px-4 py-4 sm:px-6 lg:px-10">
          <p key={slide.name} className="max-w-2xl text-center text-sm text-gray-300 sm:text-base" aria-live="polite">
            {slide.supportingText}
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-[1400px] flex-none items-center justify-start px-4 py-4 sm:px-6 lg:px-10">
          <div>
            <h2 className="text-base font-bold sm:text-lg lg:text-2xl">
              {slide.name === 'RJ Enterprises' ? 'Services' : 'Products'}
            </h2>
            <h3 key={slide.name} className="mt-1 text-xs text-gray-400 sm:text-sm" aria-live="polite">{slide.productSubtitle}</h3>
          </div>
        </div>

        <section className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-3 px-4 sm:grid-cols-2 sm:gap-5 sm:px-6 lg:grid-cols-3 lg:px-10 xl:grid-cols-4">
          {productCards.map((product) => {
            const cardContent = (
              <>
                <img
                  src={product.image}
                  alt=""
                  className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] sm:h-40"
                  loading="lazy"
                  onError={(event) => { event.currentTarget.src = '/assets/hero.jpg'; }}
                />
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="text-base font-bold transition-colors group-hover:text-blue-400 sm:text-lg">{product.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400">{product.details}</p>
                </div>
              </>
            );

            return slide.products ? (
              <article
                key={product.name}
                className="group flex h-full w-full flex-col border border-gray-800 bg-[#080808] text-left"
              >
                {cardContent}
              </article>
            ) : (
              <button
                key={product.name}
                type="button"
                onClick={() => navigate(product.href)}
                aria-label={`View ${product.name}`}
                className="group flex h-full w-full flex-col border border-gray-800 bg-[#080808] text-left transition-colors hover:border-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
              >
                {cardContent}
              </button>
            );
          })}
        </section>

      </div>
      <WhatsAppButton />
    </div>
  );
};

export default HomeMinimal;
