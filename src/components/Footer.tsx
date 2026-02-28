import React from 'react';
import { Link } from 'react-router-dom';

interface FooterLinksProps {
  title: string;
  links: Array<{ label: string; path: string }>;
}

const FOOTER_LINKS = {
  navigation: [
    { label: 'Home', path: '/' },
    { label: 'All Products', path: '/all-products' },
    { label: 'Shop', path: '/shop' },
    { label: 'About', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
  ],
};

const Footer: React.FC = () => (
  <footer className="bg-black border-t border-gray-900">
    <div className="max-w-[1400px] mx-auto px-4 lg:px-10 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <FooterAbout />
        <div className="flex flex-col justify-center">
          <FooterLinks
            title="Navigation"
            links={FOOTER_LINKS.navigation}
          />
        </div>
      </div>
    </div>

    <FooterBottom />
  </footer>
);


const FooterAbout: React.FC = () => (
  <div className="space-y-6">
    <div>
      <a href="https://www.memoinfotech.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
        <img src="/assets/logo.png" alt="RJ Textile Logo" className="h-16 object-contain" />
      </a>
    </div>
    <p className="text-sm leading-relaxed text-gray-400">
      Premium supplier of advanced textile machinery and equipment. We provide industrial-grade
      solutions for spinning, weaving, knitting, and dyeing operations globally.
    </p>
    <div className="space-y-5 pt-4">
      <div>
        <p className="text-xs font-bold uppercase text-gray-500 mb-2">Address</p>
        <p className="text-sm text-gray-400">MR COMPLEX, CHETTIPALAYAM ROAD, PALLADAM</p>
      </div>
      <div>
        <p className="text-xs font-bold uppercase text-gray-500 mb-2">Contact</p>
        <a href="tel:+919344158524" className="text-lg font-bold text-blue-500 hover:text-blue-400 transition-colors">
          +91 93441 58524
        </a>
        <p className="text-xs text-gray-500 mt-2">Email</p>
        <a href="mailto:rjtextilemachinery@gmail.com" className="text-sm text-blue-500 hover:text-blue-400 transition-colors">
          rjtextilemachinery@gmail.com
        </a>
      </div>
    </div>
  </div>
);


const FooterLinks: React.FC<FooterLinksProps> = ({ title, links }) => (
  <div>
    <h4 className="mb-6 font-bold uppercase text-white tracking-wide">
      {title}
    </h4>
    <ul className="space-y-3 text-sm text-gray-400">
      {links.map((link) => (
        <li key={link.path}>
          <Link 
            to={link.path} 
            className="hover:text-blue-500 transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);


const FooterBottom: React.FC = () => (
  <div className="border-t border-gray-900">
    <div className="max-w-[1400px] mx-auto px-4 lg:px-10 py-8 flex flex-col md:flex-row items-center justify-center text-xs text-gray-500 gap-2">
      <p>
        © {new Date().getFullYear()} RJ Textile. All rights reserved.
      </p>
      <span className="hidden md:inline">|</span>
      <p>
        Developed by <a href="https://www.memoinfotech.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 font-semibold hover:text-blue-400 transition-colors">Memo Infotech</a>
      </p>
    </div>
  </div>
);

export default Footer;
