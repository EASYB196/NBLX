// import React from 'react';
// import { FaArrowRight } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// import hoodieImg from '../assets/images/image copy.png';
// import jacketImg from '../assets/images/HEADER/image2.png';
// import hatImg from '../assets/images/accessories.png';
// import jeanImg from '../assets/images/bottoms.png';

// const collections = [
//   {
//     num: '01',
//     title: 'Hoodies & Sweats',
//     tagline: 'HEAVYWEIGHT ESSENTIALS',
//     description:
//       'Engineered with high-density cotton and structured drop-shoulder cuts. Experience unmatched warmth, architected silhouettes, and iconic streetwear drape.',
//     image: hoodieImg,
//     cta: 'CLAIM YOUR HOODIE',
//     link: '/Hoodies-Sweatshirts',
//   },
//   {
//     num: '02',
//     title: 'Outerwear & Jackets',
//     tagline: 'STATEMENT UTILITY',
//     description:
//       'Designed for seamless layering against the elements. Weather-ready materials, precision hardware, and clean aesthetic lines that command respect.',
//     image: jacketImg,
//     cta: 'DISCOVER OUTERWEAR',
//     link: '/Outerwear-Jackets',
//   },
//   {
//     num: '03',
//     title: 'Streetwear Accessories',
//     tagline: 'THE FINAL DETAIL',
//     description:
//       'Small details make the loudest statement. Premium caps, headwear, and versatile lifestyle accents crafted to elevate your daily rotation.',
//     image: hatImg,
//     cta: 'SHOP ACCESSORIES',
//     link: '/accessories',
//   },
//   {
//     num: '04',
//     title: 'Bottoms & Denim',
//     tagline: 'EFFORTLESS PROPORTIONS',
//     description:
//       'Precision-tailored cargos, raw denim, and relaxed joggers built for fluid movement, daily durability, and uncompromising streetwear poise.',
//     image: jeanImg,
//     cta: 'EXPLORE BOTTOMS',
//     link: '/pants',
//   },
// ];

// const CollectionsSection = () => {
//   return (
//     <section
//       aria-labelledby='collections-heading'
//       className='w-full bg-neutral-950 py-16 text-white sm:py-24 lg:py-32'
//     >
//       <div className='mx-auto w-full max-w-[1920px] px-4 sm:px-8 lg:px-12 xl:px-16'>
//         {/* Section Header */}
//         <header className='flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between'>
//           <div className='max-w-3xl'>
//             <div className='flex items-center gap-3'>
//               <span className='h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse' />
//               <p className='text-xs font-bold uppercase tracking-[0.35em] text-red-500 sm:text-sm'>
//                 NBLX ARCHIVE // 2026 EDITION
//               </p>
//             </div>

//             <h2
//               id='collections-heading'
//               className='mt-4 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl'
//             >
//               WEAR THE <span className='text-neutral-500'>STATEMENT.</span>
//             </h2>

//             <p className='mt-5 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg sm:leading-8'>
//               Step into curated streetwear built without compromise. High-density fabrics,
//               precision tailoring, and bold silhouettes designed to redefine your everyday
//               uniform.
//             </p>
//           </div>

//           <Link
//             to='/collections'
//             className='group inline-flex min-h-[52px] w-fit items-center gap-4 rounded-full border border-neutral-700 bg-neutral-900 px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-white transition-all duration-300 hover:border-red-600 hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500'
//           >
//             <span>VIEW ALL COLLECTIONS</span>
//             <FaArrowRight
//               aria-hidden='true'
//               className='transition-transform duration-300 group-hover:translate-x-1'
//             />
//           </Link>
//         </header>

//         {/* First Divider */}
//         <div
//           aria-hidden='true'
//           className='mt-10 border-t border-neutral-800 sm:mt-12 lg:mt-16'
//         />

//         {/* Scroll-Driven Stack Container (Full Background Images) */}
//         <div className='relative mt-10 sm:mt-12 lg:mt-16'>
//           {collections.map((item, index) => {
//             // Progressive sticky tops and negative margins for card overlapping
//             let stickyTopClass = 'sticky top-16 sm:top-20 lg:top-24';
//             let overlapClass = '';

//             if (index === 1) {
//               stickyTopClass = 'sticky top-20 sm:top-28 lg:top-32';
//               overlapClass = '-mt-16 sm:-mt-24 lg:-mt-32';
//             } else if (index === 2) {
//               stickyTopClass = 'sticky top-24 sm:top-36 lg:top-40';
//               overlapClass = '-mt-16 sm:-mt-24 lg:-mt-32';
//             } else if (index === 3) {
//               stickyTopClass = 'sticky top-28 sm:top-44 lg:top-48';
//               overlapClass = '-mt-16 sm:-mt-24 lg:-mt-32';
//             }

