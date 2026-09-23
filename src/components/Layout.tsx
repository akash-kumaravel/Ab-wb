import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isRoot = location.pathname === '/';
  const isHeroPage = isRoot || location.pathname === '/all-products' || location.pathname === '/shop';

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = mainRef.current?.querySelectorAll('section');
    sections?.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);

  return (
    <div ref={mainRef} className={`min-h-screen bg-black text-white ${isRoot ? 'overflow-x-hidden relative' : ''}`}>
      <Header />
      <Navigation />
      <main
        className={
          isHeroPage
            ? 'w-screen relative left-1/2 -ml-[50vw] px-0 py-0 -mt-1'
            : 'max-w-[1400px] mx-auto px-4 lg:px-10 py-8'
        }
      >
        {children}
      </main>
      {!isRoot && <Footer />}
      {!isRoot && <WhatsAppButton />}
    </div>
  );
};

export default Layout;
