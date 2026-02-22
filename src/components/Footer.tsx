import React from 'react';

interface FooterLinksProps {
  title: string;
  links: string[];
}

const FOOTER_LINKS = {
  customerService: [
    'Price Match Guarantee',
    'New Arrivals',
    'Best Sellers',
    'Contact Support',
    'Sitemap',
    'Store Locator',
  ],
  company: [
    'Delivery Information',
    'Privacy Policy',
    'Terms & Conditions',
    'About',
    'Secure Payment',
    'Warranty',
  ],
};

const Footer: React.FC = () => (
  <footer className="bg-black pt-20 pb-10 border-t border-gray-900 px-4 lg:px-10">
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      <FooterAbout />
      <FooterLinks
        title="Customer Service"
        links={FOOTER_LINKS.customerService}
      />
      <FooterLinks title="Our Company" links={FOOTER_LINKS.company} />
      <FooterNewsletter />
    </div>

    <FooterBottom />
  </footer>
);


const FooterAbout: React.FC = () => (
  <div className="space-y-6">
    <div className="text-4xl font-black">
      <a href="https://www.memoinfotech.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
        <img src="/assets/logo.png" alt="AB Textile Logo" className="h-20 object-contain" />
      </a>
    </div>
    <p className="text-sm leading-relaxed text-gray-500">
      Premium supplier of advanced textile machinery and equipment. We provide industrial-grade
      solutions for spinning, weaving, knitting, and dyeing operations globally.
    </p>
    <div className="space-y-4">
      <div>
        <p className="text-xs font-bold uppercase text-gray-400">Address:</p>
        <p className="text-sm text-gray-500">MR COMPLEX, CHETTIPALAYAM ROAD, PALLADAM</p>
      </div>
      <div>
        <p className="text-xs font-bold uppercase text-gray-400">Need Help?</p>
        <a href="tel:+919843140485" className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition-colors">+91 98431 40485</a>
      </div>
    </div>
  </div>
);


const FooterLinks: React.FC<FooterLinksProps> = ({ title, links }) => (
  <div>
    <h4 className="mb-8 border-b border-gray-800 pb-2 font-bold uppercase inline-block">
      {title}
    </h4>
    <ul className="space-y-4 text-sm text-gray-500">
      {links.map((link) => (
        <li key={link} className="hover:text-blue-500 cursor-pointer transition-colors">
          {link}
        </li>
      ))}
    </ul>
  </div>
);


const FooterNewsletter: React.FC = () => (
  <div>
    <h4 className="mb-8 border-b border-gray-800 pb-2 font-bold uppercase inline-block">
      Newsletter Subscribe
    </h4>
    <p className="mb-6 text-sm text-gray-500">
      Get updates on new textile machinery, industry news, and exclusive offers.
    </p>
    <div className="flex flex-col gap-3">
      <input
        type="email"
        placeholder="Your Email Address"
        className="bg-[#111111] border border-gray-800 py-3 px-6 text-sm focus:outline-none focus:border-blue-500 transition-colors"
      />
      <button className="py-3 px-6 bg-blue-600 text-sm font-bold uppercase hover:bg-blue-700 transition-colors">
        Subscribe Now
      </button>
    </div>
  </div>
);


const FooterBottom: React.FC = () => (
  <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-gray-900 flex flex-col md:flex-row items-center justify-center text-xs text-gray-500 gap-4">
    <p>
      Designed and developed by <a href="https://www.memoinfotech.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 font-bold hover:text-blue-400 transition-colors">Memo Infotech</a>
    </p>
  </div>
);

export default Footer;