//             return (
//               <article
//                 key={item.title}
//                 className={[
//                   'group relative overflow-hidden rounded-3xl border border-neutral-800',
//                   'min-h-[500px] sm:min-h-[560px] lg:min-h-[640px]',
//                   'flex flex-col justify-between p-6 sm:p-12 lg:p-16',
//                   'shadow-2xl shadow-black/90 backdrop-blur-md',
//                   stickyTopClass,
//                   overlapClass,
//                 ].join(' ')}
//                 style={{ zIndex: index + 1 }}
//               >
//                 {/* Full-bleed Background Image */}
//                 <div className='absolute inset-0 -z-20 h-full w-full overflow-hidden'>
//                   <img
//                     src={item.image}
//                     alt={`${item.title} collection by NBLX`}
//                     loading={index === 0 ? 'eager' : 'lazy'}
//                     decoding='async'
//                     className='h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105'
//                   />
//                 </div>

//                 {/* Dark Gradient Overlay for Copy Contrast */}
//                 <div
//                   aria-hidden='true'
//                   className='absolute inset-0 -z-10 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/30 transition-opacity duration-500 group-hover:opacity-90'
//                 />

//                 {/* Large Background Index Number */}
//                 <span
//                   aria-hidden='true'
//                   className='pointer-events-none absolute right-6 top-2 select-none font-black tracking-tighter text-white/[0.05] text-[100px] sm:text-[180px] lg:text-[240px]'
//                 >
//                   {item.num}
//                 </span>

//                 {/* Top Card Meta Info */}
//                 <div className='relative z-10 flex items-center justify-between'>
//                   <div className='flex items-center gap-3'>
//                     <span className='font-mono text-xs font-semibold tracking-widest text-red-500 sm:text-sm'>
//                       //{item.num}
//                     </span>
//                     <span className='text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-300 sm:text-xs'>
//                       {item.tagline}
//                     </span>
//                   </div>

//                   <Link
//                     to={item.link}
//                     aria-label={`Explore ${item.title}`}
//                     className='flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-red-600 group-hover:text-white sm:h-14 sm:w-14'
//                   >
//                     <FaArrowRight className='-rotate-45 text-sm sm:text-base transition-transform duration-300 group-hover:rotate-0' />
//                   </Link>
//                 </div>

//                 {/* Bottom Card Copy & CTA */}
//                 <div className='relative z-10 mt-auto max-w-2xl pt-12'>
//                   <h3 className='text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl'>
//                     {item.title}
//                   </h3>

//                   <p className='mt-4 max-w-xl text-sm leading-relaxed text-neutral-300 sm:text-base sm:leading-8'>
//                     {item.description}
//                   </p>

//                   <div className='mt-8'>
//                     <Link
//                       to={item.link}
//                       className='group/btn inline-flex min-h-[48px] items-center gap-4 rounded-full bg-white px-8 py-3.5 text-xs font-extrabold tracking-[0.2em] text-black! transition-all duration-300 hover:bg-red-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:text-sm'
//                     >
//                       <span>{item.cta}</span>
//                       <FaArrowRight className='transition-transform duration-300 group-hover/btn:translate-x-1' />
//                     </Link>
//                   </div>
//                 </div>
//               </article>
//             );
//           })}
//         </div>

//         {/* Section Closing Banner */}
//         <div className='relative z-10 mt-16 flex flex-col items-center justify-between gap-6 border-t border-neutral-800 pt-12 sm:flex-row sm:pt-16'>
//           <div>
//             <p className='text-xs font-bold uppercase tracking-[0.25em] text-red-500'>
//               OWN YOUR LOOK
//             </p>
//             <p className='mt-1 text-sm text-neutral-400 sm:text-base'>
//               Limited quantities per drop. Secure your streetwear rotation before it sells out.
//             </p>
//           </div>

//           <Link
//             to='/collections'
//             className='group inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full border border-neutral-700! bg-neutral-900! px-8 py-4 text-center text-xs font-extrabold tracking-[0.18em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto'
//           >
//             EXPLORE THE FULL ARCHIVE
//             <FaArrowRight
//               aria-hidden='true'
//               className='transition-transform duration-300 group-hover:translate-x-1'
//             />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CollectionsSection;

import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import hoodieImg from '../assets/images/image copy.png';
import jacketImg from '../assets/images/HEADER/image2.png';
import hatImg from '../assets/images/accessories.png';
import jeanImg from '../assets/images/bottoms.png';
import jacketVideo from '../assets/videos/jacket-video.mp4';

