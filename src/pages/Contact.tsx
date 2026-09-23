import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

// ============================================
// CONTACT PAGE
// ============================================

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* PAGE HEADER */}
      <section className="py-20 px-4">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">Contact Us</h1>
          <p className="text-xl text-white/70">
            Get in touch with our team to discuss your textile machinery needs
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="max-w-[1400px] mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* PHONE */}
          <div className="bg-black p-8 border border-[#1d2d3d] rounded-sm hover:border-[#ff3b30]/80 transition-colors group">
            <div className="flex justify-center mb-6">
              <Phone className="text-[#ff3b30] group-hover:scale-110 transition-transform" size={32} />
            </div>
            <h3 className="text-lg font-bold text-white mb-4 text-center">Phone</h3>
            <p className="text-gray-300 text-sm text-center mb-3">Call us for immediate support</p>
            <a href="tel:+919344158524" className="text-[#ff3b30] hover:text-[#ff5b50] font-bold text-center block transition-colors">
              +91 93441 58524
            </a>
          </div>

          {/* EMAIL */}
          <div className="bg-black p-8 border border-[#1d2d3d] rounded-sm hover:border-[#ff3b30]/80 transition-colors group">
            <div className="flex justify-center mb-6">
              <Mail className="text-[#ff3b30] group-hover:scale-110 transition-transform" size={32} />
            </div>
            <h3 className="text-lg font-bold text-white mb-4 text-center">Email</h3>
            <p className="text-gray-300 text-sm text-center mb-3">Send us your queries</p>
            <a href="mailto:rjtextilemachinery@gmail.com" className="text-[#ff3b30] hover:text-[#ff5b50] font-bold text-center block transition-colors break-all text-xs sm:text-sm">
              rjtextilemachinery@gmail.com
            </a>
          </div>

          {/* ADDRESS */}
          <div className="bg-black p-8 border border-[#1d2d3d] rounded-sm hover:border-[#ff3b30]/80 transition-colors group">
            <div className="flex justify-center mb-6">
              <MapPin className="text-[#ff3b30] group-hover:scale-110 transition-transform" size={32} />
            </div>
            <h3 className="text-lg font-bold text-white mb-4 text-center">Address</h3>
            <p className="text-gray-300 text-sm text-center leading-relaxed">
              MR COMPLEX,<br />
              CHETTIPALAYAM ROAD,<br />
              PALLADAM
            </p>
          </div>

          {/* BUSINESS HOURS */}
          <div className="bg-black p-8 border border-[#1d2d3d] rounded-sm hover:border-[#ff3b30]/80 transition-colors group">
            <div className="flex justify-center mb-6">
              <Clock className="text-[#ff3b30] group-hover:scale-110 transition-transform" size={32} />
            </div>
            <h3 className="text-lg font-bold text-white mb-4 text-center">Business Hours</h3>
            <p className="text-gray-300 text-sm text-center mb-2">Mon - Fri: 9:00 AM - 6:00 PM</p>
            <p className="text-[#ff3b30] text-sm text-center">24/7 Emergency Support</p>
          </div>
        </div>

        {/* MAP SECTION */}
        <div className="mt-20 border border-[#1d2d3d] rounded-sm overflow-hidden bg-black">
          <div className="bg-black p-4 border-b border-[#1d2d3d]">
            <h3 className="text-3xl font-black text-white mb-2">Our Location</h3>
            <p className="text-gray-300 text-sm uppercase tracking-wide">MR COMPLEX, CHETTIPALAYAM ROAD, PALLADAM</p>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.2467571234567!2d77.13333!3d11.03333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96c1c1c1c1c1d%3A0x1c1c1c1c1c1c1c1c!2sPalladam%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          ></iframe>
        </div>

        {/* ADDITIONAL INFO */}
        <div className="mt-20 bg-black border border-[#1d2d3d] rounded-sm p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Work with Us?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact our team today to discuss your textile machinery requirements. We're here to provide you with the best solutions and support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919344158524"
              className="bg-[#ff3b30] hover:bg-[#ff5b50] text-white font-bold py-3 px-8 rounded-sm transition-colors"
            >
              Call Now
            </a>
            <a
              href="mailto:rjtextilemachinery@gmail.com"
              className="bg-black hover:bg-[#a9121b] text-white font-bold py-3 px-8 rounded-sm transition-colors border border-[#1d2d3d]"
            >
              Send Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
