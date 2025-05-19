import React from "react";
import { WhatsAppIcon } from "./icons/social/WhatsAppIcon";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message = "Hello! I'm interested in Le Bambou Gorilla Lodge",
  className = "",
}) => {
  const formattedPhone = phoneNumber.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 bg-[#25D366] text-white py-2 px-4 rounded hover:bg-[#1aa350] transition-colors ${className}`}
      aria-label="Chat on WhatsApp"
    >
      <span className="text-white">
        <WhatsAppIcon />
      </span>
      <span>Chat on WhatsApp</span>
    </a>
  );
}; 