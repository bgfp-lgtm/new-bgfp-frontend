"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "447776842718";
    const message = "Hello! I'm interested in your services. Can you help me?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-110 active:scale-95 animate-[whatsapp-entrance_0.4s_ease-out_both]"
      aria-label="Contact us on WhatsApp"
    >
      {/* WhatsApp Icon */}
      <MessageCircle className="w-6 h-6" fill="currentColor" />

      {/* Tooltip */}
      <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Chat with us on WhatsApp
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
      </div>

      {/* Pulse Animation Ring — pure CSS, no JS thread cost */}
      <span className="absolute inset-0 rounded-full border-2 border-green-500 animate-[whatsapp-pulse_2s_ease-in-out_infinite]" />

      <style jsx>{`
        @keyframes whatsapp-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        @keyframes whatsapp-entrance {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </button>
  );
};

export default WhatsAppButton;
