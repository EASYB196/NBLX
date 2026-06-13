import React, { useEffect, useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import whatsapp from '../assets/images/whatsappicon.png';

const FloatingButtons = () => {
  const [showButtons, setShowButtons] = useState(false);

  // 👇 Show buttons only after scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButtons(true);
      } else {
        setShowButtons(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 👇 Scroll To Top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div>
        {/* WhatsApp Button */}
        <a
          href='https://wa.me/2347041554896'
          target='_blank'
          rel='noopener noreferrer'
          className='fixed bottom-20 right-5 z-999'
        >
          <img
            src={whatsapp}
            alt='WhatsApp'
            className='h-12 w-12 cursor-pointer hover:scale-110 transition-transform duration-300'
          />
        </a>

        {/* Scroll To Top Button */}
        {showButtons && (
          <div
            onClick={scrollToTop}
            className='fixed bottom-8 right-3 z-999 cursor-pointer bg-white text-black px-3 py-2 rounded flex items-center gap-1 shadow-md hover:scale-105 transition'
          >
            <h3 className='text-xs font-semibold'>TOP</h3>

            <FaChevronUp className='text-black text-[10px]' />
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingButtons;
