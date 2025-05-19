import React from "react";
import { WhatsAppIcon } from "./icons/social/WhatsAppIcon";

interface FloatingWhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  phoneNumber,
  message = "Hello! I'm interested in Le Bambou Gorilla Lodge",
}) => {
  const formattedPhone = phoneNumber.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1aa350] transition-colors"
      aria-label="Chat on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
}; 