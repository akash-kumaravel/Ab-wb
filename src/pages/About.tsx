import React from 'react';
import { CheckCircle, Users, Target, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

// ============================================
// ABOUT PAGE
// ============================================

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* HERO SECTION */}
      <section className="page-hero featured-page-hero isolate">
        <img src="/assets/shutterstock_1069102985-1920w.jpeg" alt="Industrial metal recycling" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25 grayscale" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/80 to-black/45" />
        <div className="page-hero-content">
          <p className="page-hero-eyebrow">RJ GROUP&#8482;</p>
          <h1 className="page-hero-title">
            People. Partnerships. Progress.
          </h1>
          <p className="page-hero-description">
            <span className="font-serif italic">Together We Create Opportunities</span><br />
            Global business. A better tomorrow.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/rj-steels-traders" className="inline-flex items-center justify-center bg-[#d61f27] px-6 py-3 text-sm font-bold uppercase text-white transition-colors hover:bg-[#a9121b]">Explore RJ Steels &amp; Traders</Link>
            <Link to="/contact" className="inline-flex items-center justify-center border border-white/30 px-6 py-3 text-sm font-bold uppercase text-white transition-colors hover:border-[#d61f27] hover:text-[#d61f27]">Contact Our Team</Link>
          </div>
        </div>
      </section>

      {/* WHO WE ARE SECTION */}
      <section className="max-w-[1400px] mx-auto px-4 py-24">
        <div className="grid grid-cols-1 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-black text-white mb-8">Who We Are</h2>
            <div className="space-y-6">
              <p className="text-gray-400 text-lg leading-relaxed">
                RJ Group brings together businesses working across textile machinery, industrial and commercial scrap, and global trade solutions. Each business serves a distinct need, united by a shared commitment to people, strong partnerships and progress.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                We believe lasting opportunities are built through trust, collaboration and a clear vision for tomorrow.
              </p>
            </div>
            <div className="mt-10 grid gap-4 border-t border-gray-800 pt-8 sm:grid-cols-3">
              <div>
                <h3 className="font-bold text-white">RJ Textile Machinery</h3>
                <p className="mt-2 text-sm uppercase text-gray-400">Weave a better tomorrow</p>
              </div>
              <div>
                <h3 className="font-bold text-white">RJ Steels and Traders</h3>
                <p className="mt-2 text-sm uppercase text-gray-400">Built on trust</p>
              </div>
              <div>
                <h3 className="font-bold text-white">RJ Enterprises</h3>
                <p className="mt-2 text-sm uppercase text-gray-400">Global trade solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP SECTION */}
      <section className="max-w-[1400px] mx-auto px-4 py-24 border-y border-gray-800">
        <h2 className="text-4xl font-black text-white mb-6 text-center">Our Leadership</h2>
        <p className="text-gray-400 text-center mb-16 text-lg">
          A shared vision, strong partnerships and a belief in creating opportunities for a better tomorrow.
        </p>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              name: 'R. BENINRAJ',
              role: 'Managing Director',
              image: '/assets/Benin raj.jpeg',
              bio: "R. Beninraj leads RJ Group's vision and business development across its portfolio. He champions ideas that drive progress, builds enduring partnerships and creates opportunities for sustainable growth.",
            },
            {
              name: 'AXLIN ABINESH',
              role: 'Strategic Business Partner',
              image: '/assets/Axlin.jpeg',
              bio: 'Axlin Abinesh brings a collaborative, forward-looking perspective to the group. He works to turn ideas into shared opportunities, strengthen partnerships and support lasting growth.',
            },
            {
              name: 'JOHN WILLAM',
              role: 'Strategic Business Partner',
              image: '/assets/JOHN WILLAM.png',
              bio: 'John Willam works alongside the RJ Group team to build strong partnerships and develop new opportunities. His focus reflects the group\'s belief in shared progress and sustainable growth.',
            },
          ].map((leader) => (
            <article key={leader.name} className="group overflow-hidden border-t-2 border-[#d61f27] bg-[#111111]">
              <div className="aspect-[4/3] overflow-hidden bg-gray-900">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex h-full flex-col p-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#d61f27]">{leader.role}</p>
                <h3 className="mb-4 text-2xl font-black text-white">{leader.name}</h3>
                <p className="leading-relaxed text-gray-400">{leader.bio}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 border-y border-white/15 sm:grid-cols-3">
          <div className="border-b border-white/15 px-6 py-5 sm:border-b-0 sm:border-r">
            <h3 className="font-black uppercase text-white">Ideas</h3>
            <p className="mt-1 text-sm text-gray-400">Drive vision</p>
          </div>
          <div className="border-b border-white/15 px-6 py-5 sm:border-b-0 sm:border-r">
            <h3 className="font-black uppercase text-white">Partnerships</h3>
            <p className="mt-1 text-sm text-gray-400">Build success</p>
          </div>
          <div className="px-6 py-5">
            <h3 className="font-black uppercase text-white">Growth</h3>
            <p className="mt-1 text-sm text-gray-400">Create tomorrow</p>
          </div>
        </div>
        <p className="mt-8 text-center font-serif text-xl italic text-white">Together We Create Opportunities</p>
        <p className="mt-3 text-center text-xs font-bold uppercase tracking-wide text-gray-500">Global vision · Strong partnerships · Sustainable growth</p>
      </section>

      {/* WHAT WE DO SECTION */}
      <section className="max-w-[1400px] mx-auto px-4 py-24">
        <h2 className="text-4xl font-black text-white mb-6">What We Do</h2>
        <p className="text-gray-400 text-lg mb-12">From industrial sites to commercial scrap trading, we support projects at every stage.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="group bg-[#111111] border border-[#a9121b]/50 hover:border-[#d7b36a] p-8 rounded-lg transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="text-[#d7b36a] group-hover:scale-110 transition-transform" size={28} />
              </div>
              <div><h3 className="text-gray-300 text-lg font-semibold">Industrial Scrap Handling</h3><p className="mt-2 text-sm leading-relaxed text-gray-400">Safe, efficient scrap handling and dismantling for factories, textile mills and manufacturing units.</p></div>
            </div>
          </div>
          <div className="group bg-[#111111] border border-[#a9121b]/50 hover:border-[#d7b36a] p-8 rounded-lg transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="text-[#d7b36a] group-hover:scale-110 transition-transform" size={28} />
              </div>
              <div><h3 className="text-gray-300 text-lg font-semibold">Commercial Scrap Trading</h3><p className="mt-2 text-sm leading-relaxed text-gray-400">Bulk scrap collection and trading coordinated around each business&apos;s material and project requirements.</p></div>
            </div>
          </div>
          <div className="group bg-[#111111] border border-[#a9121b]/50 hover:border-[#d7b36a] p-8 rounded-lg transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="text-[#d7b36a] group-hover:scale-110 transition-transform" size={28} />
              </div>
              <div><h3 className="text-gray-300 text-lg font-semibold">Factory &amp; Mill Dismantling</h3><p className="mt-2 text-sm leading-relaxed text-gray-400">Planned dismantling projects covering mill floors, machinery and associated scrap materials.</p></div>
            </div>
          </div>
          <div className="group bg-[#111111] border border-[#a9121b]/50 hover:border-[#d7b36a] p-8 rounded-lg transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="text-[#d7b36a] group-hover:scale-110 transition-transform" size={28} />
              </div>
              <div><h3 className="text-gray-300 text-lg font-semibold">Scrap Procurement &amp; Trading</h3><p className="mt-2 text-sm leading-relaxed text-gray-400">Bulk scrap procurement and trading support for ongoing requirements and project-based work.</p></div>
            </div>
          </div>
        </div>
        
        <p className="text-gray-400 text-lg mt-12 leading-relaxed">
          Every engagement is approached with attention to site requirements, safe coordination and clear commercial terms.
        </p>
      </section>

      {/* MISSION & VISION SECTION */}
      <section className="max-w-[1400px] mx-auto px-4 py-24 border-y border-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* MISSION */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent rounded-xl blur-lg"></div>
            <div className="relative bg-gray-900/50 backdrop-blur border border-blue-600/30 group-hover:border-blue-600/60 p-12 rounded-xl transition-all duration-300">
              <Target className="text-blue-500 mb-6" size={40} />
              <h3 className="text-3xl font-black text-white mb-6">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                To deliver dependable scrap handling, dismantling and trading services with a strong focus on safety, transparency and responsible material recovery.
              </p>
            </div>
          </div>

          {/* VISION */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent rounded-xl blur-lg"></div>
            <div className="relative bg-gray-900/50 backdrop-blur border border-blue-600/30 group-hover:border-blue-600/60 p-12 rounded-xl transition-all duration-300">
              <Award className="text-blue-500 mb-6" size={40} />
              <h3 className="text-3xl font-black text-white mb-6">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                To be a trusted partner for industrial and commercial scrap projects, known for professional coordination, honest dealings and lasting business relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="max-w-[1400px] mx-auto px-4 py-24">
        <h2 className="text-4xl font-black text-white mb-16 text-center">Why Work With RJ Steels &amp; Traders</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="group bg-[#111111] border border-[#a9121b]/60 hover:border-[#d7b36a] p-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#a9121b]/20">
            <div className="w-12 h-12 bg-[#a9121b]/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#a9121b]/30 transition-colors">
              <Target className="text-[#d7b36a]" size={28} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Industrial Project Experience</h4>
            <p className="text-gray-400">A practical approach to factory and mill requirements</p>
          </div>

          <div className="group bg-[#111111] border border-[#a9121b]/60 hover:border-[#d7b36a] p-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#a9121b]/20">
            <div className="w-12 h-12 bg-[#a9121b]/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#a9121b]/30 transition-colors">
              <Users className="text-[#d7b36a]" size={28} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">End-to-end Coordination</h4>
            <p className="text-gray-400">Support from project discussion through material movement</p>
          </div>

          <div className="group bg-[#111111] border border-[#a9121b]/60 hover:border-[#d7b36a] p-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#a9121b]/20">
            <div className="w-12 h-12 bg-[#a9121b]/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#a9121b]/30 transition-colors">
              <Award className="text-[#d7b36a]" size={28} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Clear Communication</h4>
            <p className="text-gray-400">Straightforward discussions on scope and requirements</p>
          </div>

          <div className="group bg-[#111111] border border-[#a9121b]/60 hover:border-[#d7b36a] p-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#a9121b]/20">
            <div className="w-12 h-12 bg-[#a9121b]/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#a9121b]/30 transition-colors">
              <CheckCircle className="text-[#d7b36a]" size={28} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Safety-minded Handling</h4>
            <p className="text-gray-400">Careful planning for industrial scrap and dismantling work</p>
          </div>

          <div className="group bg-[#111111] border border-[#a9121b]/60 hover:border-[#d7b36a] p-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#a9121b]/20">
            <div className="w-12 h-12 bg-[#a9121b]/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#a9121b]/30 transition-colors">
              <Users className="text-[#d7b36a]" size={28} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Flexible Trading Support</h4>
            <p className="text-gray-400">Bulk procurement and trading for varied project needs</p>
          </div>

          <div className="group bg-[#111111] border border-[#a9121b]/60 hover:border-[#d7b36a] p-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#a9121b]/20">
            <div className="w-12 h-12 bg-[#a9121b]/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#a9121b]/30 transition-colors">
              <Target className="text-[#d7b36a]" size={28} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Responsible Recovery</h4>
            <p className="text-gray-400">Helping recyclable materials return to productive use</p>
          </div>
        </div>
      </section>

      {/* COMMITMENT SECTION */}
      <section className="max-w-[1400px] mx-auto px-4 py-24">
        <div className="relative overflow-hidden">
          <div className="relative bg-[#111111] border border-[#a9121b]/60 rounded-2xl p-16 text-center">
            <h2 className="text-4xl font-black text-white mb-8">Our Commitment</h2>
            <p className="text-gray-300 text-xl leading-relaxed max-w-2xl mx-auto">
              At RJ Steels &amp; Traders, we believe every project starts with trust. We are committed to handling scrap and dismantling requirements with care, clear communication and professional integrity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
