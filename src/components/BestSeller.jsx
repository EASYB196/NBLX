
// import React, { useCallback, useRef } from 'react';

// import { BestSellerData } from '../data/BestSellerData';
// import BestSellerCard from '../components/BestSellerCard';
// import BestSellerHeader from '../components/BestSellerHeader';

// const FEATURED_PRODUCTS = BestSellerData.slice(0, 9);

// const BestSellerList = () => {
//   const scrollRef = useRef(null);

//   const scrollCarousel = useCallback((direction) => {
//     const container = scrollRef.current;

//     if (!container) return;

//     // Scroll relative to the visible width for better responsiveness.
//     const scrollAmount = container.clientWidth * 0.85;

//     container.scrollBy({
//       left: direction * scrollAmount,
//       behavior: 'smooth',
//     });
//   }, []);

//   const scrollLeft = useCallback(() => {
//     scrollCarousel(-1);
//   }, [scrollCarousel]);

//   const scrollRight = useCallback(() => {
//     scrollCarousel(1);
//   }, [scrollCarousel]);

//   return (
//     <section
//       aria-labelledby='bestseller-products'
//       className='w-full overflow-hidden bg-white py-8 sm:py-10 lg:py-12'
//     >
//       {/* Section header and carousel controls */}
//       <div className='mb-5 sm:mb-7'>
//         <BestSellerHeader onPrev={scrollLeft} onNext={scrollRight} />
//       </div>

//       {/* Horizontally scrollable products */}
//       <div
//         ref={scrollRef}
//         role='region'
//         aria-label='Best-selling products'
//         tabIndex={0}
//         className='
//             flex w-full
//             snap-x snap-proximity
//             gap-3 overflow-x-auto
//             overscroll-x-contain
//             scroll-smooth
//             px-4 pb-5
//             focus-visible:outline-none
//             focus-visible:ring-2
//             focus-visible:ring-inset
//             focus-visible:ring-black/30
//             sm:gap-4 sm:px-6
//             lg:gap-5 lg:px-8
//             xl:px-10
//             [scrollbar-width:none]
//             [-ms-overflow-style:none]
//             [&::-webkit-scrollbar]:hidden
//           '
//       >
//         {FEATURED_PRODUCTS.map((product) => (
//           <div
//             key={product.id}
//             className='
//                 w-[76%] shrink-0 snap-start
//                 min-[480px]:w-[55%]
//                 sm:w-[42%]
//                 md:w-[34%]
//                 lg:w-[27%]
//                 xl:w-[23%]
//               '
//           >
//             <BestSellerCard product={product} />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default BestSellerList;

import React, { useCallback, useRef } from 'react';

import { BestSellerData } from '../data/BestSellerData';
import BestSellerCard from '../components/BestSellerCard';
import BestSellerHeader from '../components/BestSellerHeader';

const FEATURED_PRODUCTS = BestSellerData.slice(0, 9);

const BestSellerList = () => {
  const scrollRef = useRef(null);

  const scrollCarousel = useCallback((direction) => {
    const container = scrollRef.current;

    if (!container) return;

    const firstCard = container.firstElementChild;
    const cardWidth = firstCard?.getBoundingClientRect().width || 250;

    const styles = window.getComputedStyle(container);
    const gap = parseFloat(styles.columnGap) || 0;

    container.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: 'smooth',
    });
  }, []);

  const scrollLeft = useCallback(() => {
    scrollCarousel(-1);
  }, [scrollCarousel]);

  const scrollRight = useCallback(() => {
    scrollCarousel(1);
  }, [scrollCarousel]);

  return (
    <section
      aria-labelledby="bestseller-products"
      className="w-full overflow-hidden bg-white py-8 sm:py-10 lg:py-12"
    >
      <div className="mb-5 sm:mb-7">
        <BestSellerHeader
          onPrev={scrollLeft}
          onNext={scrollRight}
        />
      </div>

      <div
        ref={scrollRef}
        role="region"
        aria-label="Best-selling products"
        tabIndex={0}
        className="
          flex w-full
          snap-x snap-mandatory
          gap-1.5 overflow-x-auto
          overscroll-x-contain
          scroll-smooth
          px-2 pb-5
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-inset
          focus-visible:ring-black/30
          min-[480px]:gap-2
          min-[480px]:px-3
          sm:gap-3 sm:px-6
          lg:gap-5 lg:px-8
          xl:px-10
          [scrollbar-width:none]
          [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {FEATURED_PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="
              w-[82%] shrink-0 snap-start
              min-[480px]:w-[58%]
              sm:w-[42%]
              md:w-[34%]
              lg:w-[27%]
              xl:w-[23%]
            "
          >
            <BestSellerCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellerList;
