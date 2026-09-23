import React from 'react';
import { ArrowRight, Check, Factory, Recycle, Scale, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const solutions = [
  {
    icon: Factory,
    title: 'Ferrous Scrap',
    description: 'We deal in iron- and steel-based scrap generated from industrial, manufacturing, fabrication and commercial activities.',
    materials: ['Steel scrap', 'Iron scrap', 'Industrial metal scrap', 'Fabrication scrap', 'Manufacturing scrap'],
  },
  {
    icon: Scale,
    title: 'Non-Ferrous Scrap',
    description: 'We facilitate the trading of valuable non-ferrous recyclable metals for businesses looking to sell or source material.',
    materials: ['Copper', 'Aluminium', 'Brass', 'Other non-ferrous metals'],
  },
];

const steps = [
  ['01', 'Understand', 'We begin by understanding the material, quantity and requirements.'],
  ['02', 'Assess', 'Material details and commercial requirements are reviewed.'],
  ['03', 'Connect', 'We coordinate between the appropriate buyer and seller.'],
  ['04', 'Trade', 'The transaction and material movement are coordinated on agreed terms.'],
  ['05', 'Recycle & Reuse', 'Recyclable metal continues its journey back into productive use.'],
];

const RJSteelsTraders: React.FC = () => (
  <div className="min-h-screen bg-black text-white">
    <section className="relative isolate overflow-hidden border-b border-[#293033]">
      <img src="/assets/shutterstock_1069102985-1920w.jpeg" alt="Industrial metal recycling" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25 grayscale" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/90 to-black/45" />
      <div className="mx-auto max-w-[1400px] px-4 py-28 lg:px-10 lg:py-40">
        <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#d61f27]"><span className="h-px w-10 bg-[#d61f27]" />RJ Steels & Traders</p>
        <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">Giving Scrap<br /><span className="text-[#d61f27]">a New Life.</span></h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-gray-300 sm:text-xl">Scrap today. A cleaner tomorrow. We connect scrap generators and suppliers with buyers and recycling channels across the metal trading ecosystem.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-[#d61f27] px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition-colors hover:bg-[#a9121b]">Sell Your Scrap <ArrowRight size={17} /></Link>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 border border-white/30 px-6 py-3 text-sm font-black uppercase tracking-wide transition-colors hover:border-[#d61f27] hover:text-[#d61f27]">Contact Our Team</Link>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-[1400px] px-4 py-24 lg:px-10 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
        <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#d61f27]">About the business</p><h2 className="text-4xl font-black leading-tight sm:text-5xl">Turning recyclable metal into commercial value.</h2></div>
        <div className="space-y-6 text-lg leading-relaxed text-gray-400"><p>Metal remains one of the world&apos;s most valuable recyclable resources. When recovered, sorted and traded responsibly, scrap metal can return to productive use rather than becoming unnecessary waste.</p><p>Based in <strong className="font-semibold text-white">Palladam, Tiruppur District, Tamil Nadu</strong>, we facilitate the buying and selling of ferrous and non-ferrous scrap materials while making metal trading straightforward and professional.</p></div>
      </div>
    </section>

    <section className="border-y border-[#1d2d3d] bg-black">
      <div className="mx-auto max-w-[1400px] px-4 py-24 lg:px-10 lg:py-32"><div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#d61f27]">What we trade</p><h2 className="text-4xl font-black sm:text-5xl">Our metal trading solutions</h2></div><Recycle className="hidden text-[#d61f27] sm:block" size={48} strokeWidth={1} /></div>
        <div className="grid gap-4 md:grid-cols-2">{solutions.map(({ icon: Icon, title, description, materials }) => <article key={title} className="rounded-sm border border-[#1d2d3d] bg-black p-8 transition-colors hover:border-[#ff3b30]/80 lg:p-10"><Icon className="mb-8 text-[#d61f27]" size={32} strokeWidth={1.5} /><h3 className="mb-4 text-2xl font-black">{title}</h3><p className="mb-8 leading-relaxed text-gray-400">{description}</p><ul className="grid gap-3 sm:grid-cols-2">{materials.map((material) => <li key={material} className="flex items-center gap-2 text-sm text-gray-300"><Check size={15} className="text-[#d61f27]" />{material}</li>)}</ul></article>)}</div>
      </div>
    </section>

    <section className="mx-auto max-w-[1400px] px-4 py-24 lg:px-10 lg:py-32"><div className="grid gap-12 lg:grid-cols-2 lg:gap-24"><div><p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#d61f27]">For suppliers and buyers</p><h2 className="text-4xl font-black leading-tight sm:text-5xl">Have metal to sell or a requirement to source?</h2><p className="mt-6 max-w-lg leading-relaxed text-gray-400">Share the material type, approximate quantity, location and availability with our team. We can discuss the right next step for your trading requirement.</p><Link to="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#d61f27] hover:text-white">Start a scrap enquiry <ArrowRight size={17} /></Link></div><div className="border-l border-[#293033] pl-8 lg:pl-12"><div className="mb-8 flex items-center gap-3 text-gray-400"><Truck size={22} className="text-[#d61f27]" />Looking for scrap metal?</div><p className="leading-relaxed text-gray-400">Tell us your material, grade or specification, quantity and delivery requirement. We will discuss available trading opportunities and supply possibilities.</p><Link to="/contact" className="mt-8 inline-flex items-center gap-2 border-b border-[#d61f27] pb-2 text-sm font-black uppercase tracking-wide text-white hover:text-[#d61f27]">Submit your requirement <ArrowRight size={17} /></Link></div></div></section>

    <section className="border-y border-[#1d2d3d] bg-black"><div className="mx-auto max-w-[1400px] px-4 py-24 lg:px-10 lg:py-28"><div className="mb-14 max-w-2xl"><p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#d61f27]">Our approach</p><h2 className="text-4xl font-black sm:text-5xl">A clearer way to trade scrap.</h2></div><div className="grid gap-4 md:grid-cols-5">{steps.map(([number, title, description]) => <div key={number} className="rounded-sm border border-[#1d2d3d] bg-black p-5"><p className="text-sm font-black text-[#d61f27]">{number}</p><h3 className="mt-8 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-relaxed text-gray-400">{description}</p></div>)}</div></div></section>

    <section className="mx-auto max-w-[1400px] px-4 py-24 text-center lg:px-10 lg:py-32"><p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#d61f27]">Sustainability</p><h2 className="text-5xl font-black sm:text-7xl">Metal has a new life.</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">Recycle. Reuse. Recover. Our role is to help recyclable metal move from discarded material to usable resource.</p><Link to="/contact" className="mt-10 inline-flex items-center gap-2 bg-white px-7 py-4 text-sm font-black uppercase tracking-wide text-black hover:bg-[#d61f27]">Let&apos;s build business together <ArrowRight size={17} /></Link></section>
  </div>
);

export default RJSteelsTraders;
