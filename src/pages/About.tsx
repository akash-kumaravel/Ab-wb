import React from 'react';
import { CheckCircle, Users, Target, Award } from 'lucide-react';

// ============================================
// ABOUT PAGE
// ============================================

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* PAGE HEADER */}
      <section className="bg-gradient-to-b from-blue-600/20 to-transparent py-20 px-4">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4">About AB TEXTILE MACHINARY</h1>
          <p className="text-gray-400 text-lg">
            Leading provider of premium textile machinery and equipment worldwide
          </p>
        </div>
      </section>

      {/* COMPANY INFO */}
      <section className="max-w-[1400px] mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Who We Are</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              AB TEXTILE MACHINARY is a global leader in textile machinery manufacturing and distribution. 
              With over 20 years of industry experience, we deliver innovative solutions 
              that drive textile production excellence worldwide.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              Our commitment to quality, innovation, and customer satisfaction has made us 
              the trusted choice for textile manufacturers across the globe.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We combine cutting-edge technology with expert engineering to provide machinery 
              that sets new standards in the textile industry.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-600/20 border border-blue-600/50 p-6 rounded-sm">
              <p className="text-4xl font-black text-blue-500 mb-2">500+</p>
              <p className="text-gray-400">Clients Worldwide</p>
            </div>
            <div className="bg-blue-600/20 border border-blue-600/50 p-6 rounded-sm">
              <p className="text-4xl font-black text-blue-500 mb-2">20+</p>
              <p className="text-gray-400">Years Experience</p>
            </div>
            <div className="bg-blue-600/20 border border-blue-600/50 p-6 rounded-sm">
              <p className="text-4xl font-black text-blue-500 mb-2">150+</p>
              <p className="text-gray-400">Product Models</p>
            </div>
            <div className="bg-blue-600/20 border border-blue-600/50 p-6 rounded-sm">
              <p className="text-4xl font-black text-blue-500 mb-2">24/7</p>
              <p className="text-gray-400">Support Team</p>
            </div>
          </div>
        </div>

        {/* VALUES */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-10">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-900 p-6 border border-gray-800 rounded-sm">
              <Target className="text-blue-500 mb-4" size={32} />
              <h3 className="text-lg font-bold text-white mb-2">Excellence</h3>
              <p className="text-gray-400 text-sm">Committed to delivering superior quality in every product</p>
            </div>
            <div className="bg-gray-900 p-6 border border-gray-800 rounded-sm">
              <Users className="text-blue-500 mb-4" size={32} />
              <h3 className="text-lg font-bold text-white mb-2">Partnership</h3>
              <p className="text-gray-400 text-sm">Building lasting relationships with our clients</p>
            </div>
            <div className="bg-gray-900 p-6 border border-gray-800 rounded-sm">
              <Award className="text-blue-500 mb-4" size={32} />
              <h3 className="text-lg font-bold text-white mb-2">Innovation</h3>
              <p className="text-gray-400 text-sm">Pioneering new technologies for textile industry</p>
            </div>
            <div className="bg-gray-900 p-6 border border-gray-800 rounded-sm">
              <CheckCircle className="text-blue-500 mb-4" size={32} />
              <h3 className="text-lg font-bold text-white mb-2">Reliability</h3>
              <p className="text-gray-400 text-sm">Dependable products and consistent service</p>
            </div>
          </div>
        </div>

        {/* CONTACT INTRO */}
        <div className="bg-blue-600/10 border border-blue-600/50 p-12 rounded-sm text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-6">
            Contact our sales team to discover how AB TEXTILE MACHINARY can transform your textile production
          </p>
          <a href="/contact" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-sm transition-colors">
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
