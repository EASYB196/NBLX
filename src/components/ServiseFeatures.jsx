// import React from 'react';

// import { features } from '../data/Features';
// import {
//   FiTruck,
//   FiShield,
//   FiRefreshCw,
//   FiHeadphones,
// } from 'react-icons/fi';

// const iconMap = {
//   truck: <FiTruck />,
//   shield: <FiShield />,
//   refresh: <FiRefreshCw />,
//   headphones: <FiHeadphones />,
// };

// const ServiceFeatures = () => {
//   return (
//     <section className='w-full bg-white py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-10 lg:px-20'>
//       <div className='max-w-7xl mx-auto'>
//         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 md:gap-x-8'>
//           {features.map((item, index) => (
//             <div
//               key={index}
//               className='text-center space-y-2.5 sm:space-y-3 hover:scale-105 transition duration-300 group px-3 sm:px-4 md:px-2'
//             >
//               {/* ICON */}
//               <div className='text-xl sm:text-2xl text-black flex justify-center'>
//                 {iconMap[item.icon]}
//               </div>

//               {/* TITLE */}
//               <h3 className='font-semibold text-base sm:text-lg'>
//                 {item.title}
//               </h3>

//               {/* DESCRIPTION */}
//               <p className='text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto'>
//                 {item.description}
//               </p>

//               {/* CTA */}
//               <a
//                 href={item.link}
//                 className='relative text-xs sm:text-sm font-semibold text-black inline-block'
//               >
//                 {item.cta}

//                 {/* UNDERLINE ANIMATION */}
//                 <span className='absolute left-0 -bottom-1 w-0 h-px bg-black transition-all duration-300 group-hover:w-full'></span>
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServiceFeatures;



import React, { useState } from 'react';
import { FiTruck, FiShield, FiRefreshCw, FiHeadphones, FiArrowUpRight } from 'react-icons/fi';

import { features } from '../data/Features';

const iconMap = {
  truck: FiTruck,
  shield: FiShield,
  refresh: FiRefreshCw,
  headphones: FiHeadphones,
};

const DESCRIPTION_LIMIT = 100;

const ServiceFeatures = () => {
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const toggleDescription = (index) => {
    setExpandedDescriptions((previous) => ({
      ...previous,
      [index]: !previous[index],
    }));
  };

  return (
    <section
      aria-label='Our service commitments'
      className='w-full overflow-hidden bg-white px-4 py-10
        sm:px-6 sm:py-12
        md:px-8 md:py-14
        lg:px-12 lg:py-16
        xl:px-20'
    >
      <div className='mx-auto w-full max-w-7xl'>
        {/* Section heading */}
        <div className='mb-8 text-center sm:mb-10 md:mb-12'>
          <span className='mb-3 inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500 sm:text-xs'>
            The NBLX Standard
          </span>

          <h2 className='text-2xl font-semibold tracking-tight text-black sm:text-3xl md:text-4xl'>
            Shopping with confidence
          </h2>

          <p className='mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base sm:leading-7'>
            Thoughtful service, dependable support, and a better shopping experience from start
            to finish.
          </p>
        </div>

        {/* Responsive feature grid */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-4 xl:gap-5'>
          {features.map((item, index) => {
            const Icon = iconMap[item.icon] || FiShield;
            const description = item.description || '';
            const isLong = description.length > DESCRIPTION_LIMIT;
            const isExpanded = Boolean(expandedDescriptions[index]);

            const displayedDescription =
              isLong && !isExpanded
                ? `${description.slice(0, DESCRIPTION_LIMIT).trimEnd()}...`
                : description;

            const hasLink =
              typeof item.link === 'string' &&
              item.link.trim().length > 0 &&
              typeof item.cta === 'string' &&
              item.cta.trim().length > 0;

            return (
              <article
                key={`${item.icon}-${item.title}-${index}`}
                className='group flex min-w-0 flex-col items-center
                  rounded-xl border border-gray-100 bg-white
                  px-5 py-6 text-center
                  transition-all duration-300
                  hover:-translate-y-1 hover:border-gray-300
                  hover:shadow-lg hover:shadow-black/[0.04]
                  sm:px-5 sm:py-7
                  md:px-6 md:py-8
                  lg:px-4 lg:py-7
                  xl:px-5 xl:py-8'
              >
                {/* Icon */}
                <div
                  className='mb-4 flex h-12 w-12 shrink-0
                    items-center justify-center rounded-full
                    bg-gray-50 text-black
                    transition-colors duration-300
                    group-hover:bg-black group-hover:text-white
                    sm:mb-5 sm:h-14 sm:w-14'
                >
                  <Icon aria-hidden='true' size={23} strokeWidth={1.6} />
                </div>

                {/* Title */}
                <h3
                  className='w-full break-words text-base
                  font-semibold tracking-tight text-gray-950
                  sm:text-lg'
                >
                  {item.title}
                </h3>

                {/* Description with Read More */}
                <div className='mt-3 flex w-full max-w-[280px] flex-1 flex-col items-center'>
                  <p className='w-full break-words text-sm leading-6 text-gray-500 sm:text-[15px] sm:leading-7'>
                    {displayedDescription}
                  </p>

                  {isLong && (
                    <button
                      type='button'
                      onClick={() => toggleDescription(index)}
                      aria-expanded={isExpanded}
                      className='mt-1 inline-flex min-h-8 items-center
                        rounded-sm text-xs font-semibold text-black
                        underline underline-offset-4
                        decoration-gray-300
                        transition-colors hover:decoration-black
                        focus-visible:outline-none
                        focus-visible:ring-2 focus-visible:ring-black
                        focus-visible:ring-offset-2'
                    >
                      {isExpanded ? 'Read less' : 'Read more'}
                    </button>
                  )}
                </div>

                {/* Call to action */}
                {hasLink && (
                  <a
                    href={item.link}
                    className='mt-5 inline-flex min-h-10 max-w-full
                      items-center justify-center gap-1.5
                      rounded-sm text-sm font-semibold text-black
                      underline decoration-transparent underline-offset-4
                      transition-colors duration-200
                      hover:decoration-current
                      focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-black
                      focus-visible:ring-offset-4'
                  >
                    <span className='break-words'>{item.cta}</span>

                    <FiArrowUpRight
                      aria-hidden='true'
                      size={15}
                      className='shrink-0 transition-transform duration-200
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5'
                    />
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
