import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

// ============================================
// CONTACT PAGE
// ============================================

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* PAGE HEADER */}
      <section className="bg-gradient-to-b from-blue-600/20 to-transparent py-20 px-4">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-gray-400 text-lg">
            Get in touch with our team to discuss your textile machinery needs
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="max-w-[1400px] mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* CONTACT INFO */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-8">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <Phone className="text-blue-500 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white font-bold">+91 98431 40485</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="text-blue-500 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="text-gray-400 text-sm">Address</p>
                    <p className="text-white font-bold">MR COMPLEX, CHETTIPALAYAM ROAD</p>
                    <p className="text-gray-400 text-sm">PALLADAM</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="text-blue-500 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="text-gray-400 text-sm">Business Hours</p>
                    <p className="text-white font-bold">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-400 text-sm">24/7 Emergency Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 p-8 border border-gray-800 rounded-sm">
              <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>

              {submitted ? (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-600/20 border border-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl text-green-500">✓</span>
                    </div>
                    <p className="text-lg text-white font-bold">Thank you for your message!</p>
                    <p className="text-gray-400">We'll get back to you shortly.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-white mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-sm focus:border-blue-500 outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-sm focus:border-blue-500 outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white mb-2">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-sm focus:border-blue-500 outline-none transition-colors"
                      placeholder="Your company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-sm focus:border-blue-500 outline-none transition-colors resize-none"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-sm transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
