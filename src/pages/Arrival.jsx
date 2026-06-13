


// import React from 'react';

// const Arrival = () => {
//   return (
//     <div className="bg-white font-[cinzel] pt-20 pb-10 px-5 md:px-10">

//       <div className="flex flex-col items-start gap-2 border-b border-gray-400 pb-6">

//         <h3 className="text-xs md:text-sm text-[#ff0000] uppercase tracking-widest">
//           Latest Arrival
//         </h3>

//         <h2 className="text-black text-2xl md:text-3xl font-semibold">
//           Shop Matching Styles
//         </h2>

//       </div>

//     </div>
//   );
// };

// export default Arrival;

import React, { useState } from 'react';
import { ProductData } from '../data/ProductData';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

/* =========================
   PRODUCT CARD
========================= */
const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='w-full'>

      <Link to={`/products/${product.id}`}>
        <div
          className='relative overflow-hidden rounded-2xl bg-gray-100 group cursor-pointer'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >

          {/* MAIN IMAGE */}
          <motion.img
            src={product.image}
            alt={product.name}
            className='w-full h-80 sm:h-96 md:h-125 object-cover object-top rounded-2xl'
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* HOVER IMAGE */}
          <motion.img
            src={product.hoverImage}
            alt={product.name}
            className='absolute inset-0 w-full h-80 sm:h-96 md:h-125
             object-cover object-top rounded-2xl'
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* NEW BADGE */}
          <div className='absolute top-3 left-3 z-20'>
            <span className='bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold'>
              NEW
            </span>
          </div>

       
          <div className='absolute inset-0 bg-black/5 rounded-2xl' />
        </div>
      </Link>

      {/* INFO */}
      <div className='mt-4 px-1'>
        <h3 className='text-sm md:text-lg font-semibold uppercase line-clamp-1'>
          {product.name}
        </h3>

        <p className='font-bold font-[cinzel]'>
          ₦{product.price.toLocaleString('en-NG')}
        </p>
      </div>
    </div>
  );
};

/* =========================
   ARRIVAL PAGE (COMBINED)
========================= */
const Arrival = () => {
  return (
    <div className="bg-white font-[cinzel] pt-20 pb-16 px-5 md:px-10">

      {/* HEADER */}
      <div className="flex flex-col items-start gap-2 border-b border-gray-300 pb-6 mb-10">
        <h3 className="text-xs md:text-sm text-[#ff0000] uppercase tracking-widest">
          Latest Arrival
        </h3>

        <h2 className="text-black text-2xl md:text-4xl font-semibold">
          Shop Matching Styles
        </h2>
      </div>

      {/* FEATURED + PRODUCTS */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>

        {/* LEFT FEATURED PRODUCT */}
        <div className='lg:col-span-7'>
          <div className='rounded-3xl overflow-hidden bg-gray-100 h-125 md:h-162.5'>
            <img
              src={ProductData[0].image}
              alt='featured'
              className='w-[180%] h-125 md:h-162.5 object-top bottom-300 hover:scale-105 transition duration-700'
            />
          </div>
        </div>

        {/* RIGHT SCROLL PRODUCTS */}
        <div className='lg:col-span-5'>

          <div className='flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar pb-2'>

            {/* PRODUCT 1 */}
            <div className='min-w-[80%] sm:min-w-[60%] lg:min-w-full snap-start'>
              <ProductCard product={ProductData[1]} />
            </div>

            {/* PRODUCT 2 */}
            <div className='min-w-[80%] sm:min-w-[60%] lg:min-w-full snap-start'>
              <ProductCard product={ProductData[2]} />
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default Arrival;