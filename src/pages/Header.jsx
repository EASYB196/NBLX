// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';

// import image1 from '../assets/images/HEADER/header_one_img.jpg';
// import image2 from '../assets/images/HEADER/header_two_img.jpg';
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
//     link: '/t-shirt',
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

//       {/* Background Image */}
//       <img
//         src={slides[currentSlide].image}
//         alt='Collection'
//         onClick={() => navigate('/login')}
//         className='absolute inset-0 w-full h-full object-cover object-top opacity-85 transition-opacity duration-1000 z-1 cursor-pointer'
//       />

//       {/* Overlay */}
//       <div className='absolute inset-0 bg-black/40 z-2' />

//       {/* ================= DESKTOP LAYOUT ================= */}
//       <div className='hidden md:flex absolute bottom-[10vw] left-32 w-auto text-start flex-col space-y-5 z-3 px-4'>
//         <p className='text-white text-[28px] font-bold leading-tight'>
//           {slides[currentSlide].subtitle}
//         </p>

//         <h1 className='text-lg text-white leading-relaxed w-1/2'>
//           {slides[currentSlide].title}
//         </h1>

//         <div>
//           <Link to={slides[currentSlide].link}>
//             <button className='py-2 px-3 bg-white cursor-pointer text-black text-lg rounded-md transition-transform duration-300 hover:scale-110'>
//               {slides[currentSlide].buttonText}
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* ================= MOBILE LAYOUT ================= */}
//       <div className='md:hidden absolute inset-0 z-3 flex items-end px-5 pb-14'>
//         <div className='w-full backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-5 flex flex-col gap-5'>
//           <p className='text-white text-2xl font-bold leading-tight text-center'>
//             {slides[currentSlide].subtitle}
//           </p>

//           <h1 className='text-white text-sm leading-relaxed text-center'>
//             {slides[currentSlide].title}
//           </h1>

//           <Link to={slides[currentSlide].link} className='w-full'>
//             <button className='w-full py-3 bg-white text-black rounded-xl font-medium transition-transform duration-300 active:scale-95'>
//               {slides[currentSlide].buttonText}
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Indicators */}
//       <div className='absolute bottom-6 md:top-[90%] md:right-170 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 z-4 flex gap-3'>
//         {slides.map((_, index) => (
//           <div
//             key={index}
//             onClick={() => setCurrentSlide(index)}
//             className={`cursor-pointer rounded-full transition-all duration-300

//               ${
//                 currentSlide === index
//                   ? 'bg-white w-7 h-2 md:w-2 md:h-2 scale-110'
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


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import image1 from '../assets/images/HEADER/header_one_img.jpg';
import image2 from '../assets/images/HEADER/header_two_img.jpg';
import image3 from '../assets/images/HEADER/header_three_img.jpg';
import image4 from '../assets/images/HEADER/header_fourrep_img.jpg';

import FloatingWhatsApp from '../components/FloatingWhatsApp';

const slides = [
  {
    image: image1,
    alt: 'NBLX graphic tees and oversized streetwear',
    subtitle: 'Bold Graphics & Oversized Fits',
    title:
      'Graphic tees and oversized cuts designed for a standout look. Loose, comfortable, and made for everyday wear. Perfect for layering or wearing solo.',
    buttonText: 'Shop All',
    link: '/category',
    imagePosition: 'center 0% ',
  },
  {
    image: image2,
    alt: 'NBLX denim and contemporary streetwear collection',
    subtitle: 'Streetwear for Those Who Live It',
    title:
      'Durable denim jackets and shirts that add structure and versatility to any outfit. With classic cuts and modern prints, these pieces are made for easy, everyday styling.',
    buttonText: 'Explore New Arrivals',
    link: '/collections',
    imagePosition: 'center 13%',
  },
  {
    image: image3,
    alt: 'NBLX everyday streetwear essentials',
    subtitle: 'Built for the Culture, Not the Trend',
    title: 'Build a versatile wardrobe with timeless, well-made essentials that suit you.',
    buttonText: 'Discover More',
    link: '/t-shirt',
    imagePosition: 'center 5%',
  },
  {
    image: image4,
    alt: 'NBLX casual clothing and accessories',
    subtitle: 'Bold Prints. Baggy Fits. Accessories.',
    title:
      'Designed for effortless dressing, our casual wear and accessories are made to be worn with ease and confidence.',
    buttonText: 'Shop Accessories',
    link: '/accessories',
    imagePosition: 'center 1%',
  },
];

const SLIDE_INTERVAL = 4000;

