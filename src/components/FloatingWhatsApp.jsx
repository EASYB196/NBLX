
import React, { useEffect, useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import whatsapp from '../assets/images/whatsappicon.png';

const FloatingButtons = () => {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButtons(window.scrollY > 100);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/2349117098144"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="
          fixed bottom-20 right-4 z-40
          flex items-center justify-center
          rounded-full
          transition-transform duration-300
          hover:scale-110
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-green-500
          focus-visible:ring-offset-2
          sm:right-5
        "
      >
        <img
          src={whatsapp}
          alt=""
          className="h-11 w-11 object-contain sm:h-12 sm:w-12"
        />
      </a>

      {/* Scroll To Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        aria-hidden={!showButtons}
        tabIndex={showButtons ? 0 : -1}
        className={`
          fixed bottom-7 right-4 z-40
          flex items-center gap-1.5
          rounded-md bg-white
          px-3 py-2.5
          text-black shadow-md
          transition-all duration-300
          hover:scale-105 hover:shadow-lg
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-black
          sm:bottom-8 sm:right-5
          ${
            showButtons
              ? 'translate-y-0 opacity-100 pointer-events-auto'
              : 'translate-y-3 opacity-0 pointer-events-none'
          }
        `}
      >
        <span className="text-xs font-semibold">TOP</span>
        <FaChevronUp className="text-[10px]" />
      </button>
    </>
  );
};

export default FloatingButtons;
