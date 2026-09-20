// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import tops from '../assets/images/tops.png';
// import bottoms from '../assets/images/bottoms.png';
// import sweatshirt from '../assets/images/sweatshirt.png';
// import accessories from '../assets/images/accessories.png';

// function Section() {
//   const navigate = useNavigate();

//   const categories = [
//     { name: 'Tops', image: tops, path: '/t-shirt' },
//     { name: 'Bottoms', image: bottoms, path: '/Denim-Jeans' },
//     { name: 'Sweatshirts', image: sweatshirt, path: '/Hoodies-Sweatshirts' },
//     { name: 'Hats', image: accessories, path: '/Hats' },
//     // { name: 'Accessories', image: accessories, path: '/accessories' },
//   ];

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [hoverIndex, setHoverIndex] = useState(null);

//   const currentBg =
//     hoverIndex !== null ? categories[hoverIndex].image : categories[activeIndex].image;

//   return (
//     <div className='relative w-full h-screen overflow-hidden bg-black'>
//       {/* 🔥 SMOOTH CROSSFADE BACKGROUNDS */}
//       {categories.map((item, index) => (
//         <img
//           key={index}
//           src={item.image}
//           alt=''
//           className={`
//             absolute inset-0 w-full h-full object-cover scale-105
//             transition-opacity duration-700 ease-in-out
//             ${currentBg === item.image ? 'opacity-40' : 'opacity-0'}
//           `}
//         />
//       ))}

//       {/* DARK OVERLAY */}
//       <div className='absolute inset-0 bg-black/50'></div>

//       {/* FOREGROUND IMAGE */}
//       <div className='relative z-10 flex items-center justify-center h-full'>
//         <img
//           src={currentBg}
//           alt=''
//           className='w-[90%] sm:w-[75%] md:w-[60%] h-[60%] object-cover rounded-2xl drop-shadow-2xl transition-all duration-700 ease-in-out'
//         />
//       </div>

//       {/* CATEGORY NAV */}
//       <div className='absolute top-1/2 left-[8%] md:left-[40%] -translate-y-1/2 z-20'>
//         <div className='flex flex-col'>
//           {categories.map((item, index) => (
//             <div
//               key={index}
//               onMouseEnter={() => setHoverIndex(index)}
//               onMouseLeave={() => setHoverIndex(null)}
//               onClick={() => {
//                 setActiveIndex(index);
//                 navigate(item.path);
//               }}
//               className='group relative w-fit cursor-pointer py-1 sm:py-2 overflow-hidden'
//             >
//               <h2
//                 className={`
//                   text-sm sm:text-lg md:text-xl lg:text-4xl
//                   font-bold uppercase tracking-[-0.03em]
//                   leading-[0.9]
//                   transition-all duration-500 ease-out
//                   group-hover:translate-x-2
//                   ${activeIndex === index ? 'text-white' : 'text-white/50'}
//                 `}
//               >
//                 {item.name}
//               </h2>

//               {/* underline */}
//               <span className='absolute left-0 bottom-0 h-px w-0 bg-white/70 transition-all duration-500 group-hover:w-full'></span>

//               {/* side label */}
//               <span className='absolute -right-1 top-[10%] -translate-y-1/2 text-[10px] uppercase tracking-[0.3em] text-white/40 opacity-0 group-hover:opacity-100 transition-all duration-500'>
//                 Explore
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Section;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import tops from '../assets/images/tops.png';
import bottoms from '../assets/images/bottoms.png';
import sweatshirt from '../assets/images/sweatshirt.png';
import accessories from '../assets/images/accessories.png';

function Section() {
  const navigate = useNavigate();

  const categories = [
    { name: 'Tops', image: tops, path: '/t-shirt' },
    { name: 'Bottoms', image: bottoms, path: '/Denim-Jeans' },
    { name: 'Sweatshirts', image: sweatshirt, path: '/Hoodies-Sweatshirts' },
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
            absolute inset-0
            w-full h-full
            object-cover
            scale-105
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
          className='
            w-[90%]
            sm:w-[75%]
            md:w-[60%]
            h-[55%]
            sm:h-[60%]
            md:h-[60%]
            object-cover
            rounded-2xl
            drop-shadow-2xl
            transition-all
            duration-700
            ease-in-out
          '
        />
      </div>

      {/* CATEGORY NAV */}
      <div
        className='
          absolute
          inset-0
          z-20
          flex
          items-center

          /* MOBILE */
          justify-center

          /* DESKTOP — ORIGINAL POSITION */
          md:justify-start
          md:top-1/2
          md:left-[40%]
          md:inset-auto
          md:-translate-y-1/2
        '
      >
        <div className='flex flex-col items-center md:items-start'>
          {categories.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => {
                setActiveIndex(index);
                navigate(item.path);
              }}
              className='
                group
                relative
                w-fit
                cursor-pointer
                py-1
                sm:py-2
                overflow-hidden
              '
            >
              {/* CATEGORY NAME */}
              <h2
                className={`
                  text-[1.65rem]
                  sm:text-3xl

                  /* DESKTOP — ORIGINAL SIZING */
                  md:text-xl
                  lg:text-4xl

                  font-bold
                  uppercase
                  tracking-[-0.03em]
                  leading-[0.9]

                  text-center
                  md:text-left

                  transition-all
                  duration-500
                  ease-out

                  group-hover:translate-x-2

                  ${activeIndex === index ? 'text-white' : 'text-white/50'}

                  group-hover:text-white
                `}
              >
                {item.name}
              </h2>

              {/* UNDERLINE */}
              <span
                className='
                  absolute
                  left-1/2
                  md:left-0
                  -translate-x-1/2
                  md:translate-x-0
                  bottom-0
                  h-px
                  w-0
                  bg-white/70
                  transition-all
                  duration-500
                  group-hover:w-full
                '
              ></span>

              {/* SIDE LABEL — DESKTOP ONLY */}
              <span
                className='
                  hidden
                  md:block

                  absolute
                  -right-1
                  top-[10%]
                  -translate-y-1/2

                  text-[10px]
                  uppercase
                  tracking-[0.3em]
                  text-white/40

                  opacity-0
                  group-hover:opacity-100

                  transition-all
                  duration-500
                '
              >
                Explore
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE CATEGORY INDICATOR */}
      <div
        className='
          absolute
          bottom-7
          left-1/2
          -translate-x-1/2
          z-20
          flex
          items-center
          gap-2
          md:hidden
        '
      >
        {categories.map((_, index) => (
          <span
            key={index}
            className={`
              h-1
              rounded-full
              transition-all
              duration-500

              ${activeIndex === index ? 'w-7 bg-white' : 'w-2 bg-white/40'}
            `}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Section;
