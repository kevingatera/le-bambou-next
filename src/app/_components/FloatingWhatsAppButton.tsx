"use client";

import React, { useEffect, useState, useRef } from "react";
import { WhatsAppIcon } from "./icons/social/WhatsAppIcon";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingWhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  phoneNumber,
  message = "Hello! I'm interested in Le Bambou Gorilla Lodge",
}) => {
  const [isFooterWhatsAppVisible, setIsFooterWhatsAppVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const formattedPhone = phoneNumber.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const footerWhatsAppButton = document.querySelector('.footer .WhatsAppButton');
    if (!footerWhatsAppButton) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsFooterWhatsAppVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.3, rootMargin: "0px" }
    );

    observer.observe(footerWhatsAppButton);
    return () => observer.disconnect();
  }, []);

  const buttonTransition = {
    type: "spring",
    bounce: 0.2,
    duration: 0.4
  };

  const hoverTransition = {
    type: "tween",
    duration: 0.2,
    ease: "easeInOut"
  };

  const textTransition = {
    duration: 0.15,
    ease: "easeOut"
  };

  return (
    <AnimatePresence>
      {!isFooterWhatsAppVisible && (
        <motion.a
          ref={buttonRef}
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1aa350] transition-colors overflow-hidden"
          aria-label="Chat on WhatsApp"
          title="Chat with us on WhatsApp"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          initial={{
            opacity: 0,
            scale: 0.8,
            y: 50,
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '9999px',
            paddingLeft: '0rem',
            paddingRight: '0rem'
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '9999px',
            paddingLeft: '0rem',
            paddingRight: '0rem'
          }}
          whileHover={{
            scale: 1.05,
            width: 'auto',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            transition: hoverTransition
          }}
          whileTap={{ scale: 0.95 }}
          exit={{
            opacity: 0,
            scale: 0.8,
            y: 100,
            transition: { duration: 0.3, ease: "easeIn" }
          }}
          transition={buttonTransition}
          style={{ minWidth: '3.5rem' }}
        >
          <div className="flex items-center justify-center">
            <span className="flex-shrink-0 w-6 h-6 z-10">
              <WhatsAppIcon />
            </span>
            <motion.span
              className="ml-2 whitespace-nowrap overflow-hidden"
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                width: isHovered ? 'auto' : 0,
                marginLeft: isHovered ? '0.5rem' : 0
              }}
              transition={textTransition}
            >
              Chat on WhatsApp
            </motion.span>
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  );
}; 