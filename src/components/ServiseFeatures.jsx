

import React from 'react';
import { FiTruck, FiShield, FiRefreshCw, FiHeadphones, FiArrowUpRight } from 'react-icons/fi';

import { features } from '../data/Features';

const iconMap = {
  truck: FiTruck,
  shield: FiShield,
  refresh: FiRefreshCw,
  headphones: FiHeadphones,
};

/* -------------------------------------------------------------------------- */
/*                         INDIVIDUAL FEATURE CARD                            */
/* -------------------------------------------------------------------------- */

const FeatureCard = ({ item }) => {
  const Icon = iconMap[item.icon] || FiShield;
  const description = item.description || '';

  const hasLink =
    typeof item.link === 'string' &&
    item.link.trim().length > 0 &&
    typeof item.cta === 'string' &&
    item.cta.trim().length > 0;

  return (
    <article
      className='
        group relative flex h-full min-h-0 w-full min-w-0
        flex-col justify-between
        rounded-2xl border border-neutral-200/80
        bg-white p-6 text-left shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-neutral-300
        hover:shadow-xl hover:shadow-black/[0.04]
        sm:p-8
      '
    >
      <div className='w-full min-w-0'>
        {/* Icon */}
        <div
          className='
            mb-6 flex h-14 w-14 shrink-0
            items-center justify-center rounded-xl
            bg-neutral-100 text-neutral-900
            transition-all duration-300
            group-hover:scale-105
            group-hover:bg-black group-hover:text-white
          '
        >
          <Icon aria-hidden='true' size={24} strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3
          className='
            w-full min-w-0
            whitespace-normal break-words
            font-serif text-lg font-medium
            tracking-tight text-neutral-950
            sm:text-xl
          '
        >
          {item.title}
        </h3>

        {/* Full description: no truncation or fixed height */}
        <div className='mt-3 w-full min-w-0'>
          <p
            className='
              w-full min-w-0
              whitespace-normal break-words
              text-sm font-light leading-7
              text-neutral-500
              sm:text-[15px]
              [overflow-wrap:anywhere]
            '
          >
            {description}
          </p>
        </div>
      </div>

      {/* Call to action */}
      {hasLink && (
        <div className='mt-8 w-full min-w-0 border-t border-neutral-100 pt-4'>
          <a
            href={item.link}
            className='
              inline-flex max-w-full items-center gap-2
              whitespace-normal break-words
              text-xs font-semibold uppercase
              tracking-widest text-black
              transition-opacity duration-200
              hover:opacity-70
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-black
              focus-visible:ring-offset-2
            '
          >
            <span className='min-w-0 whitespace-normal break-words'>{item.cta}</span>

            <FiArrowUpRight
              aria-hidden='true'
              size={16}
              className='
                shrink-0 transition-transform duration-200
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              '
            />
          </a>
        </div>
      )}
    </article>
  );
};

/* -------------------------------------------------------------------------- */
/*                        MAIN SERVICE FEATURES SECTION                       */
/* -------------------------------------------------------------------------- */

