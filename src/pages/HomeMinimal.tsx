import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { Truck, Headset, RefreshCcw, ShieldCheck, Factory, Zap, Wind, Cog, Wrench, Package } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';

const HomeMinimal: React.FC = () => {
  const navigate = useNavigate();
  const categories = CATEGORIES.slice(0, 6);


  return (
    <div className="w-full overflow-hidden bg-black text-white">
      <div className="flex flex-col">
        <>
            {/* HERO: use same hero layout/text as main Home page */}
            <section className="relative w-full">
              <div className="relative flex items-center w-full h-[50vh] bg-[#111111]">
                <video
                  src="/assets/hero.mp4"
                  poster="/assets/hero.jpg"
                  loop
                  muted
                  preload="metadata"
                  playsInline
                  autoPlay
                  onError={(event) => {
                    const target = event.currentTarget as HTMLVideoElement;
                    target.style.display = 'none';
                  }}
                  className="absolute inset-0 w-full h-full object-cover bg-black"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/35 to-black/20" />

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
            <div className="mx-auto flex w-full max-w-[1400px] flex-none items-center justify-center px-4 py-4 sm:px-6 lg:px-10">
              <p className="text-center text-sm lg:text-base text-gray-300 max-w-2xl">
                Trusted by industry leaders — fast delivery, genuine spares, and expert support.
              </p>
            </div>

            {/* heading (restored) */}
            <div className="mx-auto flex w-full max-w-[1400px] flex-none items-center justify-start px-4 py-4 sm:px-6 lg:px-10">
              <div>
                <h2 className="text-base sm:text-lg lg:text-2xl font-bold">Products</h2>
                <h3 className="text-xs sm:text-sm text-gray-400 mt-1">ALL TYPE OF WEAVING MACHINE AVAILABLE</h3>
              </div>
            </div>
        </>

        {/* Static category grid */}
        <section className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-2 px-4 sm:grid-cols-2 sm:gap-6 sm:px-6 lg:px-10 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, idx) => {
            const icons = [Factory, Zap, Wind, Cog, Wrench, Package];
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={cat.id}
                className="flex flex-col items-center justify-center gap-2 sm:gap-3 p-2 sm:p-4 bg-[#080808] border border-gray-800 rounded-sm h-full"
              >
                <Icon className="text-blue-500 w-6 h-6 sm:w-8 sm:h-8" />
                <h3 className="text-xs sm:text-sm font-bold uppercase text-center">{cat.name}</h3>
              </div>
            );
          })}
        </section>

      </div>
      <WhatsAppButton />
    </div>
  );
};

export default HomeMinimal;
