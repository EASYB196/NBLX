import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import image1 from '../assets/images/HEADER/image1.png';
import image2 from '../assets/images/HEADER/image2.png';
import image3 from '../assets/images/HEADER/image3.png';
import image4 from '../assets/images/HEADER/image4.png';

import FloatingWhatsApp from '../components/FloatingWhatsApp';

const slides = [
  {
    image: image1,
    subtitle: 'Bold Graphics & Oversized Fits',
    title:
      'Graphic tees and oversized cuts designed for a standout look. Loose, comfortable, and made for everyday wear. Perfect for layering or wearing solo.',
    buttonText: 'Shop all',
    link: '/category',
  },

  {
    image: image2,
    subtitle: 'Trendy Streetwear for Those Who Live It',
    title:
      'Durable denim jackets and shirts that add structure and versatility to any outfit. With classic cuts and modern prints, these pieces are made for easy, everyday styling.',
    buttonText: 'Explore New Arrivals',
    link: '/collections',
  },

  {
    image: image3,
    subtitle: 'Streetwear Built For The Culture Not The Trend.',
    title: 'Build a versatile wardrobe with timeless, well-made essentials that suit you.',
    buttonText: 'Discover More',
    link: '/t-shirt',
  },

  {
    image: image4,
    subtitle: 'Bold Print.Baggy Fits.Accessories Included.',
    title:
      'Designed for effortless dressing, our casual wear and accessories are made to be worn with ease and confidence.',
    buttonText: 'Shop Accessories',
    link: '/accessories',
  },
];
function Header() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative w-full h-screen overflow-hidden'>
      <FloatingWhatsApp />

      {/* Background Image */}
      <img
        src={slides[currentSlide].image}
        alt='Collection'
        onClick={() => navigate('/login')}
        className='absolute inset-0 w-full h-full object-cover object-top opacity-85 transition-opacity duration-1000 z-1 cursor-pointer'
      />

      {/* Overlay */}
      <div className='absolute inset-0 bg-black/40 z-2' />

      {/* ================= DESKTOP LAYOUT ================= */}
      <div className='hidden md:flex absolute bottom-[10vw] left-32 w-auto text-start flex-col space-y-5 z-3 px-4'>
        <p className='text-white text-[28px] font-bold leading-tight'>
          {slides[currentSlide].subtitle}
        </p>

        <h1 className='text-lg text-white leading-relaxed w-1/2'>
          {slides[currentSlide].title}
        </h1>

        <div>
          <Link to={slides[currentSlide].link}>
            <button className='py-2 px-3 bg-white cursor-pointer text-black text-lg rounded-md transition-transform duration-300 hover:scale-110'>
              {slides[currentSlide].buttonText}
            </button>
          </Link>
        </div>
      </div>

      {/* ================= MOBILE LAYOUT ================= */}
      <div className='md:hidden absolute inset-0 z-3 flex items-end px-5 pb-14'>
        <div className='w-full backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-5 flex flex-col gap-5'>
          <p className='text-white text-2xl font-bold leading-tight text-center'>
            {slides[currentSlide].subtitle}
          </p>

          <h1 className='text-white text-sm leading-relaxed text-center'>
            {slides[currentSlide].title}
          </h1>

          <Link to={slides[currentSlide].link} className='w-full'>
            <button className='w-full py-3 bg-white text-black rounded-xl font-medium transition-transform duration-300 active:scale-95'>
              {slides[currentSlide].buttonText}
            </button>
          </Link>
        </div>
      </div>

      {/* Indicators */}
      <div className='absolute bottom-6 md:top-[90%] md:right-170 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 z-4 flex gap-3'>
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`cursor-pointer rounded-full transition-all duration-300

              ${
                currentSlide === index
                  ? 'bg-white w-7 h-2 md:w-2 md:h-2 scale-110'
                  : 'bg-white/40 hover:bg-white w-2 h-2'
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}

export default Header;//

// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';

// import image1 from '../assets/images/HEADER/image1.png';
// import image2 from '../assets/images/HEADER/image2.png';
// import image3 from '../assets/images/HEADER/image3.png';
// import image4 from '../assets/images/HEADER/image4.png';

// import FloatingWhatsApp from '../components/FloatingWhatsApp';

// const slides = [
//   {
//     image: image1,
//     subtitle: 'Bold Graphics & Oversized Fits',
//     title:
//       'Graphic tees and oversized cuts designed for a standout look. Loose, comfortable, and made for everyday wear. Perfect for layering or wearing solo.',
//     buttonText: 'Shop all',
//     link: '/category',
//   },

//   {
//     image: image2,
//     subtitle: 'Trendy Streetwear for Those Who Live It',
//     title:
//       'Durable denim jackets and shirts that add structure and versatility to any outfit. With classic cuts and modern prints, these pieces are made for easy, everyday styling.',
//     buttonText: 'Explore New Arrivals',
//     link: '/collections',
//   },

//   {
//     image: image3,
//     subtitle: 'Streetwear Built For The Culture Not The Trend.',
//     title: 'Build a versatile wardrobe with timeless, well-made essentials that suit you.',
//     buttonText: 'Discover More',
//     link: '/kafans-shirts',
//   },

//   {
//     image: image4,
//     subtitle: 'Bold Print.Baggy Fits.Accessories Included.',
//     title:
//       'Designed for effortless dressing, our casual wear and accessories are made to be worn with ease and confidence.',
//     buttonText: 'Shop Accessories',
//     link: '/accessories',
//   },
// ];

// function Header() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 6000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className='relative w-full h-screen overflow-hidden'>
//       <FloatingWhatsApp />

//       {/* ================================================= */}
//       {/* BACKGROUND IMAGE */}
//       {/* ================================================= */}

//       <img
//         src={slides[currentSlide].image}
//         alt='Collection'
//         onClick={() => navigate('/login')}
//         className='
//           absolute
//           inset-0
//           w-full
//           h-full
//           object-cover
//           object-top
//           opacity-85
//           transition-opacity
//           duration-1000
//           z-1
//           cursor-pointer
//         '
//       />

//       {/* ================================================= */}
//       {/* OVERLAY */}
//       {/* ================================================= */}

//       <div className='absolute inset-0 bg-black/40 z-2' />

//       {/* ================================================= */}
//       {/* TABLET + MOBILE LAYOUT */}
//       {/* 0px - 1023px */}
//       {/* ================================================= */}

//       <div
//         className='
//           lg:hidden
//           absolute
//           inset-0
//           z-3
//           flex
//           items-end
//           px-4
//           sm:px-6
//           md:px-8
//           pb-12
//           sm:pb-14
//           md:pb-16
//         '
//       >
//         <div
//           className='
//             w-full
//             max-w-2xl
//             mx-auto
//             backdrop-blur-sm
//             bg-white/10
//             border
//             border-white/20
//             rounded-2xl
//             p-5
//             sm:p-6
//             md:p-7
//             flex
//             flex-col
//             gap-4
//             sm:gap-5
//           '
//         >
//           {/* SUBTITLE */}

//           <p
//             className='
//               text-white
//               text-xl
//               sm:text-2xl
//               md:text-[28px]
//               font-bold
//               leading-tight
//               text-center
//             '
//           >
//             {slides[currentSlide].subtitle}
//           </p>

//           {/* DESCRIPTION */}

//           <h1
//             className='
//               text-white
//               text-sm
//               sm:text-base
//               md:text-lg
//               leading-relaxed
//               text-center
//               max-w-xl
//               mx-auto
//             '
//           >
//             {slides[currentSlide].title}
//           </h1>

//           {/* BUTTON */}

//           <Link to={slides[currentSlide].link} className='w-full sm:w-auto sm:self-center'>
//             <button
//               className='
//                 w-full
//                 sm:w-auto
//                 min-w-[150px]
//                 py-3
//                 px-6
//                 bg-white
//                 text-black
//                 rounded-xl
//                 font-medium
//                 transition-transform
//                 duration-300
//                 hover:scale-105
//                 active:scale-95
//               '
//             >
//               {slides[currentSlide].buttonText}
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* ================================================= */}
//       {/* DESKTOP LAYOUT */}
//       {/* 1024px+ */}
//       {/* ================================================= */}

//       <div
//         className='
//           hidden
//           lg:flex
//           absolute
//           bottom-[10vw]
//           left-10
//           xl:left-32
//           w-auto
//           max-w-[700px]
//           text-start
//           flex-col
//           space-y-5
//           z-3
//           px-4
//         '
//       >
//         {/* SUBTITLE */}

//         <p
//           className='
//             text-white
//             text-[24px]
//             xl:text-[28px]
//             font-bold
//             leading-tight
//           '
//         >
//           {slides[currentSlide].subtitle}
//         </p>

//         {/* DESCRIPTION */}

//         <h1
//           className='
//             text-lg
//             text-white
//             leading-relaxed
//             max-w-[550px]
//           '
//         >
//           {slides[currentSlide].title}
//         </h1>

//         {/* BUTTON */}

//         <div>
//           <Link to={slides[currentSlide].link}>
//             <button
//               className='
//                 py-2
//                 px-3
//                 bg-white
//                 cursor-pointer
//                 text-black
//                 text-lg
//                 rounded-md
//                 transition-transform
//                 duration-300
//                 hover:scale-110
//               '
//             >
//               {slides[currentSlide].buttonText}
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* ================================================= */}
//       {/* INDICATORS */}
//       {/* ================================================= */}

//       <div
//         className='
//           absolute
//           bottom-6
//           lg:top-[90%]
//           lg:right-20
//           left-1/2
//           lg:left-auto
//           -translate-x-1/2
//           lg:translate-x-0
//           lg:-translate-y-1/2
//           z-4
//           flex
//           gap-3
       


//         '
//       >
//         {slides.map((_, index) => (
//           <div
//             key={index}
//             onClick={() => setCurrentSlide(index)}
//             className={`
//               cursor-pointer
//               rounded-full
//               transition-all
//               duration-300
              

//               ${
//                 currentSlide === index
//                   ? 'bg-white w-7 h-2 lg:w-2 lg:h-2 scale-110'
//                   : 'bg-white/40 hover:bg-white w-2 h-2'
//               }
//             `}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Header;



  //  md:top-[90%]     
  //         md:right-170   
  //         md:translate-x-0
  //         md:-translate-y-1/2
  //         md:left-auto 