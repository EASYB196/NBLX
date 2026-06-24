import React, { useRef } from 'react';
import { BestSellerData } from '../data/BestSellerData';
import BestSellerCard from '../components/BestSellerCard';
import BestSellerHeader from '../components/BestSellerHeader';

const BestSellerList = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id='best-sellers' className='bg-white w-full'>
      {/* HEADER CONTROLS */}
      <BestSellerHeader onPrev={scrollLeft} onNext={scrollRight} />

      {/* SCROLL AREA */}
      <div
        ref={scrollRef}
        className='
          flex
          gap-5
          overflow-x-auto
          scrollbar-hide
          px-4
          pb-4
          scroll-smooth
        '
      >
        {BestSellerData.slice(0, 9).map((product) => (
          <BestSellerCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestSellerList;
