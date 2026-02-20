import React from 'react';

const WhatsAppButton: React.FC = () => {
  const whatsappNumber = '+919843140485';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-40 w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
      title="Chat with us on WhatsApp"
    >
      <img
        src="/assets/whats app.png"
        alt="WhatsApp"
        className="w-full h-full rounded-full object-cover"
      />
    </a>
  );
};

export default WhatsAppButton;