const collections = [
  {
    num: '01',
    title: 'Hoodies & Sweats',
    tagline: 'HEAVYWEIGHT ESSENTIALS',
    description:
      'Premium heavyweight fabrics, relaxed silhouettes, and everyday comfort. Built to make a statement without trying too hard.',
    image: hoodieImg,
    cta: 'SHOP HOODIES',
    link: '/Hoodies-Sweatshirts',
    position: 'object-center',
  },
  {
    num: '02',
    title: 'Outerwear & Jackets',
    tagline: 'STATEMENT UTILITY',
    description:
      'Elevate your layers with distinctive outerwear, considered details, and versatile pieces made for everyday rotation.',
    image: jacketImg,
    video: jacketVideo,
    cta: 'EXPLORE OUTERWEAR',
    link: '/Outerwear-Jackets',
    position: 'object-center',
  },
  {
    num: '03',
    title: 'Streetwear Accessories',
    tagline: 'THE FINAL DETAIL',
    description:
      'Complete the fit with standout headwear and everyday accessories designed to bring your personal style together.',
    image: hatImg,
    cta: 'SHOP ACCESSORIES',
    link: '/accessories',
    position: 'object-center',
  },
  {
    num: '04',
    title: 'Bottoms & Denim',
    tagline: 'MADE TO MOVE',
    description:
      'Discover relaxed denim, versatile cargos, and everyday essentials that balance comfort, movement, and streetwear style.',
    image: jeanImg,
    cta: 'SHOP BOTTOMS',
    link: '/pants',
    position: 'object-center',
  },
];