function Header() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const activeSlide = slides[currentSlide];

  // Respect the visitor's motion preference.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleMotionPreference = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    setPrefersReducedMotion(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleMotionPreference);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionPreference);
    };
  }, []);

  // Automatically rotate slides.
  useEffect(() => {
    if (isPaused || prefersReducedMotion) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setCurrentSlide((previousSlide) => (previousSlide + 1) % slides.length);
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(interval);
  }, [isPaused, prefersReducedMotion]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const showPreviousSlide = () => {
    setCurrentSlide((previousSlide) => (previousSlide - 1 + slides.length) % slides.length);
  };

  const showNextSlide = () => {
    setCurrentSlide((previousSlide) => (previousSlide + 1) % slides.length);
  };

  return (
    <section
      aria-label='NBLX featured collections'
      className='
        relative isolate
        h-svh min-h-140 max-h-275
        w-full overflow-hidden bg-black text-white
      '
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <FloatingWhatsApp />

      {/* BACKGROUND IMAGE */}
      <div className='absolute inset-0 -z-10'>
        <img
          key={activeSlide.image}
          src={activeSlide.image}
          alt={activeSlide.alt}
          fetchPriority='high'
          style={{
            objectPosition: activeSlide.imagePosition,
          }}
          className='
            absolute inset-0 h-full w-full
            object-cover object-center
            transition-opacity duration-700
          '
        />

        {/* Image overlays for readable text */}
        <div
          aria-hidden='true'
          className='
            absolute inset-0
            bg-linear-to-t
            from-black/85 via-black/35 to-black/10
          '
        />

        <div
          aria-hidden='true'
          className='
            absolute inset-0
            bg-gradient-to-r
            from-black/45 via-transparent to-transparent
          '
        />
      </div>

      {/* HERO CONTENT */}
      <div
        className='
          relative z-10 mx-auto flex h-full w-full
          max-w-[1600px] items-end
          px-4 pb-24
          sm:px-6 sm:pb-24
          md:px-10 md:pb-28
          lg:items-center lg:px-14 lg:pb-10
          xl:px-20
        '
      >
        <div
          key={currentSlide}
          className='
            w-full max-w-2xl
            rounded-2xl border border-white/15
            bg-black/35 p-5 shadow-2xl backdrop-blur-sm
            sm:p-7 md:max-w-3xl md:p-8
            lg:max-w-[680px]
            lg:rounded-none lg:border-0
            lg:bg-transparent lg:p-0
            lg:shadow-none lg:backdrop-blur-none
          '
        >
          <p
            className='
              mb-4 text-center text-xs font-semibold
              uppercase tracking-[0.2em] text-white/80
              sm:text-sm lg:text-left
            '
          >
            NBLX — Move Different
          </p>

          <h1
            className='
              text-center text-3xl font-extrabold
              leading-[1.12] tracking-tight
              sm:text-4xl md:text-5xl
              lg:text-left lg:text-5xl xl:text-6xl
            '
          >
            {activeSlide.subtitle}
          </h1>

          <p
            className='
              mx-auto mt-4 max-w-xl
              text-center text-sm leading-7 text-white/85
              sm:text-base sm:leading-7
              lg:mx-0 lg:mt-5 lg:text-left
            '
          >
            {activeSlide.title}
          </p>

          <div className='mt-6 flex justify-center lg:justify-start'>
            <Link
              to={activeSlide.link}
              className='
                inline-flex min-h-12 w-full items-center
                justify-center gap-3 rounded-lg
                bg-white px-7 py-3
                text-sm font-bold text-black!
                transition-colors duration-200
                hover:bg-neutral-200
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-white
                focus-visible:ring-offset-2
                focus-visible:ring-offset-black
                active:scale-[0.98]
                sm:w-auto sm:min-w-44
              '
            >
              {activeSlide.buttonText}
              <span aria-hidden='true'>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* SLIDE CONTROLS */}
      <div
        className='
          absolute bottom-6 left-0 right-0 z-20
          flex items-center justify-center gap-5
          sm:bottom-8
          lg:bottom-10 lg:left-auto lg:right-14
          lg:w-auto xl:right-20
        '
      >
        <button
          type='button'
          onClick={showPreviousSlide}
          aria-label='Previous collection'
          className='
            flex h-10 w-10 items-center justify-center
            rounded-full border border-white/30
            bg-black/20 text-white transition hover:bg-white/15
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-white
          '
        >
          <span aria-hidden='true'>←</span>
        </button>

        <div
          className='flex items-center gap-2.5'
          role='group'
          aria-label='Choose a featured collection'
        >
          {slides.map((slide, index) => (
            <button
              key={slide.link}
              type='button'
              onClick={() => goToSlide(index)}
              aria-label={`Show collection ${index + 1}: ${slide.subtitle}`}
              aria-pressed={currentSlide === index}
              className='
                flex h-8 min-w-8 items-center justify-center
                rounded-full
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-white
              '
            >
              <span
                aria-hidden='true'
                className={`
                  block h-2 rounded-full transition-all duration-300
                  ${currentSlide === index ? 'w-7 bg-white' : 'w-2 bg-white/50 hover:bg-white'}
                `}
              />
            </button>
          ))}
        </div>

        <button
          type='button'
          onClick={showNextSlide}
          aria-label='Next collection'
          className='
            flex h-10 w-10 items-center justify-center
            rounded-full border border-white/30
            bg-black/20 text-white transition hover:bg-white/15
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-white
          '
        >
          <span aria-hidden='true'>→</span>
        </button>
      </div>

      {/* SLIDE COUNTER */}
      <p
        aria-hidden='true'
        className='
          absolute bottom-9 left-5 z-20 hidden
          text-xs font-medium tracking-widest text-white/75
          sm:block lg:left-14 xl:left-20
        '
      >
        {String(currentSlide + 1).padStart(2, '0')}
        <span className='mx-2 text-white/40'>/</span>
        {String(slides.length).padStart(2, '0')}
      </p>
    </section>
  );
}

export default Header;
