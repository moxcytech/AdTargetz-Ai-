import React from 'react';
import { WhatsAppIcon } from './icons';

export const WhatsAppWidget: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Floating Button */}
        <a
        href="https://wa.me/919791461659?text=Hi%2C%20I%27m%20interested%20in%20AdTargetz%20Ai%20services%20and%20would%20like%20to%20know%20more."
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:bg-[#128C7E] transition-all duration-300 hover:scale-110 flex items-center justify-center group relative"
        aria-label="Chat with us on WhatsApp"
        >
        <WhatsAppIcon className="w-8 h-8" />
        
        {/* Ripple Effect Element */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping -z-10"></span>
        </a>
    </div>
  );
};