const CollectionsSection = () => {
  return (
    <section
      aria-labelledby='collections-heading'
      className='relative w-full bg-neutral-950 py-14 !text-white sm:py-20 lg:py-24'
    >
      {/* Section header */}
      <div className='mx-auto w-full max-w-[1920px] px-5 sm:px-8 lg:px-14 xl:px-20'>
        <header className='flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-10'>
          <div className='max-w-3xl'>
            <div className='flex items-center gap-3'>
              <span aria-hidden='true' className='h-2 w-2 shrink-0 rounded-full !bg-red-600' />

              <p className='!text-[10px] !font-semibold !uppercase !tracking-[0.2em] !text-red-500 sm:!text-xs sm:!tracking-[0.24em]'>
                NBLX ARCHIVE / 2026
              </p>
            </div>

            <h2
              id='collections-heading'
              className='mt-5 !text-4xl !font-black !uppercase !leading-[0.98] !tracking-[-0.045em] !text-white sm:!text-5xl md:!text-6xl lg:!text-7xl'
            >
              WEAR THE <span className='!text-neutral-500'>STATEMENT.</span>
            </h2>

            <p className='mt-5 max-w-xl !text-sm !leading-6 !text-neutral-300 sm:mt-6 sm:!text-base sm:!leading-7'>
              Discover elevated streetwear essentials, statement outerwear, and everyday pieces
              made to define your style.
            </p>
          </div>

          <Link
            to='/collections'
            className='group inline-flex min-h-12 w-fit shrink-0 items-center justify-center gap-3 rounded-full border !border-neutral-700 px-6 py-3 !text-[11px] !font-semibold !uppercase !tracking-[0.12em] !text-white transition-colors duration-300 hover:!border-red-600 hover:!bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-950 sm:!text-xs'
          >
            <span>VIEW ALL COLLECTIONS</span>
            <FaArrowRight
              aria-hidden='true'
              className='transition-transform duration-300 group-hover:translate-x-1'
            />
          </Link>
        </header>

        <div
          aria-hidden='true'
          className='mt-9 border-t !border-neutral-800 sm:mt-12 lg:mt-14'
        />
      </div>

      {/* Sticky overlapping collection cards */}
      <div className='relative mt-8 w-full sm:mt-10'>
        {collections.map((item, index) => (
          <article
            key={item.num}
            style={{ zIndex: index + 1 }}
            className={[
              'group isolate sticky top-0',
              'flex w-full flex-col justify-between',
              'h-[420px] sm:h-[460px] md:h-[500px] lg:h-[540px]',
              'overflow-hidden !bg-neutral-950',
              'px-5 py-6 sm:px-9 sm:py-8',
              'md:px-12 md:py-9 lg:px-16 lg:py-10',
              'xl:px-24',
            ].join(' ')}
          >
            {/* Background media */}
            <div className='absolute inset-0 z-0 overflow-hidden'>
              {item.video ? (
                <video
                  src={item.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload='metadata'
                  poster={item.image}
                  aria-label={`${item.title} collection video`}
                  className={[
                    'absolute inset-0 h-full w-full',
                    'object-cover object-center',
                  ].join(' ')}
                  style={{
                    transform: 'scale(1.1)',
                    transformOrigin: 'center center',
                  }}
                />
              ) : (
                <img
                  src={item.image}
                  alt={`${item.title} collection by NBLX`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding='async'
                  className={[
                    'absolute inset-0 h-full w-full',
                    'object-cover',
                    item.position,
                    'transition-transform duration-700 ease-out',
                    'group-hover:scale-[1.025]',
                    'motion-reduce:transform-none motion-reduce:transition-none',
                  ].join(' ')}
                />
              )}
            </div>

            {/* Dark overlays for text readability */}
            <div
              aria-hidden='true'
              className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/25 to-black/85'
            />

            <div
              aria-hidden='true'
              className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/35 via-transparent to-transparent'
            />

            {/* Collection number and category */}
            <div className='relative z-20 flex w-full items-start justify-between gap-4'>
              <div className='flex min-w-0 flex-col gap-2.5 sm:gap-3'>
                <span className='!text-[10px] !font-semibold !uppercase !tracking-[0.2em] !text-red-400 sm:!text-xs sm:!tracking-[0.24em]'>
                  NBLX / {item.num}
                </span>

                <p className='!text-[10px] !font-medium !uppercase !tracking-[0.16em] !text-white sm:!text-xs sm:!tracking-[0.22em]'>
                  {item.tagline}
                </p>
              </div>

              <Link
                to={item.link}
                aria-label={`Explore ${item.title}`}
                className='inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border !border-white/50 !bg-black/40 !text-white backdrop-blur-sm transition-colors duration-300 hover:!border-red-500 hover:!bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-12 sm:w-12'
              >
                <FaArrowRight
                  aria-hidden='true'
                  className='-rotate-45 !text-sm transition-transform duration-300 group-hover:rotate-0 sm:!text-base'
                />
              </Link>
            </div>

            {/* Collection title and CTA */}
            <div className='relative z-20 mt-auto w-full max-w-3xl pb-5 pt-16 sm:pb-7 sm:pt-20 lg:pb-9'>
              <h3 className='max-w-2xl break-words !text-3xl !font-bold !uppercase !leading-[1.05] !tracking-[-0.035em] !text-white sm:!text-4xl md:!text-5xl lg:!text-6xl'>
                {item.title}
              </h3>

              <p className='mt-4 max-w-lg !text-sm !leading-6 !text-white sm:mt-5 sm:!text-base sm:!leading-7'>
                {item.description}
              </p>

              <Link
                to={item.link}
                className='group/btn mt-6 inline-flex min-h-11 max-w-full items-center justify-center gap-3 rounded-full !bg-white px-5 py-3 text-center !text-[10px] !font-bold !uppercase !tracking-[0.12em] !text-black transition-colors duration-300 hover:!bg-red-600 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:mt-7 sm:px-6 sm:!text-xs'
              >
                <span>{item.cta}</span>

                <FaArrowRight
                  aria-hidden='true'
                  className='shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1'
                />
              </Link>
            </div>

            {/* Bottom accent */}
            <div
              aria-hidden='true'
              className='pointer-events-none absolute bottom-0 left-0 z-20 h-px w-full bg-white/30'
            >
              <div className='h-full w-1/4 bg-red-600' />
            </div>
          </article>
        ))}
      </div>

      {/* Closing banner */}
      <div className='relative z-30 !bg-neutral-950 px-5 !text-white sm:px-8 lg:px-14 xl:px-20'>
        <div className='mx-auto flex w-full max-w-[1760px] flex-col justify-between gap-6 border-t !border-neutral-800 py-9 sm:py-12 md:flex-row md:items-center'>
          <div className='max-w-xl'>
            <p className='!text-[10px] !font-semibold !uppercase !tracking-[0.22em] !text-red-500 sm:!text-xs'>
              OWN YOUR LOOK
            </p>

            <p className='mt-3 !text-sm !leading-6 !text-neutral-300 sm:!text-base sm:!leading-7'>
              Find the pieces that fit your style. Explore the NBLX collection and make every
              outfit your own.
            </p>
          </div>

          <Link
            to='/collections'
            className='group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full !bg-white px-6 py-3 text-center !text-[10px] !font-bold !uppercase !tracking-[0.12em] !text-black transition-colors duration-300 hover:!bg-red-600 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-950 sm:w-fit sm:!text-xs'
          >
            <span>EXPLORE THE ARCHIVE</span>

            <FaArrowRight
              aria-hidden='true'
              className='transition-transform duration-300 group-hover:translate-x-1'
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