const ServiceFeatures = () => {
  return (
    <section
      aria-label='Our service commitments'
      className='
        w-full bg-white
        px-5 py-16
        sm:px-8 sm:py-20
        lg:px-12 lg:py-24
      '
    >
      <div className='mx-auto w-full max-w-7xl min-w-0'>
        {/* Section heading */}
        <div className='mb-12 text-center sm:mb-16 md:mb-20'>
          <span
            className='
              mb-3 inline-block
              text-[11px] font-semibold uppercase
              tracking-[0.25em] text-neutral-400
            '
          >
            The NBLX Standard
          </span>

          <h2
            className='
              whitespace-normal break-words
              font-serif text-3xl font-light
              tracking-tight text-neutral-950
              sm:text-4xl md:text-5xl
            '
          >
            Shopping with confidence
          </h2>

          <p
            className='
              mx-auto mt-4 max-w-lg
              whitespace-normal break-words
              text-sm font-light leading-7
              text-neutral-500 sm:text-base
            '
          >
            Thoughtful service, dependable support, and an elevated shopping experience from
            start to finish.
          </p>
        </div>

        {/* Responsive feature grid */}
        <div
          className='
            grid w-full min-w-0
            grid-cols-1 items-stretch gap-6
            sm:grid-cols-2
            lg:grid-cols-4 lg:gap-8
          '
        >
          {features.map((item, index) => (
            <FeatureCard key={`${item.icon}-${item.title}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;





// import React, { useState } from 'react';
// import { FiTruck, FiShield, FiRefreshCw, FiHeadphones, FiArrowUpRight } from 'react-icons/fi';

// import { features } from '../data/Features';

// const iconMap = {
//   truck: FiTruck,
//   shield: FiShield,
//   refresh: FiRefreshCw,
//   headphones: FiHeadphones,
// };

// const DESCRIPTION_LIMIT = 100;

// const ServiceFeatures = () => {
//   const [expandedDescriptions, setExpandedDescriptions] = useState({});

//   const toggleDescription = (index) => {
//     setExpandedDescriptions((previous) => ({
//       ...previous,
//       [index]: !previous[index],
//     }));
//   };

//   return (
//     <section
//       aria-label='Our service commitments'
//       className='w-full overflow-hidden bg-white px-4 py-10
//         sm:px-6 sm:py-12
//         md:px-8 md:py-14
//         lg:px-12 lg:py-16
//         xl:px-20'
//     >
//       <div className='mx-auto w-full max-w-7xl'>
//         {/* Section heading */}
//         <div className='mb-8 text-center sm:mb-10 md:mb-12'>
//           <span className='mb-3 inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500 sm:text-xs'>
//             The NBLX Standard
//           </span>

//           <h2 className='text-2xl font-semibold tracking-tight text-black sm:text-3xl md:text-4xl'>
//             Shopping with confidence
//           </h2>

//           <p className='mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base sm:leading-7'>
//             Thoughtful service, dependable support, and a better shopping experience from start
//             to finish.
//           </p>
//         </div>

//         {/* Responsive feature grid */}
//         <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-4 xl:gap-5'>
//           {features.map((item, index) => {
//             const Icon = iconMap[item.icon] || FiShield;
//             const description = item.description || '';
//             const isLong = description.length > DESCRIPTION_LIMIT;
//             const isExpanded = Boolean(expandedDescriptions[index]);

//             const displayedDescription =
//               isLong && !isExpanded
//                 ? `${description.slice(0, DESCRIPTION_LIMIT).trimEnd()}...`
//                 : description;

//             const hasLink =
//               typeof item.link === 'string' &&
//               item.link.trim().length > 0 &&
//               typeof item.cta === 'string' &&
//               item.cta.trim().length > 0;

//             return (
//               <article
//                 key={`${item.icon}-${item.title}-${index}`}
//                 className='group flex min-w-0 flex-col items-center
//                   rounded-xl border border-gray-100 bg-white
//                   px-5 py-6 text-center
//                   transition-all duration-300
//                   hover:-translate-y-1 hover:border-gray-300
//                   hover:shadow-lg hover:shadow-black/[0.04]
//                   sm:px-5 sm:py-7
//                   md:px-6 md:py-8
//                   lg:px-4 lg:py-7
//                   xl:px-5 xl:py-8'
//               >
//                 {/* Icon */}
//                 <div
//                   className='mb-4 flex h-12 w-12 shrink-0
//                     items-center justify-center rounded-full
//                     bg-gray-50 text-black
//                     transition-colors duration-300
//                     group-hover:bg-black group-hover:text-white
//                     sm:mb-5 sm:h-14 sm:w-14'
//                 >
//                   <Icon aria-hidden='true' size={23} strokeWidth={1.6} />
//                 </div>

//                 {/* Title */}
//                 <h3
//                   className='w-full break-words text-base
//                   font-semibold tracking-tight text-gray-950
//                   sm:text-lg'
//                 >
//                   {item.title}
//                 </h3>

//                 {/* Description with Read More */}
//                 <div className='mt-3 flex w-full max-w-[280px] flex-1 flex-col items-center'>
//                   <p className='w-full break-words text-sm leading-6 text-gray-500 sm:text-[15px] sm:leading-7'>
//                     {displayedDescription}
//                   </p>

//                   {isLong && (
//                     <button
//                       type='button'
//                       onClick={() => toggleDescription(index)}
//                       aria-expanded={isExpanded}
//                       className='mt-1 inline-flex min-h-8 items-center
//                         rounded-sm text-xs font-semibold text-black
//                         underline underline-offset-4
//                         decoration-gray-300
//                         transition-colors hover:decoration-black
//                         focus-visible:outline-none
//                         focus-visible:ring-2 focus-visible:ring-black
//                         focus-visible:ring-offset-2'
//                     >
//                       {isExpanded ? 'Read less' : 'Read more'}
//                     </button>
//                   )}
//                 </div>

//                 {/* Call to action */}
//                 {hasLink && (
//                   <a
//                     href={item.link}
//                     className='mt-5 inline-flex min-h-10 max-w-full
//                       items-center justify-center gap-1.5
//                       rounded-sm text-sm font-semibold text-black
//                       underline decoration-transparent underline-offset-4
//                       transition-colors duration-200
//                       hover:decoration-current
//                       focus-visible:outline-none
//                       focus-visible:ring-2 focus-visible:ring-black
//                       focus-visible:ring-offset-4'
//                   >
//                     <span className='break-words'>{item.cta}</span>

//                     <FiArrowUpRight
//                       aria-hidden='true'
//                       size={15}
//                       className='shrink-0 transition-transform duration-200
//                         group-hover:translate-x-0.5
//                         group-hover:-translate-y-0.5'
//                     />
//                   </a>
//                 )}
//               </article>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServiceFeatures;