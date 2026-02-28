import React from 'react';
import { CheckCircle, Users, Target, Award } from 'lucide-react';

// ============================================
// ABOUT PAGE
// ============================================

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* HERO SECTION */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-blue-600/10"></div>
        <div className="relative max-w-[1400px] mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
            About RJ Textile Machinery
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Trusted textile machinery solutions built on partnership, integrity, and expertise
          </p>
        </div>
      </section>

      {/* WHO WE ARE SECTION */}
      <section className="max-w-[1400px] mx-auto px-4 py-24">
        <div className="grid grid-cols-1 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-black text-white mb-8">Who We Are</h2>
            <div className="space-y-6">
              <p className="text-gray-400 text-lg leading-relaxed">
                RJ Textile Machinery is a trusted name in the textile machinery industry, specializing in the supply, sourcing, and support of high-performance textile machines. With strong technical knowledge and industry experience, we serve textile manufacturers with reliable machinery solutions that improve productivity, efficiency, and operational stability.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                We operate as a partnership firm, built on transparency, integrity, and long-term business relationships.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800">
              <div className="flex gap-12">
                <div>
                  <p className="text-4xl font-black text-blue-500 mb-2">2</p>
                  <p className="text-gray-400">Dedicated Partners</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-blue-500 mb-2">50+</p>
                  <p className="text-gray-400">Products & Spares</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-blue-500 mb-2">50+</p>
                  <p className="text-gray-400">Global Clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP SECTION */}
      <section className="max-w-[1400px] mx-auto px-4 py-24 border-y border-gray-800">
        <h2 className="text-4xl font-black text-white mb-16 text-center">Our Leadership</h2>
        <p className="text-gray-400 text-center mb-16 text-lg">
          RJ Textile Machinery is led by its partners:
        </p>
        
        <div className="grid grid-cols-1 gap-8">
          {/* BENINRAJ */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-gray-900/80 backdrop-blur border border-gray-800 group-hover:border-blue-600/50 rounded-xl overflow-hidden transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-0">
                <div className="w-full md:w-2/5 h-80 md:h-auto overflow-hidden">
                  <img 
                    src="/assets/Benin raj.jpeg" 
                    alt="BENINRAJ" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="w-full md:w-3/5 p-10 md:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl font-black text-white mb-2">BENINRAJ</h3>
                  <p className="text-blue-500 font-bold text-lg mb-6">Partner</p>
                  <p className="text-gray-400 leading-relaxed">
                    With extensive industry expertise and strategic vision, BENINRAJ leads the company's overall operations and business development, ensuring sustainable growth and client satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AXLIN ABINESH */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-gray-900/80 backdrop-blur border border-gray-800 group-hover:border-blue-600/50 rounded-xl overflow-hidden transition-all duration-300">
              <div className="flex flex-col md:flex-row-reverse gap-0">
                <div className="w-full md:w-2/5 h-80 md:h-auto overflow-hidden">
                  <img 
                    src="/assets/Axlin.jpeg" 
                    alt="AXLIN ABINESH" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="w-full md:w-3/5 p-10 md:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl font-black text-white mb-2">AXLIN ABINESH</h3>
                  <p className="text-blue-500 font-bold text-lg mb-6">Partner</p>
                  <p className="text-gray-400 leading-relaxed">
                    With deep technical knowledge and operational excellence, AXLIN ABINESH oversees product quality, customer support, and strategic initiatives ensuring superior service delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-400 text-center mt-12 text-lg max-w-2xl mx-auto">
          Their combined experience ensures that every client receives dependable machinery solutions and professional service.
        </p>
      </section>

      {/* WHAT WE DO SECTION */}
      <section className="max-w-[1400px] mx-auto px-4 py-24">
        <h2 className="text-4xl font-black text-white mb-6">What We Do</h2>
        <p className="text-gray-400 text-lg mb-12">We specialize in:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="group bg-gradient-to-br from-blue-600/10 to-transparent border border-gray-800 group-hover:border-blue-600/50 p-8 rounded-lg transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="text-blue-500 group-hover:scale-110 transition-transform" size={28} />
              </div>
              <span className="text-gray-300 text-lg font-semibold">Textile machinery sales</span>
            </div>
          </div>
          <div className="group bg-gradient-to-br from-blue-600/10 to-transparent border border-gray-800 group-hover:border-blue-600/50 p-8 rounded-lg transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="text-blue-500 group-hover:scale-110 transition-transform" size={28} />
              </div>
              <span className="text-gray-300 text-lg font-semibold">Sourcing of quality machines</span>
            </div>
          </div>
          <div className="group bg-gradient-to-br from-blue-600/10 to-transparent border border-gray-800 group-hover:border-blue-600/50 p-8 rounded-lg transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="text-blue-500 group-hover:scale-110 transition-transform" size={28} />
              </div>
              <span className="text-gray-300 text-lg font-semibold">Machinery consultation and selection</span>
            </div>
          </div>
          <div className="group bg-gradient-to-br from-blue-600/10 to-transparent border border-gray-800 group-hover:border-blue-600/50 p-8 rounded-lg transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="text-blue-500 group-hover:scale-110 transition-transform" size={28} />
              </div>
              <span className="text-gray-300 text-lg font-semibold">Installation coordination support</span>
            </div>
          </div>
          <div className="group bg-gradient-to-br from-blue-600/10 to-transparent border border-gray-800 group-hover:border-blue-600/50 p-8 rounded-lg transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="text-blue-500 group-hover:scale-110 transition-transform" size={28} />
              </div>
              <span className="text-gray-300 text-lg font-semibold">After-sales assistance</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-400 text-lg mt-12 leading-relaxed">
          Our focus is to deliver machines that meet production demands while maintaining cost efficiency and durability.
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
                To provide reliable, high-quality textile machinery solutions that help textile manufacturers enhance productivity, maintain consistency, and achieve sustainable growth.
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
                To become a preferred textile machinery partner known for quality products, honest dealings, and strong client relationships across the textile industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="max-w-[1400px] mx-auto px-4 py-24">
        <h2 className="text-4xl font-black text-white mb-16 text-center">Why Choose RJ Textile Machinery</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="group bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 group-hover:border-blue-600/50 p-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600/30 transition-colors">
              <Target className="text-blue-500" size={28} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Partnership-driven Business Values</h4>
            <p className="text-gray-400">Built on transparency and integrity</p>
          </div>

          <div className="group bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 group-hover:border-blue-600/50 p-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600/30 transition-colors">
              <Users className="text-blue-500" size={28} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Industry-focused Expertise</h4>
            <p className="text-gray-400">Hands-on textile manufacturing knowledge</p>
          </div>

          <div className="group bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 group-hover:border-blue-600/50 p-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600/30 transition-colors">
              <Award className="text-blue-500" size={28} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Transparent Operations</h4>
            <p className="text-gray-400">Ethical dealings with all stakeholders</p>
          </div>

          <div className="group bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 group-hover:border-blue-600/50 p-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600/30 transition-colors">
              <CheckCircle className="text-blue-500" size={28} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Strong Supplier Network</h4>
            <p className="text-gray-400">Quality machine sourcing access</p>
          </div>

          <div className="group bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 group-hover:border-blue-600/50 p-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600/30 transition-colors">
              <Users className="text-blue-500" size={28} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Dedicated Support</h4>
            <p className="text-gray-400">Professional customer service</p>
          </div>

          <div className="group bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 group-hover:border-blue-600/50 p-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600/30 transition-colors">
              <Target className="text-blue-500" size={28} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Long-term Relationships</h4>
            <p className="text-gray-400">Commitment to client success</p>
          </div>
        </div>
      </section>

      {/* COMMITMENT SECTION */}
      <section className="max-w-[1400px] mx-auto px-4 py-24">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-blue-600/5 rounded-2xl"></div>
          <div className="relative bg-gray-900/30 backdrop-blur border border-blue-600/30 rounded-2xl p-16 text-center">
            <h2 className="text-4xl font-black text-white mb-8">Our Commitment</h2>
            <p className="text-gray-300 text-xl leading-relaxed max-w-2xl mx-auto">
              At RJ Textile Machinery, we believe business is built on trust. We are committed to delivering machinery solutions that meet our clients' operational goals while maintaining professional integrity and service excellence.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
