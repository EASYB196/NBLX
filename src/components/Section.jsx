import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import tops from '../assets/images/tops.png';
import bottoms from '../assets/images/bottoms.png';
import sweatshirt from '../assets/images/sweatshirt.png';
import accessories from '../assets/images/accessories.png';

function Section() {
  const navigate = useNavigate();

  const categories = [
    { name: 'Tops', image: tops, path: '/tops' },
    { name: 'Bottoms', image: bottoms, path: '/bottoms' },
    { name: 'Sweatshirts', image: sweatshirt, path: '/sweatshirts' },
    { name: 'Accessories', image: accessories, path: '/accessories' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);

  const currentBg =
    hoverIndex !== null ? categories[hoverIndex].image : categories[activeIndex].image;

  return (
    <div className='relative w-full h-screen overflow-hidden bg-black'>
      {/* 🔥 SMOOTH CROSSFADE BACKGROUNDS */}
      {categories.map((item, index) => (
        <img
          key={index}
          src={item.image}
          alt=''
          className={`
            absolute inset-0 w-full h-full object-cover scale-105
            transition-opacity duration-700 ease-in-out
            ${currentBg === item.image ? 'opacity-40' : 'opacity-0'}
          `}
        />
      ))}

      {/* DARK OVERLAY */}
      <div className='absolute inset-0 bg-black/50'></div>

      {/* FOREGROUND IMAGE */}
      <div className='relative z-10 flex items-center justify-center h-full'>
        <img
          src={currentBg}
          alt=''
          className='w-[90%] sm:w-[75%] md:w-[60%] h-[60%] object-cover rounded-2xl drop-shadow-2xl transition-all duration-700 ease-in-out'
        />
      </div>

      {/* CATEGORY NAV */}
      <div className='absolute top-1/2 left-[8%] md:left-[40%] -translate-y-1/2 z-20'>
        <div className='flex flex-col'>
          {categories.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => {
                setActiveIndex(index);
                navigate(item.path);
              }}
              className='group relative w-fit cursor-pointer py-1 sm:py-2 overflow-hidden'
            >
              <h2
                className={`
                  text-sm sm:text-lg md:text-xl lg:text-4xl
                  font-bold uppercase tracking-[-0.03em]
                  leading-[0.9]
                  transition-all duration-500 ease-out
                  group-hover:translate-x-2
                  ${activeIndex === index ? 'text-white' : 'text-white/50'}
                `}
              >
                {item.name}
              </h2>

              {/* underline */}
              <span className='absolute left-0 bottom-0 h-px w-0 bg-white/70 transition-all duration-500 group-hover:w-full'></span>

              {/* side label */}
              <span className='absolute -right-1 top-[10%] -translate-y-1/2 text-[10px] uppercase tracking-[0.3em] text-white/40 opacity-0 group-hover:opacity-100 transition-all duration-500'>
                Explore
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Section;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import tops from '../assets/images/tops.png';
// import bottoms from '../assets/images/bottoms.png';
// import sweatshirt from '../assets/images/sweatshirt.png';
// import accessories from '../assets/images/accessories.png';

// function Section() {
//   const navigate = useNavigate();

//   const categories = [
//     { name: 'Tops', image: tops, path: '/tops' },
//     { name: 'Bottoms', image: bottoms, path: '/bottoms' },
//     { name: 'Sweatshirts', image: sweatshirt, path: '/sweatshirts' },
//     { name: 'Accessories', image: accessories, path: '/accessories' },
//   ];

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [hoverIndex, setHoverIndex] = useState(null);

//   const current = hoverIndex !== null ? hoverIndex : activeIndex;

//   // 🔥 Scroll-driven category switch (premium editorial feel)
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY;
//       const index = Math.min(
//         categories.length - 1,
//         Math.floor(scrollY / 300)
//       );
//       setActiveIndex(index);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className='relative w-full h-screen overflow-hidden bg-black'>

//       {/* 🔥 LAYERED BACKGROUNDS (smooth crossfade) */}
//       {categories.map((item, index) => (
//         <img
//           key={index}
//           src={item.image}
//           alt=''
//           className={`
//             absolute inset-0 w-full h-full object-cover scale-110
//             transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)]
//             ${current === index ? 'opacity-40 scale-105' : 'opacity-0 scale-110'}
//           `}
//         />
//       ))}

//       {/* DARK OVERLAY */}
//       <div className='absolute inset-0 bg-black/50'></div>

//       {/* FOREGROUND IMAGE */}
//       <div className='relative z-10 flex items-center justify-center h-full'>
//         <img
//           src={categories[current].image}
//           alt=''
//           className='
//             w-[90%] sm:w-[75%] md:w-[60%]
//             h-[60%]
//             object-cover
//             rounded-2xl
//             drop-shadow-2xl
//             transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)]
//             scale-[1.02]
//           '
//         />
//       </div>

//       {/* CATEGORY NAV */}
//       <div className='absolute top-1/2 left-[8%] md:left-[35%] -translate-y-1/2 z-20'>
//         <div className='flex flex-col gap-2'>

//           {categories.map((item, index) => (
//             <div
//               key={index}

//               onMouseEnter={() => setHoverIndex(index)}
//               onMouseLeave={() => setHoverIndex(null)}

//               onClick={() => {
//                 setActiveIndex(index);
//                 navigate(item.path);
//               }}

//               className='group relative w-fit cursor-pointer overflow-hidden'
//             >

//               {/* 🧲 MAGNETIC HOVER TEXT */}
//               <h2
//                 className={`
//                   text-lg sm:text-xl md:text-2xl lg:text-5xl
//                   font-semibold uppercase tracking-[-0.04em]
//                   leading-[0.9]
//                   transition-all duration-700 ease-out
//                   ${current === index ? 'text-white' : 'text-white/40'}
//                   group-hover:translate-x-3 group-hover:scale-[1.02]
//                 `}
//               >
//                 {item.name}
//               </h2>

//               {/* UNDERLINE (smooth reveal) */}
//               <span className='absolute left-0 bottom-0 h-px w-0 bg-white/60 transition-all duration-700 ease-out group-hover:w-full'></span>

//               {/* SIDE LABEL */}
//               <span className='absolute -right-12 top-1/2 -translate-y-1/2 text-[10px] tracking-[0.35em] uppercase text-white/30 opacity-0 group-hover:opacity-100 transition-all duration-700'>
//                 View
//               </span>

//             </div>
//           ))}

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Section;
